"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

type Shape = "rect" | "hollow-rect" | "circle" | "hollow-circle" | "i-beam" | "channel" | "t-beam";
const SHAPES: { value: Shape; label: string }[] = [
  { value: "rect", label: "Solid rectangle" },
  { value: "hollow-rect", label: "Hollow rectangle (tube)" },
  { value: "circle", label: "Solid circle" },
  { value: "hollow-circle", label: "Hollow circle (tube)" },
  { value: "i-beam", label: "I-beam" },
  { value: "channel", label: "Channel (C-shape)" },
  { value: "t-beam", label: "T-beam" },
];

export function MoISolver() {
  const [shape, setShape] = useState<Shape>("rect");
  const [b, setB] = useState(20);
  const [h, setH] = useState(30);
  const [t, setT] = useState(3);
  const [d, setD] = useState(25);
  const [di, setDi] = useState(20);
  const [bf, setBf] = useState(100); // flange width
  const [tf, setTf] = useState(6);   // flange thickness
  const [tw, setTw] = useState(4);   // web thickness

  const { I, area, c, S } = useMemo(() => {
    let I = 0, area = 0, c = 0;
    if (shape === "rect") { I = (b * h ** 3) / 12; area = b * h; c = h / 2; }
    else if (shape === "hollow-rect") { const bi = b - 2 * t, hi = h - 2 * t; I = (b * h ** 3 - bi * hi ** 3) / 12; area = b * h - bi * hi; c = h / 2; }
    else if (shape === "circle") { I = (Math.PI * d ** 4) / 64; area = (Math.PI * d ** 2) / 4; c = d / 2; }
    else if (shape === "hollow-circle") { I = (Math.PI * (d ** 4 - di ** 4)) / 64; area = (Math.PI * (d ** 2 - di ** 2)) / 4; c = d / 2; }
    else if (shape === "i-beam") { I = (bf * h ** 3 - (bf - tw) * (h - 2 * tf) ** 3) / 12; area = 2 * bf * tf + tw * (h - 2 * tf); c = h / 2; }
    else if (shape === "channel") { const y = ((bf * tf) * (tf / 2) + (tw * (h - tf)) * (tf + (h - tf) / 2) + (bf * tf) * (h - tf / 2)) / (2 * bf * tf + tw * (h - 2 * tf)); I = (bf * tf ** 3) / 12 + bf * tf * (y - tf / 2) ** 2 + (tw * (h - 2 * tf) ** 3) / 12 + tw * (h - 2 * tf) * (h / 2 - y) ** 2 + (bf * tf ** 3) / 12 + bf * tf * (h - tf / 2 - y) ** 2; area = 2 * bf * tf + tw * (h - 2 * tf); c = Math.max(y, h - y); }
    else if (shape === "t-beam") { const A1 = bf * tf, A2 = tw * (h - tf); const y = (A1 * (tf / 2) + A2 * (tf + (h - tf) / 2)) / (A1 + A2); I = (bf * tf ** 3) / 12 + A1 * (y - tf / 2) ** 2 + (tw * (h - tf) ** 3) / 12 + A2 * (tf + (h - tf) / 2 - y) ** 2; area = A1 + A2; c = Math.max(y, h - y); }
    return { I, area, c, S: I / c };
  }, [shape, b, h, t, d, di, bf, tf, tw]);

  const rgy = Math.sqrt(I / area); // radius of gyration

  return (
    <SolverShell title="Second Moment of Area (I)" category="Mechanics" formula="I_rect = bh³/12 · I_circle = πd⁴/64">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Cross-section inputs</h2>
          <div className="space-y-3">
            <Select label="Shape" value={shape} onChange={setShape} options={SHAPES} />
            {(shape === "rect" || shape === "hollow-rect") && (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Width b" unit="mm" value={b} onChange={setB} />
                <Input label="Height h" unit="mm" value={h} onChange={setH} />
              </div>
            )}
            {shape === "hollow-rect" && <Input label="Wall thickness t" unit="mm" value={t} onChange={setT} />}
            {shape === "circle" && <Input label="Diameter Ø" unit="mm" value={d} onChange={setD} />}
            {shape === "hollow-circle" && (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Outer Ø" unit="mm" value={d} onChange={setD} />
                <Input label="Inner Ø" unit="mm" value={di} onChange={setDi} />
              </div>
            )}
            {(shape === "i-beam" || shape === "channel" || shape === "t-beam") && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Flange b" unit="mm" value={bf} onChange={setBf} />
                  <Input label="Height h" unit="mm" value={h} onChange={setH} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Flange t" unit="mm" value={tf} onChange={setTf} />
                  <Input label="Web t" unit="mm" value={tw} onChange={setTw} />
                </div>
              </>
            )}
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="I (second moment)" value={I.toFixed(2)} unit="mm⁴" />
          <Result label="S = I/c (section modulus)" value={S.toFixed(2)} unit="mm³" />
          <Result label="Area A" value={area.toFixed(2)} unit="mm²" />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Derived properties</div>
            <div className="text-xs font-mono space-y-1">
              <div>c (extreme fiber) = {c.toFixed(2)} mm</div>
              <div>r_g (radius of gyration) = {rgy.toFixed(2)} mm</div>
              <div>Slenderness (if L=1m): {(1000 / rgy).toFixed(1)}</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
