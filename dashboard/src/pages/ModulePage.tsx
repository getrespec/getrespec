import type { EvaluationFile, FileContent, FileEntry, Module, QuizFile, State, Usage } from "../types";
import { useT } from "../i18n";
import { useApi, fileUrl } from "../api";
import { langForFile, useDateFormat } from "../lib";
import { Cmd, CodeView, Empty, Markdown, Meter, StatusMark, Stepper } from "../components/ui";
import { ModuleUsage } from "./Usage";

export type ModuleRoute = { id: string; tab?: string; file?: string; line?: number };

const TABS = ["lesson", "quiz", "assignment", "evaluation", "files", "usage"] as const;

function useText(path: string | null) {
  const r = useApi<FileContent>(path ? fileUrl(path) : null);
  return r.data?.content ?? null;
}
function useJson<T>(path: string | null, present: boolean): T | null {
  const text = useText(present ? path : null);
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export function ModulePage({ state, route }: { state: State; route: ModuleRoute }) {
  const { t } = useT();
  const module = state.curriculum?.modules?.find((m) => m.id === route.id);
  const list = useApi<{ files: FileEntry[] }>(`/api/modules/${encodeURIComponent(route.id)}`);
  const usage = useApi<Usage>("/api/usage");
  const files = list.data?.files ?? [];
  const base = `modules/${route.id}/`;
  const has = (f: string) => files.some((x) => x.path === base + f);
  const remedials = files
    .map((f) => f.path.slice(base.length))
    .filter((f) => /^assignment-remedial-\d+\.md$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));

  if (!module) {
    return (
      <div className="card">
        <p>
          <a href="#/">← {t.back}</a>
        </p>
        <Empty>{route.id}?</Empty>
      </div>
    );
  }

  const available: Record<(typeof TABS)[number], boolean> = {
    lesson: has("lesson.md"),
    quiz: has("quiz.json") || has("quiz.md"),
    assignment: has("assignment.md"),
    evaluation: has("evaluation.json") || has("evaluation.md"),
    files: files.length > 0,
    usage: Boolean(usage.data?.summary?.modules[module.id]),
  };
  const defaultTab = (["evaluation", "assignment", "quiz", "lesson"] as const).find((k) => {
    if (module.status === "active") {
      const s = module.stage;
      if (s === "lesson" || s === "review") return k === "lesson";
      if (s === "quiz") return k === "quiz" ? available.quiz : k === "lesson";
      if (s === "assignment" || s === "evaluation") return k === "assignment";
    }
    return available[k];
  });
  const tab = (TABS as readonly string[]).includes(route.tab ?? "") ? (route.tab as (typeof TABS)[number]) : (defaultTab ?? "lesson");

  return (
    <>
      <p className="crumb">
        <a href="#/">← {t.back}</a>
      </p>
      <header className="mod-head">
        <div>
          <p className="mod-head-meta">
            <span className="mod-id">{module.id}</span>
            <span className="chip">{t.types[module.type] ?? module.type}</span>
            <StatusMark status={module.status} />
          </p>
          <h1 tabIndex={-1}>{module.title}</h1>
          {module.status === "active" && <Stepper module={module} />}
        </div>
      </header>

      {module.status === "locked" ? (
        <div className="card">
          <p className="muted">{t.lockedModule}</p>
          <Plan module={module} open />
        </div>
      ) : (
        <>
          <Plan module={module} />
          <nav className="tabs" aria-label={module.title}>
            {TABS.map((k) =>
              available[k] || k === "lesson" ? (
                <a key={k} href={`#/m/${module.id}/${k}`} aria-current={tab === k ? "page" : undefined} className="tab">
                  {t.tabs[k]}
                </a>
              ) : (
                <span key={k} className="tab tab-off" title={t.notYet}>
                  {t.tabs[k]}
                </span>
              )
            )}
          </nav>
          <div className="tab-panel">
            {tab === "lesson" && <LessonTab module={module} hasLesson={available.lesson} hasVisual={has("visual.html")} hasReview={has("review.md")} />}
            {tab === "quiz" && <QuizTab module={module} hasJson={has("quiz.json")} hasMd={has("quiz.md")} />}
            {tab === "assignment" && <AssignmentTab module={module} has={available.assignment} remedials={remedials} />}
            {tab === "evaluation" && <EvaluationTab module={module} hasJson={has("evaluation.json")} hasMd={has("evaluation.md")} />}
            {tab === "files" && <FilesTab module={module} files={files} selected={route.file} line={route.line} />}
            {tab === "usage" && <ModuleUsage usage={usage.data} moduleId={module.id} />}
          </div>
        </>
      )}
    </>
  );
}

