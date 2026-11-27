// scripts/check-state.mjs: the rules in AGENTS.md "state.json rules". Run: node --test test/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { readCatalog } from "../scripts/lib/skills.mjs";
import { checkState } from "../scripts/lib/check-state.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const demoPath = join(root, "examples/learner-demo/state.json");
const demo = () => JSON.parse(readFileSync(demoPath, "utf8"));
const catalog = readCatalog(join(root, "data/skills.md"));
const check = (state) => checkState(state, { catalog, packIds: ["ai-engineer"] });
const mod = (s, id) => s.curriculum.modules.find((m) => m.id === id);
const cov = (s, id) => s.curriculum.coverage.find((c) => c.id === id);

test("the demo state is valid, with no warnings", () => {
  assert.deepEqual(check(demo()), { errors: [], warnings: [] });
});

test("an old schema stops the check and names the migration", () => {
  const s = demo();
  s.schema_version = 2;
  assert.match(check(s).errors.join(), /run node scripts\/migrate-state\.mjs/);
});

test("errors: what breaks the dashboard or loses progress", () => {
  const cases = [
    [(s) => (mod(s, "m05").status = "active"), /2 modules are active \(m04, m05\)/],
    [(s) => (mod(s, "m05").stage = "lesson"), /module m05: locked but stage is "lesson"/],
    [(s) => (mod(s, "m01").stage = "quiz"), /module m01: completed but stage is "quiz"/],
    [(s) => (mod(s, "m01").stage = "assignment") && (mod(s, "m01").status = "active") && (mod(s, "m04").status = "locked") && (mod(s, "m04").stage = null), /theory module has no assignment stage/],
    [(s) => (mod(s, "m02").status = "aktif"), /module m02: status "aktif" isn't one of/],
    [(s) => (mod(s, "m02").phase = "f9"), /phase "f9" isn't in curriculum.phases/],
    [(s) => (mod(s, "m03").id = "m02"), /module m02: duplicate id/],
    [(s) => (mod(s, "m02").skills = ["llm.made-up"]), /skill "llm.made-up" isn't in data\/skills.md/],
    [(s) => (mod(s, "m02").completed_at = "25.11.2026"), /isn't a YYYY-MM-DD date/],
    [(s) => (cov(s, "llm.api").id = "A2"), /"A2" isn't in data\/skills.md/],
    [(s) => s.curriculum.coverage.push({ ...cov(s, "llm.api") }), /coverage llm.api: listed twice/],
    [(s) => (cov(s, "llm.api").modules = ["m99"]), /module m99 doesn't exist/],
    [(s) => (cov(s, "llm.api").modules = []), /covered but lists no module/],
    [(s) => (cov(s, "llm.api").depth = "expert"), /depth "expert" isn't one of/],
    [(s) => (s.weak_points[0].module = "m42"), /module m42 doesn't exist/],
  ];
  for (const [change, expected] of cases) {
    const s = demo();
    change(s);
    assert.match(check(s).errors.join("\n"), expected, String(expected));
  }
});

test("warnings: rules the agent should fix", () => {
  const cases = [
    [(s) => (s.curriculum.extra = 1), /curriculum: unknown field "extra"; put extra information in notes/],
    [(s) => (mod(s, "m09").skills = ["agent.loops", "quality.evals"]), /module m09: teaches quality.evals, but its coverage item doesn't list m09/],
    [(s) => ([mod(s, "m06").skills, mod(s, "m09").skills] = [mod(s, "m09").skills, mod(s, "m06").skills]), /module m06: teaches agent.loops, which needs quality.evals, taught later in m09/],
    [(s) => (s.weak_points[0].correct_count = 2), /remove the item at 2/],
    [(s) => (s.target_role.id = "prompt-wizard"), /"prompt-wizard" has no role pack/],
  ];
  for (const [change, expected] of cases) {
    const s = demo();
    change(s);
    const r = check(s);
    assert.match(r.warnings.join("\n"), expected, String(expected));
  }
});

test("the command exits 1 on errors and 0 on a valid state", () => {
  const run = (file) => {
    try {
      return { code: 0, out: execFileSync("node", [join(root, "scripts/check-state.mjs"), file], { encoding: "utf8" }) };
    } catch (e) {
      return { code: e.status, out: e.stdout };
    }
  };
  assert.deepEqual(run(demoPath), { code: 0, out: "state.json is valid\n" });
  const bad = join(mkdtempSync(join(tmpdir(), "respec-")), "state.json");
  const s = demo();
  s.curriculum.modules[0].status = "done";
  writeFileSync(bad, JSON.stringify(s));
  const r = run(bad);
  assert.equal(r.code, 1);
  assert.match(r.out, /^error: module m00: status "done"/m);
  writeFileSync(bad, "{ not json");
  assert.equal(run(bad).code, 1);
});
