import { motion } from "framer-motion";
import padThai from "@assets/thai-pearl/food/pad-thai-closeup.jpg";
import drunkenNoodles from "@assets/thai-pearl/food/drunken-noodles-issan.jpg";
import larbSalad from "@assets/thai-pearl/food/larb-salad.jpg";

const menuItems = [
  {
    id: 1,
    title: "Classic Pad Thai",
    description: "Rice noodles stir-fried with egg, bean sprouts, scallions, and crushed peanuts in our signature tamarind sauce. A timeless royal recipe.",
    image: padThai,
    tags: ["Signature", "Gluten-Free Option"]
  },
  {
    id: 2,
    title: "Drunken Noodles (Issan Style)",
    description: "Bold and fiery. Wide rice noodles wok-tossed with fresh basil, bell peppers, onions, and a deeply savory chili-garlic sauce.",
    image: drunkenNoodles,
    tags: ["Spicy", "Chef's Favorite"]
  },
  {
    id: 3,
    title: "Traditional Larb Salad",
    description: "Minced chicken or pork tossed with fresh lime juice, roasted chili, mint, cilantro, and toasted rice powder. Refreshing and vibrant.",
    image: larbSalad,
    tags: ["Authentic", "Zesty"]
  }
];

export function MenuHighlights() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-[#1A1514] text-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-secondary"></div>
              <span className="text-secondary font-sans tracking-[0.2em] uppercase text-sm font-semibold">
                The Menu
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Crafted with <span className="italic text-primary">royal precision.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://thaipearlasheville.com/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 group text-sm font-sans tracking-[0.15em] uppercase hover:text-secondary transition-colors"
            >
              View Full Menu 
              <span className="block transform group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-black/60 backdrop-blur-sm text-xs font-sans tracking-wider uppercase px-3 py-1 text-white border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-2xl font-serif mb-3 group-hover:text-secondary transition-colors">
                {item.title}
              </h3>
              <p className="text-white/60 font-sans leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
