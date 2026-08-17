// SAML SP metadata endpoint. Returns the XML your IdP admin uploads to their side.
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = await db.teams.findById(teamId);
  if (!team) return new Response("team not found", { status: 404 });
  const origin = new URL(req.url).origin;
  const entityId = `${origin}/saml/${teamId}`;
  const acsUrl = `${origin}/api/saml/${teamId}/callback`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="${entityId}">
  <md:SPSSODescriptor AuthnRequestsSigned="false" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
    <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="${acsUrl}" index="0" isDefault="true"/>
  </md:SPSSODescriptor>
  <md:ContactPerson contactType="technical">
    <md:EmailAddress>security@3dbuildbot.com</md:EmailAddress>
  </md:ContactPerson>
</md:EntityDescriptor>`;
  return new Response(xml, { status: 200, headers: { "content-type": "application/xml" } });
}
