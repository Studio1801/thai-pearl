import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import menuBgImg from "@assets/thai-pearl/menu-page.jpg";

const categories = [
  {
    name: "Appetizers",
    thai: "เมนูเรียกน้ำย่อย",
    note: "Vegan and Gluten-Free options available",
    items: [
      { name: "Edamame (V)",                        thai: "ถั่วแระญี่ปุ่น",       price: "$8",  desc: "Steamed whole soybeans with sea salt and garlic" },
      { name: "Fresh Rolls (2)",                    thai: "โรลสด",               price: "$9",  desc: "Shrimp, cilantro, red onion, mint, romaine, cabbage, carrot, Thai basil in rice paper with hoisin and peanuts" },
      { name: "Thai Pearl Spring Rolls (3)",        thai: "ปอเปี๊ยะทอด",         price: "$9",  desc: "Fried spring rolls with Thai-seasoned minced chicken, mozzarella cheese, and sweet chili sauce" },
      { name: "Thai Fried Shrimp",                  thai: "กุ้งทอด",              price: "$14", desc: "Butter-fried jumbo shrimp marinated in Thai Pearl house sauce" },
      { name: "Thai Onion Rings (V avail.)",        thai: "หัวหอมทอดลาบ",        price: "$13", desc: "Battered fried yellow onions seasoned with Thai larb seasoning, served with Sriracha mayo" },
      { name: "Thai Fries",                         thai: "เฟรนช์ฟรายส์ไทย",    price: "$9",  desc: "Hand-cut fries tossed in chili lime seasoning with homemade spicy mayo" },
      { name: "Crispy Tofu with Sweet Chili (V)",   thai: "เต้าหู้กรอบ",          price: "$9",  desc: "Lightly breaded organic non-GMO tofu, fried and topped with sweet chili sauce, Thai basil, and crushed peanuts" },
      { name: "Grilled Chicken Satay (3)",          thai: "ไก่สะเต๊ะ",            price: "$14", desc: "Chicken marinated in turmeric brown sauce, served with peanut sauce and cucumber salad" },
      { name: "Shrimp Rangoon (4)",                 thai: "กุ้งราคูน",             price: "$9",  desc: "Shrimp mixed with cream cheese, wrapped in wonton skin, with sweet chili sauce" },
    ],
  },
  {
    name: "Thai Salads",
    thai: "สลัดไทย",
    note: "Served on romaine lettuce",
    items: [
      { name: "Thai Pearl House Salad (V avail.)",             thai: "สลัดบ้าน",      price: "$9",      desc: "Romaine, cabbage, carrot, tomato, red onion, bean sprout, peanut, Thai basil, scallion, cilantro, mint, chili-lime dressing" },
      { name: "Green Papaya Salad (V avail.) / E-San Style",   thai: "ส้มตำ",          price: "$14–$15", desc: "Shredded unripe papaya, carrot, fresh garlic, tomato, crushed peanuts with Thai chili-lime-fish sauce dressing" },
      { name: "Larb Salad",                                    thai: "ลาบไก่",         price: "$15",     desc: "Minced chicken with Thai seasoning, roasted rice, red onion, Thai basil, mint, scallion, cilantro with lime and fish sauce dressing" },
      { name: "Clear Noodle Salad",                            thai: "ยำวุ้นเส้น",     price: "$16",     desc: "Minced chicken with clear mung bean noodles, red onion, tomato, carrot, cilantro, peanuts with sweet chili and lime dressing" },
      { name: "Grilled Beef Salad",                            thai: "ยำเนื้อย่าง",    price: "$17",     desc: "Grilled marinated beef strips with lettuce, cabbage, carrot, tomato, red onion, bean sprout, Thai basil, mint, chili-lime dressing" },
    ],
  },
  {
    name: "Soups and Noodle Soups",
    thai: "ซุปและก๋วยเตี๋ยวน้ำ",
    note: "All soups handmade to order, GF unless noted",
    items: [
      { name: "Tom Yum",                  thai: "ต้มยำ",            price: "$8 cup / $15 bowl",  desc: "Tomato, galangal, lemongrass, kaffir lime leaf, mushroom, carrot, snap pea, onion, cilantro, scallion" },
      { name: "Tom Kha",                  thai: "ต้มข่า",            price: "$9 cup / $16 bowl",  desc: "Coconut milk, galangal, kaffir lime leaf, lemongrass, onion, mushroom, carrot, snap pea, cilantro, scallion" },
      { name: "Ginger Rice Soup (V avail.)", thai: "โจ๊กขิง",       price: "$7 cup / $13 bowl",  desc: "Jasmine rice, fresh ginger, scallion, cilantro, crispy garlic oil" },
      { name: "Chicken Noodle Soup",      thai: "ก๋วยเตี๋ยวไก่",    price: "$18",                desc: "Rice noodles, carrot, scallion, bean sprouts, Asian greens, cabbage, crispy garlic, crushed peanuts, cilantro" },
      { name: "Clear Soup",               thai: "แกงจืด",           price: "$8 / $15",           desc: "Choice of meat, broccoli, carrot, mushrooms and Asian greens, topped with cilantro, scallions, and garlic oil" },
      { name: "Thai Street Noodle Soup",  thai: "ก๋วยเตี๋ยวเส้นใส", price: "$18",                desc: "Clear noodles, sprouts, Asian greens, cabbage, carrot, basil, scallion, cilantro, peanuts, crispy garlic oil with lime" },
      { name: "Ba Mee Noodles (GF avail.)", thai: "บะหมี่",          price: "$18",                desc: "Egg noodles with Asian greens, cabbage, sprouts, carrot, crushed peanuts, scallion, cilantro, brown sauce, garlic oil" },
      { name: "Yen Ta Fo Pink Noodle Soup", thai: "เย็นตาโฟ",        price: "$18",                desc: "Wide rice noodles in red tofu and bean paste broth with sprouts, Asian greens, cabbage, carrot, scallion, cilantro, crushed peanuts, crispy garlic oil, and lime" },
    ],
  },
  {
    name: "Noodle Dishes",
    thai: "เมนูก๋วยเตี๋ยว",
    note: "Vegan and GF available",
    items: [
      { name: "Thai Pearl Pad Thai",      thai: "ผัดไทย",        price: "$17", desc: "Stir-fried rice noodles in our old-school Pad Thai sauce with egg, onion, scallion, cabbage, bean sprouts, crushed peanuts" },
      { name: "Drunken Noodles Issan",    thai: "ผัดขี้เมา",     price: "$20", desc: "Stir-fried egg noodles (or GF rice noodles) in Thai basil sauce with onion, bell pepper, garlic, carrot, peppercorn, snap pea, mushroom, broccoli, and Thai basil" },
      { name: "Pad See-Ew",               thai: "ผัดซีอิ๊ว",     price: "$18", desc: "Wide rice noodles stir-fried in sweet black soy sauce with egg, onion, carrot, cabbage, broccoli, and Asian greens" },
      { name: "Pad Woon-Sen Noodles",     thai: "ผัดวุ้นเส้น",   price: "$19", desc: "Clear bean thread noodles stir-fried in brown sauce with egg, onion, garlic, tomato, snap pea, bell pepper, carrot, mushroom, broccoli, cabbage, scallion" },
    ],
  },
  {
    name: "Stir Frys with Jasmine Rice",
    thai: "ผัดกับข้าวหอมมะลิ",
    note: "GF available",
    items: [
      { name: "Eggplant Basil",           thai: "ผัดมะเขือกะเพรา",    price: "$21", desc: "Japanese eggplant, carrot, mushroom, onion, garlic, snap pea, bell pepper, Thai basil in basil sauce" },
      { name: "Thai Style Fresh Basil",   thai: "ผัดกะเพรา",          price: "$20", desc: "Onion, garlic, snap pea, carrot, sweet bell pepper, and Thai basil in basil sauce" },
      { name: "Pad Khing 'Fresh Ginger'", thai: "ผัดขิง",             price: "$19", desc: "Fresh ginger root with onion, bell pepper, snap pea, carrot, mushroom, scallion, broccoli, and cabbage" },
      { name: "Pineapple Fried Rice",     thai: "ข้าวผัดสับปะรด",     price: "$19", desc: "Stir-fried Jasmine rice with pineapple, egg, onion, carrot, tomato, and scallion" },
      { name: "Mixed Vegetable",          thai: "ผัดผักรวม",          price: "$19", desc: "Broccoli, carrot, mushroom, snap pea, bean sprout, cabbage, and Asian greens in brown sauce" },
      { name: "Thai Fried Rice",          thai: "ข้าวผัด",            price: "$18", desc: "Stir-fried Jasmine rice with egg, garlic, onion, tomato, carrot, Asian green, scallion" },
      { name: "Broccoli and Meat",        thai: "ผัดบร็อคโคลี่",      price: "$18", desc: "Your choice of protein stir-fried with sweet onion and broccoli in brown sauce, topped with garlic" },
    ],
  },
  {
    name: "Chef Specials",
    thai: "เมนูพิเศษของเชฟ",
    note: null,
    items: [
      { name: "Pad Ped 'Spicy Stir Fry'",    thai: "ผัดเผ็ด",                  price: "$28", desc: "Shrimp and Pork with Japanese eggplant, carrot, mushroom, snap pea, bell pepper, bamboo, and peppercorn in red curry paste sauce with Jasmine rice" },
      { name: "Secret Wife Stir Fry",         thai: "ผัดเมียลับ",               price: "$26", desc: "Your choice of protein with lemongrass, kaffir lime leaf, Thai basil, carrot, mushroom, onion, bell pepper, snap pea, and yellow curry powder in brown sauce with Jasmine rice" },
      { name: "Seafood Basil Fried Rice",     thai: "ข้าวผัดกะเพราทะเล",       price: "$28", desc: "Stir-fried Jasmine rice with shrimp, mussels, calamari, Thai basil, egg, broccoli, carrot, mushroom, and onion in basil sauce" },
      { name: "Wild Ginger Curry Noodles",    thai: "ก๋วยเตี๋ยวแกงขิง",        price: "$28", desc: "Your choice of protein stir-fried with aromatics, broccoli, Asian greens, bell peppers, and green beans with wide noodles, finished with green curry and topped with bean sprouts and basil" },
      { name: "Thai Pearl Cashew Nut Stir Fry", thai: "ผัดเม็ดมะม่วงหิมพานต์", price: "$27", desc: "Your choice of protein stir-fried with garlic, onions, pineapple, carrots, mushrooms, bell peppers, broccoli, and cashew nuts" },
    ],
  },
  {
    name: "Curries",
    thai: "แกงกะทิ",
    note: "Served with Jasmine Rice. All curries start at level 1 / naturally spicy",
    items: [
      { name: "Red Curry",        thai: "แกงแดง",        price: "$23", desc: "Coconut milk with dry chili paste, peppercorn, mushroom, bell pepper, bamboo shoots, carrot, onion, broccoli, snap pea, and Thai basil" },
      { name: "Green Curry",      thai: "แกงเขียวหวาน",  price: "$22", desc: "Our famous curry with chili paste, coconut milk, onion, Japanese eggplant, carrot, broccoli, bell pepper, mushroom, snap pea, and Thai basil" },
      { name: "Pineapple Curry",  thai: "แกงสับปะรด",    price: "$23", desc: "Sweet red curry with coconut milk, pineapple, mushroom, snap pea, tomato, carrot, bell pepper, onion, broccoli, and Thai basil" },
      { name: "Vegan Curry",      thai: "แกงเจ",          price: "$20", desc: "Curry of the day with onion, Thai herbs, chili paste, bell pepper, kaffir lime leaf, carrot, broccoli, Thai basil, mushroom, snap peas, and Asian greens" },
      { name: "Paneang Curry",    thai: "พะแนง",          price: "$21", desc: "A sweeter curry made with coconut milk, Thai herbs, chili paste, onion, bell pepper, kaffir lime leaf, carrot, broccoli, Thai basil, mushroom, snap pea, topped with crushed peanuts" },
      { name: "Massaman Curry",   thai: "มัสมั่น",         price: "$20", desc: "Curry of tamarind, cumin, turmeric, and coconut milk with carrots, onion, and potato, topped with crushed peanuts and crispy onion" },
    ],
  },
  {
    name: "Kids Menu",
    thai: "เมนูเด็ก",
    note: null,
    items: [
      { name: "Kids Noodles",    thai: "ก๋วยเตี๋ยวเด็ก", price: "$10", desc: "Chicken, onion, egg, broccoli, and carrot" },
      { name: "Kids Fried Rice", thai: "ข้าวผัดเด็ก",    price: "$10", desc: "Chicken, onion, egg, broccoli, and carrot" },
    ],
  },
  {
    name: "Sides",
    thai: "เครื่องเคียง",
    note: null,
    items: [
      { name: "White Rice",          thai: "ข้าวเปล่า",     price: "$3",    desc: null },
      { name: "Fried Rice",          thai: "ข้าวผัด",       price: "$6",    desc: null },
      { name: "Noodles",             thai: "เส้น",           price: "$3",    desc: "Rice, wide rice, egg, or clear noodles" },
      { name: "Soup Broth",          thai: "น้ำซุป",         price: "$4",    desc: "Chicken or Vegetable" },
      { name: "Thai Fried Egg",      thai: "ไข่ดาว",         price: "$3",    desc: null },
      { name: "Extra Curry Sauce",   thai: "ซอสแกงเพิ่ม",   price: "$7",    desc: "Green, Red, Paneang, Massaman, or Vegan" },
      { name: "Sauces",              thai: "ซอส",            price: "$1.50", desc: "Sweet Chili, Hoisin, Sriracha mayo, or Peanut Satay" },
    ],
  },
];

