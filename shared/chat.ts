// Guest chat between the website and the owner dashboard.
// Used by the /api/chat function and by the in-browser demo backend.

export type ChatMsg = { from: "guest" | "owner"; text: string; at: string };
export type ChatThread = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  /** guest messages the owner hasn't opened yet */
  unread: number;
  msgs: ChatMsg[];
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const MAX_THREADS = 300;
const MAX_MSGS = 200;

export const newThreadId = () =>
  Array.from({ length: 16 }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");

/** Guest sends a message. Creates the thread on the first one. Returns the thread or an error string. */
export function guestSay(threads: ChatThread[], input: Record<string, unknown>, now: string): ChatThread | string {
  const text = str(input.text, 800);
  if (!text) return "Type a message first.";
  let id = str(input.thread, 40);
  let t = id ? threads.find((x) => x.id === id) : undefined;
  if (!t) {
    id = /^[a-z0-9]{16}$/.test(id) ? id : newThreadId();
    t = { id, name: str(input.name, 60) || "Guest", phone: str(input.phone, 30), createdAt: now, updatedAt: now, unread: 0, msgs: [] };
    threads.unshift(t);
    threads.splice(MAX_THREADS);
  } else {
    if (input.name) t.name = str(input.name, 60) || t.name;
    if (input.phone) t.phone = str(input.phone, 30) || t.phone;
  }
  t.msgs.push({ from: "guest", text, at: now });
  t.msgs.splice(0, Math.max(0, t.msgs.length - MAX_MSGS));
  t.unread += 1;
  t.updatedAt = now;
  return t;
}

export function ownerSay(threads: ChatThread[], input: Record<string, unknown>, now: string): ChatThread | string {
  const t = threads.find((x) => x.id === str(input.thread, 40));
  if (!t) return "Conversation not found.";
  const text = str(input.text, 800);
  if (!text) return "Type a reply first.";
  t.msgs.push({ from: "owner", text, at: now });
  t.unread = 0;
  t.updatedAt = now;
  return t;
}

/** What the guest is allowed to see of their own thread */
export const guestView = (t: ChatThread) => ({ id: t.id, msgs: t.msgs });
