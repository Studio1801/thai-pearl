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

const photos = [
  { src: img10, alt: "Thai Pearl full spread", span: "md:col-span-2 md:row-span-2" },
  { src: img6, alt: "Pad Thai close up", span: "md:col-span-1 md:row-span-1" },
  { src: img12, alt: "Wok noodles", span: "md:col-span-1 md:row-span-1" },
  { src: img1, alt: "Larb Salad", span: "md:col-span-1 md:row-span-1" },
  { src: img3, alt: "Drunken Noodles", span: "md:col-span-1 md:row-span-1" },
  { src: img5, alt: "Spring Rolls", span: "md:col-span-1 md:row-span-2" },
  { src: img2, alt: "Pad Thai", span: "md:col-span-2 md:row-span-1" },
  { src: img4, alt: "Thai Soup", span: "md:col-span-1 md:row-span-1" },
  { src: img8, alt: "Thai Soup with wine", span: "md:col-span-1 md:row-span-1" },
  { src: img9, alt: "Drunken Noodles Issan", span: "md:col-span-2 md:row-span-1" },
  { src: img7, alt: "Pad Thai on wood", span: "md:col-span-1 md:row-span-1" },
  { src: img11, alt: "Cashew Stir Fry", span: "md:col-span-1 md:row-span-1" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#0D0A09]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-6"
      >
        <p className="font-sans text-[#FFB800] tracking-[0.3em] uppercase text-xs font-bold mb-4">
          Straight from our kitchen
        </p>
        <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
          Still hungry?
          <br />
          <span className="italic text-[#ED0000]">You will be.</span>
        </h2>
      </motion.div>

      {/* Full bleed grid, no padding */}
      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 auto-rows-[220px] md:auto-rows-[200px] gap-1">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
            className={`relative overflow-hidden group ${photo.span}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              style={{ transform: "scale(1.01)" }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
          </motion.div>
        ))}
      </div>

      {/* CTA below gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-14 px-6"
      >
        <p className="text-white/50 font-sans text-sm uppercase tracking-widest mb-5">
          Follow along on Instagram
        </p>
        <a
          href="https://instagram.com/thaipearl_restaurant"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-[#FFB800] font-sans font-bold text-lg hover:text-white transition-colors tracking-wider"
        >
          @thaipearl_restaurant
        </a>
      </motion.div>
    </section>
  );
}
