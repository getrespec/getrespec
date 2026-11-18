# Prompt and context design

## Why it matters
Postings list this as "prompt engineering" or "context engineering": deciding what the model sees, in what order, and in what format (`data/market/roles.md`).

## When to use what

| Goal | Technique | Avoid |
|---|---|---|
| A consistent output format | Two or three examples (few-shot) | Describing the format in prose only |
| Facts the model must not invent | Put the source text in context and say "answer only from it" | Hoping the model knows |
| A role or tone | A short system prompt | A page of rules nobody tests |

## Concept
A prompt is a component API. The system prompt is the contract, examples are the stories in Storybook, and the user message is the props for this render.

## Check yourself
1. When do examples beat instructions?
2. How do you stop a support bot from inventing refund rules?
