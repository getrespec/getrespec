---
role: ai-engineer
title: AI Engineer
status: researched
last_researched: 2026-11-24
postings_reviewed: 22
---

# Role pack: AI Engineer

What someone in this role is expected to know, how important each skill is, in what order to learn it, and how to check it. `/respec plan` builds the coverage map and the curriculum from this file; `/respec update-trends` refreshes it. Format: `data/roles/README.md`.

## The role today

**Key finding:** "AI Engineer" is a broad title, but in current postings it mostly means **building products and internal tools on top of existing models, mostly hosted LLMs**: calling model APIs, retrieval over company data, tool use and agents, evals, guardrails, and running all of it in production. Of the 22 postings below, 17 are this LLM-application work, 3 mix it with training models in PyTorch (P3, P11, P12), 1 is classic deep learning with no LLM work (P8), and 1 is an AI-enablement role with light coding (P9). This pack covers the LLM-application variant, which a working software developer can reach; model training is in group G and marked as variant-only.

Three patterns stand out:

- **Agents are the centre of the job, not an extra.** 19 of 22 postings ask for agents or agentic workflows; 6 name multi-agent systems and 4 name MCP. Several describe "agents that take actions in business systems" with approval steps, permissions, and audit trails (P13, P16, P18).
- **Measurement is a hiring filter.** 16 of 22 ask for evals; several say it in strong terms: "evaluate against outcomes rather than model judges" (P5), "write evaluation harnesses before scaling pipelines" (P1), "people who overclaim AI impact without evidence" are not wanted (P17).
- **A growing share builds internal AI tools** for sales, support, finance, and operations teams (P9, P14, P16, P18, P20, P21). These roles add stakeholder work and business systems integration (CRM, support desks, SSO) to the LLM skills.

Python dominates: 17 postings require it, and 2 more accept Python or TypeScript. TypeScript appears in 6, Go in 1 (P16). Frameworks are named often (LangChain/LangGraph in 5), but several postings say the stack is "not a filter" and hire for depth instead (P5, P13).

Other titles for the same work: Applied AI Engineer, LLM Engineer, AI/LLM Engineer, AI Software Engineer, Software Engineer (Generative AI), Agentic AI Engineer, Yapay Zeka Mühendisi (TR). Customer-facing variants overlap with Forward-Deployed Engineer (P19, P21). For the full-stack, interface-heavy variant see the [AI Product Engineer pack](ai-product-engineer.md).

Compared with `roles.md`: the definition holds, but its "Typical skills" line leads with LangChain, RAG and PyTorch. In these postings PyTorch is required only in the ML-hybrid and classic-ML variants (4/22), while agents (19/22), evals (16/22), and RAG (15/22) lead.

## Postings reviewed

All read on 2026-11-24. "Board" means read on the employer's own job board (Workable, SmartRecruiters, Greenhouse, Ashby, or a careers site), through Firecrawl job search or the board's public JSON API. "Board (summary)" means the page was read through a fetch tool that returned a close summary, not the verbatim text. "Board (partial)" means part of the text was cut off, so counts for that posting are a lower bound. P15 is older than 60 days.

