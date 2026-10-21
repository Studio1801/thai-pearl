// Offline preview only. Answers the /api calls inside the browser so the site
// and dashboard can be demoed without a server. State lives in localStorage,
// so a website tab and a dashboard tab (or two iframes) stay in sync.

import type { Order, OrderLine, OrderStatus, PublicOrder, Settings } from "@shared/model";
import {
  clock,
  findItem,
  isSoldOut,
  liveStatus,
  minutesToISO,
  pickupSlots,
  restaurantNow,
  setClockOffset,
  toMinutes,
  unitPrice,
} from "@shared/model";
import { SEED } from "@shared/seed";

const PIN = "1801";
const SETTINGS = "tp-demo-settings";
const ordersKey = (day: string) => `tp-demo-orders-${day}`;
const memory = new Map<string, string>();

function load<T>(key: string, fallback: () => T): T {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    raw = memory.get(key) ?? null;
  }
  return raw ? (JSON.parse(raw) as T) : fallback();
}
function save(key: string, value: unknown) {
  const raw = JSON.stringify(value);
  try {
    localStorage.setItem(key, raw);
  } catch {
    memory.set(key, raw);
  }
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
const fail = (error: string, status = 400) => json({ error }, status);
const owner = (init?: RequestInit) => new Headers(init?.headers).get("x-pin") === PIN;
const settings = () => load<Settings>(SETTINGS, () => structuredClone(SEED));

async function handle(path: string, url: URL, init: RequestInit = {}): Promise<Response> {
  const method = (init.method ?? "GET").toUpperCase();
  const body = () => (typeof init.body === "string" ? JSON.parse(init.body) : {});
  await new Promise((r) => setTimeout(r, 120)); // feel like a network

  if (path === "login") return owner(init) ? json({ ok: true }) : fail("That PIN didn't work", 401);

  if (path === "site") {
    if (method === "GET") return json(settings());
    if (!owner(init)) return fail("Wrong PIN", 401);
    const next = { ...body(), updatedAt: clock().toISOString() } as Settings;
    save(SETTINGS, next);
    return json(next);
  }

  if (path === "orders") {
    if (method === "GET") {
      if (!owner(init)) return fail("Wrong PIN", 401);
      const day = url.searchParams.get("day") ?? restaurantNow().day;
      return json({ day, orders: load<Order[]>(ordersKey(day), () => []) });
    }
    if (method === "PATCH") {
      if (!owner(init)) return fail("Wrong PIN", 401);
      const { id, status } = body() as { id: string; status: OrderStatus };
      const day = `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;
      const orders = load<Order[]>(ordersKey(day), () => []);
      const o = orders.find((x) => x.id === id);
      if (!o) return fail("Order not found", 404);
      o.status = status;
      o.updatedAt = clock().toISOString();
      save(ordersKey(day), orders);
      return json(o);
    }
    // POST: same checks as the real server
    const input = body() as {
      name?: string;
      phone?: string;
      note?: string;
      pickup?: "asap" | number;
      lines?: { itemId: string; qty: number; size?: string; protein?: string; spice?: number }[];
    };
    const s = settings();
    const now = clock();
    const st = liveStatus(s, now);
    if (st.ordering === "paused") return fail("The kitchen paused online orders for a few minutes. Please try again shortly or give us a call.", 409);
    if (st.ordering !== "open") return fail("Online pickup orders are closed right now.", 409);
    const name = (input.name ?? "").trim();
    const phone = (input.phone ?? "").replace(/[^\d+]/g, "");
    if (name.length < 2) return fail("Please add your name.");
    if (phone.replace(/\D/g, "").length < 10) return fail("Please add a phone number we can text or call.");
    if (!input.lines?.length) return fail("Your bag is empty.");
    const lines: OrderLine[] = [];
    for (const l of input.lines) {
      const item = findItem(s, l.itemId);
      if (!item || item.hidden) return fail("Something in your bag isn't on the menu anymore.");
      if (isSoldOut(item, now)) return fail(`Sorry, ${item.name} just sold out for today.`);
      const size = item.sizes?.length ? (item.sizes.find((z) => z.label === l.size) ?? item.sizes[0]).label : undefined;
      const protein = item.protein ? (s.proteins.find((p) => p.label === l.protein) ?? s.proteins[0])?.label : undefined;
      lines.push({ itemId: item.id, name: item.name, qty: l.qty, size, protein, spice: l.spice, unit: unitPrice(item, s.proteins, size, protein) });
    }
    const asap = input.pickup === "asap" || input.pickup === undefined;
    if (!asap && !pickupSlots(s, now).includes(Number(input.pickup))) return fail("That pickup time just passed, please pick another.");
    const day = restaurantNow(now).day;
    const orders = load<Order[]>(ordersKey(day), () => []);
    const order: Order = {
      id: day.replace(/-/g, "") + Math.random().toString(36).slice(2, 10),
      number: orders.length + 1,
      day,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      pickupAt: minutesToISO(asap ? st.earliest : Number(input.pickup), now),
      asap,
      name,
      phone,
      note: input.note?.trim() || undefined,
      lines,
      subtotal: Math.round(lines.reduce((t, l) => t + l.unit * l.qty, 0) * 100) / 100,
      status: "new",
    };
    orders.push(order);
    save(ordersKey(day), orders);
    return json({ id: order.id, number: order.number }, 201);
  }

  if (path === "order") {
    const id = url.searchParams.get("id") ?? "";
    const day = `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;
    const o = load<Order[]>(ordersKey(day), () => []).find((x) => x.id === id);
    if (!o) return fail("Not found", 404);
    const { name, phone: _p, note: _n, day: _d, updatedAt: _u, ...rest } = o;
    const view: PublicOrder = { ...rest, firstName: name.split(/\s+/)[0] };
    return json(view);
  }

  return fail("Not found", 404);
}

export function installPreviewApi() {
  // If it's outside service hours right now, pretend it's 6:15 PM so ordering works in the demo.
  const s = settings();
  const now = restaurantNow(new Date());
  const today = s.hours[now.dow];
  const open = today.closed ? 0 : toMinutes(today.open);
  const close = today.closed ? 0 : toMinutes(today.close);
  if (today.closed || now.minutes < open + 30 || now.minutes > close - 60) {
    const target = today.closed ? 18 * 60 + 15 : Math.min(18 * 60 + 15, close - 90);
    setClockOffset((target - now.minutes) * 60_000);
  }

  const real = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const raw = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(raw, window.location.href);
    const m = /\/api\/([a-z-]+)\/?$/.exec(url.pathname);
    if (m && url.origin === window.location.origin) return handle(m[1], url, init);
    return real(input, init);
  };
}

export const resetPreview = () => {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("tp-demo") || k === "tp-bag")
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    memory.clear();
  }
};
