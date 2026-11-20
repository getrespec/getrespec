# plan — Personal curriculum

**Goal:** Build a hands-on curriculum for the chosen role that fits how the learner wants to learn, covers what the role and the learner's target postings actually require, skips what they already know, shows them the whole role before the first technical lesson, and ties every module to real job postings.

## 1. Inputs
- `state.target_role` (if missing, run `/respec role` first)
- **The role pack** `data/roles/<role-id>.md`: the role's sourced skill tree with priorities, prerequisites, outcomes, and how to check each skill. If there's no pack for the role, use the "Typical skills" line in `data/market/roles.md` plus a search of current postings, and tell the learner the plan rests on thinner data.
- `data/market/roles.md` → the role's definition, demand, and market notes
- `learner/profile.md` → background, projects, placement, weekly hours, languages
- `state.learner.preferences` (asked in step 3 if missing)
- `data/resources/curricula.md` → resources

If `state.curriculum.modules` already has modules, go to **step 9** instead.

If the role pack's `last_researched` date is more than 90 days old, say so and suggest `/respec update-trends` before or after planning.

## 2. Target postings
Start with this question: **"Are you aiming at specific job postings? If you are, share the links (or paste the text), and I'll make sure the plan covers what they ask for."** Up to 5 postings. If they have none, skip to step 3; they can add postings later.

For each posting:
1. **Read it.** Open the link. If you can't (sign-in walls such as LinkedIn, expired posting), ask the learner to paste the text. Never guess what a posting says.
2. **Save it** to `learner/postings/<id>.md` (`p1`, `p2`…): company, title, location, link, the date you read it, and the full text.
3. **Extract its requirements**: required and nice-to-have, one line each, in the posting's own terms.
4. **Map each requirement** to a skill ID in the role pack. A requirement that matches no skill becomes a new coverage item of its own (step 4), noted as coming from this posting.
5. Record it in `state.learner.target_postings`: `{ "id": "p1", "company": "…", "title": "…", "url": "…", "read_at": "YYYY-MM-DD", "file": "postings/p1.md" }`.

Tell the learner in a few lines what the postings have in common and anything that stands out (a requirement the role pack rates low, an unusual stack, a language requirement).

## 3. Preference interview
The CV says what the learner has done; it doesn't say how they want to learn or what they're aiming for. Ask before planning. Ask in chat, a few questions at a time, and offer choices with a recommended default. Skip a question the profile or the target postings already answer clearly, and say what you assumed.

| Key | Question | Values | Default |
|---|---|---|---|
| `goal` | What do you want from this? | `new-role` (get hired in the new role), `current-job` (build AI features in the current job), `own-product` (add AI to their own product) | `new-role` |
| `scope` | Just enough to get hired, or the whole role in depth? | `job-ready`, `full-role` | `job-ready` |
| `example_context` | Which project or domain should lesson examples come from? Offer 2–3 options: a project from their CV, the domain of their target market or target postings, and "mixed" (you pick the clearest example per topic). | free text in the learner's language | the CV project closest to the role |
| `capstone_context` | And the capstone project? It can differ from the lesson examples. | free text | same as `example_context` |
| `lesson_order` | Scenario and concept first, or running code first? | `scenario-first`, `code-first` | `scenario-first` |
| `llm_access` | How will you call an LLM in assignments? | `anthropic`, `openai`, `openrouter`, `ollama`, `undecided` | `undecided` (ask again before the first assignment that calls an LLM) |

Save the answers to `state.learner.preferences` with `asked_at` set to today. Use the learner's own words for the two free-text values.

## 4. Coverage map
Before choosing modules, map the **whole role**, so the learner can see what's in the plan and what isn't.

1. **Start from the role pack.** One coverage item per skill in its skill tree, with the pack's skill ID and priority.
2. **Add the target postings.** For each skill a posting asks for, add the posting ID. Add a coverage item for each posting requirement that matches no skill in the pack.
3. **Give each item a status:**
   - `known`: placement (or clear evidence in the profile) shows the learner already has it. No module.
   - `covered`: a module teaches it. "Partially knows" skills go into a single accelerated module.
   - `optional`: part of the role but outside the learner's scope.
   With `scope: job-ready`, a skill is `covered` if it's `core` in the pack **or** any target posting asks for it; `important` and `advanced` skills are `optional` otherwise. With `full-role`, every skill that isn't `known` is `covered`. A requirement from a target posting is never silently `optional`: if it's left out, the note says why and the confirmation step asks.
4. Every item gets a one-line `note` in the learner's language: why it's known, which module covers it and how, or why it's optional.

