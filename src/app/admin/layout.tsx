import Link from "next/link";
import { Container } from "@/components/Card";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/routing", label: "Routing" },
    { href: "/admin/tickets", label: "Tickets" },
    { href: "/admin/refunds", label: "Refunds" },
    { href: "/admin/pricing", label: "Pricing rules" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/content", label: "Content" },
  ];
  return (
    <div>
      <div className="border-b border-slate-200 dark:border-slate-800 bg-red-50/40 dark:bg-red-950/20">
        <Container className="py-2 flex items-center gap-1 overflow-x-auto text-xs">
          <span className="text-red-600 dark:text-red-400 font-mono uppercase tracking-widest mr-3">Admin</span>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-1.5 rounded text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 whitespace-nowrap">{l.label}</Link>
          ))}
        </Container>
      </div>
      {children}
    </div>
  );
}
