#!/usr/bin/env node
// Checks learner/state.json against the rules in AGENTS.md. The agent runs it after every write.
//
//   node scripts/check-state.mjs              check learner/state.json
//   node scripts/check-state.mjs <file>       check another state file
//
// Exit code 1 when there are errors (fix them before going on); warnings alone exit 0.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readCatalog } from "./lib/skills.mjs";
import { checkState } from "./lib/check-state.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = resolve(process.argv[2] ?? join(root, "learner", "state.json"));
if (!existsSync(file)) {
  console.log(`No ${file}; nothing to check.`);
  process.exit(0);
}
let state;
try {
  state = JSON.parse(readFileSync(file, "utf8"));
} catch (e) {
  console.log(`error: ${file} isn't valid JSON: ${e.message}`);
  process.exit(1);
}
const packIds = readdirSync(join(root, "data", "roles"))
  .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
  .map((f) => f.slice(0, -3));
const { errors, warnings } = checkState(state, { catalog: readCatalog(join(root, "data", "skills.md")), packIds });
for (const e of errors) console.log(`error: ${e}`);
for (const w of warnings) console.log(`warning: ${w}`);
console.log(errors.length || warnings.length ? `${errors.length} errors, ${warnings.length} warnings` : "state.json is valid");
process.exit(errors.length ? 1 : 0);
