# Order help box

Run: `npm run dev`, then open /orders/4812.

I kept the model call in a Route Handler so the key stays on the server, and put the "Inkwell Books support" instructions in a system prompt there, so the browser can't change them. The status line uses `aria-live="polite"`, so screen readers hear "Answering…", "Stopped", and "Something went wrong" without the whole answer being read twice.
