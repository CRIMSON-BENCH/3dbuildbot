// Admin bootstrap: promote a user to admin. Restricted by a shared setup token so any account can bootstrap once.
// POST { email, token } — token must match process.env.ADMIN_BOOTSTRAP_TOKEN (default "bootstrap") in dev.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({ email: z.string().email(), token: z.string() });
const EXPECTED = process.env.ADMIN_BOOTSTRAP_TOKEN || "bootstrap";

export async function POST(req: Request) {
  try {
    const b = schema.parse(await req.json());
    if (b.token !== EXPECTED) return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
    const u = await db.users.findByEmail(b.email);
    if (!u) return NextResponse.json({ ok: false, error: "user_not_found" }, { status: 404 });
    await db.users.update(u.id, { isAdmin: true });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
