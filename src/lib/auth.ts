import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db, type User } from "./db";
import { userId, teamId } from "./ids";

const SESSION_COOKIE = "3dbb_session";
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret-please-set-AUTH_SECRET-in-env");
const SESSION_LIFETIME_SEC = 60 * 60 * 24 * 30; // 30 days

export interface SessionPayload {
  sub: string; // user id
  email: string;
  teamId: string;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
}

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 10);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

export async function signSession(payload: Omit<SessionPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_LIFETIME_SEC}s`)
    .sign(SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(payload: Omit<SessionPayload, "iat" | "exp">): Promise<void> {
  const token = await signSession(payload);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_LIFETIME_SEC,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session?.sub) return null;
  return (await db.users.findById(session.sub)) || null;
}

export async function requireUser(): Promise<User> {
  const u = await getCurrentUser();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}

export interface SignupInput { email: string; password: string; name: string; }

export async function signup({ email, password, name }: SignupInput): Promise<{ user: User; teamId: string }> {
  const existing = await db.users.findByEmail(email);
  if (existing) throw new Error("Email already in use");
  const tId = teamId();
  const uId = userId();
  const hash = await hashPassword(password);
  await db.teams.create({
    id: tId,
    name: `${name.split(" ")[0]}'s team`,
    ownerId: uId,
    memberIds: [uId],
    plan: "free",
    createdAt: Date.now(),
    creditBalance: 0,
  });
  const user: User = {
    id: uId,
    email: email.toLowerCase(),
    passwordHash: hash,
    name,
    createdAt: Date.now(),
    teamId: tId,
    plan: "free",
    role: "owner",
    emailDomain: email.split("@")[1]?.toLowerCase(),
    eduVerified: email.toLowerCase().endsWith(".edu"),
  };
  await db.users.create(user);
  await setSessionCookie({ sub: user.id, email: user.email, teamId: tId });
  await db.audit.log({ teamId: tId, actorId: user.id, action: "user.signup", entity: "user", entityId: user.id });
  return { user, teamId: tId };
}

export async function login(email: string, password: string): Promise<User> {
  const u = await db.users.findByEmail(email);
  if (!u) throw new Error("Invalid credentials");
  const ok = await verifyPassword(password, u.passwordHash);
  if (!ok) throw new Error("Invalid credentials");
  await setSessionCookie({ sub: u.id, email: u.email, teamId: u.teamId, isAdmin: u.isAdmin });
  await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "user.login", entity: "user", entityId: u.id });
  return u;
}

export async function logout(): Promise<void> {
  const s = await getSession();
  if (s) await db.audit.log({ teamId: s.teamId, actorId: s.sub, action: "user.logout", entity: "user", entityId: s.sub });
  await clearSessionCookie();
}
