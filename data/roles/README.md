# Role packs

A role pack is the detailed, sourced skill map for one target role: what the role is today, which skills it expects, how important each one is, and what to learn first. The skills themselves (outcomes, prerequisites, how to check them) are defined once in [`data/skills.md`](../skills.md) and shared by all packs, because different titles mostly ask for the same skills. `/respec plan` builds a learner's coverage map and curriculum from the pack for their target role; `/respec update-trends` keeps packs current.

`data/market/roles.md` answers "which role should I aim for?". A role pack answers "what exactly do I need to learn for it?".

| Pack | Status | Last researched |
|---|---|---|
| [ai-product-engineer](ai-product-engineer.md) | researched | 2026-11-25 |
| [ai-engineer](ai-engineer.md) | researched | 2026-11-24 |
| [ai-fluent-developer](ai-fluent-developer.md) | researched | 2026-11-24 |
| [ai-security-engineer](ai-security-engineer.md) | researched | 2026-11-24 |
| [forward-deployed-engineer](forward-deployed-engineer.md) | researched | 2026-11-24 |
| [ml-engineer](ml-engineer.md) | researched | 2026-11-24 |

Packs exist only for roles where the main work is writing software (decided 2026-11-24); advisory roles such as `ai-consultant` stay in `roles.md` without one. Roles in `roles.md` without a pack fall back to their "Typical skills" line and a search of current postings; the agent should say so when it plans.

## Format

Start from [`_template.md`](_template.md). A pack has:

- **Front matter:** `role` (the id from `roles.md`), `title`, `status` (`draft` or `researched`), `last_researched`, `postings_reviewed`.
- **The role today:** what the work is, other titles it's posted under, and anything that contradicts the short definition in `roles.md`.
- **Postings reviewed:** every posting the skill counts come from, with link, date, and where it was read. At least 10 postings (8 if the role is rare, and say so), from more than one market when possible.
- **Skill tree:** one row per catalog skill the role asks for, grouped by catalog area: the catalog ID, a short name, its priority in this role, how many of the reviewed postings ask for it, its depth (`basic`, `working`, `deep`), and what this role adds to the catalog's outcomes ("In this role"). Packs converted from the old format keep a `Was` column with their old ID (`A1`, `B2`…) until the release after v0.3.0; an old ID on several rows was split.
- **Learning order:** a typical path through the prerequisites, with any reason to deviate.
- **Market notes:** how the role shows up in specific countries.
- **Sources** and a **Changelog**.

## Rules

- **Priority** follows the evidence: `core` = in at least half of the reviewed postings, or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. Say when a skill is expected but rarely written down.
- **Never invent postings or counts.** If a posting was only partly read, mark it and treat counts as a lower bound.
- **Name standards with their version** (e.g. "OWASP Top 10 for LLM Applications 2026, LLM10:2026 Improper Output Handling"). Numbering changes between versions.
- **Skills live in the catalog.** Don't define a skill in a pack. If a posting asks for something no catalog skill covers, add it to `data/skills.md`; if a role needs a catalog skill deeper, set its depth instead of adding a near-duplicate.
- **Keep skill IDs stable.** Learners' coverage maps refer to them. Catalog IDs are never renamed or reused; retired skills move to the catalog's "Retired" section.
- **Counts and priorities belong to the pack.** Never add "Seen in" counts across packs: each comes from a different set of postings.
- Sources follow the same rules as `roles.md`: prefer primary sources, mark blogs and aggregators `evidence: weak`, date everything.
