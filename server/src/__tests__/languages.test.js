import { describe, it, expect } from "vitest";
import {
  SUPPORTED_LANGUAGES,
  getLanguageName,
  isSupportedLanguage,
} from "../constants/languages.js";

describe("languages constants and utilities", () => {
  it("exports five supported languages", () => {
    expect(SUPPORTED_LANGUAGES).toHaveLength(5);
    const ids = SUPPORTED_LANGUAGES.map((l) => l.id);
    expect(ids).toEqual(["c", "cpp", "csharp", "java", "python"]);
  });

  describe("getLanguageName", () => {
    it("returns the correct display name for supported IDs", () => {
      expect(getLanguageName("python")).toBe("Python");
      expect(getLanguageName("java")).toBe("Java");
      expect(getLanguageName("cpp")).toBe("C++");
      expect(getLanguageName("c")).toBe("C");
      expect(getLanguageName("csharp")).toBe("C#");
    });

    it("returns the input id as fallback for unknown languages", () => {
      expect(getLanguageName("rust")).toBe("rust");
      expect(getLanguageName("ruby")).toBe("ruby");
    });
  });

  describe("isSupportedLanguage", () => {
    it("returns true for all 5 supported languages", () => {
      expect(isSupportedLanguage("c")).toBe(true);
      expect(isSupportedLanguage("cpp")).toBe(true);
      expect(isSupportedLanguage("csharp")).toBe(true);
      expect(isSupportedLanguage("java")).toBe(true);
      expect(isSupportedLanguage("python")).toBe(true);
    });

    it("returns false for unsupported languages", () => {
      expect(isSupportedLanguage("ruby")).toBe(false);
      expect(isSupportedLanguage("go")).toBe(false);
      expect(isSupportedLanguage("javascript")).toBe(false);
      expect(isSupportedLanguage("")).toBe(false);
    });
  });
});
