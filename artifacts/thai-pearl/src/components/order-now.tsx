import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import wokFireImg from "@assets/thai-pearl/wok-fire.jpg";

const platforms = [
  {
    name: "Grubhub",
    url: "https://www.grubhub.com/search?locationQuery=747+Haywood+Rd+Asheville+NC&queryText=Thai+Pearl",
  },
  {
    name: "Uber Eats",
    url: "https://www.ubereats.com/search?q=Thai+Pearl+Asheville",
  },
  {
    name: "DoorDash",
    url: "https://www.doordash.com/search/store/Thai%20Pearl%20Asheville/",
  },
];

const facts = [
  { th: "ไฟจริง", en: "Real wok fire. Every order." },
  { th: "พระราชวัง", en: "Royal Palace trained." },
  { th: "สดทุกวัน", en: "Made fresh. Never frozen." },
];

export function OrderNow() {
  return (
    <section id="order" className="bg-[#180E06] thai-pattern-dark overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-20 md:py-28 order-2 lg:order-1"
        >
          <div className="mb-6">
            <p className="font-sans text-[#E8920E] text-[10px] tracking-[0.4em] uppercase font-semibold">
              Can't make it in
            </p>
            <p className="font-serif text-[#E8920E]/40 text-sm tracking-wider mt-0.5" style={{ fontWeight: 400 }}>
              สั่งอาหารได้เลย
            </p>
          </div>

          <h2
            className="font-serif leading-[0.88] mb-4 tracking-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 500 }}
          >
            <span className="text-white">Get it while</span>
            <br />
            <em className="text-[#E8920E]" style={{ fontStyle: "italic", fontWeight: 500 }}>
              it's hot.
            </em>
          </h2>

          <p className="font-sans text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
            Same kitchen. Same chef. Same fire that won Best New Restaurant.
            Delivered anywhere in Asheville.
          </p>

          {/* Quick facts — personality */}
          <div className="flex flex-col gap-2 mb-10">
            {facts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="font-serif text-[#E8920E]/50 text-sm" style={{ fontWeight: 400 }}>{f.th}</span>
                <span className="w-px h-3 bg-white/15 flex-shrink-0" />
                <span className="font-sans text-white/55 text-xs tracking-wide">{f.en}</span>
              </motion.div>
            ))}
          </div>

          {/* Platform list */}
          <div className="border-t border-white/10">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
                className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-[#E8920E]/40 transition-all duration-300"
              >
                <span
                  className="font-serif text-white/90 group-hover:text-[#E8920E] transition-colors duration-300"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 500 }}
                >
                  {p.name}
                </span>
                <div className="w-8 h-8 border border-white/15 group-hover:border-[#E8920E]/50 flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={13} className="text-white/40 group-hover:text-[#E8920E] transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <p className="font-sans text-white/25 text-[9px] tracking-[0.35em] uppercase mb-2">
              Or just call us like a normal person
            </p>
            <a
              href="tel:8284125905"
              className="font-serif text-white/75 hover:text-[#E8920E] transition-colors duration-300"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 500 }}
            >
              (828) 412-5905
            </a>
          </motion.div>
        </motion.div>

        {/* Right — wok fire photo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative overflow-hidden min-h-[50vh] lg:min-h-0 order-1 lg:order-2"
        >
          <img
            src={wokFireImg}
            alt="Wok fire in Thai Pearl kitchen"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#180E06] via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180E06]/60 via-transparent to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
