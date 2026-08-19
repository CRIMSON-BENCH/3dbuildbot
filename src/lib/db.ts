// Simple file-backed JSON store for local dev + demo.
// Swap for Supabase / Postgres in prod without changing call sites — every helper is async.
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export type Role = "owner" | "admin" | "approver" | "quoter" | "viewer";
export type OrderStatus = "quoted" | "paid" | "queued" | "in-production" | "post-processing" | "qc" | "shipped" | "delivered" | "cancelled";
export type PlanKey = "free" | "maker" | "pro" | "team" | "business" | "enterprise" | "defense";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: number;
  teamId: string;
  plan: PlanKey;
  role: Role;
  stripeCustomerId?: string;
  isAdmin?: boolean;
  emailDomain?: string;
  eduVerified?: boolean;
  usPersonsVerified?: boolean;
  usPersonsVerifiedAt?: number;
  usPersonsAttestation?: { name: string; ssn4Last?: string; visaClass?: string; attestedAt: number; ip?: string };
  itarOperator?: boolean;
  operatorInitials?: string;
  referralCode?: string;
  referredById?: string;
  referralCreditCents?: number;
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  memberIds: string[];
  plan: PlanKey;
  itarEnabled?: boolean;
  createdAt: number;
  billingEmail?: string;
  creditBalance?: number;
  approvalThresholdCents?: number; // quotes above this need approver sign-off
  costCenters?: string[];
  netTerms?: { status: "none" | "pending" | "approved" | "rejected"; requestedAt?: number; approvedAt?: number; limitCents?: number; days?: 30 | 60 };
  sso?: { provider: "okta" | "azure-ad" | "google-workspace"; entityId?: string; ssoUrl?: string; publicCertPem?: string; enabledAt?: number };
  coupaSharedSecret?: string;
  aribaSharedSecret?: string;
  addresses?: { id: string; label: string; name: string; line1: string; line2?: string; city: string; state: string; zip: string; country: string; isDefault?: boolean }[];
  paymentMethods?: { id: string; brand: string; last4: string; expMonth: number; expYear: number; isDefault?: boolean }[];
}

export interface Part {
  id: string;
  ownerId: string;
  teamId: string;
  name: string;
  filename: string;
  fileSize: number;
  volumeCm3: number;
  bboxMm: { x: number; y: number; z: number };
  triangleCount?: number;
  hash: string;
  tags: string[];
  itarFlagged?: boolean;
  createdAt: number;
  updatedAt: number;
  thumbnailData?: string;
  fileUrl?: string; // Blob URL to the raw CAD, populated at order-commit time
}

export interface Quote {
  id: string;
  ownerId: string;
  teamId: string;
  partId: string;
  process: string;
  material: string;
  finish?: string;
  expedite?: "standard" | "economy" | "rush2" | "rush1" | "weekend";
  quantity: number;
  unitPriceCents: number;
  totalPriceCents: number;
  currency: string;
  leadTimeDays: string;
  expiresAt: number;
  status: "pending" | "approved" | "ordered" | "expired" | "needs-approval";
  createdAt: number;
  dfmSummary?: string;
  dfmIssues?: { level: "info" | "warn" | "error"; text: string }[];
  costDrivers?: { label: string; cents: number; pct: number }[];
  parentQuoteId?: string;
  shareToken?: string;
  batchId?: string;
  poNumber?: string;
  costCenter?: string;
  approvedBy?: string;
  approvedAt?: number;
}

export interface Invite {
  id: string;
  teamId: string;
  email: string;
  role: Role;
  invitedById: string;
  token: string;
  createdAt: number;
  expiresAt: number;
  acceptedAt?: number;
}

export interface Webhook {
  id: string;
  teamId: string;
  url: string;
  events: string[];
  secret: string;
  createdAt: number;
  revokedAt?: number;
  lastFiredAt?: number;
  lastStatusCode?: number;
}

export interface ApiUsageEvent {
  id: string;
  keyId: string;
  teamId: string;
  endpoint: string;
  statusCode: number;
  at: number;
}

