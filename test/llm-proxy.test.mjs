// Tests for scripts/llm-proxy.mjs against fake providers. Run: node --test test/
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const learnerDir = mkdtempSync(join(tmpdir(), "respec-learner-"));
const SECRET = "sk-test-SECRET-should-never-be-logged";
writeFileSync(join(learnerDir, ".env"), `OPENAI_API_KEY=${SECRET}\nANTHROPIC_API_KEY="${SECRET}"\n`);
writeFileSync(
  join(learnerDir, "state.json"),
  JSON.stringify({ schema_version: 2, learner: {}, curriculum: { modules: [{ id: "m07", status: "active" }] } })
);

let seenAuth = {};
const sse = (res, events) => {
  res.writeHead(200, { "content-type": "text/event-stream" });
  for (const e of events) res.write((e.event ? `event: ${e.event}\n` : "") + `data: ${typeof e.data === "string" ? e.data : JSON.stringify(e.data)}\n\n`);
  res.end();
};

const fake = http.createServer(async (req, res) => {
  let body = "";
  for await (const c of req) body += c;
  const json = body ? JSON.parse(body) : {};
  seenAuth = { authorization: req.headers.authorization, xApiKey: req.headers["x-api-key"], version: req.headers["anthropic-version"] };
  await new Promise((r) => setTimeout(r, 30));
  if (req.url === "/v1/chat/completions" && !json.stream) {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify({ model: "gpt-x-2026", choices: [{ message: { content: "secret prompt echo" } }], usage: { prompt_tokens: 120, completion_tokens: 30, prompt_tokens_details: { cached_tokens: 64 } } }));
  }
  if (req.url === "/v1/chat/completions" && json.stream) {
    const events = [
      { data: { choices: [{ delta: { content: "Hel" } }], usage: null } },
      { data: { choices: [{ delta: { content: "lo" } }], usage: null } },
    ];
    if (json.stream_options?.include_usage) events.push({ data: { choices: [], usage: { prompt_tokens: 50, completion_tokens: 2 } } });
    events.push({ data: "[DONE]" });
    return sse(res, events);
  }
  if (req.url === "/v1/responses") {
    return sse(res, [
      { event: "response.output_text.delta", data: { type: "response.output_text.delta", delta: "Hi" } },
      { event: "response.completed", data: { type: "response.completed", response: { model: "gpt-y", usage: { input_tokens: 77, output_tokens: 5, input_tokens_details: { cached_tokens: 0 } } } } },
    ]);
  }
  if (req.url === "/v1/messages") {
    if (json.model === "bad") {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ type: "error", error: { type: "invalid_request_error", message: "bad model" } }));
    }
    return sse(res, [
      { event: "message_start", data: { type: "message_start", message: { model: "claude-test", usage: { input_tokens: 200, output_tokens: 1, cache_read_input_tokens: 150 } } } },
      { event: "content_block_delta", data: { type: "content_block_delta", delta: { type: "text_delta", text: "Merhaba" } } },
      { event: "message_delta", data: { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 42 } } },
      { event: "message_stop", data: { type: "message_stop" } },
    ]);
  }
  res.writeHead(404);
  res.end();
});

let proxy, fakePort, proxyPort;
const base = () => `http://localhost:${proxyPort}`;
const records = () =>
  existsSync(join(learnerDir, "usage", "usage.jsonl"))
    ? readFileSync(join(learnerDir, "usage", "usage.jsonl"), "utf8").trim().split("\n").map((l) => JSON.parse(l))
    : [];
