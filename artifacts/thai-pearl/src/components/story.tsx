import { motion } from "framer-motion";
import wokImg from "@assets/thai-pearl/food/wok-noodles.jpg";
import chefImg from "@assets/thai-pearl/food/thai-dishes.jpg";

const credentials = [
  { stat: "2020", label: "Best New Restaurant" },
  { stat: "Royal", label: "Palace Academy Trained" },
  { stat: "Michelin", label: "Star Kitchen Mentored" },
];

export function Story() {
  return (
    <section id="story" className="py-24 md:py-36 bg-[#F7F3EE] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85 }}
              className="relative z-10 w-[80%] aspect-[4/5]"
            >
              <img
                src={chefImg}
                alt="Thai Pearl culinary spread"
                className="w-full h-full object-cover shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="absolute bottom-[-3rem] right-0 w-[58%] aspect-square z-20 border-8 border-[#F7F3EE]"
            >
              <img
                src={wokImg}
                alt="Wok on fire"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Award badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-[-1.5rem] right-[30%] z-30 bg-[#ED0000] text-white font-sans text-xs font-black tracking-widest uppercase px-4 py-2 rotate-3 shadow-lg"
            >
              Best New Restaurant 2020
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85 }}
          >
            <p className="text-[#ED0000] font-sans tracking-[0.25em] uppercase text-xs font-bold mb-5">
              The Story
            </p>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1514] leading-tight mb-10">
              Trained where
              <br />
              <span className="italic text-[#ED0000]">kings eat.</span>
            </h2>

            <div className="space-y-5 text-[#3D3330] font-sans text-lg leading-relaxed">
              <p>
                Our chef did not learn to cook Thai food from a cookbook. He was trained at the{" "}
                <strong className="text-[#1A1514]">Royal Palace Academy in Bangkok</strong>, one of the most
                exclusive culinary programs in Southeast Asia. He then worked shoulder to shoulder with a
                Michelin Star chef in Queensland, Australia.
              </p>
              <p>
                In 2017 he brought that mastery to North Carolina with BoonChoo Thai Express in Flat
                Rock. Then in March 2020, Thai Pearl opened in West Asheville and won{" "}
                <strong className="text-[#1A1514]">Best New Restaurant</strong> the same year.
              </p>
              <p>
                Every plate you order carries that lineage. Every bite tastes like it was made for
                someone important. Because here, everyone is.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-12 pt-10 border-t border-[#E5DDD5] grid grid-cols-3 gap-4">
              {credentials.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <p className="text-3xl md:text-4xl font-serif text-[#1A1514] mb-1">{c.stat}</p>
                  <p className="font-sans text-xs text-[#8A7C76] uppercase tracking-wider leading-tight">{c.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
