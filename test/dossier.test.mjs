// Tests for scripts/dossier.mjs and scripts/lib/paths.mjs. Run: node --test test/*.test.mjs
//
// Setup: each test gets a fresh temp copy of examples/learner-demo (plus a planted .env and
// cv/ outside work/), writes learner/dossier/m02.json, then renders it in-process or via the CLI.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, cpSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier, Refusal } from "../scripts/dossier.mjs";
import { safeInside } from "../scripts/lib/paths.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const decision = (n, ref = { file: "work/src/route.ts", from: 3, to: 5 }) => ({
  title: `Decision ${n}`,
  why: "Keeps the key on the server.",
  alternatives: "Call the provider from the browser.",
  tradeoff: "One more hop.",
  ref,
});
const sample = (patch = {}) => ({
  schema_version: 1,
  module: "m02",
  summary: "A streaming support chat for a bookstore.",
  decisions: [decision(1), decision(2, { file: "work/src/route.ts", from: 29, to: 31 }), decision(3, { file: "work/src/Chat.tsx", from: 37, to: 40 })],
  questions: ["What happens when the stream drops?", "Why abort upstream in cancel()?"],
  ...patch,
});

function setup({ dossier = sample(), state, evaluation } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "respec-dossier-"));
  cpSync(join(root, "examples", "learner-demo"), dir, { recursive: true });
  writeFileSync(join(dir, ".env"), "OPENAI_API_KEY=sk-SECRET\n");
  mkdirSync(join(dir, "cv"));
  writeFileSync(join(dir, "cv", "cv.md"), "PRIVATE CV");
  mkdirSync(join(dir, "dossier"), { recursive: true });
  writeFileSync(join(dir, "dossier", "m02.json"), typeof dossier === "string" ? dossier : JSON.stringify(dossier));
  if (state) {
    const s = JSON.parse(readFileSync(join(dir, "state.json"), "utf8"));
    state(s);
    writeFileSync(join(dir, "state.json"), JSON.stringify(s));
  }
  if (evaluation) {
    const p = join(dir, "modules", "m02", "evaluation.json");
    const e = JSON.parse(readFileSync(p, "utf8"));
    evaluation(e);
    writeFileSync(p, JSON.stringify(e));
  }
  return dir;
}
const render = (opts = {}, args = {}) => buildDossier({ learnerDir: setup(opts), id: "m02", ...args });
const refused = (opts, re, args) => assert.throws(() => render(opts, args), (e) => e instanceof Refusal && re.test(e.message));
const work = (dir) => join(dir, "modules", "m02", "work");

