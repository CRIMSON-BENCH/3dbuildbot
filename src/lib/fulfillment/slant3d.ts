// Slant 3D fulfillment integration.
// Docs: https://www.slant3dapi.com/  (endpoints assumed against the published
// public API — verify with your account docs and adjust if needed).
//
// Slant 3D handles US-based FDM print + ship. You POST a public STL URL, a
// material, and a shipping address; they print + ship direct to the customer.
// You never touch the physical part.
//
// This module is intentionally minimal — a thin client + one dispatch helper.
// The file-hosting piece (getting a public URL for the STL) is left for the
// order flow to solve (Vercel Blob, S3, or similar) since the site currently
// parses CAD client-side and doesn't persist the bytes.

const API_BASE = "https://www.slant3dapi.com/api";

export interface Slant3dAddress {
  name: string;
  phone?: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string; // 2-letter US state code
  zip: string;
  country?: string; // defaults to "US"
}

export interface Slant3dEstimateInput {
  fileUrl: string; // publicly reachable URL to a .stl
  filament?: string; // e.g. "PLA", "PETG", "ABS", "TPU"
  quantity?: number;
}

export interface Slant3dEstimateResponse {
  price: number; // USD
  currency: "USD";
  filament: string;
  weight_g?: number;
  print_time_min?: number;
}

export interface Slant3dOrderInput extends Slant3dEstimateInput {
  address: Slant3dAddress;
  orderNumber?: string; // your internal orderId — surfaces on Slant's side
  color?: string;
}

export interface Slant3dOrderResponse {
  orderId: string;
  status: "queued" | "printing" | "shipped" | string;
  estimatedShipDate?: string;
  trackingNumber?: string;
  carrier?: string;
}

function apiKey(): string {
  const k = process.env.SLANT3D_API_KEY;
  if (!k) throw new Error("SLANT3D_API_KEY not set");
  return k;
}

async function req<T>(path: string, method: "GET" | "POST", body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "api-key": apiKey(),
      "content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Slant 3D ${method} ${path} failed: ${res.status} ${txt.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

export const slant3d = {
  isEnabled: () => !!process.env.SLANT3D_API_KEY,

  estimate: (input: Slant3dEstimateInput) =>
    req<Slant3dEstimateResponse>("/order/estimate", "POST", {
      fileURL: input.fileUrl,
      filament: input.filament ?? "PLA",
      quantity: input.quantity ?? 1,
    }),

  placeOrder: (input: Slant3dOrderInput) =>
    req<Slant3dOrderResponse>("/order", "POST", {
      fileURL: input.fileUrl,
      filament: input.filament ?? "PLA",
      quantity: input.quantity ?? 1,
      color: input.color,
      customerName: input.address.name,
      customerEmail: input.address.email,
      customerPhone: input.address.phone,
      addressLine1: input.address.addressLine1,
      addressLine2: input.address.addressLine2,
      city: input.address.city,
      state: input.address.state,
      zip: input.address.zip,
      country: input.address.country ?? "US",
      orderNumber: input.orderNumber,
    }),

  getTracking: (slantOrderId: string) =>
    req<{ trackingNumber?: string; carrier?: string; status?: string }>(
      `/order/${encodeURIComponent(slantOrderId)}/get-tracking`,
      "GET"
    ),

  getStatus: (slantOrderId: string) =>
    req<Slant3dOrderResponse>(`/order/${encodeURIComponent(slantOrderId)}`, "GET"),
};

// Map our internal material slug to a Slant 3D filament code.
// Slant 3D primarily runs FDM in PLA/PETG/ABS/TPU/ASA. Adjust if their menu changes.
export function slant3dFilamentFor(materialSlug: string): string | null {
  const m = materialSlug.toLowerCase();
  if (m.includes("pla")) return "PLA";
  if (m.includes("petg")) return "PETG";
  if (m.includes("abs")) return "ABS";
  if (m.includes("tpu")) return "TPU";
  if (m.includes("asa")) return "ASA";
  return null; // unsupported by Slant 3D — needs different fulfillment
}

export function isSlant3dEligibleProcess(processSlug: string): boolean {
  return processSlug === "fdm";
}
