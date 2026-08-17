"use client";
import { useState } from "react";

interface KeyRow { id: string; name: string; prefix: string; last4: string; createdAt: number; }

export function ApiKeyManager({ initialKeys }: { initialKeys: KeyRow[] }) {
  const [keys, setKeys] = useState(initialKeys);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  async function create() {
    if (!name) return;
    setBusy(true);
    setNewKey(null);
    const res = await fetch("/api/api-keys", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setBusy(false);
    if (data.ok) {
      setKeys((k) => [{ id: data.key.id, name: data.key.name, prefix: data.key.prefix, last4: data.key.last4, createdAt: data.key.createdAt }, ...k]);
      setNewKey(data.plaintext);
      setName("");
    }
  }

  async function revoke(id: string) {
    const res = await fetch(`/api/api-keys/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) setKeys((k) => k.filter((x) => x.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-end gap-2">
          <label className="flex-1">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Key name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Production backend" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
          </label>
          <button onClick={create} disabled={busy || !name} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium">
            {busy ? "…" : "Generate key"}
          </button>
        </div>
        {newKey && (
          <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3">
            <div className="text-xs font-mono text-amber-800 dark:text-amber-200 mb-2">Copy this key now — it will not be shown again.</div>
            <code className="block text-xs font-mono bg-white dark:bg-slate-950 border border-amber-300 dark:border-amber-800 rounded p-2 break-all">{newKey}</code>
          </div>
        )}
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {keys.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">No keys yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Key</th>
                <th className="text-left px-4 py-2">Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {keys.map((k) => (
                <tr key={k.id}>
                  <td className="px-4 py-3">{k.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{k.prefix}…{k.last4}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(k.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => revoke(k.id)} className="text-xs text-red-600 hover:underline">Revoke</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
