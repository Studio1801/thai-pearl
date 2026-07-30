import { motion } from "framer-motion";
import logo from "@assets/thai-pearl/logo.png";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    setIsScrolled(false);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) { window.location.href = `/#${id}`; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[#100907]/96 backdrop-blur-md py-3 border-b border-white/8"
          : "bg-transparent py-5"
      }`}
      style={!isScrolled ? { textShadow: "0 1px 6px rgba(0,0,0,0.7)" } : {}}
    >
      {/* Gradient top border */}
      {!isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C4281A] via-[#E8920E] to-[#C4281A]" />
      )}

      <div className="container mx-auto px-8 md:px-16 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <img src={logo} alt="Thai Pearl" className="h-11 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {[
            { label: "Story", action: () => scrollTo("story") },
            { label: "Menu", action: () => {}, href: "/menu" },
            { label: "Visit", action: () => scrollTo("contact") },
          ].map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60 hover:text-[#E8920E] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={item.action}
                className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60 hover:text-[#E8920E] transition-colors duration-200"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-white/45 hover:text-white/80 transition-colors duration-200"
          >
            Reserve
          </a>
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#C4281A] hover:bg-[#a42016] text-white px-6 py-2.5 font-sans text-[10px] font-bold tracking-[0.28em] uppercase transition-colors duration-200"
          >
            Order Now
          </button>
        </div>

        <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#100907] border-t border-white/8"
        >
          <div className="flex flex-col px-8 py-6 gap-5">
            {["Story", "Visit"].map((label) => (
              <button
                key={label}
                onClick={() => { setIsMobileMenuOpen(false); scrollTo(label.toLowerCase()); }}
                className="text-left font-sans text-sm font-semibold tracking-[0.22em] uppercase text-white/55 hover:text-[#E8920E] transition-colors"
              >
                {label}
              </button>
            ))}
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left font-sans text-sm font-semibold tracking-[0.22em] uppercase text-white/55 hover:text-[#E8920E] transition-colors"
            >
              Menu
            </Link>
            <div className="pt-4 border-t border-white/8 flex flex-col gap-3">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center font-sans text-sm font-semibold tracking-widest uppercase text-white/40 py-3 border border-white/12"
              >
                Reserve
              </a>
              <button
                onClick={() => { setIsMobileMenuOpen(false); scrollTo("order"); }}
                className="bg-[#C4281A] text-white text-center py-4 font-sans text-sm font-bold tracking-[0.22em] uppercase"
              >
                Order Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