| # | Company | Title | Location | Posted | Read from | Stack and notes |
|---|---|---|---|---|---|---|
| P1 | [Control Risks](https://jobs.workable.com/view/qCVDfFf9qo7bnBFe9dxc22/hybrid-ai-engineer-in-berlin-at-control-risks) | AI Engineer | Berlin (also Madrid) | 2026-11-18 | board | Python (async), Anthropic and Gemini APIs, structured outputs, tool calling, multi-step agentic pipelines with memory and state, RAG over a Neo4j knowledge graph, evals for extraction quality; maintains CLAUDE.md files for AI-assisted development |
| P2 | [Bolder Apps](https://jobs.workable.com/view/iZ51CeiMiMccWjyuk53Uwd/remote-ml-engineer-(ai-%2F-llm)-in-colombia-at-bolder-apps) | ML Engineer (AI / LLM) | Remote (Colombia and other listed countries) | 2026-11-19 | board | LLM apps in production (healthcare first); RAG with embeddings, hybrid search, reranking on PostgreSQL; streaming chat flows; evals comparing models on quality, speed, cost; guardrails, moderation, prompt-injection protection; TypeScript/Node codebase; explain choices to non-technical clients |
| P3 | [Volga Partners](https://jobs.workable.com/view/62N6ZL1GjmX45H7iiqhzxE/remote-ai%2Fml-engineer---production-ai-%26-llm-systems-(india)-in-india-at-volga-partners) | AI/ML Engineer – Production AI & LLM Systems | Remote (India) | 2026-11-18 | board | **ML hybrid:** PyTorch or Keras training required, transformers, NLP fundamentals; plus RAG, vector DBs, agentic workflows, FastAPI, Docker, cloud; LoRA and LangGraph preferred; ₹15–22 LPA |
| P4 | [Master-Works (Nabeh)](https://jobs.workable.com/view/b84qJKzLTvr7Jn9LHUQvqG/ai-product%2C-senior-engineer-(llm-%26-agentic-ai)-in-riyadh-at-master-works) | AI Product, Senior Engineer (LLM & Agentic AI) | Riyadh | 2026-11-15 | board (partial) | Python, FastAPI; RAG (chunking, embeddings, reranking), pgvector/Qdrant/Milvus; tool calling, multi-agent workflows, structured output; OpenAI-compatible APIs, model routing and fallback, vLLM serving; streaming; Arabic and English |
| P5 | [hermeneutic research](https://jobs.workable.com/view/cjX6y4V7twzfRhWDjhkwWz/remote-lead-ai-engineer%2C-llm-systems---meridian-in-united-states-at-hermeneutic-research) | Lead AI Engineer, LLM Systems | Remote (US) | 2026-11-19 | board | Lead level. Multi-agent research system; latency budgets, provider failover, structured-output validation; evals tied to outcomes, regression gates; cost routing, caching, batching; pinned model versions and rollback; vLLM; "not a prompt-engineering role" |
| P6 | [Sporty Group](https://job-boards.eu.greenhouse.io/sportygroup/jobs/5030656101) | Applied AI Engineer (LLM) | Remote (EMEA) | 2026-11-20 | board | Python, SQL, cloud; replace external LLM APIs with open-weight models on company infrastructure (vLLM/SGLang); output validation, access controls, fallback; repeatable quality/latency/cost evals; coding agents that run tests within permissions; fine-tuning a plus |
| P7 | [ASOS](https://jobs.smartrecruiters.com/ASOS/744000157124664-senior-ai-llm-engineer) | Senior AI / LLM Engineer | London | 2026-10-22 | board | Azure OpenAI and Azure AI stack, Python, Semantic Kernel/LangChain; RAG, fine-tuning, tool use, multi-agent orchestration, human-in-the-loop; offline and online evals; guardrails; token-aware cost design, caching, routing |
| P8 | [Senseye](https://jobs.workable.com/view/4gCnzNPnZncKz395yYA1M4/hybrid-ai-engineer-in-austin-at-senseye) | AI Engineer | Austin | 2026-11-12 | board | **Classic deep learning, no LLM work:** train self-supervised and fine-tuned models on large video datasets, Python, a deep learning framework; recent graduates welcome |
| P9 | [Playtech](https://jobs.smartrecruiters.com/Playtech/744000163438349-ai-engineer) | AI Engineer | Tartu, Estonia | 2026-11-24 | board | **AI enablement:** help infrastructure teams adopt AI, including agentic solutions; security, privacy, and regulation; privately hosted AI and hands-on coding are extras |
| P10 | [finanzen.net](https://jobs.smartrecruiters.com/FinanzennetGmbH/744000163447249-senior-ai-software-engineer-f-m-d-) | Senior AI Software Engineer | Remote (Germany) | 2026-11-24 | board | Python, FastAPI, AWS; GenAI features end to end; "knowing when an LLM beats a well-tuned ML model or a simple heuristic"; Claude or Codex for development; observability; TypeScript/React a plus |
| P11 | [SIXT](https://jobs.smartrecruiters.com/SIXT/744000160164257-applied-ai-engineer-m-w-d-) | Applied AI Engineer | Munich | 2026-11-06 | board | **ML hybrid:** agentic workflows, LangChain, MCP; plus PyTorch, scikit-learn, XGBoost; Python, FastAPI, Docker, cloud; choose heuristics vs ML vs neural networks; German and English |
| P12 | [Thalia](https://jobs.smartrecruiters.com/ThaliaBcherGmbH1/744000162736336-ai-engineer-generative-ai-llm-m-w-d-) | AI Engineer – Generative AI & LLM | Münster, Germany | 2026-11-20 | board | **ML hybrid:** design and train language, diffusion, and multimodal models; PyTorch/TensorFlow; RAG, prompt engineering, fine-tuning, benchmarks; GCP and MLOps; German required |
| P13 | [Omoda Brands (wehkamp)](https://jobs.smartrecruiters.com/wehkamp/744000163449089-ai-engineer-jij-bouwt-de-ai-in-onze-toepassingen-5-vacatures) | AI Engineer (5 openings) | Amsterdam / Zierikzee / Zwolle | 2026-11-24 | board | Builds AI into products with existing language and image models: retrieval, context, tool use, controls; versioned and tested prompts; evals for non-deterministic systems; logging, fallbacks; clear limits on what the system may do alone; uses coding agents critically; Dutch required |
| P14 | [Vertigo Games](https://jobs.workable.com/view/vWYnBazyJt491HXikyC2a6/ai-engineer-in-istanbul-at-vertigo) | AI Engineer | Istanbul | 2026-11-04 | board (summary) | Entry-friendly ("no prior work experience required"); Python, agent workflows and automations for internal teams, APIs and integrations, small cloud services (GCP preferred); daily Claude Code/Codex/Cursor use and checking their output; LLM projects on GitHub |
| P15 | [ING Hubs Türkiye](https://careers.ing.com/en/job/istanbul/senior-agentic-ai-engineer/3121/44428104320) | Senior Agentic AI Engineer | Istanbul | 2026-09-12 (shown as 12/09/2026) | board (summary) | Senior/architect level (6+ years). Expert Python; LLM applications, RAG, multi-agent systems; LangGraph, LangChain, CrewAI, AutoGen; evaluation, observability, optimisation; Kubernetes, IaC, CI/CD; Responsible AI, security, privacy |
| P16 | [Trust Wallet](https://jobs.ashbyhq.com/trust-wallet/87c32867-4e32-473c-b818-8eae0306f46a) | Senior AI Engineer (Internal Tools & Agents) | Remote (global) | 2026-10-02 | board | Go and Python; internal agent workflows with context management, tool calling, retrieval, structured outputs, state, human approval; eval datasets, regression tests, release checks; timeouts, retries, rate limits; tracing, versioning, audit trails; MCP a plus |
| P17 | [BJAK](https://jobs.ashbyhq.com/bjakcareer/a88550fb-d5ce-4ecf-ba8a-9583629a02d7) | Applied AI Engineer | Remote (US) | 2026-11-23 | board | Python or TypeScript; agents, RAG, tool calling, evals, guardrails for financial workflows (KYC, support, risk); "good judgement on what should be automated and what should not" |
| P18 | [Figma](https://boards.greenhouse.io/figma/jobs/6233043004?gh_jid=6233043004) | AI Engineer, Internal Tools | San Francisco / New York / US | 2026-10-27 | board | Agents and automations for GTM, finance, people, support: tool calling, RAG, schema-constrained outputs, agent frameworks, MCP; evals before and after launch; deterministic guardrails and approval patterns; authN/authZ, auditability; when rules beat AI |
| P19 | [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5483945008) | Applied AI Engineer, Commercial | San Francisco | 2026-11-18 | board | Customer-facing, close to FDE. Prompting, context engineering, agent architectures, MCP, evals that become customers' acceptance criteria; multi-agent reference implementations; cost, latency, model migrations; Python or TypeScript; USD 280–320K |
| P20 | [GitLab](https://job-boards.greenhouse.io/gitlab/jobs/8940982002) | Applied AI Engineer, Enterprise AI | Bangalore | 2026-11-23 | board | Internal AI for sales, marketing, support; JavaScript/TypeScript; prompt engineering "as core discipline", RAG vs long context, small fine-tuned vs large models; tool use, multi-agent, human-in-the-loop, guardrails, prompt-injection defences, data-leakage prevention; "when AI isn't the right answer" |
| P21 | [ElevenLabs](https://jobs.ashbyhq.com/ElevenLabs/b8a111fa-9fd5-44d0-97ed-8fd1280be4ef) | Applied AI Engineer | Remote (Europe) / London | 2026-10-21 | board | Python, SQL, LLM APIs, agent orchestration; "built LLMs beyond demo and know how to evaluate them and where they fail"; forward-deployed into growth teams |
| P22 | [WRITER](https://jobs.ashbyhq.com/WRITER/2170c74d-7726-4d8f-910e-7f4ef7ac4fd1) | Software engineer, generative AI | San Francisco | 2026-11-03 | board | Python, FastAPI, asyncio, PostgreSQL; vector DBs (Pinecone, Weaviate, pgvector); agentic frameworks; React and TypeScript; Docker, Kubernetes; enterprise auth (OAuth, OIDC, RBAC); AI coding tools |

Markets: US (P5, P8, P17, P18, P19, P22), UK (P7, P21), Germany (P1, P10, P11, P12), Netherlands (P13), Estonia (P9), Turkey (P14, P15), India (P3, P20), Saudi Arabia (P4), Latin America (P2), EMEA remote (P6), global remote (P16).

## Skill tree

**Priority** comes from the postings above: `core` = in at least half of them (11+ of 22), or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. **Seen in** counts the postings that ask for the skill; P4, P14 and P15 were read partly or as summaries, so counts are a lower bound. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.

Skills follow what the frontier model APIs expose today (checked 2026-11-24 against Anthropic, OpenAI, and Google docs; see Sources): tool definitions with JSON Schema, strict or validated schema adherence, parallel tool calls, provider-hosted tools (web search, code execution), tool search for large tool sets, MCP connections, and agent SDKs. Sampling parameters and model internals are not skills here: no posting asks for them.

### A. LLM application foundations

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| A1 | How LLMs behave: tokens, context window, statelessness, non-determinism, cost per token | core | definition; named in 4/22 (P4, P5, P7, P20) | – | Estimate a request's tokens and cost; explain why the same input can give different outputs and what that means for testing | Scenario quiz with numbers |
| A2 | Calling LLM APIs from a backend: provider SDKs, keys kept server-side, errors, rate limits, retries, timeouts | core | 20/22 | A1 | Call two providers' APIs safely from a service; handle rate limits, timeouts, and failed calls | Assignment: endpoint with failure handling |
| A3 | Prompt and context engineering: system prompts, examples, delimiters, what goes into the context and in what order | core | 12/22 | A1 | Write a prompt that holds its format, stays in scope, and uses only supplied sources; manage context in multi-turn flows | Test cases including out-of-scope questions |
| A4 | Structured output: JSON Schema, strict mode / constrained decoding, validation, retry with feedback | important | 6/22 + implied by tool use | A2 | Get schema-valid data from a model and handle the cases where it isn't | Assignment with a validator |
| A5 | Model selection and migration: compare models on quality, latency, and cost; pin versions; migrate between models or providers safely | core | 11/22 | A2, D1 | Choose a model for a task with eval numbers; swap models behind an interface without regressions | Eval report comparing two models |
| A6 | Multimodal input and output: images, documents (PDF), audio | important | 3/22 (P4, P12, P13) | A2 | Send documents or images to a model and extract structured data from them | Assignment on a document set |
| A7 | Streaming responses to clients, with cancellation | advanced | 2/22 (P2, P4) | A2 | Stream a response and cancel the upstream call when the client leaves | Assignment |

### B. Retrieval and data

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| B1 | RAG design: long context vs retrieval, chunking, grounding answers in sources with citations | core | 15/22 | A3 | Choose between putting data in context and retrieving it; build a grounded Q&A over a document set | Eval of answer accuracy and citation correctness before/after |
| B2 | Embeddings, vector and hybrid search, reranking (e.g. pgvector, Qdrant) | important | 8/22 | B1 | Index a corpus, combine keyword and vector search, measure retrieval quality (recall@k) | Retrieval eval with a labelled set |
| B3 | Document and data pipelines: ingestion, extraction from unstructured text, entity resolution | important | 4/22 (P1, P3, P4, P6) | A4, B1 | Turn messy documents into validated, structured records | Assignment with extraction accuracy measured |
| B4 | Knowledge graphs and graph retrieval (e.g. Neo4j, Cypher) | advanced | 2/22 (P1, P5) | B1 | Model entities and relations; answer questions by generating graph queries | Design review + small build |

### C. Agents and tool use

This group carries the agent-engineering skills, since there is no separate agent-engineer pack.

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| C1 | Tool use / function calling: tool schemas and descriptions, forcing or limiting tool choice, parallel calls, returning results and errors to the model, provider-hosted tools | core | 9/22 explicit; required by every agent posting (19/22) | A3, A4 | Give a model three tools, run the call → result round trip, handle a failing tool and a malformed call | Assignment with tests for each tool path |
| C2 | Agent loops and workflow orchestration: bounded loops, stop conditions, state, retries; choosing a fixed workflow vs an autonomous agent | core | 19/22 | C1, D1 | Build an agent that completes a multi-step task within a step and cost budget, and explain why it isn't a fixed workflow (or is) | Assignment + defence questions |
| C3 | Human-in-the-loop and limits on autonomy: approval before actions, escalation, audit trails, what the agent may do alone | important | 6/22 (P5, P7, P13, P16, P18, P20) | C2 | Add approval gates to risky actions and a log that shows who approved what | Scenario review of an agent's action list |
| C4 | MCP: connect agents to MCP servers and build a small server with scoped permissions | important | 4/22 (P11, P16, P18, P19) | C1 | Expose a system's data and actions through an MCP server; use it from an agent; limit what it can do | Working server used from an agent |
| C5 | Multi-agent systems: orchestrator and sub-agents, hand-offs, and judging when they are over-built | important | 6/22 (P4, P5, P7, P15, P19, P20); mostly senior postings | C2, C7 | Split a task across agents and show, with evals, whether it beats a single agent | Ablation report |
| C6 | Agent memory and state across sessions | important | 5/22 (P1, P4, P5, P7, P16) | C2, B1 | Store and retrieve per-user or per-task memory; keep it from leaking between users | Design review + test |
| C7 | Agent evaluation: task success, tool-call correctness, trajectories, cost per task; turning production failures into test cases | important | 5/22 (P5, P16, P18, P19, P20) | C2, D1 | Build an eval set for an agent and find where it fails (model, retrieval, tool, or business rule) | Eval report with failure breakdown |
| C8 | Agent frameworks and SDKs: one framework (LangGraph, LangChain) or provider agent SDK, learned after building a loop by hand | important | 8/22 name a framework; LangChain/LangGraph 5/22 | C2 | Rebuild a hand-written agent in a framework and say what it adds and costs | Assignment + write-up |
| C9 | Coding agents as a product: agents that work in repositories and run tests within permissions | advanced | 2/22 (P6, P19) | C2, C3 | Wire an agent to a repo with tests as the gate and limited permissions | Working demo |

### D. Quality, safety, and operations

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| D1 | Evals: test sets from real usage, graders (code checks, human labels, model graders), regression gates, offline and online | core | 16/22 | A3 | Build an eval set and compare two prompt, model, or retrieval versions with numbers | Eval report with before/after |
| D2 | Guardrails and failure handling: hallucination control, output validation, grounding, deterministic checks, safe fallbacks | important | 7/22 | A4, D1 | Detect and contain bad output before it reaches a user or a system | Failure-case tests |
| D3 | LLM and agent security: OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM02:2026 Sensitive Information Disclosure, LLM03:2026 Excessive Agency, LLM10:2026 Improper Output Handling) and the OWASP Top 10 for Agentic Applications 2026; access control, PII handling | core | 13/22 ask for security, privacy, or access control; prompt injection named in 3/22 | A3, C1 | Threat-model a feature; defend against direct and indirect injection; scope tool permissions; keep PII out of prompts and logs | Red-team exercise on own feature |
| D4 | Observability for LLM systems: tracing model and tool calls, usage tracking, finding where a failure came from | core | 11/22 | A2 | Trace a request end to end and locate a regression in model, retrieval, or tool | Debugging assignment |
| D5 | Cost and latency: caching (including provider prompt caching), batching, routing between small and frontier models, token budgets | core | 13/22 + OWASP LLM06:2026 (Unbounded Consumption) | A1, D4 | Cut cost per request or per task without lowering the eval score | Before/after numbers |
| D6 | Production reliability: provider failover, degradation modes, async jobs, partial failures | important | 6/22 | A2, D4 | Keep a feature working when a provider is slow or down | Chaos test on own service |
| D7 | Release discipline for AI changes: versioned prompts and configs, release checks, pinned models, rollback | important | 5/22 (P5, P7, P13, P16, P18) | D1 | Ship a prompt change through a gate that runs the eval and can roll back | Working pipeline |

### E. Software engineering around the model

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| E1 | Python for AI services: async I/O, typing, tests | core | 19/22 (17 require Python; 2 accept Python or TypeScript) | – | Write a tested async Python service that calls models | Assignment |
| E2 | Backend APIs and integrations: FastAPI or equivalent, background jobs, connecting business systems | core | 15/22 | E1 | Build an API that wraps an AI workflow and integrates one external system | Assignment |
| E3 | Deploy and run: containers, one cloud (AWS, Azure, or GCP), CI/CD | core | 13/22 | E2 | Ship a service through a pipeline with tests; monitor and roll back | Working pipeline |
| E4 | SQL databases and data modelling (PostgreSQL) | important | 8/22 | E2 | Model data, write queries, store eval and usage data | Assignment with schema |
| E5 | TypeScript/Node for product-side and full-stack roles | important | 6/22 | – | Build the same AI endpoint in TypeScript | Usually known for frontend learners; confirm in placement |
| E6 | Auth and permissions for AI systems: OAuth/SSO, RBAC, service-to-service auth, audit logs | important | 4/22 (P6, P16, P18, P22) | E2 | Run agent actions under the user's permissions, not a superuser's | Security review of own app |

### F. AI-native workflow and collaboration

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| F1 | Working with non-engineering stakeholders: discovery, turning a vague workflow into a testable spec, explaining trade-offs and limits | core | 12/22 | – | Map a team's workflow, find the real bottleneck, and write a short spec with a success measure | Spec exercise + recorded explanation |
| F2 | Building with AI coding agents and verifying their output | important | 9/22 | – | Deliver a feature with an agent and show how its output was checked | Portfolio write-up; interview-style defence |
| F3 | Judging when not to use an LLM: rules, classic ML, or plain code | important | 6/22 (P5, P10, P11, P17, P18, P20) | C2 | Defend choosing a non-LLM solution with reasons and numbers | Scenario quiz |
| F4 | Measuring impact after launch: adoption, time saved, error rates, cost vs alternatives | important | 4/22 (P6, P16, P20, P21) | D1, D4 | Define and report the business metric an AI feature should move | Post-launch report on capstone |

### G. Model-side skills (ML variant)

These come from the ML-hybrid and classic-ML postings and from senior roles. The LLM-application variant doesn't need them to get hired, but G1 and G2 help with A5 and D5 decisions.

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| G1 | Fine-tuning and adapters (LoRA): when it pays compared with prompting or retrieval, and how to validate it on held-out data | important | 6/22 (required in P3, P7, P12; a plus in P5, P6, P13) | D1, E1 | Fine-tune a small model for one task and show whether it beats prompting a larger one | Eval report with a held-out set |
| G2 | Self-hosting open-weight models: vLLM or SGLang, load testing, GPU memory, quantization | important | 4/22 (P4, P5, P6; a plus in P9) | E3, D5 | Serve an open-weight model and compare its cost and latency with a hosted API | Load-test numbers |
| G3 | Deep learning and model training: PyTorch, classic ML (scikit-learn, XGBoost) | important (ML variant only) | 4/22 (P3, P8, P11, P12) | E1 | Train and evaluate a model; explain overfitting and validation | Notebook + defence |
| G4 | Transformer and NLP fundamentals: attention, embeddings, tokenisation | advanced | 2/22 (P3, P7) | A1 | Explain how a transformer produces a token and why context length costs what it does | Quiz |

## Learning order

Prerequisites above define the order. Evals (D1) come early on purpose: postings treat measuring quality as part of building, and agents (C2) need them.

**From backend:** A1 → A2 → A3 → A4 → D1 → B1 → B2 → C1 → C2 → D3 → C3 → C7 → D4 → D5 → C4 → C6 → C8 → A5 → D2/D6/D7 → F1/F3 (shown through the capstone) → capstone → portfolio (F2, F4). E1 first if Python is new; E2–E4 are usually known.

**From frontend:** E1 (Python basics) alongside A1 → A2 → A3 → A4 → D1 → C1 → C2 → B1 → B2 → D3 → C3 → E2 → E4 (with the modules that need a backend) → C7 → D4 → D5 → E3 → C4 → C6 → C8 → A5 → capstone → portfolio. Streaming (A7) and TypeScript (E5) transfer directly. If the learner prefers TypeScript, aim at postings that accept it (P17, P19, P20, P22) or at the AI Product Engineer pack.

**Capstone shape that matches the postings:** an internal-tool agent for a real workflow, with retrieval over company-like data, two or more tools, an approval step before actions, an eval set with a regression gate, tracing, a cost-per-task number, and a short write-up on what was *not* automated and why.

Group G only if the learner targets the ML-hybrid variant, or after the core as `full-role`.

## Market notes

**Turkey (2026-11):** Two postings read on employers' boards: [Vertigo Games](https://jobs.workable.com/view/vWYnBazyJt491HXikyC2a6/ai-engineer-in-istanbul-at-vertigo) (P14) hires an entry-friendly AI Engineer for internal agent workflows and automations, in Python, with daily coding-agent use; [ING Hubs Türkiye](https://careers.ing.com/en/job/istanbul/senior-agentic-ai-engineer/3121/44428104320) (P15) hires senior agentic AI engineers on LangGraph/LangChain/CrewAI/AutoGen with Kubernetes and Responsible AI. Other signals, not counted above:
- Sezzle's "AI Engineer I" and "AI Engineer II" roles for Türkiye (remote) appear on aggregators, but its Greenhouse board no longer lists them on 2026-11-24; only an "A.I. Engineering Intern (Remote)" for Türkiye is open (first published 2026-05-27).
- EY Türkiye's "Junior Applied AI Engineer" (Python, FastAPI, Azure OpenAI, RAG, structured outputs, evaluation harnesses, guardrails) was seen only on aggregators (Glassdoor, iAgora); not verified on EY's board.
- On kariyer.net, "Yapay Zeka Mühendisi" postings mix both definitions: e.g. Okyanus Eğitim Kurumları (dated 10.08.2026 in the page title: LLM systems, RAG, OCR pipelines, computer vision, integration with .NET backend teams) and Arge Bilişim (LLM, RAG, chatbots, multi-agent; closed 15.03.2026). Read from search snippets only; kariyer.net blocked direct reading.
- A blog citing kariyer.net postings gives an "AI Engineer" monthly average of 55,800 TL (median 52,000 TL; P10–P90 35,000–105,000 TL) for 2026 Q1 ([sukruyusufkaya.com](https://sukruyusufkaya.com/blog/ai-engineer-maas-raporu-turkiye-global-2026-levels-fyi), evidence: weak). It differs from kariyer.net's own 71,022 TRY figure in `roles.md`; the definitions and periods differ.

As in the AI Product Engineer pack, Turkish postings ask for daily coding-agent use and the habit of verifying its output (P14; Wingie Enuygun in that pack's notes).

**Germany and Netherlands (2026-11):** 4 of 5 postings require the local language (German in P11, P12; Dutch in P13; P1 and P10 work in English). Two of the three ML-hybrid postings are German corporates (SIXT, Thalia), which still expect PyTorch next to LLM skills.

**US (2026-11):** Most postings are internal-tool or product agents with evals and guardrails (P17, P18, P22). The one with a published range, Anthropic's Applied AI Engineer, Commercial (P19), lists USD 280,000–320,000.

**Gulf and India (2026-11):** P4 (Riyadh) requires Arabic and English and leans towards self-hosted serving (vLLM, on-premises GPUs). P3 (India, ₹15–22 LPA) is ML-hybrid; P20 (GitLab, Bangalore) is pure LLM-application work.

## Sources

- The postings in the table above (read 2026-11-24).
- [Anthropic – Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (checked 2026-11-24): client vs server tools, strict tool use, tool runner, MCP connector, memory tool, tool search, Claude Managed Agents.
- [OpenAI – Function calling guide](https://developers.openai.com/api/docs/guides/function-calling) (checked 2026-11-24): Responses API, strict mode via structured outputs, built-in tools, tool search, Agents SDK.
- [Google – Gemini function calling](https://aistudio.google.com/docs/function-calling) (checked 2026-11-24): modes `auto`, `any`, `none`, `validated`; parallel and compositional calling; tool search with deferred loading. Only the first part of the page was read.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (page dated 2026-08-03). The numbered list was checked through secondary sources, including the [Cloud Security Alliance](https://cloudsecurityalliance.org/blog/2026/10/21/the-owasp-top-10-for-llm-applications-2026-what-changed-and-why-it-matters) (2026-10-21), not the official PDF.
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (published 2025-12-09). Item numbers not checked.
- [Sezzle Greenhouse board API](https://boards-api.greenhouse.io/v1/boards/sezzle/jobs) (checked 2026-11-24), for the Turkey note.

## Changelog

- 2026-11-24: first version, from 22 postings (11 markets).
