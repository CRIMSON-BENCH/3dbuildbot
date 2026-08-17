"use client";
import { useState } from "react";
import { Badge } from "./Card";

interface Addr { id: string; label: string; name: string; line1: string; line2?: string; city: string; state: string; zip: string; country: string; isDefault?: boolean; }

export function AddressBook({ initial }: { initial: Addr[] }) {
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [f, setF] = useState<Partial<Addr>>({ country: "United States" });

  async function add() {
    if (!f.label || !f.line1 || !f.city || !f.state || !f.zip) return;
    setBusy(true);
    const res = await fetch("/api/addresses", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(f) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) { setItems(data.addresses); setF({ country: "United States" }); setShowForm(false); }
  }
  async function del(id: string) {
    await fetch("/api/addresses", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
    setItems((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-sm font-semibold">Saved addresses ({items.length})</div>
          <button onClick={() => setShowForm((s) => !s)} className="text-xs font-medium px-3 py-1.5 rounded-md bg-brand-600 text-white">{showForm ? "Cancel" : "+ Add address"}</button>
        </div>
        {items.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500">No addresses saved yet.</div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((a) => (
              <li key={a.id} className="px-4 py-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2"><div className="text-sm font-semibold">{a.label}</div>{a.isDefault && <Badge tone="brand">default</Badge>}</div>
                  <div className="text-xs text-slate-500 mt-1">{a.name} · {a.line1}{a.line2 ? ", " + a.line2 : ""} · {a.city}, {a.state} {a.zip} · {a.country}</div>
                </div>
                <button onClick={() => del(a.id)} className="text-xs text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showForm && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 grid sm:grid-cols-2 gap-3">
          <label className="block sm:col-span-2"><span className="text-xs font-medium">Label</span><input value={f.label ?? ""} onChange={(e) => setF({ ...f, label: e.target.value })} placeholder="e.g. HQ · lab · shipping dock" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <label className="block"><span className="text-xs font-medium">Attention (name)</span><input value={f.name ?? ""} onChange={(e) => setF({ ...f, name: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <label className="block"><span className="text-xs font-medium">Country</span><input value={f.country ?? ""} onChange={(e) => setF({ ...f, country: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <label className="block sm:col-span-2"><span className="text-xs font-medium">Street</span><input value={f.line1 ?? ""} onChange={(e) => setF({ ...f, line1: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <label className="block sm:col-span-2"><span className="text-xs font-medium">Line 2 (optional)</span><input value={f.line2 ?? ""} onChange={(e) => setF({ ...f, line2: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <label className="block"><span className="text-xs font-medium">City</span><input value={f.city ?? ""} onChange={(e) => setF({ ...f, city: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="text-xs font-medium">State</span><input value={f.state ?? ""} onChange={(e) => setF({ ...f, state: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
            <label className="block"><span className="text-xs font-medium">Zip</span><input value={f.zip ?? ""} onChange={(e) => setF({ ...f, zip: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono" /></label>
          </div>
          <label className="flex items-center gap-2 mt-2 sm:col-span-2"><input type="checkbox" checked={f.isDefault ?? false} onChange={(e) => setF({ ...f, isDefault: e.target.checked })} /> <span className="text-xs">Set as default</span></label>
          <div className="sm:col-span-2"><button onClick={add} disabled={busy} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium">{busy ? "…" : "Save address"}</button></div>
        </div>
      )}
    </div>
  );
}
