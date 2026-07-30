import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0F9E5E] text-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans tracking-[0.25em] uppercase text-xs font-bold text-white/70 mb-5">
              Come in. Sit down.
            </p>
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
              West Asheville
              <br />
              <span className="italic">is waiting.</span>
            </h2>
            <p className="text-white/80 font-sans text-lg mb-12 max-w-md leading-relaxed">
              Colorful decor, warm lighting, wood accents, and tables that feel like home. Come in for dinner or bring your whole crew.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#0F9E5E] hover:bg-white/90 px-8 py-4 font-sans text-sm font-black tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-1"
              >
                Reserve a Table
              </a>
              <a
                href="https://thaipearlasheville.com/catering"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white hover:bg-white hover:text-[#0F9E5E] text-white px-8 py-4 font-sans text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-1"
              >
                Catering and Events
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0b804b] p-8 md:p-12 shadow-2xl"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#FFB800] w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-[#FFB800]">Location</h4>
                  <p className="font-serif text-xl">747 Haywood Rd,<br />Asheville, NC 28806</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-[#FFB800] w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-[#FFB800]">Hours</h4>
                  <p className="font-sans text-lg">Tuesday through Sunday</p>
                  <p className="text-white/60 text-base">Closed Mondays</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-[#FFB800] w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-[#FFB800]">Call Us</h4>
                  <a href="tel:8284125905" className="font-sans text-xl hover:text-[#FFB800] transition-colors">
                    (828) 412-5905
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <a
                  href="https://instagram.com/thaipearl_restaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#FFB800] transition-colors font-sans uppercase tracking-widest text-sm font-bold"
                >
                  <Instagram className="w-5 h-5" />
                  Follow @thaipearl_restaurant
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
