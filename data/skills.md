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
| `agent.mcp` | MCP in a product: expose a system's data and actions through an MCP server with scoped permissions, and connect agents to MCP servers | `agent.tool-use` | Expose a system's data and actions through an MCP server; use it from an agent; limit what it can do | – | Working server used from an agent |
| `agent.multi` | Multi-agent systems: orchestrator and sub-agents, hand-offs, and judging when they are over-built | `agent.loops`, `agent.evals` | Split a task across agents and show, with evals, whether it beats a single agent | – | Ablation report |
| `agent.memory` | Agent memory and state across sessions | `agent.loops`, `rag.design` | Store and retrieve per-user or per-task memory; keep it from leaking between users | – | Design review + test |
| `agent.evals` | Agent evaluation: task success, tool-call correctness, trajectories, cost per task; turning production failures into test cases | `agent.loops`, `quality.evals` | Build an eval set for an agent and find where it fails (model, retrieval, tool, or business rule) | – | Eval report with failure breakdown |
| `agent.frameworks` | Agent frameworks and SDKs: one framework (LangGraph, LangChain) or provider agent SDK, learned after building a loop by hand | `agent.loops` | Rebuild a hand-written agent in a framework and say what it adds and costs | – | Assignment + write-up |
| `agent.coding-agents-product` | Coding agents as a product: agents that work in repositories and run tests within permissions | `agent.loops`, `agent.human-approval` | Wire an agent to a repo with tests as the gate and limited permissions | – | Working demo |
| `agent.packaging` | Packaging agent capabilities for reuse: skills, sub-agents, harnesses, vendor agent builders | `agent.loops` | Turn a one-off agent into a reusable skill or sub-agent that another team can install | – | Packaged deliverable used in a second project |

## quality: Quality, safety, and operations

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `quality.evals` | Evals: test sets from real usage, graders (code checks, human labels, model graders), regression checks, "what does correct look like" | `llm.prompt-context` | Build an eval set and compare two prompt, model, or retrieval versions with numbers | Graders checked against human labels; a regression gate in CI; online evals on production traffic | Eval report with before/after |
| `quality.guardrails` | Guardrails and failure handling: hallucination control, output validation, grounding, deterministic checks, human in the loop, safe fallbacks | `llm.structured-output`, `quality.evals` | Detect and contain bad output before it reaches a user or a system | – | Failure-case tests |
| `quality.observability` | Observability for LLM systems: tracing model and tool calls, logging, usage tracking, catching drift, finding where a failure came from | `llm.api` | Trace a request end to end and locate a regression in model, retrieval, or tool | – | Debugging assignment |
| `quality.cost-latency` | Cost and latency: caching (including provider prompt caching), batching, routing between small and frontier models, token budgets | `llm.behavior`, `quality.observability` | Cut cost per request or per task without lowering the eval score | – | Before/after numbers |
| `quality.reliability` | Production reliability: provider failover, degradation modes, async jobs, partial failures | `llm.api`, `quality.observability` | Keep a feature working when a provider is slow or down | – | Chaos test on own service |
| `quality.release` | Release discipline for AI changes: versioned prompts and configs, release checks, pinned models, rollback | `quality.evals` | Ship a prompt change through a gate that runs the eval and can roll back | – | Working pipeline |

## sec: Security

