"use client";
import { useState } from "react";

interface Row { id: string; url: string; events: string[]; lastFiredAt?: number; lastStatusCode?: number; }
const EVENTS = ["quote.created", "order.created", "order.status_changed", "order.shipped"];

export function WebhookManager({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState<Row[]>(initial);
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState<string[]>(["order.created"]);
  const [busy, setBusy] = useState(false);
  const [newSecret, setNewSecret] = useState<string | null>(null);

  async function create() {
    setBusy(true); setNewSecret(null);
    const res = await fetch("/api/webhooks", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url, events }) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) {
      setRows((r) => [{ id: data.webhook.id, url: data.webhook.url, events: data.webhook.events }, ...r]);
      setNewSecret(data.secret);
      setUrl("");
    }
  }
  async function revoke(id: string) {
    await fetch(`/api/webhooks/${id}`, { method: "DELETE" });
    setRows((r) => r.filter((x) => x.id !== id));
  }
  function toggle(ev: string) {
    setEvents((cur) => (cur.includes(ev) ? cur.filter((e) => e !== ev) : [...cur, ev]));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <div className="text-sm font-semibold">Add endpoint</div>
        <input placeholder="https://your-service.example.com/webhooks/3dbb" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        <div className="flex flex-wrap gap-2">
          {EVENTS.map((ev) => (
            <label key={ev} className="inline-flex items-center gap-1.5 text-xs">
              <input type="checkbox" checked={events.includes(ev)} onChange={() => toggle(ev)} /> <code className="font-mono">{ev}</code>
            </label>
          ))}
        </div>
        <button onClick={create} disabled={busy || !url} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium">{busy ? "…" : "Create webhook"}</button>
        {newSecret && (
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3">
            <div className="text-xs font-mono text-amber-800 dark:text-amber-200 mb-1">Copy the secret now — it won't be shown again.</div>
            <code className="block text-xs font-mono break-all">{newSecret}</code>
          </div>
        )}
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {rows.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500">No webhooks yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr><th className="text-left px-4 py-2">URL</th><th className="text-left px-4 py-2">Events</th><th className="text-left px-4 py-2">Last</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-mono text-xs truncate max-w-[280px]">{r.url}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{r.events.join(", ")}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.lastFiredAt ? `${new Date(r.lastFiredAt).toLocaleTimeString()} · ${r.lastStatusCode}` : "—"}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => revoke(r.id)} className="text-xs text-red-600 hover:underline">Revoke</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
