import { useState } from "react";
import type { GuestRequest, RequestKind } from "@shared/model";
import { REQUEST_LABEL, money } from "@shared/model";
import { longDate } from "@/lib/requests";
import { useRequests, useSetRequestStatus } from "./api";
import { Btn, useToast } from "./ui";

type Filter = "open" | RequestKind | "all";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "open", label: "Needs a reply" },
  { id: "reservation", label: "Tables" },
  { id: "mealprep", label: "Meal prep" },
  { id: "catering", label: "Catering" },
  { id: "party", label: "Parties" },
  { id: "job", label: "Jobs" },
  { id: "newsletter", label: "Newsletter" },
  { id: "all", label: "Everything" },
];

const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  return `${Math.round(h / 24)} days ago`;
};

export function RequestsTab() {
  const { data, isLoading } = useRequests();
  const [filter, setFilter] = useState<Filter>("open");
  const list = data?.requests ?? [];
  const shown = list.filter((r) => (filter === "all" ? true : filter === "open" ? r.status === "new" && r.kind !== "newsletter" : r.kind === filter));
  const count = (f: Filter) => list.filter((r) => (f === "open" ? r.status === "new" && r.kind !== "newsletter" : f === "all" ? true : r.kind === f)).length;
  const emails = list.filter((r) => r.kind === "newsletter").map((r) => r.email);

  return (
    <div className="pb-24">
      <div className="-mx-5 px-5 md:mx-0 md:px-0 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2.5 font-sans text-sm whitespace-nowrap transition-colors ${
                filter === f.id ? "bg-[#180E06] text-[#FDF7EC] font-semibold" : "bg-[#180E06]/[0.07] hover:bg-[#180E06]/[0.12]"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 ${filter === f.id ? "text-white/60" : "text-[#8A7060]"}`}>{count(f.id)}</span>
            </button>
          ))}
        </div>
      </div>

      {filter === "newsletter" && emails.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Btn
            tone="ink"
            onClick={() => {
              const blob = new Blob(["email,joined\n" + list.filter((r) => r.kind === "newsletter").map((r) => `${r.email},${r.createdAt.slice(0, 10)}`).join("\n")], { type: "text/csv" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "thai-pearl-newsletter.csv";
              a.click();
            }}
          >
            Download {emails.length} emails
          </Btn>
          <span className="font-sans text-sm text-[#8A7060]">Opens in Mailchimp, Gmail or any email tool.</span>
        </div>
      )}

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {isLoading ? (
          <p className="font-sans text-sm text-[#8A7060]">Loading...</p>
        ) : shown.length === 0 ? (
          <p className="font-sans text-[15px] text-[#8A7060] md:col-span-2 py-10">
            {filter === "open" ? "All caught up. New table requests, meal prep orders, catering, party and job inquiries from the website land here." : "Nothing here yet."}
          </p>
        ) : (
          shown.map((r) => <Card key={r.id} r={r} />)
        )}
      </div>
    </div>
  );
}

function Card({ r }: { r: GuestRequest }) {
  const setStatus = useSetRequestStatus();
  const toast = useToast();
  const [armed, setArmed] = useState(false);
  const act = async (s: GuestRequest["status"], msg: string) => {
    try {
      await setStatus(r.id, s);
      toast(msg);
    } catch (e) {
      toast((e as Error).message, true);
    }
  };
  const isNew = r.status === "new";
  const tel = r.phone.replace(/\D/g, "");
  const confirmWord = r.kind === "reservation" ? "Confirm table" : r.kind === "mealprep" ? "Confirm order" : r.kind === "job" ? "Mark contacted" : "Mark replied";

  if (r.kind === "newsletter")
    return (
      <div className="bg-white rounded-lg border border-[#E4D7C3] px-5 py-4 flex justify-between gap-4">
        <span className="font-sans text-[15px] truncate">{r.email}</span>
        <span className="font-sans text-sm text-[#8A7060] flex-shrink-0">{ago(r.createdAt)}</span>
      </div>
    );

  return (
    <article className={`rounded-lg border p-5 ${isNew ? "bg-[#FFF6DC] border-[#E8C46A]" : "bg-white border-[#E4D7C3]"} ${r.status === "declined" ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-sans text-xs font-semibold text-[#8A7060]">
            {REQUEST_LABEL[r.kind]} &middot; {ago(r.createdAt)}
          </p>
          <h3 className="font-serif text-2xl leading-tight mt-1" style={{ fontWeight: 500 }}>
            {r.name}
          </h3>
        </div>
        {(r.guests || r.total) && (
          <p className="font-serif text-2xl text-right flex-shrink-0" style={{ fontWeight: 500 }}>
            {r.total ? money(r.total) : r.guests}
            <span className="block font-sans text-xs text-[#8A7060]">{r.total ? `${r.guests} meals` : r.guests === 1 ? "guest" : "guests"}</span>
          </p>
        )}
      </div>
      {r.date && (
        <p className="font-sans text-[15px] font-semibold mt-3">
          {longDate(r.date)}
          {r.time ? `, ${r.time}` : ""}
        </p>
      )}
      {r.details.length > 0 && (
        <dl className="mt-3 space-y-1">
          {r.details.map((d, i) => (
            <div key={i} className="flex gap-3 font-sans text-sm">
              <dt className="text-[#8A7060] w-24 flex-shrink-0">{d.label}</dt>
              <dd className="min-w-0">{d.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {r.note && <p className="font-sans text-sm mt-3 bg-[#180E06]/[0.05] rounded-md px-3 py-2">{r.note}</p>}

      <div className="flex flex-wrap items-center gap-2 mt-5">
        {isNew ? (
          <>
            <Btn tone="ink" onClick={() => act("confirmed", r.kind === "reservation" ? `Table confirmed. Text ${r.name.split(" ")[0]} to let them know.` : "Done")}>
              {confirmWord}
            </Btn>
            <Btn
              tone="quiet"
              onClick={() => {
                if (!armed) {
                  setArmed(true);
                  setTimeout(() => setArmed(false), 2500);
                  return;
                }
                act("declined", "Declined");
              }}
            >
              {armed ? "Tap again" : "Decline"}
            </Btn>
          </>
        ) : (
          <span className={`font-sans text-sm font-semibold ${r.status === "declined" ? "text-[#8A7060]" : "text-[#0F7A6B]"}`}>
            {r.status === "declined" ? "Declined" : r.status === "done" ? "Closed" : "Confirmed"}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-1 mt-3 -ml-3">
        {tel && (
          <>
            <a href={`sms:${tel}`} className="font-sans text-sm font-semibold px-3 py-2.5 rounded-md hover:bg-[#180E06]/[0.07]">
              Text
            </a>
            <a href={`tel:${tel}`} className="font-sans text-sm font-semibold px-3 py-2.5 rounded-md hover:bg-[#180E06]/[0.07]">
              Call
            </a>
          </>
        )}
        {r.email && (
          <a href={`mailto:${r.email}`} className="font-sans text-sm font-semibold px-3 py-2.5 rounded-md hover:bg-[#180E06]/[0.07]">
            Email
          </a>
        )}
        <span className="font-sans text-xs text-[#8A7060] ml-auto">{r.phone}</span>
      </div>
    </article>
  );
}
