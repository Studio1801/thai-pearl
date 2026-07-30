import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import wokImg from "@assets/thai-pearl/food/wok-noodles.jpg";

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

export function OrderNow() {
  return (
    <section id="order" className="bg-[#1E1209] thai-pattern-dark overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left — text + platforms */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="px-8 md:px-16 py-20 md:py-28 flex flex-col justify-center"
        >
          <p className="font-sans text-[#D4891A] text-xs tracking-[0.35em] uppercase mb-6">
            Can't make it in
          </p>

          <h2
            className="font-serif font-light text-white leading-[0.9] mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            We'll bring
            <br />
            <em className="text-[#D4891A]">it to you.</em>
          </h2>

          <p className="font-sans text-white/55 text-base leading-relaxed mb-12 max-w-sm">
            Order on any platform below. Same kitchen, same chef, same food. Pickup or delivery.
          </p>

          {/* Platform links */}
          <div className="border-t border-white/12">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-center justify-between py-5 border-b border-white/12 hover:border-[#D4891A]/50 transition-colors duration-300"
              >
                <span
                  className="font-serif font-light text-white group-hover:text-[#D4891A] transition-colors duration-300"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}
                >
                  {p.name}
                </span>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="w-8 h-8 border border-white/20 group-hover:border-[#D4891A]/60 flex items-center justify-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="text-white/50 group-hover:text-[#D4891A] transition-colors" />
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* Phone */}
          <div className="mt-10">
            <p className="font-sans text-white/35 text-xs tracking-[0.3em] uppercase mb-2">
              Or call us
            </p>
            <a
              href="tel:8284125905"
              className="font-serif font-light text-white/80 hover:text-[#D4891A] transition-colors"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
            >
              (828) 412-5905
            </a>
          </div>
        </motion.div>

        {/* Right — full photo */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative overflow-hidden min-h-[50vh] lg:min-h-0"
        >
          <img
            src={wokImg}
            alt="Wok on fire"
            className="w-full h-full object-cover"
          />
          {/* Warm overlay tying it to the section */}
          <div className="absolute inset-0 bg-[#1E1209]/30" />
        </motion.div>

      </div>
    </section>
  );
}
