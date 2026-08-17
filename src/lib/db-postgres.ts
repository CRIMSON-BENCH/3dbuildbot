// Vercel Postgres adapter — matches the exact API surface of the file-backed db in db.ts.
// Enable by setting `POSTGRES_URL` env var; `db.ts` auto-detects and swaps.

import type { User, Team, Part, Quote, Order, ApiKey, AuditEvent, Invite, Webhook, ApiUsageEvent, Nda, PromoCode, Review, Partner, Ticket, RefundRecord, ContentDoc, PricingOverride, OrderStatus } from "./db";

// Lazy client so build works without any Postgres env set.
// @vercel/postgres reads POSTGRES_URL by default; if only DATABASE_URL exists
// (e.g. Neon integration in some Vercel projects), we alias it before init.
async function sql() {
  if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
    process.env.POSTGRES_URL = process.env.DATABASE_URL;
  }
  const { sql } = await import("@vercel/postgres");
  return sql;
}

const j = (v: unknown) => JSON.stringify(v);
const p = <T>(v: unknown): T => (typeof v === "string" ? JSON.parse(v) : v) as T;

export const dbPostgres = {
  async all() {
    const [users, teams, parts, quotes, orders, apiKeys, audit, invites, webhooks, apiUsage, ndas, promos, reviews, partners, tickets, refunds, content, pricingOverrides] = await Promise.all([
      this.users.list(), this.teams.listAll(), this.parts.listAll(), this.quotes.listAll(), this.orders.listAll(), this.apiKeys.listAll(),
      this.audit.listAll(), this.invites.listAll(), this.webhooks.listAll(), this.apiUsage.listAll(), this.ndas.listAll(), this.promos.list(),
      this.reviews.listAll(), this.partners.list(), this.tickets.list(), this.refunds.list(), this.content.list(), this.pricingOverrides.list(),
    ]);
    return { users, teams, parts, quotes, orders, apiKeys, audit, invites, webhooks, apiUsage, ndas, promos, reviews, partners, tickets, refunds, content, pricingOverrides, meta: {} };
  },
  users: {
    async list(): Promise<User[]> { const q = await sql(); const r = await q`select * from users`; return r.rows.map(toUser); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from users where id = ${id} limit 1`; return r.rows[0] ? toUser(r.rows[0]) : undefined; },
    async findByEmail(email: string) { const q = await sql(); const r = await q`select * from users where email = ${email.toLowerCase()} limit 1`; return r.rows[0] ? toUser(r.rows[0]) : undefined; },
    async create(u: User) {
      const q = await sql();
      await q`insert into users (id, email, password_hash, name, team_id, plan, role, stripe_customer_id, is_admin, email_domain, edu_verified, us_persons_verified, us_persons_verified_at, us_persons_attestation, itar_operator, operator_initials, referral_code, referred_by_id, referral_credit_cents, created_at)
        values (${u.id}, ${u.email}, ${u.passwordHash}, ${u.name}, ${u.teamId}, ${u.plan}, ${u.role}, ${u.stripeCustomerId ?? null}, ${u.isAdmin ?? false}, ${u.emailDomain ?? null}, ${u.eduVerified ?? false}, ${u.usPersonsVerified ?? false}, ${u.usPersonsVerifiedAt ?? null}, ${u.usPersonsAttestation ? j(u.usPersonsAttestation) : null}, ${u.itarOperator ?? false}, ${u.operatorInitials ?? null}, ${u.referralCode ?? null}, ${u.referredById ?? null}, ${u.referralCreditCents ?? 0}, ${u.createdAt})`;
      return u;
    },
    async update(id: string, patch: Partial<User>) {
      const cur = await this.findById(id);
      if (!cur) return null;
      const m = { ...cur, ...patch } as User;
      const q = await sql();
      await q`update users set email=${m.email}, name=${m.name}, team_id=${m.teamId}, plan=${m.plan}, role=${m.role}, stripe_customer_id=${m.stripeCustomerId ?? null}, is_admin=${m.isAdmin ?? false}, edu_verified=${m.eduVerified ?? false}, us_persons_verified=${m.usPersonsVerified ?? false}, us_persons_verified_at=${m.usPersonsVerifiedAt ?? null}, us_persons_attestation=${m.usPersonsAttestation ? j(m.usPersonsAttestation) : null}, referral_code=${m.referralCode ?? null}, referred_by_id=${m.referredById ?? null}, referral_credit_cents=${m.referralCreditCents ?? 0} where id = ${id}`;
      return m;
    },
  },
  teams: {
    async listAll(): Promise<Team[]> { const q = await sql(); const r = await q`select * from teams`; return r.rows.map(toTeam); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from teams where id = ${id} limit 1`; return r.rows[0] ? toTeam(r.rows[0]) : undefined; },
    async create(t: Team) {
      const q = await sql();
      await q`insert into teams (id, name, owner_id, member_ids, plan, itar_enabled, billing_email, credit_balance, approval_threshold_cents, cost_centers, net_terms, sso, coupa_shared_secret, ariba_shared_secret, addresses, payment_methods, created_at)
        values (${t.id}, ${t.name}, ${t.ownerId}, ${j(t.memberIds)}, ${t.plan}, ${t.itarEnabled ?? false}, ${t.billingEmail ?? null}, ${t.creditBalance ?? 0}, ${t.approvalThresholdCents ?? null}, ${j(t.costCenters ?? [])}, ${t.netTerms ? j(t.netTerms) : null}, ${t.sso ? j(t.sso) : null}, ${t.coupaSharedSecret ?? null}, ${t.aribaSharedSecret ?? null}, ${j(t.addresses ?? [])}, ${j(t.paymentMethods ?? [])}, ${t.createdAt})`;
      return t;
    },
    async update(id: string, patch: Partial<Team>) {
      const cur = await this.findById(id);
      if (!cur) return null;
      const m = { ...cur, ...patch } as Team;
      const q = await sql();
      await q`update teams set name=${m.name}, member_ids=${j(m.memberIds)}, plan=${m.plan}, itar_enabled=${m.itarEnabled ?? false}, billing_email=${m.billingEmail ?? null}, credit_balance=${m.creditBalance ?? 0}, approval_threshold_cents=${m.approvalThresholdCents ?? null}, cost_centers=${j(m.costCenters ?? [])}, net_terms=${m.netTerms ? j(m.netTerms) : null}, sso=${m.sso ? j(m.sso) : null}, coupa_shared_secret=${m.coupaSharedSecret ?? null}, ariba_shared_secret=${m.aribaSharedSecret ?? null}, addresses=${j(m.addresses ?? [])}, payment_methods=${j(m.paymentMethods ?? [])} where id = ${id}`;
      return m;
    },
  },
  parts: {
    async listAll(): Promise<Part[]> { const q = await sql(); const r = await q`select * from parts order by updated_at desc`; return r.rows.map(toPart); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from parts where team_id = ${teamId} order by updated_at desc`; return r.rows.map(toPart); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from parts where id = ${id} limit 1`; return r.rows[0] ? toPart(r.rows[0]) : undefined; },
    async create(p: Part) {
      const q = await sql();
      await q`insert into parts (id, owner_id, team_id, name, filename, file_size, volume_cm3, bbox_mm, triangle_count, hash, tags, itar_flagged, thumbnail_data, created_at, updated_at)
        values (${p.id}, ${p.ownerId}, ${p.teamId}, ${p.name}, ${p.filename}, ${p.fileSize}, ${p.volumeCm3}, ${j(p.bboxMm)}, ${p.triangleCount ?? null}, ${p.hash}, ${j(p.tags)}, ${p.itarFlagged ?? false}, ${p.thumbnailData ?? null}, ${p.createdAt}, ${p.updatedAt})`;
      return p;
    },
    async update(id: string, patch: Partial<Part>) {
      const cur = await this.findById(id);
      if (!cur) return null;
      const m = { ...cur, ...patch, updatedAt: Date.now() } as Part;
      const q = await sql();
      await q`update parts set name=${m.name}, tags=${j(m.tags)}, itar_flagged=${m.itarFlagged ?? false}, updated_at=${m.updatedAt} where id = ${id}`;
      return m;
    },
    async delete(id: string) { const q = await sql(); await q`delete from parts where id = ${id}`; },
  },
  quotes: {
    async listAll(): Promise<Quote[]> { const q = await sql(); const r = await q`select * from quotes order by created_at desc`; return r.rows.map(toQuote); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from quotes where team_id = ${teamId} order by created_at desc`; return r.rows.map(toQuote); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from quotes where id = ${id} limit 1`; return r.rows[0] ? toQuote(r.rows[0]) : undefined; },
    async create(u: Quote) {
      const q = await sql();
      await q`insert into quotes (id, owner_id, team_id, part_id, process, material, finish, expedite, quantity, unit_price_cents, total_price_cents, currency, lead_time_days, expires_at, status, dfm_summary, dfm_issues, cost_drivers, parent_quote_id, share_token, batch_id, po_number, cost_center, approved_by, approved_at, created_at)
        values (${u.id}, ${u.ownerId}, ${u.teamId}, ${u.partId ?? null}, ${u.process}, ${u.material}, ${u.finish ?? null}, ${u.expedite ?? null}, ${u.quantity}, ${u.unitPriceCents}, ${u.totalPriceCents}, ${u.currency}, ${u.leadTimeDays}, ${u.expiresAt}, ${u.status}, ${u.dfmSummary ?? null}, ${u.dfmIssues ? j(u.dfmIssues) : null}, ${u.costDrivers ? j(u.costDrivers) : null}, ${u.parentQuoteId ?? null}, ${u.shareToken ?? null}, ${u.batchId ?? null}, ${u.poNumber ?? null}, ${u.costCenter ?? null}, ${u.approvedBy ?? null}, ${u.approvedAt ?? null}, ${u.createdAt})`;
      return u;
    },
    async update(id: string, patch: Partial<Quote>) {
      const cur = await this.findById(id);
      if (!cur) return null;
      const m = { ...cur, ...patch } as Quote;
      const q = await sql();
      await q`update quotes set status=${m.status}, share_token=${m.shareToken ?? null}, unit_price_cents=${m.unitPriceCents}, total_price_cents=${m.totalPriceCents}, lead_time_days=${m.leadTimeDays}, approved_by=${m.approvedBy ?? null}, approved_at=${m.approvedAt ?? null}, po_number=${m.poNumber ?? null} where id = ${id}`;
      return m;
    },
  },
  orders: {
    async listAll(): Promise<Order[]> { const q = await sql(); const r = await q`select * from orders order by created_at desc`; return r.rows.map(toOrder); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from orders where team_id = ${teamId} order by created_at desc`; return r.rows.map(toOrder); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from orders where id = ${id} limit 1`; return r.rows[0] ? toOrder(r.rows[0]) : undefined; },
    async create(o: Order) {
      const q = await sql();
      await q`insert into orders (id, quote_id, owner_id, team_id, status, total_paid_cents, currency, po_number, stripe_session_id, stripe_payment_intent_id, ship_address, itar_flagged, timeline, tracking_carrier, tracking_number, expected_ship, traceability, routing, created_at, updated_at)
        values (${o.id}, ${o.quoteId}, ${o.ownerId}, ${o.teamId}, ${o.status}, ${o.totalPaidCents}, ${o.currency}, ${o.poNumber ?? null}, ${o.stripeSessionId ?? null}, ${o.stripePaymentIntentId ?? null}, ${o.shipAddress ? j(o.shipAddress) : null}, ${o.itarFlagged ?? false}, ${j(o.timeline)}, ${o.trackingCarrier ?? null}, ${o.trackingNumber ?? null}, ${o.expectedShip ?? null}, ${o.traceability ? j(o.traceability) : null}, ${o.routing ? j(o.routing) : null}, ${o.createdAt}, ${o.updatedAt})`;
      return o;
    },
    async update(id: string, patch: Partial<Order>) {
      const cur = await this.findById(id);
      if (!cur) return null;
      const m = { ...cur, ...patch, updatedAt: Date.now() } as Order;
      const q = await sql();
      await q`update orders set status=${m.status}, total_paid_cents=${m.totalPaidCents}, timeline=${j(m.timeline)}, tracking_carrier=${m.trackingCarrier ?? null}, tracking_number=${m.trackingNumber ?? null}, traceability=${m.traceability ? j(m.traceability) : null}, routing=${m.routing ? j(m.routing) : null}, updated_at=${m.updatedAt} where id = ${id}`;
      return m;
    },
    async appendTimeline(id: string, status: OrderStatus, note?: string, operator?: string) {
      const cur = await this.findById(id);
      if (!cur) return null;
      cur.timeline.push({ at: Date.now(), status, note, operator });
      cur.status = status;
      cur.updatedAt = Date.now();
      const q = await sql();
      await q`update orders set status=${status}, timeline=${j(cur.timeline)}, updated_at=${cur.updatedAt} where id = ${id}`;
      return cur;
    },
  },
  apiKeys: {
    async listAll(): Promise<ApiKey[]> { const q = await sql(); const r = await q`select * from api_keys where revoked_at is null`; return r.rows.map(toApiKey); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from api_keys where team_id = ${teamId} and revoked_at is null`; return r.rows.map(toApiKey); },
    async findByHash(hash: string) { const q = await sql(); const r = await q`select * from api_keys where hash = ${hash} and revoked_at is null limit 1`; return r.rows[0] ? toApiKey(r.rows[0]) : undefined; },
    async create(k: ApiKey) {
      const q = await sql();
      await q`insert into api_keys (id, owner_id, team_id, prefix, last4, hash, name, scopes, last_used_at, created_at) values (${k.id}, ${k.ownerId}, ${k.teamId}, ${k.prefix}, ${k.last4}, ${k.hash}, ${k.name}, ${j(k.scopes)}, ${k.lastUsedAt ?? null}, ${k.createdAt})`;
      return k;
    },
    async revoke(id: string) { const q = await sql(); await q`update api_keys set revoked_at = ${Date.now()} where id = ${id}`; },
  },
  audit: {
    async listAll(): Promise<AuditEvent[]> { const q = await sql(); const r = await q`select * from audit_events order by at desc limit 5000`; return r.rows.map(toAudit); },
    async list(teamId: string, limit = 200) { const q = await sql(); const r = await q`select * from audit_events where team_id = ${teamId} order by at desc limit ${limit}`; return r.rows.map(toAudit); },
    async log(ev: Omit<AuditEvent, "id" | "at"> & { at?: number }) {
      const q = await sql();
      const id = `evt_${Math.random().toString(36).slice(2, 12)}`;
      const at = ev.at ?? Date.now();
      await q`insert into audit_events (id, team_id, actor_id, action, entity, entity_id, detail, ip, at) values (${id}, ${ev.teamId}, ${ev.actorId}, ${ev.action}, ${ev.entity}, ${ev.entityId ?? null}, ${ev.detail ?? null}, ${ev.ip ?? null}, ${at})`;
    },
  },
  invites: {
    async listAll(): Promise<Invite[]> { const q = await sql(); const r = await q`select * from invites where accepted_at is null`; return r.rows.map(toInvite); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from invites where team_id = ${teamId} and accepted_at is null`; return r.rows.map(toInvite); },
    async findByToken(token: string) { const q = await sql(); const r = await q`select * from invites where token = ${token} limit 1`; return r.rows[0] ? toInvite(r.rows[0]) : undefined; },
    async create(inv: Invite) { const q = await sql(); await q`insert into invites (id, team_id, email, role, invited_by_id, token, accepted_at, created_at, expires_at) values (${inv.id}, ${inv.teamId}, ${inv.email}, ${inv.role}, ${inv.invitedById}, ${inv.token}, ${inv.acceptedAt ?? null}, ${inv.createdAt}, ${inv.expiresAt})`; return inv; },
    async accept(token: string) { const q = await sql(); const at = Date.now(); await q`update invites set accepted_at = ${at} where token = ${token}`; const r = await q`select * from invites where token = ${token} limit 1`; return r.rows[0] ? toInvite(r.rows[0]) : null; },
    async revoke(id: string) { const q = await sql(); await q`delete from invites where id = ${id}`; },
  },
  webhooks: {
    async listAll(): Promise<Webhook[]> { const q = await sql(); const r = await q`select * from webhooks where revoked_at is null`; return r.rows.map(toWebhook); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from webhooks where team_id = ${teamId} and revoked_at is null`; return r.rows.map(toWebhook); },
    async create(w: Webhook) { const q = await sql(); await q`insert into webhooks (id, team_id, url, events, secret, created_at) values (${w.id}, ${w.teamId}, ${w.url}, ${j(w.events)}, ${w.secret}, ${w.createdAt})`; return w; },
    async revoke(id: string) { const q = await sql(); await q`update webhooks set revoked_at = ${Date.now()} where id = ${id}`; },
    async recordFire(id: string, code: number) { const q = await sql(); await q`update webhooks set last_fired_at = ${Date.now()}, last_status_code = ${code} where id = ${id}`; },
  },
  apiUsage: {
    async listAll(): Promise<ApiUsageEvent[]> { const q = await sql(); const r = await q`select * from api_usage order by at desc limit 20000`; return r.rows.map(toUsage); },
    async record(ev: Omit<ApiUsageEvent, "id" | "at"> & { at?: number }) { const q = await sql(); const id = `au_${Math.random().toString(36).slice(2, 12)}`; await q`insert into api_usage (id, key_id, team_id, endpoint, status_code, at) values (${id}, ${ev.keyId}, ${ev.teamId}, ${ev.endpoint}, ${ev.statusCode}, ${ev.at ?? Date.now()})`; },
    async statsByKey(keyId: string, windowMs = 86400000) { const q = await sql(); const since = Date.now() - windowMs; const r = await q`select status_code from api_usage where key_id = ${keyId} and at >= ${since}`; const total = r.rows.length; const success = r.rows.filter((x) => (x.status_code as number) < 400).length; return { total, success, errors: total - success }; },
    async statsByTeam(teamId: string, windowMs = 86400000) { const q = await sql(); const since = Date.now() - windowMs; const r = await q`select * from api_usage where team_id = ${teamId} and at >= ${since}`; return r.rows.map(toUsage); },
  },
  ndas: {
    async listAll(): Promise<Nda[]> { const q = await sql(); const r = await q`select * from ndas`; return r.rows.map(toNda); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from ndas where id = ${id} limit 1`; return r.rows[0] ? toNda(r.rows[0]) : undefined; },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from ndas where team_id = ${teamId}`; return r.rows.map(toNda); },
    async create(n: Nda) { const q = await sql(); await q`insert into ndas (id, quote_id, order_id, team_id, text, signed_at, signer_name, signer_email, signer_title, signer_ip, created_at) values (${n.id}, ${n.quoteId ?? null}, ${n.orderId ?? null}, ${n.teamId}, ${n.text}, ${n.signedAt ?? null}, ${n.signerName ?? null}, ${n.signerEmail ?? null}, ${n.signerTitle ?? null}, ${n.signerIp ?? null}, ${n.createdAt})`; return n; },
    async sign(id: string, signer: { name: string; email: string; title?: string; ip?: string }) {
      const q = await sql();
      const at = Date.now();
      await q`update ndas set signed_at=${at}, signer_name=${signer.name}, signer_email=${signer.email}, signer_title=${signer.title ?? null}, signer_ip=${signer.ip ?? null} where id = ${id}`;
      const r = await q`select * from ndas where id = ${id} limit 1`;
      return r.rows[0] ? toNda(r.rows[0]) : null;
    },
  },
  promos: {
    async list(): Promise<PromoCode[]> { const q = await sql(); const r = await q`select * from promos where disabled_at is null`; return r.rows.map(toPromo); },
    async findByCode(code: string) { const q = await sql(); const r = await q`select * from promos where upper(code) = upper(${code}) and disabled_at is null limit 1`; return r.rows[0] ? toPromo(r.rows[0]) : undefined; },
    async create(p: PromoCode) { const q = await sql(); await q`insert into promos (id, code, percent_off, amount_off_cents, min_spend_cents, uses_limit, uses_count, eligible_plan_before, first_order_only, expires_at, disabled_at, created_by, created_at) values (${p.id}, ${p.code}, ${p.percentOff ?? null}, ${p.amountOffCents ?? null}, ${p.minSpendCents ?? null}, ${p.usesLimit ?? null}, ${p.usesCount}, ${p.eligiblePlanBefore ? j(p.eligiblePlanBefore) : null}, ${p.firstOrderOnly ?? false}, ${p.expiresAt ?? null}, ${p.disabledAt ?? null}, ${p.createdBy}, ${p.createdAt})`; return p; },
    async incrementUse(id: string) { const q = await sql(); await q`update promos set uses_count = uses_count + 1 where id = ${id}`; },
    async disable(id: string) { const q = await sql(); await q`update promos set disabled_at = ${Date.now()} where id = ${id}`; },
  },
  reviews: {
    async listAll(): Promise<Review[]> { const q = await sql(); const r = await q`select * from reviews order by created_at desc`; return r.rows.map(toReview); },
    async listPublished() { const q = await sql(); const r = await q`select * from reviews where published_at is not null order by created_at desc`; return r.rows.map(toReview); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from reviews where team_id = ${teamId} order by created_at desc`; return r.rows.map(toReview); },
    async create(rv: Review) { const q = await sql(); await q`insert into reviews (id, team_id, order_id, rating, title, body, author_name, author_role, author_company, verified_order, process, material, published_at, created_at) values (${rv.id}, ${rv.teamId}, ${rv.orderId ?? null}, ${rv.rating}, ${rv.title}, ${rv.body}, ${rv.authorName}, ${rv.authorRole ?? null}, ${rv.authorCompany ?? null}, ${rv.verifiedOrder}, ${rv.process ?? null}, ${rv.material ?? null}, ${rv.publishedAt ?? null}, ${rv.createdAt})`; return rv; },
    async publish(id: string) { const q = await sql(); await q`update reviews set published_at = ${Date.now()} where id = ${id}`; },
  },
  partners: {
    async list(): Promise<Partner[]> { const q = await sql(); const r = await q`select * from partners`; return r.rows.map(toPartner); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from partners where id = ${id} limit 1`; return r.rows[0] ? toPartner(r.rows[0]) : undefined; },
    async create(p: Partner) { const q = await sql(); await q`insert into partners (id, name, company_name, contact_email, processes, region, active, password_hash, itar_eligible, jobs_accepted_count, created_at) values (${p.id}, ${p.name}, ${p.companyName}, ${p.contactEmail.toLowerCase()}, ${j(p.processes)}, ${p.region}, ${p.active}, ${p.passwordHash ?? null}, ${p.itarEligible ?? false}, ${p.jobsAcceptedCount ?? 0}, ${p.createdAt})`; return p; },
    async update(id: string, patch: Partial<Partner>) { const cur = await this.findById(id); if (!cur) return null; const m = { ...cur, ...patch } as Partner; const q = await sql(); await q`update partners set active=${m.active}, jobs_accepted_count=${m.jobsAcceptedCount ?? 0} where id = ${id}`; return m; },
  },
  tickets: {
    async list(): Promise<Ticket[]> { const q = await sql(); const r = await q`select * from tickets order by updated_at desc`; return r.rows.map(toTicket); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from tickets where team_id = ${teamId} order by updated_at desc`; return r.rows.map(toTicket); },
    async findById(id: string) { const q = await sql(); const r = await q`select * from tickets where id = ${id} limit 1`; return r.rows[0] ? toTicket(r.rows[0]) : undefined; },
    async create(t: Ticket) { const q = await sql(); await q`insert into tickets (id, team_id, subject, status, messages, order_id, created_at, updated_at) values (${t.id}, ${t.teamId}, ${t.subject}, ${t.status}, ${j(t.messages)}, ${t.orderId ?? null}, ${t.createdAt}, ${t.updatedAt})`; return t; },
    async reply(id: string, from: string, body: string, status?: Ticket["status"]) {
      const cur = await this.findById(id);
      if (!cur) return null;
      cur.messages.push({ at: Date.now(), from, body });
      cur.updatedAt = Date.now();
      if (status) cur.status = status;
      const q = await sql();
      await q`update tickets set messages=${j(cur.messages)}, status=${cur.status}, updated_at=${cur.updatedAt} where id = ${id}`;
      return cur;
    },
  },
  refunds: {
    async list(): Promise<RefundRecord[]> { const q = await sql(); const r = await q`select * from refunds order by created_at desc`; return r.rows.map(toRefund); },
    async listByTeam(teamId: string) { const q = await sql(); const r = await q`select * from refunds where team_id = ${teamId} order by created_at desc`; return r.rows.map(toRefund); },
    async create(rf: RefundRecord) { const q = await sql(); await q`insert into refunds (id, order_id, team_id, cents, reason, issued_by_id, created_at) values (${rf.id}, ${rf.orderId}, ${rf.teamId}, ${rf.cents}, ${rf.reason}, ${rf.issuedById}, ${rf.createdAt})`; return rf; },
  },
  content: {
    async list(): Promise<ContentDoc[]> { const q = await sql(); const r = await q`select * from content order by updated_at desc`; return r.rows.map(toContent); },
    async findBySlug(slug: string) { const q = await sql(); const r = await q`select * from content where slug = ${slug} limit 1`; return r.rows[0] ? toContent(r.rows[0]) : undefined; },
    async upsert(c: ContentDoc) { const q = await sql(); await q`insert into content (slug, kind, title, description, body, published, updated_by_id, updated_at) values (${c.slug}, ${c.kind}, ${c.title}, ${c.description}, ${c.body}, ${c.published ?? false}, ${c.updatedById}, ${c.updatedAt}) on conflict (slug) do update set kind=excluded.kind, title=excluded.title, description=excluded.description, body=excluded.body, published=excluded.published, updated_by_id=excluded.updated_by_id, updated_at=excluded.updated_at`; return c; },
    async delete(slug: string) { const q = await sql(); await q`delete from content where slug = ${slug}`; },
  },
  pricingOverrides: {
    async list(): Promise<PricingOverride[]> { const q = await sql(); const r = await q`select * from pricing_overrides`; return r.rows.map(toPricingOverride); },
    async upsert(o: PricingOverride) { const q = await sql(); await q`insert into pricing_overrides (key, value, updated_by_id, updated_at) values (${o.key}, ${o.value}, ${o.updatedById}, ${o.updatedAt}) on conflict (key) do update set value=excluded.value, updated_by_id=excluded.updated_by_id, updated_at=excluded.updated_at`; return o; },
    async delete(key: string) { const q = await sql(); await q`delete from pricing_overrides where key = ${key}`; },
  },
};