The first four are the OWASP risks every builder handles in their own features at `working` depth; the AI Security Engineer role takes them to `deep`.

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `sec.prompt-injection` | Prompt injection, direct and indirect (OWASP LLM01:2026 Prompt Injection; ASI01 Agent Goal Hijack; ATLAS AML.T0051, .000 Direct, .001 Indirect): keep untrusted content out of instructions, mark its source, constrain what it can trigger | `llm.prompt-context`, `agent.tool-use` | Show an indirect injection through a document or tool result in your own feature, then contain it so the model can't act on it | Measure the attack success rate before and after; map each defence to a threat model | Red-team exercise on own feature |
| `sec.excessive-agency` | Agent permissions and excessive agency (OWASP LLM03:2026 Excessive Agency; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ATLAS AML.T0053 AI Agent Tool Invocation): tool allowlists, least privilege, human approval for high-impact actions, per-session scopes | `sec.prompt-injection` | Give an agent only the tools and scopes the task needs; require approval for writes | Design so the worst-case action after a successful injection is still acceptable | Assignment + "what's the blast radius?" defence |
| `sec.data-disclosure` | Sensitive data disclosure and data loss (OWASP LLM02:2026 Sensitive Information Disclosure; LLM08:2026 Hidden Context Exposure; ATLAS AML.T0086 Exfiltration via AI Agent Tool Invocation): PII and secrets in prompts and logs, egress limits, DLP, exfiltration through links and tool calls | `sec.prompt-injection` | Keep PII and secrets out of prompts, context, and logs | Find and block an exfiltration path (a rendered link or an outbound tool call) | Exfiltration test before/after |
| `sec.output-handling` | Safe output handling, code execution, and resource limits (OWASP LLM10:2026 Improper Output Handling; ASI05 Unexpected Code Execution (RCE); LLM06:2026 Unbounded Consumption): treat model output as untrusted input, sandbox generated code, cap tokens, calls, and spend | `llm.api` | Render model output without XSS or injection into downstream systems; cap tokens and calls per request | Run model-generated code in an isolated sandbox with no network or secrets, and try to escape it | Assignment; escape attempts |
| `sec.appsec` | Application security: web and API vulnerabilities, authorization bugs, secure code review, SAST/DAST, dependency scanning | – | Find and fix an auth bypass and an injection in a code review; run a scanner and triage results | – | Code-review exercise with planted bugs |
| `sec.threat-modeling` | Threat modelling AI systems: trust boundaries, data flows, attacker goals, mapping risks to controls | `agent.loops`, `sec.appsec` | Produce a threat model of an agent that names each risk with its OWASP or ATLAS ID and a control | – | Written threat model + defence questions |
| `sec.retrieval-memory` | Retrieval and memory security (OWASP LLM09:2026 Vector and Embedding Weaknesses; LLM05:2026 Data and Model Poisoning; ASI06 Memory & Context Poisoning; ATLAS AML.T0080 AI Agent Context Poisoning): permission-aware retrieval, tenant isolation, poisoned documents and memory | `rag.design`, `sec.prompt-injection` | Make retrieval respect the asking user's permissions; detect a poisoned memory entry | – | Assignment with two tenants |
| `sec.mcp` | MCP and connector security: OAuth for MCP servers (authorization section of the MCP specification 2026-07-28), approved-connector lists, tool-description poisoning (ATLAS AML.T0110 AI Agent Tool Poisoning) | `agent.mcp`, `sec.excessive-agency`, `eng.auth` | Review an MCP server for scope, token handling, and poisoned tool descriptions; restrict an agent to approved connectors | – | Review exercise on a real MCP server |
| `sec.supply-chain` | AI supply chain (OWASP LLM04:2026 Supply Chain; ASI04 Agentic Supply Chain Vulnerabilities; ATLAS AML.T0010 Supply Chain Compromise, .003 Model Repository): models, datasets, packages, MCP servers, provenance and pinning | `sec.appsec` | Inventory an app's models, datasets, packages, and MCP servers; pin and verify them | – | Inventory + review of a sample repo |
| `sec.red-teaming` | Manual adversarial testing of LLM apps and agents: jailbreaks (ATLAS AML.T0054 LLM Jailbreak), direct and indirect injection, tool abuse, data exfiltration, guardrail bypass; reporting findings with impact | `sec.prompt-injection`, `sec.excessive-agency`, `sec.data-disclosure` | Run a scoped test against an agent and report findings with reproduction steps, impact, and fix | – | Test report reviewed against a rubric |
| `sec.security-evals` | Automated adversarial testing and security evals: attack datasets, LLM-as-a-judge graders, tools such as Promptfoo, PyRIT, Garak, Inspect AI; findings turned into regression tests and release gates in CI | `sec.red-teaming`, `quality.evals` | Add an injection test suite to CI that fails the build when the attack success rate rises | – | Working pipeline with before/after numbers |
| `sec.offensive` | Offensive security tradecraft: penetration testing, web and API exploitation (e.g. Burp Suite), AD and cloud attack paths, C2 frameworks | `sec.appsec` | Chain a classic vulnerability with an AI weakness into one attack path | – | Lab exercise; outside Respec's scope beyond the basics |
| `sec.runtime-defenses` | Guardrails and runtime defences against attacks: input and tool-output screening classifiers, structured outputs between steps, AI gateways, DLP, providers' safety features; knowing their limits | `sec.prompt-injection`, `sec.data-disclosure` | Layer screening, structured outputs, and permissions; measure what each layer catches and what still gets through | – | Eval report per layer |
| `sec.detection-response` | Logging, detection, and incident response for AI systems: which events agents must log (prompts, tool calls, grants), detections for risky grants and data flows, AI incident playbooks | `eng.cloud-iam`, `sec.excessive-agency` | Define an agent's audit log, write one detection, and walk an AI incident from alert to containment | – | Detection rule + tabletop exercise |
| `sec.frameworks` | Security frameworks for AI: OWASP Top 10 for LLM Applications 2026, OWASP Top 10 for Agentic Applications 2026, MITRE ATLAS (v2026.10), NIST AI RMF 1.0 with the Generative AI Profile (NIST AI 600-1) | `sec.threat-modeling` | Map a threat model's findings to the right IDs and say which list fits which question | – | Mapping exercise |
| `sec.governance` | AI governance and regulation: AI inventory, standards and approval criteria, vendor review, ISO/IEC 42001:2023, EU AI Act dates that apply to the product | `sec.frameworks` | Write an approval checklist for a new AI tool that gives a fast "yes, with conditions" | – | Checklist review |
| `sec.adversarial-ml` | Adversarial ML and model internals: poisoning, model and data extraction, membership inference (ATLAS AML.T0137), training or fine-tuning detectors and robust models | `ml.pytorch`, `sec.security-evals` | Train and evaluate a small injection classifier; explain extraction and membership-inference attacks | – | Eval report |

