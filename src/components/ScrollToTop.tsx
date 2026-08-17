"use client";
import { useEffect, useState } from "react";

// Floating "back to top" button appears after user scrolls past ~1.5
// viewports. Critical for long programmatic pages (materials, guides,
// blog posts) where the user might scroll thousands of pixels.
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-20 right-4 z-30 w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 16V4M4 10l6-6 6 6" /></svg>
    </button>
  );
}
