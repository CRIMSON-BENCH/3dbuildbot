import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { partId } from "@/lib/ids";

export async function GET() {
  try {
    const u = await requireUser();
    const parts = await db.parts.listByTeam(u.teamId);
    return NextResponse.json({ ok: true, parts });
  } catch {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }
}

const schema = z.object({
  name: z.string(),
  filename: z.string(),
  fileSize: z.number(),
  volumeCm3: z.number(),
  bboxMm: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  triangleCount: z.number().optional(),
  hash: z.string(),
  tags: z.array(z.string()).optional(),
  itarFlagged: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const body = schema.parse(await req.json());
    const now = Date.now();
    const part = await db.parts.create({
      id: partId(),
      ownerId: u.id,
      teamId: u.teamId,
      name: body.name,
      filename: body.filename,
      fileSize: body.fileSize,
      volumeCm3: body.volumeCm3,
      bboxMm: body.bboxMm,
      triangleCount: body.triangleCount ?? 0,
      hash: body.hash,
      tags: body.tags ?? [],
      itarFlagged: body.itarFlagged,
      createdAt: now,
      updatedAt: now,
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "part.create", entity: "part", entityId: part.id });
    return NextResponse.json({ ok: true, part });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "part_create_failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
