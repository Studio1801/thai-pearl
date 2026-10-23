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
          ? "bg-[#100907]/88 backdrop-blur-xl backdrop-saturate-150 border-b border-white/8 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]"
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
                className={`relative py-2 font-sans text-[14px] font-medium transition-colors duration-200 ${location === item.href ? "text-white" : "text-white/60 hover:text-[#E8920E]"}`}
              >
                {item.label}
                {location === item.href && (
                  <motion.span layoutId="nav-active" className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#E8920E]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
                )}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={item.action}
                className="relative py-2 font-sans text-[14px] font-medium text-white/60 hover:text-[#E8920E] transition-colors duration-200"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/reserve"
            className="btn btn-glass btn-sm"
          >
            Book a table
          </Link>
          <button
            onClick={() => scrollTo("order")}
            className="btn btn-red btn-sm"
          >
            Order now
          </button>
        </div>

        <button className="lg:hidden p-2.5 -mr-2.5 text-white" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
                className="btn btn-glass"
              >
                Book a table
              </Link>
              <button
                onClick={() => { setIsMobileMenuOpen(false); scrollTo("order"); }}
                className="btn btn-red"
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
