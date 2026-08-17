import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, Section } from "@/components/Card";
import { AcceptInviteForm } from "@/components/AcceptInviteForm";

export const dynamic = "force-dynamic";

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const inv = await db.invites.findByToken(token);
  if (!inv || inv.acceptedAt || inv.expiresAt < Date.now()) notFound();
  const team = await db.teams.findById(inv.teamId);
  return (
    <Section>
      <Container className="max-w-md">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Team invitation</div>
          <h1 className="text-2xl font-semibold tracking-tight">Join {team?.name ?? "team"}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">You've been invited to <span className="font-mono">{inv.email}</span> as <span className="font-semibold">{inv.role}</span>.</p>
        </div>
        <AcceptInviteForm token={token} email={inv.email} />
      </Container>
    </Section>
  );
}
