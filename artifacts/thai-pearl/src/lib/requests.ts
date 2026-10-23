import type { RequestKind } from "@shared/model";
import { DAY_NAMES, restaurantNow } from "@shared/model";

export type RequestPayload = {
  kind: RequestKind;
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: number;
  note?: string;
  details?: { label: string; value: string }[];
  total?: number;
  company?: string;
};

export async function sendRequest(p: RequestPayload): Promise<string> {
  const res = await fetch("/api/requests", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(p),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "That didn't go through. Please call us instead.");
  return data.id as string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** The next n days in restaurant time, starting today (or tomorrow when from = 1). */
export function nextDays(n: number, from = 0) {
  const today = restaurantNow().day;
  const base = new Date(`${today}T12:00:00Z`);
  return Array.from({ length: n }, (_, k) => {
    const d = new Date(base.getTime() + (k + from) * 864e5);
    const iso = d.toISOString().slice(0, 10);
    const dow = d.getUTCDay();
    return {
      iso,
      dow,
      day: d.getUTCDate(),
      month: MONTHS[d.getUTCMonth()],
      short: DAY_NAMES[dow].slice(0, 3),
      long: `${DAY_NAMES[dow]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`,
      isToday: k + from === 0,
    };
  });
}

export function longDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${DAY_NAMES[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}
