import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import OutputPanel from "../components/OutputPanel.jsx";

// Mock Monaco Editor for jsdom test environment
vi.mock("@monaco-editor/react", () => ({
  default: ({ value, language }) => (
    <div data-testid="mock-monaco-editor" data-language={language}>
      {value}
    </div>
  ),
}));

describe("OutputPanel component", () => {
  it("renders empty state when result is null", () => {
    render(<OutputPanel result={null} action="translate" targetLanguage="java" />);
    expect(screen.getByText(/Write code, pick an action, and hit/i)).toBeInTheDocument();
    expect(screen.getByText("Run")).toBeInTheDocument();
  });

  it("renders translate action with translated code", () => {
    const result = { translatedCode: 'System.out.println("Hello");' };
    render(<OutputPanel result={result} action="translate" targetLanguage="java" />);
    const editor = screen.getByTestId("mock-monaco-editor");
    expect(editor).toHaveTextContent('System.out.println("Hello");');
    expect(editor).toHaveAttribute("data-language", "java");
  });

  it("renders analyze action with complexity metrics and explanation", () => {
    const result = {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Iterates through elements once.",
    };
    render(<OutputPanel result={result} action="analyze" targetLanguage="python" />);
    expect(screen.getByText("Time Complexity")).toBeInTheDocument();
    expect(screen.getByText("O(n)")).toBeInTheDocument();
    expect(screen.getByText("Space Complexity")).toBeInTheDocument();
    expect(screen.getByText("O(1)")).toBeInTheDocument();
    expect(screen.getByText("Iterates through elements once.")).toBeInTheDocument();
  });

  it("renders optimize action with optimized code and suggestions", () => {
    const result = {
      optimizedCode: "def quick_sum(n): return n * (n + 1) // 2",
      suggestions: "- Replaced loop with formula\n- O(1) time",
    };
    render(<OutputPanel result={result} action="optimize" targetLanguage="python" />);
    const editor = screen.getByTestId("mock-monaco-editor");
    expect(editor).toHaveTextContent("def quick_sum(n): return n * (n + 1) // 2");
    expect(screen.getByText("Suggestions")).toBeInTheDocument();
    expect(screen.getByText(/- Replaced loop with formula/i)).toBeInTheDocument();
  });

  it("renders explain action with conceptual explanation", () => {
    const result = {
      explanation: "This function calculates Fibonacci numbers iteratively.",
    };
    render(<OutputPanel result={result} action="explain" targetLanguage="python" />);
    expect(
      screen.getByText("This function calculates Fibonacci numbers iteratively."),
    ).toBeInTheDocument();
  });
});
