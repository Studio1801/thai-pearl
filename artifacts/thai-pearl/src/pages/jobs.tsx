import { useState } from "react";
import interior from "@assets/thai-pearl/wok-fire.jpg";
import { useSite } from "@/lib/live";
import { Page } from "@/components/page";
import { Choice, ContactFields, DoneText, Field, RequestForm, Section, TextArea, checkContact, useContact } from "@/components/form";

const ROLES = ["Server", "Host", "Line cook", "Prep cook", "Dishwasher", "Delivery driver"];
const WHEN = ["Weekdays", "Weekends", "Lunch", "Dinner"];

export default function JobsPage() {
  const site = useSite();
  const [roles, setRoles] = useState<string[]>([]);
  const [when, setWhen] = useState<string[]>([]);
  const [hours, setHours] = useState("Part time");
  const [about, setAbout] = useState("");
  const c = useContact();
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <Page
      kicker="Work with us"
      thai="ร่วมงานกับเรา"
      image={interior}
      title={<>Join the Thai Pearl family.</>}
      intro={<>We're a small team on Haywood Road and we're always glad to meet good people, front of house or in the kitchen. Tell us a little about you and we'll reach out.</>}
    >
      <RequestForm
        submit="Send application"
        build={() => {
          if (!roles.length) return "Pick at least one role.";
          const bad = checkContact(c.v);
          if (bad) return bad;
          return {
            kind: "job",
            ...c.v,
            note: about,
            details: [
              { label: "Roles", value: roles.join(", ") },
              { label: "Hours", value: hours },
              { label: "Available", value: when.length ? when.join(", ") : "Flexible" },
            ],
          };
        }}
        done={() => (
          <DoneText title="Thanks for applying.">
            <p>We read every one. If it's a fit, we'll call or text to set up a time to come in.</p>
            <p>Questions? Call {site.phone} outside the dinner rush.</p>
          </DoneText>
        )}
      >
        <Section title="What would you like to do?" sub="Pick as many as you like.">
          <Multi options={ROLES} value={roles} onToggle={(v) => toggle(roles, setRoles, v)} />
        </Section>
        <Section title="When can you work?">
          <Choice options={["Part time", "Full time"] as string[]} value={hours} onChange={setHours} cols="grid grid-cols-2 gap-2" />
          <div className="mt-3">
            <Multi options={WHEN} value={when} onToggle={(v) => toggle(when, setWhen, v)} />
          </div>
        </Section>
        <Section title="About you">
          <ContactFields v={c.v} set={c.set} />
          <div className="mt-4">
            <Field label="Experience" hint="optional">
              <TextArea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} placeholder="Where you've worked, what you're good at, when you could start" />
            </Field>
          </div>
        </Section>
      </RequestForm>
    </Page>
  );
}

function Multi({ options, value, onToggle }: { options: string[]; value: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            type="button"
            key={o}
            aria-pressed={on}
            onClick={() => onToggle(o)}
            className={`rounded-lg px-4 py-3 min-h-[48px] font-sans text-[15px] font-semibold transition-colors ${on ? "bg-[#180E06] text-white" : "bg-white border border-[#E2D3BC] hover:border-[#180E06]/50"}`}
          >
            {on && <span aria-hidden className="mr-1.5">&#10003;</span>}
            {o}
          </button>
        );
      })}
    </div>
  );
}
