import logo from "@assets/thai-pearl/logo.png";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-[#0D0A09] py-14 border-t border-white/8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10">

          {/* Logo — full color, no invert */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <img
              src={logo}
              alt="Thai Pearl"
              className="h-16 w-auto object-contain"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ cursor: "pointer" }}
            />
          </motion.div>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 font-sans text-[11px] tracking-[0.22em] uppercase text-white/40">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition-colors">Home</button>
            <a href="https://thaipearlasheville.com/menu" className="hover:text-white transition-colors">Menu</a>
            <a href="https://thaipearlasheville.com/reservations" className="hover:text-white transition-colors">Reservations</a>
            <a href="https://thaipearlasheville.com/catering" className="hover:text-white transition-colors">Catering</a>
            <a href="https://instagram.com/thaipearl_restaurant" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>

          {/* Copyright */}
          <p className="text-white/25 font-sans text-xs text-center md:text-right leading-relaxed">
            &copy; {new Date().getFullYear()} Thai Pearl Restaurant
            <br />
            747 Haywood Rd, Asheville NC
          </p>
        </div>
      </div>
    </footer>
  );
}
