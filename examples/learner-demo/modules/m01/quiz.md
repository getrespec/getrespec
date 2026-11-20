# Quiz — m01 (2026-11-04) · 80%

1. **The bookstore's support chat gets slower and pricier after ten questions. Why?** — *Every request resends the whole history.* ✅
2. **The support lead wants the return-policy answer to be the same every time. What do you set, and what do you promise?** — *temperature 0, and promise it'll be identical.* ❌ Providers don't guarantee identical answers even at temperature 0. Promise "very similar", and store the approved answer if it must be word for word the same.
3. **Which limit does `max_tokens` set?** — *The output length.* ✅
4. **A returning customer says "my name is still Elif, right?" and the bot doesn't know. What's your fix?** — *Store it and send it in the system prompt.* ✅
5. **Where does a 120k context window run out first in the support chat?** — *In the conversation history and attached documents like the full policy.* ✅
