const DMT_TERMS = [
  "dmt",
  "motor traffic",
  "driving",
  "licence",
  "license",
  "vehicle",
  "car",
  "registration",
  "transfer",
  "ownership",
  "appointment",
  "mta",
  "cmt",
  "revenue",
  "werahera",
  "narahenpita",
  "form",
  "permit",
  "medical",
  "certificate",
  "office",
  "nearest",
  "jaffna",
  "passport",
  "nic",
  "වාහන",
  "රියදුරු",
  "බලපත්‍ර",
  "මෝටර්",
  "வாகன",
  "ஓட்டுநர்",
  "உரிமம்",
];

const GREETINGS = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];

export function isDmtQuestion(message: string): boolean {
  const normalized = message.toLowerCase();
  return DMT_TERMS.some((term) => normalized.includes(term));
}

export function isGreeting(message: string): boolean {
  return GREETINGS.includes(message.trim().toLowerCase());
}

export function greetingAnswer(): string {
  return "Hello! I can help with DMT appointments, driving licences, vehicle registration, ownership transfers, official forms, fees, e-services, and office contact details. What would you like to do?";
}

export function isContextualFollowUp(message: string): boolean {
  const normalized = message.toLowerCase();
  return /\b(where|nearest|office|from|there|that|this|it|them|those|contact|phone)\b/.test(normalized);
}

export function outOfScopeAnswer(): string {
  return "I can only help with Department of Motor Traffic Sri Lanka services such as appointments, driving licences, vehicle registration, ownership transfer, forms, fees, e-services, and contact details. Please ask a DMT-related question.";
}
