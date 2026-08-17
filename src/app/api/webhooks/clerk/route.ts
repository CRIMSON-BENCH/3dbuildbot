// Clerk webhook — syncs Clerk users into our Neon db.users table.
// Fires on user.created / user.updated / user.deleted from Clerk.
// Set up in Clerk dashboard → Webhooks → point at /api/webhooks/clerk.
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db, type User } from "@/lib/db";
import { userId, teamId } from "@/lib/ids";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

interface ClerkUserPayload {
  id: string;
  email_addresses: { email_address: string; id: string; verification?: { status: string } }[];
  primary_email_address_id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

interface ClerkEvent {
  type: string;
  data: ClerkUserPayload;
}

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET not set — webhook signature not verifiable");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 501 });
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ ok: false, error: "missing_headers" }, { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: ClerkEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkEvent;
  } catch (e) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 400 });
  }

  const clerkUser = evt.data;
  const primaryEmail = clerkUser.email_addresses.find((e) => e.id === clerkUser.primary_email_address_id)?.email_address
    ?? clerkUser.email_addresses[0]?.email_address;
  if (!primaryEmail) return NextResponse.json({ ok: true, note: "no_email" });

  const displayName = [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(" ")
    || clerkUser.username
    || primaryEmail.split("@")[0];

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const existing = await db.users.findByEmail(primaryEmail.toLowerCase());
    if (existing) {
      // Update existing user with any changed profile fields
      await db.users.update(existing.id, { name: displayName });
      await db.audit.log({ teamId: existing.teamId, actorId: existing.id, action: `user.${evt.type.split(".")[1]}.clerk`, entity: "user", entityId: existing.id, detail: `clerk_id=${clerkUser.id}` });
      return NextResponse.json({ ok: true, action: "updated" });
    }
    // Create new team + user record for this Clerk identity
    const tId = teamId();
    const uId = userId();
    const newUser: User = {
      id: uId,
      email: primaryEmail.toLowerCase(),
      passwordHash: "clerk-managed", // password owned by Clerk, not us
      name: displayName,
      createdAt: Date.now(),
      teamId: tId,
      plan: "free",
      role: "owner",
      emailDomain: primaryEmail.split("@")[1]?.toLowerCase(),
      eduVerified: primaryEmail.toLowerCase().endsWith(".edu"),
    };
    await db.teams.create({
      id: tId,
      name: `${displayName.split(" ")[0]}'s team`,
      ownerId: uId,
      memberIds: [uId],
      plan: "free",
      createdAt: Date.now(),
      creditBalance: 0,
    });
    await db.users.create(newUser);
    await db.audit.log({ teamId: tId, actorId: uId, action: "user.created.clerk", entity: "user", entityId: uId, detail: `clerk_id=${clerkUser.id}` });
    return NextResponse.json({ ok: true, action: "created" });
  }

  if (evt.type === "user.deleted") {
    const existing = await db.users.findByEmail(primaryEmail.toLowerCase());
    if (existing) {
      await db.audit.log({ teamId: existing.teamId, actorId: existing.id, action: "user.deleted.clerk", entity: "user", entityId: existing.id, detail: `clerk_id=${clerkUser.id}` });
      // Note: we keep the user + team records for audit trail. Mark as inactive if you want hard delete.
    }
    return NextResponse.json({ ok: true, action: "logged" });
  }

  return NextResponse.json({ ok: true, action: "ignored", type: evt.type });
}
