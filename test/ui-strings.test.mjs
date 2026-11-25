// Tests for dashboard/src/overrides.js: merging learner/ui-strings.json over the English strings.
// Run: node --test test/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { applyOverrides, matchesLanguage } from "../dashboard/src/overrides.js";

const en = {
  overview: "Overview",
  levels: ["Apprentice", "Journeyman", "Master"],
  tabs: { lesson: "Lesson", quiz: "Quiz" },
  modulesDone: (d, t) => `${d} of ${t} modules completed`,
  toLevel1: (n) => `${n} more module${n === 1 ? "" : "s"} to Journeyman`,
  naPlan: ["Build your curriculum", (t) => `No curriculum for ${t} yet.`],
};

test("text, lists, and maps are replaced key by key; the rest stays English", () => {
  const t = applyOverrides(en, { language: "de", strings: { overview: "Übersicht", levels: ["Lehrling"], tabs: { quiz: "Quiz-DE" } } }, "de");
  assert.equal(t.overview, "Übersicht");
  assert.deepEqual(t.levels, ["Lehrling", "Journeyman", "Master"]);
  assert.deepEqual(t.tabs, { lesson: "Lesson", quiz: "Quiz-DE" });
  assert.equal(t.modulesDone(2, 5), "2 of 5 modules completed");
});

test("templates fill positional placeholders, also inside lists", () => {
  const t = applyOverrides(en, { strings: { modulesDone: "{0} von {1} Modulen abgeschlossen", naPlan: ["Lehrplan erstellen", "Noch kein Lehrplan für {0}."] } }, "de");
  assert.equal(t.modulesDone(2, 5), "2 von 5 Modulen abgeschlossen");
  assert.equal(t.naPlan[1]("AI Engineer"), "Noch kein Lehrplan für AI Engineer.");
  assert.equal(applyOverrides(en, { strings: { modulesDone: "{0} / {3}" } }, "de").modulesDone(1, 2), "1 / {3}");
});

test("plural forms follow the language's plural rules", () => {
  const de = applyOverrides(en, { strings: { toLevel1: { one: "Noch {0} Modul", other: "Noch {0} Module" } } }, "de");
  assert.equal(de.toLevel1(1), "Noch 1 Modul");
  assert.equal(de.toLevel1(3), "Noch 3 Module");
  const pl = applyOverrides(en, { strings: { toLevel1: { one: "{0} moduł", few: "{0} moduły", many: "{0} modułów", other: "{0} modułu" } } }, "pl");
  assert.deepEqual([1, 3, 5].map(pl.toLevel1), ["1 moduł", "3 moduły", "5 modułów"]);
});

test("wrong types, unknown keys, and broken files keep the English strings", () => {
  const t = applyOverrides(en, { strings: { overview: 42, levels: "x", tabs: ["a"], toLevel1: { one: "x" }, extra: "ignored" } }, "de");
  assert.equal(t.overview, "Overview");
  assert.deepEqual(t.levels, en.levels);
  assert.deepEqual(t.tabs, en.tabs);
  assert.equal(t.toLevel1(2), "2 more modules to Journeyman");
  assert.equal("extra" in t, false);
  for (const bad of [null, "x", [], { strings: "x" }]) assert.equal(applyOverrides(en, bad, "de"), en);
  assert.equal(applyOverrides(en, { strings: { toLevel1: "{0}" } }, "not a locale!").toLevel1(2), "2");
});

test("a file only applies to its own language", () => {
  assert.equal(matchesLanguage({ language: "de" }, "de"), true);
  assert.equal(matchesLanguage({ language: "pt-BR" }, "pt"), true);
  assert.equal(matchesLanguage({ language: "de" }, "es"), false);
  assert.equal(matchesLanguage({}, "de"), false);
  assert.equal(matchesLanguage({ language: "de" }, ""), false);
});
