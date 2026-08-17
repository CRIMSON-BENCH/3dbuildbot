import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddressBook } from "@/components/AddressBook";

export const dynamic = "force-dynamic";

export default async function AddressesPage() {
  const u = (await getCurrentUser())!;
  const t = await db.teams.findById(u.teamId);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ship-to addresses</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage saved ship-to addresses for your team. The default address is pre-filled at checkout.</p>
      </div>
      <AddressBook initial={t?.addresses ?? []} />
    </div>
  );
}
