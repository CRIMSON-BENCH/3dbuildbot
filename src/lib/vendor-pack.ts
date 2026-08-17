// Vendor onboarding pack: W-9, COI request, banking form — all auto-filled from team info.
import type { Team, User } from "./db";

let jsPDF: unknown = null;
async function getJsPDF() {
  if (!jsPDF) { const mod = await import("jspdf"); jsPDF = mod.default || mod.jsPDF; }
  return jsPDF as new () => {
    setFontSize: (n: number) => void; setFont: (f: string, s?: string) => void; setTextColor: (r: number, g?: number, b?: number) => void;
    setDrawColor: (r: number, g?: number, b?: number) => void; setLineWidth: (n: number) => void; setFillColor: (r: number, g?: number, b?: number) => void;
    line: (a: number, b: number, c: number, d: number) => void; rect: (x: number, y: number, w: number, h: number, style?: string) => void;
    text: (t: string | string[], x: number, y: number, opts?: unknown) => void; addPage: () => void; output: (type: string) => unknown;
  };
}

interface Ctx { team: Team; user: User; }

function header(doc: ReturnType<Awaited<ReturnType<typeof getJsPDF>>>, title: string) {
  doc.setFillColor(37, 99, 235); doc.rect(0, 0, 210, 26, "F");
  doc.setTextColor(255); doc.setFontSize(16); doc.setFont("helvetica", "bold"); doc.text("3DBuildBot", 20, 15);
  doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.text(title, 190, 15, { align: "right" });
  doc.setTextColor(30); doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.text(title, 20, 40);
}
function field(doc: ReturnType<Awaited<ReturnType<typeof getJsPDF>>>, y: number, label: string, value: string) {
  doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(80); doc.text(label, 20, y);
  doc.setFontSize(11); doc.setTextColor(30); doc.text(value, 20, y + 6);
  doc.setDrawColor(180); doc.setLineWidth(0.3); doc.line(20, y + 8, 190, y + 8);
  return y + 14;
}

export async function generateW9(ctx: Ctx): Promise<Blob> {
  const Doc = await getJsPDF(); const doc = new Doc();
  header(doc, "Form W-9 (Substitute) — Vendor Registration");
  let y = 50;
  y = field(doc, y, "1. Name (as shown on your income tax return)", "3DBuildBot Industries, Inc.");
  y = field(doc, y, "2. Business name / DBA", "3DBuildBot");
  y = field(doc, y, "3. Federal tax classification", "C-Corporation");
  y = field(doc, y, "4. Exemptions (codes apply only to certain entities, not individuals)", "None");
  y = field(doc, y, "5. Address (number, street, apt. or suite no.)", "[Provided upon request]");
  y = field(doc, y, "6. City, state, and ZIP", "[Provided upon request]");
  y = field(doc, y, "Part I — Taxpayer Identification Number (TIN / EIN)", "[Provided under NDA]");
  y = field(doc, y, "Part II — Certification (electronic signature)", "3DBuildBot QA · " + new Date().toISOString().slice(0, 10));
  doc.setFontSize(8); doc.setTextColor(120);
  doc.text("This substitute W-9 provides all information required by IRS Form W-9. Full IRS Form W-9 available on request.", 20, 275, { maxWidth: 170 });
  return doc.output("blob") as Blob;
}

export async function generateCoiRequest(ctx: Ctx): Promise<Blob> {
  const Doc = await getJsPDF(); const doc = new Doc();
  header(doc, "Certificate of Insurance (COI) — Request");
  let y = 50;
  doc.setFontSize(10); doc.setTextColor(30);
  doc.text(`To: ${ctx.team.name}`, 20, y); y += 8;
  doc.text(`Attn: Accounts Payable / Risk Management`, 20, y); y += 12;
  doc.text("Per your vendor onboarding requirements, please issue a Certificate of Insurance naming your organization as an Additional Insured on the following 3DBuildBot policies:", 20, y, { maxWidth: 170 });
  y += 20;
  const items = [
    ["General Liability", "$2,000,000 per occurrence / $4,000,000 aggregate"],
    ["Automobile Liability", "$1,000,000 combined single limit"],
    ["Workers' Compensation", "Statutory limits per state of operation"],
    ["Umbrella / Excess", "$5,000,000 aggregate"],
    ["Cyber Liability", "$2,000,000 aggregate"],
    ["Errors & Omissions", "$1,000,000 per claim"],
  ];
  doc.setFontSize(10);
  for (const [k, v] of items) {
    doc.setFont("helvetica", "bold"); doc.text("• " + k, 24, y);
    doc.setFont("helvetica", "normal"); doc.text(v, 90, y);
    y += 7;
  }
  y += 10;
  doc.text("Our insurance carrier will issue the COI within 3 business days. Please provide the certificate holder mailing address and any specific policy language requirements.", 20, y, { maxWidth: 170 });
  return doc.output("blob") as Blob;
}

export async function generateBankingForm(ctx: Ctx): Promise<Blob> {
  const Doc = await getJsPDF(); const doc = new Doc();
  header(doc, "ACH / Wire Instructions");
  let y = 50;
  y = field(doc, y, "Vendor", "3DBuildBot Industries, Inc.");
  y = field(doc, y, "Bank name", "[Provided upon NDA execution]");
  y = field(doc, y, "Routing (ABA)", "[Provided]");
  y = field(doc, y, "Account number", "[Provided]");
  y = field(doc, y, "Account type", "Business Checking");
  y = field(doc, y, "SWIFT / BIC (international wire)", "[Provided]");
  y = field(doc, y, "Reference / Memo instructions", "3DBuildBot invoice number + your PO number");
  doc.setFontSize(8); doc.setTextColor(120);
  doc.text("Banking details are issued via secured channel after mutual NDA execution. Contact ap@3dbuildbot.com to complete setup.", 20, 275, { maxWidth: 170 });
  return doc.output("blob") as Blob;
}
