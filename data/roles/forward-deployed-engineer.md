---
role: forward-deployed-engineer
title: Forward-Deployed Engineer
status: researched
last_researched: 2026-11-24
postings_reviewed: 18
---

# Role pack: Forward-Deployed Engineer

This file lists what someone in this role is expected to know, how important each skill is, the order to learn the skills in, and how to check each one. `/respec plan` builds the coverage map and the curriculum from this file, and `/respec update-trends` refreshes it. The format is described in `data/roles/README.md`.

## The role in 2026

**Key finding:** in current postings at AI companies, a Forward-Deployed Engineer (FDE) is **a production engineer who works with the customer on the customer's systems and owns one deployment from discovery to a system that keeps running.** In 2026 that system is nearly always an LLM agent or workflow connected to the customer's tools and data. 13 of the 18 postings below require experience shipping LLM-powered systems, and 3 more list it as a plus. The engineering is ordinary backend and integration work (APIs, data, cloud, auth) plus the LLM layer (agents, tools, MCP, evals, guardrails). What separates the role from an AI Engineer is the customer side:
- running discovery and turning a vague business problem into a scoped plan with success criteria,
- demos and prototypes,
- writing playbooks and runbooks,
- sending what you learn in the field back to the product team.

OpenAI's postings put it plainly: you own "discovery, technical scoping, system design, build, and production rollout" and are measured on "production adoption, measurable workflow impact, and eval-driven feedback" ([P2](#postings-reviewed)).

Other things the postings agree on:
- **Travel:** 20–50% (Anthropic 25–50%, OpenAI up to 50%, Cohere 20–40%, Enode up to 50%, Palantir up to 25%).
- **Experience:** usually 4+ or 5+ years. Refold (2–4 years) and Handshake (3+ years) are lower. Palantir and Handshake also hire at entry level (Palantir's "New Grad" FDSE, Handshake's "Forward Deployed Engineer I" in India; titles only, not read).
- **Language:** in non-English markets, the local language is often required on top of English (Korean at Cohere Korea, Spanish at ElevenLabs Mexico, Turkish at Mundi Istanbul).

