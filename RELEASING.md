# Releasing Respec

Every change reaches `main` through a pull request, and `/respec update` pulls `main`. A release is the point where learners are told about the changes: their agent and dashboard announce it, and its notes are what `/respec update` shows. So `main` has to be safe to pull at any time, and releases mark the moments worth announcing.

## Every pull request

- Add a line under `## [Unreleased]` in `CHANGELOG.md`, in the right group (`Added`, `Changed`, `Fixed`, `Removed`, `Migration`). Write it for the learner: what they'll notice, not which file changed. CI fails without an entry; a change nobody would notice (CI, test-only, typo) gets the `skip-changelog` label instead.
- A change to a file format in `learner/` (`state.json`, dossier JSON, quiz files) ships with its migration in the same pull request (`scripts/migrate-state.mjs`) and a `Migration` note. Learners can pull it before it's released.

## Which version

Respec follows [Semantic Versioning](https://semver.org/). While it's 0.x:

| Change | Version | Example |
|---|---|---|
| A fix, wording, or a data refresh (role packs, market data, resources) | patch: 0.1.0 → 0.1.1 | `/respec update-trends` results, a clearer quiz rule |
| A new command, flow, or feature; a change to a `learner/` file format | minor: 0.1.x → 0.2.0 | a new `/respec` command, a new `state.json` field with its migration |
| Formats and commands are stable and promised not to break | 1.0.0 | decided by the maintainer |

When one release mixes both, the bigger one wins.

## When

Open a release pull request when `## [Unreleased]` has something learners would notice and the related pull requests are merged, usually at the end of a working session. A security fix or a fix for something broken is released right away. There's no fixed schedule; learners' agents check for a new release at most once a day.

## How

If the release changes `AGENTS.md` or `flows/`, first run the end-to-end check, which runs `/respec plan` with a real Claude Code agent on the sample learner and checks the state it writes: `node test/e2e/plan.mjs`. It isn't in CI because every run costs model usage, about 3 minutes and $1–2 per scenario, capped at $5 (`RESPEC_E2E_BUDGET`). Write the result in the release pull request.

```bash
git switch main && git pull
git switch -c release/v0.2.0
node scripts/release.mjs 0.2.0 --dry-run   # check the version and notes
node scripts/release.mjs 0.2.0             # sets package.json versions, dates the changelog, commits
git push -u origin release/v0.2.0
gh pr create --title "Release v0.2.0" --body "<the notes>"
```

Merging that pull request publishes the release: `.github/workflows/release.yml` sees an untagged version in `package.json` with its own `CHANGELOG.md` section, runs the tests, tags `v0.2.0` on the merge commit, and creates the GitHub release with that section as its notes. Nothing else needs to be pushed by hand.

If the workflow fails (a test, an empty section), fix it in a new pull request; the release is published when that one is merged. To retry without a change, run the workflow from the Actions tab (`workflow_dispatch`).
