import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import exteriorImg from "@assets/thai-pearl/exterior.png";

export function Contact() {
  return (
    <section id="contact" className="bg-[#1E1209] thai-pattern-dark text-white overflow-hidden">
      {/* Full-bleed exterior photo with overlay headline */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={exteriorImg}
          alt="Thai Pearl exterior — 747 Haywood Rd"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1209]/30 to-[#1E1209]" />
        <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-8">
          <p className="font-sans text-[#D4891A] text-xs tracking-[0.35em] uppercase mb-3">
            Come find us
          </p>
          <h2
            className="font-serif font-light text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            West Asheville
            <br />
            <em className="text-[#D4891A]">is waiting.</em>
          </h2>
        </div>
      </div>

      {/* Info grid */}
      <div className="container mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <MapPin className="text-[#D4891A] w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="font-sans text-white text-sm leading-relaxed">
                747 Haywood Rd<br />Asheville, NC 28806
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-[#D4891A] w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-sans text-white text-sm">Tuesday through Sunday</p>
                <p className="font-sans text-white/45 text-sm">Closed Mondays</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-[#D4891A] w-5 h-5 mt-0.5 flex-shrink-0" />
              <a href="tel:8284125905" className="font-sans text-white text-sm hover:text-[#D4891A] transition-colors">
                (828) 412-5905
              </a>
            </div>
            <div className="flex items-start gap-4">
              <Instagram className="text-[#D4891A] w-5 h-5 mt-0.5 flex-shrink-0" />
              <a
                href="https://instagram.com/thaipearl_restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white text-sm hover:text-[#D4891A] transition-colors"
              >
                @thaipearl_restaurant
              </a>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center gap-5"
          >
            <p className="font-sans text-white/50 text-base leading-relaxed max-w-xs">
              Walk-ins welcome. We keep a warm seat for you. Reserve ahead if you've got a group.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4891A] hover:bg-[#b8751a] text-white px-8 py-4 font-sans font-semibold text-sm tracking-[0.18em] uppercase transition-colors text-center"
              >
                Reserve a Table
              </a>
              <a
                href="https://thaipearlasheville.com/catering"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/25 hover:border-white/60 text-white/70 hover:text-white px-8 py-4 font-sans text-sm tracking-[0.18em] uppercase transition-all text-center"
              >
                Catering
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
