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

// Catalog-format rows of a role pack (rows whose ID is `area.slug`); old-format rows (A1…) are skipped.
export function readPack(file) {
  return tables(readFileSync(file, "utf8"))
    .filter((r) => r.ID.includes("."))
    .map((r) => ({ id: r.ID, priority: r.Priority, depth: r.Depth, was: r.Was || null }));
}
