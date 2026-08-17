"use client";
import { useState } from "react";
import type { ContentDoc } from "@/lib/db";

export function ContentAdmin({ initial }: { initial: ContentDoc[] }) {
  const [docs, setDocs] = useState(initial);
  const [editing, setEditing] = useState<Partial<ContentDoc>>({ kind: "blog", published: true });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    if (!editing.slug || !editing.title || !editing.body) { setMsg("Slug, title, and body are required"); return; }
    setBusy(true); setMsg(null);
    const res = await fetch("/api/admin/content", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(editing) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) {
      setDocs((prev) => {
        const idx = prev.findIndex((d) => d.slug === data.doc.slug);
        if (idx >= 0) { const arr = [...prev]; arr[idx] = data.doc; return arr; }
        return [data.doc, ...prev];
      });
      setMsg("Saved ✓");
    } else setMsg(data.error);
  }

  function load(d: ContentDoc) { setEditing({ ...d }); setMsg(null); }
  function fresh() { setEditing({ kind: "blog", published: true }); setMsg(null); }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-sm font-semibold">Existing ({docs.length})</div>
          <button onClick={fresh} className="text-xs text-brand-600">+ New</button>
        </div>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800 max-h-[500px] overflow-y-auto">
          {docs.map((d) => (
            <li key={d.slug} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-950/60 cursor-pointer" onClick={() => load(d)}>
              <div className="text-sm font-medium">{d.title}</div>
              <div className="text-xs text-slate-500 font-mono">{d.kind} · /{d.kind === "blog" ? "blog" : "case-studies"}/{d.slug}</div>
            </li>
          ))}
          {docs.length === 0 && <li className="px-4 py-8 text-center text-sm text-slate-500">No docs yet.</li>}
        </ul>
      </div>
      <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <div className="grid sm:grid-cols-3 gap-2">
          <label className="block"><span className="text-xs font-medium">Slug</span><input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="my-post-slug" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono" /></label>
          <label className="block"><span className="text-xs font-medium">Kind</span>
            <select value={editing.kind ?? "blog"} onChange={(e) => setEditing({ ...editing, kind: e.target.value as ContentDoc["kind"] })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              <option value="blog">Blog</option>
              <option value="case-study">Case study</option>
              <option value="guide">Guide</option>
            </select>
          </label>
          <label className="flex items-center gap-2 mt-6"><input type="checkbox" checked={editing.published ?? false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> <span className="text-xs">Published</span></label>
        </div>
        <label className="block"><span className="text-xs font-medium">Title</span><input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Description</span><input value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Body (Markdown)</span><textarea rows={16} value={editing.body ?? ""} onChange={(e) => setEditing({ ...editing, body: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-mono" /></label>
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={busy} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium">{busy ? "…" : "Save"}</button>
          {msg && <span className="text-xs text-slate-600">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
