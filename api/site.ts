/// <reference lib="dom" />
// GET  /api/site  -> everything the public website shows (menu, hours, banner, ordering state)
// PUT  /api/site  -> dashboard saves changes (needs the PIN)

import type { Category, DayHours, Settings, SiteEvent, Size, Special } from "../shared/model";
import { slug } from "../shared/model";
import { SETTINGS_KEY, body, fail, isOwner, json, loadSettings } from "./_lib/http";
import { update } from "./_lib/store";
import { SEED } from "../shared/seed";

export async function GET(req: Request) {
  const settings = await loadSettings();
  const fresh = new URL(req.url).searchParams.has("fresh");
  return json(
    settings,
    200,
    fresh
      ? {}
      : {
          // the CDN holds it for a few seconds so a busy dinner rush doesn't hammer storage
          "cache-control": "no-cache",
          "vercel-cdn-cache-control": "max-age=3, stale-while-revalidate=30",
        },
  );
}

export async function PUT(req: Request) {
  if (!isOwner(req)) return fail("Wrong PIN", 401);
  const incoming = await body<Settings>(req);
  if (!incoming) return fail("Nothing to save");
  const clean = sanitize(incoming);
  if (typeof clean === "string") return fail(clean);
  const { data } = await update<Settings, void>(SETTINGS_KEY, () => structuredClone(SEED), (current) => {
    Object.assign(current, clean, { updatedAt: new Date().toISOString() });
  });
  return json(data);
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const num = (v: unknown, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n * 100) / 100)) : min;
};
const clock = (v: unknown, fallback: string) => (typeof v === "string" && /^\d{1,2}:\d{2}$/.test(v) ? v : fallback);

function sanitize(s: Settings): Omit<Settings, "updatedAt"> | string {
  if (!Array.isArray(s.menu) || !Array.isArray(s.hours) || s.hours.length !== 7) return "Malformed settings";
  const ids = new Set<string>();
  const menu: Category[] = s.menu.slice(0, 40).map((c) => ({
    id: str(c.id, 60) || slug(str(c.name, 60)) || crypto.randomUUID().slice(0, 8),
    name: str(c.name, 60) || "Untitled",
    thai: str(c.thai, 60) || undefined,
    note: str(c.note, 200) || undefined,
    items: (Array.isArray(c.items) ? c.items : []).slice(0, 80).map((i) => {
      let id = str(i.id, 60) || slug(str(i.name, 60)) || crypto.randomUUID().slice(0, 8);
      while (ids.has(id)) id = `${id}-${Math.random().toString(36).slice(2, 5)}`;
      ids.add(id);
      const sizes: Size[] | undefined = Array.isArray(i.sizes) && i.sizes.length
        ? i.sizes.slice(0, 4).map((z) => ({ label: str(z.label, 24) || "Regular", price: num(z.price, 0, 999) }))
        : undefined;
      return {
        id,
        name: str(i.name, 80) || "Untitled dish",
        thai: str(i.thai, 80) || undefined,
        desc: str(i.desc, 400) || undefined,
        price: sizes ? sizes[0].price : num(i.price, 0, 999),
        sizes,
        protein: !!i.protein,
        soldOutOn: typeof i.soldOutOn === "string" && /^\d{4}-\d{2}-\d{2}$/.test(i.soldOutOn) ? i.soldOutOn : null,
        hidden: !!i.hidden,
      };
    }),
  }));
  const hours: DayHours[] = s.hours.map((d) => ({
    closed: !!d.closed,
    open: clock(d.open, "12:00"),
    close: clock(d.close, "21:00"),
  }));
  return {
    phone: str(s.phone, 30) || SEED.phone,
    banner: { on: !!s.banner?.on, text: str(s.banner?.text, 160) },
    ordering: {
      enabled: !!s.ordering?.enabled,
      pausedUntil: s.ordering?.pausedUntil && !Number.isNaN(Date.parse(s.ordering.pausedUntil)) ? s.ordering.pausedUntil : null,
      prepMinutes: num(s.ordering?.prepMinutes, 5, 120),
    },
    hours,
    proteins: (Array.isArray(s.proteins) ? s.proteins : SEED.proteins)
      .slice(0, 10)
      .map((p) => ({ label: str(p.label, 24) || "Protein", price: num(p.price, 0, 99) })),
    menu,
    specials: (Array.isArray(s.specials) ? s.specials : SEED.specials ?? []).slice(0, 20).map(
      (x): Special => ({
        id: str(x.id, 40) || crypto.randomUUID().slice(0, 8),
        title: str(x.title, 80) || "Special",
        detail: str(x.detail, 300),
        when: str(x.when, 80),
      }),
    ),
    events: (Array.isArray(s.events) ? s.events : SEED.events ?? [])
      .filter((x) => typeof x?.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(x.date))
      .slice(0, 40)
      .map(
        (x): SiteEvent => ({
          id: str(x.id, 40) || crypto.randomUUID().slice(0, 8),
          date: x.date,
          title: str(x.title, 80) || "Event",
          time: str(x.time, 40),
          detail: str(x.detail, 300),
        }),
      ),
  };
}
