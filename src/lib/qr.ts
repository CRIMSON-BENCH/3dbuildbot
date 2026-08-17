// QR code generation. Returns a data URL so it can be embedded anywhere.
export async function qrDataUrl(text: string): Promise<string> {
  const QRCode = (await import("qrcode")).default;
  return await QRCode.toDataURL(text, { errorCorrectionLevel: "H", margin: 1, width: 240, color: { dark: "#0f172a", light: "#ffffff" } });
}
