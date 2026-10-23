import { motion } from "framer-motion";
import logo from "@assets/thai-pearl/logo.png";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { LiveBanner } from "@/components/live-banner";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    setIsScrolled(false);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 450);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[#100907]/96 backdrop-blur-md border-b border-white/8"
          : "bg-transparent"
      }`}
      style={!isScrolled ? { textShadow: "0 1px 6px rgba(0,0,0,0.7)" } : {}}
    >
      {/* Gradient top border */}
      {!isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C4281A] via-[#E8920E] to-[#C4281A]" />
      )}

      <LiveBanner />

      <div className={`container mx-auto px-8 md:px-16 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}>
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <img src={logo} alt="Thai Pearl" className="h-11 w-auto object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {[
            { label: "Menu", action: () => {}, href: "/menu" },
            { label: "Meal prep", action: () => {}, href: "/meal-prep" },
            { label: "Events", action: () => {}, href: "/events" },
            { label: "Catering", action: () => {}, href: "/catering" },
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

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/reserve"
            className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-white/45 hover:text-white/80 transition-colors duration-200"
          >
            Reserve
          </Link>
          <button
            onClick={() => scrollTo("order")}
            className="bg-[#C4281A] hover:bg-[#a42016] text-white px-6 py-2.5 font-sans text-[10px] font-bold tracking-[0.28em] uppercase transition-colors duration-200"
          >
            Order Now
          </button>
        </div>

        <button className="lg:hidden p-2.5 -mr-2.5 text-white" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#100907] border-t border-white/8"
        >
          <div className="flex flex-col px-6 py-4 max-h-[calc(100dvh-80px)] overflow-y-auto">
            {[
              ["Menu", "/menu"],
              ["Meal prep", "/meal-prep"],
              ["Events and specials", "/events"],
              ["Catering", "/catering"],
              ["Private parties", "/parties"],
              ["Press and reviews", "/press"],
              ["Jobs", "/jobs"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-2xl py-3 border-b border-white/8 transition-colors ${location === href ? "text-[#E8920E]" : "text-white/85 hover:text-[#E8920E]"}`}
                style={{ fontWeight: 500 }}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="text-left font-serif text-2xl py-3 text-white/85 hover:text-[#E8920E] transition-colors"
              style={{ fontWeight: 500 }}
            >
              Hours and directions
            </button>
            <div className="pt-5 pb-3 grid grid-cols-2 gap-3">
              <Link
                href="/reserve"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center font-sans text-base font-semibold text-white py-4 rounded-lg bg-white/10"
              >
                Book a table
              </Link>
              <button
                onClick={() => { setIsMobileMenuOpen(false); scrollTo("order"); }}
                className="bg-[#C4281A] text-white text-center py-4 rounded-lg font-sans text-base font-bold"
              >
                Order pickup
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
