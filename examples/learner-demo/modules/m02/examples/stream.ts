// What this shows: a real, streamed answer from the bookstore's support assistant, printed word by word as it arrives.
// It calls a real API (OpenAI SDK) through the Respec proxy, so you need a key in learner/.env.
// Run (proxy running in another terminal): node --env-file=learner/.env examples/stream.ts
// Look for: text appearing in pieces instead of all at once, then a line with the token counts.

import OpenAI from "openai";

// The SDK reads OPENAI_API_KEY and OPENAI_BASE_URL from the environment.
// OPENAI_BASE_URL in learner/.env points at the Respec proxy, so this request is logged.
// This file runs on your machine (a server), never in a browser, so the key stays private.
const client = new OpenAI();
const model = process.env.RESPEC_MODEL ?? "gpt-6-luna";

const stream = await client.chat.completions.create({
  model,
  messages: [
    // role "system": instructions from you, the developer. The customer never sees them.
    { role: "system", content: "You are the support assistant for Inkwell Books. Answer in two short sentences." },
    // role "user": what the customer typed into the chat box.
    { role: "user", content: "Where is order #4812? It was supposed to arrive on Monday." },
  ],
  // stream: true → the answer comes back in small pieces (chunks) as the model writes it.
  stream: true,
  // Without this, streamed responses don't report token counts. The proxy needs them to log usage.
  stream_options: { include_usage: true },
});

// Each chunk holds a few new characters in choices[0].delta.content.
// The last chunk has no text; it carries `usage` (tokens in and out) instead.
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
  if (chunk.usage) console.log(`\n\n${chunk.usage.prompt_tokens} → ${chunk.usage.completion_tokens} tokens`);
}
