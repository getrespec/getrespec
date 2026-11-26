---
last_checked: 2026-11-27
---

# Skill catalog

Every skill a role pack can ask for, defined once: what it is, what the learner can do at the end, and how to check it. Role packs (`data/roles/*.md`) don't redefine skills; they point to IDs here and add what is specific to the role: priority, how many of their postings ask for it, depth, and what the role adds. Job titles vary a lot; the skills behind them mostly don't, so a learner's progress is recorded against these IDs and carries over when they change role or add a posting from another title.

## Rules

- **IDs** are `<area>.<slug>`, lowercase English, and never renamed. Learners' states refer to them. A skill that is no longer needed moves to "Retired" with the date and the reason; its ID is never reused.
- **One skill, several depths.** Packs set a depth per skill:
  - `basic`: can explain it and use it with docs or an example at hand. Checked with a quiz and a small task.
  - `working`: the "Can do" outcomes below, done alone in a real feature. Checked as in "How to check".
  - `deep`: `working` plus "Deep adds". Checked with the same check at a larger scope and defence questions on the trade-offs.
- **When a role needs something different in kind,** not in depth, add a new skill here instead of stretching an existing one.
- **No priorities or posting counts here.** Those belong to one role's postings and stay in its pack; counts from different packs are never added together.
- **Skills follow what the frontier model APIs expose today** (checked 2026-11-24 against Anthropic, OpenAI, and Google docs; see Sources): tool definitions with JSON Schema, strict or validated schema adherence, parallel tool calls, provider-hosted tools (web search, code execution), tool search for large tool sets, MCP connections, and agent SDKs. Sampling parameters and model internals are not skills here: no posting asks for them.
- `/respec update-trends` edits skills here (wording, outcomes, docs alignment) and counts and priorities in the packs.

## llm: LLM application foundations

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `llm.behavior` | How LLMs behave in an API call: tokens, context window, output limits, statelessness, non-determinism, cost per token, and which settings the current models accept | – | Estimate a request's tokens and cost; predict what history length and output limits change; explain why the same input can give different outputs and what that means for testing; check the provider docs before relying on a setting | – | Scenario quiz with numbers |
| `llm.api` | Calling LLM APIs from a server: provider SDKs, keys kept server-side, errors, rate limits, retries, timeouts | `llm.behavior` | Call two providers' APIs safely from a service; handle rate limits, timeouts, and failed calls | – | Assignment: endpoint with failure handling |
| `llm.prompt-context` | Prompt and context engineering: system prompts, examples, delimiters, grounding, what goes into the context and in what order | `llm.behavior` | Write a prompt that holds its format, stays in scope, and uses only supplied sources; manage context in multi-turn flows | – | Test cases including out-of-scope questions |
| `llm.structured-output` | Structured output: JSON Schema, strict mode / constrained decoding, validation, retry with feedback | `llm.api` | Get schema-valid data from a model and handle the cases where it isn't | – | Assignment with a validator |
| `llm.model-choice` | Model selection and migration: compare models on quality, latency, and cost; pin versions; migrate between models or providers safely | `llm.api`, `quality.evals` | Choose a model for a task with eval numbers; swap models behind an interface without regressions | – | Eval report comparing two models |
| `llm.multimodal` | Multimodal input and output: images, documents (PDF), audio | `llm.api` | Send documents or images to a model and extract structured data from them | – | Assignment on a document set |
| `llm.streaming` | Streaming responses to clients, with cancellation | `llm.api` | Stream a response and cancel the upstream call when the client leaves | – | Assignment |

## rag: Retrieval and data

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `rag.design` | Grounding with your data: long context vs retrieval, chunking, answers grounded in sources with citations | `llm.prompt-context` | Choose between putting data in context and retrieving it; build a grounded Q&A over a document set | – | Eval of answer accuracy and citation correctness before/after |
| `rag.search` | Embeddings, vector and hybrid search, reranking (e.g. pgvector, Qdrant) | `rag.design` | Index a corpus, combine keyword and vector search, measure retrieval quality (recall@k) | – | Retrieval eval with a labelled set |
| `rag.pipelines` | Document and data pipelines: ingestion, extraction from unstructured text, entity resolution | `llm.structured-output`, `rag.design` | Turn messy documents into validated, structured records | – | Assignment with extraction accuracy measured |
| `rag.graph` | Knowledge graphs and graph retrieval (e.g. Neo4j, Cypher) | `rag.design` | Model entities and relations; answer questions by generating graph queries | – | Design review + small build |

