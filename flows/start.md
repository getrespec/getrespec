# start — Profile and placement

**Goal:** Get to know the learner, measure what they already know, and prepare for role discovery.

Speak in the learner's language (see AGENTS.md → Language).

## 0. Existing state
If `learner/state.json` exists, ask whether to continue where they left off or start over. If starting over, move the current contents of `learner/` (except `cv/`) to `learner/_archive/<YYYY-MM-DD>/`.

## 1. Language guide
As soon as you know the learner's language, check for `data/language/<language>.md`. If it's missing, create it from `data/language/_template.md` as AGENTS.md → "Writing in the learner's language" describes, and mention in one sentence that it's a draft that will improve when the learner points out awkward wording. If the language isn't `en` or `tr`, also write `learner/ui-strings.json` (AGENTS.md → Dashboard interface strings).

## 2. CV
- If `learner/cv/` contains a file, read it. For PDFs, try your own reading ability first; fall back to `pdftotext` if available.
- If there's no file, offer two options: drop a CV into `learner/cv/`, or answer a few questions.

## 3. Questions
Ask only what the CV doesn't answer. At most 4 questions per message; use a second round if needed.
- Current or most recent role, years of experience, main technologies
- The kind of work they enjoy most: interfaces, backend/systems, data, working with customers, leading a team
- What they've done with AI so far: only as a user, integrated an API, or nothing yet
- Hours per week they can spend
- Target market: their own country, remote abroad, or both? English level and openness to English-heavy roles
- Do they know Python?
- Do they have an LLM API key (OpenAI, Anthropic, Google), or can they run a local model (Ollama)?

## 4. Profile
Write `learner/profile.md` in the learner's language with these sections (translate the headings):

```markdown
# Profile
## Summary            (2–3 sentences)
## Experience         (role, years, technologies)
## Preferences        (kind of work, target market, English, weekly hours, form of address)
## AI experience
## Tools              (languages, API key availability — never the key itself)
## Placement          (filled in step 5)
```

If the learner shares an API key, write it only to `learner/.env`, together with the proxy base URL for that provider (see AGENTS.md → LLM usage logging), e.g. `OPENAI_API_KEY=…` and `OPENAI_BASE_URL=http://localhost:8787/openai/v1`. If they'll use Ollama, add `OPENAI_BASE_URL=http://localhost:8787/ollama/v1`.

## 5. Placement assessment (10–15 minutes)
Six questions tailored to the learner's background, asked one at a time:
- 3 concept/scenario questions: LLM basics (tokens, context, temperature), choosing between RAG, fine-tuning, and long context, tool use
- 2 code-reading questions: show a short snippet; what does it do, where will it break?
- 1 design question: "How would you build this feature?" (a verbal answer is fine)

Then write three lists into the profile's placement section: **knows**, **partially knows**, **doesn't know**. Summarize the result honestly in 4–5 lines.

## 6. State
Create `learner/state.json` in the format of `examples/learner-demo/state.json`: `schema_version: 2`, `learner` (including `language`) and `placement` filled in; `target_role` null; `curriculum.modules` empty; a "profile created" entry in `history`.

## 7. Wrap up
Suggest `/respec role` as the next step, and mention that `/respec dashboard` opens a page that follows their progress.
