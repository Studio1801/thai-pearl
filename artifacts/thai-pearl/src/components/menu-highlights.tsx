import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import padThai from "@assets/thai-pearl/food/pad-thai-closeup.jpg";
import drunkenNoodles from "@assets/thai-pearl/food/drunken-noodles-issan.jpg";
import larbSalad from "@assets/thai-pearl/food/larb-salad.jpg";
import springRolls from "@assets/thai-pearl/food/spring-rolls.jpg";
import cashew from "@assets/thai-pearl/food/cashew-stir-fry.jpg";

const dishes = [
  {
    id: 1,
    title: "Pad Thai",
    subtitle: "The dish that won us Best New Restaurant",
    description:
      "Rice noodles wok-tossed with egg, bean sprouts, scallions, and crushed peanuts in a tamarind sauce built from a royal recipe. One bite and you will understand why.",
    image: padThai,
    badge: "Signature",
    badgeColor: "bg-[#ED0000]",
    size: "large",
  },
  {
    id: 2,
    title: "Drunken Noodles",
    subtitle: "Issan style. Not for the timid.",
    description:
      "Wide rice noodles thrown into a screaming hot wok with fresh Thai basil, chili, and a sauce that coats every strand. You will not stop eating.",
    image: drunkenNoodles,
    badge: "Chef's Pick",
    badgeColor: "bg-[#FFB800] text-black",
    size: "medium",
  },
  {
    id: 3,
    title: "Larb Salad",
    subtitle: "From the Royal Palace kitchen to your table.",
    description:
      "Minced chicken tossed with lime, roasted chili, mint, and toasted rice powder. Bright. Punchy. Impossible to put down.",
    image: larbSalad,
    badge: "Royal Classic",
    badgeColor: "bg-[#0F9E5E]",
    size: "medium",
  },
  {
    id: 4,
    title: "Spring Rolls",
    subtitle: "The starter that steals the show.",
    description:
      "Crispy golden shells packed with fresh vegetables and glass noodles. Dip them. Eat them. Order more.",
    image: springRolls,
    badge: "Fan Favorite",
    badgeColor: "bg-white/20",
    size: "small",
  },
  {
    id: 5,
    title: "Cashew Nut Stir Fry",
    subtitle: "Sweet. Savory. Addictive.",
    description:
      "Your choice of protein stir-fried with roasted cashews, bell peppers, and a silky savory sauce. Order it once and it becomes your thing.",
    image: cashew,
    badge: "Popular",
    badgeColor: "bg-[#FF6A00]",
    size: "small",
  },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-[#100D0C] text-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-[#FFB800] font-sans tracking-[0.25em] uppercase text-xs font-bold mb-3">
              What we make
            </p>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Food that makes
              <br />
              <span className="italic text-[#ED0000]">you come back.</span>
            </h2>
          </div>
          <a
            href="https://thaipearlasheville.com/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group text-white/60 hover:text-[#FFB800] font-sans text-sm tracking-[0.15em] uppercase transition-colors flex-shrink-0"
          >
            Full Menu
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Featured large dish */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden mb-6 cursor-pointer"
        >
          <div className="aspect-[16/7] relative overflow-hidden">
            <img
              src={dishes[0].image}
              alt={dishes[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
            <span className={`inline-block self-start text-white text-xs font-bold tracking-widest uppercase px-3 py-1 mb-4 font-sans ${dishes[0].badgeColor}`}>
              {dishes[0].badge}
            </span>
            <h3 className="font-serif text-5xl md:text-7xl text-white mb-3">
              {dishes[0].title}
            </h3>
            <p className="text-[#FFB800] font-sans text-sm tracking-wider uppercase mb-4">
              {dishes[0].subtitle}
            </p>
            <p className="text-white/70 font-sans text-base max-w-lg leading-relaxed hidden md:block">
              {dishes[0].description}
            </p>
          </div>
        </motion.div>

        {/* 4-dish grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dishes.slice(1).map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className={`inline-block text-white text-xs font-bold tracking-widest uppercase px-2 py-0.5 mb-2 font-sans ${dish.badgeColor}`}>
                  {dish.badge}
                </span>
                <h3 className="font-serif text-xl text-white">{dish.title}</h3>
                <p className="text-white/60 font-sans text-xs mt-1 leading-relaxed hidden md:block line-clamp-2">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
