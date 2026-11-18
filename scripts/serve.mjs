#!/usr/bin/env node
// Respec dashboard server. Read-only, local-only, no dependencies.
//
//   node scripts/serve.mjs                       serve learner/ on http://127.0.0.1:4747
//   node scripts/serve.mjs --open                ...and open the browser
//   node scripts/serve.mjs --port 5000
//   node scripts/serve.mjs --learner examples/learner-demo   (sample data)
//
// Serves the prebuilt app in dashboard/dist and a small JSON API over the learner folder.
// It never writes anything. Only module files are exposed as files; the CV, .env, and any
// dotfile are never served. Requests must come from this machine (127.0.0.1, localhost Host).

import http from "node:http";
import { readFileSync, existsSync, statSync, readdirSync, watch, createReadStream } from "node:fs";
import { dirname, join, resolve, relative, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { loadUsage, loadPricing, summarize } from "./lib/usage.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const PORT = Number(flag("--port") ?? process.env.RESPEC_DASHBOARD_PORT ?? 4747);
const HOST = "127.0.0.1";
const learnerDir = resolve(root, flag("--learner") ?? "learner");
const modulesDir = join(learnerDir, "modules");
const distDir = resolve(root, flag("--dist") ?? "dashboard/dist");
const MAX_TEXT = 512 * 1024;
const MAX_FILES = 500;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
};

// ---------- helpers ----------
function send(res, status, body, headers = {}) {
  const isObj = typeof body === "object" && !Buffer.isBuffer(body);
  res.writeHead(status, {
    "content-type": isObj ? "application/json; charset=utf-8" : "text/plain; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...headers,
  });
  res.end(isObj ? JSON.stringify(body) : body);
}

function readJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

// Resolves a path inside modules/, or returns null if it escapes or touches a hidden segment.
function safeModulePath(rel) {
  if (typeof rel !== "string" || !rel) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(rel);
  } catch {
    return null;
  }
  if (decoded.includes("\0")) return null;
  const parts = decoded.split(/[\\/]+/).filter(Boolean);
  if (parts[0] !== "modules" || parts.some((p) => p === ".." || p.startsWith("."))) return null;
  const abs = resolve(learnerDir, ...parts);
  if (abs !== modulesDir && !abs.startsWith(modulesDir + sep)) return null;
  return abs;
}

function isBinary(buf) {
  const n = Math.min(buf.length, 8000);
  for (let i = 0; i < n; i++) if (buf[i] === 0) return true;
  return false;
}

function listFiles(dir) {
  const out = [];
  const walk = (d, depth) => {
    if (depth > 8 || out.length >= MAX_FILES) return;
    let entries = [];
    try {
      entries = readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const e of entries) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p, depth + 1);
      else if (e.isFile()) {
        const st = statSync(p);
        out.push({ path: relative(learnerDir, p).split(sep).join("/"), size: st.size, mtime: st.mtime.toISOString() });
        if (out.length >= MAX_FILES) return;
      }
    }
  };
  walk(dir, 0);
  return out;
}

// ---------- SSE ----------
const clients = new Set();
let pending = new Set();
let timer = null;
function broadcast(path) {
  pending.add(path);
  clearTimeout(timer);
  timer = setTimeout(() => {
    const paths = [...pending].filter((p) => !p.split("/").some((s) => s.startsWith(".")) && !p.startsWith("cv/"));
    pending = new Set();
    if (!paths.length) return;
    const msg = `event: change\ndata: ${JSON.stringify({ paths })}\n\n`;
    for (const c of clients) c.write(msg);
  }, 150);
}
try {
  if (existsSync(learnerDir)) {
    watch(learnerDir, { recursive: true }, (_e, file) => file && broadcast(String(file).split(sep).join("/")));
  }
} catch (e) {
  console.warn(`[respec] live updates unavailable: ${e.message}`);
}
setInterval(() => {
  for (const c of clients) c.write(": ping\n\n");
}, 25000).unref();

