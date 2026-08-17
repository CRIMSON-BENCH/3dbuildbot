import { NextResponse } from "next/server";
import { z } from "zod";
import { login } from "@/lib/auth";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(req: Request) {
  const blocked = guard(req, "auth");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    const u = await login(body.email, body.password);
    return NextResponse.json({ ok: true, user: { id: u.id, email: u.email, name: u.name, teamId: u.teamId, isAdmin: u.isAdmin } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "login_failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 401 });
  }
}
