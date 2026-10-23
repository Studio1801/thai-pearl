import { useEffect, useState, type FormEvent } from "react";
import logo from "@assets/thai-pearl/logo.png";
import { clock, liveStatus, formatTime } from "@shared/model";
import { useNow } from "@/lib/live";
import { checkPin, pinStore, useOrders, useRequests, useSaveSettings, useSettings } from "@/dashboard/api";
import { OrdersTab, chime } from "@/dashboard/orders-tab";
import { MenuTab } from "@/dashboard/menu-tab";
import { RestaurantTab } from "@/dashboard/restaurant-tab";
import { RequestsTab } from "@/dashboard/requests-tab";
import { Btn, ToastHost, useToast } from "@/dashboard/ui";

type Tab = "orders" | "requests" | "menu" | "restaurant";

export default function Dashboard() {
  const [authed, setAuthed] = useState(() => !!pinStore.get());

  useEffect(() => {
    const out = () => setAuthed(false);
    window.addEventListener("tp-logout", out);
    document.title = "Kitchen | Thai Pearl";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      window.removeEventListener("tp-logout", out);
      robots.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE3] text-[#180E06] font-sans">
      <ToastHost>{authed ? <Shell /> : <Login onIn={() => setAuthed(true)} />}</ToastHost>
    </div>
  );
}

function Login({ onIn }: { onIn: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const ok = await checkPin(pin).catch(() => false);
    setBusy(false);
    if (!ok) return setError(true);
    pinStore.set(pin);
    chime(); // unlocks sound for new-order alerts on this device
    onIn();
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-[#180E06] thai-pattern-dark">
      <form onSubmit={submit} className="w-full max-w-xs text-center">
        <img src={logo} alt="Thai Pearl" className="h-14 mx-auto mb-8" />
        <h1 className="font-serif text-3xl text-white" style={{ fontWeight: 500 }}>
          Kitchen
        </h1>
        <p className="font-sans text-sm text-white/50 mt-2 mb-8">Orders, menu and hours for the website.</p>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
          inputMode="numeric"
          autoFocus
          placeholder="PIN"
          aria-label="PIN"
          className="w-full rounded-md bg-white/10 text-white text-center tracking-[0.5em] font-serif text-3xl py-4 outline-none focus:bg-white/15 placeholder:text-white/25 placeholder:tracking-normal placeholder:font-sans placeholder:text-base"
        />
        {error && <p className="font-sans text-sm text-[#E8920E] mt-3">That PIN didn't work.</p>}
        <Btn tone="crimson" className="w-full mt-5 py-3.5" disabled={pin.length < 4 || busy}>
          {busy ? "Checking..." : "Open the kitchen"}
        </Btn>
      </form>
    </div>
  );
}

function Shell() {
  const [tab, setTab] = useState<Tab>("orders");
  const { data: site, isError } = useSettings();
  const { data: orderData } = useOrders();
  const waiting = orderData?.orders.filter((o) => o.status === "new").length ?? 0;
  const { data: reqData } = useRequests();
  const asks = reqData?.requests.filter((r) => r.status === "new" && r.kind !== "newsletter").length ?? 0;

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "orders", label: "Orders", badge: waiting },
    { id: "requests", label: "Requests", badge: asks },
    { id: "menu", label: "Menu" },
    { id: "restaurant", label: "Restaurant" },
  ];

  return (
    <>
      <header className="bg-[#180E06] text-[#FDF7EC] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Thai Pearl" className="h-9" />
            <span className="font-serif text-lg text-white/80 hidden sm:inline" style={{ fontWeight: 500 }}>
              Kitchen
            </span>
          </div>
          {site && <OrderingControl />}
        </div>
        <nav className="max-w-6xl mx-auto px-3 md:px-6 flex gap-1 mt-3 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative whitespace-nowrap px-3 md:px-4 py-3 font-sans text-[15px] transition-colors ${
                tab === t.id ? "text-white font-semibold" : "text-white/50 hover:text-white/80"
              }`}
            >
              {t.label}
              {!!t.badge && (
                <span className="ml-1.5 inline-grid place-items-center min-w-5 h-5 px-1.5 rounded-full bg-[#E8920E] text-[#180E06] text-xs font-bold">
                  {t.badge}
                </span>
              )}
              {tab === t.id && <span className="absolute left-3 right-3 md:left-4 md:right-4 bottom-0 h-[3px] bg-[#E8920E]" />}
            </button>
          ))}
          <a href={import.meta.env.VITE_PREVIEW === "1" ? "#/" : "/"} target="_blank" rel="noreferrer" className="ml-auto self-center hidden sm:block font-sans text-sm text-white/50 hover:text-white px-3">
            View website
          </a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        {!site ? (
          <p className="font-sans text-sm text-[#8A7060]">{isError ? "Can't reach the website right now. Retrying..." : "Loading..."}</p>
        ) : tab === "orders" ? (
          <OrdersTab />
        ) : tab === "requests" ? (
          <RequestsTab />
        ) : tab === "menu" ? (
          <MenuTab site={site} />
        ) : (
          <RestaurantTab site={site} />
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-5 md:px-8 pb-10">
        <button
          onClick={() => {
            pinStore.clear();
            window.dispatchEvent(new Event("tp-logout"));
          }}
          className="font-sans text-xs text-[#8A7060] hover:text-[#180E06]"
        >
          Log out of this device
        </button>
      </footer>
    </>
  );
}

/** The one control that matters mid-rush, always in reach. */
function OrderingControl() {
  const { data: site } = useSettings();
  const save = useSaveSettings();
  const toast = useToast();
  const now = useNow(10_000);
  if (!site) return null;
  const s = liveStatus(site, now);

  const set = async (ordering: Partial<typeof site.ordering>, msg: string) => {
    try {
      await save({ ...site, ordering: { ...site.ordering, ...ordering } });
      toast(msg);
    } catch (e) {
      toast((e as Error).message, true);
    }
  };

  const dot = { open: "#3FBF8F", paused: "#E8920E", off: "#8A7060", closed: "#8A7060" }[s.ordering];
  const text = {
    open: "Taking pickup orders",
    paused: `Paused until ${site.ordering.pausedUntil ? formatTime(site.ordering.pausedUntil) : ""}`,
    off: "Pickup orders off",
    closed: "Closed for pickup",
  }[s.ordering];

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 font-sans text-sm text-white/80">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: dot }} />
        <span className="hidden sm:inline">{text}</span>
      </span>
      {s.ordering === "open" && (
        <button
          onClick={() => set({ pausedUntil: new Date(clock().getTime() + 15 * 60_000).toISOString() }, "Paused for 15 minutes")}
          className="rounded-md bg-white/10 hover:bg-white/20 font-sans text-sm font-semibold px-3 py-2"
        >
          Pause 15 min
        </button>
      )}
      {s.ordering === "paused" && (
        <button onClick={() => set({ pausedUntil: null }, "Taking orders again")} className="rounded-md bg-[#0F7A6B] hover:bg-[#0c6458] font-sans text-sm font-semibold px-3 py-2">
          Resume
        </button>
      )}
      {s.ordering === "off" && (
        <button onClick={() => set({ enabled: true, pausedUntil: null }, "Pickup orders are on")} className="rounded-md bg-[#0F7A6B] hover:bg-[#0c6458] font-sans text-sm font-semibold px-3 py-2">
          Turn on
        </button>
      )}
    </div>
  );
}
