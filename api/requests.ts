/// <reference types="node" />
/// <reference lib="dom" />
// POST  /api/requests -> a guest books a table, orders meal prep, asks about catering
//                        or a party, applies for a job, or joins the newsletter
// GET   /api/requests -> the dashboard's inbox (needs the PIN)
// PATCH /api/requests -> dashboard confirms, declines or closes one

import crypto from "node:crypto";
import type { GuestRequest, RequestStatus } from "../shared/model";
import { body, fail, isOwner, json } from "./_lib/http";
import { read, update } from "./_lib/store";
import { cleanRequest } from "../shared/requests";

const KEY = "requests/all.json";
const KEEP = 600;

export async function GET(req: Request) {
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  const list = (await read<GuestRequest[]>(KEY)) ?? [];
  return json({ requests: list });
}

export async function POST(req: Request) {
  const input = await body<Record<string, unknown>>(req);
  if (!input) return fail("Nothing was sent");
  if (input.company) return json({ id: "ok" }); // honeypot
  const clean = cleanRequest(input);
  if (typeof clean === "string") return fail(clean);
  const item: GuestRequest = { ...clean, id: crypto.randomUUID().slice(0, 12), createdAt: new Date().toISOString(), status: "new" };
  await update<GuestRequest[], void>(KEY, () => [], (list) => {
    list.unshift(item);
    list.splice(KEEP);
  });
  return json({ id: item.id }, 201);
}

export async function PATCH(req: Request) {
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  const input = await body<{ id?: string; status?: RequestStatus }>(req);
  const ok: RequestStatus[] = ["new", "confirmed", "declined", "done"];
  if (!input?.id || !input.status || !ok.includes(input.status)) return fail("Bad update");
  const { result } = await update<GuestRequest[], GuestRequest | null>(KEY, () => [], (list) => {
    const r = list.find((x) => x.id === input.id);
    if (r) r.status = input.status as RequestStatus;
    return r ?? null;
  });
  return result ? json(result) : fail("Not found", 404);
}