const spiceLevels = [
  { en: "1 — Mild",        thai: "เผ็ดน้อย" },
  { en: "2 — Medium",      thai: "เผ็ดกลาง" },
  { en: "3 — Hot!",        thai: "เผ็ด!" },
  { en: "4 — Very Hot!!",  thai: "เผ็ดมาก!!" },
  { en: "5 — Thai Hot!!!", thai: "เผ็ดไทยแท้!!!" },
];

export default function MenuPage() {
  return (
    <div className="bg-[#FDF7EC] min-h-screen font-sans selection:bg-[#C4281A] selection:text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={menuBgImg} alt="Thai Pearl Menu" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180E06]/75 via-[#180E06]/50 to-[#FDF7EC]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <p className="font-sans text-[#E8920E] text-[10px] tracking-[0.4em] uppercase font-semibold mb-1">Thai Pearl</p>
          <p className="font-serif text-[#E8920E]/50 text-base tracking-widest mb-4" style={{ fontWeight: 400 }}>ไทยเพิร์ล</p>
          <h1 className="font-serif text-white leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 500 }}>
            Our Menu
          </h1>
          <p className="font-serif text-white/30 mt-2" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 400 }}>
            เมนูอาหาร
          </p>
        </div>
      </div>

      {/* Ordering note */}
      <div className="bg-[#180E06] thai-pattern-dark py-5 px-8 text-center">
        <p className="font-sans text-white/55 text-sm">
          <span className="text-[#E8920E] font-semibold">Protein add-ons:</span>
          {" "}Chicken / Pork / Tofu / Veggies +$5 &nbsp;|&nbsp; Beef / Shrimp +$6 &nbsp;|&nbsp; Mussels / Calamari +$4
          &nbsp;&nbsp;
          <span className="text-[#E8920E] font-semibold">Spice:</span>
          {" "}1 Mild → 5 Thai Hot
        </p>
      </div>

      {/* Menu categories */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-5xl">
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* Category header */}
            <div className="mb-4 pb-3 border-b-2 border-[#180E06]">
              <div className="flex items-baseline gap-4 flex-wrap">
                <h2 className="font-serif text-[#180E06] leading-none" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 500 }}>
                  {cat.name}
                </h2>
                <span className="font-serif text-[#C4281A]/45 leading-none" style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: 400 }}>
                  {cat.thai}
                </span>
              </div>
              {cat.note && <p className="font-sans text-[#8A7060] text-xs mt-2">{cat.note}</p>}
            </div>

            {/* Items */}
            <div className="divide-y divide-[#E8DCC8]">
              {cat.items.map((item, ii) => (
                <div key={ii} className="py-4 flex items-start justify-between gap-6">
                  <div className="flex-1">
                    {/* Name + Thai inline */}
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <p className="font-sans font-semibold text-[#180E06] text-base leading-snug">
                        {item.name}
                      </p>
                      <p className="font-serif text-[#C4281A]/50 text-sm leading-none" style={{ fontWeight: 400 }}>
                        {item.thai}
                      </p>
                    </div>
                    {item.desc && (
                      <p className="font-sans text-[#7A6A60] text-sm mt-1 leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  <p className="font-serif text-[#C4281A] flex-shrink-0 mt-0.5" style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Spice levels */}
        <div className="mt-4 mb-16 bg-[#180E06] thai-pattern-dark p-8 md:p-10">
          <div className="flex items-baseline gap-3 mb-5">
            <p className="font-sans text-[#E8920E] text-[10px] tracking-[0.3em] uppercase font-semibold">Spice Levels</p>
            <p className="font-serif text-[#E8920E]/40 text-sm" style={{ fontWeight: 400 }}>ระดับความเผ็ด</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {spiceLevels.map((s, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-sans text-white/70 text-sm">{s.en}</span>
                <span className="font-serif text-[#E8920E]/45 text-sm" style={{ fontWeight: 400 }}>{s.thai}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order CTA */}
        <div className="text-center pb-8">
          <p className="font-sans text-[#8A7060] text-sm mb-1">Ready to order?</p>
          <p className="font-serif text-[#8A7060]/55 text-base mb-6" style={{ fontWeight: 400 }}>พร้อมสั่งแล้วหรือยัง</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.grubhub.com/search?locationQuery=747+Haywood+Rd+Asheville+NC&queryText=Thai+Pearl"
              target="_blank" rel="noopener noreferrer"
              className="bg-[#C4281A] hover:bg-[#a42016] text-white px-10 py-4 font-sans font-bold text-[11px] tracking-[0.25em] uppercase transition-colors text-center"
            >
              Order Delivery
            </a>
            <a
              href="https://thaipearlasheville.com/reservations"
              target="_blank" rel="noopener noreferrer"
              className="border border-[#180E06]/40 hover:border-[#180E06] text-[#180E06] px-10 py-4 font-sans text-[11px] tracking-[0.22em] uppercase transition-colors text-center"
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
