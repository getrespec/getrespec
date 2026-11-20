// Tests for scripts/lib/version.mjs and scripts/check-update.mjs. Run: node --test test/*.test.mjs
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtempSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compareVersions, parseVersion, status } from "../scripts/lib/version.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const run = promisify(execFile);
// A throwaway learner folder, so the cache never lands in a real learner/.
const learnerDir = mkdtempSync(join(tmpdir(), "respec-version-"));

test("compares versions", () => {
  assert.equal(compareVersions("0.2.0", "0.1.9"), 1);
  assert.equal(compareVersions("v1.0.0", "1.0.0"), 0);
  assert.equal(compareVersions("0.10.0", "0.9.0"), 1);
  assert.equal(compareVersions("1.0.0-beta.1", "1.0.0"), -1);
  assert.equal(compareVersions("1.0.0", "1.0.1"), -1);
  assert.equal(parseVersion("latest"), null);
  assert.throws(() => compareVersions("x", "1.0.0"));
});

test("only a newer release counts as an update", () => {
  assert.equal(status("0.2.0", { version: "0.3.0" }).update_available, true);
  assert.equal(status("0.2.0", { version: "0.2.0" }).update_available, false);
  assert.equal(status("0.2.0", { version: "0.1.0" }).update_available, false);
  assert.equal(status("0.2.0", null).update_available, false);
});

// A fake GitHub releases API.
let server;
let port;
let release = { tag_name: "v99.0.0", html_url: "https://example.test/r/99", body: "### Added\n- Something new" };
before(async () => {
  server = http.createServer((req, res) => {
    if (!release) return res.writeHead(404).end();
    res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(release));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  port = server.address().port;
});
after(() => server.close());

const check = (...args) =>
  run(process.execPath, [join(root, "scripts", "check-update.mjs"), "--force", ...args], {
    env: { ...process.env, RESPEC_RELEASES_URL: `http://127.0.0.1:${port}/latest`, RESPEC_NO_UPDATE_CHECK: "", RESPEC_LEARNER_DIR: learnerDir },
  });

test("check-update reports a newer release", async () => {
  release = { tag_name: "v99.0.0", html_url: "https://example.test/r/99", body: "### Added\n- Something new" };
  const { stdout } = await check("--json");
  const r = JSON.parse(stdout);
  assert.equal(r.update_available, true);
  assert.equal(r.latest.version, "99.0.0");
  const text = (await check()).stdout;
  assert.match(text, /Respec 99\.0\.0 is available/);
  assert.match(text, /Something new/);
  assert.match(text, /\/respec update/);
  assert.ok(existsSync(join(learnerDir, ".update-check.json")), "result is cached in the learner folder");
});

test("check-update stays quiet when up to date or unreachable", async () => {
  release = { tag_name: "v0.0.1", html_url: null, body: "" };
  assert.equal((await check("--quiet")).stdout, "");
  release = null;
  const r = JSON.parse((await check("--json")).stdout);
  assert.equal(r.update_available, false);
});

test("check-update can be turned off", async () => {
  const { stdout } = await run(process.execPath, [join(root, "scripts", "check-update.mjs"), "--json"], {
    env: { ...process.env, RESPEC_NO_UPDATE_CHECK: "1", RESPEC_LEARNER_DIR: learnerDir },
  });
  assert.equal(JSON.parse(stdout).disabled, true);
});
