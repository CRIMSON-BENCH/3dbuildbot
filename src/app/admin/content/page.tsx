import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Container } from "@/components/Card";
import { ContentAdmin } from "@/components/ContentAdmin";

export const dynamic = "force-dynamic";

export default async function AdminContent() {
  const u = await getCurrentUser();
  if (!u?.isAdmin) redirect("/dashboard");
  const docs = await db.content.list();
  return (
    <Container className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin</div>
          <h1 className="text-2xl font-semibold tracking-tight">Content editor</h1>
        </div>
        <Link href="/admin" className="text-sm text-slate-500">← Admin home</Link>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">Edit blog posts and case studies live — no redeploy needed. Content served at <code className="font-mono">/blog/[slug]</code> and <code className="font-mono">/case-studies/[slug]</code>.</p>
      <ContentAdmin initial={docs} />
    </Container>
  );
}
