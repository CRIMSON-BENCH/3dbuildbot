import { ALL_GUIDES as GUIDES } from "@/data/guides";

const BASE = "https://www.3dbuildbot.com";

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET() {
  const items = [...GUIDES]
    .sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? ""))
    .map((g) => `
    <item>
      <title>${escape(g.title)}</title>
      <link>${BASE}/guides/${g.slug}</link>
      <guid isPermaLink="true">${BASE}/guides/${g.slug}</guid>
      <pubDate>${new Date(g.updated).toUTCString()}</pubDate>
      <description>${escape(g.description)}</description>
      <category>${escape(g.category)}</category>
    </item>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>3DBuildBot Engineering Guides</title>
    <link>${BASE}/guides</link>
    <atom:link href="${BASE}/guides/rss.xml" rel="self" type="application/rss+xml" />
    <description>DFM guides, materials selection, tolerances, post-processing, certifications, cost.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
