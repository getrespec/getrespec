# Assignment — Order help box with streaming, stop, and retry

## Scenario
Inkwell Books' order page (`/orders/[id]`) gets a help box. A customer asks a question about their order, the answer streams in word by word, and the box survives a flaky network. This is the first task from the role map (`m00`).

## Constraints
- Next.js App Router; the API key never reaches the browser
- A system prompt that says who the assistant is (Inkwell Books support) and keeps answers short
- Streaming with a Stop button (`AbortController`)
- Errors show a "Try again" action that resends the customer's last question, not a stack trace
- Status changes ("Answering…", "Stopped", "Something went wrong") are announced to screen readers

## Deliverables
- `work/src/route.ts` — the Route Handler (`/api/chat`)
- `work/src/Chat.tsx` — the help box component
- `work/README.md` — how to run it, and one paragraph on your choices

## Setup
Start the proxy in another terminal: `node scripts/llm-proxy.mjs`. Your `learner/.env` already points `OPENAI_BASE_URL` at it, so every request is logged for the evaluation.

## Success criteria
- Asking "Where is order #4812?" shows the first words in under a second
- Stop keeps the partial answer and marks it as stopped
- With the network turned off in DevTools, "Try again" resends the same question once it's back

## Rubric
| Item | Weight |
|---|---|
| Key stays on the server | 20 |
| Streaming works; first token shows quickly | 25 |
| Stop and retry behave correctly | 20 |
| Accessible status updates | 15 |
| Reasoning and understanding | 20 |
