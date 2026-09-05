import { DMT_KNOWLEDGE_BASE } from "../data/knowledge";
import type { ChatMessage, DmtChatHealth, DmtChatResponse } from "../types/domain";
import { generateDmtAnswer } from "./answer";
import {
  greetingAnswer,
  isContextualFollowUp,
  isDmtQuestion,
  isGreeting,
  outOfScopeAnswer,
} from "./guardrails";
import { detectLanguage } from "./language";
import { checkRateLimit } from "./rate-limit";
import { retrieveDmtKnowledge } from "./retriever";

export type ChatRequestPayload = {
  message?: unknown;
  history?: unknown;
};

export type ChatServiceResult =
  | {
      ok: true;
      status: 200;
      body: DmtChatResponse;
    }
  | {
      ok: false;
      status: 400 | 429;
      body: { error: string };
      headers?: Record<string, string>;
    };

export function getDmtChatHealth(): DmtChatHealth {
  return {
    status: "ok",
    service: "DMT RAG Chatbot",
    knowledgeChunks: DMT_KNOWLEDGE_BASE.length,
    generatedChunks: DMT_KNOWLEDGE_BASE.filter((chunk) => chunk.generated).length,
    lastVerified: latestVerificationDate(),
    llmEnabled: Boolean(process.env.OPENAI_API_KEY),
  };
}

export async function handleDmtChatRequest(
  payload: ChatRequestPayload,
  clientKey: string
): Promise<ChatServiceResult> {
  const rateLimit = checkRateLimit(clientKey);

  if (!rateLimit.allowed) {
    return {
      ok: false,
      status: 429,
      body: {
        error: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
      },
      headers: {
        "Retry-After": String(rateLimit.retryAfterSeconds),
      },
    };
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!message) {
    return {
      ok: false,
      status: 400,
      body: { error: "Message is required." },
    };
  }

  if (message.length > 1000) {
    return {
      ok: false,
      status: 400,
      body: { error: "Message is too long. Please keep it under 1000 characters." },
    };
  }

  const language = detectLanguage(message);
  const history = normalizeHistory(payload.history);
  const historyContext = history.map((item) => item.text).join(" ");

  if (isGreeting(message)) {
    return {
      ok: true,
      status: 200,
      body: {
        answer: greetingAnswer(),
        sources: [],
        suggestions: [
          "How do I book a DMT appointment?",
          "How do I renew my driving licence?",
          "What documents are needed for vehicle ownership transfer?",
        ],
        language,
        mode: "extractive",
        confidence: "high",
        retrieved: [],
      },
    };
  }

  const hasDmtContext = isDmtQuestion(historyContext);
  const isAllowedFollowUp = isContextualFollowUp(message) && hasDmtContext;

  if (!isDmtQuestion(message) && !isAllowedFollowUp) {
    return {
      ok: true,
      status: 200,
      body: {
        answer: outOfScopeAnswer(),
        sources: [],
        suggestions: [
          "How do I book a DMT appointment?",
          "How do I renew my driving licence?",
          "What documents are needed for vehicle ownership transfer?",
        ],
        language,
        mode: "extractive",
        confidence: "low",
        retrieved: [],
      },
    };
  }

  const retrievalQuery = buildRetrievalQuery(message, historyContext, isAllowedFollowUp);
  const retrieved = retrieveDmtKnowledge(retrievalQuery);
  const response = await generateDmtAnswer({
    question: message,
    chunks: retrieved,
    language,
  });

  return {
    ok: true,
    status: 200,
    body: {
      ...response,
      retrieved: retrieved.map((chunk) => ({
        id: chunk.id,
        title: chunk.title,
        score: chunk.score,
        reasons: chunk.reasons,
        source: chunk.source,
      })),
    },
  };
}

export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "local";
}

function buildRetrievalQuery(message: string, historyContext: string, isAllowedFollowUp: boolean): string {
  const normalized = message.toLowerCase();

  if (/\b(jaffna|office|nearest|contact|phone|from)\b/.test(normalized)) {
    return `${message}\nDMT contact details district office nearest office telephone`;
  }

  return isAllowedFollowUp ? `${message}\nRecent DMT context: ${historyContext}` : message;
}

function normalizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  const normalized: ChatMessage[] = [];

  for (const item of history) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const candidate = item as ChatMessage;

    if (typeof candidate.text !== "string") {
      continue;
    }

    normalized.push({
      sender: typeof candidate.sender === "string" ? candidate.sender : undefined,
      text: candidate.text.slice(0, 500),
    });
  }

  return normalized.slice(-6);
}

function latestVerificationDate(): string {
  return DMT_KNOWLEDGE_BASE.reduce((latest, chunk) => {
    return chunk.lastVerified > latest ? chunk.lastVerified : latest;
  }, "1970-01-01");
}
