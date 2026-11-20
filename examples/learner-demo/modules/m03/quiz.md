# Quiz — m03 (2026-11-11) · 60%

1. **The bookstore bot's answers keep coming back as long paragraphs instead of short bullet lists. Fix?** — *Add "USE BULLET POINTS" in capitals.* ❌ Show two short examples in the target format; examples steer format more reliably than emphasis.
2. **The bot tells a customer signed first editions can be returned within 60 days. The policy doesn't mention them. Fix?** — *Put the policy text in context and tell it to answer only from it.* ✅
3. **Where do you put the five-paragraph returns policy: in the system prompt or in the customer's message?** — *Doesn't matter.* ❌ Keep the rules and the policy in the system prompt, the policy in its own delimited block; order and delimiters change how the model reads it.
4. **What's a sign your system prompt is too long?** — *Rules contradict each other and nobody tests them.* ✅
5. **Context window vs `max_tokens` again: which one caps the length of the bot's answer?** — *max_tokens.* ✅

## Review mini quiz (2026-11-12) · 100%
1. **All three of your examples end with "Happy reading!". What happens?** — *Most answers will end that way too.* ✅
2. **The instruction says "no closing line", the examples have one. Which wins?** — *Usually the examples.* ✅
