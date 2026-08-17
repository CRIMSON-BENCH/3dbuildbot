"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

// Roots β_n × L for beam eigenfrequencies
const BEAMS = [
  { value: "cantilever", label: "Cantilever (fixed-free)", roots: [1.875, 4.694, 7.855] },
  { value: "simply-supported", label: "Simply-supported (pinned-pinned)", roots: [Math.PI, 2 * Math.PI, 3 * Math.PI] },
  { value: "fixed-fixed", label: "Fixed-fixed (clamped-clamped)", roots: [4.730, 7.853, 10.996] },
  { value: "fixed-pinned", label: "Fixed-pinned", roots: [3.927, 7.069, 10.210] },
];

const MATS = [
  { value: "al-6061", label: "Aluminum 6061", E: 68900, rho: 2700 },
  { value: "al-7075", label: "Aluminum 7075", E: 71700, rho: 2810 },
  { value: "steel-1018", label: "Steel 1018", E: 200000, rho: 7870 },
  { value: "ti-64", label: "Ti-6Al-4V", E: 113800, rho: 4430 },
  { value: "pa-cf", label: "PA-CF Nylon", E: 4700, rho: 1160 },
  { value: "pla", label: "PLA", E: 3500, rho: 1240 },
  { value: "peek", label: "PEEK", E: 3600, rho: 1320 },
];

export function NatFreqSolver() {
  const [beam, setBeam] = useState("cantilever");
  const [mat, setMat] = useState("al-6061");
  const [L, setL] = useState(200); // mm
  const [b, setB] = useState(20); // mm
  const [h, setH] = useState(5);  // mm

  const beamData = BEAMS.find((x) => x.value === beam)!;
  const m = MATS.find((x) => x.value === mat)!;
  // Convert units to SI internally
  const L_m = L / 1000;
  const b_m = b / 1000;
  const h_m = h / 1000;
  const I_m4 = (b_m * h_m ** 3) / 12; // m⁴
  const A_m2 = b_m * h_m;
  const mass_per_length = m.rho * A_m2; // kg/m
  const E_pa = m.E * 1e6; // Pa

  const freqs = beamData.roots.map((beta) => (beta ** 2 / (2 * Math.PI)) * Math.sqrt((E_pa * I_m4) / (mass_per_length * L_m ** 4)));

  return (
    <SolverShell title="Beam Natural Frequency" category="Mechanics" formula="f_n = (β_n² / 2π) · √(EI / mL⁴)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Beam setup</h2>
          <div className="space-y-3">
            <Select label="End conditions" value={beam} onChange={setBeam} options={BEAMS} />
            <Select label="Material" value={mat} onChange={setMat} options={MATS} />
            <Input label="Length L" unit="mm" value={L} onChange={setL} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Width b" unit="mm" value={b} onChange={setB} />
              <Input label="Height h" unit="mm" value={h} onChange={setH} />
            </div>
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="1st mode (f₁)" value={freqs[0].toFixed(1)} unit="Hz" />
          <Result label="2nd mode (f₂)" value={freqs[1].toFixed(1)} unit="Hz" />
          <Result label="3rd mode (f₃)" value={freqs[2].toFixed(1)} unit="Hz" />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Design rule</div>
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <div>Keep excitation frequency away from any f_n by at least ±20% (design rule of thumb).</div>
              <div>For safety-critical, use FEA modal analysis + verify with impact test on the physical part.</div>
              <div className="text-slate-500 pt-1">Formula assumes uniform cross-section and linear-elastic behavior.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
