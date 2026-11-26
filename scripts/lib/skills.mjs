// Reads the skill catalog (data/skills.md) and role packs (data/roles/*.md) as tables.
import { readFileSync } from "node:fs";

// Rows of every Markdown table whose header starts with "| ID |", as objects keyed by header.
// Each row also gets `area`: the nearest "## " or "### " heading's first word.
function tables(text) {
  const rows = [];
  let header = null, area = null;
  for (const line of text.split("\n")) {
    const h = line.match(/^#{2,3} ([a-z]+)[: ]/);
    if (h) area = h[1];
    if (!line.startsWith("|")) { header = null; continue; }
    const cells = line.slice(1, -1).split("|").map((c) => c.trim());
    if (cells[0] === "ID") { header = cells; continue; }
    if (!header || /^-+$/.test(cells[0])) continue;
    rows.push({ area, ...Object.fromEntries(header.map((k, i) => [k, (cells[i] ?? "").replace(/^`|`$/g, "")])) });
  }
  return rows;
}

const ids = (cell) => (cell === "–" || !cell ? [] : cell.split(",").map((s) => s.trim().replace(/^`|`$/g, "")));

export function readCatalog(file) {
  return tables(readFileSync(file, "utf8")).map((r) => ({ id: r.ID, area: r.area, skill: r.Skill, needs: ids(r.Needs) }));
}

// Skill rows of a role pack.
export function readPack(file) {
  return tables(readFileSync(file, "utf8"))
    .map((r) => ({ id: r.ID, skill: r.Skill, priority: r.Priority, depth: r.Depth, was: r.Was || null }));
}

const isOldId = (id) => typeof id === "string" && /^[A-G][0-9]$/.test(id);

// Rewrites a state's old role pack IDs (A1…) to catalog IDs, using the pack rows' `was`.
// An old ID on several rows was split: the coverage item is copied for each. Returns log lines.
export function toCatalogIds(state, rows) {
  const byWas = new Map();
  for (const r of rows) if (r.was) byWas.set(r.was, [...(byWas.get(r.was) ?? []), r]);
  const log = [];
  const cov = state.curriculum?.coverage;
  if (cov) {
    const out = [];
    for (const item of cov) {
      const targets = isOldId(item.id) ? byWas.get(item.id) : null;
      if (!targets) {
        if (isOldId(item.id)) log.push(`coverage ${item.id} (${item.skill}): not in the role pack, left as is`);
        out.push(item);
        continue;
      }
      targets.forEach((r, i) => {
        const same = out.find((o) => o.id === r.id);
        if (same) {
          for (const k of ["modules", "postings"]) if (item[k]) same[k] = [...new Set([...(same[k] ?? []), ...item[k]])];
          return;
        }
        const { skill, id, priority, ...rest } = item;
        out.push({ skill: i === 0 ? skill : r.skill, id: r.id, priority: r.priority.split(" ")[0], depth: r.depth, ...rest });
      });
      log.push(`coverage ${item.id} → ${targets.map((r) => r.id).join(", ")}`);
    }
    state.curriculum.coverage = out;
  }
  for (const m of state.curriculum?.modules ?? []) {
    if (!m.skills?.some(isOldId)) continue;
    const next = [...new Set(m.skills.flatMap((id) => (isOldId(id) ? (byWas.get(id)?.map((r) => r.id) ?? [id]) : [id])))];
    log.push(`${m.id} skills: ${m.skills.join(", ")} → ${next.join(", ")}`);
    m.skills = next;
  }
  return log;
}
