# Changelog

What changed in each Respec release. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/): a new minor version adds features, a patch fixes things. While Respec is 0.x, a minor version may also change file formats; those releases say so under **Migration**.

To update an existing copy, run `/respec update` in your agent. Your `learner/` folder is never touched by an update.

## [Unreleased]

### Added
- `scripts/check-state.mjs` checks `learner/state.json` after every change the agent makes: statuses and stages, one active module, dates, catalog skill IDs, coverage that points to real modules, and modules ordered after the skills they need. The agent fixes errors before going on, so a slip in the state is caught before it breaks the dashboard or loses progress.

### Changed
- Sample learner: locked modules reordered to follow the skill catalog's prerequisites (evals before agents, RAG design before vector search, observability before cost).

## [0.3.0] - 2026-11-26

### Added
- A shared skill catalog, `data/skills.md`: each skill is defined once (outcomes, prerequisites, how to check it) with a stable ID such as `agent.tool-use`. Different job titles mostly ask for the same skills, so progress will carry over between roles. All six role packs now point to it, with their own priority, posting counts and depth (`basic`, `working`, `deep`) per skill. `/respec plan` records skills by catalog ID, counts what you already learned for an earlier role as known, and tells you how much of neighbouring roles your plan covers; `/respec role` uses the same overlap when you change role.

### Changed
- AI Product Engineer role pack: all nine postings re-read in full and every count checked again. RAG shows up in 3 of 9 postings (was 2), deploying and running in production in all 9, evals in 6; a new "Re-check" table shows which posting asks for what.

### Migration
- `learner/state.json` moves to schema v3: skills in your coverage map and modules are recorded by catalog ID (`agent.tool-use`) instead of the role pack's own IDs (`B1`). `/respec update` runs `node scripts/migrate-state.mjs` for you; it keeps a backup (`learner/state.v2.backup.json`), changes no module, status or score, and copies a coverage item when its old skill was split into several catalog skills. Copies carry the skill's English name until the next `/respec plan`.

## [0.2.0] - 2026-11-25

### Added
- The dashboard's menus, buttons, and labels now appear in your language, not only in English and Turkish: your agent writes them to `learner/ui-strings.json` when you start, and `/respec update` keeps them current. Dates and numbers follow your language too.

## [0.1.0] - 2026-11-25

The first public release.

### Added
- `/respec start`: profile from your CV or a few questions, plus a short placement assessment.
- `/respec role`: 2–3 recommended AI-era roles based on sourced job-market data (`data/market/roles.md`).
- `/respec plan`: a preference interview (goal, scope, the project or domain lesson examples come from), a skill map of the whole role, and a personal curriculum that starts with a role map (`m00`).
- `/respec next` and `/respec submit`: lesson → quiz → review → assignment → evaluation, with spaced repetition of weak points.
- `/respec dossier`: turns a passed assignment into an interview dossier (HTML, plus a PDF printed with your Chrome or Edge). The first page explains it in plain words for recruiters; the technical part has your decisions, evaluation and code excerpts. Offered after each passed assignment.
- Lessons that open with a real scenario from your chosen context, explain every term before using it, and walk through runnable examples line by line.
- Writing guides per language (`data/language/`) so lessons read like they were written in your language, not translated.
- A local, read-only dashboard (`/respec dashboard`): progress, skill map, lessons with a table of contents, quiz history, assignments, your code, and evaluations.
- A local LLM proxy that logs tokens and latency (never prompts or keys) as evidence for evaluations.
- Version info and update checks: `/respec update`, and a notice in the dashboard when a new release is out.
- Documentation in English and Turkish (`README.md`, `README.tr.md`).
- Licensed under the Functional Source License 1.1, Apache 2.0 Future License (`LICENSE.md`).
- Role packs (`data/roles/`): a sourced skill tree per role with priorities, prerequisites, outcomes, and how to check each skill, built from current job postings. Six roles: AI Product Engineer, AI Engineer, Forward-Deployed Engineer, AI-fluent developer, ML Engineer, and AI Security Engineer.
- `/respec update-trends` refreshes market data and role packs from primary sources, checks the providers' docs for new and deprecated features, and tells you which of your lessons may be out of date.
- Lessons follow the official docs of the model providers (Anthropic, OpenAI, Google, Ollama) and leave out theory you won't meet when building on their APIs.
- Quiz and review questions are asked plainly, one thing per question, and the role-map quiz (`m00`) grades only what its lesson covers.
- A release process for maintainers (`RELEASING.md`): every pull request adds a changelog entry, and merging a release pull request publishes the GitHub release.
- `/respec plan` asks for the job postings you're targeting, reads them, and makes sure the plan covers what they ask for.
- Lessons verify fast-changing facts (SDK details, model names, standard versions) against official sources and say when they did.
- The curriculum is checked for gaps at the end of each phase, before the capstone, and when the same question comes up twice.
- The README explains that local progress is a learning record, not a certificate, and how certification will work.
