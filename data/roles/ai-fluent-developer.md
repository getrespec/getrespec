---
role: ai-fluent-developer
title: AI-fluent developer
status: researched
last_researched: 2026-11-24
postings_reviewed: 28
---

# Role pack: AI-fluent developer

What someone in this role is expected to know, how important each skill is, in what order to learn it, and how to check it. `/respec plan` builds the coverage map and the curriculum from this file; `/respec update-trends` refreshes it. Format: `data/roles/README.md`.

## The role in 2026

**Key finding:** in ordinary developer postings (Software Engineer, Frontend, Backend, Full Stack, Mobile), the AI part is mostly about **how you build, not what you build**. Every posting reviewed here mentions AI coding tools (they were chosen for that), most as a daily expectation and some as a nice-to-have. The stronger ones spell out what that means: delegate tasks to an agent, give it context and constraints, then review, test, and take ownership of what it produces. Building LLM features into the product shows up in about a third of the postings (9/28), and in four of those it is a nice-to-have.

How much the postings say varies a lot. In 8 of the 28 postings (P4, P5, P10, P11, P13, P17, P23, P27) AI takes one to three lines ("Familiarity with AI-assisted development tools such as GitHub Copilot, Claude, or similar"). At the other end, a few describe a full workflow: context files such as `CLAUDE.md` kept up to date as documentation ([Control Risks](https://jobs.workable.com/view/iQVquXDFSszjxfR5ps4tWK/hybrid-full-stack-developer-in-madrid-at-control-risks)), agents connected to Jira, Sentry, and Datadog through MCP ([Thanx](https://jobs.workable.com/view/tAPcorVHyWjcSW17FsKgJf/remote-senior-software-developer-in-toronto-at-thanx)), or "you can explain how: which tools you use, which tasks you delegate to agents, how you give them context, and how you verify and review their output" ([Wingie Enuygun Group](https://jobs.workable.com/view/onw3TczKfHuA1FvTG8WHwD/hybrid-software-engineer-(ai-native)-in-istanbul-at-wingie-enuygun-group)).

Two things recur across markets:
- **Accountability stays with the developer.** "You stay accountable for every line that ships" (P1, P2); "AI-generated code gets reviewed like any other code" (P18); "without lowering review standards" (P28).
- **Fundamentals still count.** "AI amplifies strong fundamentals and doesn't replace them" (P1, P2). Testing, code review, and architecture are written into the same postings.

Senior postings add leading the team's adoption: mentoring, shared workflows, reusable skills (P12, P24, P26).

**Compared with `roles.md`:** the definition holds. The "Typical skills" line lists LLM API integration next to directing agents as if they weighed the same, but the evidence puts directing and verifying agents first and product LLM integration second.

Other titles for the same work: Software Engineer (AI-Native), Agentic Software Developer, Agentic-First Software Engineer, and titles that name the tools (for example "Fullstack Developer 2.0 (PHP + React + Cursor/Windsurf)"). In Turkey: "… (AI Odaklı)" or "Yazılım Geliştirici (… Yapay Zekâ …)".

## Postings reviewed

All read on 2026-11-24. "Board" means the employer's own posting, read in full: Workable postings through Workable's public job API, Trendyol through Lever's public API. "Partial" means only the AI-related lines and the stack were extracted. Postings were selected because they mention AI tools or LLMs, so this table shows what such postings ask, not how common they are (for that, see Market notes). Dates are the board's creation date.

| # | Company | Title | Location | Posted | Read from | What it says about AI |
|---|---|---|---|---|---|---|
| P1 | [Wingie Enuygun Group](https://jobs.workable.com/view/onw3TczKfHuA1FvTG8WHwD/hybrid-software-engineer-(ai-native)-in-istanbul-at-wingie-enuygun-group) | Software Engineer (AI-Native) | Istanbul (hybrid) | 2026-11-12 | board | Claude Code daily for design, code, review, refactoring legacy, tests, debugging, docs; make codebases agent-ready (docs, conventions, tests, MCP servers); explain how you delegate, give context, and verify; nice-to-have: LLM APIs, RAG or agents in production, evals, cost and latency. Backend: Go, .NET, PHP, Node.js, Python |
| P2 | [Wingie Enuygun Group](https://jobs.workable.com/view/f3DMET9THJnnvF2CFCFqNP/hybrid-mobile-engineer-(ai-native)---ios-%26-android-in-i%CC%87stanbul-at-wingie-enuygun-group) | Mobile Engineer (AI-Native) – iOS & Android | Istanbul (hybrid) | 2026-11-12 | board | Claude Code across the cycle, including porting code between native and React Native; delegate multi-step tasks, give context, review and verify; nice-to-have: AI features (LLM APIs, on-device ML) |
| P3 | [Trendyol](https://jobs.lever.co/trendyol/4bf7e1b0-1e26-4a2f-9208-f156b8437e8c) | Software Engineer | Istanbul, Ankara, Izmir (hybrid) | evergreen (created 2017-06-08, text current) | board | "AI-Assisted Craft: Experience or strong willingness to use modern AI coding tools (Cursor, Codex, LLMs) while keeping code quality and security standards high"; "AI-assisted workflows". Java/Go/C#/Kotlin/Node.js; frontend a strong plus |
| P4 | [Pazarama](https://freehire.me/jobs/backend-developer-net-core-pazarama-bguj6trm) | Backend Developer (.Net Core) | Turkey | 2026-10-12 | index (partial) | "AI-Assisted Development": GitHub Copilot, ChatGPT, Claude in daily coding, used now or willing to start; follows AI trends. C#, .NET Core |
| P5 | [Rapsodo](https://jobs.workable.com/view/n4MiZUYZbN3ydxrGA3naBi/back-end-engineer-in-i%CC%87zmir-at-rapsodo) | Back-End Engineer | Izmir | 2026-09-25 | board | One line: AI-assisted development tools and integrating AI into the development lifecycle |
| P6 | [Rapsodo](https://jobs.workable.com/view/1J25X3iCHoJTgYSXT34LJt/game-engine%2F3d-developer-(godot)-in-i%CC%87zmir-at-rapsodo) | Game Engine/3D Developer (Godot) | Izmir | 2026-10-28 | board | Claude Code, Cursor or Copilot daily; "critically review generated code"; keep architecture docs and handoff notes; "evaluate and improve their output" |
| P7 | [Esli Endüstriyel](https://www.kariyer.net/is-ilani/esli-endustriyel-urun-paz-san-san-yazilim-gelistirici-python-yapay-zeka-ve-muhendi-4576162) | Yazılım Geliştirici (Python, Yapay Zekâ ve Mühendislik Otomasyon) | Antalya | 2026-10-09 | kariyer.net (partial) | LLM API integration, prompt design, structured output and validating it; AI with OCR to extract data from drawings and PDFs; AI-assisted development tools |
| P8 | [Hamiltonian Dynamics](https://jobs.workable.com/view/jAvbTQc5WUcfkeQsn6ZVXX/software-engineer-in-london-at-hamiltonian-dynamics) | Software Engineer | London | 2026-11-17 | board | Claude Code, Cursor, Copilot, Cline for coding, testing, debugging; "understanding, reviewing and testing the code it generates"; LLM APIs, SDKs, agentic workflows; reliability, security, guardrails, evaluating AI output |
| P9 | [Helical](https://jobs.workable.com/view/aHrjVhRThy43nCKsMwgr2Z/full-stack-developer-in-london-at-helical) | Full-Stack Developer | London | 2026-11-19 | board | Claude Code, Cursor, Codex daily: "clear direction and context, review what they produce, and verify it before it ships"; agentic features in the product: LLM tool calling, chat interfaces, MCP servers |
| P10 | [Creditstar](https://jobs.workable.com/view/p17oMQfTi11kEy77WYN2kj/hybrid-senior-software-engineer-in-london-at-creditstar) | Senior Software Engineer | London (also Poland) | 2026-10-30 | board | One line, nice-to-have: Claude Code, Cursor, Copilot |
| P11 | [Zoopla](https://jobs.workable.com/view/avcdwm4UYPVhcxWx6twAGE/hybrid-full-stack-engineer-in-london-at-zoopla) | Full Stack Engineer | London | 2026-11-11 | board | "You deeply make use of AI. You keep up with new tools"; use the speed to prototype and test ideas |
| P12 | [Yapily](https://jobs.workable.com/view/7KrMdsSDwmtLG6x5o6JybT/hybrid-senior-front-end-developer-in-london-at-yapily) | Senior Front End Developer | London | 2026-11-20 | board | Champion agentic coding workflows; mentor the team in adopting AI-native workflows |
| P13 | [Nomura](https://jobs.workable.com/view/sXyV3trAYKzW29RbUQeykh/software-developer---12-month-contract-in-london-at-nomura) | Software Developer (12-month contract) | London | 2026-11-12 | board | Interest in Claude Code and Copilot; AI for automated development, support, documentation |
| P14 | [The Vault](https://jobs.workable.com/view/jB4vFJ8DnDrzprW2F6LQKb/remote-senior-full-stack-engineer-in-berlin-at-the-vault) | Senior Full-Stack Engineer | Berlin / Warsaw / Lisbon (remote) | 2026-10-30 | board | Required: daily Cursor/Copilot/Claude Code for delivery, refactoring, test generation, "with disciplined verification and secure practices" |
| P15 | [Cara Care](https://jobs.workable.com/view/mc2EEUWUGSt2tkV5EooSNQ/remote-(senior)-full-stack-engineer-(m%2Ff%2Fx)---based-in-germany-in-berlin-at-cara-care) | (Senior) Full Stack Engineer | Germany (remote) | 2026-11-03 | board | Agents implement, refactor, generate tests; "define clear tasks and constraints, provide relevant context"; validate via review, tests, app checks; MCP to engineering and design tools (Figma); keep patient data and credentials out of unapproved tools |
| P16 | [Storyteq](https://jobs.workable.com/view/1mcKJXAh7mjEmHVBdGozep/hybrid-senior-full-stack-engineer-(typescript-%2F-node.js)-in-amsterdam-at-storyteq) | Senior Full Stack Engineer (TypeScript / Node.js) | Amsterdam | 2026-11-20 | board | AI tools and agents daily, push the team further; "If you are sceptical of AI … this isn't the right job"; nice-to-have: features on LLMs |
| P17 | [Treatwell](https://jobs.workable.com/view/gqAefDKSJLoor7LaKtUUYX/remote-seo-full-stack-engineer-in-netherlands-at-treatwell) | SEO Full Stack Engineer | Netherlands (remote) | 2026-11-18 | board | Plus: Claude, Cursor, "and clear opinions about where they genuinely add value" |
| P18 | [Control Risks](https://jobs.workable.com/view/iQVquXDFSszjxfR5ps4tWK/hybrid-full-stack-developer-in-madrid-at-control-risks) | Full Stack Developer | Madrid | 2026-11-06 | board | Claude Code with `CLAUDE.md`, `SKILLS.md`, `RULES.md` context files; turn Jira and Notion specs into structured prompts; maintain the context layer as documentation; review AI code like human code |
| P19 | [Telemedi](https://jobs.workable.com/view/hMzEKMa311nYZ5D82H34uG/remote-mid-fullstack-developer-2.0-(php-%2B-react-%2B-cursor%2Fwindsurf)-in-warsaw-at-telemedi) | Mid Fullstack Developer 2.0 (PHP + React + Cursor/Windsurf) | Warsaw (remote) | 2026-10-20 | board | Tools in the title; developers work in Cursor; Copilot "not good enough"; experience not required but the paradigm must be understood and practised |
| P20 | [Joom](https://jobs.workable.com/view/5etdJs1FPUwoHhU9Fe5cMd/hybrid-top-tier%2Fexceptional-software-engineer-in-lisbon-at-joom) | Software Engineer | Lisbon | 2026-10-20 | board | "AI Ready": Cursor, Claude Code, Copilot; LLM-driven internal tools; AI agents for service infrastructure |
| P21 | [Sago](https://jobs.workable.com/view/2JKszDZFuVjUq8eTzu65wt/remote-sr.-software-engineer-(full-stack)-in-woodbridge-township-at-sago) | Sr. Software Engineer (Full Stack) | US (remote) | 2026-11-18 | board | Direct agents to plan, implement, test, refactor; delegate multi-step tasks (Claude Code, Cursor, Copilot agent mode, Codex) with context and specs; critically review and own AI code for security and test coverage. C#/.NET, React |
| P22 | [Bask Health](https://jobs.workable.com/view/nmW9thjRF9zp7ptiH1Ryrd/hybrid-front-end-software-engineer-in-new-york-at-bask-health) | Front-End Software Engineer | New York | 2026-11-02 | board | AI-first with Cursor and Claude Code; own judgement for the quality bar; UIs that show what AI does for users; document prompts, patterns, workflows |
| P23 | [Neuberger Berman](https://jobs.workable.com/view/tPexWabRpHRsPpTwVQh5bA/full-stack-developer-iii---private-markets-applications-in-new-york-at-neuberger-berman) | Full Stack Developer III | New York | 2026-11-23 | board | One line: familiarity with Copilot, Claude or similar |
| P24 | [Wisedocs](https://jobs.workable.com/view/1iLQL4vmdcxh3k9tMGRXUJ/hybrid-senior-front-end-engineer-in-toronto-at-wisedocs-ai) | Senior Front End Engineer | Toronto | 2026-11-20 | board | Lead adoption of agentic and AI-assisted tools; hands-on LLM or agentic tooling; interfaces that let customers review and verify AI output |
| P25 | [Liberty Mutual Canada](https://jobs.workable.com/view/jM6jYjK3FSBm1Cuby39wL4/hybrid-software-developer-(node.js-%26-python)-in-toronto-at-liberty-mutual-canada) | Software Developer (Node.js & Python) | Toronto | 2026-10-13 | board | LLM-powered services in Python, FastAPI, Pydantic; agentic engineering with coding agents, Copilot agent mode, MCP tooling (strong plus) |
| P26 | [Thanx](https://jobs.workable.com/view/tAPcorVHyWjcSW17FsKgJf/remote-senior-software-developer-in-toronto-at-thanx) | Senior Software Developer | Toronto (remote) | 2026-10-14 | board | Claude Code as primary tool with MCP to production data, Jira, Notion, Sentry, Datadog; "demonstrated productivity gains"; preferred: reusable AI workflows, skills, tooling |
| P27 | [BizCover](https://jobs.workable.com/view/fgTj1x2heVVvFyfUK5AiFt/hybrid-front-end-developer---experimentation-in-sydney-at-bizcover) | Front End Developer – Experimentation | Sydney | 2026-11-02 | board | One line: "You use AI coding tools in your work and have views on them" |
| P28 | [CreditorWatch](https://jobs.workable.com/view/o1rPYtZMFFHLpnBCtWcqYx/hybrid-senior-software-engineer-(backend)-in-sydney-at-creditorwatch) | Senior Software Engineer (Backend) | Sydney | 2026-11-18 | board | Integrate AI services, LLMs, RAG into secure backends; responsible AI; AI tools "without lowering review standards"; AI used in at least one interview stage |

Markets: Turkey 7 (P1–P7), UK 6, Germany 2, Netherlands 2, Spain 1, Poland 1, Portugal 1, US 3, Canada 3, Australia 2.

## Skill tree

**Priority** comes from the postings above: `core` = in at least half of them, or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. **Seen in** counts the postings that ask for the skill. P4 and P7 were only partly read, so counts are a lower bound. Because every posting was chosen for mentioning AI, A1's 28/28 shows the selection, not market share. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.

Tool facts named below (context files, MCP, permissions) were checked against the vendors' docs on 2026-11-24 (see Sources). They change often: lessons must check them again.

### A. Working with coding agents

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| A1 | Daily use of an AI coding agent (Claude Code, Codex, Cursor, Copilot): modes, permissions, when to use chat, edit, or agent | core | 28/28 (tools named in 19) | – | Finish a real task in your own codebase with an agent, from prompt to merged change | Recorded session or written walkthrough |
| A2 | Directing an agent: break work into tasks, give context, constraints, and acceptance criteria; plan before code; iterate | core | definition; 6/28 explicitly | A1 | Write a task brief the agent completes without rework; say why a task is or isn't worth delegating | Same task with a weak and a strong brief; compare results |
| A3 | Using agents across the lifecycle: refactoring, writing tests, debugging, documentation, porting code | important | 7/28 | A2 | Refactor a legacy module and add tests with an agent, keeping behaviour unchanged | Assignment: before/after test run |
| A4 | Project context for agents: `AGENTS.md`, `CLAUDE.md`, Cursor rules, Copilot instructions, skills; keeping them current | important | 4/28 | A2 | Write a context file that makes an agent follow the repo's build, test, and style rules | Fresh agent session follows them without reminders |
| A5 | Connecting agents to tools through MCP (issue tracker, error monitoring, docs, design files), with scoped access | important | 4/28 | A1, C1 | Connect one MCP server, use it in a task, and explain what it can read and do | Working setup + access review |

### B. Verifying AI-written code

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| B1 | Reviewing and verifying agent output: read every diff, run it, check edge cases, own every line that ships | core | definition; 12/28 | A1 | Find the planted bugs in an agent-written change and explain each one | Review exercise with seeded defects |
| B2 | Tests and CI as the safety net: tests first or alongside, agent-written tests checked for real assertions, CI gates | important | 6/28 tied to AI work | B1 | Catch an agent's wrong change through tests before review | Assignment: failing test that catches a regression |
| B3 | Judgement: where agents help and where they add risk (security-critical code, unfamiliar domains, large rewrites); keeping the quality bar | important | 7/28 | B1 | Defend a choice to do a task by hand, or to delegate it, with reasons | Scenario quiz |

### C. Security when working with AI

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| C1 | Safe agent use: permission modes and sandboxing, keeping secrets and personal data out of prompts and unapproved tools, prompt injection through files, web pages and MCP tools, trusting MCP servers, reviewing generated code for vulnerabilities | core | 6/28; listed in `roles.md`; vendor docs make reviewing the user's job | A1 | Set up an agent with least privilege; explain how a poisoned README or web page could steer it and what stops it | Red-team exercise on own setup |
| C2 | Security of LLM features: OWASP Top 10 for LLM Applications 2026 (prompt injection, sensitive information disclosure, improper output handling, excessive agency) | advanced | 2/28; needed before shipping D1 | C1, D1 | Threat-model a small LLM feature and defend it against injection and unsafe output | Red-team exercise on own feature |

### D. LLM features in the product

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| D1 | Calling an LLM API from your app: keys server-side, errors and retries, a clear system prompt, structured output validated against a schema | core | definition; 9/28 (4 as nice-to-have) | – | Ship a small endpoint that returns schema-valid data and handles failures | Assignment with a validator and failure tests |
| D2 | Tool calling, simple agents, and MCP servers inside the product | important | 4/28 | D1, C2 | Let a model call two of your functions safely; expose one action as an MCP server | Assignment |
| D3 | Grounding with your data (RAG) | advanced | 2/28 | D1 | Answer from a document set and cite the source | Accuracy check on test questions |
| D4 | Evaluating LLM output: small test sets, regression checks, cost and latency | advanced | 2/28 | D1 | Compare two prompt versions on a test set with numbers | Eval report |
| D5 | UX for AI output: show what the AI did, let users check and correct it | advanced | 2/28 | D1 | Design a result view with sources, uncertainty, and undo | Design review |

### E. Working with AI on a team

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| E1 | Explaining your AI workflow with evidence: which tools, what you delegate, how you verify, what it changed | important | 4/28 (one employer uses AI in the interview) | A2, B1 | Give a five-minute account of a real task, with the diff and how you checked it | Interview-style defence |
| E2 | Raising the team's practice: shared context files, documented prompts and workflows, reusable skills, mentoring | important | 7/28 (mostly senior) | A4, E1 | Write a reusable skill or workflow another developer can use | Peer uses it on their task |

## Learning order

Prerequisites above define the order. A typical path: A1 → A2 → B1 → C1 → B2 → A4 → A3 → B3 → A5 → D1 → C2 → D2 → E1 (portfolio piece) → E2. D3–D5 only if the learner's product needs them.

C1 comes right after B1 on purpose: an agent runs commands and reads untrusted text from day one, so safe setup can't wait until the end. D1 comes after the agent work because the postings weigh it lower. For a learner who already builds LLM features at work, move D1 earlier.

## Market notes

**Share of postings (2026-11):** in Respec's own sample of jobs listed on Workable in ten cities (London, Berlin, Amsterdam, Warsaw, New York, San Francisco, Toronto, Lisbon, Madrid, Sydney) and created 2026-09-25 to 2026-11-24, 69 of 160 ordinary developer postings (43%) mention AI coding tools or AI-assisted development (keyword scan of the full text, AI-titled roles excluded; evidence: weak, one board, keyword matching). [InterviewStack](https://interviewstack.io/blog/how-ai-is-changing-frontend-developer-2026) found that 35.5% of 1,246 frontend postings on its board name a generative-AI tool or concept, and that Copilot appears in 7.1% (counted 2026-11-21; evidence: weak, one board, includes some employer boilerplate).

**Turkey (2026-11):**
- **Large product companies now write AI tools into ordinary developer postings.** Examples: Wingie Enuygun (P1, P2: daily agent use is the role's identity), Trendyol (P3: "AI-Assisted Craft"), Pazarama (P4: Copilot, ChatGPT, Claude in daily coding), and Rapsodo in Izmir (P5, P6).
- **Smaller employers on kariyer.net and techcareer.net put "AI" in developer titles and combine it with full-stack work:**
  - ADOREL Yazılım, "Laravel Full Stack Yazılım Geliştirici (Laravel + AI Odaklı)", Ankara, 2026-02 ([kariyer.net](https://www.kariyer.net/is-ilani/adorel-yazilim-ve-bilisim-dis-ticaret-a-s-laravel-full-stack-yazilim-gelistirici-laravel-4372859)). It calls AI competence "Çok Önemli" (very important): Cursor and ChatGPT/Copilot to generate code, refactor, write test scenarios, and analyse bugs.
  - Asset GLI, "Full Stack Developer (AI & Rag Odaklı)", Istanbul, 2026-06-02, now closed ([techcareer.net](https://www.techcareer.net/jobs/detail/full-stack-developer-ai-rag-odakl-4466750)). It asks for .NET and React plus RAG, Azure OpenAI, and Copilot/Cursor.
  - Both postings are older than 60 days, so they aren't counted in the skill tree.
- **Not every posting mentions AI.** A keyword scan of the full text found no AI mention in some current Turkish developer postings on Workable:
  - Symphony Solutions, Senior React Native Engineer (2026-11-17)
  - Logifuture, Senior .NET Back End Developer, Ankara (2026-08-31)
  - Rapsodo, Backend Team Leader (2026-11-04)
- **"Fullstack or LLM experience in most backend postings" (founder observation) is partly supported but not measured.** AI coding-tool use is a written expectation at several large Turkish employers. LLM integration experience appears mostly as a nice-to-have or in AI-titled roles. Full-stack plus AI shows up mainly in smaller companies' postings. Workable lists too few Turkish developer jobs to estimate a share, and kariyer.net couldn't be counted in this pass.

**Poland (2026-10):** Telemedi puts the tools in the title ("PHP + React + Cursor/Windsurf") for junior, mid, and senior full-stack roles (P19).

## Sources

- The postings in the table above (read 2026-11-24).
- Workable public job API (`jobs.workable.com/api/v1/jobs`), queried 2026-11-24 for the share count in Market notes (own sample; evidence: weak).
- [InterviewStack – How AI is changing the frontend developer role in 2026](https://interviewstack.io/blog/how-ai-is-changing-frontend-developer-2026) (updated 2026-11-21; evidence: weak).
- [AGENTS.md](https://agents.md/) (checked 2026-11-24): open format for agent instructions, stewarded by the Agentic AI Foundation (Linux Foundation); supported by Codex, Cursor, GitHub Copilot coding agent, Gemini CLI, and others.
- [Claude Code – How Claude remembers your project](https://code.claude.com/docs/en/memory) (checked 2026-11-24): `CLAUDE.md`, `AGENTS.md`, `.claude/rules/`, auto memory.
- [Claude Code – Security](https://code.claude.com/docs/en/security) (checked 2026-11-24): permission modes, sandboxing, prompt injection, MCP trust, "You're responsible for reviewing proposed code and commands for safety before approval".
- [GitHub Docs – Adding repository custom instructions for Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) (checked 2026-11-24): `.github/copilot-instructions.md`, path-specific `.instructions.md`, `AGENTS.md`, `CLAUDE.md`/`GEMINI.md`; used by the cloud agent and code review.
- [Cursor – Rules](https://cursor.com/docs/context/rules) (checked 2026-11-24): project rules in `.cursor/rules` (`.mdc`), user rules, team rules, `AGENTS.md`.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) (page states publication 2026-08-03). The entry IDs for 2026 weren't verified in this pass, so C2 names the risks without numbers. Check the PDF before a lesson cites IDs.

## Changelog

- 2026-11-24: first version, from 28 postings.