export interface Order {
  id: string;
  quoteId: string;
  ownerId: string;
  teamId: string;
  status: OrderStatus;
  totalPaidCents: number;
  currency: string;
  poNumber?: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  shipAddress?: { name: string; line1: string; line2?: string; city: string; state: string; zip: string; country: string };
  itarFlagged?: boolean;
  timeline: { at: number; status: OrderStatus; note?: string; operator?: string }[];
  trackingCarrier?: string;
  trackingNumber?: string;
  expectedShip?: number;
  createdAt: number;
  updatedAt: number;
  traceability?: {
    lotCode: string;
    machineId: string;
    operatorInitials: string;
    usPersonsVerified?: boolean;
    inspectorInitials?: string;
    heatLot?: string;
    supplier?: string;
    countryOfOrigin?: string;
  };
  routing?: { to: "internal" | "partner"; partnerId?: string; assignedAt: number; acceptedAt?: number; rejectedAt?: number; rejectReason?: string; qcPhotos?: string[] };
}

export interface Partner {
  id: string;
  name: string;
  companyName: string;
  contactEmail: string;
  processes: string[];
  region: string;
  active: boolean;
  createdAt: number;
  passwordHash?: string;
  itarEligible?: boolean;
  jobsAcceptedCount?: number;
}

export interface Ticket {
  id: string;
  teamId: string;
  subject: string;
  status: "open" | "waiting-customer" | "resolved";
  messages: { at: number; from: string; body: string }[];
  createdAt: number;
  updatedAt: number;
  orderId?: string;
}

export interface RefundRecord {
  id: string;
  orderId: string;
  teamId: string;
  cents: number;
  reason: string;
  issuedById: string;
  createdAt: number;
}

export interface ContentDoc {
  slug: string;
  kind: "guide" | "case-study" | "blog";
  title: string;
  description: string;
  body: string;
  updatedAt: number;
  updatedById: string;
  published?: boolean;
}

export interface PricingOverride {
  key: string; // e.g. "material:aluminum-6061:costPerCm3" or "process:cnc-machining:minChargeCents"
  value: number;
  updatedAt: number;
  updatedById: string;
}

export interface PromoCode {
  id: string;
  code: string;
  percentOff?: number;
  amountOffCents?: number;
  minSpendCents?: number;
  usesLimit?: number;
  usesCount: number;
  eligiblePlanBefore?: PlanKey[];
  firstOrderOnly?: boolean;
  createdAt: number;
  expiresAt?: number;
  createdBy: string;
  disabledAt?: number;
}

export interface Review {
  id: string;
  teamId: string;
  orderId?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  verifiedOrder: boolean;
  process?: string;
  material?: string;
  createdAt: number;
  publishedAt?: number;
}

export interface Nda {
  id: string;
  quoteId?: string;
  orderId?: string;
  teamId: string;
  text: string;
  createdAt: number;
  signedAt?: number;
  signerName?: string;
  signerEmail?: string;
  signerTitle?: string;
  signerIp?: string;
}

export interface ApiKey {
  id: string;
  ownerId: string;
  teamId: string;
  prefix: string; // e.g. "sk_live_"
  last4: string;
  hash: string;
  name: string;
  scopes: string[];
  createdAt: number;
  lastUsedAt?: number;
  revokedAt?: number;
}

export interface AuditEvent {
  id: string;
  teamId: string;
  actorId: string;
  action: string;
  entity: string;
  entityId?: string;
  detail?: string;
  ip?: string;
  at: number;
}

interface DbShape {
  users: User[];
  teams: Team[];
  parts: Part[];
  quotes: Quote[];
  orders: Order[];
  apiKeys: ApiKey[];
  audit: AuditEvent[];
  invites: Invite[];
  webhooks: Webhook[];
  apiUsage: ApiUsageEvent[];
  ndas: Nda[];
  promos: PromoCode[];
  reviews: Review[];
  partners: Partner[];
  tickets: Ticket[];
  refunds: RefundRecord[];
  content: ContentDoc[];
  pricingOverrides: PricingOverride[];
  meta: { seededAt?: number };
}

const EMPTY: DbShape = { users: [], teams: [], parts: [], quotes: [], orders: [], apiKeys: [], audit: [], invites: [], webhooks: [], apiUsage: [], ndas: [], promos: [], reviews: [], partners: [], tickets: [], refunds: [], content: [], pricingOverrides: [], meta: {} };

let cached: DbShape | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(EMPTY, null, 2), "utf8");
  }
}

async function load(): Promise<DbShape> {
  if (cached) return cached;
  await ensureFile();
  const raw = await fs.readFile(DB_PATH, "utf8");
  try {
    cached = { ...EMPTY, ...JSON.parse(raw) };
    return cached!;
  } catch {
    cached = { ...EMPTY };
    return cached;
  }
}

