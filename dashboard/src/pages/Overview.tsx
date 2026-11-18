import type { State, Usage } from "../types";
import { useT } from "../i18n";
import { fmtNum, nextAction, progress, useDateFormat } from "../lib";
import { Cmd, Empty, Meter, StatusMark, Stepper, Tile } from "../components/ui";
import { useApi } from "../api";
import { UsageSummary } from "./Usage";

export function Overview({ state }: { state: State }) {
  const { t, lang } = useT();
  const fmt = useDateFormat(lang);
  const n = fmtNum(lang);
  const p = progress(state);
  const na = nextAction(t, state, p);
  const usage = useApi<Usage>("/api/usage");
  const phases = state.curriculum?.phases ?? [];
  const phaseIds = phases.map((ph) => ph.id);
  const groups = [
    ...phases.map((ph) => ({ ...ph, modules: p.modules.filter((m) => m.phase === ph.id) })),
    { id: "__other", title: t.other, modules: p.modules.filter((m) => !phaseIds.includes(m.phase)) },
  ].filter((g) => g.modules.length);

  return (
    <>
      <section className="next card" aria-labelledby="next-h">
        <h2 id="next-h" className="eyebrow-h">
          {t.next}
        </h2>
        {na.module ? (
          <a className="na-title" href={`#/m/${na.module.id}`}>
            {na.title}
          </a>
        ) : (
          <p className="na-title">{na.title}</p>
        )}
        {na.module && <Stepper module={na.module} />}
        <p className="na-text">
          {na.text} {t.inYourAgent} <Cmd>{na.cmd}</Cmd>
        </p>
      </section>

      {p.total > 0 && (
        <section className="tiles" aria-label={t.progress}>
          <Tile label={t.progress} value={t.pct(p.pct)} sub={t.modulesDone(p.done.length, p.total, p.helped.length)}>
            <Meter value={p.done.length} max={p.total} label={t.progress} />
          </Tile>
          <Tile
            label={t.time}
            value={
              <>
                {n(p.hoursDone)}
                <span className="unit"> / {n(p.hoursTotal)} {t.hoursUnit}</span>
              </>
            }
            sub={t.byEstimate}
          >
            <Meter value={p.hoursDone} max={p.hoursTotal} label={t.time} />
          </Tile>
          <Tile label={t.quizAvg} value={p.quizAvg == null ? "–" : t.pct(p.quizAvg)} sub={t.quizSub} />
          <Tile label={t.asgAvg} value={p.assignAvg == null ? "–" : String(p.assignAvg)} sub={t.asgSub} />
        </section>
      )}

      <section aria-labelledby="cur-h">
        <h2 id="cur-h" className="section-h">
          {t.curriculum}
        </h2>
        {groups.length === 0 ? (
          <div className="card">
            <Empty>{t.noCurriculum}</Empty>
          </div>
        ) : (
          <div className="card">
            {groups.map((g) => {
              const d = g.modules.filter((m) => m.status === "completed" || m.status === "assisted").length;
              return (
                <section key={g.id} className="phase" aria-labelledby={`ph-${g.id}`}>
                  <div className="phase-head">
                    <h3 id={`ph-${g.id}`}>{g.title}</h3>
                    <span className="muted">{t.modulesCount(d, g.modules.length)}</span>
                  </div>
                  <ol className="mods">
                    {g.modules.map((m) => {
                      const scores = [
                        typeof m.score?.quiz === "number" ? t.quiz(m.score.quiz) : null,
                        typeof m.score?.assignment === "number" ? t.assignment(m.score.assignment) : null,
                      ].filter(Boolean);
                      return (
                        <li key={m.id} className={`mod mod-${m.status}`}>
                          <StatusMark status={m.status} />
                          <a className="mod-link" href={`#/m/${m.id}`}>
                            <span className="mod-id">{m.id}</span> {m.title}
                          </a>
                          <span className="chip">{t.types[m.type] ?? m.type}</span>
                          <span className="mod-meta">
                            {scores.join(" · ")}
                            {scores.length > 0 && <br />}
                            <span className="muted">
                              {m.completed_at ? fmt(m.completed_at) : m.started_at ? fmt(m.started_at) : m.est_hours ? `~${m.est_hours} ${t.hoursUnit}` : ""}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>
        )}
      </section>

      <div className="cols">
        <section className="card" aria-labelledby="weak-h">
          <h2 id="weak-h" className="card-h">
            {t.weak}
          </h2>
          {state.weak_points?.length ? (
            <ul className="plain">
              {state.weak_points.map((w) => (
                <li key={w.concept}>
                  {w.concept}
                  <span className="sub">
                    <a href={`#/m/${w.module}`}>{w.module}</a> · {t.correctReps(w.correct_count ?? 0)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>{t.weakNone}</Empty>
          )}
        </section>
        <section className="card" aria-labelledby="hist-h">
          <h2 id="hist-h" className="card-h">
            {t.activity}
          </h2>
          {state.history?.length ? (
            <ul className="plain">
              {[...state.history]
                .slice(-8)
                .reverse()
                .map((h, i) => (
                  <li key={i}>
                    {h.event}
                    <span className="sub">{fmt(h.date)}</span>
                  </li>
                ))}
            </ul>
          ) : (
            <Empty>{t.activityNone}</Empty>
          )}
        </section>
      </div>

      {usage.data?.summary && (
        <section aria-labelledby="usage-h">
          <h2 id="usage-h" className="section-h">
            {t.usage}
          </h2>
          <UsageSummary usage={usage.data} state={state} />
        </section>
      )}

      {state.curriculum?.skipped?.length ? (
        <section className="card" aria-labelledby="skip-h">
          <h2 id="skip-h" className="card-h">
            {t.skipped}
          </h2>
          <ul className="plain">
            {state.curriculum.skipped.map((s) => (
              <li key={s.topic}>
                {s.topic}
                <span className="sub">{s.reason}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
