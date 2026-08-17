import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeDfm } from "@/lib/gemini";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({
  name: z.string(),
  volumeCm3: z.number(),
  bboxMm: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  triangleCount: z.number().optional(),
  processSlug: z.string(),
  materialSlug: z.string(),
  quantity: z.number().int().min(1),
});

export async function POST(req: Request) {
  const blocked = guard(req, "gemini-cheap");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    const result = await analyzeDfm(body);
    return NextResponse.json({ ok: true, dfm: result });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
