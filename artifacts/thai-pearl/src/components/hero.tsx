import { motion } from "framer-motion";
import catImg from "@assets/thai-pearl/interior-cat.png";

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.img
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease: "easeOut" }}
        src={catImg}
        alt="Thai Pearl — 747 Haywood Rd, West Asheville"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 38%" }}
      />

      {/* Layered warm vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#180E06]/96 via-[#180E06]/38 to-[#180E06]/48" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#180E06]/55 via-[#180E06]/10 to-transparent" />

      {/* Saffron top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C4281A] via-[#E8920E] to-[#C4281A]" />

      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-sans text-[#E8920E] text-[10px] tracking-[0.4em] uppercase font-semibold mb-6"
        >
          Authentic Thai · 747 Haywood Rd · West Asheville · Tue–Sun
        </motion.p>

        {/* Thai script atmospheric accent */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-white/12 text-2xl tracking-[0.2em] mb-3 select-none"
          style={{ fontWeight: 400 }}
        >
          ไทยเพิร์ล
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif leading-[0.88] mb-10 tracking-tight"
          style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}
        >
          <span className="text-white" style={{ fontWeight: 500 }}>Your table</span>
          <br />
          <em className="text-[#E8920E]" style={{ fontStyle: "italic", fontWeight: 500 }}>
            is ready.
          </em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-row gap-3"
        >
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#C4281A] hover:bg-[#a42016] active:scale-95 text-white px-9 py-4 font-sans font-bold text-[11px] tracking-[0.25em] uppercase transition-all duration-200 shadow-lg shadow-[#C4281A]/30"
          >
            Order Now
          </button>
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 hover:border-[#E8920E]/70 text-white/70 hover:text-white px-9 py-4 font-sans text-[11px] tracking-[0.22em] uppercase transition-all duration-200"
          >
            Reserve
          </a>
        </motion.div>
      </div>
    </section>
  );
}
