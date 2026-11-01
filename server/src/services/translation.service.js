import { askGemini } from "./gemini.service.js";
import { TRANSLATE_PROMPT } from "../constants/prompts.js";
import { getLanguageName } from "../constants/languages.js";
import { cleanCodeResponse } from "../utils/prompts.utils.js";

export const translateCode = async (code, sourceLang, targetLang) => {
  const sourceName = getLanguageName(sourceLang);
  const targetName = getLanguageName(targetLang);
  const prompt = TRANSLATE_PROMPT(code, sourceName, targetName);
  const rawResponse = await askGemini(prompt);
  const translatedCode = cleanCodeResponse(rawResponse);
  return { translatedCode };
};
