// Uploads the customer's raw CAD file to Vercel Blob and returns a public
// URL. Called at order-commit time (not at quote time) — we honor the
// "files never leave your browser until you order" promise. The URL is then
// stored on the Part and used by Slant 3D (or manual fulfillment) to fetch
// the STL for printing.
//
// Requires: BLOB_READ_WRITE_TOKEN in env (auto-injected when a Blob store is
// created in Vercel → Storage → Blob).

import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { guard } from "@/lib/abuse-guard";

const MAX_BYTES = 250 * 1024 * 1024; // 250 MB — matches quote widget copy

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "auth required" }, { status: 401 });
  const blocked = guard(req, "spam");
  if (blocked) return blocked;

  const partId = new URL(req.url).searchParams.get("partId");
  if (!partId) return NextResponse.json({ error: "partId required" }, { status: 400 });

  const part = await db.parts.findById(partId);
  if (!part || part.teamId !== user.teamId) {
    return NextResponse.json({ error: "part not found" }, { status: 404 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob store not configured — enable Vercel → Storage → Blob" },
      { status: 503 }
    );
  }

  const body = await req.arrayBuffer();
  if (body.byteLength === 0) {
    return NextResponse.json({ error: "empty body" }, { status: 400 });
  }
  if (body.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: "file too large" }, { status: 413 });
  }

  const filename = part.filename || `${part.id}.stl`;
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `cad/${user.teamId}/${part.id}/${safeName}`;

  try {
    const blob = await put(key, body, {
      access: "public",
      contentType: "application/octet-stream",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    await db.parts.update(part.id, { fileUrl: blob.url });
    return NextResponse.json({ ok: true, fileUrl: blob.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: `blob upload failed: ${msg}` }, { status: 500 });
  }
}
