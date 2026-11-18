# How LLMs work: tokens, context, temperature

> Interactive diagram: `visual.html` · Examples: `examples/`

## Why it matters
Every AI Engineer posting assumes you can reason about tokens and context: they decide cost, latency, and what the model can "see". LinkedIn ranks AI Engineer as the fastest-growing US role (Jan 2026, `data/market/roles.md`).

## When to use what

| You want to… | Reach for | Not for |
|---|---|---|
| Give the model more information | A longer prompt, within the context window | Information it must remember next time (the API is stateless) |
| Get the same answer every time | `temperature: 0` plus a fixed prompt | Guaranteed determinism; providers don't promise it |
| Limit cost per request | `max_tokens` on the output | Shrinking the input; that's your job |

## Concept
Think of the context window as a component's props: everything the model knows for this render arrives in one object, and nothing survives to the next render unless you pass it again. Tokens are the unit you pay for, roughly ¾ of an English word.

## Code
`examples/tokens.ts` estimates tokens for a prompt and shows how the conversation history grows with each turn.

```ts
const history: Message[] = [];
for (const turn of turns) {
  history.push({ role: "user", content: turn });
  // every request sends the whole history again
  console.log(`turn ${history.length}: ~${estimateTokens(history)} tokens`);
}
```

Run it: `node examples/tokens.ts`

## Common mistakes
- Assuming the model remembers the previous request
- Confusing the context window (input + output) with `max_tokens` (output only)

## Check yourself
1. Why does a chat get more expensive with every turn?
2. What does `temperature: 0` guarantee, and what doesn't it?
