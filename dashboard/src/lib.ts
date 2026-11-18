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
