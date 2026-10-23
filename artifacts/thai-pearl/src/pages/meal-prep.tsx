import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import wok from "@assets/thai-pearl/food/cashew-stir-fry.jpg";
import { DAY_NAMES, money } from "@shared/model";
import { useSite } from "@/lib/live";
import { MEAL_PREP as MP } from "@/lib/content";
import { longDate, nextDays } from "@/lib/requests";
import { Page } from "@/components/page";
import { Choice, ContactFields, DoneText, Field, Input, RequestForm, Section, TextArea, checkContact, useContact } from "@/components/form";

type Meal = { protein: string; veggie: string; base: string; flavor: string; extra: boolean };
const blank = (): Meal => ({ protein: MP.proteins[0], veggie: MP.veggies[0], base: MP.bases[0].label, flavor: MP.flavors[0], extra: false });
const addOn = (m: Meal) => (MP.bases.find((b) => b.label === m.base)?.add ?? 0) + (m.extra ? MP.extraProtein : 0);
const describe = (m: Meal) => `${m.protein}${m.extra ? " (extra)" : ""}, ${m.veggie.toLowerCase()}, ${m.base.toLowerCase()}, ${m.flavor.toLowerCase()}`;

export default function MealPrepPage() {
  const site = useSite();
  const [pack, setPack] = useState(5);
  const [meals, setMeals] = useState<Meal[]>(() => Array.from({ length: 5 }, blank));
  const [open, setOpen] = useState(0);
  const [how, setHow] = useState<"Delivery" | "Pickup">("Delivery");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const c = useContact();
  const days = useMemo(() => nextDays(14, 1).filter((d) => MP.deliveryDays.includes(d.dow)), []);
  const [day, setDay] = useState(days[0]?.iso);

  const resize = (n: number) => {
    setPack(n);
    setMeals((m) => (m.length >= n ? m.slice(0, n) : [...m, ...Array.from({ length: n - m.length }, () => ({ ...(m[m.length - 1] ?? blank()) }))]));
    setOpen(0);
  };
  const setMeal = (i: number, change: Partial<Meal>) => setMeals((m) => m.map((x, k) => (k === i ? { ...x, ...change } : x)));
  const copyToAll = (i: number) => setMeals((m) => m.map(() => ({ ...m[i] })));

  const base = MP.packs.find((p) => p.meals === pack)!.price;
  const extras = meals.reduce((t, m) => t + addOn(m), 0);
  const total = base + extras;
  const free = total >= MP.freeOver;

  return (
    <Page
      kicker="Meal prep"
      thai="อาหารเตรียมล่วงหน้า"
      image={wok}
      title={<>Healthy, high protein, fresh every week.</>}
      intro={
        <>
          Build your meals, pick a delivery day, and we cook them fresh. Every meal comes with a boiled egg. Delivered{" "}
          {MP.deliveryDays.map((d) => DAY_NAMES[d]).join(", ").replace(/, ([^,]*)$/, " and $1")}.
        </>
      }
    >

      <RequestForm
        submit={`Place meal prep order, ${money(total)}`}
        build={() => {
          if (!day) return "Please pick a delivery day.";
          const bad = checkContact(c.v);
          if (bad) return bad;
          if (how === "Delivery" && address.trim().length < 6) return "Please add the delivery address.";
          const grouped = new Map<string, number>();
          meals.forEach((m) => grouped.set(describe(m), (grouped.get(describe(m)) ?? 0) + 1));
          return {
            kind: "mealprep",
            ...c.v,
            date: day,
            guests: pack,
            note,
            total,
            details: [
              { label: "Pack", value: `${pack} meals, ${money(base)}` },
              ...[...grouped].map(([d, n], i) => ({ label: i === 0 ? "Meals" : "", value: `${n} x ${d}` })),
              { label: "Add-ons", value: extras ? money(extras) : "None" },
              { label: how, value: how === "Delivery" ? address.trim() : "At the restaurant" },
            ],
          };
        }}
        done={(p) => (
          <DoneText title="Your meal prep order is in.">
            <p>
              {p.guests} meals for {longDate(p.date!)}, {money(p.total!)} before delivery. We'll text {p.phone} to confirm the order{how === "Delivery" ? " and the delivery fee" : ""}.
            </p>
            <p>Questions? Call {site.phone}.</p>
          </DoneText>
        )}
      >
        <Section title="How many meals?">
          <div className="grid grid-cols-3 gap-2.5 md:gap-4" role="group" aria-label="Meal pack">
            {MP.packs.map((p) => {
              const on = p.meals === pack;
              const tag = p.meals === 5 ? "Most popular" : p.meals === 10 ? "Best value" : "";
              return (
                <motion.button
                  type="button"
                  key={p.meals}
                  aria-pressed={on}
                  onClick={() => resize(p.meals)}
                  whileTap={{ scale: 0.97 }}
                  className={`relative isolate text-left rounded-[18px] p-4 md:p-6 border transition-[border-color,box-shadow,transform,color] duration-300 ${
                    on ? "text-white border-transparent" : "bg-[#FFFDF8] border-[#180E06]/10 shadow-[0_1px_2px_rgba(24,14,6,0.05)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgba(24,14,6,0.55)]"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="pack"
                      className="absolute inset-0 -z-10 rounded-[18px] bg-gradient-to-b from-[#2A1B10] to-[#140B05] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_44px_-22px_rgba(24,14,6,0.85)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {tag && (
                    <span className={`absolute -top-2.5 left-4 md:left-6 rounded-full px-2.5 py-1 text-[11px] font-bold font-sans ${on ? "bg-[#E8920E] text-[#180E06]" : "bg-[#180E06] text-white"}`}>
                      {tag}
                    </span>
                  )}
                  <span className="block font-serif text-4xl md:text-6xl leading-none mt-1" style={{ fontWeight: 500 }}>{p.meals}</span>
                  <span className={`block font-sans text-sm mt-1 ${on ? "text-white/60" : "text-[#8A7060]"}`}>meals</span>
                  <span className={`block mt-4 pt-3 border-t ${on ? "border-white/15" : "border-[#180E06]/10"}`}>
                    <span className="block font-sans font-bold text-lg md:text-xl">{money(p.price)}</span>
                    <span className={`block font-sans text-xs ${on ? "text-[#F2B75A]" : "text-[#8A7060]"}`}>{money(Math.round((p.price / p.meals) * 100) / 100)} a meal</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </Section>

        <Section title="Build each meal" sub="Set up one, then copy it to the rest if you like.">
          <div className="space-y-3">
            {meals.map((m, i) => {
              const on = open === i;
              return (
                <div key={i} className={`rounded-[18px] border transition-all duration-300 ${on ? "bg-[#FFFDF8] border-[#180E06]/15 shadow-[0_24px_48px_-30px_rgba(24,14,6,0.55)]" : "bg-[#FFFDF8]/70 border-[#180E06]/8 hover:border-[#180E06]/20"}`}>
                  <button type="button" onClick={() => setOpen(on ? -1 : i)} className="w-full flex items-center gap-4 px-5 py-4 text-left min-h-[64px]" aria-expanded={on}>
                    <span className={`w-9 h-9 rounded-full grid place-items-center font-sans text-sm font-semibold flex-shrink-0 transition-colors ${on ? "bg-[#C4281A] text-white" : "bg-[#180E06] text-white"}`}>{i + 1}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-sans font-semibold">{m.protein} with {m.flavor.toLowerCase()}</span>
                      <span className="block font-sans text-sm text-[#8A7060] truncate">
                        {m.veggie}, {m.base.toLowerCase()}
                        {addOn(m) ? `, +${money(addOn(m))}` : ""}
                      </span>
                    </span>
                    <span className={`text-[#8A7060] transition-transform ${on ? "rotate-180" : ""}`} aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                    <div className="px-5 pb-6 space-y-5 border-t border-[#F0E6D6] pt-5">
                      <Pick label="Protein" options={MP.proteins} value={m.protein} onChange={(v) => setMeal(i, { protein: v })} />
                      <Pick label="Veggie" options={MP.veggies} value={m.veggie} onChange={(v) => setMeal(i, { veggie: v })} />
                      <Pick label="Base" options={MP.bases.map((b) => b.label)} value={m.base} onChange={(v) => setMeal(i, { base: v })} sub={(v) => { const a = MP.bases.find((b) => b.label === v)!.add; return a ? `+${money(a)}` : "Included"; }} />
                      <Pick label="Flavor" options={MP.flavors} value={m.flavor} onChange={(v) => setMeal(i, { flavor: v })} />
                      <label className="flex items-center gap-3 font-sans text-[15px] cursor-pointer min-h-[44px]">
                        <input type="checkbox" checked={m.extra} onChange={(e) => setMeal(i, { extra: e.target.checked })} className="w-5 h-5 accent-[#180E06]" />
                        Extra protein <span className="text-[#8A7060]">+{money(MP.extraProtein)}</span>
                      </label>
                      {meals.length > 1 && (
                        <button type="button" onClick={() => copyToAll(i)} className="font-sans text-sm font-semibold underline underline-offset-4 min-h-[44px]">
                          Use this for all {meals.length} meals
                        </button>
                      )}
                    </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="When and where?">
          <p className="font-sans text-xs font-semibold text-[#8A7060] mb-2">Delivery day</p>
          <Choice options={days.map((d) => d.iso)} value={day} onChange={setDay} render={(iso) => days.find((d) => d.iso === iso)!.short + " " + days.find((d) => d.iso === iso)!.day} sub={(iso) => days.find((d) => d.iso === iso)!.month} cols="grid grid-cols-3 sm:grid-cols-6 gap-2" />
          <p className="font-sans text-xs font-semibold text-[#8A7060] mt-6 mb-2">Delivery or pickup</p>
          <Choice options={["Delivery", "Pickup"] as ("Delivery" | "Pickup")[]} value={how} onChange={setHow} cols="grid grid-cols-2 gap-2" sub={(v) => (v === "Delivery" ? (free ? "Free on this order" : `Free over ${money(MP.freeOver)}`) : "747 Haywood Rd")} />
          {how === "Delivery" && (
            <div className="mt-4">
              <Field label="Delivery address">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" placeholder="Street, apartment, city" />
              </Field>
              <p className="font-sans text-xs text-[#8A7060] mt-2">$5 within 5 to 7 miles, $8 to $10 farther out. Free on orders over {money(MP.freeOver)}. We confirm the fee by text.</p>
            </div>
          )}
        </Section>

        <Section title="Your details">
          <ContactFields v={c.v} set={c.set} />
          <div className="mt-4">
            <Field label="Allergies or notes" hint="optional">
              <TextArea value={note} onChange={(e) => setNote(e.target.value)} placeholder="No peanuts, gate code, leave at the door" />
            </Field>
          </div>
        </Section>

        <div className="mt-10 surface p-6 md:p-7">
          <Row l={`${pack} meal pack`} r={money(base)} />
          {extras > 0 && <Row l="Quinoa and extra protein" r={`+${money(extras)}`} />}
          <Row l={how === "Delivery" ? "Delivery" : "Pickup"} r={how === "Pickup" || free ? "Free" : "Confirmed by text"} />
          <div className="flex justify-between items-baseline pt-4 mt-3 border-t border-[#F0E6D6]">
            <span className="font-sans font-semibold">Total</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={total} className="font-serif text-3xl" style={{ fontWeight: 500 }} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ type: "spring", stiffness: 420, damping: 32 }}>
                {money(total)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </RequestForm>
    </Page>
  );
}

function Pick({ label, options, value, onChange, sub }: { label: string; options: string[]; value: string; onChange: (v: string) => void; sub?: (v: string) => string }) {
  return (
    <div>
      <p className="font-sans text-xs font-semibold text-[#8A7060] mb-2">{label}</p>
      <Choice options={options} value={value} onChange={onChange} sub={sub} cols="grid grid-cols-2 sm:grid-cols-4 gap-2" />
    </div>
  );
}

const Row = ({ l, r }: { l: string; r: string }) => (
  <div className="flex justify-between font-sans text-[15px] py-1.5">
    <span className="text-[#5C4B3E]">{l}</span>
    <span>{r}</span>
  </div>
);
