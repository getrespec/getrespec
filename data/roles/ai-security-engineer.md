---
role: ai-security-engineer
title: AI Security Engineer
status: researched
last_researched: 2026-11-24
postings_reviewed: 13
---

# Role pack: AI Security Engineer

What someone in this role is expected to know, how important each skill is, in what order to learn it, and how to check it. `/respec plan` builds the coverage map and the curriculum from this file; `/respec update-trends` refreshes it. Format: `data/roles/README.md`.

## The role in 2026

**Key finding:** "AI Security Engineer" is a **security engineer who secures the LLM applications and agents a company builds or adopts**: threat-models them, tests them adversarially (prompt injection, tool abuse, data exfiltration), and builds the controls around them, above all **what an agent is allowed to do** (scoped credentials, least privilege, approval for high-impact actions, limits on tools, network, and data egress). Most postings want the controls built and run, not only recommended ("writes and ships code, building the tooling instead of stopping at a recommendation", P5).

The title covers three different jobs. In the 13 postings reviewed:

| Variant | Postings | What it is | Reachable for a software developer? |
|---|---|---|---|
| **Engineering** (application, platform, and enterprise AI security) | 7: P1, P2, P3, P4, P5, P8, P13 | Secure the company's own AI apps and agents, or the AI tools it adopts: threat models, agent permissions, identity, guardrails, logging, adversarial testing turned into regression tests | **Yes, the target of this pack.** P2 is explicitly "a hands-on software and platform engineering role". Most still ask for years in security or appsec (see below). |
| **Red teaming** (offensive) | 3: P6, P7, P10 | Attack AI-enabled systems end to end, often together with classic network, identity, and web attacks | Hard without an offensive security background: P7 asks for a C2 framework, reverse engineering, and OSCP-type certifications; P10 asks for a public body of work (CVEs, bug bounty reports). |
| **Research / ML defences** | 2: P9, P12 | Build ML detectors and attack pipelines, train or fine-tune models for robustness | Needs ML engineering (P9) or a publication record and PhD preference (P12). |
| **Governance** | 1: P11 (P3 partly) | Policies, approval criteria, and framework mappings for agents | Needs years in security GRC (P11 asks for 8+). |

**Where a security background is expected:** 8 of 13 postings ask for prior security, appsec, or offensive experience (P1 5+ years, P3 5+, P5 5–7, P6 4+; P4, P7, P8, P10 without a number). Exceptions: P2 asks for software and platform engineering with AI security as a plus; P9 says "cyber security background is welcome, but not required". So for a developer the realistic routes are (1) a platform/tooling role like P2, (2) an AppSec or product-security role first, then AI security, or (3) owning security of the AI features on their current team. Postings rarely say this, but nearly every "core" skill below sits on ordinary application security.

Other titles for the same work: Security Engineer, AI Security; Agent Security Engineer; AI Software Security Engineer; Security Engineer, Applied AI; AI Red Team Engineer (offensive variant); ML Engineer, AI Security (defences variant).

## Postings reviewed

All read on 2026-11-24. "Board" = read in full from the employer's own board (Workday, Greenhouse, Ashby, or SmartRecruiters public data); "partial" = part of the text was cut or not readable. P10, P12 and P13 are older than 60 days but still open on the board on 2026-11-24.

