# Respec

**Respec your career for the AI era.**

In games, a *respec* resets your character's skill points so you can redistribute them into a new build. Respec helps software developers move into AI-era roles (AI Engineer, AI Product Engineer, Forward-Deployed Engineer…) through hands-on learning, without throwing away what they already know.

No platform to sign up for: Respec is a folder. Open it with your own coding agent (Claude Code, Codex, Cursor…) and the agent becomes your tutor, evaluator, and career guide.

Respec speaks your language: start with `/respec start` and write in Turkish, German, Spanish… and it will answer in kind.

## How it works

1. **Profile** – reads your CV or asks you a few questions, then runs a short placement assessment.
2. **Role discovery** – recommends 2–3 roles that fit you, based on current job-market data (`data/market/roles.md`). Undecided? It gives you a 1–2 week trial module.
3. **Curriculum** – builds a personal curriculum for the role you pick, skipping what you already know.
4. **The loop** – every module goes: lesson → scenario-based quiz → re-teaching of gaps with fresh examples → hands-on assignment → evaluation. The goal is knowing *what to use, where, and when*.
5. **Dashboard** – a local web app with your progress, weak spots, and level (Apprentice → Journeyman → Master). Click a module to read its lesson, review your quiz answers, browse your assignment code, and see how it was evaluated.

## Getting started

```bash
git clone https://github.com/getrespec/getrespec.git respec
cd respec
claude            # or open the folder with Codex / Cursor
```

Then:

```
/respec start
```

Optionally drop your CV into `learner/cv/` first (PDF or Markdown).

| Command | What it does |
|---|---|
| `/respec start` | Builds your profile and runs a placement assessment |
| `/respec role` | Recommends roles that fit you |
| `/respec plan` | Builds a curriculum for your chosen role |
| `/respec next` | Runs the next step (lesson, quiz, review, assignment) |
| `/respec submit` | Evaluates your assignment |
| `/respec dashboard` | Opens the dashboard app in your browser |
| `/respec update-trends` | Refreshes role and job-market data from the web |
| `/respec status` | Where you are and what's next |

In agents without custom slash commands (e.g. Codex), just type `respec start`, `respec next`, and so on.

## Recommended model settings

Lesson and evaluation quality depend on the model, so the repo ships with defaults:

| Agent | File | Model | Effort |
|---|---|---|---|
| Claude Code | `.claude/settings.json` | `opus` (currently Opus 5.5) | `medium` |
| Codex | `.codex/config.toml` | `gpt-6.1-sol` | `medium` |

- These are **defaults**, not requirements. Change them in a session with `/model` and `/effort` (Claude Code) or `/model` (Codex).
- Codex only reads project settings when the folder is **trusted**. Trust it when prompted on first launch.
- In Claude Code the `opus` alias always points to the current Opus. To pin a version, use `"model": "claude-opus-5-5"`.
- Keep personal overrides in `.claude/settings.local.json` (git-ignored) or `~/.codex/config.toml`.

## Dashboard

```bash
node scripts/serve.mjs --open      # http://127.0.0.1:4747
```

A read-only app that follows your progress live. The overview shows your level, next step, curriculum, weak spots, and LLM usage; each module page shows the lesson (with its interactive diagram), quiz history, assignment, your work in `work/`, and the evaluation with evidence linked to your code. The server only listens on your own machine and never serves your CV or `.env`.

The app is prebuilt in `dashboard/dist`. To work on it: `cd dashboard && npm install && npm run dev`.

## LLM usage logging

Assignments that call an LLM run through a small local proxy, so you (and the evaluator) can see what each request really cost in tokens and time:

```bash
node scripts/llm-proxy.mjs                 # keep it running in a separate terminal
node scripts/usage-report.mjs              # per module and per model
```

Point your SDK at the proxy in `learner/.env` (the official SDKs read these automatically):

```
OPENAI_BASE_URL=http://localhost:8787/openai/v1
ANTHROPIC_BASE_URL=http://localhost:8787/anthropic
```

OpenRouter (`/openrouter/api/v1`) and Ollama (`/ollama/v1`) work the same way. The proxy records model, token counts, and latency only; prompts, responses, and API keys are never written to disk. The dashboard shows the totals and each module's usage.

## Privacy

Your CV, progress, assignments, and API keys stay in the `learner/` folder, which is never committed.

## Requirements

- A coding agent (Claude Code, Codex, Cursor, …)
- Node.js 20+ (for the dashboard server and the usage proxy; no `npm install` needed)
- For assignments that call an LLM API: an API key (OpenAI, Anthropic, Google) or a local model (Ollama)

## Contributing

Run the tests with `node --test test/*.test.mjs`. Try the dashboard with sample data: `node scripts/serve.mjs --learner examples/learner-demo`.

Market data lives in `data/market/roles.md` and is refreshed with `/respec update-trends`. Pull requests that add sourced market notes for new countries are welcome.
