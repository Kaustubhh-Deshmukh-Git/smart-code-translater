import CodeEditor from "./CodeEditor.jsx";
import "../styles/output.css";

const InfoCard = ({ title, value }) => {
  return (
    <div className="info-card">
      <div className="info-card-title">{title}</div>
      <div className="info-card-value">{value || "—"}</div>
    </div>
  );
};

const OutputPanel = ({ result, action, targetLanguage }) => {
  if (!result) {
    return (
      <div className="output-panel">
        <div className="empty-state">
          Write code, pick an action, and hit <span>Run</span>.
        </div>
      </div>
    );
  }

  if (action === "translate") {
    return (
      <div className="output-panel">
        <CodeEditor
          code={result?.translatedCode || ""}
          language={targetLanguage}
          readOnly={true}
        />
      </div>
    );
  }

  if (action === "analyze") {
    return (
      <div className="output-panel">
        <div className="output-content">
          <div className="info-cards-grid">
            <InfoCard
              title="Time Complexity"
              value={result?.timeComplexity}
            />
            <InfoCard
              title="Space Complexity"
              value={result?.spaceComplexity}
            />
          </div>
          {result?.explanation && (
            <div className="explanation-section">
              <h4>Explanation</h4>
              <p className="pre-wrap-text">{result.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (action === "optimize") {
    return (
      <div className="output-panel">
        <div className="optimize-container">
          <div className="optimize-editor-wrapper">
            <CodeEditor
              code={result?.optimizedCode || ""}
              language={targetLanguage}
              readOnly={true}
            />
          </div>
          {result?.suggestions && (
            <div className="optimize-suggestions">
              <h4>Suggestions</h4>
              <p className="pre-wrap-text">{result.suggestions}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (action === "explain") {
    return (
      <div className="output-panel">
        <div className="output-content">
          <div className="explanation-section">
            <p className="pre-wrap-text">{result?.explanation}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default OutputPanel;