// ---------- API ----------
function api(req, res, url) {
  const p = url.pathname;

  if (p === "/api/state") {
    const sp = join(learnerDir, "state.json");
    if (!existsSync(sp)) return send(res, 404, { error: "no_state" });
    let state;
    try {
      state = readJson(sp);
    } catch (e) {
      return send(res, 500, { error: "invalid_state", message: e.message });
    }
    if ((state.schema_version ?? 1) < 2) return send(res, 409, { error: "old_schema" });
    return send(res, 200, state);
  }

  if (p === "/api/profile") {
    const pp = join(learnerDir, "profile.md");
    if (!existsSync(pp)) return send(res, 404, { error: "no_profile" });
    return send(res, 200, { markdown: readFileSync(pp, "utf8") });
  }

  if (p === "/api/usage") {
    const records = loadUsage(join(learnerDir, "usage", "usage.jsonl"));
    let state = null;
    try {
      state = readJson(join(learnerDir, "state.json"));
    } catch {}
    const summary = records.length ? summarize(records, { pricing: loadPricing(join(learnerDir, "pricing.json")), state }) : null;
    return send(res, 200, { summary, records: records.slice(-2000) });
  }

  const m = p.match(/^\/api\/modules\/([A-Za-z0-9_-]+)$/);
  if (m) {
    const dir = join(modulesDir, m[1]);
    if (!existsSync(dir)) return send(res, 200, { id: m[1], files: [] });
    return send(res, 200, { id: m[1], files: listFiles(dir) });
  }

  if (p === "/api/file") {
    const rel = url.searchParams.get("path");
    const abs = safeModulePath(rel);
    if (!abs) return send(res, 403, { error: "forbidden" });
    if (!existsSync(abs) || !statSync(abs).isFile()) return send(res, 404, { error: "not_found" });
    const st = statSync(abs);
    const buf = readFileSync(abs);
    if (isBinary(buf)) return send(res, 200, { path: rel, size: st.size, binary: true, content: null });
    const truncated = buf.length > MAX_TEXT;
    return send(res, 200, { path: rel, size: st.size, binary: false, truncated, content: buf.subarray(0, MAX_TEXT).toString("utf8") });
  }

  if (p === "/api/events") {
    res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-store", connection: "keep-alive" });
    res.write("event: ready\ndata: {}\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  return send(res, 404, { error: "not_found" });
}

// Raw module files (e.g. visual.html in an iframe). Always sandboxed.
function rawFile(res, url) {
  const abs = safeModulePath(url.pathname.slice("/files/".length));
  if (!abs || !existsSync(abs) || !statSync(abs).isFile()) return send(res, 404, "Not found");
  res.writeHead(200, {
    "content-type": TYPES[extname(abs).toLowerCase()] ?? "text/plain; charset=utf-8",
    "content-security-policy": "sandbox allow-scripts; default-src 'self' 'unsafe-inline' data:",
    "x-content-type-options": "nosniff",
    "cache-control": "no-store",
  });
  createReadStream(abs).pipe(res);
}

function staticFile(res, url) {
  if (!existsSync(join(distDir, "index.html"))) {
    return send(res, 500, "The dashboard app isn't built. Run: cd dashboard && npm install && npm run build");
  }
  let rel = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  let abs = resolve(distDir, rel || "index.html");
  if (!(abs === distDir || abs.startsWith(distDir + sep)) || !existsSync(abs) || statSync(abs).isDirectory()) abs = join(distDir, "index.html");
  const isIndex = abs.endsWith("index.html");
  res.writeHead(200, {
    "content-type": TYPES[extname(abs)] ?? "application/octet-stream",
    "cache-control": isIndex ? "no-store" : "public, max-age=31536000, immutable",
    "x-content-type-options": "nosniff",
    "referrer-policy": "no-referrer",
  });
  createReadStream(abs).pipe(res);
}

const allowedHosts = new Set([`127.0.0.1:${PORT}`, `localhost:${PORT}`, `[::1]:${PORT}`]);

const server = http.createServer((req, res) => {
  // Block DNS rebinding and other-origin access: only this machine's own host names.
  if (!allowedHosts.has(String(req.headers.host))) return send(res, 403, "Forbidden host");
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Read-only", { allow: "GET, HEAD" });
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith("/api/")) return api(req, res, url);
  if (url.pathname.startsWith("/files/")) return rawFile(res, url);
  return staticFile(res, url);
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") console.error(`Port ${PORT} is in use. Is the dashboard already running? Try --port <n>.`);
  else console.error(e.message);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  const link = `http://127.0.0.1:${PORT}`;
  console.log(`Respec dashboard: ${link}`);
  console.log(`Reading ${relative(root, learnerDir) || learnerDir} (read-only). Press Ctrl+C to stop.`);
  if (!existsSync(join(learnerDir, "state.json"))) console.log("No state.json yet; run /respec start in your agent.");
  if (args.includes("--open")) {
    const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
    const cmdArgs = process.platform === "win32" ? ["/c", "start", "", link] : [link];
    try {
      spawn(cmd, cmdArgs, { stdio: "ignore", detached: true }).unref();
    } catch {}
  }
});
