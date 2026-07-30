import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0F9E5E] text-white overflow-hidden">
      {/* Decorative texture/pattern could go here */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
              Join us in <br/> West Asheville.
            </h2>
            <p className="text-white/90 font-sans text-lg mb-12 max-w-md leading-relaxed">
              Experience the warmth of Thai hospitality and the boldness of authentic flavors. Whether for a casual dinner or a private celebration.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#0F9E5E] hover:bg-white/90 px-8 py-4 font-sans text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 transform hover:-translate-y-1"
              >
                Reserve a Table
              </a>
              <a
                href="https://thaipearlasheville.com/catering"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white hover:bg-white hover:text-[#0F9E5E] text-white px-8 py-4 font-sans text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 transform hover:-translate-y-1"
              >
                Catering & Events
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
                <MapPin className="text-secondary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-secondary">Location</h4>
                  <p className="font-serif text-xl">747 Haywood Rd,<br/>Asheville, NC 28806</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-secondary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-secondary">Hours</h4>
                  <p className="font-sans text-lg">Tuesday – Sunday<br/><span className="text-white/70 text-base">Closed Mondays</span></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-secondary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-secondary">Contact</h4>
                  <p className="font-sans text-lg mb-1"><a href="tel:8284125905" className="hover:text-secondary transition-colors">(828)-412-5905</a></p>
                  <p className="font-sans text-base"><a href="mailto:thaipearlasheville@gmail.com" className="hover:text-secondary transition-colors">thaipearlasheville@gmail.com</a></p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <a 
                  href="https://instagram.com/thaipearl_restaurant" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-secondary transition-colors font-sans uppercase tracking-widest text-sm font-bold"
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
