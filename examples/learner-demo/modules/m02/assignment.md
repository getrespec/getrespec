# Assignment — Streaming chat with stop and retry

## Scenario
Your team's support page needs a chat box that answers from the model, streams the answer, and survives a flaky network.

## Constraints
- Next.js App Router; the API key never reaches the browser
- Streaming with a Stop button (AbortController)
- Errors show a retry action, not a stack trace
- Status changes are announced to screen readers

## Deliverables
- `work/src/route.ts` — the Route Handler
- `work/src/Chat.tsx` — the client component
- `work/README.md` — how to run it, and one paragraph on your choices

## Setup
Start the proxy in another terminal: `node scripts/llm-proxy.mjs`. Your `.env` already points `OPENAI_BASE_URL` at it.

## Rubric
| Item | Weight |
|---|---|
| Key stays on the server | 20 |
| Streaming works; first token shows quickly | 25 |
| Stop and retry behave correctly | 20 |
| Accessible status updates | 15 |
| Reasoning and understanding | 20 |
