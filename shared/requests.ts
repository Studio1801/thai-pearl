// Checks what a guest sent from the website. Used by the server and the offline preview.
import type { GuestRequest, RequestKind } from "./model";

const KINDS: RequestKind[] = ["reservation", "mealprep", "catering", "party", "job", "newsletter"];
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function cleanRequest(input: Record<string, unknown>): Omit<GuestRequest, "id" | "createdAt" | "status"> | string {
  const kind = input.kind as RequestKind;
  if (!KINDS.includes(kind)) return "Unknown request";
  const name = str(input.name, 60);
  const phone = str(input.phone, 30).replace(/[^\d+()\-\s]/g, "");
  const email = str(input.email, 120);
  const emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return "That email address doesn't look right.";
  if (kind === "newsletter") {
    if (!email) return "Please add your email.";
  } else {
    if (name.length < 2) return "Please add your name.";
    if (phone.replace(/\D/g, "").length < 10) return "Please add a phone number we can text or call.";
  }
  const date = typeof input.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input.date) ? input.date : undefined;
  if ((kind === "reservation" || kind === "catering" || kind === "party" || kind === "mealprep") && !date) return "Please pick a date.";
  const guests = Number(input.guests);
  const details = Array.isArray(input.details)
    ? (input.details as { label?: unknown; value?: unknown }[])
        .slice(0, 30)
        .map((d) => ({ label: str(d?.label, 40), value: str(d?.value, 300) }))
        .filter((d) => d.value)
    : [];
  const total = Number(input.total);
  return {
    kind,
    name: name || email.split("@")[0],
    phone,
    email,
    date,
    time: str(input.time, 20) || undefined,
    guests: Number.isFinite(guests) && guests > 0 ? Math.min(500, Math.round(guests)) : undefined,
    note: str(input.note, 600) || undefined,
    details,
    total: Number.isFinite(total) && total > 0 ? Math.round(total * 100) / 100 : undefined,
  };
}
