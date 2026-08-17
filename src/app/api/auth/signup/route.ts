import { NextResponse } from "next/server";
import { z } from "zod";
import { signup } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const { user } = await signup(body);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, teamId: user.teamId } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "signup_failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