function Plan({ module, open = false }: { module: Module; open?: boolean }) {
  const { t } = useT();
  const body = (
    <div className="plan">
      {module.objectives?.length ? (
        <>
          <h3>{t.objectives}</h3>
          <ul>
            {module.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </>
      ) : null}
      {module.why && (
        <>
          <h3>{t.why}</h3>
          <p>{module.why}</p>
        </>
      )}
      {module.resources?.length ? (
        <>
          <h3>{t.resources}</h3>
          <ul>
            {module.resources.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noreferrer noopener">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
  if (open) return body;
  return (
    <details className="plan-details">
      <summary>
        {t.objectives} · {t.why}
      </summary>
      {body}
    </details>
  );
}

function LessonTab({ module, hasLesson, hasVisual, hasReview }: { module: Module; hasLesson: boolean; hasVisual: boolean; hasReview: boolean }) {
  const { t } = useT();
  const lesson = useText(hasLesson ? `modules/${module.id}/lesson.md` : null);
  const review = useText(hasReview ? `modules/${module.id}/review.md` : null);
  if (!hasLesson)
    return (
      <div className="card">
        <Empty>
          {t.noLesson} <Cmd>/respec next</Cmd>
        </Empty>
      </div>
    );
  const visualSrc = `/files/modules/${encodeURIComponent(module.id)}/visual.html`;
  return (
    <>
      {hasVisual && (
        <section className="card visual" aria-labelledby="visual-h">
          <div className="visual-head">
            <h2 id="visual-h" className="card-h">
              {t.visual}
            </h2>
            <a href={visualSrc} target="_blank" rel="noreferrer">
              {t.openVisual}
            </a>
          </div>
          <iframe title={t.visual} src={visualSrc} sandbox="allow-scripts" loading="lazy" />
        </section>
      )}
      <article className="card">{lesson ? <Markdown>{lesson}</Markdown> : <p className="muted">{t.loading}</p>}</article>
      {review && (
        <section className="card" aria-labelledby="review-h">
          <h2 id="review-h" className="card-h">
            {t.reviewNotes}
          </h2>
          <Markdown>{review}</Markdown>
        </section>
      )}
    </>
  );
}

function QuizTab({ module, hasJson, hasMd }: { module: Module; hasJson: boolean; hasMd: boolean }) {
  const { t, lang } = useT();
  const fmt = useDateFormat(lang);
  const quiz = useJson<QuizFile>(`modules/${module.id}/quiz.json`, hasJson);
  const md = useText(!hasJson && hasMd ? `modules/${module.id}/quiz.md` : null);
  if (!hasJson && !hasMd)
    return (
      <div className="card">
        <Empty>{t.noQuiz}</Empty>
      </div>
    );
  if (!quiz) return <article className="card">{md ? <Markdown>{md}</Markdown> : <p className="muted">{t.loading}</p>}</article>;
  return (
    <>
      {[...quiz.attempts].reverse().map((a, ai) => {
        const right = a.questions.filter((q) => q.result === "correct").length;
        return (
          <section key={ai} className="card quiz" aria-label={`${t.quizKind[a.kind] ?? a.kind}, ${fmt(a.date)}`}>
            <div className="attempt-head">
              <h2 className="card-h">
                {t.quizKind[a.kind] ?? a.kind} · {fmt(a.date)}
              </h2>
              <p className={`score-badge ${a.score >= 80 ? "ok" : "low"}`}>
                {t.pct(a.score)}
                <span className="muted"> · {t.questionsRight(right, a.questions.length)}</span>
              </p>
            </div>
            <ol className="questions">
              {a.questions.map((q) => (
                <li key={q.id} className={`q q-${q.result}`}>
                  <p className="q-result">
                    <span className="q-icon" aria-hidden="true">
                      {q.result === "correct" ? "✓" : q.result === "partial" ? "◐" : "✕"}
                    </span>
                    {t.results[q.result]}
                    {q.concept && <span className="chip">{q.concept}</span>}
                    {q.from_weak_points && <span className="chip chip-weak">{t.fromWeak}</span>}
                  </p>
                  <p className="q-text">{q.question}</p>
                  {q.answer && (
                    <p className="q-answer">
                      <span className="muted">{t.yourAnswer}: </span>
                      {q.answer}
                    </p>
                  )}
                  {q.explanation && <p className="q-expl">{q.explanation}</p>}
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </>
  );
}

function AssignmentTab({ module, has, remedials }: { module: Module; has: boolean; remedials: string[] }) {
  const { t } = useT();
  const text = useText(has ? `modules/${module.id}/assignment.md` : null);
  if (!has)
    return (
      <div className="card">
        <Empty>{module.type === "theory" ? t.theoryNoAssignment : t.noAssignment}</Empty>
      </div>
    );
  return (
    <>
      <article className="card">{text ? <Markdown>{text}</Markdown> : <p className="muted">{t.loading}</p>}</article>
      {remedials.map((f) => (
        <Remedial key={f} path={`modules/${module.id}/${f}`} n={f.match(/\d+/)![0]} />
      ))}
    </>
  );
}

function Remedial({ path, n }: { path: string; n: string }) {
  const { t } = useT();
  const text = useText(path);
  return (
    <section className="card remedial" aria-label={t.remedial(n)}>
      <p className="eyebrow-h">{t.remedial(n)}</p>
      {text && <Markdown>{text}</Markdown>}
    </section>
  );
}

function EvaluationTab({ module, hasJson, hasMd }: { module: Module; hasJson: boolean; hasMd: boolean }) {
  const { t, lang } = useT();
  const fmt = useDateFormat(lang);
  const ev = useJson<EvaluationFile>(`modules/${module.id}/evaluation.json`, hasJson);
  const md = useText(!hasJson && hasMd ? `modules/${module.id}/evaluation.md` : null);
  if (!hasJson && !hasMd)
    return (
      <div className="card">
        <Empty>
          {t.noEvaluation} <Cmd>/respec submit</Cmd>
        </Empty>
      </div>
    );
  if (!ev) return <article className="card">{md ? <Markdown>{md}</Markdown> : <p className="muted">{t.loading}</p>}</article>;
  return (
    <>
      {[...ev.attempts].reverse().map((a, i) => (
        <section key={i} className="card evaluation" aria-label={`${fmt(a.date)} ${a.total}/100`}>
          <div className="attempt-head">
            <div>
              <h2 className="card-h">{fmt(a.date)}</h2>
              {a.task && <p className="muted small">{t.evaluatedTask(a.task)}</p>}
            </div>
            <p className={`score-badge ${a.passed ? "ok" : "low"}`}>
              {a.total}/100
              <span className="muted"> · {a.passed ? t.passed : t.notPassed}</span>
            </p>
          </div>
          <div className="table-wrap">
            <table className="data rubric">
              <thead>
                <tr>
                  <th scope="col">{t.rubricItem}</th>
                  <th scope="col">{t.score}</th>
                  <th scope="col">{t.evidence}</th>
                </tr>
              </thead>
              <tbody>
                {a.rubric.map((r) => (
                  <tr key={r.item}>
                    <th scope="row">
                      {r.item}
                      {r.comment && <span className="sub">{r.comment}</span>}
                    </th>
                    <td className="score-cell">
                      {r.score}/{r.weight}
                      <Meter value={r.score} max={r.weight} label={`${r.item}: ${r.score}/${r.weight}`} />
                    </td>
                    <td>
                      {r.evidence?.length ? (
                        <ul className="evidence">
                          {r.evidence.map((e, j) => (
                            <li key={j}>
                              <a href={`#/m/${module.id}/files?f=${encodeURIComponent(e.file)}${e.line ? `&l=${e.line}` : ""}`}>
                                <code>
                                  {e.file}
                                  {e.line ? `:${e.line}` : ""}
                                </code>
                              </a>
                              {e.note && <span className="sub">{e.note}</span>}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="muted">–</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cols eval-lists">
            {a.strengths?.length ? (
              <div>
                <h3>{t.strengths}</h3>
                <ul>
                  {a.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {a.gaps?.length ? (
              <div>
                <h3>{t.gaps}</h3>
                <ul>
                  {a.gaps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {a.defense?.length ? (
            <>
              <h3>{t.defense}</h3>
              <dl className="defense">
                {a.defense.map((d) => (
                  <div key={d.question}>
                    <dt>{d.question}</dt>
                    <dd>{d.answer}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}
          {a.next_step && (
            <p className="next-step">
              <strong>{t.nextStepEval}:</strong> {a.next_step}
            </p>
          )}
        </section>
      ))}
    </>
  );
}

function FilesTab({ module, files, selected, line }: { module: Module; files: FileEntry[]; selected?: string; line?: number }) {
  const { t } = useT();
  const base = `modules/${module.id}/`;
  const rel = files.map((f) => ({ ...f, rel: f.path.slice(base.length) }));
  const current = selected && rel.some((f) => f.rel === selected) ? selected : null;
  const content = useApi<FileContent>(current ? fileUrl(base + current) : null);
  if (!files.length)
    return (
      <div className="card">
        <Empty>{t.noFiles}</Empty>
      </div>
    );
  return (
    <div className="files">
      <nav className="card file-list" aria-label={t.files}>
        <ul>
          {rel.map((f) => {
            const slash = f.rel.lastIndexOf("/");
            return (
              <li key={f.rel}>
                <a href={`#/m/${module.id}/files?f=${encodeURIComponent(f.rel)}`} aria-current={current === f.rel ? "true" : undefined}>
                  {slash >= 0 && <span className="dir">{f.rel.slice(0, slash + 1)}</span>}
                  {f.rel.slice(slash + 1)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <section className="card file-view" aria-label={current ?? t.selectFile}>
        {!current ? (
          <Empty>{t.selectFile}</Empty>
        ) : !content.data ? (
          <p className="muted">{t.loading}</p>
        ) : (
          <>
            <p className="file-path">
              <code>{current}</code>
              {line ? <span className="muted"> · {t.lineLabel(line)}</span> : null}
            </p>
            {content.data.binary ? (
              <Empty>{t.binary}</Empty>
            ) : (
              <>
                {content.data.truncated && <p className="note muted">{t.truncated}</p>}
                <CodeView code={content.data.content ?? ""} language={langForFile(current)} highlightLine={line} />
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
