"use client";
export default function GlobalErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", background: "#0f172a", color: "#f1f5f9" }}>
          <div style={{ maxWidth: 400, padding: 32, borderRadius: 12, background: "#1e293b" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#ef4444" }}>Fatal error</div>
            <h1 style={{ marginTop: 8, fontSize: 24 }}>Application failure</h1>
            <p style={{ marginTop: 12, fontSize: 14, color: "#94a3b8" }}>The site couldn't recover from an error. Refresh to try again.</p>
            {error.digest && <p style={{ marginTop: 8, fontSize: 10, fontFamily: "monospace", color: "#64748b" }}>ref: {error.digest}</p>}
            <button onClick={reset} style={{ marginTop: 20, padding: "8px 16px", borderRadius: 8, background: "#3b82f6", color: "white", border: 0, cursor: "pointer" }}>Refresh</button>
          </div>
        </div>
      </body>
    </html>
  );
}
