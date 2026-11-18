import OpenAI from "openai";
import { z } from "zod";

const client = new OpenAI();
const Refund = z.object({ product: z.string(), reason: z.string(), refundable: z.boolean() });

const email = "Hi, the headphones I bought last week stopped charging. Can I return them?";

async function extract(extra = ""): Promise<z.infer<typeof Refund>> {
  const res = await client.chat.completions.create({
    model: process.env.RESPEC_MODEL ?? "gpt-6-luna",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "Extract product, reason, and refundable (boolean) as JSON." + extra },
      { role: "user", content: email },
    ],
  });
  return Refund.parse(JSON.parse(res.choices[0].message.content ?? "{}"));
}

try {
  console.log(await extract());
} catch (err) {
  // One retry, telling the model what was wrong.
  console.log(await extract(` Your last answer was invalid: ${(err as Error).message}`));
}
