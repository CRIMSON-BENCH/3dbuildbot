// Customer photo gallery — a place for customers to see real prints made
// through 3DBuildBot. Data source: /api/gallery reads uploaded photos from
// Vercel Blob under gallery/. Manual curation for now (admin approves).
import { list } from "@vercel/blob";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Card";

export const metadata: Metadata = {
  title: "Customer Prints Gallery — Real Parts from Real Orders | 3DBuildBot",
  description:
    "Photos of real parts printed through 3DBuildBot. FDM, SLA, SLS, CNC — customer projects across aerospace, robotics, medical, consumer.",
};

// Rebuild every 6 hours so new approved photos surface without a full deploy.
export const revalidate = 21600;

interface GalleryItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

async function getGallery(): Promise<GalleryItem[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: "gallery/approved/" });
    return blobs
      .filter((b) => /\.(jpe?g|png|webp|gif)$/i.test(b.pathname))
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .map((b) => ({
        url: b.url,
        pathname: b.pathname,
        size: b.size,
        uploadedAt: typeof b.uploadedAt === "string" ? b.uploadedAt : new Date(b.uploadedAt).toISOString(),
      }));
  } catch {
    return [];
  }
}

export default async function Page() {
  const items = await getGallery();
  return (
    <Section>
      <Container className="max-w-5xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Customer prints</div>
        <h1 className="text-4xl font-semibold tracking-tight">Real parts from real orders.</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Every photo below is a customer part printed through 3DBuildBot. Want to submit one from a past order? <Link href="/contact?topic=gallery" className="text-brand-600 hover:underline">Send it in →</Link>
        </p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-10 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">The gallery is just getting started. Customer photos from recent orders will appear here.</p>
            <Link href="/quote" className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">
              Be the first to submit a part →
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.pathname}
                src={item.url}
                alt="Customer print"
                className="w-full aspect-square object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
