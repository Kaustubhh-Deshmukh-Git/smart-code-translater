import { useState } from "react";
import toast from "react-hot-toast";
import CodeEditor from "../components/CodeEditor.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import { STARTER_CODE } from "../constants/languages.js";
import {
  translateCode,
  analyzeComplexity,
  optimizeCode,
  explainCode,
} from "../services/codeService.js";
import "../styles/home.css";

const ACTIONS = ["translate", "analyze", "optimize", "explain"];

const HomePage = () => {
  const [code, setCode] = useState(STARTER_CODE.python || "");
  const [sourceLanguage, setSourceLanguage] = useState("python");
  const [targetLanguage, setTargetLanguage] = useState("java");
  const [activeAction, setActiveAction] = useState("translate");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSourceChange = (langId) => {
    setSourceLanguage(langId);
    if (STARTER_CODE[langId]) {
      setCode(STARTER_CODE[langId]);
    }
    setResult(null);
  };

  const handleSwap = () => {
    if (activeAction !== "translate") return;
    const prevSource = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(prevSource);
    if (result?.translatedCode) {
      setCode(result.translatedCode);
      setResult(null);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    let textToCopy = "";
    if (activeAction === "translate") {
      textToCopy = result?.translatedCode || "";
    } else if (activeAction === "optimize") {
      textToCopy = result?.optimizedCode || "";
    } else if (activeAction === "explain") {
      textToCopy = result?.explanation || "";
    } else if (activeAction === "analyze") {
      textToCopy = `Time: ${result?.timeComplexity || ""}\nSpace: ${result?.spaceComplexity || ""}\n\n${result?.explanation || ""}`;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  const handleRun = async () => {
    if (!code.trim()) {
      return toast.error("Please write some code first.");
    }
    if (!sourceLanguage) {
      return toast.error("Select a source language.");
    }
    if (activeAction === "translate" && !targetLanguage) {
      return toast.error("Select a target language.");
    }

    setLoading(true);
    setResult(null);

    const fns = {
      translate: () => translateCode(code, sourceLanguage, targetLanguage),
      analyze: () => analyzeComplexity(code, sourceLanguage),
      optimize: () => optimizeCode(code, sourceLanguage),
      explain: () => explainCode(code, sourceLanguage),
    };

    try {
      const data = await fns[activeAction]();
      setResult(data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to process code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Toolbar */}
      <div className="workspace-toolbar">
        <div className="action-tabs">
          {ACTIONS.map((action) => (
            <button
              key={action}
              className={`action-tab ${activeAction === action ? "active" : ""}`}
              onClick={() => {
                setActiveAction(action);
                setResult(null);
              }}
              type="button"
            >
              {action}
            </button>
          ))}
        </div>
        <button className="run-btn" onClick={handleRun} disabled={loading} type="button">
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      {/* Panels */}
      <div className="workspace-panels">
        {/* Left Panel */}
        <div className="workspace-panel left-panel">
          <div className="panel-header">
            <LanguageSelector
              value={sourceLanguage}
              onChange={handleSourceChange}
              disabled={loading}
              aria-label="Source Language"
            />
          </div>
          <div className="panel-body">
            <CodeEditor code={code} onChange={setCode} language={sourceLanguage} />
          </div>
        </div>

        {/* Panel Divider / Swap */}
        <div className="panel-divider">
          {activeAction === "translate" ? (
            <button
              className="swap-btn"
              onClick={handleSwap}
              title="Swap languages"
              aria-label="Swap languages"
              type="button"
            >
              ⇄
            </button>
          ) : (
            <span className="arrow-icon">→</span>
          )}
        </div>

        {/* Right Panel */}
        <div className="workspace-panel right-panel">
          <div className="panel-header">
            {activeAction === "translate" ? (
              <LanguageSelector
                value={targetLanguage}
                onChange={setTargetLanguage}
                disabled={loading}
                aria-label="Target Language"
              />
            ) : (
              <span className="action-badge">{activeAction}</span>
            )}
            {result && !loading && (
              <button className="copy-btn" onClick={handleCopy} type="button">
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="panel-body">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
              </div>
            ) : (
              <OutputPanel result={result} action={activeAction} targetLanguage={targetLanguage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
