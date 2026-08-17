import { Container, Section, Badge } from "@/components/Card";
import { db } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Customer Reviews" };
export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await db.reviews.listPublished();
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;

  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Reviews</div>
        <h1 className="text-3xl font-semibold tracking-tight">What engineers say</h1>
        <div className="mt-3 flex items-center gap-3">
          <div className="text-3xl font-semibold tabular-nums">{avg.toFixed(1)}</div>
          <div className="text-yellow-500 text-xl">{"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}</div>
          <div className="text-sm text-slate-500">based on {reviews.length} verified reviews</div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {reviews.length === 0 ? (
            <div className="col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-sm text-slate-500">No public reviews yet.</div>
          ) : (
            reviews.map((r) => (
              <article key={r.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-yellow-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  {r.verifiedOrder && <Badge tone="green">Verified order</Badge>}
                </div>
                <h3 className="text-sm font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{r.body}</p>
                <div className="mt-3 text-xs text-slate-500">
                  {r.authorName}{r.authorRole ? `, ${r.authorRole}` : ""}{r.authorCompany ? ` · ${r.authorCompany}` : ""}
                  {r.process && <span> · {r.process.toUpperCase()}</span>}
                </div>
              </article>
            ))
          )}
        </div>
      </Container>

      {reviews.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "3DBuildBot Manufacturing Services",
              aggregateRating: { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: reviews.length },
              review: reviews.slice(0, 10).map((r) => ({
                "@type": "Review",
                author: { "@type": "Person", name: r.authorName },
                reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
                reviewBody: r.body,
              })),
            }),
          }}
        />
      )}
    </Section>
  );
}
