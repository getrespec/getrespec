# How LLMs work: tokens, context, temperature

> Interactive diagram: `visual.html` · Examples: `examples/`

<!-- section: scenario -->
## Scenario
The bookstore's support chat has been live for a week. Customers ask things like "Where is order #4812?" and "Can I swap the hardcover for the paperback?". Two complaints land on your desk:
- Long conversations get slow, and the API bill grows faster than the number of chats.
- The same question about the return policy gets a slightly different answer each time, and the support lead wants it to say the same thing every time.

Why does a long chat cost more than a short one, and what controls how much an answer varies?

<!-- section: role -->
## Where it shows up in the role
In the role map (`m00`) this sits under "The API bill doubled" and "The bot made up a return policy": you estimate what a feature costs before it ships, and you choose settings that make answers as consistent as the product needs. Every AI Engineer posting assumes you can reason about tokens and context; LinkedIn ranks AI Engineer as the fastest-growing US role (Jan 2026, `data/market/roles.md`).

<!-- section: terms -->
## Terms in this lesson
- **Token** – the unit a model reads and writes: a word, part of a word, or a symbol. Roughly ¾ of an English word. You pay per token.
- **Context window** – the maximum number of tokens one request can hold, counting what you send *and* what the model writes back.
- **`max_tokens`** – a request parameter that caps how many tokens the model may write in its answer.
- **Temperature** – a request parameter (usually 0–2) that controls how adventurous the model is when picking the next token.
- **Stateless** – the API remembers nothing between requests; every request must carry everything the model needs.
- **`messages`** – the list you send in a chat request. Each item has a `role` (`system`, `user`, or `assistant`) and its `content`.

<!-- section: concept -->
## Concept

### Tokens and the context window
**What it is.** The model doesn't see characters or words; it sees tokens. The context window is the size of its desk: everything for this request must fit on it, including room for the answer.

**What problem it solves.** It tells you why long chats get slow and expensive, and why a request can be rejected for being too big.

**What changes when you change it.** You can't change the window (the model sets it), but you control what you put in it. Send 10 turns of history and every request carries all 10; send a summary and it carries one.

**Bridge.** Think of a component's props: everything it knows for this render arrives in one object, and nothing survives to the next render unless you pass it again.

**In a real call.** You don't set the window. You see its effect in the response's usage numbers (`usage.prompt_tokens` in OpenAI) and in an error when you exceed it.

### `max_tokens`
**What it is.** A ceiling on the answer's length, in tokens.

**What problem it solves.** It stops a runaway answer from costing too much or taking too long.

**What changes when you change it.** Set it to 50 and a long answer stops mid-sentence; the response tells you why (`finish_reason: "length"` in OpenAI, `stop_reason: "max_tokens"` in Anthropic). Set it to 1,000 and the same answer finishes normally (`"stop"` / `"end_turn"`).

**In a real call.** `max_tokens: 500` (OpenAI's newer APIs call it `max_completion_tokens` / `max_output_tokens`).

### Temperature
**What it is.** At each step the model scores every possible next token and turns the scores into chances. Temperature decides how strictly it follows those chances.

**What problem it solves.** It lets you choose between consistency (extraction, classification) and variety (brainstorming, copy).

**What changes when you change it.** Range 0–2, default usually 1.
- `0`: the most likely token wins almost every time. Ask the same question twice and you get nearly the same answer.
- `1`: the chances are used as they are. Answers vary in wording.
- `1.5`+: unlikely tokens get picked more often. More surprising, sometimes off-topic.

Even at `0`, providers don't promise identical answers. If a product needs exactly the same text every time, store the answer.

**Bridge.** Think of an autocomplete list sorted by score. At 0 you always take the top suggestion; turn it up and you sometimes take the third or fourth one instead.

**In a real call.** `temperature: 0.2`.

<!-- section: back -->
## Back to the scenario
- **Why long chats cost more:** the API is stateless, so every turn resends the whole history and the input tokens grow with each message (`examples/tokens.ts` shows the numbers). Send only the last few turns or a short summary, and cap the reply with `max_tokens`.
- **The return-policy answer:** put the policy text in the prompt and use a low temperature (`0`–`0.2`). If it must be word for word the same, store the approved answer and show that instead of calling the model.

<!-- section: when -->
## When to use what

| You want to… | Reach for | Not for |
|---|---|---|
| Give the model more information | A longer prompt, within the context window | Information it must remember next time (the API is stateless) |
| Get the same answer every time | `temperature: 0` and a fixed prompt, plus storing the answer | Guaranteed determinism from the model alone |
| Limit cost per request | `max_tokens` on the output | Shrinking the input; that's your job |

<!-- section: code -->
## Code, step by step

### `examples/tokens.ts`
**What it shows.** The three questions from the scenario, asked one after another in the support chat. Each question is short, but the input grows with every turn, because the whole conversation is sent again each time. It's a simulation: no API key needed, tokens are estimated as characters ÷ 4.

```ts
const estimateTokens = (messages: Message[]) =>
  Math.ceil(messages.reduce((n, m) => n + m.content.length, 0) / 4);
```
A rough estimate (≈4 characters per token in English). Real counts come from the API's `usage` field.

```ts
const turns = [
  "Where is order #4812?",
  "Can I swap the hardcover for the paperback?",
  "And what's your return policy for damaged books?",
];
```
The customer's three questions. None is longer than 50 characters (about 12 tokens).

```ts
history.push({ role: "user", content: turn });
console.log(`turn ${i + 1}: ~${estimateTokens(history)} input tokens`);
history.push({ role: "assistant", content: "x".repeat(200) });
```
Each turn adds the customer's message (`role: "user"`) and the model's reply (`role: "assistant"`, here a 200-character stand-in) to `history`. Because the API is stateless, a real app sends this whole array as `messages` on every request, so the count only grows.

**The real call it stands for:**
```ts
await client.chat.completions.create({ model, messages: history, max_tokens: 300, temperature: 0.2 });
```

**Run:** `node examples/tokens.ts`
**Expect:**
```
turn 1: ~6 input tokens
turn 2: ~66 input tokens
turn 3: ~128 input tokens
```
The third question is about 12 tokens, yet the request carries about 128: the rest is the conversation so far.

**Try:**
- Change `200` to `400` (longer replies) and watch the third turn jump to about 228.
- Keep only the last two messages before logging (`history.slice(-2)`) and see the count stop growing. That's the "send only the last few turns" fix from "Back to the scenario".

<!-- section: mistakes -->
## Common mistakes
- Assuming the model remembers the previous request
- Confusing the context window (input + output) with `max_tokens` (output only)
- Treating `temperature: 0` as a guarantee of identical answers

<!-- section: check -->
## Check yourself
1. Why does a chat get more expensive with every turn?
2. What does `temperature: 0` guarantee, and what doesn't it?
