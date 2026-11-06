import Editor from "@monaco-editor/react";
import { MONACO_LANGUAGE_MAP } from "../constants/languages.js";

const CodeEditor = ({ code, onChange, language, readOnly = false }) => {
  return (
    <Editor
      height="100%"
      language={MONACO_LANGUAGE_MAP[language] || "plaintext"}
      value={code}
      onChange={(v) => onChange && onChange(v || "")}
      theme="vs-dark"
      loading={
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      }
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        folding: true,
        wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;
