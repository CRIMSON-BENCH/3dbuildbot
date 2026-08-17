import { NextResponse } from "next/server";
import { z } from "zod";
import { materialsChat } from "@/lib/gemini";

const schema = z.object({
  message: z.string(),
  history: z.array(z.object({ role: z.enum(["user", "model"]), text: z.string() })).optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const res = await materialsChat(body.message, body.history);
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
