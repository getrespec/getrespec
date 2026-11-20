# Changelog

What changed in each Respec release. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/): a new minor version adds features, a patch fixes things. While Respec is 0.x, a minor version may also change file formats; those releases say so under **Migration**.

To update an existing copy, run `/respec update` in your agent. Your `learner/` folder is never touched by an update.

## [Unreleased]

The first public release.

### Added
- `/respec start`: profile from your CV or a few questions, plus a short placement assessment.
- `/respec role`: 2–3 recommended AI-era roles based on sourced job-market data (`data/market/roles.md`).
- `/respec plan`: a preference interview (goal, scope, the project or domain lesson examples come from), a skill map of the whole role, and a personal curriculum that starts with a role map (`m00`).
- `/respec next` and `/respec submit`: lesson → quiz → review → assignment → evaluation, with spaced repetition of weak points.
- Lessons that open with a real scenario from your chosen context, explain every term before using it, and walk through runnable examples line by line.
- Writing guides per language (`data/language/`) so lessons read like they were written in your language, not translated.
- A local, read-only dashboard (`/respec dashboard`): progress, skill map, lessons with a table of contents, quiz history, assignments, your code, and evaluations.
- A local LLM proxy that logs tokens and latency (never prompts or keys) as evidence for evaluations.
- Version info and update checks: `/respec update`, and a notice in the dashboard when a new release is out.
- Documentation in English and Turkish (`README.md`, `README.tr.md`).
- Licensed under the Functional Source License 1.1, Apache 2.0 Future License (`LICENSE.md`).
- Role packs (`data/roles/`): a sourced skill tree per role with priorities, prerequisites, outcomes, and how to check each skill. The first pack, AI Product Engineer, is based on 9 current postings.
- `/respec plan` asks for the job postings you're targeting, reads them, and makes sure the plan covers what they ask for.
- Lessons verify fast-changing facts (SDK details, model names, standard versions) against official sources and say when they did.
- The curriculum is checked for gaps at the end of each phase, before the capstone, and when the same question comes up twice.
