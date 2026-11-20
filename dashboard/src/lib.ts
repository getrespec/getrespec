import type { Module, State } from "./types";
import type { Strings } from "./i18n";

export function progress(state: State) {
  const modules = state.curriculum?.modules ?? [];
  const total = modules.length;
  const done = modules.filter((m) => m.status === "completed");
  const helped = modules.filter((m) => m.status === "assisted");
  const active = modules.find((m) => m.status === "active") ?? null;
  const pct = total ? Math.round((done.length / total) * 100) : 0;
  const hoursTotal = modules.reduce((a, m) => a + (Number(m.est_hours) || 0), 0);
  const hoursDone = [...done, ...helped].reduce((a, m) => a + (Number(m.est_hours) || 0), 0);
  const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);
  const quizAvg = avg(modules.map((m) => m.score?.quiz).filter((x): x is number => typeof x === "number"));
  const assignAvg = avg(modules.map((m) => m.score?.assignment).filter((x): x is number => typeof x === "number"));
  const capstoneDone = modules.some((m) => m.type === "capstone" && m.status === "completed");
  const levelIdx = pct >= 80 && capstoneDone ? 2 : pct >= 35 ? 1 : 0;
  return { modules, total, done, helped, active, pct, hoursTotal, hoursDone, quizAvg, assignAvg, levelIdx };
}

export function nextLevelHint(t: Strings, p: ReturnType<typeof progress>) {
  if (!p.total) return "";
  if (p.levelIdx === 0) return t.toLevel1(Math.ceil(p.total * 0.35) - p.done.length);
  if (p.levelIdx === 1) {
    const need = Math.max(0, Math.ceil(p.total * 0.8) - p.done.length);
    return need > 0 ? t.toLevel2(need) : t.capstoneLeft;
  }
  return t.topLevel;
}

export function nextAction(t: Strings, state: State, p: ReturnType<typeof progress>) {
  const target = state.target_role;
  if (!target) return { title: t.naRole[0], cmd: "/respec role", text: t.naRole[1] as string, module: null as Module | null };
  if (!p.total) return { title: t.naPlan[0] as string, cmd: "/respec plan", text: (t.naPlan[1] as (x: string) => string)(target.title), module: null };
  if (!p.active) {
    if (p.done.length + p.helped.length === p.total) return { title: t.naDone[0], cmd: "/respec update-trends", text: t.naDone[1], module: null };
    return { title: t.naStart[0], cmd: "/respec next", text: t.naStart[1], module: null };
  }
  return {
    title: `${p.active.id} · ${p.active.title}`,
    cmd: p.active.stage === "assignment" ? "/respec submit" : "/respec next",
    text: t.stageWhat[p.active.stage ?? ""] ?? "",
    module: p.active,
  };
}

export const stagesFor = (m: Module) => (m.type === "theory" ? ["lesson", "quiz"] : ["lesson", "quiz", "assignment", "evaluation"]);

export function useDateFormat(lang: string) {
  const f = new Intl.DateTimeFormat(lang, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return (d?: string | null) => {
    if (!d) return "";
    const x = new Date(d.length === 10 ? `${d}T00:00:00Z` : d);
    return isNaN(+x) ? d : f.format(x);
  };
}

export const fmtNum = (lang: string) => {
  const f = new Intl.NumberFormat(lang);
  return (n: number | null | undefined) => (n == null ? "–" : f.format(n));
};

export function langForFile(path: string): string | undefined {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  return (
    {
      ts: "typescript",
      tsx: "typescript",
      mts: "typescript",
      js: "javascript",
      jsx: "javascript",
      mjs: "javascript",
      cjs: "javascript",
      py: "python",
      json: "json",
      sh: "bash",
      bash: "bash",
      html: "xml",
      xml: "xml",
      svg: "xml",
      css: "css",
      md: "markdown",
      yml: "yaml",
      yaml: "yaml",
      sql: "sql",
    } as Record<string, string>
  )[ext];
}

// Splits a lesson into its `##` sections. A line `<!-- section: scenario -->` before a heading tags
// the section with a kind the dashboard styles (the marker is language-independent; headings aren't).
// The lesson's own `#` title and the file-reference note under it are dropped: the page shows both already.
export type LessonSection = { id: string; kind: string | null; title: string | null; body: string; hasCode: boolean };

const MARKER = /^\s*<!--\s*section:\s*([\w-]+)\s*-->\s*$/;
const FILE_NOTE = /^>\s*.*(visual\.html|examples\/)/;

export function splitLesson(md: string): LessonSection[] {
  const out: LessonSection[] = [];
  let cur: LessonSection = { id: "s-intro", kind: null, title: null, body: "", hasCode: false };
  let pending: string | null = null;
  let fence = false;
  let seenTitle = false;
  const used = new Set<string>();
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      fence = !fence;
      cur.hasCode = true;
      cur.body += line + "\n";
      continue;
    }
    if (!fence) {
      const m = MARKER.exec(line);
      if (m) {
        pending = m[1].toLowerCase();
        continue;
      }
      if (!seenTitle && out.length === 0 && /^#\s/.test(line)) {
        seenTitle = true;
        continue;
      }
      if (out.length === 0 && cur.title === null && FILE_NOTE.test(line)) continue;
      const h = /^##\s+(.+?)\s*#*\s*$/.exec(line);
      if (h) {
        if (cur.body.trim() || cur.title) out.push(cur);
        const title = h[1].replace(/[`*_]/g, "");
        let id = `s-${title.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || out.length}`;
        while (used.has(id)) id += "-2";
        used.add(id);
        cur = { id, kind: pending, title, body: line + "\n", hasCode: false };
        pending = null;
        continue;
      }
    }
    cur.body += line + "\n";
  }
  if (cur.body.trim()) out.push(cur);
  return out;
}

// Where the interactive visual goes: after the concepts, before the code walkthrough.
export function visualSlot(sections: LessonSection[]): number {
  const concept = sections.findIndex((s) => s.kind === "concept");
  if (concept >= 0) return concept + 1;
  const back = sections.findIndex((s) => s.kind === "back");
  if (back >= 0) return back;
  const code = sections.findIndex((s, i) => i > 0 && s.hasCode);
  return code >= 0 ? code : sections.length;
}
