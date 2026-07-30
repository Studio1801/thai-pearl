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
    // Reset on location change
    setIsScrolled(false);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionLinks = [
    { name: "Story", id: "story" },
    { name: "Visit", id: "contact" },
  ];

  const alwaysTransparent = !isScrolled;

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[#130C06]/96 backdrop-blur-md py-3 border-b border-white/8"
          : "bg-transparent py-5"
      }`}
    >
      {/* Marigold accent line */}
      {alwaysTransparent && <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4891A]" />}

      <div className="container mx-auto px-8 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <img src={logo} alt="Thai Pearl" className="h-11 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {sectionLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-white/65 hover:text-[#D4891A] transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
          <Link
            href="/menu"
            className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-white/65 hover:text-[#D4891A] transition-colors duration-200"
          >
            Menu
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.22em] uppercase text-white/50 hover:text-white/80 transition-colors duration-200"
          >
            Reserve
          </a>
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#B5311E] hover:bg-[#952A18] text-white px-6 py-2.5 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-200"
          >
            Order Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#130C06] border-t border-white/8"
        >
          <div className="flex flex-col px-8 py-6 gap-5">
            {sectionLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left font-sans text-sm font-medium tracking-[0.2em] uppercase text-white/60 hover:text-[#D4891A] transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left font-sans text-sm font-medium tracking-[0.2em] uppercase text-white/60 hover:text-[#D4891A] transition-colors"
            >
              Menu
            </Link>
            <div className="pt-4 border-t border-white/8 flex flex-col gap-3">
              <a
                href="https://thaipearlasheville.com/reservations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center font-sans text-sm tracking-widest uppercase text-white/45 py-3 border border-white/15"
              >
                Reserve
              </a>
              <button
                onClick={() => scrollTo("order")}
                className="bg-[#B5311E] text-white text-center py-4 font-sans text-sm font-semibold tracking-[0.2em] uppercase"
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
