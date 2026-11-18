type Message = { role: "user" | "assistant"; content: string };

// Rough estimate: ~4 characters per token for English text.
const estimateTokens = (messages: Message[]) =>
  Math.ceil(messages.reduce((n, m) => n + m.content.length, 0) / 4);

const turns = [
  "Summarize this article about streaming UIs.",
  "Now make it shorter.",
  "Translate the short version to Turkish.",
];

const history: Message[] = [];
for (const turn of turns) {
  history.push({ role: "user", content: turn });
  // Every request sends the whole history again: the API is stateless.
  console.log(`turn ${history.length}: ~${estimateTokens(history)} input tokens`);
  history.push({ role: "assistant", content: "(model reply of about 200 characters) ".repeat(5) });
}
