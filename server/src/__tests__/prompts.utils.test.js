import { describe, it, expect } from "vitest";
import { parseGeminiJSON, cleanCodeResponse } from "../utils/prompts.utils.js";

describe("prompts.utils", () => {
  describe("parseGeminiJSON", () => {
    it("parses valid JSON enclosed in ```json fences", () => {
      const input = '```json\n{\n  "result": "success"\n}\n```';
      const output = parseGeminiJSON(input);
      expect(output).toEqual({ result: "success" });
    });

    it("parses valid JSON enclosed in generic ``` fences", () => {
      const input = '```\n{"timeComplexity": "O(1)"}\n```';
      const output = parseGeminiJSON(input);
      expect(output).toEqual({ timeComplexity: "O(1)" });
    });

    it("parses plain raw JSON text without fences", () => {
      const input = '{"status": "ok", "value": 42}';
      const output = parseGeminiJSON(input);
      expect(output).toEqual({ status: "ok", value: 42 });
    });

    it("throws a 502 error when JSON is invalid or malformed", () => {
      const input = "This is not valid JSON content";
      expect(() => parseGeminiJSON(input)).toThrow("AI returned an invalid response format.");
      try {
        parseGeminiJSON(input);
      } catch (err) {
        expect(err.statusCode).toBe(502);
      }
    });
  });

  describe("cleanCodeResponse", () => {
    it("strips opening and closing markdown code fences", () => {
      const input = '```python\ndef hello():\n    print("hello")\n```';
      const output = cleanCodeResponse(input);
      expect(output).toBe('def hello():\n    print("hello")');
    });

    it("returns plain code as-is when no fences exist", () => {
      const input = "public class Main {\n    int x = 5;\n}";
      const output = cleanCodeResponse(input);
      expect(output).toBe(input);
    });

    it("trims surrounding whitespace from output", () => {
      const input = "   \n```java\nint y = 10;\n```\n   ";
      const output = cleanCodeResponse(input);
      expect(output).toBe("int y = 10;");
    });
  });
});
