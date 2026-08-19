"use client";
// Trustpilot review widget — renders a mini review widget when
// NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID env var is set. Falls back to a
// "Reviews coming soon" placeholder otherwise. Script self-loads from
// Trustpilot's CDN.

import { useEffect, useState } from "react";

const businessId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID;

export function TrustpilotWidget({ template = "mini" }: { template?: "mini" | "carousel" }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!businessId) return;
    if (typeof window === "undefined") return;
    const win = window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement, opts: { async: boolean }) => void } };
    if (!win.Trustpilot) {
      const s = document.createElement("script");
      s.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      s.async = true;
      s.onload = () => setLoaded(true);
      document.body.appendChild(s);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const win = window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement, opts: { async: boolean }) => void } };
    document.querySelectorAll<HTMLElement>(".trustpilot-widget").forEach((el) => {
      win.Trustpilot?.loadFromElement(el, { async: true });
    });
  }, [loaded]);

  if (!businessId) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 text-sm text-slate-500">
        Trustpilot reviews will appear here once <code className="font-mono text-xs">NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID</code> is set.
      </div>
    );
  }

  const templateId = template === "carousel" ? "53aa8912cf07ec0e00d5482d" : "53aa8807dec7e10d38f59f32";

  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id={templateId}
      data-businessunit-id={businessId}
      data-style-height={template === "carousel" ? "240px" : "150px"}
      data-style-width="100%"
      data-theme="light"
    >
      <a href={`https://www.trustpilot.com/review/3dbuildbot.com`} target="_blank" rel="noopener noreferrer">
        Trustpilot reviews
      </a>
    </div>
  );
}
