# Structured output and schema validation

> Examples: `examples/`

## Why it matters
Turning model output into data your app can trust is how AI features stop being demos. It's also how you enforce the format rule that slipped in m03.

## When to use what

| You need… | Use | Not |
|---|---|---|
| JSON that matches a schema | The provider's structured output mode plus a schema | "Reply in JSON" in the prompt |
| To be sure it's valid | Validate with Zod after parsing; retry once on failure | Trusting the mode blindly |
| Free text for people | Plain text | Structured output (it adds latency and tokens) |

## Concept
You already validate form input with Zod. Model output is user input from a very confident user: parse it, validate it, and decide what happens when it fails.

## Code
`examples/extract.ts` extracts `{ product, reason, refundable }` from a support email and retries once if validation fails.

```ts
const Refund = z.object({ product: z.string(), reason: z.string(), refundable: z.boolean() });
const parsed = Refund.safeParse(JSON.parse(raw));
if (!parsed.success) return retryWith(parsed.error.issues);
```

Run it: `node --env-file=learner/.env examples/extract.ts`

## Common mistakes
- Parsing without validating
- Retrying forever
- Streaming a JSON object you can only use when it's complete

## Check yourself
1. Why validate if the provider promises schema-conforming output?
2. What do you send back on a retry?
