// Client-side CAD parsing.
// - STL, OBJ: real geometry via three-stdlib.
// - STEP: real geometry via occt-import-js WASM (loaded on demand).
// - Others: synthetic fallback (hash-based estimate) so the demo always shows numbers.

export interface ParsedCad {
  volumeCm3: number;
  bboxMm: { x: number; y: number; z: number };
  triangleCount: number;
  filename: string;
  fileSize: number;
  hash: string;
  isReal: boolean;
  parser: "stl" | "step" | "obj" | "synthetic";
}

export async function parseCad(file: File): Promise<ParsedCad> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const buf = await file.arrayBuffer();
  const hash = await sha256Hex(buf);

  if (ext === "stl") {
    try { return await parseStl(file, buf, hash); } catch { /* fall through */ }
  }
  if (ext === "obj") {
    try { return parseObjText(await file.text(), file, hash); } catch { /* fall through */ }
  }
  if (ext === "step" || ext === "stp") {
    try { return await parseStep(file, buf, hash); } catch { /* fall through */ }
  }
  return synthetic(file, hash, ext);
}

async function parseStl(file: File, buf: ArrayBuffer, hash: string): Promise<ParsedCad> {
  const { STLLoader } = await import("three-stdlib");
  const loader = new STLLoader();
  const geom = loader.parse(buf);
  geom.computeBoundingBox();
  const bb = geom.boundingBox!;
  const bboxMm = { x: bb.max.x - bb.min.x, y: bb.max.y - bb.min.y, z: bb.max.z - bb.min.z };
  const positions = geom.attributes.position.array as Float32Array;
  let vol = 0;
  for (let i = 0; i < positions.length; i += 9) {
    const ax = positions[i], ay = positions[i + 1], az = positions[i + 2];
    const bx = positions[i + 3], by = positions[i + 4], bz = positions[i + 5];
    const cx = positions[i + 6], cy = positions[i + 7], cz = positions[i + 8];
    vol += (ax * (by * cz - bz * cy) + bx * (cy * az - cz * ay) + cx * (ay * bz - az * by)) / 6;
  }
  return {
    volumeCm3: Math.abs(vol) / 1000,
    bboxMm: { x: r(bboxMm.x), y: r(bboxMm.y), z: r(bboxMm.z) },
    triangleCount: positions.length / 9,
    filename: file.name,
    fileSize: file.size,
    hash,
    isReal: true,
    parser: "stl",
  };
}

function parseObjText(text: string, file: File, hash: string): ParsedCad {
  const vs: [number, number, number][] = [];
  let triCount = 0;
  const bb = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  let vol = 0;
  for (const line of text.split("\n")) {
    if (line.startsWith("v ")) {
      const p = line.trim().split(/\s+/).slice(1, 4).map(Number) as [number, number, number];
      vs.push(p);
      for (let i = 0; i < 3; i++) { bb.min[i] = Math.min(bb.min[i], p[i]); bb.max[i] = Math.max(bb.max[i], p[i]); }
    } else if (line.startsWith("f ")) {
      const idx = line.trim().split(/\s+/).slice(1).map((s) => Number(s.split("/")[0]) - 1);
      for (let i = 1; i < idx.length - 1; i++) {
        const a = vs[idx[0]], b = vs[idx[i]], c = vs[idx[i + 1]];
        if (!a || !b || !c) continue;
        vol += (a[0] * (b[1] * c[2] - b[2] * c[1]) + b[0] * (c[1] * a[2] - c[2] * a[1]) + c[0] * (a[1] * b[2] - a[2] * b[1])) / 6;
        triCount++;
      }
    }
  }
  return {
    volumeCm3: Math.abs(vol) / 1000,
    bboxMm: { x: r(bb.max[0] - bb.min[0]), y: r(bb.max[1] - bb.min[1]), z: r(bb.max[2] - bb.min[2]) },
    triangleCount: triCount,
    filename: file.name,
    fileSize: file.size,
    hash,
    isReal: true,
    parser: "obj",
  };
}

