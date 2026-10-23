import { motion } from "framer-motion";
import basketsImg from "@assets/thai-pearl/food/table-spread.jpg";

export function Story() {
  return (
    <section id="story" className="bg-[#FDF7EC] thai-pattern-light overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* Photo half */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative overflow-hidden min-h-[420px] lg:min-h-0"
        >
          <img
            src={basketsImg}
            alt="Cashew stir fry, pad thai and a crispy taco on the table at Thai Pearl"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 bg-[#C4281A] text-white font-sans font-bold text-[9px] tracking-[0.25em] uppercase px-3 py-2">
            Best New Restaurant 2020
          </div>
        </motion.div>

        {/* Text half */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20"
        >
          <div className="mb-6">
            <p className="font-sans text-[#C4281A] text-[10px] tracking-[0.4em] uppercase font-semibold">
              The restaurant
            </p>
            <p className="font-serif text-[#C4281A]/50 text-sm tracking-wider mt-0.5" style={{ fontWeight: 400 }}>
              อาหารไทยแท้
            </p>
          </div>

          <h2
            className="font-serif leading-[0.9] mb-8 tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)", fontWeight: 500 }}
          >
            <span className="text-[#180E06]">Trained where</span>
            <br />
            <em className="text-[#C4281A]" style={{ fontStyle: "italic", fontWeight: 500 }}>kings eat.</em>
            <br />
            <span className="text-[#180E06]">Cooking where</span>
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>you live.</em>
          </h2>

          <div className="space-y-4 font-sans text-[#3A2A1E] text-[15px] leading-relaxed max-w-sm">
            <p>
              The chef didn't open Thai Pearl to serve the version of Thai food you've had before.
              He trained at the <strong className="font-semibold text-[#180E06]">Royal Palace Academy in Bangkok</strong>, worked a <strong className="font-semibold text-[#180E06]">Michelin Star kitchen</strong> in Australia, and brought all of it to a room on Haywood Rd.
            </p>
            <p>
              Thai Pearl opened in March 2020, the worst possible month, and won Best New Restaurant anyway.
              That hasn't changed anything about how the food is made.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 pt-8 border-t border-[#E8920E]/25 flex flex-row gap-0">
            {[
              { n: "2020",         thai: null,        l: "Best New Restaurant" },
              { n: "Royal Palace", thai: "พระราชวัง", l: "Academy Trained" },
              { n: "Michelin",     thai: "มิชลิน",    l: "Kitchen Mentored" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className={`flex-1 min-w-0 ${i > 0 ? "pl-5 border-l border-[#E8920E]/18" : ""}`}
              >
                <p className="font-serif text-[#180E06] leading-none mb-1 truncate"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 1.4rem)", fontWeight: 500 }}>
                  {c.n}
                </p>
                {c.thai && (
                  <p className="font-serif text-[#C4281A]/45 leading-none mb-1.5 text-sm" style={{ fontWeight: 400 }}>
                    {c.thai}
                  </p>
                )}
                <p className="font-sans text-[#8A7060] text-[9px] uppercase tracking-widest leading-snug">{c.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
