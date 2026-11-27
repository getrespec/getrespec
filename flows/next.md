# next — Next step

**Goal:** Run the active module stage by stage: lesson → quiz → review → assignment.

Read `learner/state.json`. If no module is active but a curriculum exists, make the first `locked` module `active`. If there's no curriculum, suggest `/respec plan`.

Based on the active module's `stage`:

## stage: `lesson`
0. Read `state.learner.preferences` and `learner/profile.md`. If `preferences` is missing, run the preference interview from `flows/plan.md` step 2 first (it takes a minute and shapes every lesson).
1. Write `learner/modules/<id>/lesson.md` in the lesson format from AGENTS.md: a scenario from `example_context` first, then where it shows up in the role, terms, each concept explained (what it is, what problem it solves, what changes when you change it), back to the scenario, then a step-by-step walkthrough of every example. Follow `lesson_order`. Put runnable, commented code under `examples/`, set in the same scenario. If the topic is a flow, a process, or the effect of a parameter, produce `visual.html` with an explanation above each interactive part.
   For `m00`, use the "Role map lesson" format in AGENTS.md instead, and search for current postings.
   Verify fast-changing facts against official sources while you write (AGENTS.md → "Checking facts that change"), run the simulation examples, and type-check the rest.
   Then run the "Before presenting a lesson" check from AGENTS.md (terms, language, facts) and fix every gap.
2. If `weak_points` contains a concept related to this module, add a short "reminder" box to the lesson.
3. In chat, give a 5–8 line summary that starts with the scenario's question, show the file paths, and for each example say in one sentence what it demonstrates and what to look for when it runs.
4. Say the learner can ask questions after reading and running the example, or move on to the quiz. When they're ready: `stage = "quiz"`.

## stage: `quiz`
1. Prepare 3–5 questions (AGENTS.md quiz format). Include at least one from `weak_points`.
2. Ask the questions and collect answers. Give brief feedback on each.
3. Write `quiz.md` and append the attempt to `quiz.json` (`kind: "quiz"`; AGENTS.md → Structured files); save the percentage to `score.quiz`. Add missed concepts to `weak_points`; increment `correct_count` for weak points answered correctly and remove those that reach 2.
4. 80% or above: if the module is `theory`, **complete it** (below); otherwise `stage = "assignment"`.
5. Below 80%: `stage = "review"`.

## stage: `review`
1. Re-teach only the missed topics in `review.md`, with an example and analogy **different** from the lesson (use numbered sections for multiple rounds).
2. Run a 2–3 question mini quiz on those topics only. Record it in `quiz.md` and as a `kind: "review"` attempt in `quiz.json`.
3. If they pass, move to the next stage. If gaps remain after two rounds, keep the topics in `weak_points`, move on, and tell the learner.

## stage: `assignment`
1. Write `assignment.md` (AGENTS.md assignment format, including the rubric). If the assignment calls an LLM API, add the **Setup** section from AGENTS.md → LLM usage logging, and check that `learner/.env` has the base URL; add it if missing.
2. Create `work/` with only a README and, if needed, an empty skeleton. No solution.
3. Tell the learner to run `/respec submit` when done.
4. If they ask for help, use a hint ladder: first a conceptual hint, then a directional hint, then partial code as a last resort. Give them a chance at each rung.

## Completing a module
- `status = "completed"` (or `assisted`), `stage = "done"`, `completed_at` = today.
- Make the next `locked` module `active`, `stage = "lesson"`, `started_at` = today.
- Log it in `history`.
- Remind the learner in one sentence what they learned in this module and name the next one.
- If this was the first completed module, or the last of a phase, offer the feedback link (`AGENTS.md` → Feedback).

## Checking for gaps
A curriculum is not set once and left alone. Look for skills it's missing at these moments, and propose changes to the plan (`flows/plan.md` → "Changes later") instead of just answering in chat:
- **A question outside the plan.** Answer it. If the same topic comes up a second time, or it's a requirement in one of the learner's target postings, offer to add it to the curriculum.
- **The end of a phase.** When the last module of a phase is completed, compare `curriculum.coverage` with the current role pack (priorities and depths) and the target postings. Report anything new or anything the learner's results show is missing, in two or three lines.
- **Before the capstone.** List what the capstone needs that no completed module taught, and offer a short module or a reading list for each gap.
- **Repeated weak points.** If a weak point stays in `weak_points` after two quizzes, or an evaluation shows the same gap twice, it may need its own module rather than more review; offer one.

After every stage transition, save the state. The dashboard app updates on its own.
