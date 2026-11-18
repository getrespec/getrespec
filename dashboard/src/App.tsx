import { useEffect, useRef, useState } from "react";
import type { State } from "./types";
import { LiveContext, useApi, useLiveConnection } from "./api";
import { I18nContext, stringsFor, useT } from "./i18n";
import { progress, nextLevelHint } from "./lib";
import { Cmd, Empty, Markdown } from "./components/ui";
import { Overview } from "./pages/Overview";
import { ModulePage, type ModuleRoute } from "./pages/ModulePage";

type Route = { page: "overview" } | { page: "profile" } | ({ page: "module" } & ModuleRoute);

function parseHash(hash: string): Route {
  const [path, query = ""] = hash.replace(/^#/, "").split("?");
  const parts = path.split("/").filter(Boolean);
  const q = new URLSearchParams(query);
  if (parts[0] === "profile") return { page: "profile" };
  if (parts[0] === "m" && parts[1]) {
    const l = Number(q.get("l"));
    return { page: "module", id: decodeURIComponent(parts[1]), tab: parts[2], file: q.get("f") ?? undefined, line: l > 0 ? l : undefined };
  }
  return { page: "overview" };
}

function useRoute() {
  const [route, setRoute] = useState(() => parseHash(location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(location.hash));
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return route;
}

function Mark() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
      <rect x="0" width="6" height="14" rx="1.5" fill="var(--ultra)" />
      <rect x="8" width="6" height="14" rx="1.5" fill="var(--ultra)" />
      <rect x="16" width="6" height="14" rx="1.5" fill="var(--gold)" />
    </svg>
  );
}

function Shell({ state, route, connected, notice }: { state: State | null; route: Route; connected: boolean; notice: React.ReactNode }) {
  const { t } = useT();
  const p = state ? progress(state) : null;
  const level = p ? t.levels[p.levelIdx] : null;

  // Move focus to the main heading after navigating, so screen-reader and keyboard users land on the new page.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (route.page === "module" && route.file) return;
    document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: false });
    window.scrollTo(0, 0);
  }, [route.page, route.page === "module" ? route.id : null]);

  useEffect(() => {
    const name = state?.learner?.name;
    const page = route.page === "module" ? state?.curriculum?.modules?.find((m) => m.id === route.id)?.title : route.page === "profile" ? t.profile : t.overview;
    document.title = [page, name, "Respec"].filter(Boolean).join(" · ");
  }, [route, state, t]);

  return (
    <>
      <a href="#main" className="skip" onClick={(e) => (e.preventDefault(), document.getElementById("main")?.focus())}>
        {t.skip}
      </a>
      <header className="top">
        <div className="wrap top-inner">
          <a className="brand" href="#/">
            <Mark /> Respec
          </a>
          <nav aria-label="Respec">
            <a href="#/" aria-current={route.page === "overview" ? "page" : undefined}>
              {t.overview}
            </a>
            <a href="#/profile" aria-current={route.page === "profile" ? "page" : undefined}>
              {t.profile}
            </a>
          </nav>
          <span className={`live ${connected ? "on" : "off"}`} role="status">
            <span className="live-dot" aria-hidden="true" />
            {connected ? t.live : t.offline}
          </span>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="wrap">
        {state && p && route.page === "overview" && (
          <div className="hero">
            <div>
              <h1 tabIndex={-1}>{state.learner.name ?? t.learner}</h1>
              <p className="route">
                {state.learner.current_role}
                {" → "}
                {state.target_role ? <strong>{state.target_role.title}</strong> : <span className="muted">{t.noTarget}</span>}
              </p>
            </div>
            <div className="level">
              <p className="level-badge" aria-label={`${t.level}: ${level}`}>
                {level}
              </p>
              <p className="level-steps">
                {t.levels.map((l, i) => (
                  <span key={l}>
                    {i > 0 && " → "}
                    {l === level ? <b>{l}</b> : l}
                  </span>
                ))}
              </p>
              <p className="level-steps">{nextLevelHint(t, p)}</p>
            </div>
          </div>
        )}
        {state && route.page === "overview" && <Overview state={state} />}
        {state && route.page === "module" && <ModulePage state={state} route={route} />}
        {route.page === "profile" && <Profile />}
        {notice}
      </main>
    </>
  );
}

function Profile() {
  const { t } = useT();
  const profile = useApi<{ markdown: string }>("/api/profile");
  return (
    <>
      <h1 tabIndex={-1} className="sr-only">
        {t.profile}
      </h1>
      <article className="card">{profile.data ? <Markdown>{profile.data.markdown}</Markdown> : <Empty>{profile.loading ? t.loading : t.noProfile}</Empty>}</article>
    </>
  );
}

function StateGate({ connected }: { connected: boolean }) {
  const res = useApi<State>("/api/state");
  const route = useRoute();
  const i18n = stringsFor(res.data?.learner?.language);
  useEffect(() => {
    document.documentElement.lang = i18n.lang;
  }, [i18n.lang]);
  const t = i18n.t;

  let notice: React.ReactNode = null;
  if (!res.data && res.error?.code === "no_state")
    notice = (
      <div className="card notice">
        <h1 tabIndex={-1}>{t.noStateTitle}</h1>
        <p>
          {t.noState} <Cmd>/respec start</Cmd>
        </p>
      </div>
    );
  else if (res.error?.code === "old_schema")
    notice = (
      <div className="card notice">
        <p>
          {t.oldSchema} <Cmd>node scripts/migrate-state.mjs</Cmd>
        </p>
      </div>
    );
  else if (!res.data && res.error) notice = <div className="card notice">{t.loadError}</div>;

  return (
    <I18nContext.Provider value={i18n}>
      <Shell state={res.data} route={route} connected={connected} notice={notice} />
    </I18nContext.Provider>
  );
}

export default function App() {
  const live = useLiveConnection();
  return (
    <LiveContext.Provider value={live}>
      <StateGate connected={live.connected} />
    </LiveContext.Provider>
  );
}
