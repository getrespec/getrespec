# submit — Assignment evaluation

**Goal:** Evaluate the learner's assignment against the rubric, with evidence, honestly.

## 1. Preparation
The active module's `stage` must be `assignment`. If not, explain the current state. Read `assignment.md` and the contents of `work/`.

## 2. Run it
- Run the code and any tests. Ask before installing dependencies.
- Record the output. If the code doesn't run, that's a finding; don't fix it in order to run it.

## 3. Usage evidence
If the assignment calls an LLM, run `node scripts/usage-report.mjs --module <id>`. Use it as evidence where the rubric is about behavior: did streaming actually happen (time to first token), how errors were handled (failed requests and what followed), whether token use is reasonable for the task, whether caching was used when it should be. If there are no records, ask whether the code ran through the proxy; don't penalize the learner for a setup problem, but note it.

## 4. Scoring
For each rubric item: score, evidence (file and line, test output, usage figures), and a short justification.

## 5. Defense
Ask the learner 1–2 questions: "Why did you choose this approach?", "What would you do if X changed?". Score the "Reasoning and understanding" item based on their answers.

## 6. Report
Write `evaluation.md` in the learner's language: total score, per-item scores, strengths, gaps, next step, and (if any) a short usage summary: requests, tokens, median latency. Append the same evaluation as a new attempt to `evaluation.json` (AGENTS.md → Structured files), with evidence pointing to files and lines in `work/`. Save the total to `score.assignment` and increment `attempts`.

## 7. Outcome
- **70 or above:** complete the module (`flows/next.md` → Completing a module).
- **Below 70:** show the gaps with evidence and write a small remedial task targeting only those gaps to `assignment-remedial-<n>.md`. `stage` stays `assignment`. Add the missing concepts to `weak_points`.
- If you wrote a significant part of the solution at the learner's request, the module closes as `assisted`; tell the learner.

Save the state.