## agent: Agents and tool use

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `agent.tool-use` | Tool use / function calling: tool schemas and descriptions, forcing or limiting tool choice, parallel calls, returning results and errors to the model, provider-hosted tools | `llm.prompt-context`, `llm.structured-output` | Give a model three tools, run the call → result round trip, handle a failing tool and a malformed call | – | Assignment with tests for each tool path |
| `agent.loops` | Agent loops and workflow orchestration: bounded loops, stop conditions, state, retries, rollback; choosing a fixed workflow vs an autonomous agent | `agent.tool-use`, `quality.evals` | Build an agent that completes a multi-step task within a step and cost budget, and explain why it isn't a fixed workflow (or is) | – | Assignment + defence questions |
| `agent.human-approval` | Human-in-the-loop and limits on autonomy: approval before actions, escalation, audit trails, what the agent may do alone | `agent.loops` | Add approval gates to risky actions and a log that shows who approved what | – | Scenario review of an agent's action list |
| `agent.mcp` | MCP: connect agents to MCP servers, and expose a system's data and actions through a small server with scoped permissions | `agent.tool-use` | Expose a system's data and actions through an MCP server; use it from an agent; limit what it can do | – | Working server used from an agent |
| `agent.multi` | Multi-agent systems: orchestrator and sub-agents, hand-offs, and judging when they are over-built | `agent.loops`, `agent.evals` | Split a task across agents and show, with evals, whether it beats a single agent | – | Ablation report |
| `agent.memory` | Agent memory and state across sessions | `agent.loops`, `rag.design` | Store and retrieve per-user or per-task memory; keep it from leaking between users | – | Design review + test |
| `agent.evals` | Agent evaluation: task success, tool-call correctness, trajectories, cost per task; turning production failures into test cases | `agent.loops`, `quality.evals` | Build an eval set for an agent and find where it fails (model, retrieval, tool, or business rule) | – | Eval report with failure breakdown |
| `agent.frameworks` | Agent frameworks and SDKs: one framework (LangGraph, LangChain) or provider agent SDK, learned after building a loop by hand | `agent.loops` | Rebuild a hand-written agent in a framework and say what it adds and costs | – | Assignment + write-up |
| `agent.coding-agents-product` | Coding agents as a product: agents that work in repositories and run tests within permissions | `agent.loops`, `agent.human-approval` | Wire an agent to a repo with tests as the gate and limited permissions | – | Working demo |

## quality: Quality, safety, and operations

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `quality.evals` | Evals: test sets from real usage, graders (code checks, human labels, model graders), regression checks, "what does correct look like" | `llm.prompt-context` | Build an eval set and compare two prompt, model, or retrieval versions with numbers | Graders checked against human labels; a regression gate in CI; online evals on production traffic | Eval report with before/after |
| `quality.guardrails` | Guardrails and failure handling: hallucination control, output validation, grounding, deterministic checks, human in the loop, safe fallbacks | `llm.structured-output`, `quality.evals` | Detect and contain bad output before it reaches a user or a system | – | Failure-case tests |
| `quality.security` | LLM and agent security: OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM02:2026 Sensitive Information Disclosure, LLM03:2026 Excessive Agency, LLM10:2026 Improper Output Handling) and the OWASP Top 10 for Agentic Applications 2026; access control, PII handling | `llm.prompt-context`, `agent.tool-use` | Threat-model a feature; defend against direct and indirect injection; render output safely; scope tool permissions; keep PII out of prompts and logs | – | Red-team exercise on own feature |
| `quality.observability` | Observability for LLM systems: tracing model and tool calls, logging, usage tracking, catching drift, finding where a failure came from | `llm.api` | Trace a request end to end and locate a regression in model, retrieval, or tool | – | Debugging assignment |
| `quality.cost-latency` | Cost and latency: caching (including provider prompt caching), batching, routing between small and frontier models, token budgets | `llm.behavior`, `quality.observability` | Cut cost per request or per task without lowering the eval score | – | Before/after numbers |
| `quality.reliability` | Production reliability: provider failover, degradation modes, async jobs, partial failures | `llm.api`, `quality.observability` | Keep a feature working when a provider is slow or down | – | Chaos test on own service |
| `quality.release` | Release discipline for AI changes: versioned prompts and configs, release checks, pinned models, rollback | `quality.evals` | Ship a prompt change through a gate that runs the eval and can roll back | – | Working pipeline |

