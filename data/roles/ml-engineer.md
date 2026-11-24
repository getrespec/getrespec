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

**Priority** comes from the postings above: `core` = in at least half of them (12 of 23), or part of the role's definition; `important` = in 3 or more; `advanced` = in 1–2, or only in senior/staff postings. **Seen in** counts the postings that ask for the skill. P23 was only partly read, so counts are a lower bound. With `scope: job-ready`, a plan covers every `core` skill the learner doesn't already have; `full-role` adds `important` and `advanced`.

**Skip** marks what a learner with that background can usually test out of in placement instead of studying: `backend` = backend or platform developer, `data` = data engineer.

### A. Math and ML foundations

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| A1 | Python for data work: NumPy, pandas, notebooks vs packaged code | core | 20/23 | – | Load, clean, and reshape a data set; vectorize instead of looping; move notebook code into a tested module | Small task; code review |
| A2 | The math that ML needs first: vectors, matrices and shapes; derivatives and the chain rule; probability, distributions, expectation and variance; basic statistics and hypothesis tests | core | definition; named in 5/23 (rarely written down, assumed by "ML fundamentals" and degree requirements) | – | Compute a gradient by hand for a two-parameter model; explain a matrix multiply by its shapes; tell whether an A/B difference is likely noise | Worked-problem quiz with numbers |
| A3 | Classical ML: regression, classification, clustering, gradient-boosted trees, feature engineering (scikit-learn, XGBoost, LightGBM) | core | 13/23 (10 name methods or libraries, 3 ask for "ML fundamentals") | A1, A2 | Build a baseline and a boosted-tree model on tabular data and explain which features matter | Assignment on a tabular data set |
| A4 | Evaluation and experiment design: train/validation/test splits, metrics that fit the problem, overfitting, data leakage, class imbalance, hyperparameter search | core | 12/23 | A3 | Pick a metric for a business goal; find a leak in a pipeline; compare two models fairly | Scenario quiz + "find the leak" exercise |

### B. Deep learning and PyTorch

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| B1 | PyTorch: tensors, autograd, `Dataset`/`DataLoader`, writing the training and evaluation loop yourself, saving and loading checkpoints | core | 14/23 | A1, A2 | Train a small network with a hand-written loop; debug shape and device errors; resume from a checkpoint | Assignment: training loop with a loss curve |
| B2 | Deep learning fundamentals: layers, activations, loss functions, optimizers, learning-rate schedules, regularization; CNN and Transformer architectures | important | 7/23 | B1 | Explain why a loss curve diverges or plateaus and fix it; read a Transformer block and name each part | Debugging exercise; defence questions |
| B3 | One application domain in depth: recommendations and ranking, forecasting and time series, computer vision, or NLP | core | 13/23 ask for at least one | A4, B1 | Ship a model in the chosen domain with domain-appropriate metrics (e.g. NDCG, MAPE, mAP, F1) | Capstone in that domain |
| B4 | GPU and distributed training: mixed precision, multi-GPU data parallel (DDP, FSDP), data-loading bottlenecks, cost per run | important | 6/23 | B1 | Profile a training run, find whether GPU or data loading is the bottleneck, and fix it | Before/after throughput numbers |
| B5 | Reading papers and reproducing a method | important | 4/23 | B2 | Reimplement one result from a paper and report where it differs | Write-up with code |

