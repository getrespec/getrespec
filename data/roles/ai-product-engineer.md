---
role: ai-product-engineer
title: AI Product Engineer
status: researched
last_researched: 2026-11-20
postings_reviewed: 9
---

# Role pack: AI Product Engineer

What someone in this role is expected to know, how important each skill is, in what order to learn it, and how to check it. `/respec plan` builds the coverage map and the curriculum from this file; `/respec update-trends` refreshes it. Format: `data/roles/README.md`.

## The role in 2026

**Key finding:** in current postings, "AI Product Engineer" is a **full-stack product engineer who owns AI features end to end**, not a frontend specialist. Postings ask for the interface *and* the backend, database, auth, deployment, and operations around the model, plus product sense and daily, disciplined use of AI coding agents. The AI-specific part is the core differentiator (LLM integration, agents, evals, guardrails), but it sits on top of solid full-stack engineering. A practitioner writing about the role puts the AI part at 30–40% of the job ([Zumry Wahid](https://zumrywahid.github.io/what-does-ai-product-engineer-do), 2026; evidence: weak).

For a frontend developer this means the move is wider than "learn the AI layer": backend, data, and operations gaps matter as much.

Other titles for the same work: Applied AI Product Engineer, Product Engineer (at AI companies), Full Stack AI Engineer, AI-Native Software Engineer.

## Postings reviewed

All read on 2026-11-20 through Firecrawl job search. "Board" means read on the employer's own job board; "index" means found through a job index and only partly read.

| # | Company | Title | Location | Posted | Read from | Stack and notes |
|---|---|---|---|---|---|---|
| P1 | [Intersog](https://jobs.workable.com/view/pTfBnDP3bSUcKmz89jMckZ/remote-ai-product-engineer-in-vancouver-at-intersog) | AI Product Engineer | Remote | 2026-11-06 | board | TypeScript, PostgreSQL; must-haves ranked: AI coding agents at scale, full-stack, UX and design; agents, structured output, evals on every release, prompt-injection defences |
| P2 | [CreditorWatch](https://jobs.workable.com/view/fw2xcsg2RYk37Cjbqg82Qz/hybrid-ai-product-engineer-in-sydney-at-creditorwatch) | AI Product Engineer | Sydney | 2026-11-03 | board | RAG, agentic workflows, orchestration, evaluation, observability, security, cost |
| P3 | [Iovance Biotherapeutics](https://job-boards.greenhouse.io/iovancebiotherapeutics/jobs/5480108008) | AI Product Engineer | Remote (US) | 2026-11-16 | board | React, Node.js/Python, SQL and migrations, CI/CD; evaluate LLM output, safeguards, human in the loop; USD 130–150K |
| P4 | [Finary](https://jobs.ashbyhq.com/finary/134c298f-68a4-44cc-8c5b-0f46f3030af9) | AI Product Engineer | Remote (Europe) | 2026-10-27 | board | TypeScript; agents and multi-step orchestration in production; "define what a correct agent decision looks like, measure it"; "when a simple rule beats an agent"; €65–80K |
| P5 | [Spur](https://jobs.ashbyhq.com/spur/3e021029-67f0-4574-a1b2-8517fa531529) | Applied AI Product Engineer | New York | 2026-06-07 | board | TypeScript, Next.js, React; end-to-end features, direct customer feedback; LLM products a bonus; USD 170–250K |
| P6 | [Distru](https://jobs.lever.co/distru/42737937-162f-4933-a80a-a7eee9f44cb1) | Staff AI Product Engineer | Remote | 2026-11-09 | board | React, TypeScript, Node, PostgreSQL, GraphQL, LangGraph; multi-agent harness, MCP servers, evals before trusting a prompt, observability, rollback; USD 200–300K (staff level) |
| P7 | [Pavago (client)](https://apply.workable.com/pavago/j/F280D10F6F/) | AI Product Engineer (Full Stack) | Remote | 2026-08-13 | board | Full stack, Supabase or similar; prompts and outputs for consistent behaviour, failure handling, validation; auth and permissions |
| P8 | [Intellishore](https://www.linkedin.com/jobs/view/4492460266) | Senior AI Product Engineer | Zurich | 2026-11-19 | index (partial) | Full stack from LLM and agent backends to interfaces; prototype to production |
| P9 | [Ingeniosi (client)](https://www.linkedin.com/jobs/view/4492157857) | Senior AI Product Engineer (Full Stack) | Remote (Mexico) | 2026-11-19 | index (partial) | LLM features, agents and agentic workflows in production; AI across the development lifecycle |

## Skill tree

**Priority** comes from the postings above: `core` = in at least half of them, or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. **Seen in** counts the postings that ask for the skill (P8 and P9 were only partly read, so counts are a lower bound). With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.

### A. LLM application foundations

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| A1 | How LLMs behave: tokens, context window, sampling, statelessness, cost per token | core | definition | – | Estimate a request's tokens and cost; predict what temperature and history length change | Scenario quiz with numbers |
| A2 | Calling LLM APIs from a server: keys, errors, retries, timeouts | core | 9/9 | A1 | Call a model safely from a backend; handle rate limits and failures | Assignment: endpoint with failure handling |
| A3 | Prompt and context design: system prompts, examples, delimiters, grounding | core | 9/9 | A1 | Write a prompt that holds its format and declines outside its source | Test cases including out-of-scope questions |
| A4 | Structured output and validation (schemas, retry with feedback) | important | 2/9 + implied by agents | A2 | Get schema-valid data and handle invalid output | Assignment with a validator |
| A5 | Streaming answers into the UI, with stop, retry, and accessible status | important | rarely named; expected for user-facing AI | A2 | Stream, cancel upstream, show done/stopped/failed | Assignment; screen-reader check |

### B. Agents, tools, and data

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| B1 | Tool use / function calling, and showing tool calls in the UI | core | 6/9 | A3, A4 | Let a model call your functions safely; render each step | Assignment with two tools |
| B2 | Multi-step agents and orchestration (loops, state, human approval, rollback) | core | 6/9 | B1, C1 | Build a bounded agent loop with approval before actions | Assignment + defence questions |
| B3 | Grounding with your data: long context vs RAG, embeddings, retrieval | important | 2/9 | A3 | Choose and build the right retrieval for a data set | Eval of answer accuracy before/after |
| B4 | MCP: exposing a product's data and actions to agents | advanced | 1/9 (staff); also Turkey market | B1 | Build a small MCP server with scoped permissions | Working server used from an agent |
| B5 | Memory and context systems for agents | advanced | 1/9 (staff) | B2, B3 | Store and retrieve per-user context | Design review |

### C. Quality, safety, and operations of AI features

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| C1 | Evals: test sets, graders, regression checks, "what does correct look like" | core | 5/9 | A3 | Build an eval set and compare two prompt or model versions | Eval report with before/after |
| C2 | Guardrails and failure handling: hallucination, validation, human in the loop | core | 5/9 | A3, A4 | Detect and contain bad output before users see it | Failure-case tests |
| C3 | LLM security: OWASP Top 10 for LLM Applications 2026 (prompt injection, sensitive information disclosure, excessive agency, improper output handling) | core | 5/9 | A3, B1 | Threat-model a feature; defend against injection; render output safely; limit tool permissions | Red-team exercise on own feature |
| C4 | Observability for AI: traces, logging, catching drift | important | 3/9 | A2 | Trace a request end to end and find a regression | Debugging assignment |
| C5 | Cost and latency: caching, model choice, token budgets | important | 2/9 + OWASP LLM06:2026 (Unbounded Consumption) | A1, C4 | Cut cost per request without lowering the eval score | Before/after numbers |

### D. Full-stack product engineering

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| D1 | TypeScript, React, Next.js (or equivalent) frontend | core | 6/9 | – | Build product UI with a design system | Usually known; confirm in placement |
| D2 | Backend APIs and services (Node.js or similar) | core | 9/9 | – | Design and build an API with background jobs | Assignment |
| D3 | Databases: SQL, data modelling, migrations (PostgreSQL) | core | 5/9 | D2 | Model data, write queries, ship a migration safely | Assignment with schema change |
| D4 | Auth, permissions, and handling sensitive data | important | 4/9 | D2, D3 | Add sign-in, roles, and tenant isolation; keep PII out of prompts and logs | Security review of own app |
| D5 | Deploy and run what you build: CI/CD, monitoring, rollback | core | 7/9 | D2 | Ship through a pipeline with tests; monitor and roll back | Working pipeline |
| D6 | Python for AI tooling | advanced | 2/9 | – | Read and write Python services and scripts | Small task |

### E. AI-native development workflow

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| E1 | Building with AI coding agents: specs and acceptance tests agents can execute, review and test gates, verifying output, cost control | core | 5/9 | – | Deliver a feature with an agent and show how its output was verified | Portfolio write-up; interview-style defence |

### F. Product and collaboration

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| F1 | Product sense: start from the problem, ship small, learn from usage and feedback | core | 9/9 | – | Turn a vague request into a short spec and a measurable outcome | Spec exercise |
| F2 | Judging when not to use AI (a rule or plain code beats an agent) | important | 2/9 (explicitly) | B2 | Defend choosing a non-AI solution with reasons | Scenario quiz |
| F3 | UX for AI features: design systems, accessibility, trust (citations, uncertainty, undo) | important | 4/9 | D1 | Design an AI interaction users can trust and correct | Design review |
| F4 | Working with stakeholders: demos, explaining limits, collecting feedback | important | 4/9 | F1 | Demo a feature and its limits to non-engineers | Recorded demo or write-up |

## Learning order

Prerequisites above define the order. A typical path for a frontend developer: A1 → A2 → A3 → A5 → A4 → C1 → B1 → C2 → C3 → B2 → B3 → D2/D3/D4 (alongside the AI modules that need a backend) → D5 → C4 → C5 → F3 → capstone → portfolio (E1, F1, F4 shown through the capstone).

Evals (C1) come early on purpose: postings treat measuring quality as part of building, not a final step.

## Market notes

**Turkey (2026-11):** the "AI Product Engineer" title is rare. Similar work is posted as "AI Engineer" or "AI-native Software Engineer", for example [Wingie Enuygun Group](https://jobs.workable.com/view/onw3TczKfHuA1FvTG8WHwD/hybrid-software-engineer-(ai-native)-in-istanbul-at-wingie-enuygun-group) (backend services, agentic tools daily, MCP servers, evals and RAG as a plus) and [Vertigo Games](https://jobs.workable.com/view/vWYnBazyJt491HXikyC2a6/ai-engineer-in-istanbul-at-vertigo) (Python, agent workflows and automations, verifying AI output). Both ask for daily use of coding agents and the habit of checking their output.

## Sources

- The postings in the table above (read 2026-11-20).
- [DeepLearning.AI – AI Engineering Skills Map](https://www.deeplearning.ai/resources/ai-engineering-skills) (updated 2026-09-17): four pillars (building and deploying AI applications, software engineering fundamentals, using coding agents, shaping the build), used to check the groups above.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (published 2026-08-04).
- [GreatFrontEnd – Frontend developer to AI engineer](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer) (2026-10), for the frontend-origin view of the role.
- [Zumry Wahid – What does an AI Product Engineer actually do in 2026?](https://zumrywahid.github.io/what-does-ai-product-engineer-do) (evidence: weak; one practitioner's view).

## Changelog

- 2026-11-20: first version, from 9 postings.
