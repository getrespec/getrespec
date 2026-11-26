# update-trends — Refresh role and job-market data

**Goal:** Refresh `data/market/roles.md`, the role packs in `data/roles/`, the skill catalog `data/skills.md`, and `data/resources/curricula.md` with current, sourced data, and tell the learner what changed for their plan.

If you can't search the web, tell the learner and stop; never invent data. This is research, not a quick lookup: read the sources themselves, not only search snippets.

**Scope (decided 2026-11-24):** Respec covers roles where the main work is writing software. Roles that are mostly advisory or process work (e.g. `ai-consultant`) stay in `roles.md` as a short entry but get no role pack.

## 1. Read the current files
Read `data/market/roles.md` (keep the "How to read" rules exactly), `data/roles/README.md`, `data/skills.md`, and every pack in `data/roles/`. Note each pack's `last_researched` date.

## 2. Market scan (all roles)
Run separate searches; read each report itself, not an article about it, whenever you can reach it.
- **Primary demand sources:** LinkedIn Jobs on the Rise and Economic Graph, Indeed Hiring Lab (AI tracker and title studies), Lightcast (including its data in the Stanford AI Index), PwC Global AI Jobs Barometer, CompTIA and Dice tech jobs reports, and for security roles CyberSN and SANS.
- **Per role:** posting counts, growth, share, and salary signals for every role in the file.
- **Market notes:** for each country with a "Market notes" section, its main job boards and salary pages (for Turkey: kariyer.net, techcareer.net, LinkedIn Türkiye, Indeed Türkiye). If the learner's target market has no section yet, add one.
- **New roles:** technical AI titles gaining traction that aren't in the file. Also check whether an existing role is really a skill inside another role (e.g. "agent engineer" inside `ai-engineer`) rather than a title of its own.

## 3. Rules for signals
- Every signal has: metric, value, scope (country/market), source (link), date, metric type (`growth`, `posting count`, `share`, `salary`, `survey`, `qualitative`).
- Prefer primary sources (the report owner). Mark blogs and aggregators `evidence: weak`.
- If there's a newer value for the same metric, replace the old one and note the change in the changelog.
- Add a new role to the main list only if it appears in two independent sources; otherwise put it under "Watchlist". Remove a Watchlist role only with a reason in the changelog.
- Never convert or compare different metric types.

## 4. Provider docs check
Lessons and skills follow the frontier providers' docs (AGENTS.md → Checking facts that change). Open the "Official provider docs" pages in `data/resources/curricula.md`, including each provider's models page and changelog, and list since the last run:
- new API features that change how something is built (a new tool type, a new output mode, a new caching option);
- parameters or features that are deprecated, restricted, or rejected by current models.
Use this list in step 5 (skill wording in the catalog) and step 7 (tell the learner which of their lessons may now be outdated).

## 5. Role packs
Refresh the learner's target role first; refresh the others if the learner asks or if `last_researched` is older than 90 days. If your agent can run sub-agents, give each pack its own sub-agent and review what comes back before writing it. For each pack, following `data/roles/README.md`:
- **Postings:** read at least 10 current postings (at least 8 if the role is rare, and say so), preferably from the last 60 days, from employers' own job boards. Cover more than one market and include at least 2 from the learner's market when they exist. Replace postings older than six months. Record each one in the table, marking partial reads.
- **Variants:** if one title covers different jobs (e.g. LLM product work vs model training), report the split you saw and say which variant the skill tree describes.
- **Counts and priorities:** recount how many postings ask for each skill and update priorities by the README's rules. A requirement now in 3 or more postings gets a row: point to the catalog skill that covers it, or add one to `data/skills.md` first. Never rename catalog IDs.
- **Depth and "In this role":** set each row's depth from what the postings expect, and keep what is specific to this role in "In this role", not in the catalog.
- **Catalog (once per run, after the packs):** check every skill in `data/skills.md` against the step 4 list. A skill built on a deprecated or restricted feature gets reworded to what replaces it; a new feature that postings ask for becomes a skill. A skill no pack uses any more moves to "Retired" with the date and reason. Add a catalog changelog line, and run `node --test test/skills.test.mjs`: every pack row must point to a catalog skill.
- **Standards:** check every standard and version the pack names (e.g. the OWASP Top 10 for LLM Applications edition) and update it if a newer one is out.
- Set `last_researched`, `postings_reviewed`, and add a changelog line.

**New packs:** a role in the main list without a pack gets one only if it's in scope and you can find at least 8 real postings. Start from `data/roles/_template.md` and add it to the table in `data/roles/README.md`.

## 6. Resources
Check the links in `data/resources/curricula.md`; flag broken ones and add strong new resources. Keep the "Official provider docs" table current.

## 7. Wrap up
- Set `last_updated` in `roles.md` and `last_checked` in `curricula.md` to today, and add changelog entries.
- Compare the learner's `curriculum.coverage` with their refreshed pack and the catalog, and tell them what changed for their plan (a skill that became `core` or deeper, a new requirement, a lesson built on something now deprecated). Offer to apply it with `/respec plan` (refine); don't change the curriculum without asking.
- Summarize the 3–5 most important changes for the learner (in their language); call out any change that affects their target role.
