// US-persons attestation per 22 CFR § 120.15. Used to unlock ITAR-flagged workflows.
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  fullLegalName: z.string().min(1),
  ssn4Last: z.string().length(4).optional(),
  visaClass: z.string().optional(),
  attestation: z.literal(true, { message: "attestation_required" }),
});

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const body = schema.parse(await req.json());
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const updated = await db.users.update(u.id, {
      usPersonsVerified: true,
      usPersonsVerifiedAt: Date.now(),
      usPersonsAttestation: { name: body.fullLegalName, ssn4Last: body.ssn4Last, visaClass: body.visaClass, attestedAt: Date.now(), ip },
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "us-persons.verify", entity: "user", entityId: u.id });
    return NextResponse.json({ ok: true, user: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
