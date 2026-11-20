---
description: Respec — your AI-era career tutor (start, role, plan, next, submit, dashboard, update-trends, update, status, help)
argument-hint: "[start|role|plan|next|submit|dashboard|update-trends|update|status|help] [note]"
---
The learner ran `/respec $ARGUMENTS`.

Take the first word of the arguments as the command and treat the rest as a note from the learner. Then read and follow the matching flow file:

- `start` → `flows/start.md`
- `role` → `flows/role.md`
- `plan` → `flows/plan.md`
- `next` → `flows/next.md`
- `submit` → `flows/submit.md`
- `dashboard` → `flows/dashboard.md` (opens the local dashboard app)
- `update-trends` → `flows/update-trends.md`
- `update` → `flows/update.md` (updates Respec itself to the latest release)
- `status` → give the status summary described in AGENTS.md → At session start
- `help`, or no command → list the commands with one line each, then suggest the most useful next one based on `learner/state.json`

If the first word isn't a known command, infer what the learner wants from `learner/state.json` and their words, and pick the closest flow.

Reply in the language of the learner's messages (AGENTS.md → Language).