| # | Company | Title | Location | Posted | Read from | Stack and notes |
|---|---|---|---|---|---|---|
| P1 | [Ryan](https://ryan.wd1.myworkdayjobs.com/Experienced-Professionals/job/Plano/AI-Security-Engineer_R0021044) | AI Security Engineer (senior) | Plano, Nashville, or remote (US) | 2026-11-16 | board | Engineering + red teaming. Assess LLM apps, agents, RAG pipelines against OWASP Top 10 for LLM Applications, MITRE ATLAS, NIST AI RMF; red-team prompt injection, jailbreaks, exfiltration, insecure tool use, training-data poisoning; guardrails, DLP; SAST/DAST, IAM, secrets; 5+ years security; OSCP/GWAPT/CISSP preferred |
| P2 | [Allstate](https://allstate.wd5.myworkdayjobs.com/allstate_careers/job/US---Remote/AI-Security-Engineer_R37000) | AI Security Engineer | Remote (US) | 2026-11-18 | board | Platform engineering for "always-on adversarial testing" of agentic systems: Python/Java, APIs, microservices, CI/CD, auth and secrets, observability; preferred: Promptfoo, PyRIT, Garak, Inspect AI, MCP, LLM-as-a-judge, memory poisoning, excessive agency; USD 85,000–177,150 |
| P3 | [Pretium Enterprise Services](https://pretiumenterpriseservices.wd1.myworkdayjobs.com/Pretium-Enterprise-Services/job/Scottsdale-AZ/AI-Security-Engineer_JR117491) | AI Security Engineer | Scottsdale, Dallas, Charlotte, California | 2026-11-18 | board | Enterprise AI security programme: AI inventory, SSO/RBAC, connector permissions, DLP, guardrails; secure agents and MCP integrations (least privilege, approvals for high-impact actions); threat modelling and testing of AI apps and RAG (retrieval permissions, guardrail bypass); AWS Bedrock; Python; NIST AI RMF, OWASP preferred |
| P4 | [Planet](https://planet.wd3.myworkdayjobs.com/Planet/job/Warsaw---Poland/AI-Security-Engineer_JR12624) | AI Security Engineer | Warsaw, Porto, Galway | 2026-11-04 | board | SOC-facing: AI incident response, detection logic, threat hunting; excessive permissions, insecure connectors, exposed credentials, supply-chain risk; threat modelling; Microsoft security stack, SIEM, Python/PowerShell/KQL |
| P5 | [Beacon Holdings](https://jobs.ashbyhq.com/beaconholdings/72a2f4d0-31ed-4101-93e0-790fe2b315db) | Senior Security Engineer, AI Security | New York | 2026-11-19 | board | Agent identity: owner, scoped credentials, least privilege, approvals; MCP connections and OAuth grants; limits on tool calls, network, egress; adversarial tests turned into regression tests and release gates; non-human identity (OAuth, SSO, SCIM, service accounts, secrets); on-call; NIST AI RMF or ISO 42001 a plus |
| P6 | [MUFG](https://mufgub.wd3.myworkdayjobs.com/MUFG-Careers/job/Jersey-City-NJ/Global-Red-Team-AI-Engineer--AVP_10077349-WD) | Global Red Team AI Engineer, AVP | Jersey City, Irving | 2026-11-12 | board | Red team operator with AI testing: prompt injection, data leakage, tool misuse, guardrail bypass; Windows/Linux/AD, web, APIs, cloud; MITRE ATT&CK mapping; 4+ years offensive or related security; USD 112,000–151,000 |
| P7 | [Carnegie Mellon University (SEI CERT)](https://cmu.wd115.myworkdayjobs.com/CMU/job/Pittsburgh-PA/Associate-AI-Red-Team-Engineer_2025255) | Associate AI Red Team Engineer | Pittsburgh | 2026-10-22 | board | "Not a 'make the LLM say the bad thing' type of AI red team": offensive cyber first; C2 framework, Ghidra/IDA, Python/C/Bash "without the assistance of AI", TCP/IP; OSCP or similar |
| P8 | [Evolent](https://evolent.wd1.myworkdayjobs.com/en-US/External/job/Work-at-Home/Sr-AI-Software-Security-Engineer_JR-916887) | Sr AI Software Security Engineer | Remote (US) | 2026-10-15 | board (partial: intro skipped) | Classic AppSec applied to AI software: SCA, code review, SAST/DAST, pen tests, CI/CD security (GitHub, Jenkins, Azure DevOps), APIs and microservices |
| P9 | [Check Point (Zurich, formerly Lakera)](https://jobs.smartrecruiters.com/CheckPointSoftwareTechnologies2/744000163418574-senior-staff-ml-engineer-ai-security-runtime-defenses-) | Senior / Staff ML Engineer, AI Security (Runtime Defenses) | Zürich | 2026-11-24 | board | ML defences product: datasets, evals, models for LLM attack detection; attack pipelines against agentic systems; AI gateway traffic inspection; running untrusted open-weight models securely; security background "welcome, but not required" |
| P10 | [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5320469008) | Red Team Engineer, Safeguards | San Francisco | 2026-07-10 (updated 2026-10-21) | board | Adversarial testing across product surfaces, agent and tool-use systems; jailbreaking, non-obvious prompt-injection vectors in agentic workflows; Burp Suite; automated LLM testing frameworks; public body of work; USD 320,000–405,000 |
| P11 | [Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5443871008) | Security Risk & Compliance, Agent Security | San Francisco, New York | 2026-10-05 | board | Governance variant: policies for how agents are built and operated, which actions need human approval, least-privilege data access, non-human identity; maps controls to ISO 27001, ISO 42001, EU AI Act; 8+ years GRC |
| P12 | [Brave](https://job-boards.greenhouse.io/brave/jobs/8165845) | AI Security Researcher / Research Engineer | Remote or hybrid (London preferred; North America, EU, UK) | 2026-08-29 | board | Research variant: adversarial evaluations of a web agent and chatbot (prompt injection, tool abuse, exfiltration); information flow control, privilege control; Python, PyTorch/JAX, fine-tuning; publications, PhD preferred |
| P13 | [OpenAI](https://jobs.ashbyhq.com/openai/e9bea775-7eb6-438a-ab96-27d5f941e69d) | Security Engineer, Agent Security | San Francisco | 2025-07-15 | board (partial: responsibilities text garbled) | Security controls for agentic systems: threat models, isolation (container security, kernel hardening), identity-based network controls, telemetry pipelines; Python or Go/Rust/C++; cloud security |

## Skill tree

**Priority** comes from the postings above: `core` = in at least half of them (7+ of 13), or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. **Seen in** counts the postings that ask for the skill (P8 and P13 were only partly read, so counts are a lower bound). Standards are named with their edition; see Sources for the versions checked. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.

### A. Foundations: how AI systems are built

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| A1 | How LLM apps and agents work: messages and roles, tool use, agent loops, RAG, memory, MCP clients and servers | core | 8/13 | – | Draw the data and control flow of an agent, marking every place untrusted text enters and every action it can take | Diagram review; build a small two-tool agent |
| A2 | Software engineering and automation in Python (APIs, services, CI/CD) | core | 11/13 | – | Write and ship a service or tool, not only a script | Usually known; confirm in placement |
| A3 | Cloud and platform basics: one major cloud's IAM, networking, containers, managed AI services (e.g. AWS Bedrock, Azure) | core | 7/13 | A2 | Deploy a model-backed service with least-privilege roles and private networking | Assignment; config review |

### B. Security foundations (where a security background is expected)

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| B1 | Application security: web and API vulnerabilities, authorization bugs, secure code review, SAST/DAST, dependency scanning | core | 7/13 | A2 | Find and fix an auth bypass and an injection in a code review; run a scanner and triage results | Code-review exercise with planted bugs |
| B2 | Identity, secrets, and non-human identity: OAuth 2.x grants, SSO, service accounts, scoped short-lived credentials, secrets management | core | 8/13 | B1 | Give an agent its own identity with only the scopes it needs, expiring credentials, and an owner | Assignment: agent with scoped OAuth token |
| B3 | Threat modelling AI systems: trust boundaries, data flows, attacker goals, mapping risks to controls | core | 7/13 | A1, B1 | Produce a threat model of an agent that names each risk with its OWASP or ATLAS ID and a control | Written threat model + defence questions |

### C. LLM and agent threats and defences

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| C1 | Prompt injection, direct and indirect (OWASP LLM01:2026 Prompt Injection; ASI01 Agent Goal Hijack; ATLAS AML.T0051, .000 Direct, .001 Indirect): keep untrusted content out of instructions, mark its source, constrain what it can trigger | core | 8/13 | A1, B3 | Show an indirect injection through a document or tool result, then contain it so the agent cannot act on it | Red-team exercise on own agent; before/after attack success rate |
| C2 | Agent permissions and excessive agency (OWASP LLM03:2026 Excessive Agency; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ATLAS AML.T0053 AI Agent Tool Invocation): tool allowlists, least privilege, human approval for high-impact actions, per-session scopes | core | 10/13 | B2, C1 | Design an agent whose worst-case action, after a successful injection, is acceptable; require approval for writes | Assignment + "what's the blast radius?" defence |
| C3 | Sensitive data disclosure and data loss (OWASP LLM02:2026 Sensitive Information Disclosure; LLM08:2026 Hidden Context Exposure; ATLAS AML.T0086 Exfiltration via AI Agent Tool Invocation): PII in prompts and logs, egress limits, DLP, exfiltration through links and tool calls | core | 8/13 | C1 | Block a data-exfiltration path (e.g. a rendered link or outbound tool call) and keep secrets out of context and logs | Exfiltration test before/after |
| C4 | Retrieval and memory security (OWASP LLM09:2026 Vector and Embedding Weaknesses; LLM05:2026 Data and Model Poisoning; ASI06 Memory & Context Poisoning; ATLAS AML.T0080 AI Agent Context Poisoning): permission-aware retrieval, tenant isolation, poisoned documents and memory | important | 4/13 | A1, C1 | Make retrieval respect the asking user's permissions; detect a poisoned memory entry | Assignment with two tenants |
| C5 | Safe output handling, code execution, and resource limits (OWASP LLM10:2026 Improper Output Handling; ASI05 Unexpected Code Execution (RCE); LLM06:2026 Unbounded Consumption): treat model output as untrusted input, sandbox generated code, cap tokens, calls, and spend | important | 3/13 (P5, P9, P13) + rarely written but implied by every agent with a code or shell tool | B1, C2 | Run model-generated code in an isolated sandbox with no network or secrets; render output without XSS | Assignment; escape attempts |
| C6 | MCP and connector security: OAuth for MCP servers (authorization section of the MCP specification 2026-07-28), approved-connector lists, tool-description poisoning (ATLAS AML.T0110 AI Agent Tool Poisoning) | important | 5/13 | B2, C2 | Review an MCP server for scope, token handling, and poisoned tool descriptions; restrict an agent to approved connectors | Review exercise on a real MCP server |
| C7 | AI supply chain (OWASP LLM04:2026 Supply Chain; ASI04 Agentic Supply Chain Vulnerabilities; ATLAS AML.T0010 Supply Chain Compromise, .003 Model Repository): models, datasets, packages, MCP servers, provenance and pinning | core | definition; 2/13 explicit (P1, P4) | B1 | Inventory an app's models, datasets, packages, and MCP servers; pin and verify them | Inventory + review of a sample repo |

### D. Adversarial testing

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| D1 | Manual adversarial testing of LLM apps and agents: jailbreaks (ATLAS AML.T0054 LLM Jailbreak), direct and indirect injection, tool abuse, data exfiltration, guardrail bypass; reporting findings with impact | core | 9/13 | C1, C2, C3 | Run a scoped test against an agent and report findings with reproduction steps, impact, and fix | Test report reviewed against a rubric |
| D2 | Automated adversarial testing and security evals: attack datasets, LLM-as-a-judge graders, tools such as Promptfoo, PyRIT, Garak, Inspect AI; findings turned into regression tests and release gates in CI | important | 6/13 | D1, A2 | Add an injection test suite to CI that fails the build when the attack success rate rises | Working pipeline with before/after numbers |
| D3 | Offensive security tradecraft: penetration testing, web and API exploitation (e.g. Burp Suite), AD and cloud attack paths, C2 frameworks | important | 4/13 (P1, P6, P7, P10); red-team variant | B1 | Chain a classic vulnerability with an AI weakness into one attack path | Lab exercise; outside Respec's scope beyond the basics |

### E. Defend and operate

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| E1 | Guardrails and runtime defences: input and tool-output screening classifiers, structured outputs between steps, AI gateways, DLP, providers' safety features; knowing their limits | core | 8/13 | C1, C3 | Layer screening, structured outputs, and permissions; measure what each layer catches and what still gets through | Eval report per layer |
| E2 | Logging, detection, and incident response for AI systems: which events agents must log (prompts, tool calls, grants), detections for risky grants and data flows, AI incident playbooks | important | 6/13 | A3, C2 | Define an agent's audit log, write one detection, and walk an AI incident from alert to containment | Detection rule + tabletop exercise |

### F. Frameworks, governance, communication

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| F1 | Security frameworks for AI: OWASP Top 10 for LLM Applications 2026, OWASP Top 10 for Agentic Applications 2026, MITRE ATLAS (v2026.10), NIST AI RMF 1.0 with the Generative AI Profile (NIST AI 600-1) | important | 5/13 (3/13 name OWASP/ATLAS/NIST AI RMF directly) | B3 | Map a threat model's findings to the right IDs and say which list fits which question | Mapping exercise |
| F2 | AI governance and regulation: AI inventory, standards and approval criteria, vendor review, ISO/IEC 42001:2023, EU AI Act dates that apply to the product | important | 5/13 | F1 | Write an approval checklist for a new AI tool that gives a fast "yes, with conditions" | Checklist review |
| F3 | Explaining risk and remediation to engineers and non-engineers | core | 8/13 | B3 | Turn a finding into a prioritised fix the owning team accepts | Written finding + stakeholder role-play |

### G. Research and ML defences

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| G1 | Adversarial ML and model internals: poisoning, model and data extraction, membership inference (ATLAS AML.T0137), training or fine-tuning detectors and robust models | important | 4/13 (P1, P9, P10, P12); research and defences variants | A2, D2 | Train and evaluate a small injection classifier; explain extraction and membership-inference attacks | Eval report; outside the engineering variant's job-ready scope |

## Learning order

Prerequisites above define the order.

**From backend or full-stack development** (the engineering variant): A1 → A3 → B1 → B2 → B3 → C1 → C2 → C3 → D1 → E1 → C6 → C5 → C4 → D2 → C7 → E2 → F1 → F2 → capstone (a threat model, a hardened agent, and a CI test suite that proves the hardening) → F3 shown through the capstone write-up. A2 is usually known; check it in placement. B1 and B2 come before the AI-specific part on purpose: most findings in AI systems are ordinary authorization and identity failures that an injection makes reachable, and 8 of 13 postings expect security experience. A developer who already builds LLM features (Respec's `ai-engineer` or `ai-product-engineer` packs) can skip most of A1 and start at B1.

**From security** (AppSec, pentesting, cloud security): A1 → A2 (only if the learner doesn't ship code) → B3 (adapt existing threat modelling to agents) → C1 → C2 → C3 → D1 → C6 → C5 → C4 → E1 → D2 → C7 → F1. Spend the time on A1 and on building a small agent yourself: the postings that hire from security still expect hands-on experience with "LLM applications, agents, or AI developer tools" (P5). Red-team-minded learners add D3 and G1.

## Market notes

**Turkey (2026-11):** no private-sector posting titled "AI Security Engineer", "LLM security", or "AI red team" was found (searched web and Turkish job sites; Kariyer.net blocked automated reading, so this is not a full check). The closest public-sector signal: the Presidency's Cybersecurity Directorate ([Siber Güvenlik Başkanlığı, 2026 contracted specialist call](https://cdn.siberguvenlik.gov.tr/public/news/sinav_ilan_metni.pdf), applications 21 Aug – 11 Sep 2026, now closed) listed AI regulation (technical, law, ethics) and AI development positions alongside penetration testing and application testing roles. Insider posted a "Senior Security Engineer – Red Team (Remote)" role in Istanbul on [Bayt](https://www.bayt.com/en/turkiye/jobs/senior-security-engineer-red-team-remote-74420403/) (2026-08-11; evidence: weak, aggregator), but it is classic web application red teaming, not LLM security. In practice, AI security work in Turkey sits inside AppSec, cloud security, or AI engineering roles; a Turkish learner should aim for remote roles in Europe (P4, P12) or for AppSec first.

**Europe (2026-11):** postings found in Poland/Portugal/Ireland (P4), Switzerland (P9), and remote UK/EU (P12). A Berlin posting (HelloFresh, "Senior AI Security Engineer") appeared in search results but was no longer on its board on 2026-11-24, so it is not counted.

**US (2026-11):** most postings; enterprise "secure our AI adoption" roles at insurers, banks, and services firms (P1–P3, P6, P8) outnumber AI-lab roles. Pay in the postings that state it: USD 85,000–177,150 (P2), 112,000–151,000 (P6), 320,000–405,000 (P10, AI lab).

## Sources

- The postings in the table above (read 2026-11-24).
- [CyberSN – Cybersecurity Jobs Report, 2026 through September](https://cybersn.com/resources/reports/cybersecurity-jobs-report) (data pulled 2026-10-07): 2,409 US AI Security Engineer postings Jan–Sep 2026, +268.3% vs the same months of 2025; reported by [SecurityWeek](https://www.securityweek.com/us-cybersecurity-job-postings-fall-26-as-ai-security-engineer-demand-soars/) (2026-10-18).
- [Cybersecurity Dive – AI security hiring focuses on red-teaming, SOC orchestration and governance](https://www.cybersecuritydive.com/news/ai-security-jobs-hiring-sans-tracker/833465/) (2026-10-20), on SANS Institute's tracker and [AI Cybersecurity Careers 2026 (September 2026 update)](https://www.sans.org/white-papers/sans-ai-cybersecurity-careers-guide), used for the variant split.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (published 2026-08-04; list checked in the [official repository](https://github.com/GenAI-Security-Project/GenAI-LLM-Top10), 2026-11-24).
- [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (published 2025-12-09, "Version 2026"; ASI01–ASI10 names checked in the official PDF, 2026-11-24).
- [MITRE ATLAS data v2026.10](https://github.com/mitre-atlas/atlas-data) (2026-10-28: 16 tactics, 129 techniques, 92 sub-techniques; technique IDs above checked in `dist/v6/ATLAS-2026.10.yaml`). ATLAS now releases roughly monthly; recheck IDs on refresh.
- [NIST AI RMF 1.0 (NIST AI 100-1)](https://www.nist.gov/itl/ai-risk-management-framework) and the Generative AI Profile, NIST AI 600-1 (July 2024). NIST says AI RMF 1.0 is being revised; no revised text was found on 2026-11-24 (checked through secondary sources, evidence: weak for the revision status).
- [EU AI Act – Commission page](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) (updated 2026-10-19): Regulation (EU) 2024/1689; prohibitions from 2025-02-02; GPAI obligations from 2025-08-02; transparency rules from August 2026; after the AI Omnibus (in force 2026-07-27), Annex III high-risk rules from 2027-12-02 and Annex I from 2028-08-02.
- ISO/IEC 42001:2023 (first edition, no amendment found on 2026-11-24; checked through secondary sources, evidence: weak).
- [Model Context Protocol specification 2026-07-28](https://github.com/modelcontextprotocol/modelcontextprotocol/tree/main/docs/specification/2026-07-28) (current revision; changelog checked in the official repository, 2026-11-24).
- [Anthropic – Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) (checked 2026-11-24): untrusted content only in tool results, JSON-encoding, screening tool output, least privilege.
- [OpenAI – Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety) (checked 2026-11-24): structured outputs between nodes, tool approvals, guardrails, keeping untrusted data from driving agent behaviour.

## Changelog

- 2026-11-24: first version, from 13 postings.