### C. Fine-tuning and LLMs

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| C1 | Transfer learning: fine-tune a pretrained model (Hugging Face Transformers) and decide when fine-tuning beats prompting a hosted model on cost, latency, and accuracy | important | 4/23 | B1, A4 | Fine-tune a small pretrained model on a labelled set and compare it with a prompted hosted model on the same eval | Eval report with cost and latency |
| C2 | LLM fine-tuning methods: supervised fine-tuning, parameter-efficient methods (LoRA, QLoRA through Hugging Face PEFT), preference optimization (DPO), distillation | advanced | 3/23 (LoRA itself named in 0/23) | C1, B4 | Fine-tune an open-weight model with LoRA on one GPU and show it beats the base model on a held-out eval | Assignment with eval before/after |
| C3 | LLMs as a system component: embeddings, retrieval and vector databases, RAG, LLM pipelines, agents | important | 5/23 required + 2 as a plus | A4 | Build a retrieval pipeline and measure its answer quality | Eval of answer accuracy |
| C4 | Evaluating LLM and generative systems: eval suites as release gates, LLM-as-judge calibrated against human labels | important | 3/23 | C3, A4 | Build an eval set and a judge; measure how often the judge agrees with human labels | Eval report with agreement rate |
| C5 | Inference optimization: batching, quantization, compression, export (ONNX), serving engines for open-weight models (vLLM) | important | 5/23 | B1, E1 | Cut latency or cost of a served model without lowering its eval score | Before/after numbers |

### D. Data for ML

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| D1 | SQL and large-scale data processing (Spark/PySpark or similar) | important | 11/23 (expected almost everywhere) | A1 | Build a training set from raw tables with joins and window functions; run the same on Spark | Assignment. Skip: `data` |
| D2 | Feature and data pipelines: scheduled and streaming pipelines (Airflow, Kafka), feature stores, computing a feature once and serving it the same way in training and production | core | 13/23 | D1 | Build a daily feature pipeline and serve the same features online without skew | Assignment with a skew test. Skip: `data` (pipelines part) |
| D3 | Data quality and data sets: labeling guidelines, annotation quality, curation, synthetic data | important | 7/23 | A4 | Write labeling rules, measure label agreement, and show the effect of cleaner data on the model | Before/after eval |

### E. Shipping and operating models (MLOps)

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| E1 | Packaging and serving models: batch vs real-time inference, REST/gRPC endpoints (FastAPI or similar), latency and reliability targets | core | 18/23 | A3 or B1 | Serve a model behind an API with a latency budget, and run the same model as a batch job | Working service + load test. Skip: `backend` (API part) |
| E2 | Containers and orchestration: Docker, Kubernetes (or OpenShift) | core | 14/23 | E1 | Containerize training and serving; deploy to a cluster | Working deployment. Skip: `backend` if already used |
| E3 | A cloud and one managed ML platform: Amazon SageMaker AI, Azure Machine Learning, Databricks, or Google Cloud's platform (formerly Vertex AI) | core | 13/23 name a cloud; 7/23 name a managed ML platform | E2 | Train, register, and deploy a model on one managed platform; know what it costs | Working pipeline on one platform |
| E4 | CI/CD and reproducibility for ML: tests for data and models, experiment tracking and model registry (MLflow or W&B), data and model versioning | core | 15/23 (MLflow named in 5) | E1 | Retrain and redeploy from a commit with tracked data, parameters, and metrics; roll back to a previous model version | Pipeline demo. Skip: `backend` (CI/CD part) |
| E5 | Monitoring in production: data and prediction drift, silent degradation, alerting, retraining triggers, incident handling | core | 15/23 | E1, A4 | Detect drift on a served model, alert, and trigger a retrain | Assignment with injected drift |
| E6 | Safe rollout: offline evaluation, shadow runs, champion/challenger, online A/B tests and reading their results | important | 3/23 | E5, A2 | Plan a rollout from offline eval to A/B test with a rollback rule | Design review + A/B analysis quiz |
| E7 | Infrastructure as code (Terraform, Pulumi, CloudFormation) | important | 3/23 | E3 | Provision training and serving infrastructure from code | Working config. Skip: `backend` (often) |

