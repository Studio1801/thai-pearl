/// <reference lib="dom" />
// POST  /api/orders  -> a guest places a pickup order from the website
// GET   /api/orders  -> today's orders for the dashboard (needs the PIN)
// PATCH /api/orders  -> dashboard moves an order along: cooking, ready, picked up

import crypto from "node:crypto";
import type { Order, OrderLine, OrderStatus } from "../shared/model";
import { findItem, isSoldOut, liveStatus, minutesToISO, pickupSlots, restaurantNow, unitPrice } from "../shared/model";
import { body, fail, isOwner, json, loadSettings, ordersKey } from "./_lib/http";
import { read, update } from "./_lib/store";

type NewOrder = {
  name?: string;
  phone?: string;
  note?: string;
  pickup?: "asap" | number;
  lines?: { itemId: string; qty: number; size?: string; protein?: string; spice?: number }[];
  company?: string; // honeypot, real people never fill it
};

export async function GET(req: Request) {
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  const day = new URL(req.url).searchParams.get("day") ?? restaurantNow().day;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return fail("Bad day");
  const orders = (await read<Order[]>(ordersKey(day))) ?? [];
  return json({ day, orders });
}

export async function POST(req: Request) {
  const input = await body<NewOrder>(req);
  if (!input) return fail("Empty order");
  if (input.company) return json({ id: "ok" }); // quietly drop bots

  const settings = await loadSettings();
  const now = new Date();
  const status = liveStatus(settings, now);
  if (status.ordering === "paused") return fail("The kitchen paused online orders for a few minutes. Please try again shortly or give us a call.", 409);
  if (status.ordering !== "open") return fail("Online pickup orders are closed right now.", 409);

  const name = (input.name ?? "").trim().slice(0, 60);
  const phone = (input.phone ?? "").replace(/[^\d+]/g, "").slice(0, 16);
  if (name.length < 2) return fail("Please add your name.");
  if (phone.replace(/\D/g, "").length < 10) return fail("Please add a phone number we can text or call.");
  if (!Array.isArray(input.lines) || !input.lines.length) return fail("Your bag is empty.");
  if (input.lines.length > 30) return fail("That's a big order, please call us for catering.");

  const lines: OrderLine[] = [];
  for (const l of input.lines) {
    const item = findItem(settings, String(l.itemId));
    if (!item || item.hidden) return fail("Something in your bag isn't on the menu anymore.");
    if (isSoldOut(item, now)) return fail(`Sorry, ${item.name} just sold out for today.`);
    const qty = Math.min(20, Math.max(1, Math.floor(Number(l.qty) || 1)));
    const size = item.sizes?.length ? (item.sizes.find((z) => z.label === l.size) ?? item.sizes[0]).label : undefined;
    const protein = item.protein ? (settings.proteins.find((p) => p.label === l.protein) ?? settings.proteins[0])?.label : undefined;
    const spice = l.spice ? Math.min(5, Math.max(1, Math.floor(Number(l.spice)))) : undefined;
    lines.push({ itemId: item.id, name: item.name, qty, size, protein, spice, unit: unitPrice(item, settings.proteins, size, protein) });
  }

  let pickupAt: string;
  let asap = false;
  if (input.pickup === "asap" || input.pickup === undefined) {
    asap = true;
    pickupAt = minutesToISO(status.earliest, now);
  } else {
    const slots = pickupSlots(settings, now);
    if (!slots.includes(Number(input.pickup))) return fail("That pickup time just passed, please pick another.");
    pickupAt = minutesToISO(Number(input.pickup), now);
  }

  const day = restaurantNow(now).day;
  const subtotal = Math.round(lines.reduce((s, l) => s + l.unit * l.qty, 0) * 100) / 100;
  const id = day.replace(/-/g, "") + crypto.randomBytes(6).toString("base64url").replace(/[-_]/g, "x").toLowerCase();

  const { result } = await update<Order[], Order>(ordersKey(day), () => [], (orders) => {
    const order: Order = {
      id,
      number: orders.length + 1,
      day,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      pickupAt,
      asap,
      name,
      phone,
      note: (input.note ?? "").trim().slice(0, 300) || undefined,
      lines,
      subtotal,
      status: "new",
    };
    orders.push(order);
    return order;
  });

  return json({ id: result.id, number: result.number }, 201);
}

const FLOW: OrderStatus[] = ["new", "cooking", "ready", "done", "cancelled"];

export async function PATCH(req: Request) {
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  const input = await body<{ id?: string; status?: OrderStatus }>(req);
  if (!input?.id || !input.status || !FLOW.includes(input.status)) return fail("Bad update");
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(input.id);
  if (!m) return fail("Bad order id");
  const day = `${m[1]}-${m[2]}-${m[3]}`;
  let found: Order | undefined;
  await update<Order[], void>(ordersKey(day), () => [], (orders) => {
    found = orders.find((o) => o.id === input.id);
    if (found) {
      found.status = input.status!;
      found.updatedAt = new Date().toISOString();
    }
  });
  if (!found) return fail("Order not found", 404);
  return json(found);
}
