// Responsible-disclosure contact per RFC 9116.
// Ethical security researchers look for this at /.well-known/security.txt
// before reporting a vulnerability. Having it visible reduces the odds
// of a public 0-day drop instead of a coordinated disclosure.

const YEAR_FROM_NOW = new Date();
YEAR_FROM_NOW.setFullYear(YEAR_FROM_NOW.getFullYear() + 1);
const expires = YEAR_FROM_NOW.toISOString().slice(0, 10);

export async function GET() {
  const body = `Contact: mailto:security@3dbuildbot.com
Expires: ${expires}T00:00:00.000Z
Preferred-Languages: en
Canonical: https://www.3dbuildbot.com/.well-known/security.txt
Policy: https://www.3dbuildbot.com/security-policy
Acknowledgments: https://www.3dbuildbot.com/security-hall-of-fame
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
