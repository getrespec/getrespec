# update — Update Respec

**Goal:** Bring the learner's copy of Respec up to the latest release without touching their progress.

`learner/` is in `.gitignore`, so pulling a new version never changes the learner's CV, progress, lessons, or work. Repo files they edited themselves are a different matter; check for them first.

1. **Check.** Run `node scripts/check-update.mjs --force --json`.
   - `update_available: false` and `reachable: true`: tell the learner they're on the latest version (`current`) and stop.
   - `reachable: false`: say you couldn't get the latest release (no network, GitHub unreachable, or nothing published yet), and that they can try again later or update by hand with `git pull`. Stop.
2. **Explain what's new.** Summarize `latest.notes` in 3–6 lines in the learner's language: new features first, then fixes. If the notes have a **Migration** section, say plainly what will change in their files and that a backup is made first. Link `latest.url`.
3. **Check how Respec was installed.** Run `git rev-parse --is-inside-work-tree`. If this isn't a git clone (e.g. a downloaded ZIP), explain how to update by hand: download the new release, copy their `learner/` folder into it. Stop.
4. **Check for local changes.** Run `git status --porcelain`. `learner/` and other ignored files won't appear. If repo files are listed, the learner (or an agent) changed them:
   - list them and ask what to do: keep them with `git stash` and re-apply after the update (`git stash pop`), or discard them (`git restore <file>`), or stop.
   - never discard changes without the learner's explicit answer.
5. **Confirm, then update.** Ask "Update from `current` to `latest.version` now?". On yes, run `git pull --ff-only`. If that fails because the branches have diverged, stop and explain; don't merge or rebase on your own.
6. **After the pull.**
   - Run `node scripts/migrate-state.mjs`. It does nothing when the state is already current. Then run `node scripts/check-state.mjs` and fix what it reports.
   - If the dashboard server is running, it must be restarted to serve the new version: stop it and start `node scripts/serve.mjs` again (or ask the learner to).
   - Re-read `AGENTS.md` and the flow files: instructions may have changed.
   - If `state.learner.language` isn't `en` or `tr`, bring `learner/ui-strings.json` up to date: write it if it's missing, or add the keys the new `en` strings have (AGENTS.md → Dashboard interface strings).
   - Run `node scripts/check-update.mjs --force` to confirm the new version.
7. **Record it.** Add a `history` entry ("Respec updated from 0.1.0 to 0.2.0") and tell the learner in one or two sentences what they'll notice first.
