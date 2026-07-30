import { motion } from "framer-motion";
import wokImg from "@assets/thai-pearl/food/wok-noodles.jpg";
import chefImg from "@assets/thai-pearl/food/thai-dishes.jpg";

export function Story() {
  return (
    <section id="story" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Images Collection */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-4/5 aspect-[4/5]"
            >
              <img 
                src={chefImg} 
                alt="Thai Pearl culinary spread" 
                className="w-full h-full object-cover shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-12 -right-4 w-3/5 aspect-square z-20 border-8 border-background"
            >
              <img 
                src={wokImg} 
                alt="Wok firing" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 -z-10 rounded-full blur-3xl"></div>
          </div>

          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-primary font-sans tracking-[0.2em] uppercase text-sm font-semibold">
                Our Legacy
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-8 leading-tight">
              A culinary journey from <span className="italic text-secondary">Bangkok</span> to Asheville.
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-sans text-lg leading-relaxed">
              <p>
                Thai Pearl is the culmination of a remarkable culinary journey. Our executive chef was trained at the esteemed <strong>Royal Palace Academy</strong> in Bangkok, Thailand — one of the most prestigious culinary programs in Southeast Asia.
              </p>
              <p>
                After working alongside a Michelin Star chef in Queensland, Australia, we brought our craft to North Carolina. In 2017, we founded BoonChoo Thai Express in Flat Rock, and in March 2020, we opened the doors to Thai Pearl right here in West Asheville.
              </p>
              <p>
                That same year, we were honored with the <strong>Best New Restaurant</strong> award. This isn't just a generic Thai restaurant. This is food anchored in royal tradition, elevated to something sophisticated, vibrant, and deeply inviting.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-serif text-foreground mb-2">2020</p>
                <p className="font-sans text-sm text-muted-foreground uppercase tracking-wider">Best New Restaurant</p>
              </div>
              <div>
                <p className="text-4xl font-serif text-foreground mb-2 italic">Royal</p>
                <p className="font-sans text-sm text-muted-foreground uppercase tracking-wider">Palace Academy Trained</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
