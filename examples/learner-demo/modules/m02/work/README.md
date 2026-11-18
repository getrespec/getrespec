# Streaming chat

Run: `npm run dev`, then open /support.

I kept the stream in a Route Handler so the key stays on the server, and used `aria-live="polite"` for the status line so screen readers hear "Answering…", "Stopped", and "Something went wrong" without the whole answer being read twice.
