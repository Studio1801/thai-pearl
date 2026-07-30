import { motion } from "framer-motion";
import logo from "@assets/thai-pearl/logo.png";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: "Story", id: "story" },
    { name: "Menu", id: "menu" },
    { name: "Gallery", id: "gallery" },
    { name: "Visit", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[#0D0A09]/95 backdrop-blur-md py-3 border-b border-white/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo — always full color */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={logo} alt="Thai Pearl" className="h-12 w-auto object-contain" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="font-sans text-sm font-medium tracking-[0.18em] uppercase text-white/75 hover:text-[#FFB800] transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-200"
          >
            Reserve
          </a>
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#ED0000] hover:bg-[#c00000] text-white px-6 py-2.5 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-colors duration-200"
          >
            Order Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0D0A09] border-t border-white/10"
        >
          <div className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left font-sans text-sm font-medium tracking-[0.18em] uppercase text-white/70 hover:text-[#FFB800] transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm tracking-widest uppercase text-white/50 text-center py-3 border border-white/20"
              >
                Reserve a Table
              </a>
              <button
                onClick={() => scrollTo("order")}
                className="bg-[#ED0000] text-white text-center py-4 font-sans text-sm font-bold tracking-[0.18em] uppercase"
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
