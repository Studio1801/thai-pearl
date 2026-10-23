// Shared between the website, the owner dashboard and the /api functions.
// Keep this file dependency-free so every side can import it.

export const RESTAURANT_TZ = "America/New_York";

/* The clock everything reads. Always real time on the server; the offline
   preview can shift it so the demo always lands during service hours. */
let clockOffsetMs = 0;
export const clock = () => new Date(Date.now() + clockOffsetMs);
export const setClockOffset = (ms: number) => {
  clockOffsetMs = ms;
};

export type Size = { label: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  thai?: string;
  desc?: string;
  price: number;
  sizes?: Size[];
  /** Ask the guest to pick a protein (priced from settings.proteins) */
  protein?: boolean;
  /** YYYY-MM-DD (restaurant time). Sold out for that day only, resets itself. */
  soldOutOn?: string | null;
  hidden?: boolean;
};

export type Category = {
  id: string;
  name: string;
  thai?: string;
  note?: string;
  items: MenuItem[];
};

export type DayHours = { closed: boolean; open: string; close: string }; // "12:00", "21:00"

export type Settings = {
  updatedAt: string;
  phone: string;
  banner: { on: boolean; text: string };
  ordering: {
    enabled: boolean;
    /** ISO time. Orders are paused until then. */
    pausedUntil: string | null;
    prepMinutes: number;
  };
  /** index 0 = Sunday */
  hours: DayHours[];
  proteins: Size[];
  menu: Category[];
  /** Happy hour, lunch deals and the like. Edited in the dashboard. */
  specials?: Special[];
  /** Public events shown on the Events page (New Year's Eve, live music...). */
  events?: SiteEvent[];
};

export type Special = { id: string; title: string; detail: string; when: string };
export type SiteEvent = { id: string; date: string; title: string; time: string; detail: string };

/* ---------- requests from the website (everything that isn't a pickup order) ---------- */

export type RequestKind = "reservation" | "mealprep" | "catering" | "party" | "job" | "newsletter";
export type RequestStatus = "new" | "confirmed" | "declined" | "done";

export type GuestRequest = {
  id: string;
  kind: RequestKind;
  createdAt: string;
  status: RequestStatus;
  name: string;
  phone: string;
  email: string;
  /** The date it's for (reservation, event, meal prep delivery), YYYY-MM-DD */
  date?: string;
  time?: string;
  guests?: number;
  note?: string;
  /** Kind-specific answers, already turned into readable lines */
  details: { label: string; value: string }[];
  total?: number;
};

export const REQUEST_LABEL: Record<RequestKind, string> = {
  reservation: "Table",
  mealprep: "Meal prep",
  catering: "Catering",
  party: "Private party",
  job: "Job application",
  newsletter: "Newsletter",
};

export type OrderStatus = "new" | "cooking" | "ready" | "done" | "cancelled";

export type OrderLine = {
  itemId: string;
  name: string;
  qty: number;
  size?: string;
  protein?: string;
  spice?: number;
  unit: number;
};

export type Order = {
  id: string;
  number: number;
  day: string;
  createdAt: string;
  updatedAt: string;
  pickupAt: string;
  asap: boolean;
  name: string;
  phone: string;
  note?: string;
  lines: OrderLine[];
  subtotal: number;
  status: OrderStatus;
};

export type PublicOrder = Pick<
  Order,
  "id" | "number" | "createdAt" | "pickupAt" | "asap" | "lines" | "subtotal" | "status"
> & { firstName: string };

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const SPICE = ["Mild", "Medium", "Hot", "Very hot", "Thai hot"];

/* ---------- time helpers (always restaurant time) ---------- */

