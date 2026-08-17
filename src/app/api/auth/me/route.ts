import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const u = await getCurrentUser();
  if (!u) return NextResponse.json({ ok: false, user: null }, { status: 401 });
  return NextResponse.json({
    ok: true,
    user: { id: u.id, email: u.email, name: u.name, teamId: u.teamId, plan: u.plan, role: u.role, isAdmin: u.isAdmin, eduVerified: u.eduVerified },
  });
}
