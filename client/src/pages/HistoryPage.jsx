import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import HistoryList from "../components/HistoryList.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import { getHistory, deleteHistoryItem, clearHistory } from "../services/historyService.js";
import "../styles/history.css";

const HistoryPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchEntries = useCallback(async (page) => {
    setLoading(true);
    try {
      const data = await getHistory(page, 8);
      setEntries(data.entries || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries(currentPage);
  }, [currentPage, fetchEntries]);

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success("Deleted");
      if (selectedEntry?._id === id) {
        setSelectedEntry(null);
      }
      if (entries.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        fetchEntries(currentPage);
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all history?")) {
      return;
    }
    try {
      await clearHistory();
      setEntries([]);
      setSelectedEntry(null);
      setCurrentPage(1);
      setTotalPages(1);
      toast.success("History cleared");
    } catch {
      toast.error("Failed to clear history");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="history-container">
      {/* Sidebar */}
      <aside className="history-sidebar">
        <div className="history-sidebar-header">
          <h2>History</h2>
          {entries.length > 0 && (
            <button className="clear-btn" onClick={handleClearAll} type="button">
              Clear all
            </button>
          )}
        </div>

        <div className="history-list-wrapper">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
            </div>
          ) : (
            <HistoryList
              entries={entries}
              onView={setSelectedEntry}
              onDelete={handleDelete}
              selectedId={selectedEntry?._id}
            />
          )}
        </div>

        {totalPages > 1 && (
          <div className="history-pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              type="button"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-btn ${currentPage === p ? "active" : ""}`}
                onClick={() => setCurrentPage(p)}
                type="button"
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              type="button"
            >
              Next
            </button>
          </div>
        )}
      </aside>

      {/* Detail Panel */}
      <main className="history-detail">
        {!selectedEntry ? (
          <div className="history-detail-empty">Select an entry from history to view details</div>
        ) : (
          <>
            <div className="history-detail-header">
              <div className="detail-header-left">
                <span className="history-type-badge">{selectedEntry.type}</span>
                <span className="history-item-date">{formatDate(selectedEntry.createdAt)}</span>
                <span className="history-item-langs">
                  {selectedEntry.sourceLanguage}
                  {selectedEntry.targetLanguage && ` → ${selectedEntry.targetLanguage}`}
                </span>
              </div>
              <button
                className="detail-close-btn"
                onClick={() => setSelectedEntry(null)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="history-detail-body">
              {/* Input Code */}
              <div className="detail-section">
                <div className="detail-section-title">
                  <span>Input Code</span>
                  <span className="detail-badge">{selectedEntry.sourceLanguage}</span>
                </div>
                <div className="detail-editor-container">
                  <CodeEditor
                    code={selectedEntry.inputCode || ""}
                    language={selectedEntry.sourceLanguage}
                    readOnly={true}
                  />
                </div>
              </div>

              {/* Output Section Per Type */}
              <div className="detail-section">
                <div className="detail-section-title">
                  <span>Output</span>
                  {selectedEntry.targetLanguage && (
                    <span className="detail-badge">{selectedEntry.targetLanguage}</span>
                  )}
                </div>

                {selectedEntry.type === "translate" && (
                  <pre className="detail-code-block">
                    {selectedEntry.output?.translatedCode || "No translation"}
                  </pre>
                )}

                {selectedEntry.type === "optimize" && (
                  <>
                    <pre className="detail-code-block">
                      {selectedEntry.output?.optimizedCode || "No optimized code"}
                    </pre>
                    {selectedEntry.output?.suggestions && (
                      <div className="detail-suggestions-card">
                        <h4>Suggestions</h4>
                        <p className="pre-wrap-text">{selectedEntry.output.suggestions}</p>
                      </div>
                    )}
                  </>
                )}

                {selectedEntry.type === "analyze" && (
                  <>
                    <div className="info-cards-grid">
                      <div className="info-card">
                        <div className="info-card-title">Time Complexity</div>
                        <div className="info-card-value">
                          {selectedEntry.output?.timeComplexity || "—"}
                        </div>
                      </div>
                      <div className="info-card">
                        <div className="info-card-title">Space Complexity</div>
                        <div className="info-card-value">
                          {selectedEntry.output?.spaceComplexity || "—"}
                        </div>
                      </div>
                    </div>
                    {selectedEntry.output?.explanation && (
                      <div className="detail-explanation-card">
                        {selectedEntry.output.explanation}
                      </div>
                    )}
                  </>
                )}

                {selectedEntry.type === "explain" && (
                  <div className="detail-explanation-card">
                    {selectedEntry.output?.explanation || "No explanation"}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
