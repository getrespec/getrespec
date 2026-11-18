# update-trends — Refresh role and job-market data

**Goal:** Refresh `data/market/roles.md` with current, sourced data.

If you can't search the web, tell the learner and stop; never invent data.

## 1. Read the current file
Keep its format and rules (the "How to read" section at the top) exactly.

## 2. Search
Run separate searches for each role:
- **Global demand:** LinkedIn (Jobs on the Rise, Economic Graph), Indeed Hiring Lab, Lightcast, Dice reports
- **Market notes:** for each country with a "Market notes" section, its main job boards and salary pages (for Turkey: kariyer.net, techcareer.net, LinkedIn Türkiye, Indeed Türkiye). If the learner's target market has no section yet, add one.
- **Skills:** skills and tools most requested in recent postings
- **New roles:** roles gaining traction recently that aren't in the file

## 3. Rules
- Every signal has: metric, value, scope (country/market), source (link), date, metric type (`growth`, `posting count`, `share`, `salary`, `survey`, `qualitative`).
- Prefer primary sources (the report owner). Mark blogs and aggregators `evidence: weak`.
- If there's a newer value for the same metric, replace the old one and note the change in the changelog.
- Add a new role to the main list only if it appears in two independent sources; otherwise put it under "Watchlist".
- Never convert or compare different metric types.

## 4. Resources
Check the links in `data/resources/curricula.md`; flag broken ones and add strong new resources.

## 5. Wrap up
Set `last_updated` to today and add a changelog entry at the bottom. Summarize the 3–5 most important changes for the learner (in their language); call out any change that affects their target role.
