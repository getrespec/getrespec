# dashboard — Local dashboard app

The dashboard is a read-only web app that shows the learner's progress and every module's content: lessons, quiz history, assignments, their work, and evaluations. It reads `learner/` directly and updates live while you work.

1. Start the server: `node scripts/serve.mjs` (default http://127.0.0.1:4747; `--port` to change, `--open` to open the browser). It keeps running, so start it as a background process if your tools allow it; otherwise ask the learner to run it in a separate terminal and keep it open.
2. Give the learner the URL. A module's page is at `#/m/<module-id>`.
3. If the server reports that `learner/state.json` uses an older schema, run `node scripts/migrate-state.mjs` and start it again.
4. Give a 3-line summary in chat: level, progress, next step.

The app never writes anything. To change progress, use the other commands.
