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

**Priority** comes from the postings above:
- `core`: in at least half of them (9 or more of 18), or part of the role's definition.
- `important`: in 3 or more.
- `advanced`: in 1–2, or only in senior or staff postings.

**Seen in** counts the postings that ask for the skill. P18 was only partly read, and OpenAI's identical texts are counted once, so every count is a lower bound. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.

The skills follow what current model APIs offer. All three providers offer function calling. Anthropic and OpenAI also offer remote MCP servers from the API, strict schemas for tool calls, and packaged skills. Gemini offers function-calling modes, parallel and compositional calls. Sampling parameters and model internals are not skills here: no posting asks for them. Fine-tuning (B7) is included because three postings ask for it.

### A. LLM application foundations

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| A1 | How models behave and how to choose one: tokens, context window, statelessness, non-determinism, cost and latency per request, capability vs latency vs cost | core | definition; trade-offs named in 3/18 | – | Estimate a workload's tokens, cost and latency; choose a model for a customer use case and defend the choice | Scenario quiz with numbers |
| A2 | Calling model APIs from production code: keys and secrets, errors, retries, timeouts, fallbacks, streaming | core | 13/18 require shipped LLM systems | A1 | Call a model from a backend service that survives rate limits, timeouts and provider errors | Assignment: service with failure injection |
| A3 | Prompt and context engineering: system prompts, examples, grounding in customer data, keeping context small | core | 6/18 named; implied by the 13 above | A1 | Write a prompt that holds its format on the customer's real data and declines outside its scope | Test cases including out-of-scope inputs |
| A4 | Structured output: strict schemas for tool calls and responses, validation, retry with feedback | important | rarely named; every integration in B5 depends on it | A2 | Get schema-valid data from a model and handle invalid output without crashing the integration | Assignment with a validator |

### B. Agents, tools, and customer systems

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| B1 | Tool use (function calling): describing tools, handling tool calls and results, parallel calls, forcing or limiting tool use | core | 6/18 named; needed by the 12 agent postings | A3, A4 | Give a model 3+ tools over a customer's API and run the full call/result loop safely | Assignment with three tools |
| B2 | Agent design: multi-step loops (plan-and-execute, ReAct), state, stop conditions, human approval, and when a fixed workflow beats an agent | core | 12/18 | B1, C1 | Build a bounded agent with approval before side effects; explain why a step is or isn't agentic | Assignment + defence questions |
| B3 | MCP: build an MCP server that exposes a customer system with scoped permissions; connect agents to remote MCP servers | important | 5/18 | B1 | Ship an MCP server over a real API and use it from two different agent clients | Working server + permission review |
| B4 | Grounding in customer data: retrieval, embeddings and vector stores vs long context vs direct queries | important | 3/18 | A3 | Choose and build retrieval for a customer's documents, and show accuracy before and after | Eval of answer accuracy |
| B5 | Enterprise integration: REST APIs, webhooks, SaaS systems (CRM, ERP, ticketing), legacy systems and messy data formats; learning an unfamiliar codebase quickly | core | 12/18 | A4 | Connect an agent to two systems you didn't write, including one with poor documentation, and handle its failure modes | Assignment against an unfamiliar API |
| B6 | Packaging agent capabilities for reuse: skills, sub-agents, harnesses, vendor agent builders | important | 5/18 | B2 | Turn a one-off agent into a reusable skill or sub-agent that another team can install | Packaged deliverable used in a second project |
| B7 | Customising models: when fine-tuning beats prompting and retrieval, how to prepare data, how to evaluate the result | important | 3/18 (ML-leaning postings: Cohere, Mistral lead, Palantir) | C1, B4 | Argue for or against fine-tuning for a use case with an eval-based comparison | Design review; optional small experiment |

### C. Quality, safety, and operations

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| C1 | Evals: success criteria agreed with the customer, golden datasets, regression suites, LLM-as-a-judge, comparing versions | core | 9/18 | A3 | Build an eval set from the customer's real cases and use it to accept or reject a prompt, model or agent change | Eval report with before/after |
| C2 | Guardrails and failure handling: validation, layered checks, fallbacks, human in the loop, graceful degradation | important | 4/18 | A4, C1 | Detect and contain bad output and failed tool calls before they reach a user or a customer system | Failure-case tests |
| C3 | Security, data handling and governance in someone else's environment: OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM02:2026 Sensitive Information Disclosure, LLM03:2026 Excessive Agency), least-privilege tools, audit logs, compliance limits | important | 8/18 | B1, D7 | Threat-model a deployment; limit tool permissions; keep sensitive data out of prompts and logs; produce an audit trail | Red-team exercise + security review |
| C4 | Observability, debugging and operating what you ship: traces of model and tool calls, logs, finding why an agent did something, upgrades, incident response | important | 7/18 | A2 | Trace a failed agent run to its cause; write a runbook the customer's team can follow | Debugging assignment + runbook |
| C5 | Cost and latency: model choice, caching, batching, token budgets, per-tenant limits | important | 3/18 + OWASP LLM06:2026 (Unbounded Consumption) | A1, C4 | Cut cost or latency per task without lowering the eval score | Before/after numbers |

