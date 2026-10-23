import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import menuBgImg from "@assets/thai-pearl/menu-page.jpg";
import { useState } from "react";
import type { MenuItem } from "@shared/model";
import { SPICE, isSoldOut, liveStatus, money, priceLabel } from "@shared/model";
import { useNow, useSite } from "@/lib/live";
import { ItemSheet } from "@/components/order/item-sheet";
import { BagBar } from "@/components/order/bag";

const SPICE_THAI = ["เผ็ดน้อย", "เผ็ดกลาง", "เผ็ด!", "เผ็ดมาก!!", "เผ็ดไทยแท้!!!"];

export default function MenuPage() {
  const site = useSite();
  const now = useNow();
  const status = liveStatus(site, now);
  const canOrder = status.ordering === "open";
  const [picked, setPicked] = useState<{ item: MenuItem; categoryId: string } | null>(null);
  const categories = site.menu
    .map((c) => ({ ...c, items: c.items.filter((i) => !i.hidden) }))
    .filter((c) => c.items.length);
  const proteinNote = Object.entries(
    site.proteins.reduce<Record<string, string[]>>((acc, p) => {
      (acc[money(p.price)] ??= []).push(p.label);
      return acc;
    }, {}),
  )
    .map(([price, labels]) => `${labels.join(" / ")} +${price}`)
    .join("  |  ");
  const tel = `tel:${site.phone.replace(/\D/g, "")}`;

  return (
    <div className="bg-[#FDF7EC] min-h-screen font-sans selection:bg-[#C4281A] selection:text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={menuBgImg} alt="Thai Pearl Menu" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180E06]/75 via-[#180E06]/50 to-[#FDF7EC]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <p className="font-sans text-[#E8920E] text-[13px] font-semibold mb-1">Thai Pearl</p>
          <p className="font-serif text-[#E8920E]/50 text-base tracking-widest mb-4" style={{ fontWeight: 400 }}>ไทยเพิร์ล</p>
          <h1 className="font-serif text-white leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 500 }}>
            Our Menu
          </h1>
          <p className="font-serif text-white/30 mt-2" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 400 }}>
            เมนูอาหาร
          </p>
        </div>
      </div>

      {/* Ordering note */}
      <div className="bg-[#180E06] thai-pattern-dark py-5 px-8 text-center">
        <p className="font-sans text-white/55 text-sm">
          <span className="text-[#E8920E] font-semibold">Protein add-ons:</span> {proteinNote}
          &nbsp;&nbsp;
          <span className="text-[#E8920E] font-semibold">Spice:</span> 1 Mild to 5 Thai Hot
        </p>
      </div>

      {/* Live pickup status */}
      <div className={`px-8 py-4 text-center font-sans text-sm ${canOrder ? "bg-[#F4E7D2] text-[#3A2A1E]" : "bg-[#C4281A] text-white"}`}>
        {canOrder ? (
          <p>
            <span className="font-semibold">Order pickup right here.</span> Tap any dish to add it. Ready in about{" "}
            {site.ordering.prepMinutes} minutes, pay when you pick up.
          </p>
        ) : status.ordering === "paused" ? (
          <p>
            The kitchen paused online pickup for a few minutes.{" "}
            <a href={tel} className="underline font-semibold">
              Call {site.phone}
            </a>{" "}
            and we'll take it by phone.
          </p>
        ) : (
          <p>
            Online pickup is closed right now. {status.label}.
          </p>
        )}
      </div>

      {/* Menu categories */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-5xl">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* Category header */}
            <div className="mb-4 pb-3 border-b-2 border-[#180E06]">
              <div className="flex items-baseline gap-4 flex-wrap">
                <h2 className="font-serif text-[#180E06] leading-none" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 500 }}>
                  {cat.name}
                </h2>
                <span className="font-serif text-[#C4281A]/45 leading-none" style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: 400 }}>
                  {cat.thai}
                </span>
              </div>
              {cat.note && <p className="font-sans text-[#8A7060] text-xs mt-2">{cat.note}</p>}
            </div>

            {/* Items */}
            <div className="divide-y divide-[#E8DCC8]">
              {cat.items.map((item) => {
                const out = isSoldOut(item, now);
                const clickable = canOrder && !out;
                return (
                  <div
                    key={item.id}
                    onClick={clickable ? () => setPicked({ item, categoryId: cat.id }) : undefined}
                    className={`py-4 flex items-start justify-between gap-6 ${clickable ? "cursor-pointer group" : ""} ${out ? "opacity-55" : ""}`}
                  >
                    <div className="flex-1">
                      {/* Name + Thai inline */}
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <p className="font-sans font-semibold text-[#180E06] text-base leading-snug group-hover:text-[#C4281A] transition-colors">
                          {item.name}
                        </p>
                        {item.thai && (
                          <p className="font-serif text-[#C4281A]/50 text-sm leading-none" style={{ fontWeight: 400 }}>
                            {item.thai}
                          </p>
                        )}
                      </div>
                      {item.desc && (
                        <p className="font-sans text-[#7A6A60] text-sm mt-1 leading-relaxed max-w-xl">
                          {item.desc}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0 max-w-[8.5rem]">
                      <p className="font-serif text-[#C4281A] mt-0.5 text-right" style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                        {priceLabel(item)}
                      </p>
                      {out ? (
                        <span className="font-sans text-xs font-semibold text-[#180E06]/70">Sold out today</span>
                      ) : canOrder ? (
                        <span className="font-sans text-sm font-semibold text-[#C4281A] underline decoration-[#C4281A]/30 underline-offset-4 group-hover:decoration-[#C4281A] transition-colors">
                          + Add
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Spice levels */}
        <div className="mt-4 mb-16 bg-[#180E06] thai-pattern-dark p-8 md:p-10">
          <div className="flex items-baseline gap-3 mb-5">
            <p className="font-sans text-[#E8920E] text-[13px] font-semibold">Spice Levels</p>
            <p className="font-serif text-[#E8920E]/40 text-sm" style={{ fontWeight: 400 }}>ระดับความเผ็ด</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {SPICE.map((label, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-sans text-white/70 text-sm">{i + 1} {label}</span>
                <span className="font-serif text-[#E8920E]/45 text-sm" style={{ fontWeight: 400 }}>{SPICE_THAI[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order CTA */}
        <div className="text-center pb-8">
          <p className="font-sans text-[#8A7060] text-sm mb-1">Ready to order?</p>
          <p className="font-serif text-[#8A7060]/55 text-base mb-6" style={{ fontWeight: 400 }}>พร้อมสั่งแล้วหรือยัง</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.grubhub.com/search?locationQuery=747+Haywood+Rd+Asheville+NC&queryText=Thai+Pearl"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-red"
            >
              Order delivery
            </a>
            <Link
              href="/reserve"
              className="btn btn-line"
            >
              Book a table
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      <ItemSheet item={picked?.item ?? null} categoryId={picked?.categoryId ?? ""} site={site} onClose={() => setPicked(null)} />
      <BagBar site={site} />
    </div>
  );
}
