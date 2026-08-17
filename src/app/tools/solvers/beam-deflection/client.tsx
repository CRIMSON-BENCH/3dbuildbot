"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

type Support = "cantilever-point-tip" | "cantilever-udl" | "simply-supported-center" | "simply-supported-udl" | "fixed-fixed-center" | "fixed-fixed-udl";

const CASES: { value: Support; label: string; formulaMax: string }[] = [
  { value: "cantilever-point-tip", label: "Cantilever, point load at tip", formulaMax: "δ = FL³/(3EI)" },
  { value: "cantilever-udl", label: "Cantilever, uniform distributed load", formulaMax: "δ = wL⁴/(8EI)" },
  { value: "simply-supported-center", label: "Simply-supported, point at center", formulaMax: "δ = FL³/(48EI)" },
  { value: "simply-supported-udl", label: "Simply-supported, uniform load", formulaMax: "δ = 5wL⁴/(384EI)" },
  { value: "fixed-fixed-center", label: "Fixed-fixed, point at center", formulaMax: "δ = FL³/(192EI)" },
  { value: "fixed-fixed-udl", label: "Fixed-fixed, uniform load", formulaMax: "δ = wL⁴/(384EI)" },
];

// Common material E in MPa
const MATERIALS = [
  { value: "aluminum-6061", label: "Aluminum 6061", E: 68900 },
  { value: "aluminum-7075", label: "Aluminum 7075", E: 71700 },
  { value: "steel-1018", label: "Mild Steel (1018)", E: 200000 },
  { value: "stainless-316", label: "Stainless 316L", E: 200000 },
  { value: "titanium-64", label: "Titanium Ti-6Al-4V", E: 113800 },
  { value: "pla", label: "PLA (3D-printed)", E: 3500 },
  { value: "pc", label: "Polycarbonate", E: 2400 },
  { value: "pa-cf", label: "Carbon-Fiber Nylon", E: 4700 },
  { value: "peek", label: "PEEK", E: 3600 },
  { value: "delrin", label: "Delrin / POM-C", E: 3100 },
];

// Common cross-sections → I in mm⁴
type Cx = "rect" | "circle" | "hollow-circle" | "custom";
const SECTIONS: { value: Cx; label: string }[] = [
  { value: "rect", label: "Rectangle b × h" },
  { value: "circle", label: "Solid circle Ø" },
  { value: "hollow-circle", label: "Hollow tube (Øo, Øi)" },
  { value: "custom", label: "Custom I (mm⁴)" },
];

export function BeamDeflectionSolver() {
  const [supportType, setSupportType] = useState<Support>("cantilever-point-tip");
  const [mat, setMat] = useState("aluminum-6061");
  const [section, setSection] = useState<Cx>("rect");
  const [b, setB] = useState(20); // mm
  const [h, setH] = useState(10); // mm
  const [dOut, setDOut] = useState(20); // mm
  const [dIn, setDIn] = useState(15); // mm
  const [customI, setCustomI] = useState(1000);
  const [L, setL] = useState(200); // mm
  const [load, setLoad] = useState(100); // N or N/mm

  const E = MATERIALS.find((m) => m.value === mat)!.E; // MPa = N/mm²
  const I = useMemo(() => {
    if (section === "rect") return (b * h ** 3) / 12;
    if (section === "circle") return (Math.PI * dOut ** 4) / 64;
    if (section === "hollow-circle") return (Math.PI * (dOut ** 4 - dIn ** 4)) / 64;
    return customI;
  }, [section, b, h, dOut, dIn, customI]);

  const c = section === "rect" ? h / 2 : dOut / 2;
  const S = I / c; // section modulus

  const { deflection, maxMoment } = useMemo(() => {
    switch (supportType) {
      case "cantilever-point-tip": return { deflection: (load * L ** 3) / (3 * E * I), maxMoment: load * L };
      case "cantilever-udl": return { deflection: (load * L ** 4) / (8 * E * I), maxMoment: (load * L ** 2) / 2 };
      case "simply-supported-center": return { deflection: (load * L ** 3) / (48 * E * I), maxMoment: (load * L) / 4 };
      case "simply-supported-udl": return { deflection: (5 * load * L ** 4) / (384 * E * I), maxMoment: (load * L ** 2) / 8 };
      case "fixed-fixed-center": return { deflection: (load * L ** 3) / (192 * E * I), maxMoment: (load * L) / 8 };
      case "fixed-fixed-udl": return { deflection: (load * L ** 4) / (384 * E * I), maxMoment: (load * L ** 2) / 12 };
    }
  }, [supportType, load, L, E, I]);

  const stress = maxMoment / S; // MPa
  const isUDL = supportType.endsWith("-udl");
  const loadLabel = isUDL ? "Distributed load w (N/mm)" : "Point load F (N)";
  const supportInfo = CASES.find((c) => c.value === supportType)!;

  return (
    <SolverShell title="Beam Deflection Calculator" category="Mechanics" formula={supportInfo.formulaMax}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Inputs</h2>
          <div className="space-y-3">
            <Select label="Support / load case" value={supportType} onChange={setSupportType} options={CASES} />
            <Select label="Material" value={mat} onChange={setMat} options={MATERIALS} />
            <Select label="Cross-section" value={section} onChange={setSection} options={SECTIONS} />
            {section === "rect" && (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Width b" unit="mm" value={b} onChange={setB} />
                <Input label="Height h" unit="mm" value={h} onChange={setH} />
              </div>
            )}
            {section === "circle" && <Input label="Diameter Ø" unit="mm" value={dOut} onChange={setDOut} />}
            {section === "hollow-circle" && (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Outer Ø" unit="mm" value={dOut} onChange={setDOut} />
                <Input label="Inner Ø" unit="mm" value={dIn} onChange={setDIn} />
              </div>
            )}
            {section === "custom" && <Input label="Custom I" unit="mm⁴" value={customI} onChange={setCustomI} />}
            <Input label="Length L" unit="mm" value={L} onChange={setL} />
            <Input label={loadLabel} value={load} onChange={setLoad} />
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Max deflection δ" value={deflection.toFixed(4)} unit="mm" tone={deflection / L > 0.01 ? "amber" : "brand"} />
          <Result label="Max bending moment M" value={maxMoment.toFixed(2)} unit="N·mm" />
          <Result label="Max bending stress σ" value={stress.toFixed(2)} unit="MPa" tone={stress > 250 ? "red" : "brand"} />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Section properties</div>
            <div className="text-xs font-mono space-y-1">
              <div>I = {I.toFixed(2)} mm⁴</div>
              <div>S = I/c = {S.toFixed(2)} mm³</div>
              <div>E = {E.toLocaleString()} MPa</div>
              <div>δ/L = {((deflection / L) * 100).toFixed(3)}% ({deflection / L > 0.01 ? "⚠ over 1%" : "acceptable"})</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
