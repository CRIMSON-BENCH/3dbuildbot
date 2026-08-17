import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { db } from "./db";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret-please-set-AUTH_SECRET-in-env");
const COOKIE = "3dbb_partner";

export async function getPartner() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const id = (payload as { sub?: string }).sub;
    if (!id) return null;
    return db.partners.findById(id);
  } catch { return null; }
}