Save it to `state.curriculum.coverage` (shape in `examples/learner-demo/state.json`):
`{ "skill": "…", "id": "B1", "priority": "core", "status": "covered", "modules": ["m05"], "postings": ["p1"], "note": "…" }`. `id` and `priority` come from the role pack (leave them out for items that came only from a posting); `modules` only for `covered`; `postings` only when a target posting asks for it.

## 5. Structure
**m00 is always the role map** (`type: "theory"`, first phase, 1–2 hours): what people in this role actually do, how real postings break down into skills (the learner's target postings first, then the role pack's), and where each module fits. It comes before any technical module. Its lesson format is in AGENTS.md → "Role map lesson (m00)".

**Order modules by the role pack's prerequisites** ("Needs" column) and its "Learning order" section. A module never comes before a skill it depends on.

Then the phases (skip any that aren't needed):
- **Phase 0 – Prerequisites:** only if missing (e.g. Python basics)
- **Phase 1 – Foundations**
- **Phase 2 – Core skills**
- **Phase 3 – Production:** cost, security, observability, deployment
- **Phase 4 – Capstone and job readiness:** capstone project (`type: "capstone"`), portfolio, CV, interview prep. With `goal: current-job` or `own-product`, replace the CV and interview module with a "ship it at work / in your product" module.

Module count after m00: 10–14 for `job-ready`, 14–20 for `full-role`. If the covered skills don't fit, group related skills into one module rather than dropping any; say so if the plan grows past the range. For each module:
- `id` (`m00`, `m01`, …), `title`, `phase`
- `type`: `theory` (no assignment), `practice`, `mixed`, or `capstone`
- `objectives`: 2–4 measurable "can …" statements, taken from the role pack's "Can do" outcomes where they exist
- `skills`: the role pack skill IDs this module covers (e.g. `["B1", "B2"]`)
- `why`: link to job postings (a target posting if one asks for it, otherwise the role pack), short
- `est_hours`: estimated hours
- `resources`: 1–3 links from curricula.md or the role pack's sources (`title`, `url`)
- `status`: first module `active`, the rest `locked`; `stage`: `lesson` for the first module, null for the others

Phase titles, module titles, objectives, `why`, and coverage notes are written in the learner's language.

The capstone should mimic real work that job postings for the target role ask for (the learner's target postings first), set in `capstone_context`.

`curriculum.skipped` is kept only for older states; new plans put known topics in `coverage` instead.

## 6. Confirmation
Show the learner:
- the coverage map as a table: skill | status | module or reason, with target-posting requirements marked;
- the phases and module titles, the total estimated hours, and a rough finish date based on their weekly hours.

Ask whether to move any `optional` skill into the plan (or the reverse). Apply the changes they ask for and update the module count and dates.

## 7. Save
Write to the state, log it in `history`, and suggest `/respec next` to start the role map.

## 8. Changes later
- **Preferences.** If the learner asks to change a preference ("use my own project for examples", "go deeper"), update `state.learner.preferences`. A new `example_context` or `lesson_order` applies from the next lesson that hasn't been written yet. A new `scope` means re-running steps 4–6 for the modules that are still `locked`.
- **A new target posting.** If the learner shares a posting later ("I want to apply to this one"), run step 2 for it, then steps 4–6 for the modules that are still `locked`. Tell them which requirements their plan already covers, which it doesn't, and what you suggest adding.

## 9. Existing curriculum
If a curriculum already exists, ask whether to **refine** it (keep progress) or **rebuild** it (archive and start over).

**Refine:**
1. Ask about target postings (step 2) if `state.learner.target_postings` is missing, and run the preference interview (step 3) if `state.learner.preferences` is missing.
2. Rebuild the coverage map (step 4) from the role pack and the target postings against the current modules. Add a module for any skill the scope requires that no module covers, placed according to the prerequisites; add `skills` to existing modules.
3. If there's no `m00`, insert it at the start of `curriculum.modules`:
   - If the active module is still at `stage: "lesson"`, make `m00` `active` with `stage: "lesson"`, set the old active module back to `locked` (`stage: null`, `started_at: null`), and move its lesson files (`lesson.md`, `visual.html`, `examples/`) to `learner/_archive/<today>/<id>/` so the lesson is rewritten in the current format with the new preferences.
   - Otherwise, insert `m00` as `locked`; it becomes active once the current module is done.
4. Never change completed modules or their scores. A new module can go before the active one only if the active one depends on it; say so and ask.
5. Confirm (step 6), save, and log what changed in `history`.

**Rebuild:** move `learner/modules/` to `learner/_archive/<today>/`, clear `curriculum`, and run steps 2–7.
