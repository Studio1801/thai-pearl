import { useEffect, useState } from "react";
import type { Settings } from "@shared/model";
import { DAY_NAMES, formatTime, liveStatus } from "@shared/model";
import { useNow } from "@/lib/live";
import { useSaveSettings } from "./api";
import { Btn, Chips, SectionTitle, Switch, TextField, useToast } from "./ui";

type Draft = Pick<Settings, "banner" | "hours" | "proteins" | "phone">;
const pickDraft = (s: Settings): Draft => structuredClone({ banner: s.banner, hours: s.hours, proteins: s.proteins, phone: s.phone });

export function RestaurantTab({ site }: { site: Settings }) {
  const save = useSaveSettings();
  const toast = useToast();
  const now = useNow(10_000);
  const status = liveStatus(site, now);

  const [draft, setDraft] = useState<Draft>(() => pickDraft(site));
  const dirty = JSON.stringify(draft) !== JSON.stringify(pickDraft(site));
  // follow changes made on another device unless we're mid-edit
  useEffect(() => {
    if (!dirty) setDraft(pickDraft(site));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site.updatedAt]);

  const commit = async (next: Settings, msg: string) => {
    try {
      await save(next);
      toast(msg);
    } catch (e) {
      toast((e as Error).message, true);
    }
  };
  const setOrdering = (change: Partial<Settings["ordering"]>, msg: string) =>
    commit({ ...site, ordering: { ...site.ordering, ...change } }, msg);

  const pausedUntil = status.ordering === "paused" && site.ordering.pausedUntil ? formatTime(site.ordering.pausedUntil) : null;

  return (
    <div className="max-w-2xl space-y-14 pb-28">
      <section>
        <SectionTitle title="Online pickup" hint="Turn it off for the night, or pause it when the kitchen gets slammed. The website updates within a few seconds." />
        <div className="flex items-center justify-between gap-4 py-2">
          <p className="font-sans text-[15px]">
            Taking pickup orders on the website
            <span className="block text-sm text-[#8A7060]">
              {status.ordering === "open" && "Guests can order right now."}
              {status.ordering === "paused" && `Paused until ${pausedUntil}.`}
              {status.ordering === "off" && "Off. The menu still shows, without the order buttons."}
              {status.ordering === "closed" && "On, and it starts taking orders when you open."}
            </span>
          </p>
          <Switch
            label="Taking pickup orders"
            on={site.ordering.enabled}
            onChange={(v) => setOrdering({ enabled: v, pausedUntil: null }, v ? "Pickup orders are on" : "Pickup orders are off")}
          />
        </div>

        {site.ordering.enabled && (
          <div className="mt-5">
            {pausedUntil ? (
              <Btn tone="jade" onClick={() => setOrdering({ pausedUntil: null }, "Taking orders again")}>
                Resume now, paused until {pausedUntil}
              </Btn>
            ) : (
              <>
                <p className="font-sans text-xs font-semibold text-[#8A7060] mb-2">Slammed? Pause for</p>
                <Chips
                  options={[15, 30, 60]}
                  onChange={(m) =>
                    setOrdering({ pausedUntil: new Date(Date.now() + m * 60_000).toISOString() }, `Paused for ${m === 60 ? "an hour" : `${m} minutes`}`)
                  }
                  render={(m) => (m === 60 ? "1 hour" : `${m} min`)}
                />
              </>
            )}
          </div>
        )}

        <div className="mt-7">
          <p className="font-sans text-xs font-semibold text-[#8A7060] mb-2">Orders are ready in about</p>
          <Chips
            options={[10, 15, 20, 30, 45]}
            value={site.ordering.prepMinutes}
            onChange={(m) => setOrdering({ prepMinutes: m }, `Guests now see about ${m} minutes`)}
            render={(m) => `${m} min`}
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Announcement" hint="A strip across the top of every page. Holiday hours, a new special, closing early for a private party." />
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="font-sans text-[15px]">Show it on the website</span>
          <Switch label="Show announcement" on={draft.banner.on} onChange={(v) => setDraft({ ...draft, banner: { ...draft.banner, on: v } })} />
        </div>
        <TextField
          label="What it says"
          value={draft.banner.text}
          onChange={(v) => setDraft({ ...draft, banner: { ...draft.banner, text: v } })}
          placeholder="Khao Soi is back for the weekend"
          maxLength={160}
        />
        {draft.banner.on && draft.banner.text && (
          <div className="mt-3">
            <p className="font-sans text-xs text-[#8A7060] mb-1.5">Preview</p>
            <p className="bg-[#E8920E] text-[#180E06] font-sans text-[13px] font-semibold text-center px-4 py-2">{draft.banner.text}</p>
          </div>
        )}
      </section>

      <section>
        <SectionTitle title="Hours" hint="Shown on the website, and online pickup follows them." />
        <ul className="divide-y divide-[#E4D7C3]">
          {draft.hours.map((d, i) => (
            <li key={i} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
              <span className="w-28 font-sans text-[15px] font-semibold">{DAY_NAMES[i]}</span>
              {d.closed ? (
                <span className="font-sans text-sm text-[#8A7060] flex-1">Closed</span>
              ) : (
                <span className="flex items-center gap-2 flex-1">
                  <TimeInput value={d.open} onChange={(v) => setDraft({ ...draft, hours: draft.hours.map((h, j) => (j === i ? { ...h, open: v } : h)) })} />
                  <span className="font-sans text-sm text-[#8A7060]">to</span>
                  <TimeInput value={d.close} onChange={(v) => setDraft({ ...draft, hours: draft.hours.map((h, j) => (j === i ? { ...h, close: v } : h)) })} />
                </span>
              )}
              <label className="flex items-center gap-2 font-sans text-sm text-[#8A7060]">
                Open
                <Switch
                  label={`${DAY_NAMES[i]} open`}
                  on={!d.closed}
                  onChange={(v) => setDraft({ ...draft, hours: draft.hours.map((h, j) => (j === i ? { ...h, closed: !v } : h)) })}
                />
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle title="Protein add-ons" hint="Added to dishes that ask for a protein." />
        <ul className="space-y-2 max-w-md">
          {draft.proteins.map((p, i) => (
            <li key={i} className="flex items-center gap-3">
              <input
                value={p.label}
                onChange={(e) => setDraft({ ...draft, proteins: draft.proteins.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })}
                className="flex-1 rounded-md bg-white border border-[#E4D7C3] px-3 py-2.5 font-sans text-[15px]"
              />
              <span className="font-sans text-sm text-[#8A7060]">+$</span>
              <input
                value={String(p.price)}
                inputMode="decimal"
                onChange={(e) =>
                  setDraft({ ...draft, proteins: draft.proteins.map((x, j) => (j === i ? { ...x, price: e.target.value as unknown as number } : x)) })
                }
                className="w-20 rounded-md bg-white border border-[#E4D7C3] px-3 py-2.5 font-sans text-[15px]"
              />
              <button onClick={() => setDraft({ ...draft, proteins: draft.proteins.filter((_, j) => j !== i) })} className="font-sans text-sm text-[#8A7060]">
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setDraft({ ...draft, proteins: [...draft.proteins, { label: "", price: 0 }] })}
          className="mt-3 font-sans text-sm font-semibold text-[#C4281A]"
        >
          + Add a protein
        </button>
      </section>

      <section>
        <SectionTitle title="Phone number" />
        <div className="max-w-xs">
          <TextField label="Shown on the website" value={draft.phone} onChange={(v) => setDraft({ ...draft, phone: v })} inputMode="tel" />
        </div>
      </section>

      {dirty && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#180E06] text-[#FDF7EC]">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-3.5 flex items-center justify-between gap-4">
            <span className="font-sans text-sm">You have changes that aren't on the website yet.</span>
            <span className="flex items-center gap-4">
              <button onClick={() => setDraft(pickDraft(site))} className="font-sans text-sm text-white/60 hover:text-white">
                Undo
              </button>
              <Btn
                tone="crimson"
                onClick={() =>
                  commit(
                    {
                      ...site,
                      ...draft,
                      proteins: draft.proteins.filter((p) => p.label.trim()).map((p) => ({ label: p.label.trim(), price: Number(p.price) || 0 })),
                    },
                    "Saved. It's live on the website.",
                  )
                }
              >
                Publish changes
              </Btn>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function TimeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="time"
      step={900}
      value={value.padStart(5, "0")}
      onChange={(e) => e.target.value && onChange(e.target.value)}
      className="rounded-md bg-white border border-[#E4D7C3] px-2.5 py-2 font-sans text-[15px]"
    />
  );
}
