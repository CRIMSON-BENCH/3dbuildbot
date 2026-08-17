"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }
  return (
    <button onClick={toggle} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400" aria-label="Toggle theme">
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm5.66 2.34a1 1 0 0 1 0 1.41l-.7.71a1 1 0 1 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0zM17 10a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm-1.34 5.66a1 1 0 0 1-1.41 0l-.71-.7a1 1 0 1 1 1.42-1.42l.7.7a1 1 0 0 1 0 1.42zM10 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm-5.66-.34a1 1 0 0 1 0-1.41l.7-.71a1 1 0 1 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0zM3 10a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm1.34-5.66a1 1 0 0 1 1.41 0l.71.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42zM10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" /></svg>
      )}
    </button>
  );
}
