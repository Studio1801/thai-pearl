import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Order, OrderStatus, Settings } from "@shared/model";
import { restaurantNow } from "@shared/model";
import { fetchSite } from "@/lib/live";

const PIN_KEY = "tp-pin";

export const pinStore = {
  get: () => {
    try {
      return localStorage.getItem(PIN_KEY) ?? "";
    } catch {
      return "";
    }
  },
  set: (pin: string) => {
    try {
      localStorage.setItem(PIN_KEY, pin);
    } catch {
      /* ignore */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(PIN_KEY);
    } catch {
      /* ignore */
    }
  },
};

export class Unauthorized extends Error {}

async function ownerFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...init,
    cache: "no-store",
    headers: { "content-type": "application/json", "x-pin": pinStore.get(), ...(init.headers ?? {}) },
  });
  if (res.status === 401) {
    pinStore.clear();
    window.dispatchEvent(new Event("tp-logout"));
    throw new Unauthorized();
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Couldn't reach the website. Check the connection.");
  return data as T;
}

export async function checkPin(pin: string) {
  const res = await fetch("/api/login", { method: "POST", headers: { "x-pin": pin } });
  return res.ok;
}

export function useSettings() {
  return useQuery({ queryKey: ["owner-site"], queryFn: () => fetchSite(true), refetchInterval: 20_000 });
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => ownerFetch<{ day: string; orders: Order[] }>(`/api/orders?day=${restaurantNow().day}`),
    refetchInterval: 5_000,
    refetchIntervalInBackground: true,
  });
}

/** Saves the whole settings object. Updates the screen first so it feels instant. */
export function useSaveSettings() {
  const qc = useQueryClient();
  return useCallback(
    async (next: Settings) => {
      await qc.cancelQueries({ queryKey: ["owner-site"] });
      const prev = qc.getQueryData<Settings>(["owner-site"]);
      qc.setQueryData(["owner-site"], next);
      try {
        const saved = await ownerFetch<Settings>("/api/site", { method: "PUT", body: JSON.stringify(next) });
        qc.setQueryData(["owner-site"], saved);
        qc.invalidateQueries({ queryKey: ["site"] });
        return saved;
      } catch (e) {
        qc.setQueryData(["owner-site"], prev);
        throw e;
      }
    },
    [qc],
  );
}

export function useSetOrderStatus() {
  const qc = useQueryClient();
  return useCallback(
    async (id: string, status: OrderStatus) => {
      await qc.cancelQueries({ queryKey: ["orders"] });
      const prev = qc.getQueryData<{ day: string; orders: Order[] }>(["orders"]);
      if (prev) qc.setQueryData(["orders"], { ...prev, orders: prev.orders.map((o) => (o.id === id ? { ...o, status } : o)) });
      try {
        await ownerFetch<Order>("/api/orders", { method: "PATCH", body: JSON.stringify({ id, status }) });
      } catch (e) {
        if (prev) qc.setQueryData(["orders"], prev);
        throw e;
      } finally {
        qc.invalidateQueries({ queryKey: ["orders"] });
      }
    },
    [qc],
  );
}
