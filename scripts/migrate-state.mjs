#!/usr/bin/env node
// Upgrades learner/state.json and learner/modules/* to the current schema (v2).
// v1 used Turkish enum values and file names; v2 uses English ones.
// Safe to run more than once. Writes a backup before changing anything.
//
//   node scripts/migrate-state.mjs            migrate learner/
//   node scripts/migrate-state.mjs --dry-run  show what would change

import { readFileSync, writeFileSync, existsSync, readdirSync, renameSync, statSync } from "node:fs";
import { dirname, join, resolve, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const learnerDir = join(root, "learner");
const statePath = join(learnerDir, "state.json");
const dry = process.argv.includes("--dry-run");
const CURRENT = 2;
const log = (m) => console.log((dry ? "[dry-run] " : "") + m);

if (!existsSync(statePath)) {
  console.log("No learner/state.json found; nothing to migrate.");
  process.exit(0);
}

const raw = readFileSync(statePath, "utf8");
const state = JSON.parse(raw);
const from = state.schema_version ?? 1;
if (from >= CURRENT) {
  console.log(`state.json is already at schema v${from}; nothing to do.`);
  process.exit(0);
}

const STATUS = { aktif: "active", kilitli: "locked", tamamlandi: "completed", yardimla: "assisted" };
const STAGE = { ders: "lesson", quiz: "quiz", pekistirme: "review", odev: "assignment", degerlendirme: "evaluation", bitti: "done" };
const TYPE = { teorik: "theory", uygulama: "practice", karma: "mixed", bitirme: "capstone" };
const ROLE = { "ai-yetkin-gelistirici": "ai-fluent-developer" };
const PHASE = { deneme: "trial" };
const FILES = [
  ["ders.md", "lesson.md"],
  ["gorsel.html", "visual.html"],
  ["ornekler", "examples"],
  ["pekistirme.md", "review.md"],
  ["odev.md", "assignment.md"],
  ["calisma", "work"],
  ["degerlendirme.md", "evaluation.md"],
];
const remedial = /^odev-telafi-(\d+)\.md$/;
const TEXT_EXT = new Set([".md", ".html", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".py", ".json", ".txt", ".sh"]);

// ---- state.json ----
const map = (table, v) => (v != null && table[v] ? table[v] : v);
const l = state.learner ?? (state.learner = {});
if (!l.language) {
  const sample = JSON.stringify(state);
  l.language = /[çğıöşüÇĞİÖŞÜ]/.test(sample) || "hitap" in l ? "tr" : "en";
  log(`learner.language set to "${l.language}"`);
}
if ("hitap" in l) {
  l.form_of_address = l.form_of_address ?? (l.hitap === "sen" ? "informal" : l.hitap === "siz" ? "formal" : l.hitap);
  delete l.hitap;
  log("learner.hitap → learner.form_of_address");
}
if (state.target_role?.id && ROLE[state.target_role.id]) {
  log(`target_role.id ${state.target_role.id} → ${ROLE[state.target_role.id]}`);
  state.target_role.id = ROLE[state.target_role.id];
}
for (const p of state.curriculum?.phases ?? []) p.id = map(PHASE, p.id);
for (const m of state.curriculum?.modules ?? []) {
  m.status = map(STATUS, m.status);
  m.stage = map(STAGE, m.stage);
  m.type = map(TYPE, m.type);
  m.phase = map(PHASE, m.phase);
}
state.schema_version = CURRENT;
log(`modules: status/stage/type values translated (${state.curriculum?.modules?.length ?? 0} modules)`);

// ---- module files ----
const pathFixes = [
  [/ornekler\//g, "examples/"],
  [/calisma\//g, "work/"],
  [/\bgorsel\.html\b/g, "visual.html"],
  [/\bders\.md\b/g, "lesson.md"],
  [/\bpekistirme\.md\b/g, "review.md"],
  [/\bodev\.md\b/g, "assignment.md"],
  [/\bdegerlendirme\.md\b/g, "evaluation.md"],
];
const modulesDir = join(learnerDir, "modules");
if (existsSync(modulesDir)) {
  for (const mod of readdirSync(modulesDir)) {
    const dir = join(modulesDir, mod);
    if (!statSync(dir).isDirectory()) continue;
    for (const [a, b] of FILES) {
      if (existsSync(join(dir, a)) && !existsSync(join(dir, b))) {
        log(`${mod}/${a} → ${mod}/${b}`);
        if (!dry) renameSync(join(dir, a), join(dir, b));
      }
    }
    for (const f of readdirSync(dir)) {
      const m = f.match(remedial);
      if (m) {
        log(`${mod}/${f} → ${mod}/assignment-remedial-${m[1]}.md`);
        if (!dry) renameSync(join(dir, f), join(dir, `assignment-remedial-${m[1]}.md`));
      }
    }
    // fix path references inside every text file of the module (lessons, visuals, example code, work)
    const walk = (d) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) {
          if (f !== "node_modules" && !f.startsWith(".")) walk(p);
          continue;
        }
        if (!TEXT_EXT.has(extname(f).toLowerCase())) continue;
        const before = readFileSync(p, "utf8");
        const after = pathFixes.reduce((s, [re, to]) => s.replace(re, to), before);
        if (after !== before) {
          if (!dry) writeFileSync(p, after);
          log(`${relative(modulesDir, p)}: file references updated`);
        }
      }
    };
    walk(dir);
  }
}
if (existsSync(join(learnerDir, "_arsiv")) && !existsSync(join(learnerDir, "_archive"))) {
  log("learner/_arsiv → learner/_archive");
  if (!dry) renameSync(join(learnerDir, "_arsiv"), join(learnerDir, "_archive"));
}

if (!dry) {
  writeFileSync(join(learnerDir, `state.v${from}.backup.json`), raw);
  writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
}
log(`state.json migrated v${from} → v${CURRENT}${dry ? "" : ` (backup: learner/state.v${from}.backup.json)`}`);
