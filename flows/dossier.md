# dossier — Interview dossier

**Goal:** Turn one passed assignment into a single HTML file the learner can send with a job application: what they built, the decisions behind it with their own code, the honest evaluation, and questions an interviewer can ask. You write only the narrative; `scripts/dossier.mjs` adds every graded fact and renders the page.

## 1. Pick the module
- With `<module-id>`: use it. Without: use the most recently completed module whose `type` isn't `theory`.
- The module needs an attempt with `passed: true` in `modules/<id>/evaluation.json`. If there is none, say so and point to the next step (`/respec submit` for an open assignment, or finishing the remedial task). Theory modules have no assignment and get no dossier.
- If the module's `status` is `assisted`, tell the learner the dossier will open with a visible "Assisted" banner. Don't hide or soften it.

## 2. Read
Read `assignment.md`, the latest passed attempt in `evaluation.json` (rubric, strengths, gaps, defence answers), and the files in `work/`. Never read or quote `learner/.env`, `learner/cv/` or `learner/profile.md` for the dossier.

## 3. Write the narrative
Write `learner/dossier/<id>.json` in `state.learner.language` (the renderer takes the page language from there; labels exist for `en` and `tr`, other languages get English labels):

```json
{
  "schema_version": 1,
  "module": "m02",
  "summary": "Two or three sentences: what was built, for whom, and the one thing worth noticing.",
  "decisions": [
    {
      "title": "Short name of the decision",
      "why": "Why the learner chose it, in terms of the product.",
      "alternatives": "What else would have worked.",
      "tradeoff": "What this choice costs.",
      "ref": { "file": "work/src/route.ts", "from": 3, "to": 14 }
    }
  ],
  "questions": ["The best question to ask first", "..."]
}
```

- **3 to 5 decisions,** each visible in the code. Ground `why` in the code and the learner's defence answers; never invent a reason they didn't give. If the reason isn't known, ask the learner.
- **`ref`** points at the lines that show the decision: `file` relative to the module folder and starting with `work/`, `from`/`to` line numbers, at most 40 lines. The renderer copies the lines itself.
- **8 to 10 questions** (1 to 10 allowed) tied to the decisions and the gaps. The first one is shown in the summary as the best question to ask.
- Don't restate scores, rubric comments, gaps, defence answers or usage: the renderer reads them from `evaluation.json`, so they can't drift from what was graded.
- Write for an interviewer who hasn't seen Respec: plain sentences, no course jargon.

## 4. Check with the learner before rendering
- Scan the narrative for the learner's name, email, phone and anything key-shaped; remove them.
- Show the learner the summary, the decision titles and the exact list of excerpts (`file`, lines). Nothing goes in without their yes. Change what they ask.
- Ask whether to keep the "Made with Respec" link at the bottom (it points to a page that explains the dossier to interviewers; no tracking). If not, render with `--no-footer`.

## 5. Render
Run `node scripts/dossier.mjs <id>` (plus `--no-footer` if asked).
- `dossier: refused: <field>: <reason>`: fix that field and run it again. If the reason is a key-shaped string in code, help the learner remove the key from `work/` (keys belong in `learner/.env`); never repeat the matched value in chat.
- On success, the file is `learner/dossier/<id>.html`. It has no scripts and makes no network requests, so it works as an email attachment and prints to A4.

## 6. Wrap up
- Tell the learner where the file is and suggest opening it once before sending.
- Say plainly that the dossier is self-reported: it shows their agent's evaluation, not a certificate, and the page says so.
- The page shows the code as it is in `work/` now. If they change the code later, they can render again; the evaluation stays the one that was graded.
- Add one `history` entry and save the state.
