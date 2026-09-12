/**
 * Utility functions for Arabic text processing
 */

// Unicode range for Arabic diacritical marks (Tashkeel / Harakat):
// \u064B - \u0652: Fathatan, Dammatan, Kasratan, Fatha, Damma, Kasra, Shadda, Sukun
// \u0653 - \u065F: Maddah, Hamza above/below, subscripts/superscripts
// \u0670: Superscript Alif (Dagger Alif)
// \u06D6 - \u06ED: Quranic annotations & small marks
const TASHKEEL_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;

/**
 * Strips all Tashkeel / Harakat from Arabic text cleanly.
 * @param text The Arabic text with diacritics
 * @returns Plain Arabic text without diacritics
 */
export function removeTashkeel(text: string): string {
  if (!text) return "";
  return text.replace(TASHKEEL_REGEX, "");
}
