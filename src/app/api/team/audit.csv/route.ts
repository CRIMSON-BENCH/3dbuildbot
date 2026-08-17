import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const u = await requireUser();
    const events = await db.audit.list(u.teamId, 5000);
    const header = "at_iso,at_epoch_ms,actor_id,action,entity,entity_id,detail,ip";
    const rows = events.map((e) => [
      new Date(e.at).toISOString(), e.at, e.actorId, e.action, e.entity, e.entityId ?? "", (e.detail ?? "").replace(/,/g, ";"), e.ip ?? "",
    ].join(","));
    const csv = [header, ...rows].join("\n");
    return new Response(csv, { headers: { "content-type": "text/csv", "content-disposition": `attachment; filename="audit-${u.teamId}.csv"` } });
  } catch {
    return new Response("unauthorized", { status: 401 });
  }
}
