import { motion } from "framer-motion";
import padThaiImg from "@assets/thai-pearl/food/pad-thai.jpg";
import wideNoodlesImg from "@assets/thai-pearl/menu-page.jpg";

export function Story() {
  return (
    <section id="story" className="relative bg-[#FBF5E8] thai-pattern-light">
      <div className="container mx-auto px-8 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[#B5311E] text-xs tracking-[0.35em] uppercase mb-5">
              The restaurant
            </p>
            <h2
              className="font-serif font-light text-[#1E1209] leading-[0.92] mb-8"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
            >
              Trained where
              <br />
              <em className="text-[#B5311E]">kings eat.</em>
              <br />
              Cooking where
              <br />
              <em>you live.</em>
            </h2>
            <div className="space-y-5 font-sans text-[#3D2B1F] text-base md:text-lg leading-relaxed max-w-md">
              <p>
                Our chef trained at the Royal Palace Academy in Bangkok and worked alongside
                a Michelin Star chef in Queensland, Australia. He brought all of it to a
                warm little room on Haywood Rd.
              </p>
              <p>
                Thai Pearl opened March 2020 and won Best New Restaurant that same year.
                Every dish on the menu carries that same care. No shortcuts, no compromises.
              </p>
            </div>

            <div className="mt-10 flex gap-8 border-t border-[#D4891A]/30 pt-8">
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
                  <p className="font-serif font-light text-[#1E1209] text-xl md:text-2xl mb-1">{c.n}</p>
                  <p className="font-sans text-[#8A7060] text-[10px] uppercase tracking-wider leading-snug">{c.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Photos — overlapping */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 w-[85%] aspect-[3/4] overflow-hidden shadow-2xl">
              <img src={padThaiImg} alt="Pad Thai" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[-2.5rem] right-0 z-20 w-[52%] aspect-square overflow-hidden shadow-xl border-4 border-[#FBF5E8]">
              <img src={wideNoodlesImg} alt="Drunken Noodles" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 right-[14%] z-30 bg-[#B5311E] text-white font-sans font-semibold text-[10px] tracking-[0.2em] uppercase px-3 py-2 shadow-lg">
              Best New Restaurant 2020
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
