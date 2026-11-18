// Shared helpers for reading and summarizing learner/usage/usage.jsonl.
import { readFileSync, existsSync } from "node:fs";

export function loadUsage(file) {
  if (!existsSync(file)) return [];
  const out = [];
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      out.push(JSON.parse(line));
    } catch {}
  }
  return out;
}

export function loadPricing(file) {
  if (!file || !existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function priceFor(pricing, model) {
  if (!pricing?.models || !model) return null;
  if (pricing.models[model]) return pricing.models[model];
  let best = null;
  for (const key of Object.keys(pricing.models)) if (model.startsWith(key) && (!best || key.length > best.length)) best = key;
  return best ? pricing.models[best] : null;
}

export function costOf(r, pricing) {
  const p = priceFor(pricing, r.response_model ?? r.model);
  if (!p || r.input_tokens == null) return null;
  const cached = r.cached_input_tokens ?? 0;
  const uncached = Math.max(0, r.input_tokens - cached);
  const cachedRate = p.cached_input_per_mtok ?? p.input_per_mtok;
  return (uncached * p.input_per_mtok + cached * cachedRate + (r.output_tokens ?? 0) * (p.output_per_mtok ?? 0)) / 1e6;
}

const pct = (xs, q) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * s.length))];
};

function group(records, pricing) {
  const g = { requests: 0, errors: 0, input_tokens: 0, output_tokens: 0, cached_input_tokens: 0, unknown_tokens: 0, cost: 0, priced: 0 };
  const lat = [];
  const ttfb = [];
  for (const r of records) {
    g.requests++;
    const failed = Boolean(r.error || (r.status && r.status >= 400));
    if (failed) g.errors++;
    else if (r.input_tokens == null && r.output_tokens == null) g.unknown_tokens++;
    g.input_tokens += r.input_tokens ?? 0;
    g.output_tokens += r.output_tokens ?? 0;
    g.cached_input_tokens += r.cached_input_tokens ?? 0;
    if (typeof r.latency_ms === "number") lat.push(r.latency_ms);
    if (r.stream && typeof r.ttfb_ms === "number") ttfb.push(r.ttfb_ms);
    const c = costOf(r, pricing);
    if (c != null) {
      g.cost += c;
      g.priced++;
    }
  }
  g.latency_p50_ms = pct(lat, 0.5);
  g.latency_p95_ms = pct(lat, 0.95);
  g.ttfb_p50_ms = pct(ttfb, 0.5);
  g.cost = g.priced ? Math.round(g.cost * 10000) / 10000 : null;
  delete g.priced;
  return g;
}

export function summarize(records, { pricing = null, state = null } = {}) {
  const byModule = {};
  const byModel = {};
  for (const r of records) {
    (byModule[r.module ?? "unknown"] ??= []).push(r);
    (byModel[`${r.provider}/${r.response_model ?? r.model ?? "unknown"}`] ??= []).push(r);
  }
  const modules = Object.fromEntries(Object.entries(byModule).map(([k, v]) => [k, group(v, pricing)]));
  const models = Object.fromEntries(Object.entries(byModel).map(([k, v]) => [k, group(v, pricing)]));
  const total = group(records, pricing);

  // Projection for a full curriculum, based on completed modules that made LLM calls.
  let projection = null;
  const mods = state?.curriculum?.modules ?? [];
  const finished = mods.filter((m) => ["completed", "assisted"].includes(m.status) && modules[m.id]);
  const llmModules = mods.filter((m) => m.type !== "theory");
  if (finished.length) {
    const avg = (k) => finished.reduce((a, m) => a + (modules[m.id][k] ?? 0), 0) / finished.length;
    projection = {
      based_on_modules: finished.map((m) => m.id),
      modules_with_assignments: llmModules.length,
      avg_input_tokens_per_module: Math.round(avg("input_tokens")),
      avg_output_tokens_per_module: Math.round(avg("output_tokens")),
      est_input_tokens_curriculum: Math.round(avg("input_tokens") * llmModules.length),
      est_output_tokens_curriculum: Math.round(avg("output_tokens") * llmModules.length),
      est_cost_curriculum: finished.every((m) => modules[m.id].cost != null)
        ? Math.round(avg("cost") * llmModules.length * 100) / 100
        : null,
    };
  }
  return { total, modules, models, projection, currency: pricing?.currency ?? null };
}
