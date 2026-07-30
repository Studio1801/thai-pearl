import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const platforms = [
  {
    name: "Grubhub",
    detail: "Delivery + Pickup",
    url: "https://www.grubhub.com/search?locationQuery=747+Haywood+Rd+Asheville+NC&queryText=Thai+Pearl",
    hoverColor: "hover:bg-[#F63440]",
  },
  {
    name: "Uber Eats",
    detail: "Fast Delivery",
    url: "https://www.ubereats.com/search?q=Thai+Pearl+Asheville",
    hoverColor: "hover:bg-[#06C167]",
  },
  {
    name: "DoorDash",
    detail: "Delivery + Scheduling",
    url: "https://www.doordash.com/search/store/Thai%20Pearl%20Asheville/",
    hoverColor: "hover:bg-[#FF3008]",
  },
];

export function OrderNow() {
  return (
    <section id="order" className="bg-[#ED0000] relative overflow-hidden grain">
      {/* Giant "ORDER" backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-serif font-light text-white/[0.04] leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(14rem, 40vw, 50rem)" }}
        >
          ORDER
        </span>
      </div>

      <div className="relative z-10 pt-20 pb-8 px-6 md:px-12">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-sans text-white/60 text-xs tracking-[0.35em] uppercase mb-6"
        >
          Skip the wait
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-serif font-light text-white leading-none mb-2"
          style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
        >
          We deliver.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-serif italic font-light text-white/70 mb-16"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
        >
          Royal Palace trained. Straight to your door.
        </motion.p>

        {/* Platform rows */}
        <div className="border-t border-white/20">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group flex items-center justify-between py-7 md:py-8 border-b border-white/20 ${p.hoverColor} transition-colors duration-300 px-4 -mx-4 cursor-pointer`}
            >
              <div className="flex items-baseline gap-6">
                <span
                  className="font-serif font-light text-white leading-none"
                  style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
                >
                  {p.name}
                </span>
                <span className="font-sans text-white/50 text-xs tracking-[0.2em] uppercase hidden md:block">
                  {p.detail}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-sans text-white/50 text-xs tracking-widest uppercase hidden md:block">
                  Order now
                </span>
                <motion.div
                  whileHover={{ x: 6 }}
                  className="w-10 h-10 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center transition-colors duration-300"
                >
                  <ArrowRight size={16} className="text-white" />
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="pt-16 pb-8 text-center"
        >
          <p className="font-sans text-white/50 text-xs tracking-[0.35em] uppercase mb-4">
            Prefer to call it in
          </p>
          <a
            href="tel:8284125905"
            className="font-serif font-light text-white hover:text-[#FFB800] transition-colors"
            style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
          >
            (828) 412-5905
          </a>
        </motion.div>
      </div>
    </section>
  );
}
