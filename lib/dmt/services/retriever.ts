import { DMT_KNOWLEDGE_BASE } from "../data/knowledge";
import type { DmtKnowledgeChunk, RetrievedChunk } from "../types/domain";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "can",
  "do",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "need",
  "of",
  "on",
  "or",
  "please",
  "should",
  "the",
  "to",
  "what",
  "when",
  "where",
  "with",
]);

const SYNONYMS: Record<string, string[]> = {
  licence: ["license", "dl", "driving"],
  license: ["licence", "dl", "driving"],
  renew: ["renewal", "validity", "extend", "extension"],
  renewal: ["renew", "validity", "extend", "extension"],
  lost: ["duplicate", "misplaced", "missing"],
  duplicate: ["lost", "misplaced", "copy"],
  transfer: ["ownership", "possession", "seller", "buyer"],
  ownership: ["transfer", "transferee", "transferor"],
  register: ["registration", "first"],
  registration: ["register", "vehicle"],
  appointment: ["booking", "book", "schedule"],
  document: ["documents", "forms", "certificate"],
  documents: ["document", "forms", "certificate"],
  fee: ["fees", "charges", "payment"],
  fees: ["fee", "charges", "payment"],
  charge: ["charges", "fee", "fees"],
  charges: ["charge", "fee", "fees"],
  sinhala: ["සිංහල"],
  tamil: ["தமிழ்"],
  රියදුරු: ["driving", "licence", "license"],
  බලපත්‍රය: ["licence", "license"],
  බලපත්‍ර: ["licence", "license"],
  අලුත්: ["renew", "renewal"],
  අලුත්කරන්නේ: ["renew", "renewal"],
  වාහන: ["vehicle", "registration", "transfer"],
  පැවරීම: ["transfer", "ownership"],
  பதிவு: ["registration", "register"],
  வாகன: ["vehicle", "registration", "transfer"],
  ஓட்டுநர்: ["driving", "licence", "license"],
  உரிமம்: ["licence", "license"],
  புதுப்பிக்க: ["renew", "renewal"],
  மாற்றம்: ["transfer", "ownership"],
};

const CATEGORY_INTENTS: Array<{
  category: DmtKnowledgeChunk["category"];
  tokens: string[];
}> = [
  { category: "appointments", tokens: ["appointment", "booking", "book", "otp", "schedule"] },
  { category: "driving-licence", tokens: ["licence", "license", "driving", "learner", "permit", "medical"] },
  { category: "vehicle", tokens: ["vehicle", "car", "transfer", "ownership", "registration", "revenue"] },
  { category: "forms", tokens: ["form", "forms", "download", "mta", "cmt"] },
  { category: "fees", tokens: ["fee", "fees", "charge", "charges", "payment"] },
  { category: "contact", tokens: ["contact", "phone", "telephone", "address", "email", "office"] },
];

function tokenize(value: string): string[] {
  const normalized = value
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => !STOP_WORDS.has(token));

  return [...new Set(normalized.flatMap((token) => [token, ...(SYNONYMS[token] ?? [])]))];
}

function chunkText(chunk: DmtKnowledgeChunk): string {
  return [
    chunk.title,
    chunk.category,
    chunk.summary,
    chunk.content ?? "",
    ...(chunk.steps ?? []),
    ...(chunk.documents ?? []),
    ...(chunk.notes ?? []),
    ...chunk.keywords,
  ].join(" ");
}

export function retrieveDmtKnowledge(query: string, limit = 4): RetrievedChunk[] {
  const queryTokens = tokenize(query);

  if (!queryTokens.length) {
    return [];
  }

  const scored = DMT_KNOWLEDGE_BASE.map((chunk) => {
    const text = chunkText(chunk).toLowerCase();
    const title = chunk.title.toLowerCase();
    const keywordText = chunk.keywords.join(" ").toLowerCase();
    const chunkTokens = tokenize(text);
    const reasons: string[] = [];

    const lexicalScore = queryTokens.reduce((total, token) => {
      const tokenRegex = new RegExp(`\\b${escapeRegExp(token)}\\b`, "gi");
      const matches = text.match(tokenRegex)?.length ?? 0;
      const titleBoost = title.includes(token) ? 4 : 0;
      const keywordBoost = keywordText.includes(token) ? 3 : 0;

      if (titleBoost) {
        reasons.push(`title:${token}`);
      }

      if (keywordBoost) {
        reasons.push(`keyword:${token}`);
      }

      return total + matches + titleBoost + keywordBoost;
    }, 0);

    const phraseScore = phraseMatches(query, chunk).length * 8;
    const intentScore = categoryIntentScore(queryTokens, chunk.category);
    const vectorScore = cosineSimilarity(queryTokens, chunkTokens) * 30;
    const trustBoost = chunk.generated ? 0 : 22;
    const conciseBoost = chunk.generated ? 0 : 8;
    const score = lexicalScore + phraseScore + intentScore + vectorScore + trustBoost + conciseBoost;

    if (phraseScore) {
      reasons.push("phrase");
    }

    if (intentScore) {
      reasons.push(`intent:${chunk.category}`);
    }

    return { ...chunk, score: Math.round(score * 100) / 100, reasons: [...new Set(reasons)].slice(0, 6) };
  })
    .filter((chunk) => chunk.score >= 4)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

function phraseMatches(query: string, chunk: DmtKnowledgeChunk): string[] {
  const lowerQuery = query.toLowerCase();
  const text = chunkText(chunk).toLowerCase();
  const phrases = [
    ...chunk.keywords,
    chunk.title,
    "driving licence",
    "driving license",
    "vehicle ownership transfer",
    "first registration",
    "medical certificate",
    "appointment portal",
  ]
    .map((phrase) => phrase.toLowerCase())
    .filter((phrase) => phrase.split(/\s+/).length > 1);

  return phrases.filter((phrase) => lowerQuery.includes(phrase) && text.includes(phrase));
}

function categoryIntentScore(tokens: string[], category: DmtKnowledgeChunk["category"]): number {
  const intent = CATEGORY_INTENTS.find((item) => item.category === category);

  if (!intent) {
    return 0;
  }

  const matches = tokens.filter((token) => intent.tokens.includes(token)).length;
  return matches * 4;
}

function cosineSimilarity(queryTokens: string[], chunkTokens: string[]): number {
  const queryVector = toFrequencyMap(queryTokens);
  const chunkVector = toFrequencyMap(chunkTokens);
  const allTokens = new Set([...queryVector.keys(), ...chunkVector.keys()]);
  let dot = 0;
  let queryMagnitude = 0;
  let chunkMagnitude = 0;

  for (const token of allTokens) {
    const q = queryVector.get(token) ?? 0;
    const c = chunkVector.get(token) ?? 0;

    dot += q * c;
    queryMagnitude += q * q;
    chunkMagnitude += c * c;
  }

  if (!queryMagnitude || !chunkMagnitude) {
    return 0;
  }

  return dot / (Math.sqrt(queryMagnitude) * Math.sqrt(chunkMagnitude));
}

function toFrequencyMap(tokens: string[]): Map<string, number> {
  const map = new Map<string, number>();

  for (const token of tokens) {
    map.set(token, (map.get(token) ?? 0) + 1);
  }

  return map;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