## eng: Software engineering around the model

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `eng.python` | Python for AI services: async I/O, typing, tests | – | Write a tested async Python service that calls models | – | Assignment |
| `eng.typescript` | TypeScript/Node | – | Build an AI endpoint in TypeScript | – | Usually known for frontend learners; confirm in placement |
| `eng.frontend` | Product frontend: React, Next.js (or equivalent) with a design system | `eng.typescript` | Build product UI with a design system | – | Usually known; confirm in placement |
| `eng.backend` | Backend APIs and services: FastAPI, Node.js or equivalent, background jobs | – | Build an API that wraps an AI workflow and runs background jobs | System design: fit a service into an existing architecture, distributed systems, and defend the trade-offs | Assignment; design review for `deep` |
| `eng.integration` | Integrating systems you didn't write: REST APIs, webhooks, SaaS systems (CRM, ERP, ticketing, support desks), legacy systems and messy data formats; learning an unfamiliar codebase quickly | `eng.backend` | Connect a feature to two systems you didn't write, including one with poor documentation, and handle their failure modes | – | Assignment against an unfamiliar API |
| `eng.sql` | SQL databases and data modelling (PostgreSQL), migrations | `eng.backend` | Model data, write queries, store eval and usage data, ship a migration safely | – | Assignment with schema change |
| `eng.deploy` | Deploy and run: containers, one cloud (AWS, Azure, or GCP), CI/CD, monitoring, rollback | `eng.backend` | Ship a service through a pipeline with tests; monitor and roll back | – | Working pipeline |
| `eng.kubernetes` | Container orchestration: Kubernetes (or OpenShift), deploying to a cluster | `eng.deploy` | Containerize a service and its jobs and deploy them to a cluster | – | Working deployment |
| `eng.iac` | Infrastructure as code (Terraform, Pulumi, CloudFormation) | `eng.deploy` | Provision a service's infrastructure from code and change it through review | – | Working config |
| `eng.cloud-iam` | Cloud identity and networking: one major cloud's IAM roles, least privilege, private networking, managed AI services (e.g. AWS Bedrock, Azure) | `eng.deploy` | Deploy a model-backed service with least-privilege roles and private networking | – | Assignment; config review |
| `eng.auth` | Auth and permissions for AI systems: OAuth/OIDC and SSO, RBAC, tenant isolation, service accounts and service-to-service auth, audit logs, secrets | `eng.backend` | Add sign-in and roles; run agent actions under the user's permissions, not a superuser's | Non-human identity: an agent with its own identity, only the scopes it needs, short-lived credentials and an owner; secrets management and rotation without downtime | Security review of own app; for `deep`, an agent with a scoped OAuth token |
| `eng.software-engineering` | Production software engineering: clean code, tests, code review, profiling | – | Turn prototype or research code into a tested, reviewed package | – | Usually known; confirm in placement |

