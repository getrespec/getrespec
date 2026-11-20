// Version helpers shared by check-update.mjs, release.mjs, and the dashboard server.
// The version lives in the root package.json; releases are GitHub releases tagged v<version>.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const pkgPath = join(root, "package.json");

export function readPackage() {
  return JSON.parse(readFileSync(pkgPath, "utf8"));
}

export function currentVersion() {
  return readPackage().version;
}

// "owner/repo" from package.json → repository.url
export function repoSlug() {
  const url = readPackage().repository?.url ?? "";
  const m = /github\.com[/:]([^/]+\/[^/.]+)(\.git)?$/.exec(url);
  return m ? m[1] : null;
}

// Semver-ish: "1.2.3", optional leading "v", optional "-pre" (a pre-release sorts before its release).
export function parseVersion(v) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(String(v).trim());
  return m ? { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ?? null } : null;
}

export function compareVersions(a, b) {
  const x = parseVersion(a);
  const y = parseVersion(b);
  if (!x || !y) throw new Error(`Not a version: ${!x ? a : b}`);
  for (const k of ["major", "minor", "patch"]) if (x[k] !== y[k]) return x[k] < y[k] ? -1 : 1;
  if (x.pre === y.pre) return 0;
  if (x.pre === null) return 1;
  if (y.pre === null) return -1;
  return x.pre < y.pre ? -1 : 1;
}

// The newest published release on GitHub. Resolves to null when there is none, the repo
// isn't reachable (offline, private, rate-limited), or the request takes longer than timeoutMs.
// RESPEC_RELEASES_URL overrides the endpoint (used by the tests).
export async function fetchLatestRelease({ timeoutMs = 4000 } = {}) {
  const slug = repoSlug();
  const url = process.env.RESPEC_RELEASES_URL ?? (slug ? `https://api.github.com/repos/${slug}/releases/latest` : null);
  if (!url) return null;
  try {
    const res = await fetch(url, {
      headers: { accept: "application/vnd.github+json", "user-agent": "respec-update-check" },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const r = await res.json();
    const version = String(r.tag_name ?? "").replace(/^v/, "");
    if (!parseVersion(version)) return null;
    return { version, url: r.html_url ?? null, notes: r.body ?? "", published_at: r.published_at ?? null };
  } catch {
    return null;
  }
}

export const updatesDisabled = () => /^(1|true|yes)$/i.test(process.env.RESPEC_NO_UPDATE_CHECK ?? "");

// The result of the last check, cached in learner/ so it runs at most once a day.
// RESPEC_LEARNER_DIR points somewhere else (used by the tests, so they never touch a real learner/).
const defaultLearnerDir = () => (process.env.RESPEC_LEARNER_DIR ? resolve(process.env.RESPEC_LEARNER_DIR) : join(root, "learner"));
export const cachePath = (learnerDir = defaultLearnerDir()) => join(learnerDir, ".update-check.json");

export function readCache(learnerDir = defaultLearnerDir()) {
  const p = cachePath(learnerDir);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

export function writeCache(data, learnerDir = defaultLearnerDir()) {
  if (!existsSync(learnerDir)) return; // before /respec start there's nowhere private to keep it
  writeFileSync(cachePath(learnerDir), JSON.stringify(data, null, 2) + "\n");
}

// Combines the installed version with a release (or null) into what the UI and the agent show.
export function status(current, latest, checkedAt) {
  const available = !!latest && compareVersions(latest.version, current) > 0;
  return { current, latest: latest ?? null, update_available: available, checked_at: checkedAt ?? null };
}
