import logo from "@assets/thai-pearl/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#130C06] border-t border-white/8 py-12">
      <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">

        <img
          src={logo}
          alt="Thai Pearl"
          className="h-14 w-auto object-contain cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 font-sans text-[11px] tracking-[0.22em] uppercase text-white/35">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white/70 transition-colors">Home</button>
          <a href="https://thaipearlasheville.com/menu" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Menu</a>
          <a href="https://thaipearlasheville.com/reservations" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Reservations</a>
          <a href="https://thaipearlasheville.com/catering" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Catering</a>
          <a href="https://instagram.com/thaipearl_restaurant" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Instagram</a>
        </div>

        <p className="font-sans text-white/20 text-xs text-center md:text-right">
          &copy; {new Date().getFullYear()} Thai Pearl<br />
          Asheville, NC
        </p>

      </div>
    </footer>
  );
}