## dev: Developing with AI coding agents

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `dev.agent-basics` | Daily use of an AI coding agent (Claude Code, Codex, Cursor, Copilot): modes, permissions, when to use chat, edit, or agent | – | Finish a real task in your own codebase with an agent, from prompt to merged change | – | Recorded session or written walkthrough |
| `dev.directing` | Directing an agent: break work into tasks, give context, constraints, and acceptance criteria (specs and tests the agent can run); plan before code; iterate | `dev.agent-basics` | Write a task brief the agent completes without rework; say why a task is or isn't worth delegating | – | Same task with a weak and a strong brief; compare results |
| `dev.lifecycle` | Using agents across the lifecycle: understanding unfamiliar code, refactoring, writing tests, debugging, documentation, porting | `dev.directing` | Refactor a legacy module and add tests with an agent, keeping behaviour unchanged | – | Assignment: before/after test run |
| `dev.context-files` | Project context for agents: `AGENTS.md`, `CLAUDE.md`, Cursor rules, Copilot instructions, skills; keeping them current | `dev.directing` | Write a context file that makes an agent follow the repo's build, test, and style rules | – | Fresh agent session follows them without reminders |
| `dev.mcp-tools` | Connecting a coding agent to tools through MCP (issue tracker, error monitoring, docs, design files), with scoped access | `dev.agent-basics`, `dev.safe-agent-use` | Connect one MCP server, use it in a task, and explain what it can read and do | – | Working setup + access review |
| `dev.verify-output` | Reviewing and verifying agent output: read every diff, run it, check edge cases, own every line that ships | `dev.agent-basics` | Find the planted bugs in an agent-written change and explain each one | – | Review exercise with seeded defects |
| `dev.tests-gate` | Tests and CI as the safety net: tests first or alongside, agent-written tests checked for real assertions, CI gates | `dev.verify-output` | Catch an agent's wrong change through tests before review | – | Assignment: failing test that catches a regression |
| `dev.delegation-judgement` | Judgement: where agents help and where they add risk (security-critical code, unfamiliar domains, large rewrites); keeping the quality bar | `dev.verify-output` | Defend a choice to do a task by hand, or to delegate it, with reasons | – | Scenario quiz |
| `dev.safe-agent-use` | Safe agent use: permission modes and sandboxing, keeping secrets and personal data out of prompts and unapproved tools, prompt injection through files, web pages and MCP tools, trusting MCP servers, reviewing generated code for vulnerabilities | `dev.agent-basics` | Set up an agent with least privilege; explain how a poisoned README or web page could steer it and what stops it | – | Red-team exercise on own setup |
| `dev.explain-workflow` | Explaining your AI workflow with evidence: which tools, what you delegate, how you verify, what it changed | `dev.directing`, `dev.verify-output` | Give a five-minute account of a real task, with the diff and how you checked it | – | Interview-style defence; portfolio write-up |
| `dev.team-practice` | Raising the team's practice: shared context files, documented prompts and workflows, reusable skills, mentoring | `dev.context-files`, `dev.explain-workflow` | Write a reusable skill or workflow another developer can use | – | Peer uses it on their task |