async function persist(): Promise<void> {
  if (!cached) return;
  const snapshot = JSON.stringify(cached, null, 2);
  writeQueue = writeQueue.then(async () => {
    await ensureFile();
    await fs.writeFile(DB_PATH, snapshot, "utf8");
  });
  await writeQueue;
}

const dbFile = {
  async all(): Promise<DbShape> {
    return await load();
  },
  users: {
    async list() { return (await load()).users; },
    async findById(id: string) { return (await load()).users.find((u) => u.id === id); },
    async findByEmail(email: string) { return (await load()).users.find((u) => u.email.toLowerCase() === email.toLowerCase()); },
    async create(u: User) { const d = await load(); d.users.push(u); await persist(); return u; },
    async update(id: string, patch: Partial<User>) {
      const d = await load();
      const i = d.users.findIndex((u) => u.id === id);
      if (i >= 0) { d.users[i] = { ...d.users[i], ...patch }; await persist(); return d.users[i]; }
      return null;
    },
  },
  teams: {
    async findById(id: string) { return (await load()).teams.find((t) => t.id === id); },
    async create(t: Team) { const d = await load(); d.teams.push(t); await persist(); return t; },
    async update(id: string, patch: Partial<Team>) {
      const d = await load();
      const i = d.teams.findIndex((t) => t.id === id);
      if (i >= 0) { d.teams[i] = { ...d.teams[i], ...patch }; await persist(); return d.teams[i]; }
      return null;
    },
  },
  parts: {
    async listByTeam(teamId: string) { return (await load()).parts.filter((p) => p.teamId === teamId).sort((a, b) => b.updatedAt - a.updatedAt); },
    async findById(id: string) { return (await load()).parts.find((p) => p.id === id); },
    async create(p: Part) { const d = await load(); d.parts.push(p); await persist(); return p; },
    async update(id: string, patch: Partial<Part>) {
      const d = await load();
      const i = d.parts.findIndex((p) => p.id === id);
      if (i >= 0) { d.parts[i] = { ...d.parts[i], ...patch, updatedAt: Date.now() }; await persist(); return d.parts[i]; }
      return null;
    },
    async delete(id: string) {
      const d = await load();
      const before = d.parts.length;
      d.parts = d.parts.filter((p) => p.id !== id);
      if (d.parts.length !== before) await persist();
    },
  },
  quotes: {
    async listByTeam(teamId: string) { return (await load()).quotes.filter((q) => q.teamId === teamId).sort((a, b) => b.createdAt - a.createdAt); },
    async findById(id: string) { return (await load()).quotes.find((q) => q.id === id); },
    async create(q: Quote) { const d = await load(); d.quotes.push(q); await persist(); return q; },
    async update(id: string, patch: Partial<Quote>) {
      const d = await load();
      const i = d.quotes.findIndex((q) => q.id === id);
      if (i >= 0) { d.quotes[i] = { ...d.quotes[i], ...patch }; await persist(); return d.quotes[i]; }
      return null;
    },
  },
  orders: {
    async listByTeam(teamId: string) { return (await load()).orders.filter((o) => o.teamId === teamId).sort((a, b) => b.createdAt - a.createdAt); },
    async listAll() { return (await load()).orders.sort((a, b) => b.createdAt - a.createdAt); },
    async findById(id: string) { return (await load()).orders.find((o) => o.id === id); },
    async create(o: Order) { const d = await load(); d.orders.push(o); await persist(); return o; },
    async update(id: string, patch: Partial<Order>) {
      const d = await load();
      const i = d.orders.findIndex((o) => o.id === id);
      if (i >= 0) { d.orders[i] = { ...d.orders[i], ...patch, updatedAt: Date.now() }; await persist(); return d.orders[i]; }
      return null;
    },
    async appendTimeline(id: string, status: OrderStatus, note?: string, operator?: string) {
      const d = await load();
      const o = d.orders.find((x) => x.id === id);
      if (!o) return null;
      o.timeline.push({ at: Date.now(), status, note, operator });
      o.status = status;
      o.updatedAt = Date.now();
      await persist();
      return o;
    },
  },
  apiKeys: {
    async listByTeam(teamId: string) { return (await load()).apiKeys.filter((k) => k.teamId === teamId && !k.revokedAt); },
    async findByHash(hash: string) { return (await load()).apiKeys.find((k) => k.hash === hash && !k.revokedAt); },
    async create(k: ApiKey) { const d = await load(); d.apiKeys.push(k); await persist(); return k; },
    async revoke(id: string) {
      const d = await load();
      const k = d.apiKeys.find((x) => x.id === id);
      if (k) { k.revokedAt = Date.now(); await persist(); }
    },
  },
  audit: {
    async list(teamId: string, limit = 200) {
      return (await load()).audit.filter((a) => a.teamId === teamId).sort((a, b) => b.at - a.at).slice(0, limit);
    },
    async log(ev: Omit<AuditEvent, "id" | "at"> & { at?: number }) {
      const d = await load();
      d.audit.push({ ...ev, id: `evt_${Math.random().toString(36).slice(2, 12)}`, at: ev.at ?? Date.now() });
      if (d.audit.length > 5000) d.audit = d.audit.slice(-5000);
      await persist();
    },
  },
  invites: {
    async listByTeam(teamId: string) { return (await load()).invites.filter((i) => i.teamId === teamId && !i.acceptedAt); },
    async findByToken(token: string) { return (await load()).invites.find((i) => i.token === token); },
    async create(inv: Invite) { const d = await load(); d.invites.push(inv); await persist(); return inv; },
    async accept(token: string) {
      const d = await load();
      const i = d.invites.find((x) => x.token === token);
      if (!i) return null;
      i.acceptedAt = Date.now();
      await persist();
      return i;
    },
    async revoke(id: string) {
      const d = await load();
      d.invites = d.invites.filter((i) => i.id !== id);
      await persist();
    },
  },
  webhooks: {
    async listByTeam(teamId: string) { return (await load()).webhooks.filter((w) => w.teamId === teamId && !w.revokedAt); },
    async create(w: Webhook) { const d = await load(); d.webhooks.push(w); await persist(); return w; },
    async revoke(id: string) {
      const d = await load();
      const w = d.webhooks.find((x) => x.id === id);
      if (w) { w.revokedAt = Date.now(); await persist(); }
    },
    async recordFire(id: string, code: number) {
      const d = await load();
      const w = d.webhooks.find((x) => x.id === id);
      if (w) { w.lastFiredAt = Date.now(); w.lastStatusCode = code; await persist(); }
    },
  },
  promos: {
    async list() { return (await load()).promos.filter((p) => !p.disabledAt); },
    async findByCode(code: string) { return (await load()).promos.find((p) => p.code.toUpperCase() === code.toUpperCase() && !p.disabledAt); },
    async create(p: PromoCode) { const d = await load(); d.promos.push(p); await persist(); return p; },
    async incrementUse(id: string) {
      const d = await load();
      const p = d.promos.find((x) => x.id === id);
      if (p) { p.usesCount = (p.usesCount || 0) + 1; await persist(); }
    },
    async disable(id: string) {
      const d = await load();
      const p = d.promos.find((x) => x.id === id);
      if (p) { p.disabledAt = Date.now(); await persist(); }
    },
  },
  reviews: {
    async listPublished() { return (await load()).reviews.filter((r) => r.publishedAt).sort((a, b) => b.createdAt - a.createdAt); },
    async listByTeam(teamId: string) { return (await load()).reviews.filter((r) => r.teamId === teamId).sort((a, b) => b.createdAt - a.createdAt); },
    async create(r: Review) { const d = await load(); d.reviews.push(r); await persist(); return r; },
    async publish(id: string) {
      const d = await load();
      const r = d.reviews.find((x) => x.id === id);
      if (r) { r.publishedAt = Date.now(); await persist(); }
    },
  },
  partners: {
    async list() { return (await load()).partners; },
    async findById(id: string) { return (await load()).partners.find((p) => p.id === id); },
    async create(p: Partner) { const d = await load(); d.partners.push(p); await persist(); return p; },
    async update(id: string, patch: Partial<Partner>) {
      const d = await load();
      const i = d.partners.findIndex((p) => p.id === id);
      if (i >= 0) { d.partners[i] = { ...d.partners[i], ...patch }; await persist(); return d.partners[i]; }
      return null;
    },
  },
  tickets: {
    async list() { return (await load()).tickets.sort((a, b) => b.updatedAt - a.updatedAt); },
    async listByTeam(teamId: string) { return (await load()).tickets.filter((t) => t.teamId === teamId).sort((a, b) => b.updatedAt - a.updatedAt); },
    async findById(id: string) { return (await load()).tickets.find((t) => t.id === id); },
    async create(t: Ticket) { const d = await load(); d.tickets.push(t); await persist(); return t; },
    async reply(id: string, from: string, body: string, status?: Ticket["status"]) {
      const d = await load();
      const t = d.tickets.find((x) => x.id === id);
      if (!t) return null;
      t.messages.push({ at: Date.now(), from, body });
      t.updatedAt = Date.now();
      if (status) t.status = status;
      await persist();
      return t;
    },
  },
  refunds: {
    async list() { return (await load()).refunds.sort((a, b) => b.createdAt - a.createdAt); },
    async listByTeam(teamId: string) { return (await load()).refunds.filter((r) => r.teamId === teamId); },
    async create(r: RefundRecord) { const d = await load(); d.refunds.push(r); await persist(); return r; },
  },
  content: {
    async list() { return (await load()).content; },
    async findBySlug(slug: string) { return (await load()).content.find((c) => c.slug === slug); },
    async upsert(c: ContentDoc) {
      const d = await load();
      const idx = d.content.findIndex((x) => x.slug === c.slug);
      if (idx >= 0) d.content[idx] = c; else d.content.push(c);
      await persist();
      return c;
    },
    async delete(slug: string) {
      const d = await load();
      d.content = d.content.filter((c) => c.slug !== slug);
      await persist();
    },
  },
  pricingOverrides: {
    async list() { return (await load()).pricingOverrides; },
    async upsert(o: PricingOverride) {
      const d = await load();
      const idx = d.pricingOverrides.findIndex((x) => x.key === o.key);
      if (idx >= 0) d.pricingOverrides[idx] = o; else d.pricingOverrides.push(o);
      await persist();
      return o;
    },
    async delete(key: string) {
      const d = await load();
      d.pricingOverrides = d.pricingOverrides.filter((o) => o.key !== key);
      await persist();
    },
  },
  ndas: {
    async findById(id: string) { return (await load()).ndas.find((n) => n.id === id); },
    async listByTeam(teamId: string) { return (await load()).ndas.filter((n) => n.teamId === teamId).sort((a, b) => b.createdAt - a.createdAt); },
    async create(n: Nda) { const d = await load(); d.ndas.push(n); await persist(); return n; },
    async sign(id: string, signer: { name: string; email: string; title?: string; ip?: string }) {
      const d = await load();
      const n = d.ndas.find((x) => x.id === id);
      if (!n) return null;
      n.signedAt = Date.now(); n.signerName = signer.name; n.signerEmail = signer.email; n.signerTitle = signer.title; n.signerIp = signer.ip;
      await persist();
      return n;
    },
  },
  apiUsage: {
    async record(ev: Omit<ApiUsageEvent, "id" | "at"> & { at?: number }) {
      const d = await load();
      d.apiUsage.push({ ...ev, id: `au_${Math.random().toString(36).slice(2, 12)}`, at: ev.at ?? Date.now() });
      if (d.apiUsage.length > 20000) d.apiUsage = d.apiUsage.slice(-20000);
      await persist();
    },
    async statsByKey(keyId: string, windowMs = 24 * 60 * 60 * 1000) {
      const since = Date.now() - windowMs;
      const events = (await load()).apiUsage.filter((e) => e.keyId === keyId && e.at >= since);
      return { total: events.length, success: events.filter((e) => e.statusCode < 400).length, errors: events.filter((e) => e.statusCode >= 400).length };
    },
    async statsByTeam(teamId: string, windowMs = 24 * 60 * 60 * 1000) {
      const since = Date.now() - windowMs;
      return (await load()).apiUsage.filter((e) => e.teamId === teamId && e.at >= since);
    },
  },
};

// Runtime adapter switch — Postgres when any of the standard Postgres env vars is set,
// file-backed otherwise. Handles Vercel Postgres, Neon integration, or self-hosted.
const HAS_POSTGRES = !!(process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL);

async function loadDb() {
  if (HAS_POSTGRES) {
    const mod = await import("./db-postgres");
    return mod.dbPostgres as unknown as typeof dbFile;
  }
  return dbFile;
}

// Eager-resolve at module load. Downstream call sites remain `db.users.list()` etc.
export const db: typeof dbFile = HAS_POSTGRES
  ? (require("./db-postgres").dbPostgres as unknown as typeof dbFile)
  : dbFile;

export { loadDb };
