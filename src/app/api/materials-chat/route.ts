import { NextResponse } from "next/server";
import { z } from "zod";
import { materialsChat } from "@/lib/gemini";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({
  message: z.string().max(2000), // prevent giant prompts
  history: z.array(z.object({ role: z.enum(["user", "model"]), text: z.string().max(4000) })).max(20).optional(),
});

export async function POST(req: Request) {
  const blocked = guard(req, "gemini-cheap");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    const res = await materialsChat(body.message, body.history);
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
