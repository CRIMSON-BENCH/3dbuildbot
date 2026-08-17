"use client";
import { useState } from "react";

export function PunchoutSetup({ teamId, coupaConfigured, aribaConfigured }: { teamId: string; coupaConfigured: boolean; aribaConfigured: boolean }) {
  const [showXml, setShowXml] = useState<"coupa" | "ariba" | null>(null);
  const coupaUrl = typeof window !== "undefined" ? `${location.origin}/api/procurement/coupa/${teamId}` : "";
  const aribaUrl = typeof window !== "undefined" ? `${location.origin}/api/procurement/ariba/${teamId}` : "";

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <h2 className="text-sm font-semibold mb-3">PunchOut integrations (cXML)</h2>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Configure 3DBuildBot as a PunchOut supplier in your procurement system. When buyers punch out, they land in a scoped shopping session; their cart returns as a cXML PunchOutOrderMessage.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <Card
          logo="Coupa"
          configured={coupaConfigured}
          url={coupaUrl}
          onShow={() => setShowXml((x) => (x === "coupa" ? null : "coupa"))}
        />
        <Card
          logo="SAP Ariba"
          configured={aribaConfigured}
          url={aribaUrl}
          onShow={() => setShowXml((x) => (x === "ariba" ? null : "ariba"))}
        />
      </div>
      {showXml && (
        <div className="mt-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">Sample PunchoutSetupRequest to POST</div>
          <pre className="text-xs font-mono bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto">{sampleXml(showXml === "coupa" ? coupaUrl : aribaUrl)}</pre>
        </div>
      )}
    </div>
  );
}

function Card({ logo, configured, url, onShow }: { logo: string; configured: boolean; url: string; onShow: () => void }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{logo}</div>
        <span className={`text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${configured ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>{configured ? "configured" : "not set"}</span>
      </div>
      <div className="mt-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Supplier endpoint</div>
      <code className="block text-xs font-mono break-all mt-1 text-slate-700 dark:text-slate-300">{url}</code>
      <button onClick={onShow} className="mt-3 text-xs text-brand-600 dark:text-brand-400 hover:underline">Show sample cXML →</button>
    </div>
  );
}

function sampleXml(url: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd">
<cXML payloadID="1234@yourbuyer.com" timestamp="2026-08-17T12:00:00-08:00">
  <Header>
    <From><Credential domain="DUNS"><Identity>123456789</Identity></Credential></From>
    <To><Credential domain="DUNS"><Identity>3DBuildBot</Identity></Credential></To>
    <Sender>
      <Credential domain="DUNS"><Identity>123456789</Identity><SharedSecret>YOUR_SHARED_SECRET</SharedSecret></Credential>
      <UserAgent>Coupa 2026</UserAgent>
    </Sender>
  </Header>
  <Request>
    <PunchOutSetupRequest operation="create">
      <BuyerCookie>abc-123</BuyerCookie>
      <BrowserFormPost><URL>https://your-buyer.example.com/return</URL></BrowserFormPost>
    </PunchOutSetupRequest>
  </Request>
</cXML>

POST to: ${url}`;
}
