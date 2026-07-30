import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import larbImg from "@assets/thai-pearl/food/larb-salad.jpg";

export function Contact() {
  return (
    <section id="contact" className="bg-[#0F9E5E] text-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-8 md:px-16 py-20 md:py-28 flex flex-col justify-between"
        >
          <div>
            <p className="font-sans text-white/60 text-xs tracking-[0.35em] uppercase mb-6">
              Come find us
            </p>
            <h2
              className="font-serif font-light text-white leading-none mb-8"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              West Asheville
              <br />
              <em>is waiting.</em>
            </h2>
            <p className="font-sans text-white/70 text-lg leading-relaxed max-w-sm mb-12">
              Colorful decor, warm lighting, tables that feel like home. Bring your crew or come alone. Either way, you eat well.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#0F9E5E] hover:bg-white/90 px-8 py-4 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-all duration-200 text-center"
              >
                Reserve a Table
              </a>
              <a
                href="https://thaipearlasheville.com/catering"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/50 hover:border-white text-white px-8 py-4 font-sans text-sm tracking-[0.18em] uppercase transition-all duration-200 text-center hover:bg-white/10"
              >
                Catering
              </a>
            </div>
          </div>

          {/* Info rows */}
          <div className="mt-16 pt-10 border-t border-white/20 space-y-7">
            <div className="flex items-start gap-4">
              <MapPin className="text-white/50 w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-sans font-semibold text-white text-sm">747 Haywood Rd, Asheville NC 28806</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-white/50 w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-sans text-white text-sm">Tuesday through Sunday</p>
                <p className="font-sans text-white/50 text-sm">Closed Mondays</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-white/50 w-5 h-5 mt-0.5 flex-shrink-0" />
              <a href="tel:8284125905" className="font-sans text-white text-sm hover:text-[#FFB800] transition-colors">
                (828) 412-5905
              </a>
            </div>
            <div className="flex items-start gap-4">
              <Instagram className="text-white/50 w-5 h-5 mt-0.5 flex-shrink-0" />
              <a
                href="https://instagram.com/thaipearl_restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white text-sm hover:text-[#FFB800] transition-colors"
              >
                @thaipearl_restaurant
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right — photo fills entire half */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative overflow-hidden min-h-[50vh] md:min-h-0"
        >
          <img
            src={larbImg}
            alt="Larb Salad"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0F9E5E]/20" />
        </motion.div>
      </div>
    </section>
  );
}
