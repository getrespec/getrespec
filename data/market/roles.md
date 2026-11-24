---
last_updated: 2026-11-18
---

# AI-Era Roles: Demand and Transition Map

## How to read

- Every signal carries a **metric type**: `growth` (rate), `posting count`, `share` (of all postings), `salary`, `survey`, `qualitative`. Different types are never compared: "1000% growth" can come from a tiny base.
- Rows marked `evidence: weak` come from blogs or aggregators; don't base a decision on them alone.
- Global signals come first; country-specific data lives under **Market notes** for each role.
- This file is refreshed with `/respec update-trends`. Rules: `flows/update-trends.md`.

## Overview

| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| Tech postings requiring AI skills | 75% (+178% YoY) | US | share | [Dice via CIO](https://www.cio.com/article/4201347/information-technology-jobs-report.html) | 2026-07 |
| Postings with "AI" in the title | 1.2% of all IT postings (19,958 postings) | US, staffing firms | share | [Ceipal](https://www.ceipal.com/resources/most-in-demand-job-skills-ceipal-ai-hiring-boom) | 2025 Q4 |
| Postings with "AI" in the title | +173% YoY; software development postings −22% | US | growth | [Dice via HR Dive](https://www.hrdive.com/news/dice-report-tech-hiring-AI/824902/) | 2026 Q1 |
| Distinct job titles mentioning AI | 264 → 822 (2022 → 2026 Q1) | US | qualitative | [Indeed Hiring Lab via Network World](https://www.networkworld.com/article/4195712/ai-job-titles-expand-beyond-tech-as-it-hiring-remains-strong.html) | 2026-07 |
| Tech role with the most open postings | Software developers/engineers, ~50,000 | US | posting count | [CompTIA via Network World](https://www.networkworld.com/article/4195712/ai-job-titles-expand-beyond-tech-as-it-hiring-remains-strong.html) | 2026-06 |

**Takeaway:** New AI titles are growing fast but the volume is still small. For most developers the widest door is the AI-fluent version of their current role.

---

## ai-fluent-developer — AI-fluent version of your current role

**Definition:** The title stays the same (Frontend, Backend, Fullstack, Software Developer); the difference is using AI tools and LLM integrations as a natural part of the job.

**Demand signals**
| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| Tech postings requiring AI skills | 75% | US | share | [Dice via CIO](https://www.cio.com/article/4201347/information-technology-jobs-report.html) | 2026-07 |

**Market notes — Turkey:** Founder's field observation (unverified): most backend/software postings now ask for fullstack skills or LLM experience.

**Typical skills:** Using and directing AI coding agents effectively, LLM API integration, prompt and context design, verifying and testing AI-written code, basic security risks such as prompt injection.

**For whom:** Everyone. The shortest transition, and a foundation for every other role here.

---

## ai-engineer — AI Engineer / Applied AI Engineer

**Definition:** An engineer who integrates existing models (especially LLMs) into products. In 22 postings read on 2026-11-24, 17 were LLM-application work (APIs, RAG, tool use and agents, evals, guardrails, production), 3 mixed it with model training, 1 was classic deep learning, and 1 AI enablement; a growing share builds internal agents for sales, support, and operations teams ([role pack](../roles/ai-engineer.md)). The title doesn't describe a single job: the range runs from customer-facing advisory roles to ML roles requiring PyTorch, with product engineering on LLM APIs in between ([GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer), 2026-10). The 2026 expectation: agent design, RAG architecture, fine-tuning when it makes sense, eval pipelines, observability, and deployment ([ODSC](https://opendatascience.com/your-company-promised-to-reskill-you-for-ai-most-wont/)).

**Variant titles:** Applied AI Engineer, AI Software Engineer, GenAI Engineer, LLM Engineer, Yapay Zeka Mühendisi (TR).

**Demand signals**
| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| LinkedIn Jobs on the Rise | #1 (fastest-growing role) | US | growth | [LinkedIn via Let's Data Science](https://letsdatascience.com/news/linkedin-names-fastest-growing-jobs-for-2026-bf17881e) | 2026-01 |
| AI/ML Engineer open postings | 19,297; +26.2% QoQ | US | posting count | [Veritone](https://www.veritone.com/blog/q126-labor-market-analysis/) | 2026 Q1 |
| Entry-level AI engineer hiring | UK +97%, US +62%, India +55% (YoY) | Global | growth | [LinkedIn via Dünya](https://www.dunya.com/foto-galeri/gundem/yapay-zeka-ile-gerileyen-ve-yukselen-meslekler-galeri-840229) | 2026-08 |
| AI Engineer vs ML Engineer posting ratio | ~5:1 | US remote, LinkedIn | qualitative | [aiagentrank](https://aiagentrank.io/blog/how-to-become-ai-engineer-2026) — evidence: weak | mid-2026 |
| AI Engineer median total comp | $155,000 | US, self-reported | salary | [Levels.fyi via GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer) | 2026-10 |
| Reviewed postings that ask for agents | 19/22 (6 name multi-agent, 4 name MCP) | 11 markets, employer boards | qualitative | [role pack](../roles/ai-engineer.md) | 2026-11 |

**Market notes — Turkey**
| Signal | Value | Type | Source | Date |
|---|---|---|---|---|
| "Yapay Zeka Mühendisi" average monthly salary | 71,022 TRY (2025: 59,750 TRY); expectations + survey data from 2,712 people | salary | [Kariyer.net](https://www.kariyer.net/pozisyonlar/yapay+zeka+muhendisi/maas) | 2026 |

Postings for "Yapay Zeka Mühendisi" appear on kariyer.net and techcareer.net in Istanbul, Ankara, and Izmir; 2–4 years of experience is common. EPAM Turkey posted "Senior AI Engineer with ReactJS", "Lead AI Engineer", and "Senior AI Engineer with Databricks" roles (2026). Two current examples read on the employers' boards: Vertigo Games "AI Engineer" (Istanbul, 2026-11; Python, internal agent workflows, daily coding-agent use) and ING Hubs Türkiye "Senior Agentic AI Engineer" (2026-09; LangGraph, CrewAI, AutoGen, Kubernetes). Some Turkish postings use the classic ML definition (model development, computer vision, production data); others mean LLM integration and automation (agents, webhooks). Check which one a posting means.

**Typical skills:** In the reviewed postings: agents and tool use (19/22), evals (16/22), RAG (15/22), security and access control (13/22), cost and latency (13/22), observability (11/22), MCP (4/22). Python is required in 17/22 (2 more accept TypeScript); PyTorch and training appear only in ML-hybrid postings (4/22). LinkedIn's most-listed skills for the role are LangChain, RAG, and PyTorch; LangChain/LangGraph are named in 5/22. Full skill tree in the [role pack](../roles/ai-engineer.md).

**Transition map**
| From | Transfers | New to learn |
|---|---|---|
| Frontend | Streaming UIs, error/retry UX, safe rendering of model output (OWASP LLM10:2026, Improper Output Handling), accessible status updates (WCAG 4.1.3), product sense | Tool use, structured output, evals, RAG, cost/latency, prompt injection (OWASP LLM01:2026), Python for some postings |
| Backend | API design, data modeling, system design, deployment, observability | LLM behavior, RAG, evals, agent orchestration |
| Fullstack | Both of the above | Mostly evals and RAG |
| Data engineer | Data pipelines, Python | The LLM application layer; ML Engineer is a shorter move |

**Transition time:** Sources say 6–12 months (e.g. 9–12 months from frontend; one story of an 8-month move from React). Evidence: weak/anecdotal; depends on weekly hours.

---

## forward-deployed-engineer — Forward-Deployed Engineer (FDE)

**Definition:** An engineer who scopes, builds, and ships production software inside the customer's environment, on the customer's data and workflows. Expected to move comfortably between a codebase and a client meeting. Born from Palantir's model; growth is driven by companies such as Anthropic, OpenAI, Palantir, and Stripe. In 2026 postings at AI companies the FDE ships LLM agents and workflows connected to the customer's systems and owns discovery, scoping, evals, and handover as well as the build; an internal variant, embedded with the company's own business teams, also exists ([role pack](../roles/forward-deployed-engineer.md), 18 postings, 2026-11).

**Variant titles:** Applied AI Engineer, AI Solutions Deployment Engineer, Forward Deployed Software Engineer (FDSE), Forward Deployed AI Engineer, Frontier Agents Engineer (Scale AI), Agent Deployment Engineer (Decagon). The non-engineering half of the job is often posted separately as Deployment Strategist, AI Deployment Manager, or Deployment Lead.

**Demand signals**
| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| FDE postings | <200 (2023) → ~1,200 (2025) → >7,300 (Jan–Sep 2026) | US | posting count | [Lightcast via CNBC](https://www.cnbc.com/2026/10/15/aws-anthropic-racing-to-deploy-army-of-specialized-ai-engineers.html) | 2026-10 |
| Top posters, Jan–Sep 2026 | Deloitte 872, Accenture 688, Google 499, KPMG 447 | US | posting count | [Lightcast via CNBC](https://www.cnbc.com/2026/10/15/aws-anthropic-racing-to-deploy-army-of-specialized-ai-engineers.html) | 2026-10 |
| FDE postings | ~643 → ~5,330 (Apr 2025 → Apr 2026) | US, Indeed | posting count | [Business Insider via NextWave](https://winninghabits.beehiiv.com/p/the-rise-of-forward-deployed-engineers-the-ai-job-growing-amid-tech-layoffs) — evidence: weak (secondary) | 2026-04 |
| Open FDE roles at AI companies | 224 across 39 companies | Global | posting count | [KuCoin/CryptoBriefing](https://www.kucoin.com/news/flash/ai-industry-sees-1-000-surge-in-forward-deployed-engineer-hiring) — evidence: weak | mid-2026 |
| FDE postings | +1807% YoY | India, Indeed | growth | [Analytics India Magazine](https://analyticsindiamag.com/ai-news/forward-deployed-engineer-job-postings-in-india-grew-nearly-19x-in-a-year-report) | 2026-06 |
| Median advertised salary | $195,456 (+40% vs 2023) | US | salary | [Lightcast via CNBC](https://www.cnbc.com/2026/10/15/aws-anthropic-racing-to-deploy-army-of-specialized-ai-engineers.html) | 2026-10 |

**Market notes — Turkey:** EPAM Turkey posted "Senior Forward Deployed Engineer" and "Lead Forward Deployed Engineer" roles on kariyer.net (2026; both closed by 2026-08, per search snippets). Open on 2026-11-24: Wonderful "Forward Deployed Engineer" for Turkey (Ashby, posted 2026-03-12). Mundi (Istanbul, treasury startup) asks for Turkish and English and "production code with AI in the loop". BCG X's Forward Deployed AI Engineer role in Türkiye is marked filled.

**Typical skills:** Python, with TypeScript most often as a second language; discovery and scoping with customers; integrating with unfamiliar enterprise systems (APIs, webhooks, SaaS, legacy); tool use, agents, and MCP; evals and guardrails; security and governance inside the customer's environment; deploying into customer-owned cloud accounts; demos, playbooks, and handover docs; turning field feedback into product input. Full skill tree in the [role pack](../roles/forward-deployed-engineer.md).

**Caution:** Growth rates are huge but absolute posting counts are small; whether demand lasts and how clear the career path is are both debated ([IBTimes](https://www.ibtimes.co.in/ai-hiring-boom-pushes-fde-jobs-higher-questions-remain-907488)). The role is heavily customer-facing and English-heavy at global companies. In a 2025 sample of 1,000 postings, about 30% were rebranded sales or solutions roles ([Bloomberry](https://bloomberry.com/blog/i-analyzed-1000-forward-deployed-engineer-jobs-what-i-learned/), evidence: weak); in 18 postings from AI-company boards (2026-11), 1 was, but consultancies, the largest posters, weren't sampled.

---

## ai-product-engineer — AI Frontend / AI Product Engineer

**Definition:** A full-stack product engineer who owns AI features end to end: the interface, the backend and data around the model, the agents and tools, the evals and guardrails, and running it in production. Postings titled "AI Product Engineer" in late 2026 ask for full-stack ownership and product sense, not only the user-facing layer ([role pack](../roles/ai-product-engineer.md), 9 postings, 2026-11). **There's no standard title**; the same work shows up as "Applied AI Product Engineer", "Product Engineer" (at AI companies), "Full Stack AI Engineer", or "AI-native Software Engineer" ([GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer), 2026-10).

**Demand signals**
| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| Posting count can't be measured (no standard title) | — | — | qualitative | [GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer) | 2026-10 |
| Example: LangChain frontend (observability/eval platform) | $160K–$195K, 2+ years of frontend | US | salary | [GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer) | 2026-10 |
| Example: OpenAI Codex App and LangChain frontend roles | No model experience required | US | qualitative | [GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer) | 2026-10 |

**Market notes — Turkey:** EPAM Turkey "Senior AI Engineer with ReactJS" ([Kariyer.net](https://www.kariyer.net/is-ilani/epam-systems-turkey-yazilim-gelistirme-limited-sir-senior-ai-engineer-with-reactjs-4517381), 2026).

**Typical skills:** LLM API integration, prompt and context design, tool use and agents, evals, guardrails and LLM security, full-stack TypeScript with a database, deployment and operations, building with AI coding agents, product sense. On the interface side: streaming and cancellation, rendering tool calls, UI driven by structured output, safe rendering of model output, accessibility. The full, sourced skill tree with priorities is in the [role pack](../roles/ai-product-engineer.md).

**For whom:** The most natural move for frontend developers; for people who enjoy the interface layer more than the model layer.

---

## ai-security-engineer — AI Security Engineer

**Definition:** A security engineer who secures the LLM applications and agents a company builds or adopts: threat-models them, tests them adversarially (prompt injection, tool abuse, data exfiltration), and builds the controls around them, above all what an agent is allowed to do (scoped credentials, least privilege, approval for high-impact actions, limits on tools and data egress). Postings split into engineering (most), red teaming, research/ML defences, and governance; most expect prior security or AppSec experience ([role pack](../roles/ai-security-engineer.md), 13 postings, 2026-11).

**Variant titles:** Security Engineer, AI Security; Agent Security Engineer; AI Software Security Engineer; Security Engineer, Applied AI; AI Red Team Engineer (offensive variant); ML Engineer, AI Security (defences variant).

**Demand signals**
| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| AI Security Engineer postings | 2,409 (Jan–Sep 2026) | US | posting count | [CyberSN Cybersecurity Jobs Report](https://cybersn.com/resources/reports/cybersecurity-jobs-report) | 2026-10 |
| AI Security Engineer postings | +268.3% vs Jan–Sep 2025 | US | growth | [CyberSN via SecurityWeek](https://www.securityweek.com/us-cybersecurity-job-postings-fall-26-as-ai-security-engineer-demand-soars/) | 2026-10-18 |
| All cybersecurity postings (context) | 235,786 (Jan–Sep 2026), −26.4% YoY | US | posting count | [CyberSN via SecurityWeek](https://www.securityweek.com/us-cybersecurity-job-postings-fall-26-as-ai-security-engineer-demand-soars/) | 2026-10-18 |
| Open AI/ML security engineer postings | 850+; median advertised salary $140,000 | Not stated | posting count / salary | [SANS via Cybersecurity Dive](https://www.cybersecuritydive.com/news/ai-security-jobs-hiring-sans-tracker/833465/) | 2026-10-20 |
| AI red-team postings | ~100; median $124,000 | Not stated | posting count / salary | [SANS via Cybersecurity Dive](https://www.cybersecuritydive.com/news/ai-security-jobs-hiring-sans-tracker/833465/) | 2026-10-20 |

**Market notes — Turkey:** No private-sector posting titled "AI Security Engineer", "LLM security", or "AI red team" was found (2026-11; kariyer.net couldn't be read automatically, so this isn't a full check). The Presidency's Cybersecurity Directorate's 2026 contracted-specialist call ([Siber Güvenlik Başkanlığı](https://cdn.siberguvenlik.gov.tr/public/news/sinav_ilan_metni.pdf), closed 2026-09-11) listed AI regulation and AI development positions next to penetration-testing roles. In practice the work sits inside AppSec, cloud security, or AI engineering roles; remote roles in Europe are the realistic target.

**Typical skills:** Threat modelling LLM apps and agents; prompt injection, direct and indirect (OWASP LLM01:2026, ASI01 Agent Goal Hijack); agent permissions and excessive agency (LLM03:2026; ASI02, ASI03): least privilege, scoped credentials, human approval; sensitive-data disclosure and exfiltration (LLM02:2026); non-human identity (OAuth, service accounts, secrets); adversarial testing, manual and automated (Promptfoo, PyRIT, Garak, Inspect AI), turned into CI regression tests; guardrails and their limits; MCP and connector security; AI supply chain (LLM04:2026, ASI04); logging and incident response for agents. Frameworks: OWASP Top 10 for LLM Applications 2026, OWASP Top 10 for Agentic Applications 2026, MITRE ATLAS, NIST AI RMF. Underneath: classic application security, cloud IAM, Python. Full skill tree in the [role pack](../roles/ai-security-engineer.md).

**Transition map**
| From | Transfers | New to learn |
|---|---|---|
| Backend | APIs, authn/authz, service identities, data flows, CI/CD, logging | Application security practice, threat modelling, prompt injection and agent permissions, adversarial testing |
| Fullstack | The above, plus safe rendering of untrusted output (LLM10:2026) | Same as backend; identity and cloud IAM in more depth |
| Frontend | Output handling and XSS awareness, product sense | Backend, identity, cloud, and application security first: the longest path of the three |
| AI / LLM engineer | How agents, RAG, tool use, and evals work | Security fundamentals (authorization, identity, threat modelling), an offensive testing mindset |
| AppSec / pentester / cloud security | Threat modelling, web/API testing, IAM, reporting findings | How LLM apps and agents work (build one), AI-specific attack classes, automated LLM testing |

**For whom:** Developers who like breaking and hardening systems more than shipping features, and security engineers who want to specialize in AI. For an application developer without security experience, the realistic route is AppSec, or owning the security of AI features on their current team, first: 8 of 13 reviewed postings ask for prior security experience.

---

## ai-consultant — AI Consultant / Strategist

**Definition:** Helps organizations plan and roll out AI solutions. Less code, more analysis, communication, and process design.

**Demand signals**
| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| LinkedIn Jobs on the Rise | #2 | US | growth | [LinkedIn via NewsNation](https://digital-release.newsnationnow.com/business/fastest-growing-jobs-linkedin/amp) | 2026-01 |

**Typical skills:** LLMs, MLOps, computer vision (the most common skills LinkedIn lists); business analysis, presenting, change management. People moving into this role most often come from founder, software engineer, and product manager backgrounds.

---

## ml-engineer — Machine Learning Engineer

**Definition:** Trains, evaluates, and ships models to production and keeps them healthy: serving, pipelines, monitoring, retraining. In late-2026 postings the production side (deployment 18/23, monitoring 15/23) is asked for more often than modelling theory. The title covers three jobs: production/applied ML (most common), MLOps/ML platform (open to backend and SRE backgrounds), and model training/LLM adaptation (fine-tuning, post-training, GPU clusters). The modelling side requires a math and deep learning foundation ([role pack](../roles/ml-engineer.md), 23 postings, 2026-11).

**Variant titles:** MLOps Engineer, ML Platform Engineer, Applied ML Engineer, AI/ML Engineer, Makine Öğrenmesi Mühendisi (TR).

**Demand signals**
| Signal | Value | Scope | Type | Source | Date |
|---|---|---|---|---|---|
| ML Engineer median total comp | $282,750 | US, self-reported | salary | [Levels.fyi via GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-to-ai-engineer) | 2026-10 |
| Published base-pay ranges in reviewed postings | USD 161,300–301,000 (senior and staff) | US, 5 postings | salary | [role pack](../roles/ml-engineer.md), P1–P3, P11, P12 | 2026-11 |

**Market notes — Turkey:** 7 of the 23 reviewed postings (2026-10/11), in Istanbul, Ankara, and remote. Classical ML and Spark are common (Oredata, Datazza); on-prem deployment stands out (OpenShift in 2 postings; Orbina runs on-prem GPU inference with vLLM). Sectors: aviation, defence R&D (RockSoft, posted in Turkish, asks for linear algebra and probability explicitly), drones and computer vision, GenAI platforms.

**Typical skills:** Python, SQL, and Spark; classical ML (scikit-learn, gradient-boosted trees) and evaluation; PyTorch and one domain (recommendations, forecasting, computer vision, NLP); serving, Docker and Kubernetes, CI/CD, MLflow, drift monitoring and retraining; one cloud ML platform. Fine-tuning and LLMs appear in a minority of postings (fine-tuning 4/23, LoRA 0/23). Full skill tree in the [role pack](../roles/ml-engineer.md).

**For whom:** The longest path for application developers. Backend and platform developers have a shorter way in through MLOps-leaning roles; data engineers have a shorter path overall.

---

## Watchlist

Roles not yet confirmed by two independent sources, or with unclear volume:
- **AI Evaluation Engineer / Specialist** – builds eval pipelines; a single anecdotal source ([AlgeriaTech](https://algeriatech.news/ai-talent-shift/)). Evidence: weak.
- **AIUX Engineer** – interface engineer focused on AI orchestration; so far a prediction ([LeadDev](https://leaddev.com/?p=27774)). Evidence: weak.
- **Director / Head of AI** – near the top of the Australia and UK lists; a leadership role rather than a developer transition.

---

## Changelog

- **2026-11-20** – `ai-product-engineer`: definition and typical skills updated from 9 current postings (the role is now full-stack, not frontend-only); links to the new role pack `data/roles/ai-product-engineer.md`. OWASP references updated to the 2026 edition.
- **2026-11-18** – Translated to English; Turkey data moved into per-role "Market notes". Role id `ai-yetkin-gelistirici` renamed to `ai-fluent-developer`.
- **2026-11-18** – First version. Sources: LinkedIn Jobs on the Rise 2026, Dice, Ceipal, Indeed Hiring Lab, Lightcast, Veritone, GreatFrontEnd, Kariyer.net.
