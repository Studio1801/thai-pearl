import crypto from "node:crypto";
import { SEED } from "../../shared/seed";
import type { Settings } from "../../shared/model";
import { read } from "./store";

export const SETTINGS_KEY = "site/settings.json";
export const ordersKey = (day: string) => `orders/${day}.json`;

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}

export const fail = (message: string, status = 400) => json({ error: message }, status);

/** Dashboard PIN. Set DASHBOARD_PIN in Vercel. Local dev falls back to 1801. */
export function isOwner(req: Request) {
  const expected = process.env.DASHBOARD_PIN ?? (process.env.VERCEL ? "" : "1801");
  const given = req.headers.get("x-pin") ?? "";
  if (!expected || !given) return false;
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function loadSettings(): Promise<Settings> {
  const stored = await read<Settings>(SETTINGS_KEY);
  return stored ?? structuredClone(SEED);
}

export async function body<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}
