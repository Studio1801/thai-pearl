import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling past the hero (~100vh)
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOrder = () => {
    const el = document.getElementById("order");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <button
            onClick={scrollToOrder}
            className="w-full bg-[#ED0000] text-white flex items-center justify-center gap-3 py-5 font-sans font-black text-base tracking-[0.2em] uppercase shadow-2xl"
          >
            <ShoppingBag size={20} />
            Order Now — Delivery &amp; Pickup
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
