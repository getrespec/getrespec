# Assignment — A grounded return assistant

## Scenario
Inkwell Books' support lead wants the chat to answer return questions only from the policy in `work/policy.md`, and to say "I don't know. Please contact help@inkwell.test." when the policy doesn't cover a question. This is the "The bot made up a return policy" task from the role map (`m00`).

## Constraints
- Answers come only from `work/policy.md`
- Out-of-policy questions get exactly the declining sentence above
- At most three bullet points per answer

## Deliverables
- `work/prompt.md` — the system prompt and any examples
- `work/cases.md` — 10 test questions with the expected answer and what the bot actually said; at least four of them must be questions the policy doesn't cover

## Setup
Start the proxy in another terminal: `node scripts/llm-proxy.mjs`, and run your test script with `node --env-file=learner/.env …`.

## Rubric
| Item | Weight |
|---|---|
| Answers only from the policy | 35 |
| Says "I don't know" when it should | 25 |
| Consistent format | 20 |
| Reasoning and understanding | 20 |
