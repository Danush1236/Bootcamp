import { DMT_KNOWLEDGE_BASE } from "../data/knowledge";
import type { DmtChatResponse, DmtKnowledgeChunk, DmtSource, SupportedLanguage } from "../types/domain";
import { localizedFallbackPrefix } from "./language";
import { synthesizeWithOpenAI } from "./llm";
import type { RetrievedChunk } from "../types/domain";

export type ChatAnswer = DmtChatResponse;

const GENERAL_SUGGESTIONS = [
  "How do I renew my driving licence?",
  "What documents do I need to transfer vehicle ownership?",
  "How do I apply for a new driving licence?",
];

export function composeDmtAnswer(question: string, chunks: RetrievedChunk[]): ChatAnswer {
  return composeExtractiveAnswer(question, chunks, "en");
}

export async function generateDmtAnswer({
  question,
  chunks,
  language,
}: {
  question: string;
  chunks: RetrievedChunk[];
  language: SupportedLanguage;
}): Promise<ChatAnswer> {
  const extractive = composeExtractiveAnswer(question, chunks, language);
  const llmAnswer = await synthesizeWithOpenAI({ question, chunks, language });

  if (!llmAnswer) {
    return extractive;
  }

  return {
    ...extractive,
    answer: llmAnswer,
    mode: "llm",
  };
}

function composeExtractiveAnswer(
  question: string,
  chunks: RetrievedChunk[],
  language: SupportedLanguage
): ChatAnswer {
  if (!chunks.length) {
    return {
      answer:
        "I could not find a confident match in the DMT knowledge base for that question. I can help with DMT appointments, new driving licences, licence renewal, duplicate licences, vehicle ownership transfer, first vehicle registration, vehicle information requests, forms, and contact details. Please ask about one of those services.",
      sources: [],
      suggestions: GENERAL_SUGGESTIONS,
      language,
      mode: "extractive",
      confidence: "low",
    };
  }

  const primary = chunks[0];
  const focusedAnswer = composeFocusedAnswer(question, primary, language);

  if (focusedAnswer) {
    return focusedAnswer;
  }

  const sections = [
    `${primary.title}: ${primary.summary}`,
    formatList("Steps", primary.steps),
    formatList("Documents to prepare", primary.documents),
    formatList("Important notes", primary.notes),
    formatGeneratedDetail(primary),
  ].filter(Boolean);

  const disclaimer =
    "Please verify fees, appointment availability, and current requirements on the official DMT page before visiting an office.";

  const prefix = localizedFallbackPrefix(language);
  const answer = [prefix, sections.join("\n\n"), disclaimer].filter(Boolean).join("\n\n");

  return {
    answer,
    sources: relevantSources(primary, chunks),
    suggestions: buildSuggestions(primary.id, question),
    language,
    mode: "extractive",
    confidence: primary.score >= 40 ? "high" : primary.score >= 16 ? "medium" : "low",
  };
}

