# First LLM API integration and streaming

> Examples: `examples/`

## Why it matters
Streaming a model's answer into the UI, with cancel and retry, is the most common task in product-side AI roles (GreatFrontEnd, Oct 2026, `data/market/roles.md`).

## When to stream

| Situation | Stream? | Why |
|---|---|---|
| Chat or long answers | Yes | First words in ~300 ms instead of a blank screen for 5 s |
| Structured JSON you parse at the end | Usually no | You can't use half a JSON object |
| Background jobs | No | Nobody is watching |

## Concept
A streamed response is a list of server-sent events. You already know this shape: it's an array you `setState` into, one chunk at a time. The difference is that the request can fail halfway, so "done", "stopped", and "failed" are three separate UI states.

## Code
`examples/stream.ts` calls the OpenAI SDK through the Respec proxy and prints tokens as they arrive.

```ts
const stream = await client.chat.completions.create({
  model, messages, stream: true,
  stream_options: { include_usage: true },
});
for await (const chunk of stream) process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
```

Run it (proxy running in another terminal): `node --env-file=learner/.env examples/stream.ts`

## Common mistakes
- Calling the API from the browser and shipping your key
- Treating a stopped stream as an error
- Forgetting `include_usage`, so token counts are missing

## Check yourself
1. Where does the API key live in a Next.js app, and why?
2. What are the three end states of a streamed answer?
