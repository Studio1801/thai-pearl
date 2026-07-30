import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import wokImg from "@assets/thai-pearl/food/wok-noodles.jpg";
import drunkenImg from "@assets/thai-pearl/food/drunken-noodles.jpg";
import padThaiImg from "@assets/thai-pearl/food/pad-thai.jpg";
import cashewImg from "@assets/thai-pearl/food/cashew-stir-fry.jpg";

const platforms = [
  {
    name: "Grubhub",
    tagline: "Delivery and pickup",
    url: "https://www.grubhub.com/search?locationQuery=747+Haywood+Rd+Asheville+NC&queryText=Thai+Pearl",
    bg: "bg-[#F63440]",
    accent: "#FF6B6B",
  },
  {
    name: "Uber Eats",
    tagline: "Fast delivery to your door",
    url: "https://www.ubereats.com/search?q=Thai+Pearl+Asheville",
    bg: "bg-[#06C167]",
    accent: "#00D98B",
  },
  {
    name: "DoorDash",
    tagline: "Order now or schedule ahead",
    url: "https://www.doordash.com/search/store/Thai%20Pearl%20Asheville/",
    bg: "bg-[#FF3008]",
    accent: "#FF6040",
  },
];

const scrollingDishes = [
  { src: drunkenImg, label: "Drunken Noodles" },
  { src: padThaiImg, label: "Pad Thai" },
  { src: cashewImg, label: "Cashew Stir Fry" },
  { src: drunkenImg, label: "Drunken Noodles" },
  { src: padThaiImg, label: "Pad Thai" },
  { src: cashewImg, label: "Cashew Stir Fry" },
];

export function OrderNow() {
  return (
    <section id="order" className="relative bg-[#0D0A09] overflow-hidden">
      {/* Full-bleed wok fire image */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={wokImg}
          alt="Wok on fire"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0D0A09]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-[#FFB800] tracking-[0.3em] uppercase text-xs font-bold mb-4"
          >
            It is ready. Are you?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-white text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
          >
            Order.
            <br />
            <span className="italic text-[#FFB800]">Right Now.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 font-sans text-lg max-w-lg"
          >
            Royal Palace trained. Delivered to your door. No excuses.
          </motion.p>
        </div>
      </div>

      {/* Scrolling food strip */}
      <div className="overflow-hidden py-4 bg-[#111]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {[...scrollingDishes, ...scrollingDishes].map((dish, i) => (
            <div key={i} className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
              <img src={dish.src} alt={dish.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <span className="absolute bottom-2 left-3 text-white font-sans text-xs tracking-widest uppercase opacity-80">
                {dish.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Platform cards */}
      <div className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`${p.bg} group relative overflow-hidden p-8 flex flex-col justify-between min-h-[160px] cursor-pointer`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <div className="relative z-10">
                <p className="text-white font-sans font-black text-2xl md:text-3xl tracking-tight mb-1">
                  {p.name}
                </p>
                <p className="text-white/75 font-sans text-sm">{p.tagline}</p>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-6">
                <span className="text-white font-sans font-bold text-xs tracking-[0.2em] uppercase">
                  Order here
                </span>
                <div className="w-9 h-9 rounded-full bg-white/25 group-hover:bg-white/40 flex items-center justify-center transition-colors duration-300">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14 pb-4"
        >
          <p className="text-white/40 font-sans text-sm mb-3 tracking-[0.2em] uppercase">
            Prefer to call it in
          </p>
          <a
            href="tel:8284125905"
            className="text-[#FFB800] font-serif text-4xl md:text-5xl hover:text-white transition-colors duration-300 tracking-tight"
          >
            (828) 412-5905
          </a>
        </motion.div>
      </div>
    </section>
  );
}
