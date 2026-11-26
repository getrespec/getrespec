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

test("old pack IDs in a state become catalog IDs", async () => {
  const { toCatalogIds } = await import("../scripts/lib/skills.mjs");
  const rows = readPack(join(root, "data/roles/ai-product-engineer.md"));
  const state = {
    curriculum: {
      coverage: [
        { skill: "Agents", id: "B2", priority: "core", status: "covered", modules: ["m09"], note: "n" },
        { skill: "From a posting", status: "covered", modules: ["m09"], postings: ["p1"] },
        { skill: "Unknown", id: "Z9", status: "optional" },
        { skill: "Prompting", id: "A3", priority: "core", status: "known" },
      ],
      modules: [{ id: "m09", skills: ["B2", "A3"] }, { id: "m00" }],
    },
  };
  const log = toCatalogIds(state, rows);
  const cov = state.curriculum.coverage;
  assert.deepEqual(cov.map((c) => c.id), ["agent.loops", "agent.human-approval", undefined, "Z9", "llm.prompt-context"]);
  assert.deepEqual(cov[0], { skill: "Agents", id: "agent.loops", priority: "core", depth: "working", status: "covered", modules: ["m09"], note: "n" });
  assert.equal(cov[1].skill, "Approval before actions"); // split copy takes the pack's name
  assert.equal(cov[1].status, "covered");
  assert.deepEqual(state.curriculum.modules[0].skills, ["agent.loops", "agent.human-approval", "llm.prompt-context"]);
  assert.ok(log.some((l) => l.startsWith("coverage B2 → agent.loops, agent.human-approval")));
  // Z9 isn't an old pack ID (those are A1–G9), so it stays. A second run changes nothing.
  const again = structuredClone(state);
  assert.deepEqual(toCatalogIds(again, rows), []);
  assert.deepEqual(again, state);
});
