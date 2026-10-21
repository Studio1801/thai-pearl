import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Order, OrderStatus } from "@shared/model";
import { SPICE, formatTime, money } from "@shared/model";
import { useNow } from "@/lib/live";
import { useOrders, useSetOrderStatus } from "./api";
import { Btn, useToast } from "./ui";

const COLUMNS: { status: OrderStatus; title: string; empty: string }[] = [
  { status: "new", title: "New", empty: "Nothing waiting." },
  { status: "cooking", title: "In the wok", empty: "Nothing cooking." },
  { status: "ready", title: "Ready for pickup", empty: "Nothing on the counter." },
];

const NEXT: Partial<Record<OrderStatus, { to: OrderStatus; label: string; tone: "crimson" | "ink" | "jade" }>> = {
  new: { to: "cooking", label: "Start cooking", tone: "crimson" },
  cooking: { to: "ready", label: "It's ready", tone: "jade" },
  ready: { to: "done", label: "Picked up", tone: "ink" },
};

/** Two soft notes, like a counter bell. Needs one tap on the page first (the PIN screen covers that). */
export function chime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [880, 1318.5].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f;
      o.type = "sine";
      const t = ctx.currentTime + i * 0.18;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 1);
    });
  } catch {
    /* no audio, no problem */
  }
}