**Sales-role rebrands.** A 2025 analysis of 1,000 FDE postings split them into "Builder FDE" (60%), "Sales Engineer+" (30%) and "Internal Tools Builder" (10%) ([Bloomberry](https://bloomberry.com/blog/i-analyzed-1000-forward-deployed-engineer-jobs-what-i-learned/), data from January to October 2025; evidence: weak, a vendor's analysis). In this sample:
- 1 of 18 is clearly an implementation or solutions role under the FDE title: Tennr ([P15](#postings-reviewed)) pays up to $35K commission, asks for "enterprise SaaS delivery or solution design" and names neither coding nor LLMs.
- 3 more combine engineering with pre-sales work: Armadin's "pre-sales scoping", Refold's proofs of concept "during the sales cycle", and Kong's "pilot to paid".

The sample leans toward AI companies' own boards, so it under-counts the rebranded type. Lightcast's top US posters in 2026 are consultancies (Deloitte, Accenture, KPMG), and none of their postings were read. Several employers post the non-engineering half of the job under a separate title: Deployment Strategist (Mistral, ElevenLabs, Wonderful, Palantir), AI Deployment Manager and Deployment Lead (OpenAI). **This pack covers the engineering variant.**

Other titles for the same work:
- Forward Deployed Software Engineer (FDSE)
- Forward Deployed AI Engineer
- Applied AI Engineer (at Mistral, as "Applied AI, Forward Deployed …")
- Frontier Agents Engineer (Scale AI)
- Agent Deployment Engineer (Decagon)
- Full-Stack Software Engineer (Forward Deployed) (Scale AI)

**Contradicts roles.md:** the definition there still holds. Two things are missing from it: an internal variant also exists (MeridianLink's FDE embeds with the company's own business teams, [P10](#postings-reviewed)), and MCP servers and agent packaging (skills, sub-agents, harnesses) now show up as deliverables in their own right.

## Postings reviewed

All postings were read on 2026-11-24 from the employers' own boards, through the Greenhouse, Lever and Ashby public APIs and Firecrawl job search. **Posted** is the date the board gives. Where a board shows both a first-published date and an updated date, both are given. Postings older than 60 days that were still open are kept and marked.

| # | Company | Title | Location | Posted | Read from | Stack and notes |
|---|---|---|---|---|---|---|
| P1 | [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5423029008) | Forward Deployed Engineer | London | 2026-09-14 | board | Python, plus TypeScript or Java ideally; prompt engineering, agents, evals, deployment at scale; delivers "MCP servers, sub-agents, and agent skills"; discovery with customers; codify deployment patterns; travel 25–50%; £225–255K. Same title also open in Munich and Paris (not read). |
| P2 | [OpenAI](https://jobs.ashbyhq.com/openai/9471b38b-f65c-4a01-9626-bd33fca90f1d) | Forward Deployed Engineer (FDE) – NYC | New York | 2026-11-05 | board | Full stack, Python or JavaScript; owns discovery → scoping → design → build → rollout; eval-driven feedback; trade-offs between scope, speed and quality; playbooks; travel up to 50%; $185–300K. The text matches the [Dublin](https://jobs.ashbyhq.com/openai/b40efa93-da3c-4593-bc98-03d203cd0488) (2026-11-23) and [Abu Dhabi](https://jobs.ashbyhq.com/openai/e9d435e1-1b9e-4715-84ce-75f372e5559c) (2026-09-21) postings word for word, so it is counted once. |
| P3 | [Cohere](https://jobs.ashbyhq.com/cohere/031c2335-db85-4265-8a88-a54b911be36a) | Forward Deployed Engineer, Agentic Platform (Korea) | Korea | 2026-10-13 | board | Python, JS/TS; agents (ReAct), RAG, vector DBs, tool use, failure handling, fine-tuning agents; evaluation standards and regressions; guardrails; frontend "when the problem demands"; English and Korean; ₩230–315M. The [Europe](https://jobs.ashbyhq.com/cohere/2d256112-b336-4539-8133-a0bf7f6698f0) version (2026-05-12) is nearly the same. |
| P4 | [Mistral AI](https://jobs.ashbyhq.com/mistral.ai/dacccac8-1603-4d10-85d4-cde19389807e) | Applied AI, Technical Lead, Forward Deployed AI Engineer | London | 2026-10-09 | board | Lead level. Python, PyTorch, LangChain, Hugging Face; fine-tuning, RAG, agentic workflows; API design, full-stack, system architecture; leads pre-sales technical discussions; cloud and MLOps a plus. |
| P5 | [Palantir](https://jobs.lever.co/palantir/636fc05c-d348-4a06-be51-597cb9e07488) | Forward Deployed AI Engineer | New York | 2024-03-22 (still open) | board | LLM workflows into production; ML basics ("Evaluation, Training, Problem Decomposition"); data pipelines; Python, Java, C++ or TypeScript; sets the customer's AI strategy; travel up to 25%; $135–200K. An evergreen posting. |
| P6 | [Scale AI](https://job-boards.greenhouse.io/scaleai/jobs/4694861005) | Frontier Agents Engineer (Forward Deployed Engineering) | San Francisco | first 2026-05-15, updated 2026-11-18 | board | Python; distributed systems; LLM APIs, agent frameworks, MCP, retrieval; memory and context engineering; eval harnesses (golden datasets, regression suites, LLM-as-a-judge); tracing, guardrails, human in the loop, retries and fallbacks; Docker, Kubernetes, IaC, CI/CD; architecture workshops with customers; $180–225K. |
| P7 | [Scale AI](https://job-boards.greenhouse.io/scaleai/jobs/4673310005) | Senior Full-Stack Software Engineer (Forward Deployed), GPS | London | first 2026-03-24, updated 2026-11-18 | board | React (required), TypeScript, Next.js, Python, Node.js, PostgreSQL or MongoDB, Docker, Kubernetes, Azure/AWS/GCP; deploys inside public-sector customers' infrastructure; LLM solutions. Also posted for Riyadh and Kuwait City. |
| P8 | [Armadin](https://jobs.ashbyhq.com/armadin/a9a8c8e2-3b1b-43fc-811a-e54a2a5a8c2b) | Forward Deployed Engineer | Palo Alto | 2026-11-02 | board | Security startup. From pre-sales scoping to expansion; integrations and agent configuration; AWS, Terraform, containers, networking, "deployments into customer-owned environments"; upgrades and incidents; runbooks; Go, Python or TypeScript a plus. |
| P9 | [UiPath](https://jobs.ashbyhq.com/uipath/5e7cf364-8056-491c-ba08-e3d6411712ab) | Senior Forward Deployed Engineer | Paris | 2026-11-20 | board | Python or TypeScript; agents on UiPath's platform; prompt engineering; "model tradeoffs (capability, latency, cost)"; APIs, SDKs, connectors; debugging across inference, data pipelines and orchestration; telemetry and traces; reports risks and scope issues. |
| P10 | [MeridianLink](https://jobs.ashbyhq.com/meridianlink/a16eea89-1e97-4b61-8fbf-4ffa97ac32c7) | Forward Deployed AI Engineer | Remote (US) | 2026-11-23 | board | Internal FDE (embedded with the company's own business teams). Claude Projects, Skills, Claude Code; MCP and connectors to Salesforce, NetSuite, Jira, Microsoft 365, Databricks; prompts, evals, guardrails; problem statements, success metrics, MVP scope; measured baseline and result for every solution; REST, webhooks, auth, SQL; "run a discovery session and a demo in the same afternoon"; $114.6–230K. |
| P11 | [Enode](https://jobs.ashbyhq.com/enode/83f20587-d383-46fa-be89-53cda7a83dbd) | Forward Deployed Engineer | Remote (Europe) | 2026-11-23 | board | Energy platform. Discovery to production in legacy customer architectures; production code "in the customer's environment and in Enode, and know which is which"; agents, harnesses, customer-facing MCP servers; works with AI in the loop by default; travel up to 50%. |
| P12 | [Refold AI](https://jobs.ashbyhq.com/refoldai/c37ea990-850c-4cc2-a4fb-d3066f08d952) | Forward Deployed Engineer | Bengaluru | 2026-11-19 | board | 2–4 years. Enterprise integrations against "messy APIs; undocumented systems"; agentic workflows, data transformations; Python or Node.js; proofs of concept with pre-sales; reference architectures and runbooks; Salesforce, SAP, Workday, iPaaS a plus. |
| P13 | [Kong](https://jobs.ashbyhq.com/kong/79823f9d-9833-4eea-9cf4-67656eb72cda) | Forward-Deployed Engineer, AI Gateway (APJ) | Australia | 2026-11-20 | board | Go, Python or TypeScript; model APIs, tool calling, MCP, evaluation, cost and latency trade-offs; Kubernetes, OAuth/OIDC, mTLS, policy; discovery with platform and security teams; "pilot to paid"; "not a demo-only SE role". |
| P14 | [Handshake](https://jobs.ashbyhq.com/handshake/52be2db3-794d-466e-b3be-cae5d1ab5232) | Forward Deployed Engineer | San Francisco | 2026-11-20 | board | Customers are AI labs. React, TypeScript, accessibility; PostgreSQL and data modelling; AWS/GCP and deployment pipelines; rapid prototypes; playbooks; LLM production systems as "extra credit"; $151–189K. |
| P15 | [Tennr](https://jobs.ashbyhq.com/tennr/4e7ee6b1-8c70-4070-827d-9c50817059c7) | Sr. Forward Deployed Engineer (Post-Sales) | New York | 2026-11-13 | board | **Implementation/solutions variant:** up to $35K commission; "enterprise SaaS delivery or solution design"; APIs and systems integration; operational audits; project delivery and change management; healthcare domain; no coding or LLM requirement stated. |
| P16 | [Decagon](https://jobs.ashbyhq.com/decagon/30b94a32-66bb-49cb-8879-03c9d00240f0) | Agent Deployment Engineer | Australia | 2026-11-16 | board | Agent logic "across non-deterministic model outputs"; layered guardrails; integrations with CRMs and ticketing systems; debugging through execution traces; eval and regression frameworks against ground truth and drift; PRDs and success metrics a plus; A$213–266K. |
| P17 | [ElevenLabs](https://jobs.ashbyhq.com/ElevenLabs/8a573932-b1fb-4df7-9023-e13a6cecbbbb) | Forward Deployed Engineer – Software Engineer – Mexico | Remote (Mexico) | 2026-10-04 | board | Python, software architecture, API integration; works with customers' engineers and executives; English and Spanish. A short posting with no LLM requirement stated. Same title in the US, UK and Argentina (not read). |
| P18 | [Wonderful](https://jobs.ashbyhq.com/wonderful/e0f8fbae-802d-4c0a-b6dc-61afd146e46d) | Forward Deployed Engineer | Turkey | 2026-03-12 (still open) | board (partial: the board API text was missing words) | 5+ years; AI agents that integrate customer tools, data and processes; discovery → launch → monitoring; measures business outcomes on real data; APIs, integrations, distributed systems; LLM evaluation and observability a plus. |

## Skill tree

Each skill is defined once in [`data/skills.md`](../skills.md): what it is, its prerequisites, the outcomes, and how to check it. This table says how this role asks for it.

- **Priority** comes from the postings above: `core` = in at least half of them (9 or more of 18), or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior or staff postings. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.
- **Seen in** counts the postings that ask for the skill. P18 was only partly read, and OpenAI's identical texts are counted once, so every count is a lower bound.
- The skills follow what current model APIs offer (see the catalog). `ml.fine-tuning` is included because three postings ask for it.
- **Depth** is `basic`, `working`, or `deep`, as defined in the catalog. **In this role** is what this role adds to the catalog's outcomes.
- **Was** is the skill's ID in this pack up to v0.2.0. `scripts/migrate-state.mjs` uses it to update learners' states; it is removed in the release after v0.3.0. An old ID on more than one row was split.

### llm: LLM application foundations

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `llm.behavior` | How models behave | A1 | core | definition | working | – |
| `llm.model-choice` | Choosing a model | A1 | core | counted with `llm.behavior` (old A1); trade-offs named in 3/18 | working | Choose a model for a customer use case and defend the choice |
| `llm.api` | Calling model APIs from production code | A2 | core | 13/18 require shipped LLM systems | working | Fallbacks and streaming too |
| `llm.prompt-context` | Prompt and context engineering | A3 | core | 6/18 named; implied by the 13 above | working | On the customer's real data; keep the context small |
| `llm.structured-output` | Structured output | A4 | important | rarely named; every integration in `eng.integration` depends on it | working | Invalid output must not crash the integration |

### agent: Agents and tool use

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `agent.tool-use` | Tool use | B1 | core | 6/18 named; needed by the 12 agent postings | working | Three or more tools over a customer's API |
| `agent.loops` | Agent design | B2 | core | 12/18 | working | Plan-and-execute and ReAct loops |
| `agent.human-approval` | Approval before side effects | B2 | core | counted with `agent.loops` (old B2, 12/18) | working | – |
| `agent.mcp` | MCP | B3 | important | 5/18 | working | A server over a customer's real API, used from two different agent clients; remote MCP servers |
| `agent.packaging` | Packaging agent capabilities for reuse | B6 | important | 5/18 | working | – |

### rag: Retrieval and data

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `rag.design` | Grounding in customer data | B4 | important | 3/18 | working | Also direct queries against the customer's systems |
| `rag.search` | Embeddings and vector stores | B4 | important | counted with `rag.design` (old B4, 3/18) | working | – |

### quality: Quality, safety, and operations

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `quality.evals` | Evals | C1 | core | 9/18 | deep | Success criteria agreed with the customer; the eval decides whether a change is accepted |
| `quality.guardrails` | Guardrails and failure handling | C2 | important | 4/18 | working | Graceful degradation; failed tool calls must not reach a customer system |
| `quality.observability` | Observability, debugging and operating what you ship | C4 | important | 7/18 | working | Runbooks, upgrades and incident response the customer's team can follow |
| `quality.cost-latency` | Cost and latency | C5 | important | 3/18 + OWASP LLM06:2026 (Unbounded Consumption) | working | Per-tenant limits |

### sec: Security in someone else's environment

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `sec.prompt-injection` | Prompt injection | C3 | important | 8/18 ask for security, data handling, or governance | working | Least-privilege tools, audit trails, and the customer's compliance limits |
| `sec.excessive-agency` | Excessive agency | C3 | important | counted with `sec.prompt-injection` (old C3, 8/18) | working | – |
| `sec.data-disclosure` | Sensitive data disclosure | C3 | important | counted with `sec.prompt-injection` (old C3, 8/18) | working | – |

### eng: Production engineering in the customer's environment

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `eng.integration` | Enterprise integration | B5 | core | 12/18 | working | – |
| `eng.python` | Python | D1 | core | 12/18 (+1 as a plus) | working | Usually known by backend developers; confirm in placement |
| `eng.typescript` | TypeScript/JavaScript | D2 | core | 10/18 | basic | A second language: read and change a Node.js or TypeScript codebase |
| `eng.frontend` | A UI when the problem needs one | D3 | important | 5/18 | working | Small internal tools or review screens for the customer's operators, accessible |
| `eng.backend` | Backend services and system design | D4 | important | 8/18 | deep | – |
| `eng.sql` | Data | D5 | important | 8/18 | working | Query and reshape the customer's data; small pipelines feeding an agent; warehouses |
| `eng.deploy` | Deploying into customer-owned environments | D6 | important | 8/18 | working | Into an account or cluster you don't own, with a rollback path; networking basics |
| `eng.kubernetes` | Kubernetes | D6 | important | counted with `eng.deploy` (old D6, 8/18) | working | – |
| `eng.iac` | Infrastructure as code | D6 | important | counted with `eng.deploy` (old D6, 8/18) | working | Terraform |
| `eng.auth` | Identity and access in enterprise systems | D7 | important | 3/18 | working | Service accounts, mTLS; connect with the least privilege the customer's system allows |

### dev: Developing with AI coding agents

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `dev.directing` | Directing a coding agent | E1 | important | 4/18 | working | – |
| `dev.verify-output` | Verifying agent output | E1 | important | counted with `dev.directing` (old E1, 4/18) | working | – |
| `dev.lifecycle` | Agents across the lifecycle | E1 | important | counted with `dev.directing` (old E1, 4/18) | working | Using agents to learn an unfamiliar codebase fast |

### work: Customer-facing delivery

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `work.problem-framing` | Discovery and problem framing | F1 | core | 15/18 | working | Run a discovery session with the customer and find where AI helps |
| `work.delivery` | Scoping and owning delivery | F2 | core | 13/18 | working | – |
| `work.stakeholders` | Communicating with technical and non-technical stakeholders | F3 | core | 13/18 | working | Technical credibility with the customer's architects; saying no with reasons |
| `work.docs` | Writing that outlives you | F5 | core | 14/18 | working | – |
| `work.field-signal` | Turning field signal into product input | F6 | core | 11/18 | working | – |
| `work.prototyping` | Demos, prototypes and proofs of concept | F4 | important | 7/18 | working | – |
| `work.impact` | Measuring impact and driving adoption | F7 | important | 5/18 | working | A baseline before you build; helping users change how they work |
| `work.domain` | Domain fluency in one vertical | F8 | important | 5/18, mostly as a plus | working | – |

### ml: Model-side skills

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `ml.fine-tuning` | When fine-tuning pays | B7 | important | 3/18 (ML-leaning postings: Cohere, Mistral lead, Palantir) | basic | Argue for or against it with an eval-based comparison; a small experiment is optional |

## Learning order

The prerequisites above set the order. A typical path for a backend or full-stack developer, who usually has `eng.python` or `eng.typescript`, `eng.backend` and `eng.sql` already:

1. Foundations: `llm.behavior` → `llm.api` → `llm.prompt-context` → `llm.structured-output`.
2. Tools, evals and integration: `agent.tool-use` → `quality.evals` → `eng.integration`.
3. Agents and safety: `agent.loops` → `quality.guardrails` → the `sec` skills (with `eng.auth`) → `agent.mcp`.
4. Running in production: `quality.observability` → `quality.cost-latency`.
5. Breadth: `rag.design` → `agent.packaging` → `eng.deploy` and `eng.frontend` where needed.
6. Capstone: a "customer deployment" with a discovery note, scope, eval report, runbook, demo and field report.
7. Optional: `ml.fine-tuning` and `work.domain`.

Start the customer skills with the first assignment instead of leaving them for the end. Every assignment begins with a short problem statement and success criteria (`work.problem-framing`, `work.delivery`) and ends with a handover note (`work.docs`). Postings rank these skills as high as the engineering ones, and they only improve with practice.

Evals (`quality.evals`) come before agents (`agent.loops`) on purpose. Postings ask the FDE to prove a deployment works with evidence the customer accepts, not by demo.

If the learner is aiming at an employer that hires the implementation variant (like P15), `work.problem-framing`, `work.delivery`, `work.stakeholders`, `work.prototyping` and `eng.integration` matter more and `agent.packaging`, `ml.fine-tuning` matter less. The plan should say so.

## Market notes

**Turkey (2026-11):** a few FDE postings exist, mostly from global companies with Istanbul teams:
- [Wonderful](https://jobs.ashbyhq.com/wonderful/e0f8fbae-802d-4c0a-b6dc-61afd146e46d) (posted 2026-03-12, still open on 2026-11-24): AI agents for enterprise workflows.
- [Mundi](https://mundi.careers-page.com/jobs/430c0b2d-2818-4160-8124-35a1db2e4132) (Istanbul, on-site; posting date not shown): a treasury startup's first FDE. It connects customers' banks and ERPs, builds AI agents and GTM tooling, and asks for 2–5 years at a startup, "production code with AI in the loop", and Turkish and English (demos in Turkish, docs in English).
- EPAM Systems Turkey posted "Lead Forward Deployed Engineer" (2026-06-21) and "Forward Deployed Engineer/Chief Role" (2026-08-19) on [Kariyer.net](https://www.kariyer.net/is-ilani/epam-systems-turkey-yazilim-gelistirme-limited-sir-forward-deployed-engineer-chief-role-4536440). Both are closed. Search snippets mention AI agents, full-stack work, RAG, evaluation pipelines and production Python. The page itself couldn't be opened, so these details are unverified.
- BCG X's "Forward Deployed AI Engineer, Türkiye" (Istanbul) is marked filled on [BCG's careers page](https://careers.bcg.com/global/en/job/58912/Forward-Deployed-AI-Engineer-T%C3%BCrkiye-BCG-X).

Turkish-market FDE roles ask for the same agent and integration skills as global ones. They add Turkish for customer work and, at startups, some go-to-market work.

**EMEA (2026-11):** the frontier labs hire FDEs in Europe and the Gulf:
- OpenAI: London, Dublin, Paris, Munich, Zurich, Abu Dhabi.
- Anthropic: London, Munich, Paris.
- Cohere: Europe, Middle East.
- Mistral: Paris, London.
- Scale AI: London, Riyadh, Kuwait City.

Smaller companies hiring: UiPath (Paris), Enode (remote Europe), Kong (UK), Handshake (Sofia). This list comes from the boards' title listings on 2026-11-24; only the postings in the table were read in full.

**United States (2026-11):** Lightcast counted more than 7,300 US FDE postings in the first nine months of 2026, up from fewer than 200 in 2023. The median advertised salary was $195,456. The top posters were Deloitte (872), Accenture (688), Google (499) and KPMG (447) ([CNBC](https://www.cnbc.com/2026/10/15/aws-anthropic-racing-to-deploy-army-of-specialized-ai-engineers.html), 2026-10-15). Advertised ranges in this sample include:
- OpenAI: $185–300K
- Scale AI: $180–225K
- Handshake: $151–189K
- Palantir: $135–200K

**India (2026-11):** Handshake (Forward Deployed Engineer I, Senior) and Refold (Bengaluru) are hiring. Growth figures are in `data/market/roles.md`.

## Sources

- The postings in the table above (read 2026-11-24).
- [Lightcast – What is a Forward Deployed Engineer?](https://lightcast.io/resources/blog/forward-deployed-engineer-ai-job) (Elena Magrini, 2026-09-15): US postings went from about 200 (2024) to about 1,200 (2025), with more than 5,200 in the first seven months of 2026. FDE postings weight AI, workflow management and Python more than software engineer postings do.
- [CNBC – AWS, Anthropic race to deploy army of specialized engineers](https://www.cnbc.com/2026/10/15/aws-anthropic-racing-to-deploy-army-of-specialized-ai-engineers.html) (2026-10-15): Lightcast counts, top posters, median salary; Anthropic's Claude Frontier Academy ($100M to train 10,000 FDEs by the end of 2027); AWS's $1B FDE unit.
- [Bloomberry – I analyzed 1,000 forward deployed engineer jobs](https://bloomberry.com/blog/i-analyzed-1000-forward-deployed-engineer-jobs-what-i-learned/) (updated 2026-01-25; data from January to October 2025; evidence: weak, a vendor's analysis): the 60/30/10 split by type; Python in 66% of postings, TypeScript 35%, AI agents 35%, LLM experience 31%, RAG 12%.
- Provider docs, checked 2026-11-24, to keep the skills in line with what the APIs offer:
  - [Anthropic – Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview): client and server tools, strict tool use, MCP connector, tool runner.
  - [OpenAI – Using tools](https://developers.openai.com/api/docs/guides/tools): function calling, remote MCP servers, file search, Skills, Agents SDK.
  - [Gemini API – Function calling](https://aistudio.google.com/docs/function-calling): function-calling modes, parallel and compositional calls.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (published 2026-08-04).

## Changelog

- 2026-11-27: skill tree moved to the shared catalog (`data/skills.md`). Rows now point to catalog IDs; old IDs are in the `Was` column. Split: A1 into `llm.behavior` + `llm.model-choice`, B2 into `agent.loops` + `agent.human-approval`, B4 into `rag.design` + `rag.search`, C3 into three `sec` skills, D6 into `eng.deploy` + `eng.kubernetes` + `eng.iac`, E1 into `dev.directing` + `dev.verify-output` + `dev.lifecycle`. Counts and priorities unchanged.
- 2026-11-24: first version, from 18 postings.
