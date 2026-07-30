import { motion } from "framer-motion";
import wokImg from "@assets/thai-pearl/food/wok-noodles.jpg";

const platforms = [
  {
    name: "Grubhub",
    description: "Order delivery or pickup",
    url: "https://www.grubhub.com/search?locationQuery=747+Haywood+Rd+Asheville+NC&queryText=Thai+Pearl",
    color: "#F63440",
    logo: (
      <svg viewBox="0 0 120 40" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" fontSize="28" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Grubhub</text>
      </svg>
    ),
  },
  {
    name: "Uber Eats",
    description: "Fast delivery to your door",
    url: "https://www.ubereats.com/search?q=Thai+Pearl&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkFzaGV2aWxsZSUyQyUyME5DJTIyJTdE",
    color: "#06C167",
    logo: (
      <svg viewBox="0 0 140 40" className="w-32 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" fontSize="26" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Uber Eats</text>
      </svg>
    ),
  },
  {
    name: "DoorDash",
    description: "Schedule or order now",
    url: "https://www.doordash.com/search/store/Thai%20Pearl%20Asheville/",
    color: "#FF3008",
    logo: (
      <svg viewBox="0 0 140 40" className="w-32 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" fontSize="26" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">DoorDash</text>
      </svg>
    ),
  },
];

export function OrderNow() {
  return (
    <section
      id="order"
      className="relative py-24 md:py-32 bg-[#0D0A09] overflow-hidden"
    >
      {/* Background food image with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={wokImg}
          alt="Wok cooking"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A09] via-transparent to-[#0D0A09]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[#FFB800] tracking-[0.25em] uppercase text-sm font-semibold mb-4">
            Craving Thai Pearl?
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
            Order Now.
            <br />
            <span className="italic text-[#FFB800]/90">Delivered Fresh.</span>
          </h2>
          <p className="text-white/70 font-sans text-lg max-w-xl mx-auto">
            Skip the wait — get authentic Royal Palace Thai delivered straight to your door through your favorite platform.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group block relative overflow-hidden cursor-pointer"
              style={{ background: platform.color }}
            >
              {/* Sheen effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 p-8 flex flex-col gap-6">
                {/* Platform name as bold text */}
                <div>
                  <p className="text-white font-sans font-black text-3xl tracking-tight">{platform.name}</p>
                  <p className="text-white/80 font-sans text-sm mt-1">{platform.description}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-sans text-white text-xs font-bold tracking-[0.15em] uppercase">
                    Order →
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Or call in */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-white/50 font-sans text-sm mb-3 tracking-wider uppercase">Prefer to call it in?</p>
          <a
            href="tel:8284125905"
            className="text-[#FFB800] font-serif text-3xl md:text-4xl hover:text-white transition-colors duration-300"
          >
            (828) 412-5905
          </a>
        </motion.div>
      </div>
    </section>
  );
}
