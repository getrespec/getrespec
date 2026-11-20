import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Children, isValidElement, useEffect, useRef } from "react";
import type { Module } from "../types";
import { useT } from "../i18n";
import { highlightBlock, highlightLines } from "../highlight";
import { stagesFor } from "../lib";

// Turns inline code that names a module file (`examples/tokens.ts`, `work/src/Chat.tsx:40`) or a
// module id (`m05`) into a link. Returns null when the text isn't a known file or module.
export type Linker = (text: string) => string | null;

export const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const textOf = (n: React.ReactNode): string =>
  typeof n === "string" || typeof n === "number" ? String(n) : Array.isArray(n) ? n.map(textOf).join("") : isValidElement(n) ? textOf((n.props as { children?: React.ReactNode }).children) : "";

// Markdown written by the agent. Raw HTML is not rendered (react-markdown default), so
// generated content can't inject markup. External links open in a new tab.
export function Markdown({ children, linker, terms = false, headingIds = false }: { children: string; linker?: Linker; terms?: boolean; headingIds?: boolean }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ className, children }) => {
            const lang = /language-(\w+)/.exec(className ?? "")?.[1];
            const text = String(children ?? "");
            // Inline code has no language class and no newline.
            if (!lang && !text.includes("\n")) {
              const href = linker?.(text);
              return href ? (
                <a className="code-link" href={href}>
                  <code>{children}</code>
                </a>
              ) : (
                <code>{children}</code>
              );
            }
            return <code className="hljs" dangerouslySetInnerHTML={{ __html: highlightBlock(text.replace(/\n$/, ""), lang) }} />;
          },
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer noopener">
              {children}
            </a>
          ),
          h2: ({ children }) => <h2 id={headingIds ? `s-${slug(textOf(children))}` : undefined}>{children}</h2>,
          li: ({ children }) => {
            if (!terms) return <li>{children}</li>;
            // Glossary rows: "**Term** – explanation" becomes a two-column row.
            const parts = Children.toArray(children);
            const first = parts[0];
            if (!isValidElement(first) || (first.type !== "strong" && first.type !== "code" && typeof first.type !== "function")) return <li>{children}</li>;
            const rest = parts.slice(1);
            if (typeof rest[0] === "string") rest[0] = (rest[0] as string).replace(/^\s*[–—:-]\s*/, "");
            return (
              <li className="term">
                <span className="term-name">{first}</span>
                <span className="term-def">{rest}</span>
              </li>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export function CodeView({ code, language, highlightLine }: { code: string; language?: string; highlightLine?: number }) {
  const lines = highlightLines(code, language);
  const ref = useRef<HTMLTableRowElement>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll only the code box, so the page (and its sticky header) stays put.
    if (highlightLine && ref.current && box.current) {
      box.current.scrollTop = ref.current.offsetTop - box.current.clientHeight / 2;
    }
  }, [highlightLine, code]);
  return (
    <div className="code" ref={box} tabIndex={0} role="region" aria-label={language ? `Code (${language})` : "Code"}>
      <table>
        <tbody>
          {lines.map((html, i) => (
            <tr key={i} id={`L${i + 1}`} ref={highlightLine === i + 1 ? ref : undefined} className={highlightLine === i + 1 ? "hl" : undefined}>
              <td className="ln" aria-hidden="true">
                {i + 1}
              </td>
              <td className="lc">
                <code className="hljs" dangerouslySetInnerHTML={{ __html: html || " " }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const STATUS_ICON: Record<string, string> = { completed: "✓", assisted: "◐", active: "▶", locked: "" };

export function StatusMark({ status }: { status: Module["status"] }) {
  const { t } = useT();
  return (
    <span className={`status st-${status}`}>
      <span className="status-icon" aria-hidden="true">
        {STATUS_ICON[status]}
      </span>
      <span className="status-label">{t.status[status]}</span>
    </span>
  );
}

// Icon-only status for dense lists; the label is still read by screen readers.
export function StatusIcon({ status }: { status: Module["status"] }) {
  const { t } = useT();
  return (
    <span className={`status st-${status}`} title={t.status[status]}>
      <span className="status-icon" aria-hidden="true">
        {status === "locked" ? (
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <rect x="1.5" y="4.5" width="7" height="5" rx="1" fill="currentColor" />
            <path d="M3 4.5V3a2 2 0 0 1 4 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        ) : (
          STATUS_ICON[status]
        )}
      </span>
      <span className="sr-only">{t.status[status]}</span>
    </span>
  );
}

// A compact stage indicator for list rows: one segment per stage.
export function StageBar({ module }: { module: Module }) {
  const { t } = useT();
  const steps = stagesFor(module);
  const cur = module.stage === "review" ? "quiz" : module.stage;
  const idx = module.stage === "done" ? steps.length : steps.indexOf(cur ?? "");
  return (
    <span className="stagebar" role="img" aria-label={t.stageLabel(t.stageNames[module.stage ?? ""] ?? "")}>
      {steps.map((s, i) => (
        <span key={s} className={i < idx ? "past" : i === idx ? "current" : ""} />
      ))}
    </span>
  );
}

export function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  const p = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="meter" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={p}>
      <span style={{ width: `${p}%` }} />
    </div>
  );
}

export function Stepper({ module }: { module: Module }) {
  const { t } = useT();
  const steps = stagesFor(module);
  const cur = module.stage === "review" ? "quiz" : module.stage === "done" ? "__done" : module.stage;
  const idx = cur === "__done" ? steps.length : steps.indexOf(cur ?? "");
  return (
    <ol className="stepper" aria-label={t.tabs.lesson}>
      {steps.map((s, i) => {
        const state = i < idx ? "past" : i === idx ? "current" : "future";
        const label = s === cur && module.stage === "review" ? `${t.stageNames.quiz} · ${t.stageNames.review}` : t.stageNames[s];
        return (
          <li key={s} className={`step ${state}`} aria-current={state === "current" ? "step" : undefined}>
            <span className="dot" aria-hidden="true" />
            {label}
          </li>
        );
      })}
    </ol>
  );
}

export function Cmd({ children }: { children: string }) {
  return <code className="cmd">{children}</code>;
}

export function Tile({ label, value, sub, children }: { label: string; value: React.ReactNode; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="tile">
      <div className="tile-label">{label}</div>
      <div className="tile-value">{value}</div>
      {sub && <div className="tile-sub">{sub}</div>}
      {children}
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="empty">{children}</p>;
}
