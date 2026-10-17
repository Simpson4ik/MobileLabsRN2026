import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { LOG_EVENTS, generateLogs, generateNews, generateUsers } from "@/data/admin";

const AdminContext = createContext(null);

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const DEFAULT_NEWS_FILTER = { status: "Усі", category: "Усі" };
const DEFAULT_USER_FILTER = { status: "Усі", role: "Усі" };

export function AdminProvider({ children }) {
  const { user } = useAuth();
  const [news, setNews] = useState(() => generateNews());
  const [users, setUsers] = useState(() => generateUsers());
  const [logs, setLogs] = useState(() => generateLogs());
  const [newsFilter, setNewsFilter] = useState(DEFAULT_NEWS_FILTER);
  const [userFilter, setUserFilter] = useState(DEFAULT_USER_FILTER);

  const addLog = useCallback(
    (event, target = "", actor = user?.email ?? "Гість") => {
      setLogs((current) => [
        { id: createId(), event, actor, target, createdAt: new Date().toISOString() },
        ...current,
      ]);
    },
    [user],
  );

  const addNews = useCallback(
    (data) => {
      const item = { ...data, id: createId(), createdAt: new Date().toISOString() };
      setNews((current) => [item, ...current]);
      addLog(LOG_EVENTS.newsCreated, item.title);
    },
    [addLog],
  );

  const updateNews = useCallback(
    (id, data) => {
      setNews((current) => current.map((item) => (item.id === id ? { ...item, ...data } : item)));
      addLog(LOG_EVENTS.newsUpdated, data.title);
    },
    [addLog],
  );

  const deleteNews = useCallback(
    (id) => {
      const target = news.find((item) => item.id === id);
      if (!target) {
        return;
      }
      setNews((current) => current.filter((item) => item.id !== id));
      addLog(LOG_EVENTS.newsDeleted, target.title);
    },
    [news, addLog],
  );

  const toggleUserStatus = useCallback(
    (id) => {
      const target = users.find((item) => item.id === id);
      if (!target) {
        return;
      }
      const status = target.status === "Активний" ? "Заблокований" : "Активний";
      setUsers((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
      addLog(LOG_EVENTS.userStatusChanged, `${target.email}: ${status}`);
    },
    [users, addLog],
  );

  const value = useMemo(
    () => ({
      news,
      users,
      logs,
      newsFilter,
      userFilter,
      setNewsFilter,
      setUserFilter,
      addLog,
      addNews,
      updateNews,
      deleteNews,
      toggleUserStatus,
    }),
    [news, users, logs, newsFilter, userFilter, addLog, addNews, updateNews, deleteNews, toggleUserStatus],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
