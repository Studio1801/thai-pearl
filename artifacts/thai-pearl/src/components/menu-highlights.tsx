import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import padThaiImg from "@assets/thai-pearl/food/pad-thai-closeup.jpg";
import drunkenImg from "@assets/thai-pearl/food/drunken-noodles-issan.jpg";
import larbImg from "@assets/thai-pearl/food/larb-salad.jpg";
import cashewImg from "@assets/thai-pearl/food/cashew-stir-fry.jpg";
import soupImg from "@assets/thai-pearl/food/thai-soup.jpg";
import springRollsImg from "@assets/thai-pearl/food/spring-rolls.jpg";

const dishes = [
  {
    name: "Pad Thai",
    thai: "ผัดไทย",
    price: "$17",
    badge: "The original",
    desc: "Wok-tossed rice noodles, tamarind, egg, peanuts.",
    img: padThaiImg,
  },
  {
    name: "Drunken Noodles",
    thai: "ผัดขี้เมา",
    price: "$20",
    badge: "Issan style",
    desc: "Egg noodles, Thai basil, chili, screaming-hot wok.",
    img: drunkenImg,
  },
  {
    name: "Tom Kha",
    thai: "ต้มข่าไก่",
    price: "$14",
    badge: "Classic soup",
    desc: "Coconut milk, galangal, lemongrass, kaffir lime.",
    img: soupImg,
  },
  {
    name: "Cashew Nut Stir Fry",
    thai: "ผัดเม็ดมะม่วงหิมพานต์",
    price: "$27",
    badge: "Chef's special",
    desc: "Pineapple, peppers, garlic, roasted cashews.",
    img: cashewImg,
  },
  {
    name: "Larb Salad",
    thai: "ลาบไก่",
    price: "$15",
    badge: "Royal Palace classic",
    desc: "Minced chicken, rice powder, fresh mint, lime.",
    img: larbImg,
  },
];

function DishCard({
  dish,
  className = "",
  tall = false,
}: {
  dish: (typeof dishes)[0];
  className?: string;
  tall?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7 }}
      className={`relative overflow-hidden group cursor-default ${className}`}
      style={{ minHeight: tall ? "480px" : "340px" }}
    >
      <img
        src={dish.img}
        alt={dish.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#180E06]/90 via-[#180E06]/25 to-transparent" />
      {/* Side scrim for left-aligned text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#180E06]/40 via-transparent to-transparent" />

      {/* Price badge */}
      <div className="absolute top-4 right-4 bg-[#C4281A] text-white font-serif px-3 py-1 text-sm" style={{ fontWeight: 500 }}>
        {dish.price}
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <p className="font-sans text-[#E8920E] text-[13px] font-semibold mb-2">
          {dish.badge}
        </p>
        <h3
          className="font-serif text-white leading-none mb-1"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 500 }}
        >
          {dish.name}
        </h3>
        <p
          className="font-serif text-[#E8920E]/60 leading-none mb-3"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)", fontWeight: 400 }}
        >
          {dish.thai}
        </p>
        <p className="font-sans text-white/40 text-xs leading-relaxed max-w-[22ch] hidden md:block">
          {dish.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function MenuHighlights() {
  return (
    <section id="menu" className="bg-[#FDF7EC] thai-pattern-light">
      {/* Section header */}
      <div className="px-8 md:px-16 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <div className="mb-5">
              <p className="font-sans text-[#C4281A] text-[13px] font-semibold">
                What we cook
              </p>
              <p className="font-serif text-[#C4281A]/45 text-sm tracking-wider mt-0.5" style={{ fontWeight: 400 }}>
                อาหารของเรา
              </p>
            </div>
            <h2
              className="font-serif leading-none tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", fontWeight: 500 }}
            >
              <span className="text-[#180E06]">Food that makes</span>
              <br />
              <em className="text-[#C4281A]" style={{ fontStyle: "italic", fontWeight: 500 }}>
                you come back.
              </em>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 font-sans text-[#8A7060] hover:text-[#C4281A] text-[13px] font-semibold transition-colors group font-semibold mb-1 flex-shrink-0"
          >
            Full Menu
            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Editorial photo grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-[#E8E0D4]">
        {/* Row 1: large + medium */}
        <DishCard dish={dishes[0]} className="lg:col-span-3" />
        <DishCard dish={dishes[1]} className="lg:col-span-2" />

        {/* Row 2: medium + large */}
        <DishCard dish={dishes[2]} className="lg:col-span-2" />
        <DishCard dish={dishes[3]} className="lg:col-span-3" />

        {/* Row 3: full-width feature */}
        <DishCard dish={dishes[4]} className="lg:col-span-5" tall />
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
            className="btn btn-ink flex-shrink-0"
          >
            See Full Menu
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
