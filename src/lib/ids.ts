import { nanoid } from "nanoid";

const alpha = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const newId = (prefix: string) => `${prefix}_${nanoid(12)}`;
export const userId = () => newId("usr");
export const teamId = () => newId("tm");
export const partId = () => newId("part");
export const quoteId = () => `QT-${dateStamp()}-${randomAlpha(5)}`;
export const orderId = () => `ORD-${dateStamp()}-${randomAlpha(5)}`;
export const apiKeyPlain = () => `sk_live_${nanoid(28)}`;
export const testKeyPlain = () => `sk_test_${nanoid(28)}`;

function randomAlpha(len: number) {
  let s = "";
  for (let i = 0; i < len; i++) s += alpha[Math.floor(Math.random() * alpha.length)];
  return s;
}

function dateStamp() {
  const d = new Date();
  return `${d.getUTCFullYear().toString().slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
}