export function OrdersTab() {
  const { data, isLoading, isError } = useOrders();
  const orders = data?.orders ?? [];
  const now = useNow(15_000);
  const seen = useRef<Set<string> | null>(null);
  const [fresh, setFresh] = useState<Set<string>>(new Set());

  // chime + highlight when an order we haven't seen shows up
  useEffect(() => {
    if (!data) return;
    const ids = new Set(data.orders.map((o) => o.id));
    if (seen.current) {
      const incoming = data.orders.filter((o) => !seen.current!.has(o.id) && o.status === "new");
      if (incoming.length) {
        chime();
        setFresh((f) => new Set([...f, ...incoming.map((o) => o.id)]));
      }
    }
    seen.current = ids;
  }, [data]);

  const waiting = orders.filter((o) => o.status === "new").length;
  useEffect(() => {
    document.title = waiting ? `(${waiting}) New order${waiting > 1 ? "s" : ""} | Thai Pearl` : "Kitchen | Thai Pearl";
  }, [waiting]);

  const live = orders.filter((o) => o.status !== "cancelled");
  const sales = live.reduce((s, o) => s + o.subtotal, 0);
  const finished = orders.filter((o) => o.status === "done" || o.status === "cancelled").reverse();
  const today = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "long", month: "short", day: "numeric" }).format(now);

  return (
    <div>
      <p className="font-sans text-[15px] text-[#8A7060] mb-6">
        <span className="text-[#180E06] font-semibold">{today}.</span>{" "}
        {live.length ? (
          <>
            {live.length} pickup {live.length === 1 ? "order" : "orders"} so far,{" "}
            <span className="font-serif text-[#180E06] text-lg" style={{ fontWeight: 600 }}>
              {money(sales)}
            </span>{" "}
            before tax.
          </>
        ) : (
          "No pickup orders yet today."
        )}
        {isError && <span className="text-[#C4281A]"> Can't reach the website right now, retrying.</span>}
      </p>

      {isLoading ? (
        <p className="font-sans text-sm text-[#8A7060]">Loading orders...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr_1fr] items-start">
          {COLUMNS.map((col) => {
            const list = orders
              .filter((o) => o.status === col.status)
              .sort((a, b) => a.pickupAt.localeCompare(b.pickupAt));
            return (
              <section key={col.status}>
                <h3 className="font-sans text-sm font-semibold text-[#180E06] mb-3 flex items-baseline gap-2">
                  {col.title}
                  <span className="font-serif text-[#8A7060]" style={{ fontWeight: 500 }}>
                    {list.length || ""}
                  </span>
                </h3>
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {list.map((o) => (
                      <Ticket key={o.id} order={o} now={now} fresh={fresh.has(o.id)} />
                    ))}
                  </AnimatePresence>
                  {!list.length && <p className="font-sans text-sm text-[#8A7060]/70 py-2">{col.empty}</p>}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {finished.length > 0 && (
        <details className="mt-12 group">
          <summary className="cursor-pointer font-sans text-sm font-semibold text-[#180E06] list-none">
            Done today <span className="font-serif text-[#8A7060]">{finished.length}</span>
            <span className="text-[#8A7060] font-normal group-open:hidden">, show</span>
          </summary>
          <ul className="mt-3 divide-y divide-[#E4D7C3]">
            {finished.map((o) => (
              <li key={o.id} className="py-3 flex flex-wrap items-baseline gap-x-4 font-sans text-sm">
                <span className="font-serif text-base" style={{ fontWeight: 600 }}>
                  No. {o.number}
                </span>
                <span>{o.name}</span>
                <span className="text-[#8A7060]">{o.lines.reduce((s, l) => s + l.qty, 0)} items</span>
                <span className={o.status === "cancelled" ? "text-[#C4281A]" : "text-[#8A7060]"}>
                  {o.status === "cancelled" ? "Cancelled" : `Picked up, ${money(o.subtotal)}`}
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

function Ticket({ order, now, fresh }: { order: Order; now: Date; fresh: boolean }) {
  const setStatus = useSetOrderStatus();
  const toast = useToast();
  const next = NEXT[order.status];
  const minsToPickup = Math.round((new Date(order.pickupAt).getTime() - now.getTime()) / 60_000);
  const late = minsToPickup < 0 && order.status !== "ready";
  const placedAgo = Math.max(0, Math.round((now.getTime() - new Date(order.createdAt).getTime()) / 60_000));

  const move = async (to: OrderStatus) => {
    try {
      await setStatus(order.id, to);
    } catch (e) {
      toast((e as Error).message, true);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: -16, rotate: -1.2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="relative"
      style={{ filter: "drop-shadow(0 1px 1px rgba(24,14,6,0.10)) drop-shadow(0 6px 14px rgba(24,14,6,0.07))" }}
    >
      {fresh && order.status === "new" && (
        <span className="absolute -top-2.5 right-4 z-10 rounded-full bg-[#E8920E] text-[#180E06] font-sans text-[11px] font-bold px-2.5 py-1">
          Just in
        </span>
      )}
      <div className="chit bg-[#FFFCF6] px-5 pt-5 pb-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-serif text-3xl leading-none text-[#180E06]" style={{ fontWeight: 600 }}>
              No. {order.number}
            </p>
            <p className="font-sans text-sm text-[#180E06] mt-2">
              {order.name}{" "}
              <a href={`tel:${order.phone}`} className="text-[#8A7060] underline underline-offset-2 decoration-[#8A7060]/40">
                {formatPhone(order.phone)}
              </a>
            </p>
          </div>
          <div className="text-right">
            <p className={`font-serif text-xl leading-none ${late ? "text-[#C4281A]" : "text-[#180E06]"}`} style={{ fontWeight: 500 }}>
              {formatTime(order.pickupAt)}
            </p>
            <p className={`font-sans text-xs mt-1.5 ${late ? "text-[#C4281A] font-semibold" : "text-[#8A7060]"}`}>
              {order.status === "ready"
                ? "On the counter"
                : late
                  ? `Due ${-minsToPickup} min ago`
                  : `${order.asap ? "ASAP, " : ""}in ${minsToPickup} min`}
            </p>
          </div>
        </div>

        <ul className="mt-4 pt-3 border-t border-dashed border-[#180E06]/20 space-y-2">
          {order.lines.map((l, i) => (
            <li key={i} className="font-sans text-[15px] leading-snug">
              <span className="font-semibold">
                {l.qty} &times; {l.name}
              </span>
              {(l.size || l.protein || l.spice) && (
                <span className="block text-[13px] text-[#6A5848]">
                  {[l.size, l.protein, l.spice ? `spice ${l.spice} (${SPICE[l.spice - 1].toLowerCase()})` : null].filter(Boolean).join(", ")}
                </span>
              )}
            </li>
          ))}
        </ul>

        {order.note && (
          <p className="mt-3 font-sans text-sm bg-[#E8920E]/15 text-[#180E06] px-3 py-2 rounded">
            {order.note}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between font-sans text-xs text-[#8A7060]">
          <span>Placed {placedAgo ? `${placedAgo} min ago` : "just now"}</span>
          <span>
            Pay at pickup{" "}
            <span className="font-serif text-base text-[#180E06]" style={{ fontWeight: 600 }}>
              {money(order.subtotal)}
            </span>
          </span>
        </div>

        {next && (
          <Btn tone={next.tone} className="w-full mt-4 py-3.5 text-[15px]" onClick={() => move(next.to)}>
            {next.label}
          </Btn>
        )}
        {(order.status === "new" || order.status === "cooking") && (
          <button
            onClick={() => window.confirm(`Cancel order no. ${order.number} for ${order.name}?`) && move("cancelled")}
            className="w-full mt-2 font-sans text-xs text-[#8A7060] hover:text-[#C4281A] py-1"
          >
            Cancel order
          </button>
        )}
        {order.status === "ready" && (
          <button onClick={() => move("cooking")} className="w-full mt-2 font-sans text-xs text-[#8A7060] hover:text-[#180E06] py-1">
            Not ready after all
          </button>
        )}
      </div>
    </motion.article>
  );
}

function formatPhone(p: string) {
  const d = p.replace(/\D/g, "").slice(-10);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p;
}
