import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";
import menuBgImg from "@assets/thai-pearl/menu-page.jpg";

const categories = [
  {
    name: "Appetizers",
    note: "Vegan and Gluten-Free options available",
    items: [
      { name: "Edamame (V)", price: "$8", desc: "Steamed whole soybeans with sea salt and garlic" },
      { name: "Fresh Rolls (2)", price: "$9", desc: "Shrimp, cilantro, red onion, mint, romaine, cabbage, carrot, Thai basil in rice paper with hoisin and peanuts" },
      { name: "Thai Pearl Spring Rolls (3)", price: "$9", desc: "Fried spring rolls with Thai-seasoned minced chicken, mozzarella cheese, and sweet chili sauce" },
      { name: "Thai Fried Shrimp", price: "$14", desc: "Butter-fried jumbo shrimp marinated in Thai Pearl house sauce" },
      { name: "Thai Onion Rings (V avail.)", price: "$13", desc: "Battered fried yellow onions seasoned with Thai larb seasoning, served with Sriracha mayo" },
      { name: "Thai Fries", price: "$9", desc: "Hand-cut fries tossed in chili lime seasoning with homemade spicy mayo" },
      { name: "Crispy Tofu with Sweet Chili Sauce (V)", price: "$9", desc: "Lightly breaded organic non-GMO tofu, fried and topped with sweet chili sauce, Thai basil, and crushed peanuts" },
      { name: "Grilled Chicken Satay (3)", price: "$14", desc: "Chicken marinated in turmeric brown sauce, served with peanut sauce and cucumber salad" },
      { name: "Shrimp Rangoon (4)", price: "$9", desc: "Shrimp mixed with cream cheese, wrapped in wonton skin, with sweet chili sauce" },
    ],
  },
  {
    name: "Thai Salads",
    note: "Served on romaine lettuce",
    items: [
      { name: "Thai Pearl House Salad (V avail.)", price: "$9", desc: "Romaine, cabbage, carrot, tomato, red onion, bean sprout, peanut, Thai basil, scallion, cilantro, mint, chili-lime dressing" },
      { name: "Green Papaya Salad (V avail.) / E-San Style", price: "$14–$15", desc: "Shredded unripe papaya, carrot, fresh garlic, tomato, crushed peanuts with Thai chili-lime-fish sauce dressing" },
      { name: "Larb Salad", price: "$15", desc: "Minced chicken with Thai seasoning, roasted rice, red onion, Thai basil, mint, scallion, cilantro with lime and fish sauce dressing" },
      { name: "Clear Noodle Salad", price: "$16", desc: "Minced chicken with clear mung bean noodles, red onion, tomato, carrot, cilantro, peanuts with sweet chili and lime dressing" },
      { name: "Grilled Beef Salad", price: "$17", desc: "Grilled marinated beef strips with lettuce, cabbage, carrot, tomato, red onion, bean sprout, Thai basil, mint, chili-lime dressing" },
    ],
  },
  {
    name: "Soups and Noodle Soups",
    note: "All soups handmade to order, GF unless noted",
    items: [
      { name: "Tom Yum", price: "$8 cup / $15 bowl", desc: "Tomato, galangal, lemongrass, kaffir lime leaf, mushroom, carrot, snap pea, onion, cilantro, scallion" },
      { name: "Tom Kha", price: "$9 cup / $16 bowl", desc: "Coconut milk, galangal, kaffir lime leaf, lemongrass, onion, mushroom, carrot, snap pea, cilantro, scallion" },
      { name: "Ginger Rice Soup (V avail.)", price: "$7 cup / $13 bowl", desc: "Jasmine rice, fresh ginger, scallion, cilantro, crispy garlic oil" },
      { name: "Chicken Noodle Soup", price: "$18", desc: "Rice noodles, carrot, scallion, bean sprouts, Asian greens, cabbage, crispy garlic, crushed peanuts, cilantro" },
      { name: "Clear Soup", price: "$8 / $15", desc: "Choice of meat, broccoli, carrot, mushrooms and Asian greens, topped with cilantro, scallions, and garlic oil" },
      { name: "Thai Street Noodle Soup", price: "$18", desc: "Clear noodles, sprouts, Asian greens, cabbage, carrot, basil, scallion, cilantro, peanuts, crispy garlic oil with lime" },
      { name: "Ba Mee Noodles (GF avail.)", price: "$18", desc: "Egg noodles with Asian greens, cabbage, sprouts, carrot, crushed peanuts, scallion, cilantro, brown sauce, garlic oil" },
      { name: "Yen Ta Fo Pink Noodle Soup", price: "$18", desc: "Wide rice noodles in red tofu and bean paste broth with sprouts, Asian greens, cabbage, carrot, scallion, cilantro, crushed peanuts, crispy garlic oil, and lime" },
    ],
  },
  {
    name: "Noodle Dishes",
    note: "Vegan and GF available",
    items: [
      { name: "Thai Pearl Pad Thai", price: "$17", desc: "Stir-fried rice noodles in our old-school Pad Thai sauce with egg, onion, scallion, cabbage, bean sprouts, crushed peanuts" },
      { name: "Drunken Noodles Issan", price: "$20", desc: "Stir-fried egg noodles (or GF rice noodles) in Thai basil sauce with onion, bell pepper, garlic, carrot, peppercorn, snap pea, mushroom, broccoli, and Thai basil" },
      { name: "Pad See-Ew", price: "$18", desc: "Wide rice noodles stir-fried in sweet black soy sauce with egg, onion, carrot, cabbage, broccoli, and Asian greens" },
      { name: "Pad Woon-Sen Noodles", price: "$19", desc: "Clear bean thread noodles stir-fried in brown sauce with egg, onion, garlic, tomato, snap pea, bell pepper, carrot, mushroom, broccoli, cabbage, scallion" },
    ],
  },
  {
    name: "Stir Frys with Jasmine Rice",
    note: "GF available",
    items: [
      { name: "Eggplant Basil", price: "$21", desc: "Japanese eggplant, carrot, mushroom, onion, garlic, snap pea, bell pepper, Thai basil in basil sauce" },
      { name: "Thai Style Fresh Basil", price: "$20", desc: "Onion, garlic, snap pea, carrot, sweet bell pepper, and Thai basil in basil sauce" },
      { name: "Pad Khing 'Fresh Ginger'", price: "$19", desc: "Fresh ginger root with onion, bell pepper, snap pea, carrot, mushroom, scallion, broccoli, and cabbage" },
      { name: "Pineapple Fried Rice", price: "$19", desc: "Stir-fried Jasmine rice with pineapple, egg, onion, carrot, tomato, and scallion" },
      { name: "Mixed Vegetable", price: "$19", desc: "Broccoli, carrot, mushroom, snap pea, bean sprout, cabbage, and Asian greens in brown sauce" },
      { name: "Thai Fried Rice", price: "$18", desc: "Stir-fried Jasmine rice with egg, garlic, onion, tomato, carrot, Asian green, scallion" },
      { name: "Broccoli and Meat", price: "$18", desc: "Your choice of protein stir-fried with sweet onion and broccoli in brown sauce, topped with garlic" },
    ],
  },
  {
    name: "Chef Specials",
    note: null,
    items: [
      { name: "Pad Ped 'Spicy Stir Fry'", price: "$28", desc: "Shrimp and Pork with Japanese eggplant, carrot, mushroom, snap pea, bell pepper, bamboo, and peppercorn in red curry paste sauce with Jasmine rice" },
      { name: "Secret Wife Stir Fry", price: "$26", desc: "Your choice of protein with lemongrass, kaffir lime leaf, Thai basil, carrot, mushroom, onion, bell pepper, snap pea, and yellow curry powder in brown sauce with Jasmine rice" },
      { name: "Seafood Basil Fried Rice", price: "$28", desc: "Stir-fried Jasmine rice with shrimp, mussels, calamari, Thai basil, egg, broccoli, carrot, mushroom, and onion in basil sauce" },
      { name: "Wild Ginger Curry Noodles", price: "$28", desc: "Your choice of protein stir-fried with aromatics, broccoli, Asian greens, bell peppers, and green beans with wide noodles, finished with green curry and topped with bean sprouts and basil" },
      { name: "Thai Pearl Cashew Nut Stir Fry", price: "$27", desc: "Your choice of protein stir-fried with garlic, onions, pineapple, carrots, mushrooms, bell peppers, broccoli, and cashew nuts" },
    ],
  },
  {
    name: "Curries",
    note: "Served with Jasmine Rice. All curries start at level 1 / naturally spicy",
    items: [
      { name: "Red Curry", price: "$23", desc: "Coconut milk with dry chili paste, peppercorn, mushroom, bell pepper, bamboo shoots, carrot, onion, broccoli, snap pea, and Thai basil" },
      { name: "Green Curry", price: "$22", desc: "Our famous curry with chili paste, coconut milk, onion, Japanese eggplant, carrot, broccoli, bell pepper, mushroom, snap pea, and Thai basil" },
      { name: "Pineapple Curry", price: "$23", desc: "Sweet red curry with coconut milk, pineapple, mushroom, snap pea, tomato, carrot, bell pepper, onion, broccoli, and Thai basil" },
      { name: "Vegan Curry", price: "$20", desc: "Curry of the day with onion, Thai herbs, chili paste, bell pepper, kaffir lime leaf, carrot, broccoli, Thai basil, mushroom, snap peas, and Asian greens" },
      { name: "Paneang Curry", price: "$21", desc: "A sweeter curry made with coconut milk, Thai herbs, chili paste, onion, bell pepper, kaffir lime leaf, carrot, broccoli, Thai basil, mushroom, snap pea, topped with crushed peanuts" },
      { name: "Massaman Curry", price: "$20", desc: "Curry of tamarind, cumin, turmeric, and coconut milk with carrots, onion, and potato, topped with crushed peanuts and crispy onion" },
    ],
  },
  {
    name: "Kids Menu",
    note: null,
    items: [
      { name: "Kids Noodles", price: "$10", desc: "Chicken, onion, egg, broccoli, and carrot" },
      { name: "Kids Fried Rice", price: "$10", desc: "Chicken, onion, egg, broccoli, and carrot" },
    ],
  },
  {
    name: "Sides",
    note: null,
    items: [
      { name: "White Rice", price: "$3", desc: null },
      { name: "Fried Rice", price: "$6", desc: null },
      { name: "Noodles", price: "$3", desc: "Rice, wide rice, egg, or clear noodles" },
      { name: "Soup Broth", price: "$4", desc: "Chicken or Vegetable" },
      { name: "Thai Fried Egg", price: "$3", desc: null },
      { name: "Extra Curry Sauce", price: "$7", desc: "Green, Red, Paneang, Massaman, or Vegan" },
      { name: "Sauces", price: "$1.50", desc: "Sweet Chili, Hoisin, Sriracha mayo, or Peanut Satay" },
    ],
  },
];

