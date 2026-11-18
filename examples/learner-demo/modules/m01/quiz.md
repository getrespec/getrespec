# Quiz — m01 (2026-11-04) · 80%

1. **Your chat feature gets slower and pricier after ten turns. Why?** — *Every request resends the whole history.* ✅
2. **A product manager wants identical answers for the same question. What do you set, and what do you promise?** — *temperature 0, and promise it'll be identical.* ❌ Providers don't guarantee determinism even at temperature 0; promise "very similar", and cache answers if they must be identical.
3. **Which limit does `max_tokens` set?** — *The output length.* ✅
4. **The model "forgot" the user's name from yesterday. What's your fix?** — *Store it and send it in the system prompt.* ✅
5. **Where does a 120k context window run out first in a support bot?** — *In the conversation history and attached documents.* ✅
