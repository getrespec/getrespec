# First LLM API integration and streaming

> Examples: `examples/`

<!-- section: scenario -->
## Scenario
The bookstore's order page gets a new help box. A customer types "Where is order #4812? It was supposed to arrive on Monday." and the answer should start appearing right away, word by word, the way it does in ChatGPT. The product manager adds two requests: a **Stop** button for when the answer goes off track, and a **Try again** button when the network drops. The security review adds one rule: the API key must never reach the browser.

Where does the model call live, how do you get the answer in pieces instead of all at once, and what should the help box show when it ends early?

<!-- section: role -->
## Where it shows up in the role
This is the first task in the role map (`m00`): "Customers should be able to ask where their order is." Streaming a model's answer into the UI, with stop and retry, is the most common task in product-side AI roles (GreatFrontEnd, 2026-10, `data/market/roles.md`).

<!-- section: terms -->
## Terms in this lesson
- **API key** – the secret that identifies your account to the model provider. Whoever has it can spend your money.
- **Route Handler** – a server-side endpoint in the Next.js App Router (`app/api/chat/route.ts`). Code here runs on the server, so it can use the key.
- **SDK** – the provider's official library (`openai`, `@anthropic-ai/sdk`). It builds the HTTP request for you.
- **Streaming** – receiving the answer in small pieces while the model is still writing it.
- **Chunk** – one of those pieces. In OpenAI's API the new text is in `chunk.choices[0].delta.content`; *delta* means "what changed since the last chunk".
- **`stream: true`** – the request parameter that turns streaming on.
- **`stream_options: { include_usage: true }`** – asks for a final chunk with the token counts (`usage`). Without it, streamed responses don't report them.
- **`ReadableStream`** – the web-standard object for data that arrives over time. Your Route Handler returns one to the browser.
- **`AbortController`** – the browser API for cancelling a `fetch`. Calling `abort()` stops the request.

<!-- section: concept -->
## Concept

### Calling the model from the server
**What it is.** The browser sends the customer's question to your own endpoint; your endpoint calls the model with the key and passes the answer back.

**What problem it solves.** Anything in client-side code is public. A key in the browser can be copied from DevTools in seconds and used to run up your bill.

**What changes when you change it.** Call the provider from the browser and it works in development, then leaks the key in production. Call it from a Route Handler and the browser only ever sees `/api/chat`.

**Bridge.** It's the same pattern you'd use for a payment provider's secret key: the client talks to your backend, your backend talks to the provider.

**In a real call.** `new OpenAI()` in `route.ts` reads `OPENAI_API_KEY` from the server's environment. Never prefix it with `NEXT_PUBLIC_`.

### Streaming
**What it is.** Instead of one response after the model finishes, you get many chunks while it writes.

**What problem it solves.** A full answer can take 3–6 seconds. Without streaming the customer stares at a spinner; with it, the first words appear in about 300 ms.

**What changes when you change it.** `stream: false`: one JSON response with the whole answer and `usage`. `stream: true`: an async list of chunks you read in a loop; `usage` arrives only if you set `include_usage`.

**Bridge.** You already render lists that grow: each chunk is like a new item you `setState` into. Here the item is a few characters of text, appended to what's on screen.

**In a real call.** `stream: true, stream_options: { include_usage: true }`, then `for await (const chunk of stream) { … }`.

### Three ways an answer ends
**What it is.** A streamed answer can end as **done** (the model finished), **stopped** (the customer clicked Stop), or **failed** (network or server error).

**What problem it solves.** If you treat all three the same, Stop shows an error message and a dropped connection looks like a finished answer.

**What changes when you change it.** Done: show the answer. Stopped: keep the partial answer, mark it as stopped, offer "Regenerate". Failed: keep what arrived, show what went wrong, offer "Try again" with the same question.

**Bridge.** It's the loading / success / error trio you already handle for `fetch`, plus one new state that the user chose.

**In a real call.** In the browser, `controller.abort()` throws an `AbortError` from `fetch`: that's *stopped*. In the Route Handler, the `ReadableStream`'s `cancel()` runs when the browser goes away; abort the upstream request there so you stop paying for tokens nobody reads.

<!-- section: back -->
## Back to the scenario
- **Where the call lives:** in a Route Handler (`app/api/chat/route.ts`). The browser posts the question to `/api/chat`; the key stays in the server's environment.
- **Getting the answer in pieces:** set `stream: true`, read the chunks in the Route Handler, and pass each one to the browser through a `ReadableStream`. The help box appends each piece as it arrives.
- **When it ends early:** Stop calls `abort()` and keeps the partial answer as *stopped*; a dropped connection shows *failed* with "Try again", which resends the customer's last question.

<!-- section: when -->
## When to stream

| Situation | Stream? | Why |
|---|---|---|
| A chat answer someone is reading | Yes | First words in ~300 ms instead of a blank box for 5 s |
| Structured JSON you parse at the end (m04) | Usually no | You can't use half a JSON object |
| A nightly job that tags every new book | No | Nobody is watching |

<!-- section: code -->
## Code, step by step

### `examples/stream.ts`
**What it shows.** The help box's request without the UI: the customer's question goes to the model and the answer prints in pieces. It's a real API call, so it needs a key and the proxy.

```ts
const client = new OpenAI();
```
The SDK reads `OPENAI_API_KEY` and `OPENAI_BASE_URL` from the environment. The base URL points at the Respec proxy, which logs tokens and latency for this module.

```ts
messages: [
  { role: "system", content: "You are the support assistant for Inkwell Books. Answer in two short sentences." },
  { role: "user", content: "Where is order #4812? It was supposed to arrive on Monday." },
],
```
`system` is your instruction; the customer never sees it. `user` is what the customer typed. (m03 goes deeper into what belongs in each.)

```ts
stream: true,
stream_options: { include_usage: true },
```
Turn streaming on, and ask for the token counts in the last chunk.

```ts
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
  if (chunk.usage) console.log(`\n\n${chunk.usage.prompt_tokens} → ${chunk.usage.completion_tokens} tokens`);
}
```
Each chunk carries a few new characters in `delta.content`; `?? ""` skips chunks without text. The final chunk has no text but has `usage`.

**Run** (proxy running in another terminal): `node --env-file=learner/.env examples/stream.ts`

**Expect** (wording will differ):
```
I can't see order details from here, but I can help you check: …

52 → 41 tokens
```
The model doesn't know where order #4812 is; it has no access to your order system yet. That's what tool use (m05) fixes.

**Try:**
- Set `stream: false`, read `res.choices[0].message.content`, and notice the pause before anything prints.
- Remove `stream_options` and see the token line disappear.

<!-- section: mistakes -->
## Common mistakes
- Calling the API from the browser and shipping your key
- Treating a stopped answer as an error
- Forgetting `include_usage`, so token counts are missing
- Not aborting the upstream request when the browser disconnects, so you keep paying

<!-- section: check -->
## Check yourself
1. Where does the API key live in a Next.js app, and why?
2. What are the three ways a streamed answer can end, and what does the help box show for each?
