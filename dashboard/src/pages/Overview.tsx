import type { CoverageItem, Module, State, Usage } from "../types";
import { useT } from "../i18n";
import { fmtNum, nextAction, progress, useDateFormat } from "../lib";
import { Cmd, Empty, Meter, StageBar, StatusIcon, Stepper, Tile } from "../components/ui";
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
          <div className="card curriculum">
            {groups.map((g) => (
              <Phase key={g.id} title={g.title} modules={g.modules} />
            ))}
          </div>
        )}
      </section>

      {state.curriculum?.coverage?.length ? (
        <SkillMap state={state} />
      ) : state.curriculum?.skipped?.length ? (
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

    </>
  );
}

function SkillMap({ state }: { state: State }) {
  const { t } = useT();
  const items = state.curriculum?.coverage ?? [];
  const prefs = state.learner.preferences;
  const groups: { key: CoverageItem["status"]; items: CoverageItem[] }[] = (["covered", "known", "optional"] as const).map((key) => ({
    key,
    items: items.filter((i) => i.status === key),
  }));
  const prefRows = prefs
    ? ([
        [t.prefGoal, prefs.goal ? t.goals[prefs.goal] ?? prefs.goal : null],
        [t.prefScope, prefs.scope ? t.scopes[prefs.scope] ?? prefs.scope : null],
        [t.prefExamples, prefs.example_context],
        [t.prefCapstone, prefs.capstone_context],
      ].filter(([, v]) => v) as [string, string][])
    : [];

  return (
    <section aria-labelledby="map-h">
      <h2 id="map-h" className="section-h">
        {t.skillMap}
      </h2>
      <div className="card">
        <p className="muted map-intro">{t.skillMapIntro}</p>
        {state.learner.target_postings?.length ? (
          <p className="cov-targets">
            <span className="muted">{t.targetPostings}: </span>
            {state.learner.target_postings.map((p, i) => (
              <span key={p.id}>
                {i > 0 && ", "}
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer noopener">
                    {[p.company, p.title].filter(Boolean).join(" – ") || p.id}
                  </a>
                ) : (
                  [p.company, p.title].filter(Boolean).join(" – ") || p.id
                )}
              </span>
            ))}
          </p>
        ) : null}
        {prefRows.length > 0 && (
          <dl className="prefs">
            {prefRows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="cov-groups">
          {groups.map((g) => (
            <section key={g.key} className={`cov cov-${g.key}`} aria-labelledby={`cov-${g.key}`}>
              <h3 id={`cov-${g.key}`} className="cov-h">
                {t.cov[g.key]} <span className="muted">{g.items.length}</span>
              </h3>
              {g.items.length ? (
                <ul className="plain">
                  {g.items.map((i) => (
                    <li key={i.skill}>
                      {i.skill}
                      {(i.modules?.length || i.postings?.length || (i.priority && i.status !== "known")) ? (
                        <span className="cov-meta">
                          {i.priority && i.status !== "known" ? <span className="cov-prio">{t.priorities[i.priority] ?? i.priority}</span> : null}
                          {i.modules?.map((m) => (
                            <a key={m} className="mod-id" href={`#/m/${m}`}>
                              {m}
                            </a>
                          ))}
                          {i.postings?.length ? <span className="cov-posting">{t.inPostings(i.postings.length)}</span> : null}
                        </span>
                      ) : null}
                      {i.note && <span className="sub">{i.note}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">{t.covNone}</p>
              )}
              {g.key === "optional" && g.items.length > 0 && (
                <p className="sub cov-add">
                  {t.covAdd} <Cmd>/respec plan</Cmd>
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function Phase({ title, modules }: { title: string; modules: Module[] }) {
  const { t } = useT();
  const done = modules.filter((m) => m.status === "completed" || m.status === "assisted");
  const hours = modules.reduce((a, m) => a + (Number(m.est_hours) || 0), 0);
  const allLocked = modules.every((m) => m.status === "locked");
  const head = (
    <>
      <span className="phase-title">{title}</span>
      <span className="phase-meta">
        <Meter value={done.length} max={modules.length} label={`${title}: ${done.length}/${modules.length}`} />
        <span>{t.phaseMeta(done.length, modules.length, hours)}</span>
      </span>
    </>
  );
  const list = (
    <ol className="mods">
      {modules.map((m) => (
        <ModuleRow key={m.id} m={m} />
      ))}
    </ol>
  );
  return (
    <details className="phase" open={!allLocked}>
      <summary className="phase-head">
        {head}
      </summary>
      {list}
    </details>
  );
}

function resultOf(t: ReturnType<typeof useT>["t"], m: Module): { text: string; tone: "ok" | "review" | "help" } | null {
  if (m.status !== "completed" && m.status !== "assisted") return null;
  const q = m.score?.quiz;
  const a = m.score?.assignment;
  const parts: string[] = [];
  const afterReview = typeof q === "number" && q < 80;
  if (m.status === "assisted") parts.push(t.withHelp);
  else if (afterReview) parts.push(t.passedAfterReview);
  else if (typeof q === "number") parts.push(t.quizShort(q));
  if (typeof a === "number") parts.push(t.assignmentShort(a));
  return { text: parts.join(" · "), tone: m.status === "assisted" ? "help" : afterReview ? "review" : "ok" };
}

function ModuleRow({ m }: { m: Module }) {
  const { t, lang } = useT();
  const fmt = useDateFormat(lang);
  const r = resultOf(t, m);
  const when = m.completed_at ? fmt(m.completed_at) : m.started_at ? fmt(m.started_at) : m.est_hours ? `~${m.est_hours} ${t.hoursUnit}` : "";
  return (
    <li className={`mod mod-${m.status}`}>
      <StatusIcon status={m.status} />
      <span className="mod-id">{m.id}</span>
      <div className="mod-main">
        <a className="mod-link" href={`#/m/${m.id}`}>
          {m.title}
        </a>
        {m.status === "active" ? (
          <span className="mod-sub">
            <StageBar module={m} />
            <span>{t.stageNames[m.stage === "review" ? "review" : m.stage ?? ""] ?? ""}</span>
          </span>
        ) : (
          <span className="mod-sub">{t.types[m.type] ?? m.type}</span>
        )}
      </div>
      <span className="mod-result">{r ? <span className={`result result-${r.tone}`}>{r.text}</span> : null}</span>
      <span className="mod-when">{when}</span>
    </li>
  );
}
