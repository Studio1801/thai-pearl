import { motion } from "framer-motion";
import img1 from "@assets/thai-pearl/food/larb-salad.jpg";
import img2 from "@assets/thai-pearl/food/pad-thai.jpg";
import img3 from "@assets/thai-pearl/food/drunken-noodles.jpg";
import img4 from "@assets/thai-pearl/food/thai-soup.jpg";
import img5 from "@assets/thai-pearl/food/spring-rolls.jpg";
import img6 from "@assets/thai-pearl/food/pad-thai-closeup.jpg";
import img7 from "@assets/thai-pearl/food/pad-thai-wooden.jpg";
import img8 from "@assets/thai-pearl/food/thai-soup2.jpg";
import img9 from "@assets/thai-pearl/food/drunken-noodles-issan.jpg";
import img10 from "@assets/thai-pearl/food/thai-dishes.jpg";
import img11 from "@assets/thai-pearl/food/cashew-stir-fry.jpg";
import img12 from "@assets/thai-pearl/food/wok-noodles.jpg";

// Asymmetric bento grid — each cell's col/row span
const cells = [
  { img: img10, alt: "Thai Pearl spread",    col: "col-span-2 row-span-2" },
  { img: img6,  alt: "Pad Thai close up",    col: "col-span-1 row-span-1" },
  { img: img12, alt: "Wok noodles",          col: "col-span-1 row-span-1" },
  { img: img9,  alt: "Drunken Noodles",      col: "col-span-2 row-span-1" },
  { img: img5,  alt: "Spring Rolls",         col: "col-span-1 row-span-2" },
  { img: img4,  alt: "Thai Soup",            col: "col-span-1 row-span-1" },
  { img: img8,  alt: "Thai Soup with wine",  col: "col-span-1 row-span-1" },
  { img: img2,  alt: "Pad Thai",             col: "col-span-1 row-span-1" },
  { img: img1,  alt: "Larb Salad",           col: "col-span-1 row-span-1" },
  { img: img3,  alt: "Drunken Noodles",      col: "col-span-2 row-span-1" },
  { img: img7,  alt: "Pad Thai on wood",     col: "col-span-1 row-span-1" },
  { img: img11, alt: "Cashew Stir Fry",      col: "col-span-1 row-span-1" },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-[#0D0A09]">
      {/* Header — text over first row */}
      <div className="container mx-auto px-6 md:px-12 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="font-sans text-[#FFB800] text-[13px] font-semibold mb-3">
              Straight from the kitchen
            </p>
            <h2
              className="font-serif font-light text-white leading-none"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            >
              Still hungry?
              <br />
              <em className="text-[#ED0000]">You will be.</em>
            </h2>
          </div>
          <a
            href="https://instagram.com/thaipearl_restaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-white/40 hover:text-[#FFB800] text-[13px] font-semibold transition-colors self-end mb-1"
          >
            @thaipearl_restaurant
          </a>
        </motion.div>
      </div>

      {/* Asymmetric grid — full-width, no outer padding */}
      <div className="grid grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-px bg-black">
        {cells.map((cell, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            className={`relative overflow-hidden group ${cell.col}`}
          >
            <img
              src={cell.img}
              alt={cell.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
