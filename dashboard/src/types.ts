export type ModuleStatus = "locked" | "active" | "completed" | "assisted";
export type Stage = "lesson" | "quiz" | "review" | "assignment" | "evaluation" | "done" | null;
export type ModuleType = "theory" | "practice" | "mixed" | "capstone";

export type Module = {
  id: string;
  title: string;
  phase: string;
  type: ModuleType;
  objectives?: string[];
  skills?: string[];
  why?: string;
  est_hours?: number;
  resources?: { title: string; url: string }[];
  status: ModuleStatus;
  stage: Stage;
  score?: { quiz: number | null; assignment: number | null };
  attempts?: number;
  started_at?: string | null;
  completed_at?: string | null;
};

export type Preferences = {
  goal?: "new-role" | "current-job" | "own-product";
  scope?: "job-ready" | "full-role";
  example_context?: string;
  capstone_context?: string;
  lesson_order?: "scenario-first" | "code-first";
  llm_access?: string;
  asked_at?: string;
};

export type CoverageItem = {
  skill: string;
  id?: string;
  priority?: "core" | "important" | "advanced";
  status: "known" | "covered" | "optional";
  modules?: string[];
  postings?: string[];
  note?: string;
};

export type TargetPosting = { id: string; company?: string; title?: string; url?: string; read_at?: string; file?: string };

export type State = {
  schema_version: number;
  learner: {
    name?: string;
    current_role?: string;
    weekly_hours?: number;
    target_market?: string;
    language?: string;
    preferences?: Preferences;
    target_postings?: TargetPosting[];
  };
  placement?: { date?: string; known?: string[]; partial?: string[]; unknown?: string[] };
  target_role?: { id: string; title: string; chosen_at?: string; reason?: string } | null;
  curriculum?: {
    created_at?: string | null;
    phases?: { id: string; title: string }[];
    skipped?: { topic: string; reason: string }[];
    coverage?: CoverageItem[];
    modules?: Module[];
  };
  weak_points?: { concept: string; module: string; added_at?: string; correct_count?: number }[];
  history?: { date: string; event: string }[];
  notes?: string;
};

export type QuizQuestion = {
  id: string;
  type?: "scenario" | "recall" | "code";
  concept?: string;
  question: string;
  answer?: string;
  result: "correct" | "partial" | "wrong";
  explanation?: string;
  from_weak_points?: boolean;
};
export type QuizFile = {
  module: string;
  attempts: { kind: "quiz" | "review"; date: string; score: number; questions: QuizQuestion[] }[];
};

export type Evidence = { file: string; line?: number; note?: string };
export type EvaluationFile = {
  module: string;
  attempts: {
    date: string;
    task?: string;
    total: number;
    passed: boolean;
    rubric: { item: string; weight: number; score: number; comment?: string; evidence?: Evidence[] }[];
    strengths?: string[];
    gaps?: string[];
    defense?: { question: string; answer: string }[];
    usage?: { requests?: number; input_tokens?: number; output_tokens?: number; latency_p50_ms?: number };
    next_step?: string;
  }[];
};

export type FileEntry = { path: string; size: number; mtime: string };
export type FileContent = { path: string; size: number; binary: boolean; truncated?: boolean; content: string | null };

export type UsageGroup = {
  requests: number;
  errors: number;
  input_tokens: number;
  output_tokens: number;
  cached_input_tokens: number;
  latency_p50_ms: number | null;
  latency_p95_ms: number | null;
  ttfb_p50_ms: number | null;
  cost: number | null;
};
export type UsageRecord = {
  ts: string;
  module: string | null;
  provider: string;
  model: string | null;
  response_model?: string;
  stream: boolean;
  status: number | null;
  latency_ms: number | null;
  ttfb_ms: number | null;
  input_tokens: number | null;
  output_tokens: number | null;
  cached_input_tokens: number | null;
  error?: string;
};
export type Usage = {
  summary: {
    total: UsageGroup;
    modules: Record<string, UsageGroup>;
    models: Record<string, UsageGroup>;
    projection: null | {
      modules_with_assignments: number;
      est_input_tokens_curriculum: number;
      est_output_tokens_curriculum: number;
    };
    currency: string | null;
  } | null;
  records: UsageRecord[];
};

export type VersionInfo = {
  current: string;
  latest: { version: string; url: string | null } | null;
  update_available: boolean;
  checked_at: string | null;
  disabled?: boolean;
};
