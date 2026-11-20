// What this shows: in a support chat, every request resends the whole conversation, so input tokens grow each turn.
// It's a simulation: no API key, no network. Tokens are estimated as characters / 4.
// Run: node examples/tokens.ts
// Look for: the token count climbing on every line, even though each new question is short.

// One chat message. `role` says who wrote it: "user" (the customer) or "assistant" (the model).
type Message = { role: "user" | "assistant"; content: string };

// Rough token estimate: about 4 characters per token in English.
// A real API reports exact counts in its response (`usage.prompt_tokens` in OpenAI).
const estimateTokens = (messages: Message[]) =>
  Math.ceil(messages.reduce((n, m) => n + m.content.length, 0) / 4);

// Three questions a customer asks the bookstore's support chat, one after another.
const turns = [
  "Where is order #4812?",
  "Can I swap the hardcover for the paperback?",
  "And what's your return policy for damaged books?",
];

// The conversation so far. The API keeps none of this (it's stateless),
// so a real app sends this whole array as `messages` on every request.
const history: Message[] = [];
for (const [i, turn] of turns.entries()) {
  history.push({ role: "user", content: turn });
  // Everything in `history` counts as input for this request.
  console.log(`turn ${i + 1}: ~${estimateTokens(history)} input tokens`);
  // The model's reply becomes part of the history for the next request.
  // Here it's a stand-in of 200 characters (about 50 tokens).
  history.push({ role: "assistant", content: "x".repeat(200) });
}
