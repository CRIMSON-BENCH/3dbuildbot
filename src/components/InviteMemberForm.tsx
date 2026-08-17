"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function InviteMemberForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("quoter");
  const [busy, setBusy] = useState(false);
  const [lastLink, setLastLink] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null); setLastLink(null);
    const res = await fetch("/api/invites", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, role }) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) { setLastLink(`${location.origin}${data.acceptUrl}`); setEmail(""); router.refresh(); }
    else setErr(data.error || "failed");
  }
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <h2 className="text-sm font-semibold mb-3">Invite a team member</h2>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className="text-xs font-medium">Email</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <label className="block"><span className="text-xs font-medium">Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              <option value="viewer">Viewer</option>
              <option value="quoter">Quoter</option>
              <option value="approver">Approver (can sign off on quotes over threshold)</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
        {err && <div className="text-xs text-red-600">{err}</div>}
        <button disabled={busy} type="submit" className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium py-2">{busy ? "…" : "Send invite"}</button>
      </form>
      {lastLink && (
        <div className="mt-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3">
          <div className="text-xs font-mono text-emerald-800 dark:text-emerald-200 mb-1">Invite link (email would be sent in production):</div>
          <code className="block text-xs font-mono break-all">{lastLink}</code>
        </div>
      )}
    </div>
  );
}
