// What this shows: turning a customer's email into a support ticket your app can trust:
// the model returns JSON, Zod checks it against a schema, and one retry fixes an invalid answer.
// It calls a real API (OpenAI SDK) through the Respec proxy, so you need a key in learner/.env.
// Run (proxy running in another terminal): node --env-file=learner/.env examples/extract.ts
// Look for: a ticket object printed with the four fields, or a retry line followed by a valid ticket.

import OpenAI from "openai";
import { z } from "zod";

const client = new OpenAI();

// The schema: the shape every ticket must have. Zod checks real data against it at runtime.
// `issue` is an enum, so the support dashboard can route tickets by a fixed set of values.
const Ticket = z.object({
  order_id: z.string().nullable(), // null when the customer didn't mention an order number
  book_title: z.string().nullable(),
  issue: z.enum(["damaged", "late", "wrong_item", "return", "other"]),
  wants_refund: z.boolean(),
});

const email = "Hi, order #4812 finally came but The Left Hand of Darkness has a torn cover. Can I get my money back?";

async function extract(feedback = ""): Promise<z.infer<typeof Ticket>> {
  const res = await client.chat.completions.create({
    model: process.env.RESPEC_MODEL ?? "gpt-6-luna",
    // JSON mode: the model must reply with valid JSON (but not necessarily *your* shape; Zod checks that).
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Turn the customer email between <email> tags into a support ticket. Reply with JSON only: " +
          '{"order_id": string or null, "book_title": string or null, ' +
          '"issue": "damaged" | "late" | "wrong_item" | "return" | "other", "wants_refund": boolean}.' +
          feedback,
      },
      // The email is data, not instructions, so it goes in its own delimited block (m03).
      { role: "user", content: `<email>\n${email}\n</email>` },
    ],
  });
  // JSON.parse turns the text into an object; Ticket.parse throws if the shape is wrong.
  return Ticket.parse(JSON.parse(res.choices[0].message.content ?? "{}"));
}

try {
  console.log(await extract());
} catch (err) {
  // One retry, telling the model exactly what was wrong. Never retry in a loop.
  console.log("retrying:", (err as Error).message.slice(0, 120));
  console.log(await extract(` Your last answer was invalid: ${(err as Error).message}`));
}
