# Role packs

A role pack is the detailed, sourced skill map for one target role: what the role is today, every skill it expects, how important each one is, what to learn first, and how to check it. `/respec plan` builds a learner's coverage map and curriculum from the pack for their target role; `/respec update-trends` keeps packs current.

`data/market/roles.md` answers "which role should I aim for?". A role pack answers "what exactly do I need to learn for it?".

| Pack | Status | Last researched |
|---|---|---|
| [ai-product-engineer](ai-product-engineer.md) | researched | 2026-11-20 |

Roles in `roles.md` without a pack fall back to their "Typical skills" line and a search of current postings; the agent should say so when it plans.

## Format

Start from [`_template.md`](_template.md). A pack has:

- **Front matter:** `role` (the id from `roles.md`), `title`, `status` (`draft` or `researched`), `last_researched`, `postings_reviewed`.
- **The role today:** what the work is, other titles it's posted under, and anything that contradicts the short definition in `roles.md`.
- **Postings reviewed:** every posting the skill counts come from, with link, date, and where it was read. At least 8 postings, from more than one market when possible.
- **Skill tree:** skills grouped by area. Each skill has a stable ID (`A1`, `B2`…), a priority, how many reviewed postings ask for it, its prerequisites (IDs), measurable "can do" outcomes, and how to check it.
- **Learning order:** a typical path through the prerequisites, with any reason to deviate.
- **Market notes:** how the role shows up in specific countries.
- **Sources** and a **Changelog**.

## Rules

- **Priority** follows the evidence: `core` = in at least half of the reviewed postings, or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. Say when a skill is expected but rarely written down.
- **Never invent postings or counts.** If a posting was only partly read, mark it and treat counts as a lower bound.
- **Name standards with their version** (e.g. "OWASP Top 10 for LLM Applications 2026, LLM10:2026 Improper Output Handling"). Numbering changes between versions.
- **Keep skill IDs stable.** Learners' coverage maps refer to them. Add new IDs instead of renumbering; mark removed skills as retired in the changelog.
- Sources follow the same rules as `roles.md`: prefer primary sources, mark blogs and aggregators `evidence: weak`, date everything.
