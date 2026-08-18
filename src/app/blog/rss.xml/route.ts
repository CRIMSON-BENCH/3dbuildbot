import { ALL_BLOG_POSTS as BLOG_POSTS } from "@/data/blog";

const BASE = "https://www.3dbuildbot.com";

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET() {
  const items = [...BLOG_POSTS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 50)
    .map((p) => `
    <item>
      <title>${escape(p.title)}</title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${escape(p.subtitle)}</description>
      <author>hello@3dbuildbot.com (${escape(p.author)})</author>
      <category>${escape(p.category)}</category>
    </item>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>3DBuildBot Blog — Manufacturing + Engineering</title>
    <link>${BASE}/blog</link>
    <atom:link href="${BASE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Real engineering + manufacturing content: process comparisons, cost breakdowns, case studies.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
