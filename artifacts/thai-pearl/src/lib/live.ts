import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { PublicOrder, Settings } from "@shared/model";
import { clock } from "@shared/model";
import { SEED } from "@shared/seed";

/* ---------- live site content ---------- */

export async function fetchSite(fresh = false): Promise<Settings> {
  const res = await fetch(`/api/site${fresh ? "?fresh=1" : ""}`, { cache: "no-store" });
  if (!res.ok) throw new Error("site");
  return res.json();
}

/** What the website shows. Starts from the built-in copy, then swaps to the live one. */
export function useSite() {
  const q = useQuery({
    queryKey: ["site"],
    queryFn: () => fetchSite(),
    placeholderData: SEED,
    refetchInterval: 8_000,
    refetchOnWindowFocus: true,
    staleTime: 5_000,
  });
  return q.data ?? SEED;
}

/** Re-render every so often so "open now" and pickup times stay honest. */
export function useNow(ms = 30_000) {
  const [now, setNow] = useState(() => clock());
  useEffect(() => {
    const t = setInterval(() => setNow(clock()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

/* ---------- bag ---------- */

export type BagLine = {
  key: string;
  itemId: string;
  qty: number;
  size?: string;
  protein?: string;
  spice?: number;
};

const BAG_KEY = "tp-bag";
let bag: BagLine[] = (() => {
  try {
    return JSON.parse(localStorage.getItem(BAG_KEY) ?? "[]");
  } catch {
    return [];
  }
})();
const listeners = new Set<() => void>();

function setBag(next: BagLine[]) {
  bag = next;
  try {
    localStorage.setItem(BAG_KEY, JSON.stringify(bag));
  } catch {
    /* private mode, the bag just won't survive a refresh */
  }
  listeners.forEach((l) => l());
}

export const bagActions = {
  add(line: Omit<BagLine, "key">) {
    const key = [line.itemId, line.size, line.protein, line.spice].join("|");
    const existing = bag.find((l) => l.key === key);
    setBag(existing ? bag.map((l) => (l.key === key ? { ...l, qty: Math.min(20, l.qty + line.qty) } : l)) : [...bag, { ...line, key }]);
  },
  setQty(key: string, qty: number) {
    setBag(qty <= 0 ? bag.filter((l) => l.key !== key) : bag.map((l) => (l.key === key ? { ...l, qty: Math.min(20, qty) } : l)));
  },
  clear() {
    setBag([]);
  },
};

export function useBag() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => bag,
  );
}

/* ---------- orders ---------- */

export async function placeOrder(payload: {
  name: string;
  phone: string;
  note: string;
  pickup: "asap" | number;
  lines: BagLine[];
  company: string;
}): Promise<{ id: string; number: number }> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please call us to order.");
  return data;
}

export function useOrderStatus(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async (): Promise<PublicOrder> => {
      const res = await fetch(`/api/order?id=${encodeURIComponent(id)}`, { cache: "no-store" });
      if (!res.ok) throw new Error("not found");
      return res.json();
    },
    refetchInterval: (q) => (q.state.data && ["done", "cancelled"].includes(q.state.data.status) ? false : 5_000),
    retry: 1,
  });
}
