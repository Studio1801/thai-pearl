import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import padThaiImg from "@assets/thai-pearl/food/pad-thai-closeup.jpg";
import drunkenImg from "@assets/thai-pearl/food/drunken-noodles-issan.jpg";
import larbImg from "@assets/thai-pearl/food/larb-salad.jpg";
import cashewImg from "@assets/thai-pearl/food/cashew-stir-fry.jpg";

const dishes = [
  {
    name: "Pad Thai",
    price: "$17",
    badge: "The one that started it all",
    desc: "Wok-tossed rice noodles in our old-school tamarind sauce with egg, bean sprouts, scallion, and crushed peanuts. It won us Best New Restaurant. It still does.",
    img: padThaiImg,
    flip: false,
  },
  {
    name: "Drunken Noodles Issan",
    price: "$20",
    badge: "Issan style",
    desc: "Egg noodles thrown into a screaming-hot wok with Thai basil, chili, peppercorn, and a sauce that coats every strand. This one has regulars coming back every week.",
    img: drunkenImg,
    flip: true,
  },
  {
    name: "Larb Salad",
    price: "$15",
    badge: "Royal Palace classic",
    desc: "Minced chicken, roasted rice powder, fresh mint, lime, and fish sauce. Bright, punchy, and unlike anything in Asheville. Direct from the Royal Palace kitchen.",
    img: larbImg,
    flip: false,
  },
  {
    name: "Cashew Nut Stir Fry",
    price: "$27",
    badge: "Chef's Special",
    desc: "Your protein stir-fried with garlic, onions, pineapple, bell peppers, broccoli, and roasted cashews. Sweet, savory, done in the wok. Order it once and it becomes yours.",
    img: cashewImg,
    flip: true,
  },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="bg-[#FDF7EC] thai-pattern-light">
      {/* Header */}
      <div className="container mx-auto px-8 md:px-16 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-sans text-[#C4281A] text-[10px] tracking-[0.4em] uppercase font-semibold mb-5">
              What we cook
            </p>
            <h2
              className="font-serif leading-none tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", fontWeight: 500 }}
            >
              <span className="text-[#180E06]">Food that makes</span>
              <br />
              <em className="text-[#C4281A]" style={{ fontStyle: "italic", fontWeight: 500 }}>you come back.</em>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 font-sans text-[#8A7060] hover:text-[#C4281A] text-[10px] tracking-[0.25em] uppercase transition-colors group font-medium mb-1"
          >
            Full Menu
            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Dish rows — alternating */}
      <div>
        {dishes.map((dish, i) => (
          <motion.div
            key={dish.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75 }}
            className={`grid grid-cols-1 md:grid-cols-2 border-t border-[#E8920E]/18 ${
              dish.flip ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Text */}
            <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-12 md:py-16">
              <p className="font-sans text-[#E8920E] text-[9px] tracking-[0.35em] uppercase font-semibold mb-3">
                {dish.badge}
              </p>
              <div className="flex items-baseline gap-4 mb-4">
                <h3
                  className="font-serif leading-none tracking-tight text-[#180E06]"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 500 }}
                >
                  {dish.name}
                </h3>
                <span
                  className="font-serif text-[#C4281A] flex-shrink-0"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 500 }}
                >
                  {dish.price}
                </span>
              </div>
              <p className="font-sans text-[#5A4A40] text-[14px] leading-relaxed max-w-xs">
                {dish.desc}
              </p>
            </div>

            {/* Photo */}
            <div className="overflow-hidden" style={{ minHeight: "300px" }}>
              <motion.img
                src={dish.img}
                alt={dish.name}
                className="w-full h-full object-cover"
                style={{ minHeight: "300px" }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full menu CTA */}
      <div className="px-8 md:px-16 py-14">
        <div className="border-t border-[#E8920E]/20 pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-sans text-[#8A7060] text-sm mb-1">
              Appetizers · Soups · Curries · Noodles · Stir Frys · Chef Specials
            </p>
            <p className="font-sans text-[#3A2A1E] text-sm font-semibold">
              Every dish made to order. Spice levels 1 to 5.
            </p>
          </div>
          <Link
            href="/menu"
            className="flex items-center gap-3 bg-[#180E06] hover:bg-[#2D1A0E] text-white px-10 py-4 font-sans font-bold text-[11px] tracking-[0.25em] uppercase transition-colors flex-shrink-0"
          >
            See Full Menu
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
