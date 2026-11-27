#!/usr/bin/env node
// End-to-end check of /respec plan with a real coding agent (Claude Code, `claude -p`).
// Not part of `npm test`: every run calls a model and costs money. Run it before a release
// that changes AGENTS.md or flows/ (see RELEASING.md).
//
//   node test/e2e/plan.mjs                 both scenarios
//   node test/e2e/plan.mjs fresh           one scenario: fresh | role-change
//   RESPEC_E2E_MODEL=sonnet node test/e2e/plan.mjs   another model (default: the repo's setting)
//   RESPEC_E2E_BUDGET=3 node test/e2e/plan.mjs       spending cap per scenario in USD (default 5)
//
// Each scenario copies the repo to a temp folder, writes a learner/ from the sample learner,
// runs the agent there, and checks the state it wrote. The folder is kept for reading the transcript.

import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { readCatalog, readPack } from "../../scripts/lib/skills.mjs";
import { checkState } from "../../scripts/lib/check-state.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const demoDir = join(root, "examples/learner-demo");
const demo = JSON.parse(readFileSync(join(demoDir, "state.json"), "utf8"));
const catalog = readCatalog(join(root, "data/skills.md"));
const pack = (id) => readPack(join(root, "data/roles", `${id}.md`));
const DEPTH = { basic: 0, working: 1, deep: 2 };
const NOTE =
  "This is an automated test run; nobody will answer. Don't ask questions: there are no target postings, " +
  "keep learner.preferences as saved, and at the confirmation step accept the plan as proposed and save it.";

// The sample learner before planning: profile, placement, preferences and role, no curriculum.
function beforePlan(roleId, title) {
  const s = structuredClone(demo);
  s.target_role = { ...s.target_role, id: roleId, title };
  s.curriculum = { created_at: null, phases: [], coverage: [], modules: [] };
  s.weak_points = [];
  s.history = s.history.slice(0, 2);
  return s;
}

const scenarios = {
  // A new plan for the sample learner's role.
  fresh: {
    role: "ai-engineer",
    state: () => beforePlan("ai-engineer", "Applied AI Engineer"),
    check(state, out, fail) {
      for (const row of pack("ai-engineer").filter((r) => r.priority.startsWith("core"))) {
        const c = state.curriculum.coverage.find((x) => x.id === row.id);
        if (!c) fail(`core skill ${row.id} has no coverage item`);
        else if (c.depth !== row.depth) fail(`${row.id}: depth ${c.depth}, pack says ${row.depth}`);
        if (c && !["known", "covered"].includes(c.status)) fail(`core skill ${row.id} is ${c.status}; a core skill is known or covered`);
      }
      if (!/Forward-Deployed/i.test(out)) fail("the confirmation doesn't mention a neighbouring role (Forward-Deployed Engineer covers well over half)");
    },
  },
  // The learner finished m00–m03 as an AI Engineer, rebuilt, and switched to AI Product Engineer.
  "role-change": {
    role: "ai-product-engineer",
    state: () => beforePlan("ai-product-engineer", "AI Product Engineer"),
    archive: () => demo.curriculum,
    check(state, _out, fail) {
      const aie = new Map(pack("ai-engineer").map((r) => [r.id, r]));
      const aipe = new Map(pack("ai-product-engineer").map((r) => [r.id, r]));
      const learned = demo.curriculum.modules.filter((m) => m.status === "completed").flatMap((m) => m.skills ?? []);
      for (const id of learned) {
        if (!aipe.has(id)) continue;
        const c = state.curriculum.coverage.find((x) => x.id === id);
        const deeper = DEPTH[aipe.get(id).depth] > DEPTH[aie.get(id)?.depth];
        if (!c) fail(`${id} (learned for AI Engineer) has no coverage item`);
        else if (c.status !== "known" && !deeper) fail(`${id} was learned at ${aie.get(id)?.depth} for AI Engineer; expected known, got ${c.status}`);
      }
    },
  },
};

