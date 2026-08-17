// Partner-shop login: simple bcrypt password check against partner.passwordHash. Sets a partner session cookie.
import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret-please-set-AUTH_SECRET-in-env");
const COOKIE = "3dbb_partner";

const schema = z.object({ email: z.string().email(), password: z.string() });

export async function POST(req: Request) {
  try {
    const b = schema.parse(await req.json());
    const partners = await db.partners.list();
    const p = partners.find((x) => x.contactEmail.toLowerCase() === b.email.toLowerCase());
    if (!p || !p.passwordHash) return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
    const ok = await bcrypt.compare(b.password, p.passwordHash);
    if (!ok) return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
    const token = await new SignJWT({ sub: p.id, email: p.contactEmail }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(SECRET);
    const jar = await cookies();
    jar.set(COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    await db.audit.log({ teamId: "public", actorId: `partner:${p.id}`, action: "partner.login", entity: "partner", entityId: p.id });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}

// getPartnerSession moved to src/lib/partner-auth.ts — route files can only export HTTP methods.