export function restaurantNow(at: Date = clock()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return {
    day: `${get("year")}-${get("month")}-${get("day")}`,
    dow,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
};

export function formatClock(hhmm: string) {
  const mins = toMinutes(hhmm);
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT_TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** Groups consecutive days with identical hours: "Tue to Sun, 12 to 9 PM" */
export function hoursSummary(hours: DayHours[]) {
  const short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const key = (d: DayHours) => (d.closed ? "closed" : `${d.open}-${d.close}`);
  // start the week on Monday so "Tue to Sun" reads naturally
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups: { days: number[]; k: string }[] = [];
  for (const i of order) {
    const k = key(hours[i]);
    const last = groups[groups.length - 1];
    if (last && last.k === k) last.days.push(i);
    else groups.push({ days: [i], k });
  }
  return groups.map((g) => {
    const first = short[g.days[0]];
    const lastDay = short[g.days[g.days.length - 1]];
    const label =
      g.days.length === 7 ? "Every day" : g.days.length === 1 ? first : `${first} to ${lastDay}`;
    const h = hours[g.days[0]];
    return { label, value: h.closed ? "Closed" : `${formatClock(h.open)} to ${formatClock(h.close)}` };
  });
}

export type LiveStatus = {
  openNow: boolean;
  label: string;
  ordering: "open" | "paused" | "off" | "closed";
  /** earliest pickup, minutes after midnight restaurant time */
  earliest: number;
  close: number;
};

export function liveStatus(s: Settings, at: Date = clock()): LiveStatus {
  const now = restaurantNow(at);
  const today = s.hours[now.dow];
  const open = today.closed ? 0 : toMinutes(today.open);
  const close = today.closed ? 0 : toMinutes(today.close);
  const openNow = !today.closed && now.minutes >= open && now.minutes < close;

  let label: string;
  if (openNow) label = `Open now until ${formatClock(today.close)}`;
  else if (!today.closed && now.minutes < open) label = `Opens today at ${formatClock(today.open)}`;
  else {
    let next = "";
    for (let i = 1; i <= 7; i++) {
      const d = s.hours[(now.dow + i) % 7];
      if (!d.closed) {
        next = `${i === 1 ? "tomorrow" : DAY_NAMES[(now.dow + i) % 7]} at ${formatClock(d.open)}`;
        break;
      }
    }
    label = next ? `Closed now, opens ${next}` : "Closed";
  }

  const paused = !!s.ordering.pausedUntil && new Date(s.ordering.pausedUntil).getTime() > at.getTime();
  const earliest = Math.max(now.minutes, open) + s.ordering.prepMinutes;
  let ordering: LiveStatus["ordering"] = "open";
  if (!s.ordering.enabled) ordering = "off";
  else if (paused) ordering = "paused";
  // same-day pickup only, and only while the kitchen can still make it before close
  else if (today.closed || now.minutes >= close || earliest > close) ordering = "closed";

  return { openNow, label, ordering, earliest, close };
}

/** Pickup choices for today, 15 minute steps. Values are minutes after midnight. */
export function pickupSlots(s: Settings, at: Date = clock()) {
  const st = liveStatus(s, at);
  if (st.ordering !== "open") return [];
  const slots: number[] = [];
  let t = Math.ceil(st.earliest / 15) * 15;
  if (t - st.earliest < 5) t += 15;
  for (; t <= st.close; t += 15) slots.push(t);
  return slots;
}

export function minutesToClock(mins: number) {
  return formatClock(`${Math.floor(mins / 60)}:${mins % 60}`);
}

/** Restaurant-time minutes today -> ISO instant */
export function minutesToISO(mins: number, at: Date = clock()) {
  const now = restaurantNow(at);
  const minuteStart = Math.floor(at.getTime() / 60_000) * 60_000;
  return new Date(minuteStart + (mins - now.minutes) * 60_000).toISOString();
}

/* ---------- menu helpers ---------- */

export const isSoldOut = (item: MenuItem, at: Date = clock()) =>
  !!item.soldOutOn && item.soldOutOn === restaurantNow(at).day;

export function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

export function priceLabel(item: MenuItem) {
  if (item.sizes?.length) return item.sizes.map((z) => `${money(z.price)} ${z.label.toLowerCase()}`).join(" / ");
  return money(item.price);
}

export function unitPrice(item: MenuItem, proteins: Size[], size?: string, protein?: string) {
  let base = item.price;
  if (item.sizes?.length) {
    const z = item.sizes.find((x) => x.label === size) ?? item.sizes[0];
    base = z.price;
  }
  if (item.protein) {
    const p = proteins.find((x) => x.label === protein) ?? proteins[0];
    base += p ? p.price : 0;
  }
  return Math.round(base * 100) / 100;
}

export function findItem(s: Settings, id: string) {
  for (const c of s.menu) for (const i of c.items) if (i.id === id) return i;
  return undefined;
}

export const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
