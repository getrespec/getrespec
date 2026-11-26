// Consistency checks for data/skills.md and the role packs. Run: node --test test/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readCatalog, readPack } from "../scripts/lib/skills.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = readCatalog(join(root, "data/skills.md"));
const byId = new Map(catalog.map((s) => [s.id, s]));
const packs = readdirSync(join(root, "data/roles"))
  .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
  .map((f) => ({ f, rows: readPack(join(root, "data/roles", f)) }));

test("catalog IDs are unique, well-formed, and in their area", () => {
  assert.ok(catalog.length > 0);
  assert.equal(byId.size, catalog.length, "duplicate catalog ID");
  for (const s of catalog) {
    assert.match(s.id, /^[a-z]+\.[a-z0-9-]+$/, s.id);
    assert.equal(s.id.split(".")[0], s.area, `${s.id} is under "${s.area}"`);
  }
});

test("catalog prerequisites exist and have no cycles", () => {
  for (const s of catalog) for (const n of s.needs) assert.ok(byId.has(n), `${s.id} needs unknown ${n}`);
  const state = new Map(); // 1 = visiting, 2 = done
  const visit = (id, path) => {
    if (state.get(id) === 2) return;
    assert.notEqual(state.get(id), 1, `cycle: ${[...path, id].join(" → ")}`);
    state.set(id, 1);
    for (const n of byId.get(id).needs) visit(n, [...path, id]);
    state.set(id, 2);
  };
  for (const s of catalog) visit(s.id, []);
});

test("every pack points only to catalog skills, once each", () => {
  assert.equal(packs.length, 6);
  for (const { f, rows } of packs) {
    assert.ok(rows.length > 0, `${f}: no skill rows`);
    const seen = new Set();
    for (const r of rows) {
      assert.ok(byId.has(r.id), `${f}: unknown skill ${r.id}`);
      assert.ok(!seen.has(r.id), `${f}: ${r.id} listed twice`);
      seen.add(r.id);
      assert.match(r.priority, /^(core|important|advanced)\b/, `${f}: ${r.id} priority`);
      assert.match(r.depth, /^(basic|working|deep)$/, `${f}: ${r.id} depth`);
      assert.match(r.was ?? "", /^[A-G][0-9]$/, `${f}: ${r.id} needs its old ID in Was`);
    }
  }
});

test("every catalog skill is used by at least one pack", () => {
  const used = new Set(packs.flatMap((p) => p.rows.map((r) => r.id)));
  assert.deepEqual(catalog.map((s) => s.id).filter((id) => !used.has(id)), []);
});
