export const parseGeminiJSON = (text) => {
  if (!text) {
    const error = new Error("AI returned an invalid response format.");
    error.statusCode = 502;
    throw error;
  }

  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/, "");
  }

  try {
    return JSON.parse(cleaned.trim());
  } catch {
    const error = new Error("AI returned an invalid response format.");
    error.statusCode = 502;
    throw error;
  }
};

export const cleanCodeResponse = (text) => {
  if (!text) return "";
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\w*\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return cleaned.trim();
};
