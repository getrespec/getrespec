# Review — m03

## 1. Few-shot examples shape the format more than instructions do
Think of a design system: you can write "buttons have 8px radius" in a doc, or ship a Button. People copy the Button. Models copy examples the same way. If two of your three examples end with a summary line, most answers will too, even if your instruction says "no summary".

**Try it:** run the same request with zero, one, and three examples and compare the output length.