// STEP parsing via occt-import-js (OpenCascade WASM).
let occtPromise: Promise<unknown> | null = null;
async function loadOcct(): Promise<unknown | null> {
  if (occtPromise) return occtPromise;
  occtPromise = (async () => {
    try {
      const mod = await import("occt-import-js");
      const init = mod.default as (opts?: unknown) => Promise<unknown>;
      return await init();
    } catch {
      return null;
    }
  })();
  return occtPromise;
}

async function parseStep(file: File, buf: ArrayBuffer, hash: string): Promise<ParsedCad> {
  const occt = (await loadOcct()) as {
    ReadStepFile: (data: Uint8Array, opts?: unknown) => { success: boolean; meshes: { attributes: { position: { array: number[] } }; index?: { array: number[] } }[] };
  } | null;
  if (!occt) return synthetic(file, hash, "step");
  const result = occt.ReadStepFile(new Uint8Array(buf), null);
  if (!result?.success || !result.meshes.length) return synthetic(file, hash, "step");

  const bb = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  let vol = 0;
  let triCount = 0;
  for (const mesh of result.meshes) {
    const pos = mesh.attributes.position.array;
    const idx = mesh.index?.array;
    // Update bbox
    for (let i = 0; i < pos.length; i += 3) {
      for (let k = 0; k < 3; k++) { bb.min[k] = Math.min(bb.min[k], pos[i + k]); bb.max[k] = Math.max(bb.max[k], pos[i + k]); }
    }
    // Volume via signed tetra sums (per triangle)
    if (idx) {
      for (let i = 0; i < idx.length; i += 3) {
        const ax = pos[idx[i] * 3], ay = pos[idx[i] * 3 + 1], az = pos[idx[i] * 3 + 2];
        const bx = pos[idx[i + 1] * 3], by = pos[idx[i + 1] * 3 + 1], bz = pos[idx[i + 1] * 3 + 2];
        const cx = pos[idx[i + 2] * 3], cy = pos[idx[i + 2] * 3 + 1], cz = pos[idx[i + 2] * 3 + 2];
        vol += (ax * (by * cz - bz * cy) + bx * (cy * az - cz * ay) + cx * (ay * bz - az * by)) / 6;
        triCount++;
      }
    } else {
      for (let i = 0; i < pos.length; i += 9) {
        vol += (pos[i] * (pos[i + 4] * pos[i + 8] - pos[i + 5] * pos[i + 7]) + pos[i + 3] * (pos[i + 7] * pos[i + 2] - pos[i + 8] * pos[i + 1]) + pos[i + 6] * (pos[i + 1] * pos[i + 5] - pos[i + 2] * pos[i + 4])) / 6;
        triCount++;
      }
    }
  }
  return {
    volumeCm3: Math.abs(vol) / 1000,
    bboxMm: { x: r(bb.max[0] - bb.min[0]), y: r(bb.max[1] - bb.min[1]), z: r(bb.max[2] - bb.min[2]) },
    triangleCount: triCount,
    filename: file.name,
    fileSize: file.size,
    hash,
    isReal: true,
    parser: "step",
  };
}

function synthetic(file: File, hash: string, ext: string): ParsedCad {
  const seed = hashStr(file.name);
  const volumeCm3 = 12 + (seed % 180);
  const bboxMm = { x: 30 + (seed % 90), y: 20 + ((seed >> 4) % 80), z: 15 + ((seed >> 8) % 60) };
  return {
    volumeCm3,
    bboxMm,
    triangleCount: 5000 + (seed % 45000),
    filename: file.name,
    fileSize: file.size,
    hash,
    isReal: false,
    parser: ext === "step" || ext === "stp" ? "step" : "synthetic",
  };
}

async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const h = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
  }
  return "";
}
function hashStr(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
function r(n: number): number { return Math.round(n * 100) / 100; }
