import { liveStatus } from "@shared/model";
import { useNow, useSite } from "@/lib/live";

/** The owner's announcement from the dashboard, plus a heads-up when online pickup is paused. */
export function LiveBanner() {
  const site = useSite();
  const now = useNow();
  const status = liveStatus(site, now);
  const paused = status.ordering === "paused";
  const text = site.banner.on && site.banner.text ? site.banner.text : null;
  if (!text && !paused) return null;

  return (
    <div className="relative bg-[#E8920E] text-[#180E06] font-sans text-[13px] leading-snug" style={{ textShadow: "none" }}>
      <div className="container mx-auto px-8 md:px-16 py-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center">
        {text && <p className="font-semibold">{text}</p>}
        {paused && (
          <p>
            Online pickup is paused for a few minutes.{" "}
            <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="underline underline-offset-2 font-semibold">
              Call {site.phone}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