### D. Production engineering in the customer's environment

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| D1 | Python for production services and scripts | core | 12/18 (+1 as a plus) | – | Write, test and package a Python service | Usually known by backend developers; confirm in placement |
| D2 | TypeScript/JavaScript as a second language | core | 10/18 | – | Read and change a Node.js or TypeScript codebase | Small task |
| D3 | A UI when the problem needs one (React or similar), accessible | important | 5/18 | D2 | Build a small internal tool or review screen for a customer's operators | Assignment; accessibility check |
| D4 | Backend services, API design, system design, distributed systems | important | 8/18 | – | Design a service that fits into an existing architecture and explain the trade-offs | Design review |
| D5 | Data: SQL, data modelling, pipelines, warehouses | important | 8/18 | D4 | Query and reshape the customer's data; build a small pipeline feeding an agent | Assignment |
| D6 | Cloud and deployment into customer-owned environments: containers, Kubernetes, IaC (Terraform), CI/CD, networking basics | important | 8/18 | D4 | Deploy a service into an account or cluster you don't own, with infrastructure as code and a rollback path | Working deployment |
| D7 | Identity and access in enterprise systems: OAuth/OIDC, service accounts, mTLS, secrets | important | 3/18 | D4 | Connect to a customer system with the least privilege it allows; rotate a secret without downtime | Assignment + review |

### E. AI-native development workflow

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| E1 | Building with AI coding agents: specs and acceptance tests an agent can run, checking its output, using agents to learn an unfamiliar codebase fast | important | 4/18 | – | Deliver an integration with a coding agent and show how its output was verified | Portfolio write-up; defence |

### F. Customer-facing delivery

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| F1 | Discovery and problem framing: learn how the work is really done, find where AI helps, turn a vague request into a problem statement with success criteria | core | 15/18 | – | Run a discovery session from notes or a recording and produce a one-page problem statement with measurable success criteria | Role-play discovery + written output |
| F2 | Scoping and owning delivery: MVP scope, sequencing, trade-offs between scope, speed and quality, raising risks early, from prototype to production | core | 13/18 | F1 | Write a scoped delivery plan with milestones and risks, and re-plan when a blocker appears | Scoping exercise with a mid-way change |
| F3 | Communicating with technical and non-technical stakeholders: explaining model limits, technical credibility with the customer's architects, saying no with reasons | core | 13/18 | – | Explain a design and its limits to an engineer and to an executive; push back on a bad request with evidence | Two recorded or written explanations |
| F4 | Demos, prototypes and proofs of concept that show value fast and are honest about limits | important | 7/18 | F1, B2 | Build a working prototype on realistic data in a time box and demo it, limits included | Recorded demo |
| F5 | Writing that outlives you: playbooks, runbooks, reference architectures, handover docs | core | 14/18 | F2 | Write a handover pack so the customer's team can run and extend the system without you | Doc review: can someone else follow it? |
| F6 | Turning field signal into product input: spotting repeated patterns, writing them up for the product and research teams, deciding what belongs in the core product | core | 11/18 | F5 | Write a field report that separates one-off customisation from a reusable product gap | Written report |
| F7 | Measuring impact and driving adoption: a baseline before you build, adoption and workflow metrics after, helping users change how they work | important | 5/18 | F1, C1 | Show a before/after on a business metric for a shipped solution | Impact report |
| F8 | Domain fluency in one vertical (finance, healthcare, security, public sector…) | important | 5/18, mostly as a plus | F1 | Use the vertical's terms, constraints and regulations correctly in a design | Scenario quiz in the chosen vertical |

## Learning order

The prerequisites above set the order. A typical path for a backend or full-stack developer, who usually has D1 or D2, D4 and D5 already:

1. Foundations: A1 → A2 → A3 → A4.
2. Tools, evals and integration: B1 → C1 → B5.
3. Agents and safety: B2 → C2 → C3 (with D7) → B3.
4. Running in production: C4 → C5.
5. Breadth: B4 → B6 → D6 and D3 where needed.
6. Capstone: a "customer deployment" with a discovery note, scope, eval report, runbook, demo and field report.
7. Optional: B7 and F8.

Start the customer skills with the first assignment instead of leaving them for the end. Every assignment begins with a short problem statement and success criteria (F1, F2) and ends with a handover note (F5). Postings rank these skills as high as the engineering ones, and they only improve with practice.

Evals (C1) come before agents (B2) on purpose. Postings ask the FDE to prove a deployment works with evidence the customer accepts, not by demo.

If the learner is aiming at an employer that hires the implementation variant (like P15), F1–F4 and B5 matter more and B6–B7 matter less. The plan should say so.

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

- 2026-11-24: first version, from 18 postings.
