"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

// SFM ranges from Machinery's Handbook for HSS and carbide end mills
const SFM: Record<string, Record<string, [number, number]>> = {
  "aluminum-6061": { hss: [400, 800], carbide: [1000, 3000] },
  "aluminum-7075": { hss: [400, 800], carbide: [1000, 2500] },
  "brass-260": { hss: [200, 400], carbide: [500, 1000] },
  "copper": { hss: [100, 200], carbide: [400, 800] },
  "mild-steel-1018": { hss: [80, 120], carbide: [400, 800] },
  "4140-steel": { hss: [50, 80], carbide: [250, 500] },
  "tool-steel": { hss: [30, 60], carbide: [150, 300] },
  "stainless-303": { hss: [70, 100], carbide: [200, 400] },
  "stainless-316": { hss: [40, 60], carbide: [150, 250] },
  "titanium-6al4v": { hss: [30, 50], carbide: [100, 200] },
  "inconel-718": { hss: [15, 25], carbide: [60, 120] },
  "peek": { hss: [200, 400], carbide: [600, 1200] },
  "delrin-pom": { hss: [400, 800], carbide: [800, 2000] },
  "polycarbonate": { hss: [300, 600], carbide: [800, 1600] },
};

const CHIP_LOAD_IPT: Record<string, [number, number]> = {
  // per tooth chip load in inches per tooth, ballpark for 1/2" end mill
  "aluminum-6061": [0.003, 0.008],
  "aluminum-7075": [0.003, 0.007],
  "brass-260": [0.002, 0.005],
  "copper": [0.002, 0.004],
  "mild-steel-1018": [0.002, 0.005],
  "4140-steel": [0.001, 0.004],
  "tool-steel": [0.001, 0.003],
  "stainless-303": [0.001, 0.003],
  "stainless-316": [0.001, 0.003],
  "titanium-6al4v": [0.001, 0.003],
  "inconel-718": [0.0005, 0.002],
  "peek": [0.002, 0.005],
  "delrin-pom": [0.003, 0.007],
  "polycarbonate": [0.002, 0.005],
};

const MATERIALS = Object.keys(SFM).map((k) => ({ value: k, label: k.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }));

export function FeedSpeedSolver() {
  const [op, setOp] = useState<"milling" | "turning">("milling");
  const [tool, setTool] = useState<"hss" | "carbide">("carbide");
  const [mat, setMat] = useState("aluminum-6061");
  const [dIn, setDIn] = useState(0.5); // inches (tool diameter for mill, workpiece diameter for turning)
  const [flutes, setFlutes] = useState(4);
  const [conservatism, setConservatism] = useState<"conservative" | "aggressive">("aggressive");

  const { rpm, ipm, ipt, sfm } = useMemo(() => {
    const [lo, hi] = SFM[mat][tool];
    const sfm = conservatism === "conservative" ? lo : (lo + hi) / 2;
    const rpm = (sfm * 3.82) / dIn;
    const [ciptLo, ciptHi] = CHIP_LOAD_IPT[mat];
    const ipt = conservatism === "conservative" ? ciptLo : (ciptLo + ciptHi) / 2;
    const ipm = op === "milling" ? rpm * ipt * flutes : rpm * ipt * 0.5; // turning approximation
    return { rpm, ipm, ipt, sfm };
  }, [op, tool, mat, dIn, flutes, conservatism]);

  return (
    <SolverShell title="CNC Feed & Speed Calculator" category="Machining" formula="RPM = (SFM · 3.82) / Ø · IPM = RPM · Chip Load · Flutes">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Setup</h2>
          <div className="space-y-3">
            <Select label="Operation" value={op} onChange={setOp} options={[{ value: "milling", label: "Milling" }, { value: "turning", label: "Turning" }]} />
            <Select label="Tool material" value={tool} onChange={setTool} options={[{ value: "carbide", label: "Carbide" }, { value: "hss", label: "HSS" }]} />
            <Select label="Workpiece material" value={mat} onChange={setMat} options={MATERIALS} />
            <Input label={op === "milling" ? "Tool diameter" : "Workpiece diameter"} unit="in" value={dIn} onChange={setDIn} step={0.01} />
            {op === "milling" && <Input label="Number of flutes" value={flutes} onChange={setFlutes} step={1} min={1} max={10} />}
            <Select label="Conservatism" value={conservatism} onChange={setConservatism} options={[{ value: "aggressive", label: "Aggressive (mid of Machinery's Handbook range)" }, { value: "conservative", label: "Conservative (low end)" }]} />
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Spindle speed" value={Math.round(rpm).toLocaleString()} unit="RPM" />
          <Result label="Feed rate" value={ipm.toFixed(2)} unit="IPM" />
          <Result label="Chip load per tooth" value={ipt.toFixed(4)} unit="IPT" tone="amber" />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Machinist reference</div>
            <div className="text-xs font-mono space-y-1">
              <div>Surface speed: {sfm.toFixed(0)} SFM ({(sfm * 0.3048).toFixed(0)} m/min)</div>
              <div>Metric feed: {(ipm * 25.4).toFixed(1)} mm/min</div>
              <div>Metric RPM: same value</div>
              <div className="text-slate-500 pt-1">Start conservative, tune up. Watch chip color (blue = burning, silver = good) and listen for chatter.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
