# plan — Personal curriculum

**Goal:** Build a hands-on curriculum for the chosen role that skips what the learner already knows and ties every module to real job postings.

## 1. Inputs
- `state.target_role` (if missing, run `/respec role` first)
- `data/market/roles.md` → the target role's skills and transition map
- `learner/profile.md` → placement, weekly hours, languages
- `data/resources/curricula.md` → skeleton for topic order and resources

## 2. Structure
Phases (skip any that aren't needed):
- **Phase 0 – Prerequisites:** only if missing (e.g. Python basics)
- **Phase 1 – Foundations**
- **Phase 2 – Core skills**
- **Phase 3 – Production:** cost, security, observability, deployment
- **Phase 4 – Capstone and job readiness:** capstone project (`type: "capstone"`), portfolio, CV, interview prep

12–20 modules in total. For each module:
- `id` (`m01`, `m02`, …), `title`, `phase`
- `type`: `theory` (no assignment), `practice`, `mixed`, or `capstone`
- `objectives`: 2–4 measurable "can …" statements
- `why`: link to job postings (from roles.md, short)
- `est_hours`: estimated hours
- `resources`: 1–3 links from curricula.md (`title`, `url`)
- `status`: first module `active`, the rest `locked`; `stage`: `lesson` for the first module, null for the others

Don't create modules for topics the placement marked as "knows"; list them in `curriculum.skipped` with a reason. Merge "partially knows" topics into a single accelerated module.

Phase titles, module titles, objectives, and `why` are written in the learner's language.

The capstone should mimic real work that job postings for the target role ask for (e.g. for an Applied AI Engineer: a small deployed product with RAG, tool use, and evals).

## 3. Confirmation
Show the learner the phases and module titles, the total estimated hours, and a rough finish date based on their weekly hours. Apply any changes they ask for.

## 4. Save
Write to the state, log it in `history`, and suggest `/respec next` to start the first lesson.
