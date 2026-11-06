const HistoryList = ({ entries, onView, onDelete, selectedId }) => {
  if (!entries || entries.length === 0) {
    return <div className="history-empty">No history yet</div>;
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLanguageLabel = (item) => {
    if (item.type === "translate" && item.targetLanguage) {
      return `${item.sourceLanguage} → ${item.targetLanguage}`;
    }
    return item.sourceLanguage || "";
  };

  return (
    <div className="history-list">
      {entries.map((item) => (
        <div
          key={item._id}
          className={`history-item ${selectedId === item._id ? "active" : ""}`}
          onClick={() => onView(item)}
        >
          <div className="history-item-content">
            <div className="history-item-top">
              <span className="history-type-badge">{item.type}</span>
              <span className="history-item-langs">{getLanguageLabel(item)}</span>
            </div>
            <div className="history-item-date">{formatDate(item.createdAt)}</div>
          </div>
          <button
            className="history-item-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item._id);
            }}
            title="Delete entry"
            type="button"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
