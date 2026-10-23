/// <reference types="node" />
/// <reference lib="dom" />
// GET   /api/chat?thread=ID -> a guest reads their own conversation
// POST  /api/chat           -> a guest sends a message (creates the conversation)
// GET   /api/chat           -> every conversation, for the dashboard (PIN)
// PUT   /api/chat           -> the owner replies (PIN)
// PATCH /api/chat           -> the owner opened it, clear the unread count (PIN)

import { body, fail, isOwner, json } from "./_lib/http";
import { read, update } from "./_lib/store";
import { guestSay, guestView, ownerSay, type ChatThread } from "../shared/chat";

const KEY = "chat/threads.json";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("thread");
  const threads = (await read<ChatThread[]>(KEY)) ?? [];
  if (id) {
    const t = threads.find((x) => x.id === id);
    return t ? json(guestView(t)) : json({ id, msgs: [] });
  }
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  return json({ threads });
}

export async function POST(req: Request) {
  const input = await body<Record<string, unknown>>(req);
  if (!input) return fail("Nothing was sent");
  if (input.company) return json({ id: "ok", msgs: [] });
  const { result } = await update<ChatThread[], ChatThread | string>(KEY, () => [], (list) => guestSay(list, input, new Date().toISOString()));
  return typeof result === "string" ? fail(result) : json(guestView(result), 201);
}

export async function PUT(req: Request) {
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  const input = await body<Record<string, unknown>>(req);
  if (!input) return fail("Nothing was sent");
  const { result } = await update<ChatThread[], ChatThread | string>(KEY, () => [], (list) => ownerSay(list, input, new Date().toISOString()));
  return typeof result === "string" ? fail(result) : json(result);
}

export async function PATCH(req: Request) {
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  const input = await body<{ thread?: string }>(req);
  await update<ChatThread[], void>(KEY, () => [], (list) => {
    const t = list.find((x) => x.id === input?.thread);
    if (t) t.unread = 0;
  });
  return json({ ok: true });
}
