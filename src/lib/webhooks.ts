// Fire webhooks with HMAC-signed payloads.
import crypto from "crypto";
import { db } from "./db";

export async function fireWebhooks(teamId: string, event: string, data: unknown) {
  const hooks = await db.webhooks.listByTeam(teamId);
  const subs = hooks.filter((h) => h.events.includes(event) || h.events.includes("*"));
  await Promise.all(subs.map(async (h) => {
    try {
      const body = JSON.stringify({ event, data, teamId, at: Date.now() });
      const signature = crypto.createHmac("sha256", h.secret).update(body).digest("hex");
      const res = await fetch(h.url, {
        method: "POST",
        headers: { "content-type": "application/json", "x-3dbb-signature": signature, "x-3dbb-event": event },
        body,
      });
      await db.webhooks.recordFire(h.id, res.status);
    } catch {
      await db.webhooks.recordFire(h.id, 0);
    }
  }));
}
