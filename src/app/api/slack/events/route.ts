// Slack Events API endpoint. Handles URL verification + basic /quote slash command scaffold.
// To wire live: set SLACK_SIGNING_SECRET + SLACK_BOT_TOKEN. Otherwise responds with instructions.
import { NextResponse } from "next/server";

const SLACK_SECRET = process.env.SLACK_SIGNING_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  let json: Record<string, unknown> = {};
  try { json = JSON.parse(body); } catch { /* form-encoded */ }

  // URL verification handshake
  if (json.type === "url_verification") {
    return NextResponse.json({ challenge: json.challenge });
  }

  if (!SLACK_SECRET) {
    return NextResponse.json({ ok: false, error: "SLACK_SIGNING_SECRET not set on the server. Set it in your Vercel env, then re-run the Slack manifest install." }, { status: 501 });
  }

  // Event routing (basic)
  const event = (json.event as { type?: string; text?: string; channel?: string }) ?? {};
  if (event.type === "app_mention" || event.type === "message") {
    // TODO: parse for CAD attachments; post ephemeral quote via chat.postMessage.
    return NextResponse.json({ ok: true, handled: event.type });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    doc: "Slack Events API endpoint for the 3DBuildBot bot.",
    setup: [
      "1. Create a Slack app at api.slack.com/apps",
      "2. Enable Events API and set Request URL to https://your-domain/api/slack/events",
      "3. Enable Slash Commands: /quote → same URL",
      "4. Set SLACK_SIGNING_SECRET and SLACK_BOT_TOKEN in Vercel env",
    ],
  });
}