const proteins = [
  { type: "Chicken, Pork, Tofu, or Veggies", price: "$5" },
  { type: "Beef or Shrimp", price: "$6" },
  { type: "Mussels, Calamari, or Eggplant", price: "$4" },
];

const spiceLevels = ["1 — Mild", "2 — Medium", "3 — Hot!", "4 — Very Hot!!", "5 — Thai Hot!!!"];

export default function MenuPage() {
  return (
    <div className="bg-[#FBF5E8] min-h-screen font-sans selection:bg-[#B5311E] selection:text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={menuBgImg} alt="Thai Pearl Menu" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1209]/70 via-[#1E1209]/50 to-[#FBF5E8]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <p className="font-sans text-[#D4891A] text-xs tracking-[0.35em] uppercase mb-4">Thai Pearl</p>
          <h1
            className="font-serif font-light text-white leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Our Menu
          </h1>
        </div>
      </div>

      {/* Ordering note */}
      <div className="bg-[#1E1209] thai-pattern-dark py-5 px-8 text-center">
        <p className="font-sans text-white/60 text-sm">
          <span className="text-[#D4891A] font-semibold">Protein add-ons:</span>
          {" "}Chicken / Pork / Tofu / Veggies +$5 &nbsp;|&nbsp; Beef / Shrimp +$6 &nbsp;|&nbsp; Mussels / Calamari +$4
          &nbsp;&nbsp;
          <span className="text-[#D4891A] font-semibold">Spice:</span>
          {" "}1 Mild → 5 Thai Hot
        </p>
      </div>

      {/* Menu categories */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-5xl">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* Category header */}
            <div className="flex items-baseline gap-5 mb-2 pb-4 border-b-2 border-[#1E1209]">
              <h2
                className="font-serif font-light text-[#1E1209] leading-none"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {cat.name}
              </h2>
              {cat.note && (
                <p className="font-sans text-[#8A7060] text-xs italic hidden md:block">{cat.note}</p>
              )}
            </div>
            {cat.note && (
              <p className="font-sans text-[#8A7060] text-xs italic mb-4 md:hidden">{cat.note}</p>
            )}

            {/* Items */}
            <div className="divide-y divide-[#E8DCC8]">
              {cat.items.map((item, ii) => (
                <div key={ii} className="py-4 flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <p className="font-sans font-semibold text-[#1E1209] text-base leading-snug">
                      {item.name}
                    </p>
                    {item.desc && (
                      <p className="font-sans text-[#7A6A60] text-sm mt-1 leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  <p className="font-serif font-light text-[#B5311E] text-lg flex-shrink-0 mt-0.5">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Spice levels */}
        <div className="mt-4 mb-16 bg-[#1E1209] thai-pattern-dark p-8 md:p-10">
          <p className="font-sans text-[#D4891A] text-xs tracking-[0.3em] uppercase mb-4">Spice Levels</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {spiceLevels.map((s, i) => (
              <span key={i} className="font-sans text-white/70 text-sm">{s}</span>
            ))}
          </div>
        </div>

        {/* Order CTA */}
        <div className="text-center pb-8">
          <p className="font-sans text-[#8A7060] text-sm mb-6">Ready to order?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.grubhub.com/search?locationQuery=747+Haywood+Rd+Asheville+NC&queryText=Thai+Pearl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B5311E] hover:bg-[#952A18] text-white px-10 py-4 font-sans font-semibold text-sm tracking-[0.18em] uppercase transition-colors text-center"
            >
              Order Delivery
            </a>
            <a
              href="https://thaipearlasheville.com/reservations"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1E1209]/40 hover:border-[#1E1209] text-[#1E1209] px-10 py-4 font-sans text-sm tracking-[0.18em] uppercase transition-colors text-center"
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
