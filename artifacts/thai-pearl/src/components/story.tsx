import { motion } from "framer-motion";
import chefImg from "@assets/thai-pearl/food/thai-dishes.jpg";
import wokImg from "@assets/thai-pearl/food/wok-noodles.jpg";

export function Story() {
  return (
    <section id="story" className="bg-[#F5F0EA] overflow-hidden">
      {/* Top — full-bleed photo with overlapping text */}
      <div className="relative">
        <div className="h-[70vh] md:h-[80vh] overflow-hidden">
          <motion.img
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={chefImg}
            alt="Thai Pearl culinary spread"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EA] via-[#F5F0EA]/10 to-transparent md:via-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0EA] via-transparent to-transparent" />
        </div>

        {/* Overlapping label + stat */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16"
        >
          <p className="font-sans text-[#ED0000] text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            The Story
          </p>
          <h2
            className="font-serif font-light text-[#1A1514] leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            Trained where
            <br />
            <em className="text-[#ED0000]">kings eat.</em>
          </h2>
        </motion.div>
      </div>

      {/* Bottom — text + small photo */}
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* Text col — wider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <div className="space-y-6 font-sans text-lg text-[#3A3330] leading-relaxed">
              <p>
                Our chef did not learn from a YouTube video. He trained at the{" "}
                <strong className="text-[#1A1514] font-semibold">Royal Palace Academy in Bangkok</strong>,
                one of the most exclusive culinary programs in Southeast Asia.
                Then worked shoulder to shoulder with a Michelin Star chef in Queensland, Australia.
              </p>
              <p>
                He brought all of it to North Carolina. First BoonChoo Thai Express in Flat Rock in 2017.
                Then Thai Pearl in March 2020, right here in West Asheville.{" "}
                <strong className="text-[#1A1514] font-semibold">We won Best New Restaurant that same year.</strong>
              </p>
              <p>
                Every plate carries that lineage. Every sauce was built from recipes the Royal Palace
                does not share with just anyone.
              </p>
            </div>

            {/* Credentials row */}
            <div className="mt-14 pt-10 border-t border-[#DDD5CB] grid grid-cols-3 gap-6">
              {[
                { n: "2020", l: "Best New Restaurant" },
                { n: "Royal", l: "Palace Trained" },
                { n: "Michelin", l: "Kitchen Mentored" },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  <p
                    className="font-serif font-light text-[#1A1514] leading-none mb-2"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
                  >
                    {c.n}
                  </p>
                  <p className="font-sans text-[#9A8F88] text-xs uppercase tracking-wider leading-snug">{c.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Small wok photo — offset */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-5 md:mt-[-4rem]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={wokImg} alt="Wok on fire" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#ED0000] px-5 py-4 mt-0">
              <p className="font-sans text-white text-xs tracking-[0.3em] uppercase font-semibold">
                Best New Restaurant 2020
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
