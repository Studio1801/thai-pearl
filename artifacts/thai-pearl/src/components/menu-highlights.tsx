import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import padThai from "@assets/thai-pearl/food/pad-thai-closeup.jpg";
import drunkenNoodles from "@assets/thai-pearl/food/drunken-noodles-issan.jpg";
import larbSalad from "@assets/thai-pearl/food/larb-salad.jpg";
import springRolls from "@assets/thai-pearl/food/spring-rolls.jpg";
import cashew from "@assets/thai-pearl/food/cashew-stir-fry.jpg";

const dishes = [
  {
    name: "Pad Thai",
    tag: "Best New Restaurant Dish",
    desc: "Rice noodles wok-tossed with egg, bean sprouts, scallions, and crushed peanuts in a tamarind sauce built from a royal recipe. This is the one that started everything.",
    img: padThai,
  },
  {
    name: "Drunken Noodles",
    tag: "Issan Style",
    desc: "Wide rice noodles thrown into a screaming-hot wok with Thai basil, chili, and a sauce that coats every strand. You will not stop eating.",
    img: drunkenNoodles,
  },
  {
    name: "Larb Salad",
    tag: "Royal Classic",
    desc: "Minced chicken with lime, roasted chili, mint, and toasted rice powder. Bright. Punchy. Impossible to put down.",
    img: larbSalad,
  },
  {
    name: "Spring Rolls",
    tag: "Fan Favorite",
    desc: "Crispy golden shells packed with fresh vegetables and glass noodles. Order them first. Order more.",
    img: springRolls,
  },
  {
    name: "Cashew Stir Fry",
    tag: "Popular",
    desc: "Your protein stir-fried with roasted cashews, bell peppers, and a silky savory sauce. Order it once and it becomes your thing.",
    img: cashew,
  },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="bg-[#0D0A09] text-white overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-[#FFB800] text-xs tracking-[0.35em] uppercase mb-4">
              What we make
            </p>
            <h2
              className="font-serif font-light text-white leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
            >
              Food that makes
              <br />
              <em className="text-[#ED0000]">you come back.</em>
            </h2>
          </motion.div>
          <motion.a
            href="https://thaipearlasheville.com/menu"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-2 group text-white/40 hover:text-[#FFB800] font-sans text-xs tracking-[0.2em] uppercase transition-colors mb-2"
          >
            Full Menu
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* Hero dish — spans full width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative group overflow-hidden"
        style={{ height: "55vh", minHeight: "380px" }}
      >
        <img
          src={dishes[0].img}
          alt={dishes[0].name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <span className="inline-block self-start bg-[#ED0000] text-white font-sans text-xs tracking-[0.2em] uppercase px-3 py-1 mb-4">
            {dishes[0].tag}
          </span>
          <h3
            className="font-serif font-light text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
          >
            {dishes[0].name}
          </h3>
          <p className="text-white/60 font-sans text-base max-w-lg leading-relaxed hidden md:block">
            {dishes[0].desc}
          </p>
        </div>
      </motion.div>

      {/* 4-dish grid */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {dishes.slice(1).map((dish, i) => (
          <motion.div
            key={dish.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="group relative overflow-hidden border-t border-l border-white/10 first:border-l-0"
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src={dish.img}
              alt={dish.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-sans text-[#FFB800] text-[9px] tracking-[0.25em] uppercase mb-1">{dish.tag}</p>
              <h4
                className="font-serif font-light text-white"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
              >
                {dish.name}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full menu CTA */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <motion.a
          href="https://thaipearlasheville.com/menu"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:hidden flex items-center gap-2 group text-white/50 hover:text-[#FFB800] font-sans text-xs tracking-[0.2em] uppercase transition-colors mb-0"
        >
          Full Menu
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
