/// <reference lib="dom" />
// POST /api/login  -> checks the dashboard PIN (sent as the x-pin header)

import { fail, isOwner, json } from "./_lib/http";

export async function POST(req: Request) {
  if (!isOwner(req)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return fail("That PIN didn't work", 401);
  }
  return json({ ok: true });
}
