import { motion } from "framer-motion";
import heroImg from "@assets/thai-pearl/og.jpg";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full flex items-end justify-center overflow-hidden pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroImg}
          alt="Thai Pearl Asheville"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
      </div>

      {/* Content pinned to bottom */}
      <div className="relative z-10 w-full container mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sans text-[#FFB800] tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4"
        >
          West Asheville, NC
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white leading-none mb-6"
        >
          Royal Roots.
          <br />
          <span className="italic text-[#FFB800]">Asheville Heart.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#ED0000] hover:bg-[#c40000] text-white px-10 py-4 font-sans font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-red-900/50 active:scale-95"
          >
            Order Now
          </button>
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/50 hover:border-white text-white px-10 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
          >
            Reserve a Table
          </a>
        </motion.div>
      </div>
    </section>
  );
}
