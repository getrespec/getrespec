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

Each skill is defined once in [`data/skills.md`](../skills.md): what it is, its prerequisites, the outcomes, and how to check it. This table says how this role asks for it.

- **Priority** comes from the postings above: `core` = in at least half of them (11+ of 22), or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.
- **Seen in** counts the postings above that ask for the skill; P4, P14 and P15 were read partly or as summaries, so counts are a lower bound.
- **Depth** is `basic`, `working`, or `deep`, as defined in the catalog. **In this role** is what this role adds to the catalog's outcomes.
- **Was** is the skill's ID in this pack up to v0.2.0. `scripts/migrate-state.mjs` uses it to update learners' states; it is removed in the release after v0.3.0. An old ID on more than one row was split.

### llm: LLM application foundations

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `llm.behavior` | How LLMs behave | A1 | core | definition; named in 4/22 (P4, P5, P7, P20) | working | – |
| `llm.api` | Calling LLM APIs from a server | A2 | core | 20/22 | working | – |
| `llm.prompt-context` | Prompt and context engineering | A3 | core | 12/22 | working | – |
| `llm.structured-output` | Structured output | A4 | important | 6/22 + implied by tool use | working | – |
| `llm.model-choice` | Model selection and migration | A5 | core | 11/22 | working | `ml.fine-tuning` and `ml.self-hosting` help with these decisions |
| `llm.multimodal` | Multimodal input and output | A6 | important | 3/22 (P4, P12, P13) | working | – |
| `llm.streaming` | Streaming with cancellation | A7 | advanced | 2/22 (P2, P4) | working | – |

### rag: Retrieval and data

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `rag.design` | RAG design and grounding | B1 | core | 15/22 | working | – |
| `rag.search` | Embeddings, vector and hybrid search | B2 | important | 8/22 | working | – |
| `rag.pipelines` | Document and data pipelines | B3 | important | 4/22 (P1, P3, P4, P6) | working | – |
| `rag.graph` | Knowledge graphs | B4 | advanced | 2/22 (P1, P5) | working | – |

### agent: Agents and tool use

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `agent.tool-use` | Tool use / function calling | C1 | core | 9/22 explicit; required by every agent posting (19/22) | working | – |
| `agent.loops` | Agent loops and orchestration | C2 | core | 19/22 | working | Agents that take actions in business systems (P13, P16, P18) |
| `agent.human-approval` | Human-in-the-loop and limits on autonomy | C3 | important | 6/22 (P5, P7, P13, P16, P18, P20) | working | – |
| `agent.mcp` | MCP | C4 | important | 4/22 (P11, P16, P18, P19) | working | – |
| `agent.multi` | Multi-agent systems | C5 | important | 6/22 (P4, P5, P7, P15, P19, P20); mostly senior postings | working | – |
| `agent.memory` | Agent memory and state | C6 | important | 5/22 (P1, P4, P5, P7, P16) | working | – |
| `agent.evals` | Agent evaluation | C7 | important | 5/22 (P5, P16, P18, P19, P20) | working | – |
| `agent.frameworks` | Agent frameworks and SDKs | C8 | important | 8/22 name a framework; LangChain/LangGraph 5/22 | working | Several postings say the stack is "not a filter" (P5, P13) |
| `agent.coding-agents-product` | Coding agents as a product | C9 | advanced | 2/22 (P6, P19) | working | – |

### quality: Quality, safety, and operations

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `quality.evals` | Evals | D1 | core | 16/22 | deep | A hiring filter: "evaluate against outcomes rather than model judges" (P5), "write evaluation harnesses before scaling pipelines" (P1) |
| `quality.guardrails` | Guardrails and failure handling | D2 | important | 7/22 | working | – |
| `quality.security` | LLM and agent security | D3 | core | 13/22 ask for security, privacy, or access control; prompt injection named in 3/22 | working | – |
| `quality.observability` | Observability for LLM systems | D4 | core | 11/22 | working | – |
| `quality.cost-latency` | Cost and latency | D5 | core | 13/22 + OWASP LLM06:2026 (Unbounded Consumption) | working | – |
| `quality.reliability` | Production reliability | D6 | important | 6/22 | working | – |
| `quality.release` | Release discipline for AI changes | D7 | important | 5/22 (P5, P7, P13, P16, P18) | working | – |

### eng: Software engineering around the model

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `eng.python` | Python for AI services | E1 | core | 19/22 (17 require Python; 2 accept Python or TypeScript) | working | – |
| `eng.backend` | Backend APIs and integrations | E2 | core | 15/22 | working | Internal-tool postings add business systems: CRM, support desks, SSO |
| `eng.deploy` | Deploy and run | E3 | core | 13/22 | working | – |
| `eng.sql` | SQL and data modelling | E4 | important | 8/22 | working | – |
| `eng.typescript` | TypeScript/Node | E5 | important | 6/22 | working | For product-side and full-stack variants |
| `eng.auth` | Auth and permissions for AI systems | E6 | important | 4/22 (P6, P16, P18, P22) | working | – |

