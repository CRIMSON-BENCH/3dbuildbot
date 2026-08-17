// SAP Ariba PunchOut cXML endpoint. Same cXML dialect as Coupa; different buyer domain.
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

function setupResponseXml(punchoutUrl: string, payloadId: string) {
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
  const returnUrl = body.match(/<BrowserFormPost>[\s\S]*?<URL>([^<]+)<\/URL>/)?.[1] || "https://example.buyer.ariba.com/return";
  const session = nanoid(20);
  const origin = new URL(req.url).origin;
  const punchoutUrl = `${origin}/procurement/session/${session}?buyer=ariba&team=${teamId}&return=${encodeURIComponent(returnUrl)}`;
  await db.audit.log({ teamId, actorId: "ariba-buyer", action: "punchout.setup", entity: "punchout", detail: `session ${session}` });
  return new Response(setupResponseXml(punchoutUrl, `pl_${session}`), { status: 200, headers: { "content-type": "application/xml" } });
}
