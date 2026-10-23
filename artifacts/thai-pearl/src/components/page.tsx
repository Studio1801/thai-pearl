import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/** Shared frame for the inner pages: dark header band, cream body, footer. */
export function Page({
  kicker,
  thai,
  title,
  intro,
  image,
  children,
}: {
  kicker: string;
  thai?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#FDF7EC] min-h-screen font-sans text-[#180E06] selection:bg-[#C4281A] selection:text-white">
      <Navbar />
      <header className="relative bg-[#180E06] thai-pattern-dark text-white overflow-hidden">
        {image && (
          <>
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#180E06]/40 via-[#180E06]/70 to-[#180E06]" />
          </>
        )}
        <div className="relative container mx-auto px-6 md:px-16 pt-36 md:pt-44 pb-14 md:pb-20 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-sans text-[#E8920E] text-sm font-semibold">
              {kicker}
              {thai && <span className="font-serif text-[#E8920E]/45 ml-3 font-normal">{thai}</span>}
            </p>
            <h1 className="font-serif leading-[0.95] mt-4 tracking-tight" style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)", fontWeight: 500 }}>
              {title}
            </h1>
            {intro && <div className="font-sans text-white/60 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">{intro}</div>}
          </motion.div>
        </div>
      </header>
      <main className="container mx-auto px-6 md:px-16 py-14 md:py-20 max-w-5xl">{children}</main>
      <Footer />
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
