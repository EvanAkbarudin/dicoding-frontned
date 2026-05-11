import { createContext, useContext, useState, useEffect } from "react";
import { loadHistory, saveHistory, clearHistory } from "../data/storage";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Add new entry to history
  function addEntry(result, message) {
    const newEntry = {
      id: Date.now(),
      message,
      status: result.status,
      reason: result.reason,
      timestamp: new Date().toISOString(),
    };
    const updated = [newEntry, ...history];
    setHistory(updated);
    saveHistory(updated);
  }

  // Remove all history
  function removeAll() {
    setHistory([]);
    clearHistory();
  }

  // Count stats
  const totalCount = history.length;
  const safeCount = history.filter((item) => item.status === "safe").length;
  const phishingCount = totalCount - safeCount;

  return (
    <HistoryContext.Provider
      value={{
        history,
        addEntry,
        removeAll,
        totalCount,
        safeCount,
        phishingCount,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within HistoryProvider");
  }
  return context;
}
