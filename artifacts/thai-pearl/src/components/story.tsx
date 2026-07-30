import { motion } from "framer-motion";
import basketsImg from "@assets/thai-pearl/interior-baskets.png";
import padThaiImg from "@assets/thai-pearl/food/pad-thai.jpg";

export function Story() {
  return (
    <section id="story" className="relative bg-[#FBF5E8] thai-pattern-light overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Photo column — baskets wall interior */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative overflow-hidden min-h-[50vh] lg:min-h-[680px]"
        >
          <img
            src={basketsImg}
            alt="Thai Pearl dining room"
            className="w-full h-full object-cover object-center"
          />
          {/* Small food photo overlapping bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="absolute bottom-6 right-6 w-40 md:w-52 aspect-square overflow-hidden shadow-2xl border-4 border-[#FBF5E8]"
          >
            <img src={padThaiImg} alt="Pad Thai" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="flex flex-col justify-center px-8 md:px-14 py-16 md:py-20"
        >
          <p className="font-sans text-[#B5311E] text-xs tracking-[0.35em] uppercase mb-6">
            The restaurant
          </p>
          <h2
            className="font-serif font-light text-[#1E1209] leading-[0.92] mb-8"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
          >
            Trained where
            <br />
            <em className="text-[#B5311E]">kings eat.</em>
            <br />
            Cooking where
            <br />
            <em>you live.</em>
          </h2>

          <div className="space-y-5 font-sans text-[#3D2B1F] text-base leading-relaxed max-w-md">
            <p>
              Our chef trained at the Royal Palace Academy in Bangkok and worked alongside
              a Michelin Star chef in Queensland, Australia. He brought all of it to
              this warm little room on Haywood Rd.
            </p>
            <p>
              Thai Pearl opened March 2020 and won Best New Restaurant that same year.
              Every dish on the menu carries that same care. No shortcuts, no compromises.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-[#D4891A]/30 grid grid-cols-3 gap-4">
            {[
              { n: "2020", l: "Best New Restaurant" },
              { n: "Royal Palace", l: "Academy Trained" },
              { n: "Michelin", l: "Kitchen Mentored" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <p className="font-serif font-light text-[#1E1209] text-lg md:text-xl mb-1">{c.n}</p>
                <p className="font-sans text-[#8A7060] text-[10px] uppercase tracking-wider leading-snug">{c.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
