# Review — m03

## 1. Examples shape the format more than instructions do
Think of a design system: you can write "buttons have an 8px radius" in a doc, or ship a `Button`. People copy the `Button`. Models copy examples the same way.

In the bookstore bot: the prompt said "at most three bullet points", but your only formatted example had two bullets and a closing line, "Happy reading!". Most answers ended with "Happy reading!" too, and the bullet limit drifted. Show the format you want in the examples, and nothing you don't want.

**Try it:** run "Can I return an e-book?" with zero, one, and three examples and compare the length and the last line of each answer.

## 2. Where the policy goes, and how it's marked
Rules first, then the policy inside `<policy>` tags, then the examples, then the customer's question. The tags tell the model "this is reference text, not instructions". Without them, a policy line like "Contact us for exceptions" can read as an instruction to the bot.

**Try it:** remove the tags and ask "Can I return a book after 20 days?". Check whether the answer still cites §1.
