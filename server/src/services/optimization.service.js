import { askGemini } from "./gemini.service.js";
import { OPTIMIZE_PROMPT } from "../constants/prompts.js";
import { getLanguageName } from "../constants/languages.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";

export const optimizeCode = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = OPTIMIZE_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt);
  const { optimizedCode, suggestions } = parseGeminiJSON(rawResponse);
  return { optimizedCode, suggestions };
};