function composeFocusedAnswer(
  question: string,
  primary: RetrievedChunk,
  language: SupportedLanguage
): ChatAnswer | null {
  const normalized = question.toLowerCase();
  const prefix = localizedFallbackPrefix(language);

  if (normalized.includes("jaffna") && normalized.includes("registration") && hasAny(normalized, ["vehicle", "car", "motor"])) {
    const answer = [
      prefix,
      "For vehicle registration from Jaffna, it depends on the vehicle category.",
      "DMT states that first registration documents for motor vehicles can be handed over to the relevant registration branch at the Head Office in Narahenpita, Colombo 05. The same official page says only motor bicycles are registered in DMT branches of District Secretariats.",
      "So if this is a motor bicycle, the Jaffna district office may be relevant. If it is a car, van, lorry, or another vehicle category, please confirm through the Jaffna office or the DMT appointment portal before going.",
      "Jaffna DMT district office: District Secretarial - Jaffna. Telephone: +94 212 223 789 / +94 212 227 552.",
      "Before visiting, prepare the MTA 2 form and first-registration documents, and verify current appointment availability.",
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      answer,
      sources: sourcesByIds(["jaffna-dmt-district-office", "vehicle-first-registration", "appointment-booking"]),
      suggestions: [
        "What documents are needed for first vehicle registration?",
        "Can you give me the MTA 2 form?",
        "How do I book a vehicle registration appointment?",
      ],
      language,
      mode: "extractive",
      confidence: "high",
    };
  }

  if (normalized.includes("jaffna") && hasAny(normalized, ["office", "located", "nearest", "where", "from", "contact"])) {
    const answer = [
      prefix,
      "The DMT district office listed for Jaffna is at District Secretarial - Jaffna.",
      "Telephone: +94 212 223 789 / +94 212 227 552.",
      "If you are going for a specific service, check the DMT appointment portal first because available services can vary by office and date.",
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      answer,
      sources: sourcesByIds(["jaffna-dmt-district-office", "appointment-booking"]),
      suggestions: [
        "Can I do vehicle registration in Jaffna?",
        "How do I book a DMT appointment?",
        "What documents should I take for licence renewal?",
      ],
      language,
      mode: "extractive",
      confidence: "high",
    };
  }

  if (primary.id === "appointment-booking") {
    const answer = [
      prefix,
      "You can book a DMT appointment through the official DMT appointment portal.",
      [
        "Steps:",
        "- Open the DMT appointment portal.",
        "- Enter your NIC number, name, and phone number.",
        "- Verify your phone number with the OTP code.",
        "- Select the district office.",
        "- Select the service you need.",
        "- Choose the arrival date and time.",
        "- Submit the booking.",
      ].join("\n"),
      "The portal lists services such as Vehicle First Registration, New Driving Licence, Vehicle Ownership Transfer, Driving Licence Renewal, and Vehicle Information Request.",
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      answer,
      sources: sourcesByIds(["appointment-booking"]),
      suggestions: [
        "Can I book vehicle ownership transfer?",
        "What documents should I prepare before booking?",
        "Where is the nearest DMT office?",
      ],
      language,
      mode: "extractive",
      confidence: "high",
    };
  }

  if (primary.id === "medical-certificate-driving-licence") {
    const answer = [
      prefix,
      "For DMT driving licence services, you need a Medical Fitness Certificate or Aptitude Medical Certificate issued within 6 months.",
      "DMT refers applicants to the National Transport Medical Institute or Sri Lanka National Transport Institute for this certificate.",
      "Take your NIC or valid passport with NIC number when you go for the medical certificate. If you are renewing a licence, also keep your current driving licence ready for the DMT service.",
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      answer,
      sources: sourcesByIds(["medical-certificate-driving-licence", "driving-licence-renewal", "new-driving-licence"]),
      suggestions: [
        "What documents do I need for licence renewal?",
        "Can I book an appointment for licence renewal?",
        "Where is the nearest DMT office?",
      ],
      language,
      mode: "extractive",
      confidence: "high",
    };
  }

  if (primary.id === "mta-2-vehicle-registration-form") {
    const answer = [
      prefix,
      "For registering a new vehicle, the application form you need is MTA 2 - Application for Registration of Motor Vehicle.",
      "You can get it from the official DMT Forms page. Complete the MTA 2 form in English and submit it with the required first-registration documents.",
      "You should also prepare identity proof, vehicle photographs, customs/import documents where relevant, and TIN-related documents where applicable.",
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      answer,
      sources: sourcesByIds(["mta-2-vehicle-registration-form", "vehicle-first-registration"]),
      suggestions: [
        "What documents are needed for first vehicle registration?",
        "Can I do vehicle registration in Jaffna?",
        "How do I book a vehicle registration appointment?",
      ],
      language,
      mode: "extractive",
      confidence: "high",
    };
  }

  return null;
}

function formatGeneratedDetail(chunk: RetrievedChunk): string {
  if (!chunk.generated || !chunk.content || chunk.steps?.length || chunk.documents?.length) {
    return "";
  }

  const cleanLines = chunk.content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 20 && !line.includes("-->") && !line.includes("&times;"))
    .slice(0, 5);

  if (!cleanLines.length) {
    return "";
  }

  return `Relevant official details:\n${cleanLines.map((line) => `- ${line}`).join("\n")}`;
}

function hasAny(value: string, terms: string[]): boolean {
  return terms.some((term) => value.includes(term));
}

function sourcesByIds(ids: string[]): DmtSource[] {
  const chunks = ids
    .map((id) => DMT_KNOWLEDGE_BASE.find((chunk) => chunk.id === id))
    .filter((chunk): chunk is DmtKnowledgeChunk => Boolean(chunk));

  return uniqueSources(chunks.map((chunk) => chunk.source));
}

function relevantSources(primary: RetrievedChunk, chunks: RetrievedChunk[]): DmtSource[] {
  const closeMatches = chunks.filter((chunk) => {
    const sameSource = chunk.source.url === primary.source.url;
    const sameCategory = chunk.category === primary.category && chunk.score >= primary.score * 0.8;

    return sameSource || sameCategory;
  });

  return uniqueSources([primary.source, ...closeMatches.map((chunk) => chunk.source)]).slice(0, 3);
}

function formatList(title: string, items?: string[]): string {
  if (!items?.length) {
    return "";
  }

  return `${title}:\n${items.map((item) => `- ${item}`).join("\n")}`;
}

function uniqueSources(sources: DmtSource[]): DmtSource[] {
  const seen = new Set<string>();

  return sources.filter((source) => {
    if (seen.has(source.url)) {
      return false;
    }

    seen.add(source.url);
    return true;
  });
}

function buildSuggestions(primaryId: string, question: string): string[] {
  const lowerQuestion = question.toLowerCase();

  if (primaryId.includes("driving") || lowerQuestion.includes("licence") || lowerQuestion.includes("license")) {
    return [
      "Can I book an appointment for this service?",
      "What documents should I bring?",
      "Where can I contact the Werahera office?",
    ];
  }

  if (primaryId.includes("ownership") || lowerQuestion.includes("transfer")) {
    return [
      "Which MTA forms do I need?",
      "Can this be done through one day service?",
      "How do I book a vehicle transfer appointment?",
    ];
  }

  if (primaryId.includes("registration")) {
    return [
      "What is the MTA 2 form?",
      "Do I need TIN for vehicle registration?",
      "How do I book a first registration appointment?",
    ];
  }

  return GENERAL_SUGGESTIONS;
}
