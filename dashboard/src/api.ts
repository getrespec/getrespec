import { createContext, useContext, useEffect, useState } from "react";

// A counter that increases whenever the server reports a change in learner/.
// Every data hook depends on it, so pages refresh live while the agent works.
export const LiveContext = createContext<{ version: number; connected: boolean }>({ version: 0, connected: true });

export function useLiveConnection() {
  const [version, setVersion] = useState(0);
  const [connected, setConnected] = useState(true);
  useEffect(() => {
    let es: EventSource | null = null;
    let retry: ReturnType<typeof setTimeout>;
    const open = () => {
      es = new EventSource("/api/events");
      es.addEventListener("ready", () => setConnected(true));
      es.addEventListener("change", () => setVersion((v) => v + 1));
      es.onerror = () => {
        setConnected(false);
        es?.close();
        retry = setTimeout(open, 3000);
      };
    };
    open();
    return () => {
      clearTimeout(retry);
      es?.close();
    };
  }, []);
  // Refetch once when the connection comes back, in case something changed meanwhile.
  useEffect(() => {
    if (connected) setVersion((v) => v + 1);
  }, [connected]);
  return { version, connected };
}

export type Loadable<T> = { data: T | null; error: { status: number; code?: string } | null; loading: boolean };

export function useApi<T>(path: string | null): Loadable<T> {
  const { version } = useContext(LiveContext);
  const [state, setState] = useState<Loadable<T>>({ data: null, error: null, loading: true });
  useEffect(() => {
    if (!path) {
      setState({ data: null, error: null, loading: false });
      return;
    }
    let cancelled = false;
    fetch(path)
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        if (cancelled) return;
        if (!r.ok) setState((s) => ({ data: r.status === 404 ? null : s.data, error: { status: r.status, code: body.error }, loading: false }));
        else setState({ data: body as T, error: null, loading: false });
      })
      .catch(() => !cancelled && setState((s) => ({ ...s, error: { status: 0 }, loading: false })));
    return () => {
      cancelled = true;
    };
  }, [path, version]);
  return state;
}

export const fileUrl = (path: string) => `/api/file?path=${encodeURIComponent(path)}`;
