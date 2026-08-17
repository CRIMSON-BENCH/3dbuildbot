"use client";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Only loads Vercel Analytics + Speed Insights after user gives cookie
// consent. Honors the cookie-banner "essential only" choice — speed
// insights still runs (essential = perf monitoring), analytics does not.
export function AnalyticsGated() {
  const [analytics, setAnalytics] = useState(false);
  const [insights, setInsights] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("3db-cookie-consent");
      if (consent === "all") { setAnalytics(true); setInsights(true); }
      else if (consent === "essential") { setInsights(true); } // essential = perf
    } catch { /* private mode */ }

    const listener = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "all") { setAnalytics(true); setInsights(true); }
      else if (detail === "essential") { setAnalytics(false); setInsights(true); }
    };
    window.addEventListener("cookie-consent", listener);
    return () => window.removeEventListener("cookie-consent", listener);
  }, []);

  return (
    <>
      {analytics && <Analytics />}
      {insights && <SpeedInsights />}
    </>
  );
}
