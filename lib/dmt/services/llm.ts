import type { RetrievedChunk, SupportedLanguage } from "../types/domain";
import { languageName } from "./language";

type OpenAIResponse = {
  output_text?: string;
  error?: {
    message?: string;
  };
};

export async function synthesizeWithOpenAI({
  question,
  chunks,
  language,
}: {
  question: string;
  chunks: RetrievedChunk[];
  language: SupportedLanguage;
}): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || !chunks.length) {
    return null;
  }

  const model = process.env.OPENAI_MODEL || "gpt-5";
  const context = chunks
    .map(
      (chunk, index) =>
        `SOURCE ${index + 1}: ${chunk.title}\nURL: ${chunk.source.url}\nSUMMARY: ${chunk.summary}\nCONTENT:\n${[
          ...(chunk.steps ?? []),
          ...(chunk.documents ?? []),
          ...(chunk.notes ?? []),
          chunk.content ?? "",
        ]
          .filter(Boolean)
          .join("\n")}`
    )
    .join("\n\n---\n\n")
    .slice(0, 12000);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      store: false,
      input: [
        {
          role: "system",
          content:
            "You are a Department of Motor Traffic Sri Lanka assistant. Answer only from the supplied DMT context. If context is insufficient, say what is missing. Be concise, procedural, and include a verification reminder.",
        },
        {
          role: "user",
          content: `User language: ${languageName(language)}\nQuestion: ${question}\n\nDMT context:\n${context}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as OpenAIResponse;
  return data.output_text?.trim() || null;
}
