---
role: ml-engineer
title: Machine Learning Engineer
status: researched
last_researched: 2026-11-24
postings_reviewed: 23
---

# Role pack: Machine Learning Engineer

What someone in this role is expected to know, how important each skill is, in what order to learn it, and how to check it. `/respec plan` builds the coverage map and the curriculum from this file; `/respec update-trends` refreshes it. Format: `data/roles/README.md`.

## The role in 2026

**Key finding:** in current postings, "Machine Learning Engineer" is **mostly about getting models into production and keeping them healthy**, not about inventing models. Deployment, monitoring, pipelines, containers, and CI/CD show up in more postings than deep learning theory. Modelling still matters: postings expect you to train, evaluate, and challenge a model ("recognize a wrong model in production", P6), but the work that fills the week is the system around the model.

The title covers three different jobs. Read which one a posting means:

1. **Production ML / applied ML** (most postings): classical ML and deep learning for ranking, recommendations, forecasting, fraud, or vision; feature pipelines; offline evaluation, then A/B tests; serving and monitoring. Examples: Coinbase (P2), SIXT (P6), Oredata (P18), Trackier (P14).
2. **MLOps / ML platform:** builds the platform that other teams train and deploy on: Kubernetes, CI/CD, registries, observability, GPU efficiency. Several of these postings say outright that a backend, SRE, or platform background is welcome and deep algorithm knowledge is not required (ASOS P4, Bosch P10). **This is the shortest door for a backend developer.**
3. **Model training / LLM adaptation:** fine-tuning and post-training (preference optimization, distillation), training foundation models on GPU clusters, serving open-weight models. Examples: FloQast (P1), Biohub (P3), Orbina (P20), OneSec (P21). Fewer postings, more math and GPU depth.

LLMs have entered the role, but as one more component: 5 of 23 postings require real LLM work (fine-tuning, RAG, LLM pipelines, LLM evaluation) and 2 more list it as a plus. LoRA and other parameter-efficient methods were **not named in any** of the 23 postings; fine-tuning was named in 4.

**Honest note on entry:** almost every posting asks for years of production ML experience (2+ to 5+ years; 13 of 23 have "Senior" in the title). A developer without ML experience should expect to enter through an MLOps-leaning role or by moving into ML inside their current company, with a portfolio of shipped, monitored models, rather than straight into a senior modelling role.

Other titles for the same work: MLOps Engineer, ML Platform Engineer, Applied ML Engineer, AI/ML Engineer, Makine Öğrenmesi Mühendisi (TR). "AI Engineer" sometimes means this role and sometimes LLM application work (see `ai-engineer` in `data/market/roles.md`).

## Postings reviewed

All read on 2026-11-24. "Board" means read in full from the employer's own job board (Lever, Greenhouse, SmartRecruiters, or Workable, through their public posting APIs or pages). "LinkedIn" means the full text was read on LinkedIn's public job page; its posted date comes from a job index. "Partial" means only an extracted summary was read.

