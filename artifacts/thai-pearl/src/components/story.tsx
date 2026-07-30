import { motion } from "framer-motion";
import basketsImg from "@assets/thai-pearl/interior-baskets.png";
import larbImg from "@assets/thai-pearl/food/larb-salad.jpg";

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
            alt="Thai Pearl dining room"
            className="w-full h-full object-cover"
          />
          {/* Accent inset food photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-6 right-6 w-36 md:w-44 aspect-square overflow-hidden shadow-2xl border-[5px] border-[#FDF7EC]"
          >
            <img src={larbImg} alt="Larb Salad" className="w-full h-full object-cover" />
          </motion.div>
          {/* Award badge */}
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
          <p className="font-sans text-[#C4281A] text-[10px] tracking-[0.4em] uppercase font-semibold mb-6">
            The restaurant
          </p>

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
              Our chef trained at the <strong className="font-semibold text-[#180E06]">Royal Palace Academy in Bangkok</strong> and worked alongside a Michelin Star chef in Queensland, Australia.
            </p>
            <p>
              He brought every bit of it to a warm little room on Haywood Rd. Thai Pearl opened March 2020 and won Best New Restaurant that same year. Every dish carries that lineage.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 pt-8 border-t border-[#E8920E]/25 grid grid-cols-3 gap-4">
            {[
              { n: "2020", l: "Best New Restaurant" },
              { n: "Royal Palace", l: "Academy Trained" },
              { n: "Michelin", l: "Kitchen Mentored" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <p className="font-serif text-[#180E06] leading-none mb-2"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", fontWeight: 500 }}>
                  {c.n}
                </p>
                <p className="font-sans text-[#8A7060] text-[9px] uppercase tracking-widest leading-snug">{c.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
