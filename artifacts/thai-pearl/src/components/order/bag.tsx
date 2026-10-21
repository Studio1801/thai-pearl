import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import type { Settings } from "@shared/model";
import { SPICE, findItem, isSoldOut, liveStatus, minutesToClock, money, pickupSlots, unitPrice } from "@shared/model";
import { bagActions, placeOrder, useBag, useNow, type BagLine } from "@/lib/live";
import { Sheet, Stepper } from "./sheet";

export function lineDetail(l: Pick<BagLine, "size" | "protein" | "spice">) {
  return [l.size, l.protein, l.spice ? `spice ${l.spice} ${SPICE[l.spice - 1].toLowerCase()}` : null].filter(Boolean).join(", ");
}

export function BagBar({ site }: { site: Settings }) {
  const bag = useBag();
  const [open, setOpen] = useState(false);
  const now = useNow(20_000);
  const status = liveStatus(site, now);

  const priced = useMemo(
    () =>
      bag
        .map((l) => {
          const item = findItem(site, l.itemId);
          return item ? { ...l, item, unit: unitPrice(item, site.proteins, l.size, l.protein) } : null;
        })
        .filter((x): x is NonNullable<typeof x> => !!x),
    [bag, site],
  );
  const count = priced.reduce((s, l) => s + l.qty, 0);
  const total = priced.reduce((s, l) => s + l.unit * l.qty, 0);

  return (
    <>
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-0 inset-x-0 z-50 p-3 md:p-5 pointer-events-none"
          >
            <button
              onClick={() => setOpen(true)}
              className="pointer-events-auto w-full md:max-w-lg md:ml-auto md:mr-0 mx-auto flex items-center justify-between bg-[#180E06] text-white px-5 py-4 shadow-[0_8px_30px_rgba(24,14,6,0.35)]"
            >
              <span className="font-sans text-sm">
                <span className="font-semibold">Your bag</span>
                <span className="text-white/50">
                  , {count} {count === 1 ? "item" : "items"}
                </span>
              </span>
              <span className="font-sans text-sm font-semibold text-[#E8920E]">Review {money(total)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Sheet open={open} onClose={() => setOpen(false)} label="Your bag">
        <Checkout site={site} priced={priced} total={total} statusOpen={status.ordering === "open"} onClose={() => setOpen(false)} now={now} />
      </Sheet>
    </>
  );
}

type Priced = BagLine & { item: NonNullable<ReturnType<typeof findItem>>; unit: number };

function Checkout({
  site,
  priced,
  total,
  statusOpen,
  onClose,
  now,
}: {
  site: Settings;
  priced: Priced[];
  total: number;
  statusOpen: boolean;
  onClose: () => void;
  now: Date;
}) {
  const [, navigate] = useLocation();
  const slots = pickupSlots(site, now);
  const [pickup, setPickup] = useState<"asap" | number>("asap");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const soldOut = priced.filter((l) => isSoldOut(l.item, now) || l.item.hidden);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await placeOrder({ name, phone, note, pickup, lines: priced.map(({ item: _i, unit: _u, ...l }) => l), company });
      bagActions.clear();
      onClose();
      navigate(`/order/${res.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="px-6 pt-7 pb-4 flex items-baseline justify-between">
        <h3 className="font-serif text-2xl" style={{ fontWeight: 500 }}>
          Your pickup order
        </h3>
        <button type="button" onClick={onClose} className="font-sans text-sm text-[#180E06]/50 hover:text-[#180E06]">
          Keep browsing
        </button>
      </div>

      <ul className="px-6 divide-y divide-[#E8DCC8]">
        {priced.map((l) => {
          const out = isSoldOut(l.item, now) || l.item.hidden;
          return (
            <li key={l.key} className="py-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className={`font-sans font-semibold text-sm ${out ? "line-through text-[#180E06]/40" : ""}`}>{l.item.name}</p>
                {lineDetail(l) && <p className="font-sans text-xs text-[#8A7060] mt-0.5">{lineDetail(l)}</p>}
                {out && <p className="font-sans text-xs text-[#C4281A] mt-1">Sold out today, please remove it</p>}
              </div>
              <Stepper value={l.qty} min={0} onChange={(n) => bagActions.setQty(l.key, n)} />
              <p className="w-14 text-right font-serif text-[#C4281A] mt-2" style={{ fontWeight: 500 }}>
                {money(l.unit * l.qty)}
              </p>
            </li>
          );
        })}
      </ul>

      {!statusOpen ? (
        <p className="mx-6 my-5 font-sans text-sm text-[#7A6A60]">
          Online pickup isn't taking orders right now. Call us at{" "}
          <a className="underline text-[#180E06]" href={`tel:${site.phone.replace(/\D/g, "")}`}>
            {site.phone}
          </a>
          .
        </p>
      ) : (
        <div className="px-6 pt-4 pb-2 space-y-4">
          <label className="block">
            <span className="font-sans text-xs font-semibold text-[#8A7060]">Pickup time</span>
            <select
              value={String(pickup)}
              onChange={(e) => setPickup(e.target.value === "asap" ? "asap" : Number(e.target.value))}
              className="mt-1.5 w-full bg-white/70 border-b-2 border-[#180E06]/20 focus:border-[#C4281A] outline-none px-3 py-3 font-sans text-sm"
            >
              <option value="asap">As soon as it's ready (about {site.ordering.prepMinutes} min)</option>
              {slots.map((m) => (
                <option key={m} value={m}>
                  Today at {minutesToClock(m)}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name" value={name} onChange={setName} autoComplete="name" required />
            <Input label="Phone" value={phone} onChange={setPhone} autoComplete="tel" inputMode="tel" required />
          </div>
          <Input label="Anything we should know? (optional)" value={note} onChange={setNote} />
          {/* honeypot */}
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="absolute -left-[9999px] w-px h-px opacity-0"
            aria-hidden
          />
        </div>
      )}

      <div className="sticky bottom-0 bg-[#FDF7EC] border-t border-[#E8DCC8] px-6 py-4 mt-4">
        {error && <p className="font-sans text-sm text-[#C4281A] mb-3">{error}</p>}
        <button
          type="submit"
          disabled={!statusOpen || busy || !priced.length || soldOut.length > 0}
          className="w-full bg-[#C4281A] hover:bg-[#a42016] disabled:bg-[#180E06]/25 text-white font-sans font-semibold text-sm py-4 transition-colors"
        >
          {busy ? "Sending to the kitchen..." : `Place pickup order, ${money(total)}`}
        </button>
        <p className="font-sans text-xs text-[#8A7060] mt-2.5 text-center">
          You pay when you pick up. Prices shown before tax.
        </p>
      </div>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block">
      <span className="font-sans text-xs font-semibold text-[#8A7060]">{label}</span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-white/70 border-b-2 border-[#180E06]/20 focus:border-[#C4281A] outline-none px-3 py-3 font-sans text-sm"
      />
    </label>
  );
}
