// Checks a learner state (learner/state.json) against the rules in AGENTS.md.
// Errors break the dashboard or lose progress; warnings break a rule the agent should fix.

const ENUM = {
  status: ["locked", "active", "completed", "assisted"],
  stage: ["lesson", "quiz", "review", "assignment", "evaluation", "done", null],
  type: ["theory", "practice", "mixed", "capstone"],
  coverage: ["known", "covered", "optional"],
  priority: ["core", "important", "advanced"],
  depth: ["basic", "working", "deep"],
};
// Fields of examples/learner-demo/state.json plus the optional ones in flows/plan.md.
const FIELDS = {
  "": ["schema_version", "learner", "placement", "target_role", "curriculum", "weak_points", "history", "notes"],
  learner: ["name", "current_role", "years", "weekly_hours", "target_market", "english", "language", "form_of_address", "preferences", "target_postings"],
  curriculum: ["created_at", "phases", "skipped", "coverage", "modules"],
  module: ["id", "title", "phase", "type", "objectives", "skills", "why", "est_hours", "resources", "status", "stage", "score", "attempts", "started_at", "completed_at"],
  coverage: ["skill", "id", "priority", "depth", "status", "modules", "postings", "note"],
};
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
export const SCHEMA_VERSION = 3;

/**
 * @param {object} state parsed state.json
 * @param {{ catalog: {id: string, needs: string[]}[], packIds?: string[] }} data catalog rows; role pack IDs
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function checkState(state, { catalog, packIds = [] }) {
  const errors = [], warnings = [];
  const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
  const extra = (obj, allowed, where) => {
    for (const k of Object.keys(obj ?? {})) if (!allowed.includes(k)) warn(`${where}: unknown field "${k}"; put extra information in notes`);
  };
  const date = (v, where) => {
    if (v == null) return;
    // The round trip rejects dates that don't exist, like 2026-02-30; 2026-13-01 is an Invalid Date.
    const d = new Date(`${v}T00:00:00Z`);
    if (!DATE.test(v) || isNaN(d) || !d.toISOString().startsWith(v)) err(`${where}: "${v}" isn't a YYYY-MM-DD date`);
  };

  if (!isObject(state)) {
    err("the file isn't a JSON object");
    return { errors, warnings };
  }
  if (state.schema_version !== SCHEMA_VERSION) {
    err(`schema_version is ${JSON.stringify(state.schema_version)}, expected ${SCHEMA_VERSION}; run node scripts/migrate-state.mjs`);
    return { errors, warnings };
  }
  // Wrong shapes would crash the checks below, so they stop the check here.
  if (!isObject(state.learner)) err("learner is missing or isn't an object; the dashboard needs it");
  for (const k of ["placement", "target_role", "curriculum"]) if (state[k] != null && !isObject(state[k])) err(`${k} isn't an object`);
  const lists = { "curriculum.phases": state.curriculum?.phases, "curriculum.modules": state.curriculum?.modules, "curriculum.coverage": state.curriculum?.coverage, weak_points: state.weak_points, history: state.history };
  for (const [name, list] of Object.entries(lists)) {
    if (list == null) continue;
    if (!Array.isArray(list)) err(`${name} isn't a list`);
    else list.forEach((x, i) => isObject(x) || err(`${name}[${i}] isn't an object`));
  }
  for (const [i, m] of (Array.isArray(lists["curriculum.modules"]) ? lists["curriculum.modules"] : []).entries()) if (isObject(m) && m.skills != null && !Array.isArray(m.skills)) err(`curriculum.modules[${i}].skills isn't a list`);
  for (const [i, c] of (Array.isArray(lists["curriculum.coverage"]) ? lists["curriculum.coverage"] : []).entries()) if (isObject(c) && c.modules != null && !Array.isArray(c.modules)) err(`curriculum.coverage[${i}].modules isn't a list`);
  if (errors.length) return { errors, warnings };

  extra(state, FIELDS[""], "state");
  extra(state.learner, FIELDS.learner, "learner");
  date(state.placement?.date, "placement.date");
  if (state.target_role) {
    date(state.target_role.chosen_at, "target_role.chosen_at");
    if (!packIds.includes(state.target_role.id)) warn(`target_role.id "${state.target_role.id}" has no role pack in data/roles/; fine only for a role without one`);
  }

  const cur = state.curriculum ?? {};
  extra(cur, FIELDS.curriculum, "curriculum");
  date(cur.created_at, "curriculum.created_at");
  const catalogById = new Map(catalog.map((s) => [s.id, s]));
  const phases = new Set((cur.phases ?? []).map((p) => p.id));
  const modules = cur.modules ?? [];
  const moduleIds = new Set();

  for (const [i, m] of modules.entries()) {
    const at = `module ${m.id ?? `#${i}`}`;
    if (!m.id) err(`${at}: missing id`);
    else if (moduleIds.has(m.id)) err(`${at}: duplicate id`);
    moduleIds.add(m.id);
    extra(m, FIELDS.module, at);
    if (!m.title) err(`${at}: missing title`);
    if (!phases.has(m.phase)) err(`${at}: phase "${m.phase}" isn't in curriculum.phases`);
    for (const k of ["status", "type"]) if (!ENUM[k].includes(m[k])) err(`${at}: ${k} "${m[k]}" isn't one of ${ENUM[k].join(", ")}`);
    if (!ENUM.stage.includes(m.stage ?? null)) err(`${at}: stage "${m.stage}" isn't one of ${ENUM.stage.slice(0, -1).join(", ")}, or null`);
    if (m.status === "locked" && m.stage) err(`${at}: locked but stage is "${m.stage}"; a locked module has stage null`);
    if (m.status === "active" && (!m.stage || m.stage === "done")) err(`${at}: active but stage is "${m.stage}"; an active module is at lesson, quiz, review, assignment or evaluation`);
    if (["completed", "assisted"].includes(m.status) && m.stage !== "done") err(`${at}: ${m.status} but stage is "${m.stage}", not "done"`);
    if (m.type === "theory" && ["assignment", "evaluation"].includes(m.stage)) err(`${at}: a theory module has no ${m.stage} stage`);
    date(m.started_at, `${at}.started_at`);
    date(m.completed_at, `${at}.completed_at`);
    if (["completed", "assisted"].includes(m.status) && !m.completed_at) warn(`${at}: ${m.status} without completed_at`);
    for (const s of m.skills ?? []) if (!catalogById.has(s)) err(`${at}: skill "${s}" isn't in data/skills.md`);
  }
  const active = modules.filter((m) => m.status === "active");
  if (active.length > 1) err(`${active.length} modules are active (${active.map((m) => m.id).join(", ")}); only one may be`);

  // A module must not come before a module that teaches a skill it needs.
  const firstTaught = new Map();
  modules.forEach((m, i) => (m.skills ?? []).forEach((s) => firstTaught.has(s) || firstTaught.set(s, i)));
  modules.forEach((m, i) => {
    for (const s of m.skills ?? []) {
      for (const need of catalogById.get(s)?.needs ?? []) {
        const j = firstTaught.get(need);
        if (j > i) warn(`module ${m.id}: teaches ${s}, which needs ${need}, taught later in ${modules[j].id}`);
      }
    }
  });

  const seen = new Set();
  for (const [i, c] of (cur.coverage ?? []).entries()) {
    const at = `coverage ${c.id ?? `"${c.skill ?? `#${i}`}"`}`;
    extra(c, FIELDS.coverage, at);
    if (!c.skill) err(`${at}: missing skill name`);
    if (!ENUM.coverage.includes(c.status)) err(`${at}: status "${c.status}" isn't one of ${ENUM.coverage.join(", ")}`);
    if (c.id != null) {
      if (!catalogById.has(c.id)) err(`${at}: "${c.id}" isn't in data/skills.md`);
      if (seen.has(c.id)) err(`${at}: listed twice`);
      seen.add(c.id);
    }
    for (const k of ["priority", "depth"]) if (c[k] != null && !ENUM[k].includes(c[k])) err(`${at}: ${k} "${c[k]}" isn't one of ${ENUM[k].join(", ")}`);
    for (const mid of c.modules ?? []) if (!moduleIds.has(mid)) err(`${at}: module ${mid} doesn't exist`);
    if (c.status === "covered" && !c.modules?.length) err(`${at}: covered but lists no module`);
  }
  // Module skills and coverage must agree.
  if (cur.coverage == null && modules.some((m) => m.skills?.length)) warn("curriculum.coverage is missing but modules teach skills; rebuild it as in flows/plan.md");
  else for (const m of modules) {
    for (const s of m.skills ?? []) {
      const c = (cur.coverage ?? []).find((x) => x.id === s);
      if (!c || !c.modules?.includes(m.id)) warn(`module ${m.id}: teaches ${s}, but its coverage item doesn't list ${m.id}`);
    }
  }

  for (const [i, w] of (state.weak_points ?? []).entries()) {
    const at = `weak_points[${i}] "${w.concept}"`;
    if (!moduleIds.has(w.module)) err(`${at}: module ${w.module} doesn't exist`);
    date(w.added_at, `${at}.added_at`);
    if ((w.correct_count ?? 0) >= 2) warn(`${at}: correct_count is ${w.correct_count}; remove the item at 2`);
  }
  for (const [i, h] of (state.history ?? []).entries()) date(h.date, `history[${i}].date`);
  return { errors, warnings };
}
