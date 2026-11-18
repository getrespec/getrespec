import OpenAI from "openai";

// OPENAI_BASE_URL in learner/.env points at the Respec proxy, so usage is logged.
const client = new OpenAI();
const model = process.env.RESPEC_MODEL ?? "gpt-6-luna";

const stream = await client.chat.completions.create({
  model,
  messages: [{ role: "user", content: "Explain server-sent events in two sentences." }],
  stream: true,
  stream_options: { include_usage: true },
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
  if (chunk.usage) console.log(`\n\n${chunk.usage.prompt_tokens} → ${chunk.usage.completion_tokens} tokens`);
}
