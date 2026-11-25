// Interface strings for languages without built-in strings (see i18n.ts). The agent writes
// learner/ui-strings.json in the learner's language; this merges it over the English strings.
// Plain JS so the tests can import it without a build step.
//
// File format: { "language": "de", "strings": { <key>: <value>, ... } }, keys as in `en` (i18n.ts).
// - text:     "Übersicht"
// - function: a template with positional placeholders for its arguments, "{0} von {1} Modulen";
//             or, when the first argument is a count, plural forms: { "one": "…", "other": "…" }
//             (categories of Intl.PluralRules: zero, one, two, few, many, other)
// - list:     an array with the same shape, e.g. "levels"
// - map:      an object with the same keys, e.g. "tabs"
// Anything missing or of the wrong type keeps the English string.

const PLURAL_CATEGORIES = new Set(["zero", "one", "two", "few", "many", "other"]);

const isPlainObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const isPluralForms = (v) => isPlainObject(v) && typeof v.other === "string" && Object.entries(v).every(([k, s]) => PLURAL_CATEGORIES.has(k) && typeof s === "string");

function fill(template, args) {
  return template.replace(/\{(\d+)\}/g, (m, i) => (i < args.length ? String(args[i]) : m));
}

function toFunction(value, lang) {
  if (typeof value === "string") return (...args) => fill(value, args);
  if (!isPluralForms(value)) return null;
  let rules;
  try {
    rules = new Intl.PluralRules(lang);
  } catch {
    rules = new Intl.PluralRules("en");
  }
  return (...args) => fill(value[typeof args[0] === "number" ? rules.select(args[0]) : "other"] ?? value.other, args);
}

function merge(base, value, lang) {
  if (value === undefined || value === null) return base;
  if (typeof base === "string") return typeof value === "string" ? value : base;
  if (typeof base === "function") return toFunction(value, lang) ?? base;
  if (Array.isArray(base)) return Array.isArray(value) ? base.map((b, i) => merge(b, value[i], lang)) : base;
  if (isPlainObject(base)) {
    if (!isPlainObject(value)) return base;
    return Object.fromEntries(Object.entries(base).map(([k, b]) => [k, merge(b, value[k], lang)]));
  }
  return base;
}

/**
 * The strings to show: `base` with every valid value from `file` merged in.
 * @template T
 * @param {T} base
 * @param {unknown} file  the parsed learner/ui-strings.json
 * @param {string} lang   the learner's language, for plural rules
 * @returns {T}
 */
export function applyOverrides(base, file, lang) {
  if (!isPlainObject(file) || !isPlainObject(file.strings)) return base;
  return /** @type {T} */ (merge(base, file.strings, lang));
}

/** Whether a ui-strings file is meant for this language (compares the primary subtag: "pt-BR" ~ "pt"). */
export function matchesLanguage(file, lang) {
  const primary = (v) => String(v ?? "").split(/[-_]/)[0].toLowerCase();
  return isPlainObject(file) && !!primary(lang) && primary(file.language) === primary(lang);
}
