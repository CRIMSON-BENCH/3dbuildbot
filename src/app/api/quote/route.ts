import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { quoteId } from "@/lib/ids";
import { quote as computeQuote } from "@/lib/quote-engine";
import { analyzeDfm } from "@/lib/gemini";

const schema = z.object({
  partId: z.string().optional(),
  partName: z.string().optional(),
  volumeCm3: z.number(),
  bboxMm: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  triangleCount: z.number().optional(),
  hash: z.string().optional(),
  fileSize: z.number().optional(),
  processSlug: z.string(),
  materialSlug: z.string(),
  quantity: z.number().int().min(1).max(50000),
  finish: z.string().optional(),
  expedite: z.enum(["standard", "economy", "rush2", "rush1", "weekend"]).optional(),
  persist: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const priced = computeQuote(body);
    const dfm = await analyzeDfm({ ...body, name: body.partName ?? "Untitled part" });

    let saved = null;
    if (body.persist) {
      const u = await getCurrentUser();
      if (u) {
        // Auto-save part to vault if we have parsed geometry
        let partId = body.partId ?? "";
        if (!partId && body.partName && body.hash) {
          const existing = (await db.parts.listByTeam(u.teamId)).find((p) => p.hash === body.hash);
          if (existing) {
            partId = existing.id;
          } else {
            const { partId: newPartId } = await import("@/lib/ids");
            const part = await db.parts.create({
              id: newPartId(),
              ownerId: u.id,
              teamId: u.teamId,
              name: body.partName,
              filename: body.partName,
              fileSize: body.fileSize ?? 0,
              volumeCm3: body.volumeCm3,
              bboxMm: body.bboxMm,
              triangleCount: body.triangleCount,
              hash: body.hash,
              tags: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            });
            partId = part.id;
          }
        }
        saved = await db.quotes.create({
          id: quoteId(),
          ownerId: u.id,
          teamId: u.teamId,
          partId,
          process: body.processSlug,
          material: body.materialSlug,
          finish: body.finish,
          expedite: body.expedite,
          quantity: body.quantity,
          unitPriceCents: priced.unitPriceCents,
          totalPriceCents: priced.totalPriceCents,
          currency: "USD",
          leadTimeDays: priced.leadTimeDays,
          expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
          status: "pending",
          createdAt: Date.now(),
          dfmSummary: dfm.summary,
          dfmIssues: dfm.issues,
          costDrivers: priced.costDrivers,
        });
        await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "quote.create", entity: "quote", entityId: saved.id });
      }
    }

    return NextResponse.json({ ok: true, quote: priced, dfm, saved });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "quote_failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
