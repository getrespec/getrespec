#!/usr/bin/env node
// Summarizes LLM usage recorded by scripts/llm-proxy.mjs.
//
//   node scripts/usage-report.mjs                 all modules
//   node scripts/usage-report.mjs --module m04    one module
//   node scripts/usage-report.mjs --json          machine-readable output
//
// Costs are shown only if learner/pricing.json exists (prices change; keep them current):
//   { "currency": "USD", "as_of": "2026-11-18", "source": "<url>",
//     "models": { "<model id or prefix>": { "input_per_mtok": 0, "cached_input_per_mtok": 0, "output_per_mtok": 0 } } }

import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadUsage, loadPricing, summarize } from "./lib/usage.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const learnerDir = resolve(root, flag("--learner") ?? "learner");
const file = resolve(root, flag("--file") ?? join(learnerDir, "usage", "usage.jsonl"));
const only = flag("--module");

let records = loadUsage(file);
if (only) records = records.filter((r) => r.module === only);
const pricing = loadPricing(join(learnerDir, "pricing.json"));
const statePath = join(learnerDir, "state.json");
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : null;
const s = summarize(records, { pricing, state });

if (args.includes("--json")) {
  console.log(JSON.stringify(s, null, 2));
  process.exit(0);
}
if (!records.length) {
  console.log(`No LLM usage recorded${only ? ` for ${only}` : ""} (${file}).`);
  console.log("Start the proxy with `node scripts/llm-proxy.mjs` and point assignment code at it.");
  process.exit(0);
}

const n = (v) => (v == null ? "—" : Number(v).toLocaleString("en-US"));
const ms = (v) => (v == null ? "—" : `${v} ms`);
const money = (v) => (v == null ? "—" : `${v.toFixed(4)} ${s.currency ?? ""}`.trim());
const row = (name, g) =>
  [name.padEnd(28), n(g.requests).padStart(5), n(g.errors).padStart(4), n(g.input_tokens).padStart(10), n(g.output_tokens).padStart(9), n(g.cached_input_tokens).padStart(9), ms(g.latency_p50_ms).padStart(9), ms(g.latency_p95_ms).padStart(9), ms(g.ttfb_p50_ms).padStart(9), money(g.cost).padStart(12)].join("  ");
const header = ["".padEnd(28), "reqs".padStart(5), "err".padStart(4), "input tok".padStart(10), "output".padStart(9), "cached".padStart(9), "p50".padStart(9), "p95".padStart(9), "ttfb p50".padStart(9), "cost".padStart(12)].join("  ");

console.log("By module\n" + header);
for (const [k, g] of Object.entries(s.modules)) console.log(row(k, g));
console.log("\nBy model\n" + header);
for (const [k, g] of Object.entries(s.models)) console.log(row(k, g));
console.log("\n" + header + "\n" + row("TOTAL", s.total));
if (s.total.unknown_tokens) console.log(`\n${s.total.unknown_tokens} request(s) had no usage data (see "note" in the log).`);
if (s.projection) {
  const p = s.projection;
  console.log(
    `\nProjection from ${p.based_on_modules.length} completed module(s): ~${n(p.avg_input_tokens_per_module)} input / ~${n(p.avg_output_tokens_per_module)} output tokens per module` +
      ` → ~${n(p.est_input_tokens_curriculum)} / ~${n(p.est_output_tokens_curriculum)} for ${p.modules_with_assignments} modules with assignments` +
      (p.est_cost_curriculum != null ? ` (~${p.est_cost_curriculum} ${s.currency ?? ""})` : "")
  );
}
if (!pricing) console.log("\nNo learner/pricing.json → costs not shown.");
