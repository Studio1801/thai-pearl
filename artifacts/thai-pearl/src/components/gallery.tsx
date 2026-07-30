import { motion } from "framer-motion";
import img1 from "@assets/thai-pearl/food/spring-rolls.jpg";
import img2 from "@assets/thai-pearl/food/thai-soup.jpg";
import img3 from "@assets/thai-pearl/food/pad-thai-wooden.jpg";
import img4 from "@assets/thai-pearl/food/cashew-stir-fry.jpg";
import img5 from "@assets/thai-pearl/food/thai-soup2.jpg";

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-sans tracking-[0.2em] uppercase text-sm font-semibold block mb-4">
            Visual Taste
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            A Feast for the Senses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px]">
          {/* Large prominent image */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 row-span-2 relative overflow-hidden group"
          >
            <img src={img3} alt="Pad Thai on wooden table" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 row-span-1 relative overflow-hidden group"
          >
            <img src={img1} alt="Spring Rolls" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4 row-span-1 relative overflow-hidden group"
          >
            <img src={img4} alt="Cashew Stir Fry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-6 row-span-1 relative overflow-hidden group"
          >
            <img src={img2} alt="Thai Soup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-6 row-span-1 relative overflow-hidden group"
          >
            <img src={img5} alt="Thai Soup with wine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
