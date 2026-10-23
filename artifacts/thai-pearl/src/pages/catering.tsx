import { useMemo, useState } from "react";
import baskets from "@assets/thai-pearl/interior-baskets.png";
import exterior from "@assets/thai-pearl/exterior.png";
import { useSite } from "@/lib/live";
import { longDate, nextDays } from "@/lib/requests";
import { Page, Reveal } from "@/components/page";
import { Choice, ContactFields, DoneText, Field, Input, RequestForm, Section, Stepper, TextArea, checkContact, useContact } from "@/components/form";

type Kind = "catering" | "party";
const OCCASIONS: Record<Kind, string[]> = {
  catering: ["Birthday", "Wedding", "Business", "Other"],
  party: ["Birthday", "Anniversary", "Family reunion", "Business", "Holiday party", "Other"],
};

export default function CateringPage({ initial = "catering" }: { initial?: Kind }) {
  const site = useSite();
  const [kind, setKind] = useState<Kind>(initial);
  const days = useMemo(() => nextDays(120, 2), []);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(25);
  const [occasion, setOccasion] = useState(OCCASIONS[initial][0]);
  const [service, setService] = useState("Pickup");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const c = useContact();
  const min = days[0].iso, max = days[days.length - 1].iso;

  return (
    <Page
      kicker="Catering and private parties"
      thai="จัดเลี้ยง"
      image={baskets}
      title={<>Feed the whole crowd.</>}
      intro={<>Catering for up to 100 guests, picked up or delivered. Or bring everyone here for a birthday, an anniversary, a reunion or the office holiday party.</>}
    >
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
        {(
          [
            ["catering", "Catering", "Noodles, rice dishes and curries for birthdays, weddings and business lunches. Up to 100 guests, pickup or delivery.", baskets],
            ["party", "Private parties", "Group dinners in our West Asheville dining room. Birthdays, anniversaries, family reunions and business functions.", exterior],
          ] as [Kind, string, string, string][]
        ).map(([k, title, body, img]) => (
          <button
            type="button"
            key={k}
            onClick={() => {
              setKind(k);
              setOccasion(OCCASIONS[k][0]);
              document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`group text-left rounded-lg overflow-hidden bg-white border transition-colors ${kind === k ? "border-[#180E06]" : "border-[#E8DCC8] hover:border-[#180E06]/40"}`}
          >
            <div className="h-40 overflow-hidden">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
            </div>
            <div className="p-6">
              <p className="font-serif text-2xl" style={{ fontWeight: 500 }}>{title}</p>
              <p className="font-sans text-sm text-[#5C4B3E] leading-relaxed mt-2">{body}</p>
              <p className="font-sans text-sm font-semibold mt-4 underline underline-offset-4 decoration-[#180E06]/25">Ask about {k === "catering" ? "catering" : "a party"}</p>
            </div>
          </button>
        ))}
      </Reveal>

      <div id="inquiry" className="scroll-mt-28" />
      <RequestForm
        submit={kind === "catering" ? "Send catering request" : "Send party request"}
        build={() => {
          if (!date) return "Please pick a date.";
          const bad = checkContact(c.v);
          if (bad) return bad;
          if (kind === "catering" && service === "Delivery" && address.trim().length < 6) return "Please add the delivery address.";
          return {
            kind,
            ...c.v,
            date,
            time: time || undefined,
            guests,
            note,
            details: [
              { label: "Occasion", value: occasion },
              ...(kind === "catering" ? [{ label: "Service", value: service === "Delivery" ? `Delivery to ${address.trim()}` : "Pickup" }] : []),
            ],
          };
        }}
        done={(p) => (
          <DoneText title="Thanks, we've got it.">
            <p>
              {p.kind === "catering" ? "Catering" : "A private party"} for {p.guests} on {longDate(p.date!)}. We'll call or text {p.phone} within a day to talk menu and pricing.
            </p>
            <p>In a hurry? Call {site.phone}.</p>
          </DoneText>
        )}
      >
        <Section title="What are you planning?">
          <Choice
            options={["catering", "party"] as Kind[]}
            value={kind}
            onChange={(k) => {
              setKind(k);
              setOccasion(OCCASIONS[k][0]);
            }}
            render={(k) => (k === "catering" ? "Catering" : "Private party")}
            sub={(k) => (k === "catering" ? "We cook, you host" : "Here at Thai Pearl")}
            cols="grid grid-cols-2 gap-2"
          />
          <p className="font-sans text-xs font-semibold text-[#8A7060] mt-6 mb-2">Occasion</p>
          <Choice options={OCCASIONS[kind]} value={occasion} onChange={setOccasion} />
        </Section>

        <Section title="When, and how many?">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Date" hint="at least 2 days out">
              <Input type="date" min={min} max={max} value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Time" hint="optional">
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Field>
          </div>
          <p className="font-sans text-sm font-semibold mt-6 mb-3">Guests</p>
          <Stepper value={guests} onChange={setGuests} min={5} max={kind === "catering" ? 100 : 80} label="guests" />
          {kind === "catering" && (
            <>
              <p className="font-sans text-xs font-semibold text-[#8A7060] mt-6 mb-2">Pickup or delivery</p>
              <Choice options={["Pickup", "Delivery"] as string[]} value={service} onChange={setService} cols="grid grid-cols-2 gap-2" />
              {service === "Delivery" && (
                <div className="mt-4">
                  <Field label="Delivery address">
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city" autoComplete="street-address" />
                  </Field>
                </div>
              )}
            </>
          )}
        </Section>

        <Section title="Your details">
          <ContactFields v={c.v} set={c.set} />
          <div className="mt-4">
            <Field label="Tell us more" hint="optional">
              <TextArea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Dishes you love, dietary needs, budget per person" />
            </Field>
          </div>
        </Section>
      </RequestForm>
    </Page>
  );
}
