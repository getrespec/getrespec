import type { State, Usage, UsageGroup, UsageRecord } from "../types";
import { useT } from "../i18n";
import { fmtNum } from "../lib";
import { Empty, Tile } from "../components/ui";

function Tiles({ g }: { g: UsageGroup }) {
  const { t, lang } = useT();
  const n = fmtNum(lang);
  return (
    <div className="tiles">
      <Tile label={t.usageRequests} value={n(g.requests)} sub={g.errors ? t.usageErrors(g.errors) : undefined} />
      <Tile label={t.usageIn} value={n(g.input_tokens)} sub={g.cached_input_tokens ? t.usageCached(n(g.cached_input_tokens)) : undefined} />
      <Tile label={t.usageOut} value={n(g.output_tokens)} />
      <Tile
        label={t.usageLatency}
        value={
          g.latency_p50_ms == null ? (
            "–"
          ) : (
            <>
              {n(g.latency_p50_ms)}
              <span className="unit"> ms</span>
            </>
          )
        }
        sub={g.ttfb_p50_ms == null ? undefined : t.usageTtfb(n(g.ttfb_p50_ms))}
      />
    </div>
  );
}

export function UsageSummary({ usage, state }: { usage: Usage; state: State }) {
  const { t, lang } = useT();
  const n = fmtNum(lang);
  const s = usage.summary!;
  const titleOf = (id: string) => state.curriculum?.modules?.find((m) => m.id === id)?.title ?? "";
  const hasCost = s.total.cost != null;
  return (
    <>
      <Tiles g={s.total} />
      <div className="card">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th scope="col">{t.colModule}</th>
                <th scope="col">{t.usageRequests}</th>
                <th scope="col">{t.usageIn}</th>
                <th scope="col">{t.usageOut}</th>
                <th scope="col">{t.usageLatency}</th>
                {hasCost && <th scope="col">{t.usageCost}</th>}
              </tr>
            </thead>
            <tbody>
              {Object.entries(s.modules).map(([id, g]) => (
                <tr key={id}>
                  <th scope="row">
                    <a href={`#/m/${id}/usage`}>
                      <span className="mod-id">{id}</span> {titleOf(id)}
                    </a>
                  </th>
                  <td>{n(g.requests)}</td>
                  <td>{n(g.input_tokens)}</td>
                  <td>{n(g.output_tokens)}</td>
                  <td>{g.latency_p50_ms == null ? "–" : `${n(g.latency_p50_ms)} ms`}</td>
                  {hasCost && <td>{g.cost == null ? "–" : `${g.cost.toFixed(4)} ${s.currency ?? ""}`}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {s.projection && (
          <p className="note">
            {t.usageProjection(n(s.projection.est_input_tokens_curriculum), n(s.projection.est_output_tokens_curriculum), s.projection.modules_with_assignments)}
          </p>
        )}
        <p className="note muted">{t.usageNote}</p>
      </div>
    </>
  );
}

export function ModuleUsage({ usage, moduleId }: { usage: Usage | null; moduleId: string }) {
  const { t, lang } = useT();
  const n = fmtNum(lang);
  const g = usage?.summary?.modules[moduleId];
  const records: UsageRecord[] = (usage?.records ?? []).filter((r) => r.module === moduleId).sort((a, b) => b.ts.localeCompare(a.ts));
  if (!g) return <Empty>{t.usageNone}</Empty>;
  const time = new Intl.DateTimeFormat(lang, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  return (
    <>
      <Tiles g={g} />
      <div className="card">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th scope="col">{t.colTime}</th>
                <th scope="col">{t.colModel}</th>
                <th scope="col">{t.colStatus}</th>
                <th scope="col">{t.colTokens}</th>
                <th scope="col">{t.colLatency}</th>
              </tr>
            </thead>
            <tbody>
              {records.slice(0, 100).map((r, i) => (
                <tr key={i} className={r.error ? "row-error" : undefined}>
                  <th scope="row">{time.format(new Date(r.ts))}</th>
                  <td>
                    {r.provider}/{r.response_model ?? r.model ?? "?"}
                    {r.stream ? " · stream" : ""}
                  </td>
                  <td>{r.error ? `${r.status ?? ""} ${r.error}` : r.status}</td>
                  <td>
                    {n(r.input_tokens)} → {n(r.output_tokens)}
                  </td>
                  <td>{r.latency_ms == null ? "–" : `${n(r.latency_ms)} ms`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note muted">{t.usageNote}</p>
      </div>
    </>
  );
}