| # | Company | Title | Location | Posted | Read from | Stack and notes |
|---|---|---|---|---|---|---|
| P1 | [FloQast](https://jobs.lever.co/floqast/4d67a4dd-c2f3-4542-a95a-cd40647d4b07) | Senior Machine Learning Engineer | San Jose, US | 2026-11-18 | board | Python, PyTorch; fine-tuning, post-training, preference optimization; "when a fine-tuned open-weight model beats a hosted one"; evals as automated release gates; serving with latency targets; drift and retraining; AWS, containers, GPU; Airflow, Iceberg, Trino; USD 196–235K |
| P2 | [Coinbase](https://job-boards.greenhouse.io/coinbase/jobs/8347602) | Senior Machine Learning Engineer | Remote (US) | 2026-11-06 | board | Python or Go; PyTorch, GBDTs, Spark/Databricks, Ray, Kafka, Tecton; recommendations, ranking, contextual bandits; offline evaluation, training-serving skew, online A/B tests; LLM pipelines with automated evaluation; USD 213,750–225,000 base |
| P3 | [Biohub](https://job-boards.greenhouse.io/biohub/jobs/7747522) | Machine Learning Engineer, AI | New York, US | 2026-04-08 (updated 2026-11-11) | board | Older than 60 days, still open. Python, PyTorch, CUDA, custom training loops; multi-GPU training, checkpointing; fine-tune and evaluate foundation models; petabyte data pipelines; Slurm, Docker, Kubernetes; USD 214–268K (senior) |
| P4 | [ASOS](https://jobs.smartrecruiters.com/ASOS/744000162477359-senior-machine-learning-engineer-mlops-) | Senior Machine Learning Engineer (MLOps) | London, UK | 2026-11-19 | board | Platform role; welcomes backend, SRE, platform backgrounds. Kubernetes, CI/CD, Terraform/Pulumi, observability; batch and real-time inference; feature stores; AWS/Azure/GCP |
| P5 | [ASOS](https://jobs.smartrecruiters.com/ASOS/744000162476839-senior-machine-learning-engineer-recommendations-search-) | Senior Machine Learning Engineer (Recommendations/Search) | London, UK | 2026-11-19 | board | PyTorch or TensorFlow; recommendations, ranking, retrieval; distributed training on large data; batch and real-time serving; MLOps lifecycle |
| P6 | [SIXT](https://jobs.smartrecruiters.com/SIXT/744000161268810--senior-machine-learning-engineer-m-f-d-) | (Senior) Machine Learning Engineer | Lisbon, Portugal | 2026-11-12 | board | Python, SQL, plus Go or Java; forecasting, regression, optimization; training/serving skew, leakage, drift; shadow runs, champion/challenger, rollback; model registry, CI/CD, AWS; orchestrating coding agents across the ML lifecycle |
| P7 | [Endava](https://jobs.smartrecruiters.com/Endava/744000161327859-machine-learning-engineer-) | Machine Learning Engineer | Córdoba, Argentina | 2026-11-12 | board | Deployment-focused: REST/gRPC serving, Docker, Kubernetes, AWS; Airflow feature pipelines; drift detection, alerting, retraining; CI/CD, IaC; MLflow, SageMaker, Feast as a plus |
| P8 | [Sia](https://jobs.smartrecruiters.com/Sia/744000163227830-machine-learning-engineer) | Machine Learning Engineer | Amsterdam, Netherlands | 2026-11-23 | board | Consulting. MSc; Python plus Scala/C++/Java; one domain (CV, DL, NLP); SQL; Spark/Databricks; Docker, Kubernetes; Dutch required |
| P9 | [CERN](https://jobs.smartrecruiters.com/CERN/744000161227765-machine-learning-engineer-te-dps-aim-2026-223-ld-) | Machine Learning Engineer | Geneva, Switzerland | 2026-11-12 | board | Federated learning for healthcare; differential privacy, homomorphic encryption; PyTorch/TensorFlow/JAX/scikit-learn; statistics and EDA; Master's or equivalent |
| P10 | [Bosch](https://jobs.smartrecruiters.com/BoschGroup/744000163145558-senior-machine-learning-engineer) | Senior Machine Learning Engineer | Bangalore, India | 2026-11-23 | board | DL infrastructure for driver assistance: Kubernetes, Azure ML, Ray, PyArrow; GPU efficiency (H100/H200); data loaders; GitHub Actions, Grafana, Prometheus; model compression on edge boards; "deep algorithm knowledge is not mandatory" |
| P11 | [ServiceNow](https://jobs.smartrecruiters.com/ServiceNow/744000162529089-senior-machine-learning-engineer) | Senior Machine Learning Engineer | Santa Clara, US | 2026-11-19 | board | AI search. Java or Python, OOP, algorithms, "core AI/ML techniques", unit testing, profiling; USD 161,300–274,200 base |
| P12 | [ServiceNow (Moveworks)](https://jobs.smartrecruiters.com/ServiceNow/744000161581655-senior-machine-learning-engineer-agent-eval-platform) | Senior Machine Learning Engineer, Agent Eval Platform | Santa Clara, US | 2026-11-13 | board | "Not a model-training role": LLM-as-judge calibrated against human labels, offline/online divergence; at least 3 of: SFT, preference tuning, distillation, RLHF, annotation programs, recsys evaluation |
| P13 | [EY Greece](https://jobs.workable.com/view/ussYTQ8yTwGbxc1WiwYK1W/machine-learning-engineer-in-patras-at-ey-greece) | Machine Learning Engineer | Patras, Greece | 2026-11-24 | board | MLOps consulting: deploy and monitor models, CI/CD, data pipelines, AWS/Azure/GCP; MLflow, Kubeflow, SageMaker as a plus; Kaggle or personal projects accepted as evidence |
| P14 | [Trackier](https://jobs.workable.com/view/t6jWvKghJhEPNcPNf5GXRQ/remote-machine-learning-engineer---%28founding-ml-hire%29-in-noida-at-trackier) | Machine Learning Engineer (Founding ML Hire) | Noida, India / remote | 2026-11-23 | board | Python, SQL; Spark, Flink, Kafka, Airflow, ClickHouse; gradient boosting, anomaly detection, forecasting, ranking; experiment tracking, monitoring, retraining |
| P15 | [Intella](https://jobs.workable.com/view/8yAVi3DYNRsngp7UAWixNR/senior-ai-and-machine-learning-engineer-in-maadi-at-intella) | Senior AI and Machine Learning Engineer | Maadi, Egypt | 2026-11-23 | board | NLP; Master's or PhD; PyTorch, TensorFlow, scikit-learn, NumPy, pandas; unit tests; packaging models for production; Spark, SQL; Docker |
| P16 | [ASUS Robotics & AI Center](https://jobs.workable.com/view/j6ePJS9xTWCoySrG8aqvDL/machine-learning-engineer-in-taipei-at-asus-robotics-%26-ai-center) | Machine Learning Engineer | Taipei, Taiwan | 2026-11-19 | board | Computer vision (detection, segmentation); PyTorch or JAX, OpenCV; accuracy/latency targets; monitoring and retraining; labeling guidelines, imbalanced data; CI/CD for ML; CUDA/Triton as a plus |
| P17 | [Libertex Group](https://jobs.workable.com/view/3zBvvPrWeHFCG25TAsDeqS/machine-learning-engineer-%28remote-or-relocation-to-montenegro%29-in-turkey-at-libertex-group) | Machine Learning Engineer (Remote or Relocation to Montenegro) | Turkey (remote) | 2026-11-23 | board | Fintech: LTV, churn, antifraud, uplift; Python, PyTorch, SQL, ClickHouse; AWS SageMaker, Bedrock, EKS; Docker, FastAPI, Kafka, Airflow; model versioning, CI/CD; LLMs, RAG, agents, MCP |
| P18 | [Oredata](https://apply.workable.com/oredata/j/B9F9053526/) | Senior Machine Learning Engineer | Istanbul, Turkey | 2026-10-14 | board | Aviation. Classical ML: scikit-learn, XGBoost, LightGBM; Spark/PySpark; segmentation, recommendations, forecasting; hyperparameter tuning; monitoring and automated retraining; SQL (Teradata, Oracle); OpenShift, feature store as a plus |
| P19 | [Datazza](https://www.linkedin.com/jobs/view/4481025539/) | Senior Machine Learning Engineer | Istanbul, Turkey | 2026-10-24 | LinkedIn | Python, SQL; statistics, model evaluation; scikit-learn, XGBoost, LightGBM, PyTorch, TensorFlow; MLflow, Airflow, Kubeflow; Spark; Docker, Kubernetes, CI/CD; drift detection and feature stores as a plus |
| P20 | [Orbina](https://www.linkedin.com/jobs/view/4484085873/) | Senior Machine Learning Engineer/GenAI | Turkey | 2026-10-27 | LinkedIn | LLMs, RAG, fine-tuning LLMs, agents; on-prem GPU inference servers, vLLM; vector DBs (Milvus, Weaviate, pgvector); MLOps; data privacy and compliance |
| P21 | [OneSec](https://www.linkedin.com/jobs/view/4485028093/) | Machine Learning Engineer for Frontier AI project | Istanbul, Turkey | 2026-11-04 | LinkedIn | 3D foundation model for drone navigation; deep learning, CNNs, PyTorch, CUDA, OpenCV; architectures, hyperparameters, GPU training; pseudo-labels and synthetic data |
| P22 | [RockSoft](https://www.linkedin.com/jobs/view/4489755632/) | Kıdemli Makine Öğrenmesi Mühendisi (Senior Machine Learning Engineer) | Ankara, Turkey | 2026-11-16 | LinkedIn | Defence R&D, posting in Turkish. Linear algebra, probability, statistics, numerical optimization; PyTorch or TensorFlow; overfitting, imbalance, leakage; reading papers; ONNX, MLflow, W&B as a plus |
| P23 | [Turkish Technology](https://careers.turkishtechnology.com/mlops-engineer.html) | MLOps Engineer | Turkey | not shown | board (partial) | MLOps lifecycle on-prem and cloud: Kubeflow, MLflow, Airflow, OpenShift, Kubernetes, feature store, model registry, Seldon; REST/gRPC; Databricks, AWS, Azure ML |

Markets: Turkey 7, US 5, UK 2, India 2, and one each from Portugal, Argentina, the Netherlands, Switzerland, Egypt, Taiwan, and Greece.

## Skill tree

Each skill is defined once in [`data/skills.md`](../skills.md): what it is, its prerequisites, the outcomes, and how to check it. This table says how this role asks for it.

- **Priority** comes from the postings above: `core` = in at least half of them (12 of 23), or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.
- **Seen in** counts the postings that ask for the skill. P23 was only partly read, so counts are a lower bound.
- **Skip** (in "In this role") marks what a learner with that background can usually test out of in placement instead of studying: `backend` = backend or platform developer, `data` = data engineer.
- **Depth** is `basic`, `working`, or `deep`, as defined in the catalog. **In this role** is what this role adds to the catalog's outcomes.
- **Was** is the skill's ID in this pack up to v0.2.0. `scripts/migrate-state.mjs` uses it to update learners' states; it is removed in the release after v0.3.0. An old ID on more than one row was split.

### Math and ML foundations

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `ml.python-data` | Python for data work | A1 | core | 20/23 | working | – |
| `ml.math` | The math that ML needs first | A2 | core | definition; named in 5/23 (rarely written down, assumed by "ML fundamentals" and degree requirements) | working | – |
| `ml.classical` | Classical ML | A3 | core | 13/23 (10 name methods or libraries, 3 ask for "ML fundamentals") | working | – |
| `ml.evaluation` | Evaluation and experiment design | A4 | core | 12/23 | working | – |

### Deep learning and PyTorch

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `ml.pytorch` | PyTorch | B1 | core | 14/23 | working | – |
| `ml.deep-learning` | Deep learning fundamentals | B2 | important | 7/23 | working | – |
| `ml.application-domain` | One application domain in depth | B3 | core | 13/23 ask for at least one | working | – |
| `ml.distributed-training` | GPU and distributed training | B4 | important | 6/23 | working | – |
| `ml.papers` | Reading papers and reproducing a method | B5 | important | 4/23 | working | – |

### Fine-tuning and LLMs

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `ml.fine-tuning` | Transfer learning and fine-tuning | C1 | important | 4/23 | working | – |
| `ml.llm-fine-tuning` | LLM fine-tuning methods | C2 | advanced | 3/23 (LoRA itself named in 0/23) | working | – |
| `rag.design` | LLMs as a system component | C3 | important | 5/23 required + 2 as a plus | working | LLM pipelines and agents as one component of an ML system |
| `rag.search` | Embeddings and vector databases | C3 | important | counted with `rag.design` (old C3) | working | – |
| `quality.evals` | Evaluating LLM and generative systems | C4 | important | 3/23 | deep | Measure how often the judge agrees with human labels |
| `ml.inference` | Inference optimization | C5 | important | 5/23 | working | – |

### Data for ML

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `eng.sql` | SQL | D1 | important | 11/23 (expected almost everywhere) | working | Build a training set from raw tables with joins and window functions. Skip: `data` |
| `ml.data-processing` | Large-scale data processing | D1 | important | counted with `eng.sql` (old D1) | working | Skip: `data` |
| `ml.feature-pipelines` | Feature and data pipelines | D2 | core | 13/23 | working | Skip: `data` (pipelines part) |
| `ml.datasets` | Data quality and data sets | D3 | important | 7/23 | working | – |

### Shipping and operating models (MLOps)

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `ml.serving` | Packaging and serving models | E1 | core | 18/23 | working | Skip: `backend` (API part) |
| `eng.kubernetes` | Containers and orchestration | E2 | core | 14/23 | working | Containerize training and serving. Skip: `backend` if already used |
| `ml.platform` | A cloud and one managed ML platform | E3 | core | 13/23 name a cloud; 7/23 name a managed ML platform | working | – |
| `ml.reproducibility` | CI/CD and reproducibility for ML | E4 | core | 15/23 (MLflow named in 5) | working | Skip: `backend` (CI/CD part) |
| `ml.monitoring` | Monitoring in production | E5 | core | 15/23 | working | – |
| `ml.rollout` | Safe rollout | E6 | important | 3/23 | working | – |
| `eng.iac` | Infrastructure as code | E7 | important | 3/23 | working | Training and serving infrastructure. Skip: `backend` (often) |

### Engineering and working with others

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `eng.software-engineering` | Production software engineering | F1 | core | definition; named in 10/23 | working | Turn research code into a tested, reviewed package; often a second language (Go, Java, Scala, C++). Usually known; confirm in placement. Skip: `backend` |
| `ml.system-design` | ML system design | F2 | important | 6/23 (mostly senior) | working | – |
| `work.problem-framing` | Framing business problems as ML problems | F3 | important | 7/23 | working | A target, a metric, and a baseline, or an argument that ML isn't needed; working with data scientists and product |
| `dev.lifecycle` | AI coding agents across the ML lifecycle | F4 | advanced | 2/23 | working | – |
| `dev.verify-output` | Verifying agent output | F4 | advanced | counted with `dev.lifecycle` (old F4, 2/23) | working | – |
| `ml.data-privacy` | Privacy, security, and compliance for training data | F5 | important | 3/23 | working | – |

### Specialties (senior or niche)

| ID | Skill | Was | Priority | Seen in | Depth | In this role |
|---|---|---|---|---|---|---|
| `ml.rl` | Reinforcement learning and reward modelling | G1 | advanced | 2/23 | working | – |
| `ml.federated` | Federated and privacy-preserving learning | G2 | advanced | 1/23 | working | – |
| `ml.edge` | Edge and embedded deployment | G3 | advanced | 2/23 | working | – |

## Learning order

Prerequisites above define the order. This is the longest path in Respec for an application developer, and it's honest to say so up front.

**How long:** we found no reliable source for how long the move takes. As a rough guide (an estimate, not sourced): expect well over a year of steady part-time study to reach a portfolio that matches a mid-level posting, longer than the AI Engineer path (6–12 months in `data/market/roles.md`, evidence weak). Postings then ask for 2–5+ years of production ML experience, which you build on the job. The realistic first step for most developers is an MLOps-leaning role or ML work inside their current company.

**Which math first:** you don't need a math degree to start, but you can't skip `ml.math`. Learn just enough to read a training loop: vectors, matrices and their shapes; derivatives and the chain rule (that is what backpropagation is); probability, expectation and variance; and the statistics behind evaluation and A/B tests. Leave eigenvectors, SVD, and formal optimization theory until a lesson needs them (`ml.deep-learning`, `ml.papers`). Learn the math next to code, not before all code: each concept should show up in a model you train the same week.

A typical path for a backend or full-stack developer:

1. **Foundations (`ml.python-data` → `ml.math` → `ml.classical` → `ml.evaluation`):** tabular ML with scikit-learn and boosted trees, and evaluation done properly. Many production postings (P14, P18, P19) are mostly this.
2. **Ship it early (`ml.serving` → `eng.kubernetes` → `ml.reproducibility` → `ml.monitoring`):** serve, containerize, track, and monitor the tabular model from step 1. Backend developers move fast here and should, because this is the most-requested part of the role.
3. **Data (`eng.sql` → `ml.data-processing` → `ml.feature-pipelines` → `ml.datasets`):** feature pipelines and training-serving consistency. Data engineers can mostly skip `eng.sql`, `ml.data-processing` and `ml.feature-pipelines`.
4. **Deep learning (`ml.pytorch` → `ml.deep-learning` → `ml.application-domain`):** PyTorch with a hand-written training loop, then one domain in depth. Choose the domain from your target postings.
5. **Cloud and rollout (`ml.platform` → `ml.rollout` → `eng.iac`, `ml.system-design`):** one managed platform, A/B tests, and system design.
6. **LLMs and fine-tuning (`rag.design` → `ml.fine-tuning` → `quality.evals` → `ml.inference` → `ml.llm-fine-tuning`), `ml.distributed-training`:** only after `ml.pytorch`. Go deeper here if your target postings are in the "model training / LLM adaptation" group.
7. **Capstone:** a model trained, evaluated, deployed, monitored, and retrained through a pipeline, with a write-up of the trade-offs (`eng.software-engineering`, `work.problem-framing` shown through it). The specialty skills (`ml.rl`, `ml.federated`, `ml.edge`) only if a target posting asks.

**Shorter path for a backend developer aiming at MLOps / ML platform roles** (P4, P7, P10, P13, P23): `ml.python-data` → `ml.math` (lighter) → `ml.classical` → `ml.evaluation` → `ml.serving`, `eng.kubernetes`, `ml.platform`, `ml.reproducibility`, `ml.monitoring`, `ml.rollout`, `eng.iac` → `ml.feature-pipelines` → `ml.pytorch` (enough to run and debug someone else's training loop) → `ml.distributed-training` → `ml.system-design`. This trades modelling depth for platform depth, which those postings say they want.

## Market notes

**Turkey (2026-11):** 7 of the 23 postings are from Turkey: Istanbul (Oredata, Datazza, OneSec), Ankara (RockSoft), nationwide or remote (Orbina, Turkish Technology, Libertex Group). What stands out:
- **Classical ML and Spark are common.** Oredata (P18) and Datazza (P19) ask for scikit-learn, XGBoost, LightGBM, and Spark for segmentation, recommendations, and forecasting, plus monitoring and retraining.
- **On-premise deployment.** OpenShift appears in two postings (P18, P23), and Orbina (P20) builds on-prem GPU inference with vLLM and stresses data privacy. Expect less managed-cloud work than in US postings.
- **Sectors:** aviation (P18, P23), defence R&D (P22, posted in Turkish and asking explicitly for linear algebra, probability, statistics, and numerical optimization), drones and computer vision (P21), GenAI platforms (P20), finance (P19 nice-to-have; P17 is a fintech hiring remotely from Turkey).
- **Volume:** a LinkedIn search page listed 84 "Machine Learning Engineer" postings in Greater Istanbul when searched on 2026-11-24 (search snippet only; LinkedIn counts include reposts and agencies; evidence: weak).
- An older posting, EY Türkiye's "MLOps Engineer Senior or Manager" on techcareer.net, is dated 2024-08-15 and wasn't counted.

**Elsewhere (2026-11):** US postings publish base pay between about USD 161K and 301K (P1, P2, P3, P11, P12; senior and staff levels). European postings often require the local language (Dutch at Sia, P8; Greek and English at EY Greece, P13; French to learn at CERN, P9). Consulting firms (Sia, EY Greece, Endava) hire MLEs to deploy clients' models, a more accessible entry point than product companies.

## Sources

- The postings in the table above (read 2026-11-24).
- Library versions, checked on PyPI on 2026-11-24 (they change monthly; check again before writing a lesson): PyTorch 2.15.0 (2026-10-28), Transformers 5.24.0, PEFT 0.22.0, TRL 1.18.2, vLLM 0.34.0, MLflow 3.18.0, scikit-learn 1.9.1, XGBoost 3.4.1, LightGBM 4.7.0.
- [PyTorch documentation](https://docs.pytorch.org/docs/stable/index.html), [PyTorch basics tutorial](https://docs.pytorch.org/tutorials/beginner/basics/intro.html), [distributed](https://docs.pytorch.org/docs/stable/distributed.html) and [FSDP](https://docs.pytorch.org/docs/stable/fsdp.html) (checked 2026-11-24).
- Hugging Face: [Transformers](https://huggingface.co/docs/transformers/index), [PEFT – LoRA](https://huggingface.co/docs/peft/main/en/developer_guides/lora) (covers LoRA and QLoRA), [TRL](https://huggingface.co/docs/trl/index) (SFT, DPO, GRPO, reward modelling), [LLM Course](https://huggingface.co/learn/llm-course) (checked 2026-11-24).
- [vLLM documentation](https://docs.vllm.ai/en/latest/) and [MLflow documentation](https://mlflow.org/docs/latest/) (checked 2026-11-24).
- Cloud ML platforms (checked 2026-11-24): [Amazon SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html); [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/overview-what-is-azure-machine-learning); Google Cloud's Vertex AI docs now redirect to [Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform), which has a "Name changes from Vertex AI" page. Use the current name in lessons.
- [scikit-learn](https://scikit-learn.org/stable/), [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), [Google – Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml), [Mathematics for Machine Learning](https://mml-book.github.io/) (Deisenroth, Faisal, Ong; free book), [fast.ai course](https://course.fast.ai/): learning resources for A2–B2.
- [Makerio – Startups on Ashby pay more…](https://dev.to/makerio/startups-on-ashby-pay-more-and-hire-more-remotely-50000-open-jobs-compared-with-greenhouse-569k) (data from 2026-11-18; written by an AI agent; evidence: weak): ML engineer remote share and median pay on Ashby and Greenhouse.

## Changelog

- 2026-11-27: skill tree moved to the shared catalog (`data/skills.md`). Rows now point to catalog IDs; old IDs are in the `Was` column. Split: C3 into `rag.design` + `rag.search`, D1 into `eng.sql` + `ml.data-processing`, F4 into `dev.lifecycle` + `dev.verify-output`. The "Skip" notes moved to "In this role". Counts and priorities unchanged.
- 2026-11-24: first version, from 23 postings.
