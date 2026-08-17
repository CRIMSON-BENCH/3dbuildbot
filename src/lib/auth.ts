import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db, type User } from "./db";
import { userId, teamId } from "./ids";
import { currentUser as clerkCurrentUser } from "@clerk/nextjs/server";

const clerkEnabled = !!process.env.CLERK_SECRET_KEY;

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
  // Path 1: Clerk-authenticated (when CLERK_SECRET_KEY is set). Look up local
  // user record by email (populated by /api/webhooks/clerk on first sign-in).
  if (clerkEnabled) {
    try {
      const cu = await clerkCurrentUser();
      if (cu) {
        const email = cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)?.emailAddress
          ?? cu.emailAddresses[0]?.emailAddress;
        if (email) {
          const existing = await db.users.findByEmail(email.toLowerCase());
          if (existing) return existing;
          // First-time login before webhook fires — create the local user shadow now.
          const displayName = [cu.firstName, cu.lastName].filter(Boolean).join(" ")
            || cu.username || email.split("@")[0];
          const tId = teamId();
          const uId = userId();
          const newUser: User = {
            id: uId, email: email.toLowerCase(), passwordHash: "clerk-managed",
            name: displayName, createdAt: Date.now(), teamId: tId, plan: "free",
            role: "owner", emailDomain: email.split("@")[1]?.toLowerCase(),
            eduVerified: email.toLowerCase().endsWith(".edu"),
          };
          await db.teams.create({ id: tId, name: `${displayName.split(" ")[0]}'s team`, ownerId: uId, memberIds: [uId], plan: "free", createdAt: Date.now(), creditBalance: 0 });
          await db.users.create(newUser);
          return newUser;
        }
      }
    } catch { /* Clerk auth failed, fall through to legacy session */ }
  }
  // Path 2: Legacy bcrypt/JWT session (still works for anyone who signed up
  // before Clerk was enabled, or when Clerk keys aren't set)
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

// Login-or-create via OAuth. Email is the join key: if a user exists with
// this email (from any prior signup — email/password OR different OAuth
// provider), log them in. Otherwise create a new account with a random
// unusable password (they'll always sign in via OAuth or reset the
// password to enable email login). Called from OAuth callback routes.
export async function loginOrCreateFromOAuth({ email, name, provider }: { email: string; name: string; provider: string }): Promise<User> {
  const normalizedEmail = email.toLowerCase();
  const existing = await db.users.findByEmail(normalizedEmail);
  if (existing) {
    await setSessionCookie({ sub: existing.id, email: existing.email, teamId: existing.teamId, isAdmin: existing.isAdmin });
    await db.audit.log({ teamId: existing.teamId, actorId: existing.id, action: `user.login.oauth.${provider}`, entity: "user", entityId: existing.id });
    return existing;
  }
  // Create new user
  const tId = teamId();
  const uId = userId();
  // Random unusable password — user can reset to enable email/password login later
  const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  const hash = await hashPassword(randomPassword);
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
    email: normalizedEmail,
    passwordHash: hash,
    name,
    createdAt: Date.now(),
    teamId: tId,
    plan: "free",
    role: "owner",
    emailDomain: normalizedEmail.split("@")[1],
    eduVerified: normalizedEmail.endsWith(".edu"),
  };
  await db.users.create(user);
  await setSessionCookie({ sub: user.id, email: user.email, teamId: tId });
  await db.audit.log({ teamId: tId, actorId: user.id, action: `user.signup.oauth.${provider}`, entity: "user", entityId: user.id });
  return user;
}

export async function logout(): Promise<void> {
  const s = await getSession();
  if (s) await db.audit.log({ teamId: s.teamId, actorId: s.sub, action: "user.logout", entity: "user", entityId: s.sub });
  await clearSessionCookie();
}
