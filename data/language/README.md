# Language guides

One file per learner language, named by ISO code (`tr.md`, `de.md`, …), all with the structure in `_template.md`. The agent reads the guide for `state.learner.language` before writing anything for the learner (AGENTS.md → "Writing in the learner's language").

How a guide grows:
1. **Draft.** If a learner starts in a language with no guide, the agent creates one from the template during `/respec start`, marked `status: draft`, with every row's source set to `draft`.
2. **Learner fixes.** When a learner points out a wrong or unnatural word, the agent fixes it and adds a row with source `learner`.
3. **Review.** A native speaker checks the file, adds rows with source `review`, and sets `status: reviewed` in a pull request.

If you're learning with Respec in a language whose guide is still a draft, a pull request with your file is one of the most useful contributions you can make.
