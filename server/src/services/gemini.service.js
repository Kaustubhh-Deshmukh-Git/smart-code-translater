import { generateContent } from "../config/gemini.config.js";

export const askGemini = async (prompt) => {
  try {
    const text = await generateContent(prompt);
    if (!text || !text.trim()) {
      throw new Error("Gemini returned an empty response");
    }
    return text;
  } catch {
    const aiError = new Error("AI service failed. Please try again.");
    aiError.statusCode = 502;
    throw aiError;
  }
};