## work: Workflow and collaboration

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `work.problem-framing` | Starting from the problem: learn how the work is really done, turn a vague request or workflow into a short testable spec with a success measure, ship small | – | Map a team's workflow, find the real bottleneck, and write a short spec with a success measure | – | Spec exercise |
| `work.stakeholders` | Working with non-engineering stakeholders: demos, explaining trade-offs and limits, collecting feedback | `work.problem-framing` | Demo a feature and its limits to non-engineers and turn their feedback into changes | – | Recorded demo or write-up |
| `work.when-not-ai` | Judging when not to use an LLM: rules, classic ML, or plain code | `agent.loops` | Defend choosing a non-LLM solution with reasons and numbers | – | Scenario quiz |
| `work.impact` | Measuring impact after launch: adoption, time saved, error rates, cost vs alternatives | `quality.evals`, `quality.observability` | Define and report the business metric an AI feature should move | – | Post-launch report on capstone |
| `work.ai-ux` | UX for AI features: design systems, accessibility, trust (citations, uncertainty, undo) | `eng.frontend` | Design an AI interaction users can trust and correct | – | Design review |
| `work.delivery` | Scoping and owning delivery: MVP scope, sequencing, trade-offs between scope, speed and quality, raising risks early, from prototype to production | `work.problem-framing` | Write a scoped delivery plan with milestones and risks, and re-plan when a blocker appears | – | Scoping exercise with a mid-way change |
| `work.prototyping` | Demos, prototypes and proofs of concept that show value fast and are honest about limits | `work.problem-framing`, `agent.loops` | Build a working prototype on realistic data in a time box and demo it, limits included | – | Recorded demo |
| `work.docs` | Writing that outlives you: playbooks, runbooks, reference architectures, handover docs | `work.delivery` | Write a handover pack so another team can run and extend the system without you | – | Doc review: can someone else follow it? |
| `work.field-signal` | Turning field signal into product input: spotting repeated patterns, writing them up for product and research teams, deciding what belongs in the core product | `work.docs` | Write a field report that separates one-off customisation from a reusable product gap | – | Written report |
| `work.domain` | Domain fluency in one vertical (finance, healthcare, security, public sector…) | `work.problem-framing` | Use the vertical's terms, constraints and regulations correctly in a design | – | Scenario quiz in the chosen vertical |

## ml: Machine learning and model-side skills

