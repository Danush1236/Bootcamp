export type DmtKnowledgeCategory =
  | "appointments"
  | "driving-licence"
  | "vehicle"
  | "forms"
  | "contact"
  | "fees"
  | "faq"
  | "news"
  | "other";

export type DmtSource = {
  title: string;
  url: string;
};

export type DmtKnowledgeChunk = {
  id: string;
  title: string;
  category: DmtKnowledgeCategory;
  summary: string;
  content?: string;
  steps?: string[];
  documents?: string[];
  notes?: string[];
  source: DmtSource;
  lastVerified: string;
  keywords: string[];
  generated?: boolean;
};

export type SupportedLanguage = "en" | "si" | "ta";

export type RetrievedChunk = DmtKnowledgeChunk & {
  score: number;
  reasons: string[];
};

export type ChatMessage = {
  sender?: string;
  text?: string;
};

export type ChatAnswerMode = "extractive" | "llm";

export type ChatConfidence = "low" | "medium" | "high";

export type DmtChatResponse = {
  answer: string;
  sources: DmtSource[];
  suggestions: string[];
  language: SupportedLanguage;
  mode: ChatAnswerMode;
  confidence: ChatConfidence;
  retrieved?: Array<{
    id: string;
    title: string;
    score: number;
    reasons: string[];
    source: DmtSource;
  }>;
};

export type DmtChatHealth = {
  status: "ok";
  service: string;
  knowledgeChunks: number;
  generatedChunks: number;
  lastVerified: string;
  llmEnabled: boolean;
};
