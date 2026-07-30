import { motion } from "framer-motion";
import logo from "@assets/thai-pearl/logo.png";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: "Our Story", id: "story" },
    { name: "Menu", id: "menu" },
    { name: "Gallery", id: "gallery" },
    { name: "Visit", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-border/50 py-3 shadow-sm"
          : "bg-black/20 backdrop-blur-sm border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img
            src={logo}
            alt="Thai Pearl"
            className={`h-12 w-auto object-contain transition-all duration-300 ${isScrolled ? "brightness-100" : "brightness-0 invert"}`}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className={`font-sans text-sm font-medium tracking-wider uppercase transition-colors hover:text-[#FFB800] ${
                isScrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://thaipearlasheville.com/reservations"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans text-sm font-medium tracking-wider uppercase transition-colors hover:text-[#FFB800] ${
              isScrolled ? "text-foreground" : "text-white/80"
            }`}
          >
            Reserve
          </a>
          {/* PRIMARY CTA: Order Now */}
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#ED0000] hover:bg-[#c00000] text-white px-6 py-2.5 font-sans text-sm font-black tracking-wider uppercase transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-900/30"
          >
            Order Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left font-sans text-sm font-medium tracking-wider uppercase text-foreground py-2 hover:text-[#FFB800]"
              >
                {link.name}
              </button>
            ))}
            <hr className="border-border" />
            <a
              href="https://thaipearlasheville.com/reservations"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-medium tracking-wider uppercase text-foreground py-2 hover:text-[#FFB800]"
            >
              Reserve a Table
            </a>
            <button
              onClick={() => scrollTo("order")}
              className="bg-[#ED0000] text-white text-center px-6 py-3 font-sans text-sm font-black tracking-wider uppercase"
            >
              Order Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
