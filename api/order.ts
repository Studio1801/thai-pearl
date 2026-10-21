// GET /api/order?id=...  -> the guest's own order status (no phone number, first name only)

import type { Order, PublicOrder } from "../shared/model";
import { fail, json, ordersKey } from "./_lib/http";
import { read } from "./_lib/store";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  const m = /^(\d{4})(\d{2})(\d{2})[a-z0-9]{6,}$/.exec(id);
  if (!m) return fail("Not found", 404);
  const orders = (await read<Order[]>(ordersKey(`${m[1]}-${m[2]}-${m[3]}`))) ?? [];
  const o = orders.find((x) => x.id === id);
  if (!o) return fail("Not found", 404);
  const view: PublicOrder = {
    id: o.id,
    number: o.number,
    createdAt: o.createdAt,
    pickupAt: o.pickupAt,
    asap: o.asap,
    lines: o.lines,
    subtotal: o.subtotal,
    status: o.status,
    firstName: o.name.split(/\s+/)[0],
  };
  return json(view);
}