// Row → typed object mappers
function toUser(r: Record<string, unknown>): User { return { id: r.id as string, email: r.email as string, passwordHash: r.password_hash as string, name: r.name as string, teamId: r.team_id as string, plan: r.plan as User["plan"], role: r.role as User["role"], stripeCustomerId: r.stripe_customer_id as string | undefined, isAdmin: r.is_admin as boolean, emailDomain: r.email_domain as string | undefined, eduVerified: r.edu_verified as boolean, usPersonsVerified: r.us_persons_verified as boolean, usPersonsVerifiedAt: r.us_persons_verified_at as number | undefined, usPersonsAttestation: r.us_persons_attestation ? p(r.us_persons_attestation) : undefined, itarOperator: r.itar_operator as boolean, operatorInitials: r.operator_initials as string | undefined, referralCode: r.referral_code as string | undefined, referredById: r.referred_by_id as string | undefined, referralCreditCents: r.referral_credit_cents as number, createdAt: Number(r.created_at) }; }
function toTeam(r: Record<string, unknown>): Team { return { id: r.id as string, name: r.name as string, ownerId: r.owner_id as string, memberIds: p(r.member_ids), plan: r.plan as Team["plan"], itarEnabled: r.itar_enabled as boolean, billingEmail: r.billing_email as string | undefined, creditBalance: r.credit_balance as number, approvalThresholdCents: r.approval_threshold_cents as number | undefined, costCenters: p(r.cost_centers ?? "[]"), netTerms: r.net_terms ? p(r.net_terms) : undefined, sso: r.sso ? p(r.sso) : undefined, coupaSharedSecret: r.coupa_shared_secret as string | undefined, aribaSharedSecret: r.ariba_shared_secret as string | undefined, addresses: p(r.addresses ?? "[]"), paymentMethods: p(r.payment_methods ?? "[]"), createdAt: Number(r.created_at) }; }
function toPart(r: Record<string, unknown>): Part { return { id: r.id as string, ownerId: r.owner_id as string, teamId: r.team_id as string, name: r.name as string, filename: r.filename as string, fileSize: Number(r.file_size), volumeCm3: Number(r.volume_cm3), bboxMm: p(r.bbox_mm), triangleCount: r.triangle_count as number | undefined, hash: r.hash as string, tags: p(r.tags ?? "[]"), itarFlagged: r.itar_flagged as boolean, thumbnailData: r.thumbnail_data as string | undefined, createdAt: Number(r.created_at), updatedAt: Number(r.updated_at) }; }
function toQuote(r: Record<string, unknown>): Quote { return { id: r.id as string, ownerId: r.owner_id as string, teamId: r.team_id as string, partId: r.part_id as string, process: r.process as string, material: r.material as string, finish: r.finish as string | undefined, expedite: r.expedite as Quote["expedite"], quantity: r.quantity as number, unitPriceCents: r.unit_price_cents as number, totalPriceCents: r.total_price_cents as number, currency: r.currency as string, leadTimeDays: r.lead_time_days as string, expiresAt: Number(r.expires_at), status: r.status as Quote["status"], dfmSummary: r.dfm_summary as string | undefined, dfmIssues: r.dfm_issues ? p(r.dfm_issues) : undefined, costDrivers: r.cost_drivers ? p(r.cost_drivers) : undefined, parentQuoteId: r.parent_quote_id as string | undefined, shareToken: r.share_token as string | undefined, batchId: r.batch_id as string | undefined, poNumber: r.po_number as string | undefined, costCenter: r.cost_center as string | undefined, approvedBy: r.approved_by as string | undefined, approvedAt: r.approved_at as number | undefined, createdAt: Number(r.created_at) }; }
function toOrder(r: Record<string, unknown>): Order { return { id: r.id as string, quoteId: r.quote_id as string, ownerId: r.owner_id as string, teamId: r.team_id as string, status: r.status as OrderStatus, totalPaidCents: r.total_paid_cents as number, currency: r.currency as string, poNumber: r.po_number as string | undefined, stripeSessionId: r.stripe_session_id as string | undefined, stripePaymentIntentId: r.stripe_payment_intent_id as string | undefined, shipAddress: r.ship_address ? p(r.ship_address) : undefined, itarFlagged: r.itar_flagged as boolean, timeline: p(r.timeline), trackingCarrier: r.tracking_carrier as string | undefined, trackingNumber: r.tracking_number as string | undefined, expectedShip: r.expected_ship as number | undefined, traceability: r.traceability ? p(r.traceability) : undefined, routing: r.routing ? p(r.routing) : undefined, createdAt: Number(r.created_at), updatedAt: Number(r.updated_at) }; }
function toApiKey(r: Record<string, unknown>): ApiKey { return { id: r.id as string, ownerId: r.owner_id as string, teamId: r.team_id as string, prefix: r.prefix as string, last4: r.last4 as string, hash: r.hash as string, name: r.name as string, scopes: p(r.scopes ?? "[]"), lastUsedAt: r.last_used_at as number | undefined, revokedAt: r.revoked_at as number | undefined, createdAt: Number(r.created_at) }; }
function toAudit(r: Record<string, unknown>): AuditEvent { return { id: r.id as string, teamId: r.team_id as string, actorId: r.actor_id as string, action: r.action as string, entity: r.entity as string, entityId: r.entity_id as string | undefined, detail: r.detail as string | undefined, ip: r.ip as string | undefined, at: Number(r.at) }; }
function toInvite(r: Record<string, unknown>): Invite { return { id: r.id as string, teamId: r.team_id as string, email: r.email as string, role: r.role as Invite["role"], invitedById: r.invited_by_id as string, token: r.token as string, acceptedAt: r.accepted_at as number | undefined, createdAt: Number(r.created_at), expiresAt: Number(r.expires_at) }; }
function toWebhook(r: Record<string, unknown>): Webhook { return { id: r.id as string, teamId: r.team_id as string, url: r.url as string, events: p(r.events), secret: r.secret as string, lastFiredAt: r.last_fired_at as number | undefined, lastStatusCode: r.last_status_code as number | undefined, revokedAt: r.revoked_at as number | undefined, createdAt: Number(r.created_at) }; }
function toUsage(r: Record<string, unknown>): ApiUsageEvent { return { id: r.id as string, keyId: r.key_id as string, teamId: r.team_id as string, endpoint: r.endpoint as string, statusCode: r.status_code as number, at: Number(r.at) }; }
function toNda(r: Record<string, unknown>): Nda { return { id: r.id as string, quoteId: r.quote_id as string | undefined, orderId: r.order_id as string | undefined, teamId: r.team_id as string, text: r.text as string, signedAt: r.signed_at as number | undefined, signerName: r.signer_name as string | undefined, signerEmail: r.signer_email as string | undefined, signerTitle: r.signer_title as string | undefined, signerIp: r.signer_ip as string | undefined, createdAt: Number(r.created_at) }; }
function toPromo(r: Record<string, unknown>): PromoCode { return { id: r.id as string, code: r.code as string, percentOff: r.percent_off as number | undefined, amountOffCents: r.amount_off_cents as number | undefined, minSpendCents: r.min_spend_cents as number | undefined, usesLimit: r.uses_limit as number | undefined, usesCount: r.uses_count as number, eligiblePlanBefore: r.eligible_plan_before ? p(r.eligible_plan_before) : undefined, firstOrderOnly: r.first_order_only as boolean, expiresAt: r.expires_at as number | undefined, disabledAt: r.disabled_at as number | undefined, createdBy: r.created_by as string, createdAt: Number(r.created_at) }; }
function toReview(r: Record<string, unknown>): Review { return { id: r.id as string, teamId: r.team_id as string, orderId: r.order_id as string | undefined, rating: r.rating as Review["rating"], title: r.title as string, body: r.body as string, authorName: r.author_name as string, authorRole: r.author_role as string | undefined, authorCompany: r.author_company as string | undefined, verifiedOrder: r.verified_order as boolean, process: r.process as string | undefined, material: r.material as string | undefined, publishedAt: r.published_at as number | undefined, createdAt: Number(r.created_at) }; }
function toPartner(r: Record<string, unknown>): Partner { return { id: r.id as string, name: r.name as string, companyName: r.company_name as string, contactEmail: r.contact_email as string, processes: p(r.processes ?? "[]"), region: r.region as string, active: r.active as boolean, passwordHash: r.password_hash as string | undefined, itarEligible: r.itar_eligible as boolean, jobsAcceptedCount: r.jobs_accepted_count as number | undefined, createdAt: Number(r.created_at) }; }
function toTicket(r: Record<string, unknown>): Ticket { return { id: r.id as string, teamId: r.team_id as string, subject: r.subject as string, status: r.status as Ticket["status"], messages: p(r.messages), orderId: r.order_id as string | undefined, createdAt: Number(r.created_at), updatedAt: Number(r.updated_at) }; }
function toRefund(r: Record<string, unknown>): RefundRecord { return { id: r.id as string, orderId: r.order_id as string, teamId: r.team_id as string, cents: r.cents as number, reason: r.reason as string, issuedById: r.issued_by_id as string, createdAt: Number(r.created_at) }; }
function toContent(r: Record<string, unknown>): ContentDoc { return { slug: r.slug as string, kind: r.kind as ContentDoc["kind"], title: r.title as string, description: r.description as string, body: r.body as string, published: r.published as boolean, updatedById: r.updated_by_id as string, updatedAt: Number(r.updated_at) }; }
function toPricingOverride(r: Record<string, unknown>): PricingOverride { return { key: r.key as string, value: Number(r.value), updatedAt: Number(r.updated_at), updatedById: r.updated_by_id as string }; }
