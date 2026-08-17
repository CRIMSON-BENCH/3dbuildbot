"use client";
// Lightweight SVG "isometric" placeholder for CAD preview.
// A real three.js viewer will replace this once react-three/fiber stabilizes on React 19.

export function PartViewer({ shape = "bracket", color = "#3b82f6" }: { shape?: "bracket" | "cube" | "gear" | "torus"; color?: string }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Origin / axes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <Isometric shape={shape} color={color} />
        {/* Axes triad */}
        <g transform="translate(40 260)" strokeWidth="1.5" fontSize="10" fontFamily="ui-monospace, monospace">
          <line x1="0" y1="0" x2="30" y2="-15" stroke="#ef4444" markerEnd="url(#arr)" />
          <text x="34" y="-14" fill="#ef4444">X</text>
          <line x1="0" y1="0" x2="-30" y2="-15" stroke="#10b981" markerEnd="url(#arr)" />
          <text x="-46" y="-14" fill="#10b981">Y</text>
          <line x1="0" y1="0" x2="0" y2="-32" stroke="#3b82f6" markerEnd="url(#arr)" />
          <text x="4" y="-32" fill="#3b82f6">Z</text>
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="currentColor" />
            </marker>
          </defs>
        </g>
      </svg>
      {/* Corner labels */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-widest">Isometric preview</div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-500 dark:text-slate-500">1:1 · mm</div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 dark:text-slate-500 opacity-60">↻ drag to rotate (coming soon)</div>
    </div>
  );
}

function Isometric({ shape, color }: { shape: string; color: string }) {
  const cx = 200;
  const cy = 130;
  const shadeTop = color;
  const shadeLeft = "#1e3a8a"; // deeper
  const shadeRight = "#1d4ed8";

  if (shape === "cube" || shape === "bracket" || shape === "gear" || shape === "torus") {
    // A stylized isometric box; shape name only tweaks the top plate size for variety
    const w = shape === "bracket" ? 120 : 90;
    const h = shape === "bracket" ? 30 : shape === "torus" ? 70 : 90;
    const d = shape === "bracket" ? 70 : shape === "gear" ? 80 : 90;
    // 30° isometric
    const dx = Math.cos(Math.PI / 6);
    const dy = Math.sin(Math.PI / 6);
    // Points
    const A = [cx - w * dx, cy + w * dy]; // front-left
    const B = [cx + w * dx, cy + w * dy]; // front-right (wait: this is front-right corner going toward +x)
    // Simpler: draw 3 faces of a box
    // Bottom-front vertex = cx, cy + h
    const F = [cx, cy + h];
    const L = [cx - w * dx, cy + h - w * dy];
    const R = [cx + d * dx, cy + h - d * dy];
    const FT = [cx, cy - w * dy - d * dy + (h - h)];
    // Compute 6 needed points
    const bf = [cx, cy + h];
    const bl = [cx - w * dx, cy + h - w * dy];
    const br = [cx + d * dx, cy + h - d * dy];
    const tf = [cx, cy];
    const tl = [cx - w * dx, cy - w * dy];
    const tr = [cx + d * dx, cy - d * dy];
    const tt = [cx + (d - w) * dx, cy - (w + d) * dy];
    return (
      <g>
        {/* Left face */}
        <polygon points={`${bf[0]},${bf[1]} ${bl[0]},${bl[1]} ${tl[0]},${tl[1]} ${tf[0]},${tf[1]}`} fill={shadeLeft} opacity="0.85" />
        {/* Right face */}
        <polygon points={`${bf[0]},${bf[1]} ${br[0]},${br[1]} ${tr[0]},${tr[1]} ${tf[0]},${tf[1]}`} fill={shadeRight} opacity="0.85" />
        {/* Top */}
        <polygon points={`${tf[0]},${tf[1]} ${tl[0]},${tl[1]} ${tt[0]},${tt[1]} ${tr[0]},${tr[1]}`} fill={shadeTop} />
        {/* Bracket cutout: extra plate on left */}
        {shape === "bracket" && (
          <>
            <polygon points={`${tl[0]},${tl[1]} ${tl[0] - 20 * dx},${tl[1] + 45 - 20 * dy} ${tl[0] - 20 * dx + 6 * dx},${tl[1] + 45 - 20 * dy - 6 * dy} ${tl[0] + 6 * dx},${tl[1] - 6 * dy}`} fill={shadeLeft} opacity="0.7" />
            <circle cx={tl[0] - 10 * dx} cy={tl[1] + 20 - 10 * dy} r="4" fill="#0f172a" opacity="0.4" />
          </>
        )}
        {/* Wireframe overlay */}
        <g stroke={color} strokeOpacity="0.6" strokeWidth="0.8" fill="none">
          <polyline points={`${bf[0]},${bf[1]} ${bl[0]},${bl[1]} ${tl[0]},${tl[1]}`} />
          <polyline points={`${bf[0]},${bf[1]} ${br[0]},${br[1]} ${tr[0]},${tr[1]}`} />
          <polyline points={`${tf[0]},${tf[1]} ${tl[0]},${tl[1]} ${tt[0]},${tt[1]} ${tr[0]},${tr[1]} ${tf[0]},${tf[1]}`} />
          <line x1={bf[0]} y1={bf[1]} x2={tf[0]} y2={tf[1]} />
        </g>
      </g>
    );
  }
  return null;
}
