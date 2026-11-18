# Respec dashboard

The read-only web app behind `/respec dashboard`. Learners never build it: the compiled app in `dist/` is committed, and `node scripts/serve.mjs` serves it together with a JSON API over the learner folder.

## Develop

```bash
node scripts/serve.mjs --learner examples/learner-demo   # API on :4747 (from the repo root)
cd dashboard && npm install && npm run dev               # app on :5173, proxies /api and /files
```

Before committing, run `npm run build` and commit `dist/` with your changes.

## Data it reads

| Endpoint | Source |
|---|---|
| `/api/state` | `learner/state.json` (409 if the schema is older than v2) |
| `/api/profile` | `learner/profile.md` |
| `/api/usage` | `learner/usage/usage.jsonl`, summarized by `scripts/lib/usage.mjs` |
| `/api/modules/:id` | file list of `learner/modules/:id/` |
| `/api/file?path=modules/…` | text content of a module file |
| `/files/modules/…` | raw module files (sandboxed), used for `visual.html` |
| `/api/events` | server-sent events when anything in `learner/` changes |

Quiz and evaluation pages render `quiz.json` and `evaluation.json` (format in `AGENTS.md` → Structured files) and fall back to the Markdown files when the JSON is missing.
