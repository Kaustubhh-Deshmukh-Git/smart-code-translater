import { askGemini } from "./gemini.service.js";
import { EXPLAIN_PROMPT } from "../constants/prompts.js";
import { getLanguageName } from "../constants/languages.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";

export const explainCode = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = EXPLAIN_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt);
  const { explanation } = parseGeminiJSON(rawResponse);
  return { explanation };
};
