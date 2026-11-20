#!/usr/bin/env node
// Checks GitHub for a newer Respec release. Never changes anything except its own cache file.
//
//   node scripts/check-update.mjs           check (at most once a day; the result is cached in learner/)
//   node scripts/check-update.mjs --force   check now, ignoring the cache
//   node scripts/check-update.mjs --quiet   print only when an update is available
//   node scripts/check-update.mjs --json    machine-readable output for the agent
//
// Set RESPEC_NO_UPDATE_CHECK=1 to turn the check off. The only request is to the GitHub
// releases API for this repo; nothing about you or your progress is sent.

import { currentVersion, fetchLatestRelease, readCache, writeCache, status, updatesDisabled } from "./lib/version.mjs";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const force = args.includes("--force");
const quiet = args.includes("--quiet");
const DAY = 24 * 60 * 60 * 1000;

const current = currentVersion();
const out = (obj, text) => {
  if (asJson) console.log(JSON.stringify(obj, null, 2));
  else if (text) console.log(text);
};

if (updatesDisabled()) {
  out({ current, disabled: true }, quiet ? "" : `Respec ${current}. The update check is turned off (RESPEC_NO_UPDATE_CHECK).`);
  process.exit(0);
}

const cache = readCache();
const fresh = cache && cache.current === current && Date.now() - Date.parse(cache.checked_at) < DAY;
let latest;
let checkedAt;
let reachable = true;

if (fresh && !force) {
  latest = cache.latest;
  checkedAt = cache.checked_at;
} else {
  latest = await fetchLatestRelease();
  checkedAt = new Date().toISOString();
  if (latest) writeCache({ checked_at: checkedAt, current, latest });
  else {
    reachable = false;
    // Keep showing what we knew, if anything.
    latest = cache?.latest ?? null;
    checkedAt = cache?.checked_at ?? null;
  }
}

const s = { ...status(current, latest, checkedAt), reachable };
let text = "";
if (s.update_available) {
  const notes = (latest.notes || "").trim().split("\n").slice(0, 40).join("\n");
  text = [
    `Respec ${latest.version} is available (you have ${current}).`,
    latest.url ? `Release notes: ${latest.url}` : "",
    notes ? `\n${notes}\n` : "",
    "To update, run /respec update in your agent.",
  ]
    .filter(Boolean)
    .join("\n");
} else if (!quiet) {
  text = reachable ? `Respec ${current} is up to date.` : `Respec ${current}. Couldn't check for updates (offline, GitHub not reachable, or no release published yet).`;
}
out(s, text);
