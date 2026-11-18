#!/usr/bin/env node
// Respec local LLM proxy.
//
// Assignment code that calls an LLM API points its base URL at this proxy instead of the
// provider. The proxy forwards each request unchanged, streams the response back, and logs
// one line of metrics per request to learner/usage/usage.jsonl:
//   timestamp, active module, provider, model, stream, status, latency, time to first byte,
//   input/output/cached tokens.
// Prompt and response content are NEVER logged, and neither are API keys.
//
// Usage:
//   node scripts/llm-proxy.mjs                 (port 8787; RESPEC_PROXY_PORT to change)
//
// Base URLs for SDKs:
//   OpenAI      http://localhost:8787/openai/v1
//   Anthropic   http://localhost:8787/anthropic
//   OpenRouter  http://localhost:8787/openrouter/api/v1
//   Ollama      http://localhost:8787/ollama/v1
//
// Keys: if a request has no auth header, the proxy adds the matching key from learner/.env
// (OPENAI_API_KEY, ANTHROPIC_API_KEY, OPENROUTER_API_KEY). Ollama needs none.
// Upstreams can be overridden with RESPEC_UPSTREAM_<PROVIDER> (used by tests).
//
// Later, the Respec Sandbox API will expose the same paths, so switching is a base URL change.

import http from "node:http";
import { readFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const learnerDir = process.env.RESPEC_LEARNER_DIR ? resolve(process.env.RESPEC_LEARNER_DIR) : join(root, "learner");
const usageDir = join(learnerDir, "usage");
const usageFile = join(usageDir, "usage.jsonl");
const PORT = Number(process.env.RESPEC_PROXY_PORT || 8787);

// ---------- env ----------
function loadEnv() {
  const p = join(learnerDir, ".env");
  const out = {};
  if (!existsSync(p)) return out;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}
const env = { ...loadEnv(), ...process.env };

const PROVIDERS = {
  openai: {
    upstream: env.RESPEC_UPSTREAM_OPENAI || "https://api.openai.com",
    auth: (h) => !h.authorization && env.OPENAI_API_KEY && (h.authorization = `Bearer ${env.OPENAI_API_KEY}`),
  },
  anthropic: {
    upstream: env.RESPEC_UPSTREAM_ANTHROPIC || "https://api.anthropic.com",
    auth: (h) => {
      if (!h["x-api-key"] && !h.authorization && env.ANTHROPIC_API_KEY) h["x-api-key"] = env.ANTHROPIC_API_KEY;
      if (!h["anthropic-version"]) h["anthropic-version"] = "2023-06-01";
    },
  },
  openrouter: {
    upstream: env.RESPEC_UPSTREAM_OPENROUTER || "https://openrouter.ai",
    auth: (h) => !h.authorization && env.OPENROUTER_API_KEY && (h.authorization = `Bearer ${env.OPENROUTER_API_KEY}`),
  },
  ollama: {
    upstream: env.RESPEC_UPSTREAM_OLLAMA || "http://localhost:11434",
    auth: () => {},
  },
};

// ---------- helpers ----------
function activeModule() {
  try {
    const s = JSON.parse(readFileSync(join(learnerDir, "state.json"), "utf8"));
    return s.curriculum?.modules?.find((m) => m.status === "active")?.id ?? null;
  } catch {
    return null;
  }
}

const num = (v) => (typeof v === "number" && isFinite(v) ? v : null);

// Normalizes the usage object shapes of OpenAI Chat Completions, OpenAI Responses,
// Anthropic Messages, and OpenAI-compatible servers (OpenRouter, Ollama).
function readUsage(u, acc) {
  if (!u || typeof u !== "object") return;
  const input = num(u.prompt_tokens) ?? num(u.input_tokens);
  const output = num(u.completion_tokens) ?? num(u.output_tokens);
  const cached =
    num(u.prompt_tokens_details?.cached_tokens) ?? num(u.input_tokens_details?.cached_tokens) ?? num(u.cache_read_input_tokens);
  const cacheWrite = num(u.cache_creation_input_tokens);
  if (input !== null) acc.input_tokens = Math.max(acc.input_tokens ?? 0, input);
  if (output !== null) acc.output_tokens = Math.max(acc.output_tokens ?? 0, output);
  if (cached !== null) acc.cached_input_tokens = Math.max(acc.cached_input_tokens ?? 0, cached);
  if (cacheWrite !== null) acc.cache_write_tokens = Math.max(acc.cache_write_tokens ?? 0, cacheWrite);
}

function readEvent(obj, acc) {
  if (!obj || typeof obj !== "object") return;
  readUsage(obj.usage, acc); // OpenAI final chunk, Anthropic message_delta, generic
  readUsage(obj.message?.usage, acc); // Anthropic message_start
  readUsage(obj.response?.usage, acc); // OpenAI Responses: response.completed
  if (!acc.response_model) acc.response_model = obj.model ?? obj.message?.model ?? obj.response?.model ?? undefined;
  if (obj.error || obj.type === "error") acc.error = acc.error ?? (obj.error?.type || obj.error?.code || "error");
}

function log(record) {
  try {
    mkdirSync(usageDir, { recursive: true });
    appendFileSync(usageFile, JSON.stringify(record) + "\n");
  } catch (e) {
    console.error("[respec-proxy] could not write usage log:", e.message);
  }
}

const HOP = new Set(["host", "connection", "content-length", "transfer-encoding", "keep-alive", "upgrade", "accept-encoding"]);

// ---------- server ----------
const server = http.createServer(async (req, res) => {
  const started = Date.now();
  const url = new URL(req.url, "http://localhost");
  const [, provider, ...rest] = url.pathname.split("/");

  if (url.pathname === "/" || url.pathname === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, providers: Object.keys(PROVIDERS), log: "learner/usage/usage.jsonl" }));
    return;
  }
  const p = PROVIDERS[provider];
  if (!p) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: `Unknown provider "${provider}". Use one of: ${Object.keys(PROVIDERS).join(", ")}` }));
    return;
  }

  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = Buffer.concat(chunks);
  let reqJson = null;
  try {
    if (body.length) reqJson = JSON.parse(body.toString("utf8"));
  } catch {}

  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) if (!HOP.has(k)) headers[k] = v;
  headers["accept-encoding"] = "identity";
  p.auth(headers);

  const target = p.upstream.replace(/\/$/, "") + "/" + rest.join("/") + url.search;
  const acc = {};
  const record = {
    ts: new Date().toISOString(),
    module: activeModule(),
    provider,
    path: "/" + rest.join("/"),
    model: reqJson?.model ?? null,
    stream: Boolean(reqJson?.stream),
    status: null,
    latency_ms: null,
    ttfb_ms: null,
    input_tokens: null,
    output_tokens: null,
    cached_input_tokens: null,
  };

  let upstream;
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : body,
    });
  } catch (e) {
    record.status = 502;
    record.latency_ms = Date.now() - started;
    record.error = "upstream_unreachable";
    log(record);
    res.writeHead(502, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: `Respec proxy could not reach ${provider}: ${e.message}` }));
    return;
  }

  record.status = upstream.status;
  const outHeaders = {};
  upstream.headers.forEach((v, k) => {
    if (!["content-encoding", "content-length", "transfer-encoding", "connection"].includes(k)) outHeaders[k] = v;
  });
  res.writeHead(upstream.status, outHeaders);

  const isSSE = (upstream.headers.get("content-type") || "").includes("text/event-stream");
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";
  try {
    if (upstream.body) {
      for await (const chunk of upstream.body) {
        if (record.ttfb_ms === null) record.ttfb_ms = Date.now() - started;
        res.write(chunk);
        const text = decoder.decode(chunk, { stream: true });
        if (isSSE) {
          buffer += text;
          let i;
          while ((i = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, i).trim();
            buffer = buffer.slice(i + 1);
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              readEvent(JSON.parse(data), acc);
            } catch {}
          }
        } else if (full.length < 5_000_000) {
          full += text;
        }
      }
    }
  } catch (e) {
    record.error = "stream_interrupted";
  }
  res.end();

  if (!isSSE && full) {
    try {
      readEvent(JSON.parse(full), acc);
    } catch {}
  }
  record.latency_ms = Date.now() - started;
  record.input_tokens = acc.input_tokens ?? null;
  record.output_tokens = acc.output_tokens ?? null;
  record.cached_input_tokens = acc.cached_input_tokens ?? null;
  if (acc.cache_write_tokens != null) record.cache_write_tokens = acc.cache_write_tokens;
  if (acc.response_model && acc.response_model !== record.model) record.response_model = acc.response_model;
  if (acc.error || upstream.status >= 400) record.error = acc.error ?? `http_${upstream.status}`;
  if (record.stream && record.output_tokens === null && provider !== "anthropic") {
    record.note = "no usage in stream; for OpenAI-compatible APIs set stream_options: { include_usage: true }";
  }
  log(record);

  const tok = record.input_tokens != null ? ` ${record.input_tokens}→${record.output_tokens ?? "?"} tok` : "";
  console.log(`[respec-proxy] ${record.module ?? "-"} ${provider} ${record.model ?? ""} ${record.status} ${record.latency_ms}ms${tok}`);
});

server.listen(PORT, () => {
  console.log(`Respec LLM proxy listening on http://localhost:${PORT}`);
  console.log(`  OpenAI     → http://localhost:${PORT}/openai/v1`);
  console.log(`  Anthropic  → http://localhost:${PORT}/anthropic`);
  console.log(`  OpenRouter → http://localhost:${PORT}/openrouter/api/v1`);
  console.log(`  Ollama     → http://localhost:${PORT}/ollama/v1`);
  console.log(`Logging metrics (no prompts, no keys) to ${usageFile}`);
});
