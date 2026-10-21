import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import catImg from "@assets/thai-pearl/interior-cat.png";
import heroVideo from "@assets/thai-pearl/hero-video.mp4";
import { liveStatus } from "@shared/model";
import { useNow, useSite } from "@/lib/live";

export function Hero() {
  const site = useSite();
  const now = useNow();
  const status = liveStatus(site, now);
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background — photo poster loads instantly before video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={catImg}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 38%" }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Bottom-up vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#180E06]/97 via-[#180E06]/40 to-transparent" />
      {/* Left darkening */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#180E06]/65 via-[#180E06]/10 to-transparent" />
      {/* Top darkening — navbar legibility */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#180E06]/80 to-transparent" />

      {/* Saffron + crimson top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C4281A] via-[#E8920E] to-[#C4281A]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-20 md:pb-28">
        {/* Thai script watermark — floating */}
        <motion.p
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="font-serif text-white/10 text-2xl tracking-[0.2em] mb-3 select-none"
          style={{ fontWeight: 400 }}
        >
          ไทยเพิร์ล
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-row gap-3"
        >
          {/* Order Now — subtle pulse ring */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 2 }}
              className="absolute inset-0 bg-[#C4281A] rounded-none"
            />
            <button
              onClick={() => scrollTo("order")}
              className="relative bg-[#C4281A] hover:bg-[#a42016] active:scale-95 text-white px-9 py-4 font-sans font-bold text-[11px] tracking-[0.25em] uppercase transition-colors duration-200 shadow-lg shadow-[#C4281A]/30"
            >
              Order Now
            </button>
          </div>
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 hover:border-[#E8920E]/70 text-white/70 hover:text-white px-9 py-4 font-sans text-[11px] tracking-[0.22em] uppercase transition-all duration-200"
          >
            Reserve
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-6 font-sans text-sm text-white/60 flex items-center gap-2.5"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${status.openNow ? "bg-[#5DBB63]" : "bg-white/30"}`}
            aria-hidden
          />
          {status.label}
          {status.ordering === "open" && (
            <span className="text-white/40">, pickup in about {site.ordering.prepMinutes} min</span>
          )}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("story")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
