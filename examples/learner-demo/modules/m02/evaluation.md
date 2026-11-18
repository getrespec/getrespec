# Evaluation — m02 · 86/100 · passed

| Item | Score |
|---|---|
| Key stays on the server | 20/20 |
| Streaming works; first token shows quickly | 23/25 |
| Stop and retry behave correctly | 14/20 |
| Accessible status updates | 13/15 |
| Reasoning and understanding | 16/20 |

**Strengths:** clean server/client split; `cancel()` aborts the upstream call; status line is announced politely.

**Gaps:** "Try again" sends the literal string "retry" instead of the last question (`work/src/Chat.tsx:40`); the answer region isn't labelled.

**Usage:** 18 requests, median latency 1.4 s, first token at 0.35 s.

**Next:** keep the last question in state and reuse it on retry.