function run(name) {
  const sc = scenarios[name];
  const dir = mkdtempSync(join(tmpdir(), `respec-e2e-${name}-`));
  const skip = new Set([".git", "node_modules", "learner", ".gstack", ".serena"]);
  cpSync(root, dir, { recursive: true, filter: (src) => !relative(root, src).split(sep).some((part) => skip.has(part)) });
  const learner = join(dir, "learner");
  mkdirSync(learner);
  cpSync(join(demoDir, "profile.md"), join(learner, "profile.md"));
  writeFileSync(join(learner, "state.json"), JSON.stringify(sc.state(), null, 2) + "\n");
  if (sc.archive) {
    mkdirSync(join(learner, "_archive", "2026-11-20"), { recursive: true });
    writeFileSync(join(learner, "_archive", "2026-11-20", "curriculum.json"), JSON.stringify(sc.archive(), null, 2) + "\n");
  }

  // Project settings only: the tester's own CLAUDE.md and settings (language, model) must not leak in.
  const args = ["-p", `/respec plan ${NOTE}`, "--output-format", "json", "--setting-sources", "project",
    "--max-budget-usd", process.env.RESPEC_E2E_BUDGET ?? "5", "--permission-mode", "acceptEdits",
    "--allowedTools", "Read", "Write", "Edit", "Glob", "Grep", "Bash(node:*)", "Bash(ls:*)", "Bash(date:*)"];
  if (process.env.RESPEC_E2E_MODEL) args.push("--model", process.env.RESPEC_E2E_MODEL);
  console.log(`[${name}] running the agent in ${dir} …`);
  const t0 = Date.now();
  const r = spawnSync("claude", args, { cwd: dir, encoding: "utf8", timeout: 20 * 60_000, maxBuffer: 50 * 2 ** 20 });
  let res = {};
  try {
    res = JSON.parse(r.stdout);
  } catch {}
  const out = res.result ?? (r.stdout ?? "") + (r.stderr ?? "");
  writeFileSync(join(dir, "e2e-transcript.txt"), out);
  const cost = res.total_cost_usd != null ? `, $${res.total_cost_usd.toFixed(2)}` : "";
  console.log(`[${name}] agent finished in ${Math.round((Date.now() - t0) / 1000)} s${cost} (exit ${r.status ?? r.signal ?? r.error?.code})`);

  const failures = [];
  const fail = (m) => failures.push(m);
  if (r.error) fail(`couldn't run claude: ${r.error.message}`);
  else if (r.status !== 0) fail(`claude exited with ${r.status ?? r.signal}`);
  if (res.is_error) fail(`the agent stopped with an error: ${res.subtype ?? out.slice(0, 200)}`);
  // ğ and dotless ı are Turkish-only; ç and ş also appear in English text (façade, names).
  if (/[ğıĞİ]/.test(out)) fail("the agent answered in Turkish; the sample learner's language is en");
  let state, parsed = false;
  try {
    state = JSON.parse(readFileSync(join(learner, "state.json"), "utf8"));
    parsed = true;
  } catch (e) {
    fail(`learner/state.json isn't readable JSON: ${e.message}`);
  }
  // check-state reports a null or non-object state; the checks below need an object.
  const { errors = [], warnings = [] } = parsed ? checkState(state, { catalog, packIds: [sc.role] }) : {};
  errors.forEach((e) => fail(`check-state: ${e}`));
  // Nobody in this run asked for an exception (AGENTS.md), so a rule warning is a failure too.
  warnings.forEach((w) => fail(`check-state warning: ${w}`));
  if (parsed && !errors.length) {
    const mods = state.curriculum?.modules ?? [];
    if (mods.length < 5) fail(`only ${mods.length} modules`);
    if (mods[0]?.id !== "m00") fail("the first module isn't m00 (role map)");
    // Portfolio or interview-prep modules may teach no catalog skill, so these are notes, not failures.
    for (const m of mods.slice(1)) if (!m.skills?.length) console.log(`[${name}] note: module ${m.id} (${m.title}) lists no skills`);
    const range = state.learner?.preferences?.scope === "full-role" ? [15, 21] : [11, 15];
    if (mods.length < range[0] || mods.length > range[1]) console.log(`[${name}] note: ${mods.length} modules, plan.md expects ${range.join("–")} including m00`);
    if (!state.curriculum?.coverage?.length) fail("no coverage map");
    if (mods.filter((m) => m.status === "active").length !== 1) fail("expected exactly one active module");
    sc.check(state, out, fail);
  }
  for (const f of failures) console.log(`[${name}] FAIL ${f}`);
  console.log(`[${name}] ${failures.length ? `${failures.length} failures` : "passed"}; transcript: ${join(dir, "e2e-transcript.txt")}`);
  return failures.length === 0;
}

const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(scenarios);
for (const n of names) if (!scenarios[n]) (console.error(`Unknown scenario "${n}"; use: ${Object.keys(scenarios).join(", ")}`), process.exit(2));
const results = names.map(run);
process.exit(results.every(Boolean) ? 0 : 1);
