---
role: ai-product-engineer
title: AI Product Engineer
status: researched
last_researched: 2026-11-25
postings_reviewed: 9
---

# Role pack: AI Product Engineer

What someone in this role is expected to know, how important each skill is, in what order to learn it, and how to check it. `/respec plan` builds the coverage map and the curriculum from this file; `/respec update-trends` refreshes it. Format: `data/roles/README.md`.

## The role in 2026

**Key finding:** in current postings, "AI Product Engineer" is a **full-stack product engineer who owns AI features end to end**, not a frontend specialist. Postings ask for the interface *and* the backend, database, auth, deployment, and operations around the model, plus product sense and daily, disciplined use of AI coding agents. The AI-specific part is the core differentiator (LLM integration, agents, evals, guardrails), but it sits on top of solid full-stack engineering. A practitioner writing about the role puts the AI part at 30–40% of the job ([Zumry Wahid](https://zumrywahid.github.io/what-does-ai-product-engineer-do), 2026; evidence: weak).

For a frontend developer this means the move is wider than "learn the AI layer": backend, data, and operations gaps matter as much.

Other titles for the same work: Applied AI Product Engineer, Product Engineer (at AI companies), Full Stack AI Engineer, AI-Native Software Engineer.

## Postings reviewed

First read on 2026-11-20 through Firecrawl job search. "Board" means read on the employer's own job board; "LinkedIn" means read on the LinkedIn job page. On 2026-11-25 all nine were re-read in full in a browser (P8 and P9 had only been partly read before) and every count below was checked again; see "Re-check 2026-11-25".

| # | Company | Title | Location | Posted | Read from | Stack and notes |
|---|---|---|---|---|---|---|
| P1 | [Intersog](https://jobs.workable.com/view/pTfBnDP3bSUcKmz89jMckZ/remote-ai-product-engineer-in-vancouver-at-intersog) | AI Product Engineer | Remote | 2026-11-06 | board | TypeScript, PostgreSQL; must-haves ranked: AI coding agents at scale, full-stack, UX and design; agents, structured output, evals on every release, prompt-injection defences |
| P2 | [CreditorWatch](https://jobs.workable.com/view/fw2xcsg2RYk37Cjbqg82Qz/hybrid-ai-product-engineer-in-sydney-at-creditorwatch) | AI Product Engineer | Sydney | 2026-11-03 | board | RAG, agentic workflows, orchestration, evaluation, observability, security, cost |
| P3 | [Iovance Biotherapeutics](https://job-boards.greenhouse.io/iovancebiotherapeutics/jobs/5480108008) | AI Product Engineer | Remote (US) | 2026-11-16 | board | React, Node.js/Python, SQL and migrations, CI/CD; evaluate LLM output, safeguards, human in the loop; USD 130–150K |
| P4 | [Finary](https://jobs.ashbyhq.com/finary/134c298f-68a4-44cc-8c5b-0f46f3030af9) | AI Product Engineer | Remote (Europe) | 2026-10-27 | board | TypeScript; agents and multi-step orchestration in production; "define what a correct agent decision looks like, measure it"; "when a simple rule beats an agent"; €65–80K |
| P5 | [Spur](https://jobs.ashbyhq.com/spur/3e021029-67f0-4574-a1b2-8517fa531529) | Applied AI Product Engineer | New York | 2026-06-07 | board | TypeScript, Next.js, React; end-to-end features, direct customer feedback; LLM products a bonus; USD 170–250K |
| P6 | [Distru](https://jobs.lever.co/distru/42737937-162f-4933-a80a-a7eee9f44cb1) | Staff AI Product Engineer | Remote | 2026-11-09 | board | React, TypeScript, Node, PostgreSQL, GraphQL, LangGraph; multi-agent harness, MCP servers, evals before trusting a prompt, observability, rollback; USD 200–300K (staff level) |
| P7 | [Pavago (client)](https://apply.workable.com/pavago/j/F280D10F6F/) | AI Product Engineer (Full Stack) | Remote | 2026-08-13 | board | Full stack, Supabase or similar; prompts and outputs for consistent behaviour, failure handling, validation; auth and permissions |
| P8 | [Intellishore](https://www.linkedin.com/jobs/view/4492460266) | Senior AI Product Engineer | Zurich | 2026-11-19 | LinkedIn | Full stack from LLM and agent backends to interfaces; retrieval, tool use, multi-step agents, evals; APIs into client systems; deploy and monitor; work samples mandatory |
| P9 | [Ingeniosi (client)](https://www.linkedin.com/jobs/view/4492157857) | Senior AI Product Engineer (Full Stack) | Remote (Mexico) | 2026-11-19 | LinkedIn | Backend (C#/.NET, Python or Java), React or Angular, REST APIs, Azure; LLM features and agents in production; RAG, vector search and Claude Code/Cursor/Copilot preferred |

## Skill tree

Each skill is defined once in [`data/skills.md`](../skills.md): what it is, its prerequisites, the outcomes, and how to check it. This table says how this role asks for it.

- **Priority** comes from the postings above: `core` = in at least half of them, or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.
- **Seen in** counts the postings that ask for the skill, including "preferred" items; counts were re-checked against the full text of all nine postings on 2026-11-25.
- **Depth** is `basic`, `working`, or `deep`, as defined in the catalog. **In this role** is what this role adds to the catalog's outcomes.
- **Was** is the skill's ID in this pack up to v0.2.0. `scripts/migrate-state.mjs` uses it to update learners' states; it is removed in the release after v0.3.0. An old ID on more than one row was split.

### llm: LLM application foundations

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `llm.behavior` | How LLMs behave | A1 | core | definition | working | – |
| `llm.api` | Calling LLM APIs from a server | A2 | core | 9/9 | working | – |
| `llm.prompt-context` | Prompt and context design | A3 | core | 9/9 | working | – |
| `llm.structured-output` | Structured output and validation | A4 | important | 2/9 + implied by agents | working | – |
| `llm.streaming` | Streaming with cancellation | A5 | important | rarely named; expected for user-facing AI | working | Into the UI, with stop, retry, and accessible done/stopped/failed status; also checked with a screen reader |

### agent: Agents and tool use

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `agent.tool-use` | Tool use / function calling | B1 | core | 6/9 | working | Show each tool call and its result in the UI |
| `agent.loops` | Agent loops and orchestration | B2 | core | 8/9 | working | – |
| `agent.human-approval` | Approval before actions | B2 | core | counted with `agent.loops` (old B2, 8/9) | working | – |
| `agent.mcp` | MCP | B4 | advanced | 1/9 (staff); also Turkey market | working | Exposing the product's own data and actions to agents |
| `agent.memory` | Memory and context for agents | B5 | advanced | 1/9 (staff) | working | – |

### rag: Retrieval and data

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `rag.design` | Grounding with your data | B3 | important | 3/9 | working | – |
| `rag.search` | Embeddings and retrieval | B3 | important | counted with `rag.design` (old B3, 3/9) | working | – |

### quality: Quality, safety, and operations

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `quality.evals` | Evals | C1 | core | 6/9 | working | – |
| `quality.guardrails` | Guardrails and failure handling | C2 | core | 5/9 | working | – |
| `quality.security` | LLM security | C3 | core | 5/9 | working | Render model output safely in the UI. Only P1 names prompt injection |
| `quality.observability` | Observability for AI | C4 | important | 3/9 | working | – |
| `quality.cost-latency` | Cost and latency | C5 | important | 2/9 + OWASP LLM06:2026 (Unbounded Consumption) | working | – |

### eng: Full-stack product engineering

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `eng.frontend` | Product frontend | D1 | core | 7/9 | working | Usually the learner's starting point |
| `eng.typescript` | TypeScript/Node | D1 | core | counted with `eng.frontend` (old D1, 7/9) | working | – |
| `eng.backend` | Backend APIs and services | D2 | core | 8/9 explicit; P4 implies it (runs what it builds across TypeScript, Rust and Ruby) | working | Node.js or similar |
| `eng.sql` | Databases and migrations | D3 | core | 5/9 | working | – |
| `eng.auth` | Auth, permissions, sensitive data | D4 | important | 4/9 | working | Tenant isolation |
| `eng.deploy` | Deploy and run | D5 | core | 9/9 | working | – |
| `eng.python` | Python | D6 | advanced | 2/9 | basic | Read and write Python services and scripts for AI tooling |

### work: Workflow and collaboration

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `work.coding-agents` | Building with AI coding agents | E1 | core | 6/9 (P2 also expects AI in daily work, without naming coding agents) | working | – |
| `work.problem-framing` | Starting from the problem | F1 | core | 9/9 | working | Product sense: ship small and learn from usage and feedback |
| `work.when-not-ai` | Judging when not to use AI | F2 | important | 2/9 (explicitly) | working | – |
| `work.ai-ux` | UX for AI features | F3 | important | 4/9 | working | – |
| `work.stakeholders` | Working with stakeholders | F4 | important | 4/9 | working | – |

## Re-check 2026-11-25

All nine postings re-read in full. The broad areas below are the ones used in public write-ups about this pack (for example the LinkedIn post of 2026-11-26); the skill counts above use the same reading. ✓ = asked for (including "preferred"), – = not mentioned.

| Area | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| Deploy and run in production (CI/CD, monitoring) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 9/9 |
| Backend (APIs, databases, services) | ✓ | ✓ | ✓ | implied | ✓ | ✓ | ✓ | ✓ | ✓ | 8/9 (+1 implied) |
| Agents or tool use | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | 8/9 |
| Frontend | ✓ | – | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | 7/9 |
| Security or guardrails | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | ✓ | ✓ | 7/9 |
| AI tools in daily work | ✓ | ✓ | ✓ | ✓ | – | ✓ | – | ✓ | ✓ | 7/9 |
| Evals (measuring model output) | ✓ | ✓ | ✓ | ✓ | – | ✓ | – | ✓ | – | 6/9 |
| RAG or retrieval | – | ✓ | – | – | – | – | – | ✓ | ✓ | 3/9 |

Notes: P3's agent experience and P9's RAG and AI coding tools are "preferred". P5's company builds browser agents, but the role itself doesn't list agent work. Only P1 names prompt injection.

## Learning order

Prerequisites above define the order. A typical path for a frontend developer: `llm.behavior` → `llm.api` → `llm.prompt-context` → `llm.streaming` → `llm.structured-output` → `quality.evals` → `agent.tool-use` → `quality.guardrails` → `quality.security` → `agent.loops` → `rag.design` → `eng.backend`/`eng.sql`/`eng.auth` (alongside the AI modules that need a backend) → `eng.deploy` → `quality.observability` → `quality.cost-latency` → `work.ai-ux` → capstone → portfolio (`work.coding-agents`, `work.problem-framing`, `work.stakeholders` shown through the capstone).

Evals (`quality.evals`) come early on purpose: postings treat measuring quality as part of building, not a final step.

## Market notes

**Turkey (2026-11):** the "AI Product Engineer" title is rare. Similar work is posted as "AI Engineer" or "AI-native Software Engineer", for example [Wingie Enuygun Group](https://jobs.workable.com/view/onw3TczKfHuA1FvTG8WHwD/hybrid-software-engineer-(ai-native)-in-istanbul-at-wingie-enuygun-group) (backend services, agentic tools daily, MCP servers, evals and RAG as a plus) and [Vertigo Games](https://jobs.workable.com/view/vWYnBazyJt491HXikyC2a6/ai-engineer-in-istanbul-at-vertigo) (Python, agent workflows and automations, verifying AI output). Both ask for daily use of coding agents and the habit of checking their output.

## Sources

- The postings in the table above (read 2026-11-20; re-read in full 2026-11-25).
- [DeepLearning.AI – AI Engineering Skills Map](https://www.deeplearning.ai/resources/ai-engineering-skills) (updated 2026-09-17): four pillars (building and deploying AI applications, software engineering fundamentals, using coding agents, shaping the build), used to check the groups above.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (published 2026-08-04).
- [GreatFrontEnd – Frontend developer to AI engineer](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer) (2026-10), for the frontend-origin view of the role.
- [Zumry Wahid – What does an AI Product Engineer actually do in 2026?](https://zumrywahid.github.io/what-does-ai-product-engineer-do) (evidence: weak; one practitioner's view).

## Changelog

- 2026-11-27: skill tree moved to the shared catalog (`data/skills.md`). Rows now point to catalog IDs; old IDs are in the `Was` column. B2, B3 and D1 split: `agent.loops` + `agent.human-approval`, `rag.design` + `rag.search`, `eng.frontend` + `eng.typescript`. Counts and priorities unchanged; `eng.python` marked `basic`.
- 2026-11-25: all nine postings re-read in full (P8 and P9 had been partly read). Counts updated: B2 6→8, B3 2→3, C1 5→6, D1 6→7, D2 9→8 explicit (P4 implied), D5 7→9, E1 5→6. Priorities unchanged. Added "Re-check 2026-11-25".
- 2026-11-24: A1 reworded to follow current provider docs (sampling settings are restricted on many current models); same ID and priority.
- 2026-11-20: first version, from 9 postings.
