import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { WebhookManager } from "@/components/WebhookManager";

export const dynamic = "force-dynamic";

export default async function WebhooksPage() {
  const u = (await getCurrentUser())!;
  const hooks = await db.webhooks.listByTeam(u.teamId);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Webhooks</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Subscribe an endpoint to real-time events. HMAC-signed with your webhook secret in the <code className="font-mono text-xs">x-3dbb-signature</code> header.</p>
      </div>
      <WebhookManager initial={hooks.map((h) => ({ id: h.id, url: h.url, events: h.events, lastFiredAt: h.lastFiredAt, lastStatusCode: h.lastStatusCode }))} />
    </div>
  );
}
