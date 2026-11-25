// Tests for scripts/serve.mjs. Run: node --test test/*.test.mjs
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, cpSync, readFileSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const learner = mkdtempSync(join(tmpdir(), "respec-serve-"));
cpSync(join(root, "examples", "learner-demo"), learner, { recursive: true });
writeFileSync(join(learner, ".env"), "OPENAI_API_KEY=sk-SECRET\n");
mkdirSync(join(learner, "cv"), { recursive: true });
writeFileSync(join(learner, "cv", "cv.md"), "PRIVATE CV");
writeFileSync(join(learner, "modules", "m02", "work", ".env"), "LEAK=1\n");
symlinkSync(join(learner, "cv", "cv.md"), join(learner, "modules", "m02", "work", "cv-link.md"));
const dist = mkdtempSync(join(tmpdir(), "respec-dist-"));
writeFileSync(join(dist, "index.html"), "<!doctype html><title>app</title>");

const port = 30000 + Math.floor(Math.random() * 20000);
let server;

// Raw request so we control the Host header and unnormalized paths.
function get(path, { host = `127.0.0.1:${port}`, method = "GET" } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port, path, method, headers: { host } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on("error", reject);
    req.end();
  });
}
const json = async (path) => {
  const r = await get(path);
  return { ...r, data: JSON.parse(r.body) };
};

before(async () => {
  server = spawn(process.execPath, [join(root, "scripts", "serve.mjs"), "--port", String(port), "--learner", learner, "--dist", dist], {
    stdio: ["ignore", "pipe", "inherit"],
    env: { ...process.env, RESPEC_NO_UPDATE_CHECK: "1" },
  });
  await new Promise((r) => server.stdout.once("data", r));
});
after(() => server?.kill());

test("serves state, profile, usage, and the module file list", async () => {
  const s = await json("/api/state");
  assert.equal(s.status, 200);
  assert.equal(s.data.schema_version, 2);
  const p = await json("/api/profile");
  assert.match(p.data.markdown, /# Profile/);
  const u = await json("/api/usage");
  assert.equal(u.data.summary.total.requests, 61);
  const m = await json("/api/modules/m02");
  const paths = m.data.files.map((f) => f.path);
  assert.ok(paths.includes("modules/m02/work/src/Chat.tsx"));
  assert.ok(!paths.some((p) => p.includes(".env")), "dotfiles are not listed");
});

test("serves ui-strings.json when the agent wrote one, 404 otherwise", async () => {
  assert.equal((await get("/api/ui-strings")).status, 404);
  writeFileSync(join(learner, "ui-strings.json"), JSON.stringify({ language: "de", strings: { overview: "Übersicht" } }));
  const r = await json("/api/ui-strings");
  assert.equal(r.status, 200);
  assert.equal(r.data.strings.overview, "Übersicht");
  writeFileSync(join(learner, "ui-strings.json"), "{ not json");
  assert.equal((await get("/api/ui-strings")).status, 404);
});

test("reads module text files", async () => {
  const f = await json("/api/file?path=" + encodeURIComponent("modules/m02/work/src/route.ts"));
  assert.equal(f.status, 200);
  assert.match(f.data.content, /ReadableStream/);
});

test("refuses anything outside modules/ and any dotfile", async () => {
  for (const p of [
    "modules/../state.json",
    "modules/%2e%2e/.env",
    "../.env",
    ".env",
    "cv/cv.md",
    "modules/m02/work/.env",
    "modules/m02/../../cv/cv.md",
    "/etc/passwd",
    "modules/m02/work/cv-link.md",
  ]) {
    const r = await get("/api/file?path=" + encodeURIComponent(p));
    assert.equal(r.status, 403, p);
    assert.ok(!r.body.includes("SECRET") && !r.body.includes("PRIVATE") && !r.body.includes("LEAK"), p);
  }
  for (const p of ["/files/modules/m02/work/cv-link.md", "/files/modules/../.env", "/files/modules/%2e%2e/cv/cv.md", "/files/cv/cv.md", "/files/modules/m02/work/.env"]) {
    const r = await get(p);
    assert.equal(r.status, 404, p);
    assert.ok(!r.body.includes("SECRET") && !r.body.includes("PRIVATE") && !r.body.includes("LEAK"), p);
  }
});

test("a missing module file is 404, not 403", async () => {
  assert.equal((await get("/api/file?path=" + encodeURIComponent("modules/m02/work/nope.ts"))).status, 404);
  assert.equal((await get("/files/modules/m02/work/nope.ts")).status, 404);
});

test("raw module files are sandboxed", async () => {
  const r = await get("/files/modules/m01/visual.html");
  assert.equal(r.status, 200);
  assert.match(r.headers["content-security-policy"], /sandbox allow-scripts/);
  assert.match(r.headers["content-type"], /text\/html/);
});

test("rejects foreign Host headers and non-GET methods", async () => {
  assert.equal((await get("/api/state", { host: "evil.example:80" })).status, 403);
  assert.equal((await get("/api/state", { method: "POST" })).status, 405);
  assert.equal((await get("/api/state", { method: "DELETE" })).status, 405);
});

test("serves the app with an SPA fallback", async () => {
  const r = await get("/some/route");
  assert.equal(r.status, 200);
  assert.match(r.body, /<title>app<\/title>/);
});

test("pushes a change event when a module file changes", async () => {
  const event = new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port, path: "/api/events", headers: { host: `127.0.0.1:${port}` } }, (res) => {
      let buf = "";
      res.on("data", (c) => {
        buf += c;
        if (buf.includes("event: ready")) {
          setTimeout(() => writeFileSync(join(learner, "modules", "m04", "quiz.md"), "# new quiz"), 100);
        }
        const m = buf.match(/event: change\ndata: (.+)\n/);
        if (m) {
          req.destroy();
          resolve(JSON.parse(m[1]));
        }
      });
    });
    req.on("error", (e) => (e.code === "ECONNRESET" ? null : reject(e)));
    req.end();
    setTimeout(() => reject(new Error("no change event")), 4000);
  });
  const data = await event;
  assert.ok(data.paths.some((p) => p.endsWith("m04/quiz.md")));
});

test("old schema is reported, not served", async () => {
  const old = mkdtempSync(join(tmpdir(), "respec-old-"));
  writeFileSync(join(old, "state.json"), JSON.stringify({ learner: {}, curriculum: { modules: [] } }));
  const p2 = port + 1;
  const s2 = spawn(process.execPath, [join(root, "scripts", "serve.mjs"), "--port", String(p2), "--learner", old, "--dist", dist], { stdio: ["ignore", "pipe", "inherit"] });
  await new Promise((r) => s2.stdout.once("data", r));
  const r = await new Promise((resolve) =>
    http.get({ host: "127.0.0.1", port: p2, path: "/api/state", headers: { host: `127.0.0.1:${p2}` } }, (res) => resolve(res.statusCode))
  );
  s2.kill();
  assert.equal(r, 409);
});

test("reports the installed version", async () => {
  const r = await json("/api/version");
  assert.equal(r.status, 200);
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(r.data.current, pkg.version);
  assert.equal(r.data.update_available, false);
  assert.equal(r.data.disabled, true);
});
