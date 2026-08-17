// Coupa PunchOut cXML endpoint.
// Accepts a PunchoutSetupRequest and returns a PunchoutSetupResponse with a URL to our hosted shopping session.
// The full protocol requires shared-secret verification against team.coupaSharedSecret.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

// Minimal cXML PunchoutSetupResponse builder
function setupResponseXml(returnUrl: string, punchoutUrl: string, payloadId: string) {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<cXML payloadID="${payloadId}" timestamp="${now}" xml:lang="en-US">
  <Response>
    <Status code="200" text="OK"/>
    <PunchOutSetupResponse>
      <StartPage>
        <URL>${punchoutUrl}</URL>
      </StartPage>
    </PunchOutSetupResponse>
  </Response>
</cXML>`;
}

export async function POST(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = await db.teams.findById(teamId);
  if (!team) return new Response("team not found", { status: 404 });

  const body = await req.text();
  // NOTE: real implementation parses cXML, verifies shared secret from body Header/Sender/Credential.
  // For the demo we accept any request; production would call verifyCoupaCxml(body, team.coupaSharedSecret).
  const returnUrl = extractReturnUrl(body) || "https://example.buyer.coupa.com/return";
  const session = nanoid(20);
  const origin = new URL(req.url).origin;
  const punchoutUrl = `${origin}/procurement/session/${session}?buyer=coupa&team=${teamId}&return=${encodeURIComponent(returnUrl)}`;

  await db.audit.log({ teamId, actorId: "coupa-buyer", action: "punchout.setup", entity: "punchout", detail: `session ${session}` });
  return new Response(setupResponseXml(returnUrl, punchoutUrl, `pl_${session}`), {
    status: 200,
    headers: { "content-type": "application/xml" },
  });
}

function extractReturnUrl(xml: string): string | null {
  const m = xml.match(/<BrowserFormPost>[\s\S]*?<URL>([^<]+)<\/URL>/);
  return m?.[1] ?? null;
}
