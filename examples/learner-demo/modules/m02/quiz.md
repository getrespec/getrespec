# Quiz — m02 (2026-11-06) · 100%

1. **The order help box needs the model. Where does the API key live in the Next.js app?** — *In a Route Handler on the server, read from env.* ✅
2. **The customer clicks Stop halfway through an answer. What does the help box show?** — *The partial answer, marked as stopped, with a regenerate button.* ✅
3. **The nightly job that extracts order details from support emails as JSON: should it stream?** — *No, I need the whole object before I can validate it.* ✅
4. **The order-status answer and the new "suggest a gift message" button share one endpoint. What temperature does each get, and can you promise the status answer is identical every time?** *(weak spot from m01)* — *Low for the status answer, higher for gift ideas. Consistent, not identical; store it if it must be identical.* ✅