test("renders graded facts from evaluation.json and code from work/", () => {
  const html = render();
  assert.match(html, /^<!doctype html>\n<html lang="en">/);
  assert.match(html, /86\/100, passed/);
  assert.match(html, /Try again doesn&#39;t resend/); // gap, escaped
  assert.match(html, /const client = new OpenAI\(\);/); // excerpt line 3
  assert.match(html, /14,033 input tokens/);
  assert.match(html, /Graded 2026-11-08; code shown from the current work\/ folder\./);
  assert.match(html, /Self-reported\./);
  assert.ok(html.indexOf('id="h-summary"') < html.indexOf('id="h-decisions"'), "summary comes first");
  assert.match(html, /Best question to ask:<\/strong> What happens when the stream drops\?/);
});

test("no script, CSP meta, print stylesheet, footer link with trailing slash", () => {
  const html = render();
  assert.doesNotMatch(html, /<script/i);
  assert.match(html, /content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"/);
  assert.match(html, /@page\{size:A4/);
  assert.match(html, /<a href="https:\/\/getrespec\.dev\/dossier\/">Made with Respec<\/a>/);
});

test("--no-footer drops the link but keeps the limitations line", () => {
  const html = render({}, { footer: false });
  assert.doesNotMatch(html, /Made with Respec|getrespec\.dev/);
  assert.match(html, /Self-reported\./);
});

test("Turkish learner: lang, labels, number format and /tr/dossier/ link", () => {
  const html = render({ state: (s) => (s.learner.language = "tr") });
  assert.match(html, /<html lang="tr">/);
  assert.match(html, /86\/100, geçti/);
  assert.match(html, /14\.033 girdi token&#39;ı/);
  assert.match(html, /href="https:\/\/getrespec\.dev\/tr\/dossier\/"/);
});

test("same input gives the same bytes", () => {
  const dir = setup();
  assert.equal(buildDossier({ learnerDir: dir, id: "m02" }), buildDossier({ learnerDir: dir, id: "m02" }));
});

test("escapes JSX and markup in every field", () => {
  const html = render({ dossier: sample({ summary: '<policy>"x"</policy> <script>alert(1)</script>' }) });
  assert.match(html, /&lt;policy&gt;&quot;x&quot;&lt;\/policy&gt; &lt;script&gt;/);
  assert.match(html, /&lt;p aria-live=&quot;polite&quot;&gt;\{status === &quot;answering&quot;/); // JSX excerpt, Chat.tsx:37
  assert.doesNotMatch(html, /<policy>|<script/);
});

test("assisted module gets the banner; latest passed attempt is used (remedial)", () => {
  const html = render({
    state: (s) => (s.curriculum.modules.find((m) => m.id === "m02").status = "assisted"),
    evaluation: (e) => {
      e.attempts.unshift({ ...e.attempts[0], date: "2026-11-05", total: 41, passed: false });
      e.attempts.push({ ...e.attempts[0], date: "2026-11-09", total: 92, passed: true });
      e.attempts.push({ date: "2026-11-10", total: 30, passed: false, rubric: [] });
    },
  });
  assert.match(html, /class="banner"[^>]*><strong>Assisted:/);
  assert.match(html, /92\/100, passed/);
  assert.match(html, /Graded 2026-11-09/);
});

test("minimal attempt (passed, total, rubric only) renders without optional sections", () => {
  const html = render({ evaluation: (e) => (e.attempts = [{ passed: true, total: 80, rubric: [] }]) });
  assert.match(html, /80\/100, passed/);
  assert.doesNotMatch(html, /h-defense|h-usage|Graded /);
});

test("placeholders render; real key formats are refused without echoing the value", () => {
  assert.match(render({ dossier: sample({ summary: "Reads process.env.OPENAI_API_KEY, never sk-... in the browser." }) }), /OPENAI_API_KEY/);
  const key = "sk-proj-" + "a1B2c3D4e5F6g7H8i9J0k1L2m3N4";
  for (const [opts, field] of [
    [{ dossier: sample({ summary: `key ${key}` }) }, /^summary: looks like a OpenAI project key/],
    [{ evaluation: (e) => (e.attempts[0].defense[0].answer = key) }, /^evaluation\.attempts\[0\]\.defense\[0\]\.answer:/],
  ]) {
    assert.throws(() => render(opts), (e) => e instanceof Refusal && field.test(e.message) && !e.message.includes(key));
  }
  const dir = setup({ dossier: sample({ decisions: [decision(1, { file: "work/key.ts", from: 2, to: 2 }), decision(2), decision(3)] }) });
  writeFileSync(join(work(dir), "key.ts"), `// config\nconst k = "${"sk-ant-" + "x".repeat(30)}";\n`);
  assert.throws(
    () => buildDossier({ learnerDir: dir, id: "m02" }),
    (e) => e.message.startsWith("decisions[0].ref (code in work/key.ts): looks like a Anthropic API key") && !e.message.includes("xxxx"),
  );
});

test("refs must stay inside modules/<id>/work/", () => {
  const ref = (r) => ({ dossier: sample({ decisions: [decision(1, r), decision(2), decision(3)] }) });
  refused(ref({ file: "../../.env", from: 1, to: 1 }), /decisions\[0\]\.ref\.file: must start with work\//);
  refused(ref({ file: "work/../../../cv/cv.md", from: 1, to: 1 }), /must stay inside work\//);
  refused(ref({ file: "work/.env", from: 1, to: 1 }), /must stay inside work\//);
  refused(ref({ file: "work/nope.ts", from: 1, to: 1 }), /decisions\[0\]\.ref\.file: not found/);
  refused(ref({ file: "work/src/route.ts", from: 30, to: 99 }), /lines 30-99 are outside 1-35/);
  refused(ref({ file: "work/src/route.ts", from: 5, to: 3 }), /outside/);

  const dir = setup(ref({ file: "work/leak.md", from: 1, to: 1 }));
  symlinkSync(join(dir, "cv", "cv.md"), join(work(dir), "leak.md"));
  assert.throws(() => buildDossier({ learnerDir: dir, id: "m02" }), /must stay inside work\//);
});

test("refuses long excerpts, files over 512 KB and binary files", () => {
  const dir = setup({ dossier: sample({ decisions: [decision(1, { file: "work/big.ts", from: 1, to: 41 }), decision(2), decision(3)] }) });
  writeFileSync(join(work(dir), "big.ts"), "x\n".repeat(60));
  assert.throws(() => buildDossier({ learnerDir: dir, id: "m02" }), /longer than 40 lines/);
  writeFileSync(join(work(dir), "big.ts"), "x".repeat(512 * 1024 + 1));
  assert.throws(() => buildDossier({ learnerDir: dir, id: "m02" }), /larger than 512 KB/);
  writeFileSync(join(work(dir), "big.ts"), Buffer.from([1, 0, 2]));
  assert.throws(() => buildDossier({ learnerDir: dir, id: "m02" }), /binary file/);
});

test("refuses bad input with the field name", () => {
  refused({ dossier: sample({ schema_version: 2 }) }, /^schema_version: expected 1/);
  refused({ dossier: "{nope" }, /dossier\/m02\.json: not valid JSON/);
  refused({ dossier: sample({ module: "m03" }) }, /^module: expected "m02"/);
  refused({ dossier: sample({ summary: "" }) }, /^summary: required/);
  refused({ dossier: sample({ decisions: [decision(1)] }) }, /^decisions: expected 3 to 5/);
  refused({ dossier: sample({ questions: [] }) }, /^questions: expected 1 to 10/);
  refused({ evaluation: (e) => (e.attempts[0].passed = false) }, /no passed attempt yet/);
  assert.throws(() => buildDossier({ learnerDir: setup(), id: "../m02" }), /is not in state\.json/);
  assert.throws(() => buildDossier({ learnerDir: setup(), id: "m99" }), /is not in state\.json/);
});

test("CLI writes the HTML, refuses with exit 1 and one line", () => {
  const dir = setup();
  const ok = spawnSync(process.execPath, ["scripts/dossier.mjs", "--learner", dir, "m02", "--no-footer"], { cwd: root, encoding: "utf8" });
  assert.equal(ok.status, 0, ok.stderr);
  assert.doesNotMatch(readFileSync(join(dir, "dossier", "m02.html"), "utf8"), /Made with Respec/);
  const bad = spawnSync(process.execPath, ["scripts/dossier.mjs", "m99", "--learner", dir], { cwd: root, encoding: "utf8" });
  assert.equal(bad.status, 1);
  assert.equal(bad.stderr.trim().split("\n").length, 1);
  assert.match(bad.stderr, /^dossier: refused: module id/);
});

test("safeInside: inside, missing, dot segments and symlinks out", () => {
  const dir = mkdtempSync(join(tmpdir(), "respec-paths-"));
  mkdirSync(join(dir, "base", "a"), { recursive: true });
  writeFileSync(join(dir, "base", "a", "f.txt"), "ok");
  writeFileSync(join(dir, "secret.txt"), "no");
  symlinkSync(join(dir, "secret.txt"), join(dir, "base", "out.txt"));
  symlinkSync(join(dir, "base", "a", "f.txt"), join(dir, "base", "in.txt"));
  const base = join(dir, "base");
  assert.ok(safeInside(base, "a/f.txt").path?.endsWith("f.txt"));
  assert.ok(safeInside(base, "in.txt").path?.endsWith("f.txt"));
  assert.deepEqual(safeInside(base, "a/none.txt"), { error: "missing" });
  for (const rel of ["../secret.txt", "a/../../secret.txt", ".env", "a/.hidden", "out.txt", "", "/"])
    assert.deepEqual(safeInside(base, rel), { error: "refused" }, rel);
});

// WCAG 2.2 AA checks on the output: token contrast (computed from the inlined CSS, light and
// dark), one h1 and no skipped heading levels, and no reference to anything outside the file.
const luminance = (hex) => {
  const v = hex.length === 4 ? [...hex.slice(1)].map((c) => c + c) : hex.slice(1).match(/../g);
  const [r, g, b] = v.map((c) => parseInt(c, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const tokens = (block) => Object.fromEntries([...block.matchAll(/--([a-z-]+):(#[0-9a-f]{3,6})/gi)].map((m) => [m[1], m[2]]));

test("text and link colours reach 4.5:1 in light and dark", () => {
  const html = render({ state: (s) => (s.curriculum.modules.find((m) => m.id === "m02").status = "assisted") });
  const light = tokens(html.match(/:root\{color-scheme:light;[^}]*\}/)[0]);
  const dark = { ...light, ...tokens(html.match(/prefers-color-scheme:dark\)\{:root\{[^}]*\}/)[0]) };
  const pairs = [
    ["ink", "paper"], ["ink", "surface"], ["ink", "code-bg"], ["ink", "gold-soft"],
    ["muted", "paper"], ["muted", "surface"], ["ultra", "paper"], ["ultra", "surface"],
  ];
  for (const [name, t] of [["light", light], ["dark", dark]])
    for (const [fg, bg] of pairs) {
      const ratio = contrast(t[fg], t[bg]);
      assert.ok(ratio >= 4.5, `${name}: --${fg} on --${bg} is ${ratio.toFixed(2)}:1`);
    }
});

test("one h1, no skipped heading levels, no external resources", () => {
  const html = render();
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  assert.equal(levels.filter((l) => l === 1).length, 1);
  assert.equal(levels[0], 1);
  levels.reduce((prev, l) => (assert.ok(l <= prev + 1, `h${prev} -> h${l}`), l));
  assert.doesNotMatch(html, /\s(?:src|srcset|action)=|<link|@import|url\(/i);
  assert.deepEqual([...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]), ["https://getrespec.dev/dossier/"]);
});

// The gate sample is frozen: a renderer change that alters it must be a deliberate re-render.
test("committed sample matches what the renderer produces", () => {
  const demo = join(root, "examples", "learner-demo");
  const committed = readFileSync(join(demo, "dossier", "m02.html"), "utf8");
  assert.equal(buildDossier({ learnerDir: demo, id: "m02", footer: false }), committed);
});
