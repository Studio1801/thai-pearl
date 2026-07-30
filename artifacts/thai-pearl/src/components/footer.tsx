import logo from "@assets/thai-pearl/logo.png";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#100907] border-t border-[#E8920E]/12 py-12">
      {/* Saffron gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E8920E]/30 to-transparent mb-12" />

      <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <img
          src={logo}
          alt="Thai Pearl"
          className="h-14 w-auto object-contain cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-sans text-[10px] tracking-[0.25em] uppercase text-white/30">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-[#E8920E] transition-colors">Home</button>
          <Link href="/menu" className="hover:text-[#E8920E] transition-colors">Menu</Link>
          <a href="https://thaipearlasheville.com/reservations" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8920E] transition-colors">Reservations</a>
          <a href="https://thaipearlasheville.com/catering" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8920E] transition-colors">Catering</a>
          <a href="https://instagram.com/thaipearl_restaurant" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8920E] transition-colors">Instagram</a>
        </div>

        <p className="font-sans text-white/18 text-[10px] text-center md:text-right leading-relaxed tracking-wide">
          &copy; {new Date().getFullYear()} Thai Pearl<br />Asheville, NC
        </p>
      </div>
    </footer>
  );
}
