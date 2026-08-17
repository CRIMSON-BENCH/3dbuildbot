"use client";
import { useState, useRef } from "react";
import Link from "next/link";

interface Analysis {
  summary: string;
  estimatedDimensionsMm: { x: number; y: number; z: number };
  estimatedVolumeCm3: number;
  materialGuess: string;
  processRecommendation: string;
  featureList: string[];
  confidence: number;
  notes: string;
  manufacturable: boolean;
}

export function ReverseEngineerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [scaleHint, setScaleHint] = useState("US quarter (24.26mm)");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ analysis: Analysis; usingMock: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fl: FileList | null) {
    if (!fl) return;
    setFiles((prev) => [...prev, ...Array.from(fl)].slice(0, 6));
  }

  async function submit() {
    if (files.length === 0) return;
    setBusy(true);
    const fd = new FormData();
    files.forEach((f) => fd.append("images", f));
    fd.append("scaleHint", scaleHint);
    fd.append("description", description);
    const res = await fetch("/api/reverse-engineer", { method: "POST", body: fd });
    const data = await res.json();
    setBusy(false);
    if (data.ok) setResult({ analysis: data.analysis, usingMock: !!data.usingMock });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <label className="block cursor-pointer" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
          <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 p-8 text-center">
            <svg className="mx-auto w-8 h-8 text-slate-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="4"/></svg>
            <div className="text-sm font-medium">Drop up to 6 photos (or click)</div>
            <div className="text-xs text-slate-500 mt-1 font-mono">Best: orthogonal top / front / side views with coin for scale</div>
            <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
          </div>
        </label>
        {files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono">
            {files.map((f, i) => (
              <div key={i} className="rounded px-2 py-1 bg-slate-100 dark:bg-slate-800">{f.name} · {(f.size / 1024).toFixed(0)}KB <button onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-500">✕</button></div>
            ))}
          </div>
        )}
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <label className="block"><span className="text-xs font-medium">Scale reference in the photos</span>
            <select value={scaleHint} onChange={(e) => setScaleHint(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              <option>US quarter (24.26mm)</option>
              <option>US penny (19.05mm)</option>
              <option>1 inch ruler mark</option>
              <option>10mm scale bar</option>
              <option>None — I'll dimension after</option>
            </select>
          </label>
          <label className="block"><span className="text-xs font-medium">Description (optional)</span>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. dishwasher latch, drone motor mount" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
          </label>
        </div>
        <div className="mt-4"><button onClick={submit} disabled={busy || files.length === 0} className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium py-2.5">{busy ? "Analyzing with Gemini Vision…" : "Analyze part →"}</button></div>
      </div>

      {result && (
        <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/20 p-5 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300">Analysis {result.usingMock ? "· mock (add GEMINI_API_KEY for live)" : "· Gemini 2.5 Pro Vision"}</div>
              <div className="text-sm font-semibold mt-1">Confidence: {Math.round(result.analysis.confidence * 100)}%</div>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">{result.analysis.summary}</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Bounding box</div>
              <div className="text-sm font-mono mt-1">{result.analysis.estimatedDimensionsMm.x}×{result.analysis.estimatedDimensionsMm.y}×{result.analysis.estimatedDimensionsMm.z} mm</div>
            </div>
            <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Volume estimate</div>
              <div className="text-sm font-mono mt-1">{result.analysis.estimatedVolumeCm3.toFixed(1)} cm³</div>
            </div>
            <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Suggested spec</div>
              <div className="text-sm font-mono mt-1">{result.analysis.processRecommendation.toUpperCase()} · {result.analysis.materialGuess}</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">Feature list</div>
            <ul className="text-sm space-y-1">
              {result.analysis.featureList.map((f, i) => <li key={i}>· {f}</li>)}
            </ul>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 italic">{result.analysis.notes}</div>
          <div className="pt-2 border-t border-brand-200 dark:border-brand-800">
            <Link href={`/quote?material=${result.analysis.materialGuess}&process=${result.analysis.processRecommendation}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Quote a real part → </Link>
            <Link href="/book-a-call" className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium">Talk to an engineer</Link>
          </div>
        </div>
      )}
    </div>
  );
}
