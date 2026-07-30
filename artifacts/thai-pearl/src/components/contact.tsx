import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import exteriorImg from "@assets/thai-pearl/exterior.png";

export function Contact() {
  return (
    <section id="contact" className="bg-[#180E06] thai-pattern-dark text-white overflow-hidden">
      {/* Exterior photo strip fading into dark */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={exteriorImg}
          alt="Thai Pearl — 747 Haywood Rd, West Asheville"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 55%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180E06]/20 via-[#180E06]/50 to-[#180E06]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#180E06]/60 via-transparent to-transparent" />

        {/* Headline riding in from photo */}
        <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-10">
          <p className="font-sans text-[#E8920E] text-[10px] tracking-[0.4em] uppercase font-semibold mb-4">
            Come find us
          </p>
          <h2
            className="font-serif leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 500 }}
          >
            <span className="text-white">West Asheville</span>
            <br />
            <em className="text-[#E8920E]" style={{ fontStyle: "italic" }}>
              is waiting.
            </em>
          </h2>
        </div>
      </div>

      {/* Info + CTAs */}
      <div className="container mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {[
              { Icon: MapPin, lines: ["747 Haywood Rd", "Asheville, NC 28806"], href: undefined },
              { Icon: Clock, lines: ["Tuesday through Sunday", "Closed Mondays"], href: undefined },
              { Icon: Phone, lines: ["(828) 412-5905"], href: "tel:8284125905" },
              { Icon: Instagram, lines: ["@thaipearl_restaurant"], href: "https://instagram.com/thaipearl_restaurant" },
            ].map(({ Icon, lines, href }, i) => {
              const inner = (
                <div className="flex items-start gap-4">
                  <Icon className="text-[#E8920E] w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    {lines.map((l, j) => (
                      <p key={j} className={`font-sans text-sm leading-relaxed ${j === 1 ? "text-white/40" : "text-white/75"}`}>{l}</p>
                    ))}
                  </div>
                </div>
              );
              return href ? (
                <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" className="block hover:opacity-75 transition-opacity">{inner}</a>
              ) : <div key={i}>{inner}</div>;
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <p className="font-sans text-white/40 text-sm leading-relaxed max-w-xs mb-8">
              Walk-ins always welcome. Reserve ahead for groups. Private parties and catering available for any occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E8920E] hover:bg-[#c87a0c] text-white px-8 py-4 font-sans font-bold text-[11px] tracking-[0.25em] uppercase transition-colors text-center"
              >
                Reserve a Table
              </a>
              <a
                href="https://thaipearlasheville.com/catering"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-[#E8920E]/50 text-white/55 hover:text-white px-8 py-4 font-sans text-[11px] tracking-[0.22em] uppercase transition-all text-center"
              >
                Catering
              </a>
            </div>

            {/* Thai script decorative accent */}
            <p className="mt-10 font-serif text-white/10 text-3xl tracking-widest select-none" style={{ fontWeight: 400 }}>
              ยินดีต้อนรับ
            </p>
            <p className="font-sans text-white/18 text-[9px] tracking-[0.3em] uppercase mt-1">Welcome</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
