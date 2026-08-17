"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

const MATS = [
  { value: "al-6061", label: "Aluminum 6061-T6", sy: 276, allow: 165 },
  { value: "al-7075", label: "Aluminum 7075-T6", sy: 503, allow: 300 },
  { value: "1018", label: "Mild Steel 1018", sy: 370, allow: 220 },
  { value: "4130", label: "4130 Steel", sy: 435, allow: 260 },
  { value: "ss-304", label: "Stainless 304", sy: 215, allow: 130 },
  { value: "ss-316", label: "Stainless 316L", sy: 205, allow: 125 },
  { value: "ti-64", label: "Ti-6Al-4V", sy: 880, allow: 480 },
  { value: "inconel-718", label: "Inconel 718", sy: 1035, allow: 620 },
];

type Shape = "cylinder" | "sphere";

export function PressureVesselSolver() {
  const [shape, setShape] = useState<Shape>("cylinder");
  const [P, setP] = useState(2); // MPa (about 290 psi)
  const [D, setD] = useState(100); // mm inner diameter
  const [t, setT] = useState(3); // mm wall thickness
  const [mat, setMat] = useState("al-6061");
  const [sf, setSF] = useState(3.0);

  const m = MATS.find((x) => x.value === mat)!;
  const hoop = shape === "cylinder" ? (P * D) / (2 * t) : (P * D) / (4 * t);
  const longitudinal = shape === "cylinder" ? (P * D) / (4 * t) : (P * D) / (4 * t);
  const vonMises = Math.sqrt(hoop ** 2 - hoop * longitudinal + longitudinal ** 2);
  const actualSF = m.sy / vonMises;
  const passing = actualSF >= sf;
  const minWall = shape === "cylinder" ? (P * D * sf) / (2 * m.sy) : (P * D * sf) / (4 * m.sy);

  const D_over_t = D / t;
  const thinWallValid = D_over_t >= 10;

  return (
    <SolverShell title="Thin-Wall Pressure Vessel" category="Mechanics" formula="σ_hoop = PD/(2t) (cylinder) · σ_hoop = PD/(4t) (sphere)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Vessel geometry</h2>
          <div className="space-y-3">
            <Select label="Geometry" value={shape} onChange={setShape} options={[{ value: "cylinder" as Shape, label: "Cylindrical" }, { value: "sphere" as Shape, label: "Spherical" }]} />
            <Input label="Internal pressure P" unit="MPa" value={P} onChange={setP} step={0.1} />
            <Input label="Inner diameter D" unit="mm" value={D} onChange={setD} />
            <Input label="Wall thickness t" unit="mm" value={t} onChange={setT} step={0.1} />
            <Select label="Material" value={mat} onChange={setMat} options={MATS} />
            <Input label="Required safety factor" value={sf} onChange={setSF} step={0.1} min={1} max={10} />
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Hoop stress σ_hoop" value={hoop.toFixed(1)} unit="MPa" tone={hoop > m.allow ? "red" : "brand"} />
          <Result label="Longitudinal stress σ_long" value={longitudinal.toFixed(1)} unit="MPa" />
          <Result label={`Actual SF (yield/von Mises) — ${passing ? "PASS ✓" : "FAIL ✗"}`} value={actualSF.toFixed(2)} tone={passing ? "green" : "red"} />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Details</div>
            <div className="text-xs font-mono space-y-1">
              <div>von Mises stress = {vonMises.toFixed(1)} MPa</div>
              <div>Material yield σ_y = {m.sy} MPa</div>
              <div>Recommended min wall (SF {sf}) = {minWall.toFixed(2)} mm</div>
              <div>D/t = {D_over_t.toFixed(1)} {thinWallValid ? "(thin-wall theory valid)" : "⚠ D/t < 10 — use thick-wall theory"}</div>
              <div className="text-slate-500 pt-1">For code-compliant design use ASME BPVC Section VIII. Add corrosion allowance + weld efficiency factor.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