| ID | Skill | Needs | Can do (working) | Deep adds | How to check |
|---|---|---|---|---|---|
| `ml.python-data` | Python for data work: NumPy, pandas, notebooks vs packaged code | – | Load, clean, and reshape a data set; vectorize instead of looping; move notebook code into a tested module | – | Small task; code review |
| `ml.math` | The math that ML needs first: vectors, matrices and shapes; derivatives and the chain rule; probability, distributions, expectation and variance; basic statistics and hypothesis tests | – | Compute a gradient by hand for a two-parameter model; explain a matrix multiply by its shapes; tell whether an A/B difference is likely noise | – | Worked-problem quiz with numbers |
| `ml.classical` | Classical ML: regression, classification, clustering, gradient-boosted trees, feature engineering (scikit-learn, XGBoost, LightGBM) | `ml.python-data`, `ml.math` | Build a baseline and a boosted-tree model on tabular data and explain which features matter | – | Assignment on a tabular data set |
| `ml.evaluation` | Evaluation and experiment design: train/validation/test splits, metrics that fit the problem, overfitting, data leakage, class imbalance, hyperparameter search | `ml.classical` | Pick a metric for a business goal; find a leak in a pipeline; compare two models fairly | – | Scenario quiz + "find the leak" exercise |
| `ml.pytorch` | PyTorch: tensors, autograd, `Dataset`/`DataLoader`, writing the training and evaluation loop yourself, saving and loading checkpoints | `ml.python-data`, `ml.math` | Train a small network with a hand-written loop; debug shape and device errors; resume from a checkpoint | – | Assignment: training loop with a loss curve |
| `ml.deep-learning` | Deep learning fundamentals: layers, activations, loss functions, optimizers, learning-rate schedules, regularization; CNN and Transformer architectures | `ml.pytorch` | Explain why a loss curve diverges or plateaus and fix it; read a Transformer block and name each part | – | Debugging exercise; defence questions |
| `ml.application-domain` | One application domain in depth: recommendations and ranking, forecasting and time series, computer vision, or NLP | `ml.evaluation`, `ml.pytorch` | Ship a model in the chosen domain with domain-appropriate metrics (e.g. NDCG, MAPE, mAP, F1) | – | Capstone in that domain |
| `ml.distributed-training` | GPU and distributed training: mixed precision, multi-GPU data parallel (DDP, FSDP), data-loading bottlenecks, cost per run | `ml.pytorch` | Profile a training run, find whether GPU or data loading is the bottleneck, and fix it | – | Before/after throughput numbers |
| `ml.papers` | Reading papers and reproducing a method | `ml.deep-learning` | Reimplement one result from a paper and report where it differs | – | Write-up with code |
| `ml.fine-tuning` | Fine-tuning pretrained models (e.g. Hugging Face Transformers): when it pays compared with prompting a hosted model or retrieval, and how to validate it on held-out data | `ml.pytorch`, `quality.evals` | Fine-tune a small pretrained model for one task and compare it with a prompted hosted model on the same eval, with cost and latency | – | Eval report with a held-out set |
| `ml.llm-fine-tuning` | LLM fine-tuning methods: supervised fine-tuning, parameter-efficient methods (LoRA, QLoRA through Hugging Face PEFT), preference optimization (DPO), distillation | `ml.fine-tuning`, `ml.distributed-training` | Fine-tune an open-weight model with LoRA on one GPU and show it beats the base model on a held-out eval | – | Assignment with eval before/after |
| `ml.inference` | Inference optimization and self-hosting: batching, quantization, compression, export (ONNX), serving engines for open-weight models (vLLM, SGLang), load testing, GPU memory | `eng.deploy` | Serve a model and cut its latency or cost without lowering its eval score; compare it with a hosted API | – | Load-test and before/after numbers |
| `ml.data-processing` | Large-scale data processing (Spark/PySpark or similar) | `eng.sql` | Build a training set from raw tables with joins and window functions, then run the same on Spark | – | Assignment |
| `ml.feature-pipelines` | Feature and data pipelines: scheduled and streaming pipelines (Airflow, Kafka), feature stores, computing a feature once and serving it the same way in training and production | `ml.data-processing` | Build a daily feature pipeline and serve the same features online without skew | – | Assignment with a skew test |
| `ml.datasets` | Data quality and data sets: labeling guidelines, annotation quality, curation, synthetic data | `ml.evaluation` | Write labeling rules, measure label agreement, and show the effect of cleaner data on the model | – | Before/after eval |
| `ml.serving` | Packaging and serving models: batch vs real-time inference, REST/gRPC endpoints (FastAPI or similar), latency and reliability targets | `ml.classical` | Serve a model behind an API with a latency budget, and run the same model as a batch job | – | Working service + load test |
| `ml.platform` | A managed ML platform: Amazon SageMaker AI, Azure Machine Learning, Databricks, or Google Cloud's platform (formerly Vertex AI) | `eng.kubernetes` | Train, register, and deploy a model on one managed platform; know what it costs | – | Working pipeline on one platform |
| `ml.reproducibility` | CI/CD and reproducibility for ML: tests for data and models, experiment tracking and model registry (MLflow or W&B), data and model versioning | `ml.serving` | Retrain and redeploy from a commit with tracked data, parameters, and metrics; roll back to a previous model version | – | Pipeline demo |
| `ml.monitoring` | Monitoring models in production: data and prediction drift, silent degradation, alerting, retraining triggers, incident handling | `ml.serving`, `ml.evaluation` | Detect drift on a served model, alert, and trigger a retrain | – | Assignment with injected drift |
| `ml.rollout` | Safe rollout of models: offline evaluation, shadow runs, champion/challenger, online A/B tests and reading their results | `ml.monitoring`, `ml.math` | Plan a rollout from offline eval to A/B test with a rollback rule | – | Design review + A/B analysis quiz |
| `ml.system-design` | ML system design: contracts between data, model, and consumers; trade-offs between latency, cost, accuracy, and failure modes | `ml.serving`, `ml.monitoring` | Design an ML system on a whiteboard and defend its trade-offs | – | Interview-style design review |
| `ml.data-privacy` | Privacy, security, and compliance for training data (KVKK/GDPR, sensitive data, access control, lineage) | `ml.feature-pipelines` | Keep sensitive fields out of training data and logs; document data lineage | – | Review of own pipeline |
| `ml.rl` | Reinforcement learning and reward modelling (including RLHF) | `ml.deep-learning`, `ml.llm-fine-tuning` | Explain and run a small RL or preference-learning experiment | – | Assignment |
| `ml.federated` | Federated and privacy-preserving learning (differential privacy) | `ml.pytorch`, `ml.data-privacy` | Train a model across two data silos without moving the data | – | Assignment |
| `ml.edge` | Edge and embedded deployment (compression, on-device evaluation) | `ml.inference` | Run a compressed model on a constrained target and measure accuracy loss | – | Before/after numbers |
| `ml.transformers` | Transformer and NLP fundamentals: attention, embeddings, tokenisation | `llm.behavior` | Explain how a transformer produces a token and why context length costs what it does | – | Quiz |

