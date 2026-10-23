import { useMemo, useState } from "react";
import { Link } from "wouter";
import interior from "@assets/thai-pearl/interior-cat.png";
import { minutesToClock, restaurantNow, toMinutes } from "@shared/model";
import { useSite } from "@/lib/live";
import { nextDays, longDate } from "@/lib/requests";
import { Page } from "@/components/page";
import { Choice, ContactFields, DoneText, Field, RequestForm, Section, Stepper, TextArea, checkContact, useContact } from "@/components/form";

export default function ReservePage() {
  const site = useSite();
  const days = useMemo(() => nextDays(21), []);
  const [day, setDay] = useState(days[0].iso);
  const [time, setTime] = useState<number | undefined>();
  const [party, setParty] = useState(2);
  const [note, setNote] = useState("");
  const c = useContact();

  const picked = days.find((d) => d.iso === day) ?? days[0];
  const hours = site.hours[picked.dow];
  const slots = useMemo(() => {
    if (hours.closed) return [];
    const open = toMinutes(hours.open), close = toMinutes(hours.close);
    const now = restaurantNow();
    const out: number[] = [];
    for (let t = open; t <= close - 60; t += 30) if (!picked.isToday || t > now.minutes + 30) out.push(t);
    return out;
  }, [hours, picked]);
  const lunch = slots.filter((t) => t < 17 * 60), dinner = slots.filter((t) => t >= 17 * 60);
  const big = party >= 13;

  return (
    <Page
      kicker="Reservations"
      thai="จองโต๊ะ"
      image={interior}
      title={<>Book a table</>}
      intro={<>Pick a day, a time and how many of you are coming. We'll text you to confirm. Walk-ins are always welcome too.</>}
    >
      <RequestForm
        submit="Request this table"
        build={() => {
          if (time === undefined) return "Please pick a time.";
          if (big) return "For 13 or more, please use the private party form so we can set up the room.";
          const bad = checkContact(c.v);
          if (bad) return bad;
          return {
            kind: "reservation",
            ...c.v,
            date: day,
            time: minutesToClock(time),
            guests: party,
            note,
            details: [{ label: "Party", value: `${party} ${party === 1 ? "guest" : "guests"}` }],
          };
        }}
        done={(p) => (
          <DoneText title="Your table request is in.">
            <p>
              {p.guests} {p.guests === 1 ? "guest" : "guests"} on {longDate(p.date!)} at {p.time}. We'll text {p.phone} to confirm, usually within the hour while we're open.
            </p>
            <p>Need to change it? Call us at {site.phone}.</p>
          </DoneText>
        )}
      >
        <Section title="Which day?">
          <div className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
              {days.map((d) => {
                const on = d.iso === day;
                const closed = site.hours[d.dow].closed;
                return (
                  <button
                    type="button"
                    key={d.iso}
                    disabled={closed}
                    onClick={() => {
                      setDay(d.iso);
                      setTime(undefined);
                    }}
                    aria-pressed={on}
                    className={`w-[68px] flex-shrink-0 rounded-lg py-3 text-center transition-colors disabled:opacity-30 ${
                      on ? "bg-[#180E06] text-white" : "bg-white border border-[#E2D3BC] hover:border-[#180E06]/50"
                    }`}
                  >
                    <span className={`block text-xs ${on ? "text-white/60" : "text-[#8A7060]"}`}>{d.isToday ? "Today" : d.short}</span>
                    <span className="block font-serif text-2xl leading-tight" style={{ fontWeight: 500 }}>
                      {d.day}
                    </span>
                    <span className={`block text-[11px] ${on ? "text-white/50" : "text-[#8A7060]"}`}>{d.month}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        <Section title="What time?" sub={hours.closed ? "We're closed that day." : `${picked.long}. Last seating an hour before close.`}>
          {slots.length === 0 ? (
            <p className="font-sans text-[#8A7060]">No times left today. Try tomorrow.</p>
          ) : (
            <div className="space-y-5">
              {[["Lunch", lunch], ["Dinner", dinner]].map(([label, list]) =>
                (list as number[]).length ? (
                  <div key={label as string}>
                    <p className="font-sans text-xs font-semibold text-[#8A7060] mb-2">{label as string}</p>
                    <Choice options={list as number[]} value={time} onChange={setTime} render={(t) => minutesToClock(t)} cols="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2" />
                  </div>
                ) : null,
              )}
            </div>
          )}
        </Section>

        <Section title="How many of you?">
          <Stepper value={party} onChange={setParty} min={1} max={20} label="guests" />
          {big && (
            <p className="font-sans text-sm mt-4 bg-[#E8920E]/15 rounded-lg px-4 py-3">
              That's a party. <Link href="/parties" className="font-semibold underline underline-offset-4">Use the private party form</Link> and we'll set up the room for you.
            </p>
          )}
        </Section>

        <Section title="Who's it for?">
          <ContactFields v={c.v} set={c.set} />
          <div className="mt-4">
            <Field label="Anything we should know?" hint="optional">
              <TextArea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Birthday, high chair, patio with the dog, allergies" />
            </Field>
          </div>
        </Section>
      </RequestForm>
    </Page>
  );
}
