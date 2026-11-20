// What this shows: how a grounded support prompt is put together: instructions, examples, and the policy text,
// each in its own place, before anything is sent to a model.
// It's a simulation: no API key, no network. It prints the `messages` array a real request would send.
// Run: node examples/build-prompt.ts
// Look for: where the policy sits (inside <policy> tags), and the example that teaches the bot to say "I don't know".

type Message = { role: "system" | "user" | "assistant"; content: string };

// The source text the bot must answer from. In the real app this comes from a file or a database.
const policy = `§1 Printed books can be returned within 14 days of delivery, unread and in their original condition, with the receipt.
§2 Books that arrive damaged or misprinted are refunded in full, including shipping.
§3 E-books, audiobooks, and gift cards can't be returned.`;

// System prompt: rules that hold for every conversation. The customer never sees them.
// The policy goes in a clearly marked block, so the model can tell rules from reference text.
const system = `You answer return questions for Inkwell Books using ONLY the policy between <policy> tags.
If the policy doesn't cover the question, reply exactly: "I don't know. Please contact help@inkwell.test."
Answer in at most three bullet points.

<policy>
${policy}
</policy>`;

// Few-shot examples: a question and the answer you want, written as earlier turns of the conversation.
// The model copies their format and behaviour more reliably than it follows a rule written in prose.
const examples: Message[] = [
  { role: "user", content: "Can I return a book after 20 days?" },
  { role: "assistant", content: "- No. Printed books can be returned within 14 days of delivery (policy §1)." },
  // This pair teaches declining: the policy says nothing about signed editions.
  { role: "user", content: "Can I return a signed first edition?" },
  { role: "assistant", content: "I don't know. Please contact help@inkwell.test." },
];

const question = "The cover of my book arrived torn. What can you do?";

const messages: Message[] = [{ role: "system", content: system }, ...examples, { role: "user", content: question }];

for (const m of messages) console.log(`--- ${m.role}\n${m.content}\n`);
console.log(`${messages.length} messages, ~${Math.ceil(messages.reduce((n, m) => n + m.content.length, 0) / 4)} input tokens`);