## Retired

None yet.

## Sources

- [Anthropic – Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (checked 2026-11-24): client vs server tools, strict tool use, tool runner, MCP connector, memory tool, tool search, Claude Managed Agents.
- [OpenAI – Function calling guide](https://developers.openai.com/api/docs/guides/function-calling) (checked 2026-11-24): Responses API, strict mode via structured outputs, built-in tools, tool search, Agents SDK.
- [Google – Gemini function calling](https://aistudio.google.com/docs/function-calling) (checked 2026-11-24): modes `auto`, `any`, `none`, `validated`; parallel and compositional calling; tool search with deferred loading. Only the first part of the page was read.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (page dated 2026-08-03). The numbered list was checked through secondary sources, including the [Cloud Security Alliance](https://cloudsecurityalliance.org/blog/2026/10/21/the-owasp-top-10-for-llm-applications-2026-what-changed-and-why-it-matters) (2026-10-21), not the official PDF.
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (published 2025-12-09). Item numbers not checked.
- Security standards behind the `sec` skills (OWASP lists, MITRE ATLAS, NIST AI RMF, the MCP specification): see the Sources of `data/roles/ai-security-engineer.md` for the versions checked.

## Changelog

- 2026-11-27: all six packs converted. Added the `sec` and `dev` areas and the FDE, AI Security and ML Engineer skills. Split before the first release, so no IDs are retired: `quality.security` into `sec.prompt-injection`, `sec.excessive-agency`, `sec.data-disclosure`, `sec.output-handling`; `work.coding-agents` into the `dev` skills; `ml.training` into `ml.classical` and `ml.pytorch`; `ml.self-hosting` renamed `ml.inference`; integration moved out of `eng.backend` into `eng.integration`.
- 2026-11-27: first version, from the AI Engineer and AI Product Engineer packs (pilot). Their wording is merged; where the two differed, the more specific outcome is kept here and the role-specific part moved to the pack's "In this role".
