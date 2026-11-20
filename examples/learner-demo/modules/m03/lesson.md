# Prompt and context design

> Examples: `examples/`

<!-- section: scenario -->
## Scenario
The support chat now answers return questions. On Tuesday it tells a customer that signed first editions can be returned within 60 days. Inkwell Books' policy says nothing about signed editions, and it never mentions 60 days. The support lead forwards the screenshot with one line: "Where did it get this?"

The policy is five short paragraphs. How do you make the bot answer only from them, say "I don't know" when they don't cover a question, and keep every answer in the same short format?

<!-- section: role -->
## Where it shows up in the role
In the role map (`m00`) this is "The bot made up a return policy." Postings list it as "prompt engineering" or "context engineering": deciding what the model sees, in what order, and in what format (`data/market/roles.md`, GreatFrontEnd 2026-10).

<!-- section: terms -->
## Terms in this lesson
- **System prompt** – the message with `role: "system"`: your instructions for every conversation. The customer never sees it.
- **User message** – `role: "user"`: what the customer typed.
- **Context** – everything the model sees in one request: system prompt, earlier turns, examples, documents, and the new question.
- **Few-shot examples** – a few question-and-answer pairs you include to show the answer you want. "Few-shot" means "a few examples".
- **Grounding** – making the model answer from text you provide instead of from what it learned in training.
- **Delimiter** – a marker that shows where a block starts and ends, such as `<policy>` … `</policy>`.
- **Hallucination** – an answer that sounds right but isn't supported by any source. The 60-day rule is one.

<!-- section: concept -->
## Concept

### System prompt and user message
**What it is.** Two kinds of message with different jobs: the system prompt holds the rules that don't change; the user message holds this customer's question.

**What problem it solves.** Mixing rules into the customer's text makes them easy to override ("ignore the above") and hard to find when something goes wrong.

**What changes when you change it.** Rules in the system prompt apply to every turn. Put them in a user message and they fade as the conversation grows, because the model weighs recent turns more.

**Bridge.** A component's built-in behaviour versus the props for this render: the system prompt is the component, the user message is this render's props.

**In a real call.** `messages: [{ role: "system", content: rules }, { role: "user", content: question }]`.

### Grounding with delimited source text
**What it is.** You paste the policy into the context, mark it clearly, and tell the model to answer only from it.

**What problem it solves.** Without the policy in front of it, the model fills gaps with what most shops do. That's where the 60 days came from.

**What changes when you change it.** No policy in context: confident, invented rules. Policy in context but unmarked: the model sometimes treats a line of the policy as an instruction, or mixes it up with the question. Policy inside `<policy>` tags with "answer ONLY from the policy": answers stay inside it.

**Bridge.** Like rendering user content inside a container with a clear boundary, so its styles can't leak into the page around it.

**In a real call.** The system prompt ends with `<policy>…</policy>`, and the rules above it refer to "the policy between <policy> tags".

### Few-shot examples
**What it is.** Two or three pairs of question and ideal answer, sent as earlier turns before the real question.

**What problem it solves.** Rules in prose are easy to ignore. "Say I don't know when unsure" often isn't enough; one example of declining works much better.

**What changes when you change it.** Zero examples: format and tone drift. One or two good examples: answers copy their length, format, and behaviour. Careless examples are copied too: if all three end with "Hope this helps!", so will most answers.

**Bridge.** A design system doc versus a shipped `Button` component: people copy the component, not the doc. Models copy the examples.

**In a real call.** `{ role: "user", content: "Can I return a signed first edition?" }, { role: "assistant", content: "I don't know. Please contact help@inkwell.test." }` placed before the customer's question.

<!-- section: back -->
## Back to the scenario
- **Answer only from the policy:** put the policy in the system prompt inside `<policy>` tags, and say "answer ONLY from the policy between <policy> tags".
- **Say "I don't know":** add at least one example where the right answer is to decline. The signed-edition question is a good one, because it's exactly the gap the bot filled.
- **Keep the format:** state the limit ("at most three bullet points") and show it in an example. Instructions alone drift; m04 shows how to check the format in code.

<!-- section: when -->
## When to use what

| Goal | Technique | Avoid |
|---|---|---|
| A consistent answer format | Two or three examples in that format | Describing the format in prose only, or in capital letters |
| Facts the bot must not invent | The source text in context, delimited, plus "answer only from it" | Hoping the model knows your policy |
| Declining when unsure | An example of declining | Only an instruction to decline |
| A role or tone | A short system prompt | A page of rules nobody tests |

<!-- section: code -->
## Code, step by step

### `examples/build-prompt.ts`
**What it shows.** The grounded support prompt put together piece by piece, printed instead of sent. It's a simulation: no key, no network. A real call would pass the same `messages` to `client.chat.completions.create({ model, messages })`.

```ts
const system = `You answer return questions for Inkwell Books using ONLY the policy between <policy> tags.
If the policy doesn't cover the question, reply exactly: "I don't know. Please contact help@inkwell.test."
Answer in at most three bullet points.

<policy>
${policy}
</policy>`;
```
The rules come first, then the policy in its own delimited block. "Reply exactly" gives the model one fixed sentence to use when it declines, which is also easy to test for.

```ts
{ role: "user", content: "Can I return a signed first edition?" },
{ role: "assistant", content: "I don't know. Please contact help@inkwell.test." },
```
A few-shot pair: an earlier "turn" you wrote yourself. It teaches the behaviour the instruction alone didn't produce.

```ts
const messages = [{ role: "system", content: system }, ...examples, { role: "user", content: question }];
```
The order matters: rules and policy, then examples, then the real question last.

**Run:** `node examples/build-prompt.ts`

**Expect** (abbreviated):
```
--- system
You answer return questions for Inkwell Books using ONLY the policy between <policy> tags.
…
--- user
The cover of my book arrived torn. What can you do?

6 messages, ~191 input tokens
```

**Try:**
- Delete the signed-edition pair and count how many tokens you save. That's the price of one example (about 20 tokens) against one invented policy.
- Move the policy above the rules and read the system prompt as if you were the model: which part is an instruction and which is reference text?

<!-- section: mistakes -->
## Common mistakes
- Writing rules in capital letters instead of showing an example
- Pasting the source text without delimiters
- Examples that all share an accident (the same closing line, the same length) the model will copy
- Never testing the prompt with questions the policy doesn't cover

<!-- section: check -->
## Check yourself
1. When do examples work better than instructions?
2. How do you stop the support bot from inventing return rules?
