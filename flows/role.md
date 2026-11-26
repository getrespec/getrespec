# role — Role discovery

**Goal:** Recommend 2–3 roles based on the learner's profile and current job-market data, and help them choose.

## 1. Inputs
- `learner/profile.md` (if missing, suggest `/respec start` first)
- `data/market/roles.md`. If `last_updated` is older than 60 days, suggest `/respec update-trends` first; if the learner declines, continue with the existing data but say so.

## 2. Assessment
For each role in roles.md, consider:
- **Transferable skills:** what in their experience applies directly
- **Skills already learned in Respec** (when changing role): the role packs share catalog skills (`data/skills.md`), so count how many of each role's `core` skills the learner already has (`known` coverage items or completed modules). Say it as "you already have 9 of its 14 core skills"; never add up posting counts from different packs.
- **Missing skills:** compare with the "doesn't know" list from placement
- **Demand:** based on their target market (use the "Market notes" section for their country when available)
- **Constraints:** English load, need for Python, customer-facing work, weekly hours
- **Enjoyment:** overlap with the kind of work they enjoy most

## 3. Recommendation
Give a table in chat: role | why it fits you | why it might not | rough transition time (as a range, based on weekly hours) | demand signal (with source and date).

- Always include **"AI-fluent version of your current role"** (`ai-fluent-developer`); for most learners it's the shortest path.
- Highlight one role and say why, but leave the decision to the learner.
- Say that the time estimates are rough.

## 4. Undecided: trial module
If the learner is torn between two roles, offer a 1–2 week trial module. Example (for deciding between the interface layer and the model layer):
1. Build a streaming chat UI with a stop button, retry, and keyboard and screen-reader checks
2. Add one tool; show its calls and results in the UI
3. Write 20–50 eval cases before tuning the prompt; run each more than once
4. Log latency and token usage per request
5. Try prompt injection and HTML in the output

Afterwards ask: Did debugging non-deterministic output interest you or wear you out? Did you enjoy the interface layer or the model layer more? Would you spend days writing evals?

Add the trial to the state: `{ "id": "trial", "title": "<'Trial module' in the learner's language>" }` in `curriculum.phases`, and a single `active` module with `phase: "trial"` in `curriculum.modules`. It runs through `/respec next`. Keep this phase and module when the real curriculum is built.

## 5. Choice
- Write the roles.md `id`, role title, date, and the learner's own reason (in their words) to `state.target_role`.
- Log it in `history` and suggest `/respec plan`.