### work: Workflow and collaboration

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `work.problem-framing` | Starting from the problem | F1 | core | 12/22 | working | – |
| `work.stakeholders` | Working with non-engineering stakeholders | F1 | core | counted with `work.problem-framing` (old F1, 12/22) | working | Explaining trade-offs and limits to the teams an internal tool is for |
| `work.coding-agents` | Building with AI coding agents | F2 | important | 9/22 | working | – |
| `work.when-not-ai` | Judging when not to use an LLM | F3 | important | 6/22 (P5, P10, P11, P17, P18, P20) | working | – |
| `work.impact` | Measuring impact after launch | F4 | important | 4/22 (P6, P16, P20, P21) | working | – |

### ml: Model-side skills (ML variant)

These come from the ML-hybrid and classic-ML postings and from senior roles. The LLM-application variant doesn't need them to get hired, but `ml.fine-tuning` and `ml.self-hosting` help with `llm.model-choice` and `quality.cost-latency` decisions.

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `ml.fine-tuning` | Fine-tuning and adapters | G1 | important | 6/22 (required in P3, P7, P12; a plus in P5, P6, P13) | working | – |
| `ml.self-hosting` | Self-hosting open-weight models | G2 | important | 4/22 (P4, P5, P6; a plus in P9) | working | – |
| `ml.training` | Deep learning and model training | G3 | important (ML variant only) | 4/22 (P3, P8, P11, P12) | working | – |
| `ml.transformers` | Transformer and NLP fundamentals | G4 | advanced | 2/22 (P3, P7) | basic | – |

## Learning order

Prerequisites above define the order. Evals (`quality.evals`) come early on purpose: postings treat measuring quality as part of building, and agents (`agent.loops`) need them.

**From backend:** `llm.behavior` → `llm.api` → `llm.prompt-context` → `llm.structured-output` → `quality.evals` → `rag.design` → `rag.search` → `agent.tool-use` → `agent.loops` → `quality.security` → `agent.human-approval` → `agent.evals` → `quality.observability` → `quality.cost-latency` → `agent.mcp` → `agent.memory` → `agent.frameworks` → `llm.model-choice` → `quality.guardrails`/`quality.reliability`/`quality.release` → `work.problem-framing`/`work.when-not-ai` (shown through the capstone) → capstone → portfolio (`work.coding-agents`, `work.impact`). `eng.python` first if Python is new; `eng.backend`, `eng.deploy` and `eng.sql` are usually known.

**From frontend:** `eng.python` (Python basics) alongside `llm.behavior` → `llm.api` → `llm.prompt-context` → `llm.structured-output` → `quality.evals` → `agent.tool-use` → `agent.loops` → `rag.design` → `rag.search` → `quality.security` → `agent.human-approval` → `eng.backend` → `eng.sql` (with the modules that need a backend) → `agent.evals` → `quality.observability` → `quality.cost-latency` → `eng.deploy` → `agent.mcp` → `agent.memory` → `agent.frameworks` → `llm.model-choice` → capstone → portfolio. Streaming (`llm.streaming`) and TypeScript (`eng.typescript`) transfer directly. If the learner prefers TypeScript, aim at postings that accept it (P17, P19, P20, P22) or at the AI Product Engineer pack.

**Capstone shape that matches the postings:** an internal-tool agent for a real workflow, with retrieval over company-like data, two or more tools, an approval step before actions, an eval set with a regression gate, tracing, a cost-per-task number, and a short write-up on what was *not* automated and why.

The `ml` skills only if the learner targets the ML-hybrid variant, or after the core as `full-role`.

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
- Provider docs behind the skill wording (Anthropic, OpenAI, Google; checked 2026-11-24): see `data/skills.md` → Sources.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (page dated 2026-08-03). The numbered list was checked through secondary sources, including the [Cloud Security Alliance](https://cloudsecurityalliance.org/blog/2026/10/21/the-owasp-top-10-for-llm-applications-2026-what-changed-and-why-it-matters) (2026-10-21), not the official PDF.
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (published 2025-12-09). Item numbers not checked.
- [Sezzle Greenhouse board API](https://boards-api.greenhouse.io/v1/boards/sezzle/jobs) (checked 2026-11-24), for the Turkey note.

## Changelog

- 2026-11-27: skill tree moved to the shared catalog (`data/skills.md`). Rows now point to catalog IDs; old IDs are in the `Was` column. F1 split into `work.problem-framing` and `work.stakeholders`. Counts and priorities unchanged; `quality.evals` marked `deep`, `ml.transformers` `basic`.
- 2026-11-24: first version, from 22 postings (11 markets).
