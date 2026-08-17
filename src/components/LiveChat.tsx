"use client";
import { useState } from "react";

interface Msg { role: "user" | "model"; text: string; }

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "model", text: "Hi — I'm the 3DBuildBot AI engineer. Ask me anything about materials, processes, tolerances, or DFM. For account or order questions, I'll route you to a human." }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"ai" | "human">("ai");

  async function send() {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    if (mode === "ai") {
      const res = await fetch("/api/materials-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: userMsg.text, history: msgs.slice(1) }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "model", text: data.text || "Sorry, something went wrong. Email support@3dbuildbot.com." }]);
    } else {
      // Log to contact form
      await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "Live chat visitor", email: "livechat@3dbuildbot.com", message: userMsg.text }) });
      setMsgs((m) => [...m, { role: "model", text: "Got it — a manufacturing engineer will follow up via email within 4 business hours." }]);
    }
    setBusy(false);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-40 shadow-xl shadow-brand-600/30 bg-brand-600 hover:bg-brand-700 text-white rounded-full h-14 w-14 flex items-center justify-center" aria-label="Open chat">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-[500px] max-h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-sm font-semibold">3DBuildBot Chat</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">{mode === "ai" ? "AI engineer · Gemini" : "Route to human"}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMode((m) => (m === "ai" ? "human" : "ai"))} className="text-[10px] px-2 py-1 rounded border border-slate-200 dark:border-slate-800">{mode === "ai" ? "Talk to human →" : "← AI mode"}</button>
          <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700 text-lg">×</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className={`text-xs rounded-lg p-2.5 ${m.role === "user" ? "bg-brand-600 text-white ml-6" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 mr-6"}`}>{m.text}</div>
        ))}
        {busy && <div className="text-xs text-slate-500">…</div>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "ai" ? "Ask about materials, tolerances…" : "Message the team…"} className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs" />
        <button disabled={busy} className="px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium disabled:opacity-60">Send</button>
      </form>
    </div>
  );
}
