import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/auth";
import { Container } from "@/components/Card";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  async function signOut() {
    "use server";
    await logout();
    redirect("/");
  }

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/quotes", label: "Quotes" },
    { href: "/dashboard/orders", label: "Orders" },
    { href: "/dashboard/parts", label: "Part vault" },
    { href: "/dashboard/approvals", label: "Approvals" },
    { href: "/dashboard/addresses", label: "Addresses" },
    { href: "/dashboard/team", label: "Team" },
    { href: "/dashboard/procurement", label: "Procurement" },
    { href: "/dashboard/referrals", label: "Referrals" },
    { href: "/dashboard/api-keys", label: "API keys" },
    { href: "/dashboard/webhooks", label: "Webhooks" },
    { href: "/dashboard/itar", label: "ITAR" },
    { href: "/dashboard/billing", label: "Billing" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen">
      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 shrink-0">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 mb-4">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Signed in as</div>
              <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{user.name}</div>
              <div className="text-xs text-slate-500 truncate">{user.email}</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">{user.plan}</span>
                {user.eduVerified && <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">.edu</span>}
                {user.isAdmin && <Link href="/admin" className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">admin</Link>}
              </div>
            </div>
            <nav className="space-y-1">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="block px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  {l.label}
                </Link>
              ))}
              <form action={signOut}>
                <button type="submit" className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Sign out
                </button>
              </form>
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
