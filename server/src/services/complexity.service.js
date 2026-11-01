import { askGemini } from "./gemini.service.js";
import { ANALYZE_COMPLEXITY_PROMPT } from "../constants/prompts.js";
import { getLanguageName } from "../constants/languages.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";

export const analyzeComplexity = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = ANALYZE_COMPLEXITY_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt);
  const { timeComplexity, spaceComplexity, explanation } = parseGeminiJSON(rawResponse);
  return { timeComplexity, spaceComplexity, explanation };
};
