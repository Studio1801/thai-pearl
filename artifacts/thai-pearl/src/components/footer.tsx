import logo from "@assets/thai-pearl/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#1A1514] py-16 text-white border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex-shrink-0">
          <img src={logo} alt="Thai Pearl" className="h-16 w-auto object-contain brightness-0 invert opacity-90" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 font-sans text-xs tracking-[0.2em] uppercase text-white/60">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
          <a href="https://thaipearlasheville.com/menu" className="hover:text-white transition-colors">Menu</a>
          <a href="https://thaipearlasheville.com/reservations" className="hover:text-white transition-colors">Reservations</a>
          <a href="https://thaipearlasheville.com/catering" className="hover:text-white transition-colors">Catering</a>
        </div>

        <div className="text-white/40 font-sans text-sm text-center md:text-right">
          © {new Date().getFullYear()} Thai Pearl Restaurant.<br/>
          All rights reserved.
        </div>

      </div>
    </footer>
  );
}
