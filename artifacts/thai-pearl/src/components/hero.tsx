import { motion } from "framer-motion";
import heroImg from "@assets/thai-pearl/og.jpg";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImg}
          alt="Thai Pearl Asheville"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-[#FFB800] font-sans tracking-[0.2em] uppercase text-sm md:text-base font-semibold">
            West Asheville, NC
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight max-w-4xl"
        >
          Royal Roots. <br />
          <span className="italic text-[#FFB800]/90">Asheville Heart.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 font-sans max-w-2xl mb-10 font-light"
        >
          Authentic craft Thai food anchored in royal tradition, refined over years of elite training at the Royal Palace Academy in Bangkok.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* PRIMARY: Order Now */}
          <button
            onClick={() => scrollTo("order")}
            className="w-full sm:w-auto bg-[#ED0000] hover:bg-[#c00000] text-white px-10 py-4 font-sans text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-red-900/40"
          >
            Order Now
          </button>
          {/* SECONDARY: Reserve */}
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-transparent border border-white/60 hover:border-white hover:bg-white/10 text-white px-10 py-4 font-sans text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 transform hover:-translate-y-1"
          >
            Reserve a Table
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs font-sans tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
