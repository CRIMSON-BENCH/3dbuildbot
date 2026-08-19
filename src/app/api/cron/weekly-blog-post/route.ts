// Weekly AI-generated blog post. Uses Gemini to write a real DFM/materials/
// manufacturing article about a rotating topic list. Result is emailed to
// hello@ so an editor can review + commit as a real blog post — we don't
// auto-publish to avoid AI-slop reputation risk. Set to Monday 12:00 UTC.
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const TOPICS = [
  "How to design snap-fit clips that survive 10,000+ cycles",
  "Choosing between PA12 and PA-CF for load-bearing 3D printed parts",
  "When to switch from FDM to SLS as your production volume grows",
  "The real cost drivers of 5-axis CNC vs 3-axis",
  "Tolerance stackup basics for injection-molded assemblies",
  "Why your prototype PLA parts fail differently than SLS-nylon production parts",
  "Wall thickness minimums for 5 common 3D printing materials",
  "How to spec a first-article inspection (FAI) without over-ordering",
  "Anodize color consistency: what actually causes batch variation",
  "Reducing part count with topology-optimized brackets",
];

function pickTopic(): string {
  // Deterministic per-week rotation
  const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return TOPICS[weekIndex % TOPICS.length];
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_TOKEN}`;
  if (process.env.CRON_TOKEN && auth !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const topic = pickTopic();
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const prompt = `Write a 600-800 word engineering blog post titled: "${topic}"

Requirements:
- Real technical content — cite material grades, tolerances, industry standards
- Practical: give the reader a rule of thumb they can apply
- No marketing fluff. No "in today's fast-paced world" openings.
- Structure: opening (1 paragraph), 3-4 sections with H2 headings, closing takeaway
- Voice: senior manufacturing engineer speaking to peers
- Do not mention 3DBuildBot, our prices, or our services

Return only the article body as markdown. No frontmatter.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
        }),
        cache: "no-store",
      }
    );
    const data = await res.json();
    const draft = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!draft) throw new Error("no draft returned");

    // Email the draft to editorial for review
    const html = `
      <div style="font-family:-apple-system,sans-serif;max-width:640px;">
        <h2>Weekly AI blog draft</h2>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><em>Review, edit, and add to src/data/blog-auto.ts if it's worth publishing.</em></p>
        <hr />
        <pre style="white-space:pre-wrap;font-family:Georgia,serif;font-size:14px;line-height:1.6;">${draft.replace(/</g, "&lt;")}</pre>
      </div>
    `;
    await sendEmail({
      to: "hello@3dbuildbot.com",
      subject: `Blog draft: ${topic.slice(0, 60)}${topic.length > 60 ? "…" : ""}`,
      html,
    });

    return NextResponse.json({ ok: true, topic, draftLength: draft.length });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "gen failed" }, { status: 500 });
  }
}
