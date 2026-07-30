import { motion } from "framer-motion";

export function QuoteStrip() {
  return (
    <section className="bg-[#C4281A] thai-pattern-dark overflow-hidden relative py-20 md:py-28 px-8 md:px-16">
      {/* Large Thai ornament — watermark */}
      <div
        className="absolute right-12 top-1/2 -translate-y-1/2 font-serif text-white/5 leading-none select-none pointer-events-none hidden lg:block"
        style={{ fontSize: "22rem", fontWeight: 500 }}
        aria-hidden
      >
        ❧
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Opening quote mark */}
          <p
            className="font-serif text-white/20 leading-none mb-2 -ml-2"
            style={{ fontSize: "6rem", fontWeight: 500, lineHeight: 0.7 }}
            aria-hidden
          >
            "
          </p>

          <blockquote
            className="font-serif text-white leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)", fontWeight: 500 }}
          >
            <em style={{ fontStyle: "italic" }}>
              I didn't come here to cook the Thai food
              <br className="hidden md:block" /> you already know.
            </em>
          </blockquote>

          <div className="mt-8 flex items-center gap-6">
            <div className="h-[1px] w-12 bg-white/30" />
            <div>
              <p className="font-sans text-white/80 text-[11px] tracking-[0.3em] uppercase font-semibold">
                The Chef, Thai Pearl
              </p>
              <p className="font-serif text-white/40 text-sm mt-0.5" style={{ fontWeight: 400 }}>
                ผมทำอาหารไทยที่คุณยังไม่รู้จัก
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
