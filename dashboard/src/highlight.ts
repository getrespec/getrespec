import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import markdown from "highlight.js/lib/languages/markdown";
import yaml from "highlight.js/lib/languages/yaml";
import sql from "highlight.js/lib/languages/sql";

const languages = { typescript, javascript, python, json, bash, xml, css, markdown, yaml, sql };
for (const [name, lang] of Object.entries(languages)) hljs.registerLanguage(name, lang);
hljs.registerAliases(["ts", "tsx"], { languageName: "typescript" });
hljs.registerAliases(["js", "jsx", "mjs"], { languageName: "javascript" });
hljs.registerAliases(["sh", "shell", "zsh"], { languageName: "bash" });
hljs.registerAliases(["html"], { languageName: "xml" });
hljs.registerAliases(["py"], { languageName: "python" });

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Highlights code and splits the resulting HTML into lines, closing and reopening spans
// at line breaks so each line stands alone (needed for line numbers and line anchors).
// highlight.js escapes the source text, so the output is safe to inject.
export function highlightLines(code: string, language?: string): string[] {
  let html: string;
  try {
    html = language && hljs.getLanguage(language) ? hljs.highlight(code, { language, ignoreIllegals: true }).value : escape(code);
  } catch {
    html = escape(code);
  }
  const lines: string[] = [];
  const open: string[] = [];
  let current = "";
  const re = /(<span[^>]*>)|(<\/span>)|(\n)|([^<\n]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m[1]) {
      open.push(m[1]);
      current += m[1];
    } else if (m[2]) {
      open.pop();
      current += m[2];
    } else if (m[3]) {
      lines.push(current + "</span>".repeat(open.length));
      current = open.join("");
    } else current += m[4];
  }
  lines.push(current + "</span>".repeat(open.length));
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

export function highlightBlock(code: string, language?: string): string {
  try {
    if (language && hljs.getLanguage(language)) return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  } catch {}
  return escape(code);
}
