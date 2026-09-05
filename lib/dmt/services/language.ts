import type { SupportedLanguage } from "../types/domain";

export function detectLanguage(input: string): SupportedLanguage {
  if (/[\u0d80-\u0dff]/.test(input)) {
    return "si";
  }

  if (/[\u0b80-\u0bff]/.test(input)) {
    return "ta";
  }

  return "en";
}

export function languageName(language: SupportedLanguage): string {
  if (language === "si") {
    return "Sinhala";
  }

  if (language === "ta") {
    return "Tamil";
  }

  return "English";
}

export function localizedFallbackPrefix(language: SupportedLanguage): string {
  if (language === "si") {
    return "මට සිංහලෙන් පිළිතුරු සැකසීමට උත්සාහ කළත්, දැනට නිල මූලාශ්‍රවල තොරතුරු ඉංග්‍රීසියෙන් ලබා දෙමි.";
  }

  if (language === "ta") {
    return "நான் தமிழில் உதவ முயற்சிக்கிறேன், ஆனால் இப்போது அதிகாரப்பூர்வ ஆதார தகவலை ஆங்கிலத்தில் வழங்குகிறேன்.";
  }

  return "";
}
