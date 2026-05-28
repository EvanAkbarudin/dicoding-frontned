import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../lib/axios";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load history from PostgreSQL via API when user is logged in
  useEffect(() => {
    async function fetchHistory() {
      if (!user) {
        setHistory([]);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get("/api/v1/history");
        if (response.data?.status === "success") {
          setHistory(response.data.data.histories);
        }
      } catch (err) {
        console.error("Gagal memuat riwayat dari server:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [user]);

  // Add new entry to state (already saved to database during prediction proxy)
  function addEntry(newEntry) {
    if (!newEntry) return;
    setHistory((prev) => [newEntry, ...prev]);
  }

  // Remove all history
  async function removeAll() {
    if (!user) return;
    try {
      const response = await api.delete("/api/v1/history");
      if (response.data?.status === "success") {
        setHistory([]);
      }
    } catch (err) {
      console.error("Gagal menghapus riwayat di server:", err);
      alert("Gagal menghapus riwayat di server.");
    }
  }

  // Count stats
  const totalCount = history.length;
  const safeCount = history.filter((item) => item.status === "safe").length;
  const phishingCount = totalCount - safeCount;

  return (
    <HistoryContext.Provider
      value={{
        history,
        loading,
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