## eng: Software engineering around the model

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `eng.python` | Python for AI services: async I/O, typing, tests | – | Write a tested async Python service that calls models | – | Assignment |
| `eng.typescript` | TypeScript/Node | – | Build an AI endpoint in TypeScript | – | Usually known for frontend learners; confirm in placement |
| `eng.frontend` | Product frontend: React, Next.js (or equivalent) with a design system | `eng.typescript` | Build product UI with a design system | – | Usually known; confirm in placement |
| `eng.backend` | Backend APIs and integrations: FastAPI, Node.js or equivalent, background jobs, connecting business systems | – | Build an API that wraps an AI workflow, runs background jobs, and integrates one external system | – | Assignment |
| `eng.sql` | SQL databases and data modelling (PostgreSQL), migrations | `eng.backend` | Model data, write queries, store eval and usage data, ship a migration safely | – | Assignment with schema change |
| `eng.deploy` | Deploy and run: containers, one cloud (AWS, Azure, or GCP), CI/CD, monitoring, rollback | `eng.backend` | Ship a service through a pipeline with tests; monitor and roll back | – | Working pipeline |
| `eng.auth` | Auth and permissions for AI systems: OAuth/SSO, RBAC, tenant isolation, service-to-service auth, audit logs, sensitive data | `eng.backend` | Add sign-in and roles; run agent actions under the user's permissions, not a superuser's; keep PII out of prompts and logs | – | Security review of own app |

## work: Workflow and collaboration

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `work.problem-framing` | Starting from the problem: learn how the work is really done, turn a vague request or workflow into a short testable spec with a success measure, ship small | – | Map a team's workflow, find the real bottleneck, and write a short spec with a success measure | – | Spec exercise |
| `work.stakeholders` | Working with non-engineering stakeholders: demos, explaining trade-offs and limits, collecting feedback | `work.problem-framing` | Demo a feature and its limits to non-engineers and turn their feedback into changes | – | Recorded demo or write-up |
| `work.coding-agents` | Building with AI coding agents: specs and acceptance tests agents can execute, review and test gates, verifying output, cost control | – | Deliver a feature with an agent and show how its output was verified | – | Portfolio write-up; interview-style defence |
| `work.when-not-ai` | Judging when not to use an LLM: rules, classic ML, or plain code | `agent.loops` | Defend choosing a non-LLM solution with reasons and numbers | – | Scenario quiz |
| `work.impact` | Measuring impact after launch: adoption, time saved, error rates, cost vs alternatives | `quality.evals`, `quality.observability` | Define and report the business metric an AI feature should move | – | Post-launch report on capstone |
| `work.ai-ux` | UX for AI features: design systems, accessibility, trust (citations, uncertainty, undo) | `eng.frontend` | Design an AI interaction users can trust and correct | – | Design review |

## ml: Model-side skills

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `ml.fine-tuning` | Fine-tuning and adapters (LoRA): when it pays compared with prompting or retrieval, and how to validate it on held-out data | `quality.evals`, `eng.python` | Fine-tune a small model for one task and show whether it beats prompting a larger one | – | Eval report with a held-out set |
| `ml.self-hosting` | Self-hosting open-weight models: vLLM or SGLang, load testing, GPU memory, quantization | `eng.deploy`, `quality.cost-latency` | Serve an open-weight model and compare its cost and latency with a hosted API | – | Load-test numbers |
| `ml.training` | Deep learning and model training: PyTorch, classic ML (scikit-learn, XGBoost) | `eng.python` | Train and evaluate a model; explain overfitting and validation | – | Notebook + defence |
| `ml.transformers` | Transformer and NLP fundamentals: attention, embeddings, tokenisation | `llm.behavior` | Explain how a transformer produces a token and why context length costs what it does | – | Quiz |

## Retired

None yet.

## Sources

- [Anthropic – Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (checked 2026-11-24): client vs server tools, strict tool use, tool runner, MCP connector, memory tool, tool search, Claude Managed Agents.
- [OpenAI – Function calling guide](https://developers.openai.com/api/docs/guides/function-calling) (checked 2026-11-24): Responses API, strict mode via structured outputs, built-in tools, tool search, Agents SDK.
- [Google – Gemini function calling](https://aistudio.google.com/docs/function-calling) (checked 2026-11-24): modes `auto`, `any`, `none`, `validated`; parallel and compositional calling; tool search with deferred loading. Only the first part of the page was read.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (page dated 2026-08-03). The numbered list was checked through secondary sources, including the [Cloud Security Alliance](https://cloudsecurityalliance.org/blog/2026/10/21/the-owasp-top-10-for-llm-applications-2026-what-changed-and-why-it-matters) (2026-10-21), not the official PDF.
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (published 2025-12-09). Item numbers not checked.

## Changelog

- 2026-11-27: first version, from the AI Engineer and AI Product Engineer packs (pilot). Their wording is merged; where the two differed, the more specific outcome is kept here and the role-specific part moved to the pack's "In this role".
