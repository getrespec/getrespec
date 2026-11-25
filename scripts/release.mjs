#!/usr/bin/env node
// Prepares a release on a branch: sets the version, dates the changelog, and commits. It doesn't tag or push.
//
//   node scripts/release.mjs 0.2.0            prepare 0.2.0
//   node scripts/release.mjs 0.2.0 --dry-run  show what would change
//
// Before running: what changed is under "## [Unreleased]" in CHANGELOG.md, and you're on a branch
// (e.g. release/v0.2.0), not main. After running: push the branch and open a pull request.
// Merging it into main runs .github/workflows/release.yml, which tags v0.2.0 and publishes the
// GitHub release with that version's changelog section as its notes. See RELEASING.md.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { root, readPackage, parseVersion, compareVersions } from "./lib/version.mjs";

const [version] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const dry = process.argv.includes("--dry-run");
const fail = (m) => {
  console.error(m);
  process.exit(1);
};
const git = (...a) => execFileSync("git", a, { cwd: root, encoding: "utf8" }).trim();

if (!version || !parseVersion(version)) fail("Usage: node scripts/release.mjs <version>   (e.g. 0.2.0)");
const tag = `v${version}`;
const pkg = readPackage();

if (git("rev-parse", "--abbrev-ref", "HEAD") === "main") fail("Run this on a release branch, not main: git switch -c release/" + tag);
try {
  git("fetch", "--tags", "--quiet"); // releases are tagged on GitHub, so local tags may be behind
} catch {
  console.warn("Couldn't fetch tags; checking against local tags only.");
}

if (git("tag", "--list", tag)) fail(`Tag ${tag} already exists.`);
const lastTag = git("tag", "--list", "v*", "--sort=-v:refname").split("\n")[0];
if (lastTag && compareVersions(version, lastTag) <= 0) fail(`${version} isn't newer than the latest tag ${lastTag}.`);
const dirty = git("status", "--porcelain").split("\n").filter(Boolean);
if (dirty.length) fail(`Commit or stash these changes first:\n${dirty.join("\n")}`);

const changelogPath = join(root, "CHANGELOG.md");
const changelog = readFileSync(changelogPath, "utf8");
const m = /^## \[Unreleased\]\s*\n([\s\S]*?)(?=^## \[|(?![\s\S]))/m.exec(changelog);
if (!m || !m[1].trim()) fail('CHANGELOG.md has no notes under "## [Unreleased]". Add what changed first.');

const today = new Date().toISOString().slice(0, 10);
const nextChangelog = changelog.replace(/^## \[Unreleased\]\s*\n/m, `## [Unreleased]\n\n## [${version}] - ${today}\n\n`);

const setVersion = (path) => {
  const p = JSON.parse(readFileSync(path, "utf8"));
  p.version = version;
  return JSON.stringify(p, null, 2) + "\n";
};
const files = {
  "package.json": setVersion(join(root, "package.json")),
  "dashboard/package.json": setVersion(join(root, "dashboard", "package.json")),
  "CHANGELOG.md": nextChangelog,
};

console.log(`${pkg.version} → ${version}\n\nNotes:\n${m[1].trim()}\n`);
if (dry) {
  console.log(`[dry-run] Would update ${Object.keys(files).join(", ")} and commit "Release ${tag}".`);
  process.exit(0);
}
for (const [rel, content] of Object.entries(files)) writeFileSync(join(root, rel), content);
git("add", ...Object.keys(files));
git("commit", "-m", `Release ${tag}`);
console.log(`Committed "Release ${tag}". Push the branch and open a pull request; merging it publishes ${tag}.`);
