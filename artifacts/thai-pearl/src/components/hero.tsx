import { motion } from "framer-motion";
import heroImg from "@assets/thai-pearl/food/pad-thai-closeup.jpg";

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Photo */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Thai Pearl signature dish"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85" />

      {/* Big label top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-28 left-6 md:left-12"
      >
        <p className="font-sans text-[#FFB800] text-xs tracking-[0.35em] uppercase font-semibold">
          West Asheville, NC
        </p>
      </motion.div>

      {/* Main headline — huge, bottom-anchored */}
      <div className="absolute bottom-0 left-0 right-0 px-5 md:px-10 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Display headline — overflows intentionally */}
          <h1
            className="font-serif font-light text-white leading-[0.88] mb-6 tracking-tight"
            style={{ fontSize: "clamp(4.5rem, 14vw, 15rem)" }}
          >
            The food that
            <br />
            <em className="text-[#FFB800] not-italic" style={{ fontStyle: "italic" }}>
              made us.
            </em>
          </h1>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-row gap-3 items-center"
        >
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#ED0000] hover:bg-[#c40000] active:scale-95 text-white px-8 md:px-12 py-4 font-sans font-bold text-sm tracking-[0.2em] uppercase transition-all duration-200"
          >
            Order Now
          </button>
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white border border-white/30 hover:border-white/70 px-8 md:px-10 py-4 font-sans text-sm tracking-[0.18em] uppercase transition-all duration-200"
          >
            Reserve
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 right-8 md:right-12 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-white/30"
        />
        <span className="font-sans text-white/30 text-[9px] tracking-[0.3em] uppercase rotate-90 translate-y-6">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
