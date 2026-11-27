# Role map: what an Applied AI Engineer actually does

> Read this before the technical modules. Every later lesson points back to the tasks below.

<!-- section: what -->
## What this role is
An Applied AI Engineer builds product features on top of existing models, mostly LLMs called through an API. You don't train models. You decide what the model sees, how its answer is checked, what it costs, and how it shows up for the user.

The title covers a wide range: some postings are close to customer-facing consulting, others want PyTorch and model training, and most sit in between, doing product engineering on LLM APIs (GreatFrontEnd, 2026-10, via `data/market/roles.md`). The same work is also posted as **AI Software Engineer**, **GenAI Engineer**, **LLM Engineer**, and in Turkey as **Yapay Zeka Mühendisi**. When you read a posting, check which end of that range it means.

<!-- section: week -->
## A week in the role
Here's what a week could look like on the bookstore's support chat, the project the examples in this curriculum use.

| Task | Who asks for it | What you deliver | How it's judged |
|---|---|---|---|
| "Customers should be able to ask where their order is." | Product manager | A chat feature that calls the LLM from the server, streams the answer, and looks up the order with a tool | Answers are correct for real order numbers; the key never reaches the browser |
| "The bot made up a return policy." | Support lead | The real policy text put in front of the model (RAG), plus a rule to say "I don't know" | A set of test questions where the bot quotes the policy or declines |
| "Did the new prompt make things better or worse?" | Product manager | An eval set of 30–50 real questions and a script that scores each prompt version | A before/after score anyone on the team can re-run |
| "The API bill doubled this month." | Engineering manager | Token and latency numbers per request, then caching or a shorter history | Cost per conversation goes down without the eval score dropping |
| "Someone typed 'ignore your instructions' and got a discount code." | Security | Input and output checks, tools that can only do what the user is allowed to do | The attack from the report and five variations no longer work |
| "Can the bot also handle exchanges?" | Product manager | A multi-step flow: check the order, check the stock, ask the customer to confirm, then act | Each step is visible in the UI; nothing happens without confirmation |

Most of the week is not writing prompts. It's connecting the model to real data, measuring whether it works, and keeping it safe and affordable.

<!-- section: postings -->
## Real postings, decoded
This demo was written without a live search, so it uses the role's requirements as summarized in `data/market/roles.md` (sources: LinkedIn via Let's Data Science 2026-01, GreatFrontEnd 2026-10, ODSC 2026). A real `m00` decodes 2–3 current postings with company, source, and date.

| Requirement as postings word it | What it means in plain words | Where you stand |
|---|---|---|
| "Experience integrating LLM APIs into production applications" | Calling a model from your server, handling errors, streaming the answer | m02 |
| "Prompt and context engineering" | Deciding what text, data, and instructions the model sees, in what order | m01, m03 |
| "RAG, embeddings, vector search" | Finding the relevant documents and putting them in the prompt | m07, m08 |
| "Tool use / function calling, agents" | Letting the model ask your code to do things (look up an order), in a loop | m05, m09 |
| "Evaluation pipelines" | Measuring answer quality with a fixed test set instead of eyeballing | m06 |
| "Cost and latency optimization" | Knowing what each request costs and making it cheaper and faster | m12 |
| "LLM security (prompt injection)" | Stopping user text or documents from overriding your instructions | m11 |
| "Observability and deployment" | Logging and tracing each request so you can debug it in production | m10 |
| "TypeScript or Python" | Product-side roles accept TypeScript; ML-leaning roles want Python | Known (TypeScript); Python optional |
| "PyTorch, LangChain" | Model training library; an LLM framework | Optional (see skill map) |

<!-- section: skills -->
## Your skill map
| Skill | Status | Module or reason |
|---|---|---|
| Tokens, context window, temperature | In your plan | m01 |
| LLM API integration and streaming | In your plan | m02 |
| Prompt and context design | In your plan | m03 |
| Structured output | In your plan | m04 |
| Tool use | In your plan | m05 |
| Evals | In your plan | m06 |
| RAG | In your plan | m07 |
| Embeddings and vector search | In your plan | m08 |
| Agent loop | In your plan | m09 |
| Observability and deployment | In your plan | m10 |
| Prompt injection and safe rendering | In your plan | m11 |
| Cost, latency, prompt caching | In your plan | m12 |
| Consuming REST APIs, streaming UI state, TypeScript | You already know | Placement |
| Python | Optional | Some postings ask for it; product-side roles accept TypeScript |
| LangChain | Optional | You'll learn the patterns directly; add it if a posting you target asks for it |
| Fine-tuning | Optional | Worth it only after prompting and RAG fall short |
| PyTorch | Optional | Mostly in ML-heavy postings, which aren't your target |

<!-- section: carryover -->
## What carries over from your background
- **Streaming UIs and error states.** The "where is my order" task needs a streamed answer, a stop button, and a retry. You've built all three; the new part is the server side.
- **Safe rendering.** Model output is untrusted input. Your habit of escaping user content is exactly what the OWASP Top 10 for LLM Applications asks for (LLM10:2026, Improper Output Handling).
- **Accessibility.** Announcing streamed answers to screen readers (WCAG 4.1.3) is a skill few AI engineers have.
- **Design systems.** A schema-driven UI from structured output (m04) is a component library whose props come from the model.

<!-- section: path -->
## Your path
- **Foundations (m01–m04):** you can call a model safely from a server, control its output, and get structured data back.
- **Core skills (m05–m09):** you can give the model tools and documents, run multi-step flows, and prove a change made things better.
- **Production (m10–m12):** you can ship it: affordable, secure, and debuggable.
- **Capstone and job readiness (m13–m14):** a deployed support assistant you can demo, and a CV and interview story built around it.

<!-- section: check -->
## Check yourself
1. The support lead says the bot invents policies. Which skill does that task need, and what would you deliver?
2. A posting says "LLM Engineer, TypeScript, RAG, evals". Which modules prepare you for it?
3. Which of the six tasks above interests you most?