### F. Engineering and working with others

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| F1 | Production software engineering: clean code, tests, code review, profiling; often a second language (Go, Java, Scala, C++) | core | definition; named in 10/23 | – | Turn research code into a tested, reviewed package | Usually known; confirm in placement. Skip: `backend` |
| F2 | ML system design: contracts between data, model, and consumers; trade-offs between latency, cost, accuracy, and failure modes | important | 6/23 (mostly senior) | E1, E5 | Design an ML system on a whiteboard and defend its trade-offs | Interview-style design review |
| F3 | Framing business problems as ML problems, and working with data scientists and product | important | 7/23 | A4 | Turn a vague request into a target, a metric, and a baseline, or argue that ML isn't needed | Spec exercise |
| F4 | Using AI coding agents across the ML lifecycle, and verifying their output | advanced | 2/23 | F1 | Deliver a pipeline with an agent and show how its output was checked | Portfolio write-up |
| F5 | Privacy, security, and compliance for training data (KVKK/GDPR, sensitive data, access control) | important | 3/23 | D2 | Keep sensitive fields out of training data and logs; document data lineage | Review of own pipeline |

### G. Specialties (senior or niche)

| ID | Skill | Priority | Seen in | Needs | Can do (outcomes) | How to check |
|---|---|---|---|---|---|---|
| G1 | Reinforcement learning and reward modelling (including RLHF) | advanced | 2/23 | B2, C2 | Explain and run a small RL or preference-learning experiment | Assignment |
| G2 | Federated and privacy-preserving learning (differential privacy) | advanced | 1/23 | B1, F5 | Train a model across two data silos without moving the data | Assignment |
| G3 | Edge and embedded deployment (compression, on-device evaluation) | advanced | 2/23 | C5 | Run a compressed model on a constrained target and measure accuracy loss | Before/after numbers |

## Learning order

Prerequisites above define the order. This is the longest path in Respec for an application developer, and it's honest to say so up front.

**How long:** we found no reliable source for how long the move takes. As a rough guide (an estimate, not sourced): expect well over a year of steady part-time study to reach a portfolio that matches a mid-level posting, longer than the AI Engineer path (6–12 months in `data/market/roles.md`, evidence weak). Postings then ask for 2–5+ years of production ML experience, which you build on the job. The realistic first step for most developers is an MLOps-leaning role or ML work inside their current company.

**Which math first:** you don't need a math degree to start, but you can't skip A2. Learn just enough to read a training loop: vectors, matrices and their shapes; derivatives and the chain rule (that is what backpropagation is); probability, expectation and variance; and the statistics behind evaluation and A/B tests. Leave eigenvectors, SVD, and formal optimization theory until a lesson needs them (B2, B5). Learn the math next to code, not before all code: each concept should show up in a model you train the same week.

A typical path for a backend or full-stack developer:

1. **Foundations (A1 → A2 → A3 → A4):** tabular ML with scikit-learn and boosted trees, and evaluation done properly. Many production postings (P14, P18, P19) are mostly this.
2. **Ship it early (E1 → E2 → E4 → E5):** serve, containerize, track, and monitor the tabular model from step 1. Backend developers move fast here and should, because this is the most-requested part of the role.
3. **Data (D1 → D2 → D3):** feature pipelines and training-serving consistency. Data engineers can mostly skip D1 and D2.
4. **Deep learning (B1 → B2 → B3):** PyTorch with a hand-written training loop, then one domain in depth. Choose the domain from your target postings.
5. **Cloud and rollout (E3 → E6 → E7, F2):** one managed platform, A/B tests, and system design.
6. **LLMs and fine-tuning (C3 → C1 → C4 → C5 → C2), B4:** only after B1. Go deeper here if your target postings are in the "model training / LLM adaptation" group.
7. **Capstone:** a model trained, evaluated, deployed, monitored, and retrained through a pipeline, with a write-up of the trade-offs (F1, F3 shown through it). G skills only if a target posting asks.

**Shorter path for a backend developer aiming at MLOps / ML platform roles** (P4, P7, P10, P13, P23): A1 → A2 (lighter) → A3 → A4 → E1–E7 → D2 → B1 (enough to run and debug someone else's training loop) → B4 → F2. This trades modelling depth for platform depth, which those postings say they want.

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

- 2026-11-24: first version, from 23 postings.
