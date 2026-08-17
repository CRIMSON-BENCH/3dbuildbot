// Breadcrumb JSON-LD helper — drop into any programmatic page.
// Google renders breadcrumb chip under the URL in search results.

interface Crumb { name: string; url: string; }

export function JsonLdBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `https://www.3dbuildbot.com${c.url}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
