import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import padThaiImg from "@assets/thai-pearl/food/pad-thai-closeup.jpg";
import drunkenImg from "@assets/thai-pearl/food/drunken-noodles-issan.jpg";
import larbImg from "@assets/thai-pearl/food/larb-salad.jpg";

const dishes = [
  {
    name: "Pad Thai",
    price: "$17",
    badge: "The one that started it all",
    desc: "Rice noodles wok-tossed with egg, bean sprouts, scallions, and crushed peanuts in a tamarind sauce built from a royal recipe.",
    img: padThaiImg,
    imgRight: false,
  },
  {
    name: "Drunken Noodles Issan",
    price: "$20",
    badge: "Issan style",
    desc: "Stir-fried egg noodles in Thai basil sauce with onion, bell pepper, peppercorn, snap pea, mushroom, broccoli, and Thai basil. Loud, smoky, impossible to stop.",
    img: drunkenImg,
    imgRight: true,
  },
  {
    name: "Larb Salad",
    price: "$15",
    badge: "Royal Palace classic",
    desc: "Minced chicken with lime, roasted chili, fresh mint, and toasted rice powder. Direct from the Royal Palace kitchen.",
    img: larbImg,
    imgRight: false,
  },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="bg-[#FBF5E8] thai-pattern-light">
      {/* Header */}
      <div className="container mx-auto px-8 md:px-16 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-sans text-[#B5311E] text-xs tracking-[0.35em] uppercase mb-4">
              What we cook
            </p>
            <h2
              className="font-serif font-light text-[#1E1209] leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Food that makes
              <br />
              <em className="text-[#B5311E]">you come back.</em>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 font-sans text-[#8A7060] hover:text-[#B5311E] text-xs tracking-[0.2em] uppercase transition-colors group"
          >
            Full Menu
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Dish rows */}
      <div>
        {dishes.map((dish, i) => (
          <motion.div
            key={dish.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-1 md:grid-cols-2 border-t border-[#D4891A]/20 ${
              dish.imgRight ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Text */}
            <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-16">
              <div className="flex items-baseline gap-3 mb-2">
                <p className="font-sans text-[#D4891A] text-[10px] tracking-[0.3em] uppercase">
                  {dish.badge}
                </p>
              </div>
              <div className="flex items-baseline gap-4 mb-4">
                <h3
                  className="font-serif font-light text-[#1E1209] leading-none"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  {dish.name}
                </h3>
                <span className="font-serif text-[#B5311E] text-xl flex-shrink-0">{dish.price}</span>
              </div>
              <p className="font-sans text-[#5A4A40] text-base leading-relaxed max-w-sm">
                {dish.desc}
              </p>
            </div>

            {/* Photo */}
            <div className="overflow-hidden aspect-[4/3] md:aspect-auto" style={{ minHeight: "280px" }}>
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full menu CTA */}
      <div className="container mx-auto px-8 md:px-16 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#D4891A]/20 pt-14">
          <div>
            <p className="font-sans text-[#8A7060] text-sm mb-1">
              Appetizers, soups, curries, noodles, stir frys, and more.
            </p>
            <p className="font-sans text-[#3D2B1F] font-semibold text-sm">
              Every dish made to order. Spice levels 1 to 5.
            </p>
          </div>
          <Link
            href="/menu"
            className="flex items-center gap-3 bg-[#1E1209] hover:bg-[#2D1C10] text-white px-10 py-4 font-sans font-semibold text-sm tracking-[0.18em] uppercase transition-colors flex-shrink-0"
          >
            See Full Menu
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
