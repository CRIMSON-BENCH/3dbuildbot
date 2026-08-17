import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ApiKeyManager } from "@/components/ApiKeyManager";

export const dynamic = "force-dynamic";

export default async function ApiKeysPage() {
  const u = (await getCurrentUser())!;
  const keys = await db.apiKeys.listByTeam(u.teamId);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">API keys</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Use with our public REST API at <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono">/api/v1/*</code>. See <a href="/api-docs" className="text-brand-600 dark:text-brand-400 underline">docs</a>.</p>
      </div>
      <ApiKeyManager initialKeys={keys.map((k) => ({ id: k.id, name: k.name, prefix: k.prefix, last4: k.last4, createdAt: k.createdAt }))} />
    </div>
  );
}