const post = (path, body, headers = {}) =>
  fetch(base() + path, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
const settle = () => new Promise((r) => setTimeout(r, 80));

before(async () => {
  await new Promise((r) => fake.listen(0, r));
  fakePort = fake.address().port;
  proxyPort = 20000 + Math.floor(Math.random() * 20000);
  proxy = spawn(process.execPath, [join(root, "scripts", "llm-proxy.mjs")], {
    env: {
      ...process.env,
      RESPEC_PROXY_PORT: String(proxyPort),
      RESPEC_LEARNER_DIR: learnerDir,
      RESPEC_UPSTREAM_OPENAI: `http://localhost:${fakePort}`,
      RESPEC_UPSTREAM_ANTHROPIC: `http://localhost:${fakePort}`,
    },
    stdio: ["ignore", "pipe", "inherit"],
  });
  await new Promise((resolve) => proxy.stdout.once("data", resolve));
});

after(() => {
  proxy?.kill();
  fake.close();
});

test("OpenAI JSON: forwards response, injects key, logs usage", async () => {
  const r = await post("/openai/v1/chat/completions", { model: "gpt-x", messages: [{ role: "user", content: "secret prompt" }] });
  const j = await r.json();
  assert.equal(j.choices[0].message.content, "secret prompt echo");
  assert.equal(seenAuth.authorization, `Bearer ${SECRET}`);
  await settle();
  const rec = records().at(-1);
  assert.equal(rec.module, "m07");
  assert.equal(rec.provider, "openai");
  assert.equal(rec.model, "gpt-x");
  assert.equal(rec.response_model, "gpt-x-2026");
  assert.equal(rec.input_tokens, 120);
  assert.equal(rec.output_tokens, 30);
  assert.equal(rec.cached_input_tokens, 64);
  assert.ok(rec.latency_ms >= 25);
});

test("Client's own auth header is not overwritten", async () => {
  await post("/openai/v1/chat/completions", { model: "gpt-x", messages: [] }, { authorization: "Bearer client-key" });
  assert.equal(seenAuth.authorization, "Bearer client-key");
});

test("OpenAI stream with include_usage: body passes through, usage logged", async () => {
  const r = await post("/openai/v1/chat/completions", { model: "gpt-x", stream: true, stream_options: { include_usage: true } });
  const text = await r.text();
  assert.match(text, /Hel/);
  assert.match(text, /\[DONE\]/);
  await settle();
  const rec = records().at(-1);
  assert.equal(rec.stream, true);
  assert.equal(rec.input_tokens, 50);
  assert.equal(rec.output_tokens, 2);
  assert.ok(rec.ttfb_ms !== null && rec.ttfb_ms <= rec.latency_ms);
});

test("OpenAI stream without include_usage: tokens null with a hint", async () => {
  await (await post("/openai/v1/chat/completions", { model: "gpt-x", stream: true })).text();
  await settle();
  const rec = records().at(-1);
  assert.equal(rec.output_tokens, null);
  assert.match(rec.note, /include_usage/);
});

test("OpenAI Responses API stream: usage from response.completed", async () => {
  await (await post("/openai/v1/responses", { model: "gpt-y", stream: true, input: "x" })).text();
  await settle();
  const rec = records().at(-1);
  assert.equal(rec.input_tokens, 77);
  assert.equal(rec.output_tokens, 5);
});

test("Anthropic stream: key + version injected, input/output/cache tokens logged", async () => {
  const text = await (await post("/anthropic/v1/messages", { model: "claude-test", stream: true, max_tokens: 100, messages: [] })).text();
  assert.match(text, /Merhaba/);
  assert.equal(seenAuth.xApiKey, SECRET);
  assert.equal(seenAuth.version, "2023-06-01");
  await settle();
  const rec = records().at(-1);
  assert.equal(rec.provider, "anthropic");
  assert.equal(rec.input_tokens, 200);
  assert.equal(rec.output_tokens, 42);
  assert.equal(rec.cached_input_tokens, 150);
});

test("Upstream error is passed through and recorded", async () => {
  const r = await post("/anthropic/v1/messages", { model: "bad", messages: [] });
  assert.equal(r.status, 400);
  await settle();
  const rec = records().at(-1);
  assert.equal(rec.status, 400);
  assert.equal(rec.error, "invalid_request_error");
});

test("Unknown provider returns 404 without logging", async () => {
  const before = records().length;
  const r = await post("/nope/v1/x", {});
  assert.equal(r.status, 404);
  await settle();
  assert.equal(records().length, before);
});

test("Log never contains keys or prompt/response content", async () => {
  const raw = readFileSync(join(learnerDir, "usage", "usage.jsonl"), "utf8");
  assert.ok(!raw.includes(SECRET));
  assert.ok(!raw.includes("client-key"));
  assert.ok(!raw.includes("secret prompt"));
  assert.ok(!raw.includes("Merhaba"));
});
