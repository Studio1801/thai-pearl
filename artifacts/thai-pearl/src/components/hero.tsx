import { motion } from "framer-motion";
import catImg from "@assets/thai-pearl/interior-cat.png";

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Lucky cat interior photo */}
      <motion.img
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        src={catImg}
        alt="Thai Pearl interior"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 40%" }}
      />

      {/* Warm vignette — bottom heavy so text reads clean */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#130C06]/94 via-[#130C06]/40 to-[#130C06]/30" />
      {/* Slight left darkening so text pops */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#130C06]/50 via-transparent to-transparent" />

      {/* Marigold top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4891A]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-14 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-sans text-[#D4891A] text-xs tracking-[0.35em] uppercase mb-5"
        >
          747 Haywood Rd · West Asheville, NC · Tue–Sun
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light text-white leading-[0.9] mb-8"
          style={{ fontSize: "clamp(3.8rem, 11vw, 11rem)" }}
        >
          Your table
          <br />
          <em className="text-[#D4891A]">is ready.</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-row gap-3"
        >
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#B5311E] hover:bg-[#952A18] active:scale-95 text-white px-9 py-4 font-sans font-semibold text-sm tracking-[0.18em] uppercase transition-all duration-200"
          >
            Order Now
          </button>
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/35 hover:border-white/70 text-white/80 hover:text-white px-9 py-4 font-sans text-sm tracking-[0.18em] uppercase transition-all duration-200"
          >
            Reserve
          </a>
        </motion.div>
      </div>
    </section>
  );
}
