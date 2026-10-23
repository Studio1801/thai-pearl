import { Link } from "wouter";
import interiorCat from "@assets/thai-pearl/food/thai-dishes.jpg";
import { restaurantNow } from "@shared/model";
import { useSite } from "@/lib/live";
import { Page, Reveal } from "@/components/page";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function EventsPage() {
  const site = useSite();
  const today = restaurantNow().day;
  const events = (site.events ?? []).filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const specials = site.specials ?? [];

  return (
    <Page
      kicker="Events and specials"
      thai="กิจกรรม"
      image={interiorCat}
      title={<>What's on at Thai Pearl</>}
      intro={<>Deals running now and the nights worth planning around. Updated by the kitchen, so it's always current.</>}
    >
      <section>
        <h2 className="font-serif text-3xl" style={{ fontWeight: 500 }}>Specials</h2>
        {specials.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {specials.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06} className="bg-[#180E06] thai-pattern-dark text-white rounded-lg p-7">
                <p className="font-sans text-sm text-[#E8920E] font-semibold">{s.when}</p>
                <p className="font-serif text-2xl md:text-3xl mt-2 leading-tight" style={{ fontWeight: 500 }}>{s.title}</p>
                <p className="font-sans text-white/65 leading-relaxed mt-3">{s.detail}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="font-sans text-[#8A7060] mt-4">No specials running right now. Check back soon.</p>
        )}
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl" style={{ fontWeight: 500 }}>Coming up</h2>
        {events.length ? (
          <div className="mt-6 divide-y divide-[#E8DCC8] border-y border-[#E8DCC8]">
            {events.map((e, i) => {
              const d = new Date(`${e.date}T12:00:00Z`);
              return (
                <Reveal key={e.id} delay={i * 0.05} className="flex gap-5 md:gap-8 py-6">
                  <div className="w-16 md:w-20 flex-shrink-0 text-center">
                    <p className="font-sans text-xs text-[#C4281A] font-semibold">{MONTHS[d.getUTCMonth()]}</p>
                    <p className="font-serif text-4xl md:text-5xl leading-none mt-1" style={{ fontWeight: 500 }}>{d.getUTCDate()}</p>
                    <p className="font-sans text-xs text-[#8A7060] mt-1">{DOW[d.getUTCDay()].slice(0, 3)}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-2xl leading-tight" style={{ fontWeight: 500 }}>{e.title}</p>
                    {e.time && <p className="font-sans text-sm text-[#8A7060] mt-1">{e.time}</p>}
                    {e.detail && <p className="font-sans text-[#5C4B3E] leading-relaxed mt-2">{e.detail}</p>}
                    <Link href="/reserve" className="inline-block font-sans text-sm font-semibold mt-3 underline underline-offset-4 decoration-[#180E06]/25 min-h-[44px] pt-2">
                      Book a table
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <p className="font-sans text-[#8A7060] mt-4">Nothing on the calendar yet. Follow us on Instagram for what's next.</p>
        )}
      </section>

      <Reveal className="mt-16 rounded-lg bg-[#C4281A] text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div>
          <p className="font-serif text-3xl leading-tight" style={{ fontWeight: 500 }}>Planning a holiday party?</p>
          <p className="font-sans text-white/75 mt-2">We host office parties, birthdays and family dinners in the dining room.</p>
        </div>
        <Link href="/parties" className="bg-white text-[#180E06] rounded-lg px-7 py-4 font-sans font-bold text-center hover:bg-[#FDF7EC] transition-colors">
          Ask about a party
        </Link>
      </Reveal>
    </Page>
  );
}
