import { slug, type Category, type MenuItem, type Settings, type Size } from "./model";

// Starting content for the live site. Once the owner saves anything in the
// dashboard, the stored copy wins and this file is only a fallback.

type Extra = Partial<Pick<MenuItem, "sizes" | "protein">>;

const it = (name: string, thai: string, price: number, desc?: string, extra: Extra = {}): MenuItem => ({
  id: slug(name),
  name,
  thai,
  price,
  ...(desc ? { desc } : {}),
  ...extra,
});

const cupBowl = (cup: number, bowl: number): Size[] => [
  { label: "Cup", price: cup },
  { label: "Bowl", price: bowl },
];

const P = { protein: true } as const;

const menu: Category[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    thai: "เมนูเรียกน้ำย่อย",
    note: "Vegan and gluten-free options available",
    items: [
      it("Edamame (V)", "ถั่วแระญี่ปุ่น", 8, "Steamed whole soybeans with sea salt and garlic"),
      it("Fresh Rolls (2)", "โรลสด", 9, "Shrimp, cilantro, red onion, mint, romaine, cabbage, carrot, Thai basil in rice paper with hoisin and peanuts"),
      it("Thai Pearl Spring Rolls (3)", "ปอเปี๊ยะทอด", 9, "Fried spring rolls with Thai-seasoned minced chicken, mozzarella cheese, and sweet chili sauce"),
      it("Thai Fried Shrimp", "กุ้งทอด", 14, "Butter-fried jumbo shrimp marinated in Thai Pearl house sauce"),
      it("Thai Onion Rings (V avail.)", "หัวหอมทอดลาบ", 13, "Battered fried yellow onions seasoned with Thai larb seasoning, served with Sriracha mayo"),
      it("Thai Fries", "เฟรนช์ฟรายส์ไทย", 9, "Hand-cut fries tossed in chili lime seasoning with homemade spicy mayo"),
      it("Crispy Tofu with Sweet Chili (V)", "เต้าหู้กรอบ", 9, "Lightly breaded organic non-GMO tofu, fried and topped with sweet chili sauce, Thai basil, and crushed peanuts"),
      it("Grilled Chicken Satay (3)", "ไก่สะเต๊ะ", 14, "Chicken marinated in turmeric brown sauce, served with peanut sauce and cucumber salad"),
      it("Shrimp Rangoon (4)", "กุ้งราคูน", 9, "Shrimp mixed with cream cheese, wrapped in wonton skin, with sweet chili sauce"),
    ],
  },
  {
    id: "salads",
    name: "Thai Salads",
    thai: "สลัดไทย",
    note: "Served on romaine lettuce",
    items: [
      it("Thai Pearl House Salad (V avail.)", "สลัดบ้าน", 9, "Romaine, cabbage, carrot, tomato, red onion, bean sprout, peanut, Thai basil, scallion, cilantro, mint, chili-lime dressing"),
      it("Green Papaya Salad (V avail.)", "ส้มตำ", 14, "Shredded unripe papaya, carrot, fresh garlic, tomato, crushed peanuts with Thai chili-lime-fish sauce dressing", {
        sizes: [
          { label: "Classic", price: 14 },
          { label: "E-San style", price: 15 },
        ],
      }),
      it("Larb Salad", "ลาบไก่", 15, "Minced chicken with Thai seasoning, roasted rice, red onion, Thai basil, mint, scallion, cilantro with lime and fish sauce dressing"),
      it("Clear Noodle Salad", "ยำวุ้นเส้น", 16, "Minced chicken with clear mung bean noodles, red onion, tomato, carrot, cilantro, peanuts with sweet chili and lime dressing"),
      it("Grilled Beef Salad", "ยำเนื้อย่าง", 17, "Grilled marinated beef strips with lettuce, cabbage, carrot, tomato, red onion, bean sprout, Thai basil, mint, chili-lime dressing"),
    ],
  },
  {
    id: "soups",
    name: "Soups and Noodle Soups",
    thai: "ซุปและก๋วยเตี๋ยวน้ำ",
    note: "All soups handmade to order, GF unless noted",
    items: [
      it("Tom Yum", "ต้มยำ", 8, "Tomato, galangal, lemongrass, kaffir lime leaf, mushroom, carrot, snap pea, onion, cilantro, scallion", { sizes: cupBowl(8, 15) }),
      it("Tom Kha", "ต้มข่า", 9, "Coconut milk, galangal, kaffir lime leaf, lemongrass, onion, mushroom, carrot, snap pea, cilantro, scallion", { sizes: cupBowl(9, 16) }),
      it("Ginger Rice Soup (V avail.)", "โจ๊กขิง", 7, "Jasmine rice, fresh ginger, scallion, cilantro, crispy garlic oil", { sizes: cupBowl(7, 13) }),
      it("Chicken Noodle Soup", "ก๋วยเตี๋ยวไก่", 18, "Rice noodles, carrot, scallion, bean sprouts, Asian greens, cabbage, crispy garlic, crushed peanuts, cilantro"),
      it("Clear Soup", "แกงจืด", 8, "Choice of meat, broccoli, carrot, mushrooms and Asian greens, topped with cilantro, scallions, and garlic oil", { sizes: cupBowl(8, 15), protein: true }),
      it("Thai Street Noodle Soup", "ก๋วยเตี๋ยวเส้นใส", 18, "Clear noodles, sprouts, Asian greens, cabbage, carrot, basil, scallion, cilantro, peanuts, crispy garlic oil with lime"),
      it("Ba Mee Noodles (GF avail.)", "บะหมี่", 18, "Egg noodles with Asian greens, cabbage, sprouts, carrot, crushed peanuts, scallion, cilantro, brown sauce, garlic oil"),
      it("Yen Ta Fo Pink Noodle Soup", "เย็นตาโฟ", 18, "Wide rice noodles in red tofu and bean paste broth with sprouts, Asian greens, cabbage, carrot, scallion, cilantro, crushed peanuts, crispy garlic oil, and lime"),
    ],
  },
  {
    id: "noodles",
    name: "Noodle Dishes",
    thai: "เมนูก๋วยเตี๋ยว",
    note: "Vegan and GF available",
    items: [
      it("Thai Pearl Pad Thai", "ผัดไทย", 17, "Stir-fried rice noodles in our old-school Pad Thai sauce with egg, onion, scallion, cabbage, bean sprouts, crushed peanuts", P),
      it("Drunken Noodles Issan", "ผัดขี้เมา", 20, "Stir-fried egg noodles (or GF rice noodles) in Thai basil sauce with onion, bell pepper, garlic, carrot, peppercorn, snap pea, mushroom, broccoli, and Thai basil", P),
      it("Pad See-Ew", "ผัดซีอิ๊ว", 18, "Wide rice noodles stir-fried in sweet black soy sauce with egg, onion, carrot, cabbage, broccoli, and Asian greens", P),
      it("Pad Woon-Sen Noodles", "ผัดวุ้นเส้น", 19, "Clear bean thread noodles stir-fried in brown sauce with egg, onion, garlic, tomato, snap pea, bell pepper, carrot, mushroom, broccoli, cabbage, scallion", P),
    ],
  },
  {
    id: "stir-fry",
    name: "Stir Frys with Jasmine Rice",
    thai: "ผัดกับข้าวหอมมะลิ",
    note: "GF available",
    items: [
      it("Eggplant Basil", "ผัดมะเขือกะเพรา", 21, "Japanese eggplant, carrot, mushroom, onion, garlic, snap pea, bell pepper, Thai basil in basil sauce", P),
      it("Thai Style Fresh Basil", "ผัดกะเพรา", 20, "Onion, garlic, snap pea, carrot, sweet bell pepper, and Thai basil in basil sauce", P),
      it("Pad Khing 'Fresh Ginger'", "ผัดขิง", 19, "Fresh ginger root with onion, bell pepper, snap pea, carrot, mushroom, scallion, broccoli, and cabbage", P),
      it("Pineapple Fried Rice", "ข้าวผัดสับปะรด", 19, "Stir-fried Jasmine rice with pineapple, egg, onion, carrot, tomato, and scallion", P),
      it("Mixed Vegetable", "ผัดผักรวม", 19, "Broccoli, carrot, mushroom, snap pea, bean sprout, cabbage, and Asian greens in brown sauce", P),
      it("Thai Fried Rice", "ข้าวผัด", 18, "Stir-fried Jasmine rice with egg, garlic, onion, tomato, carrot, Asian green, scallion", P),
      it("Broccoli and Meat", "ผัดบร็อคโคลี่", 18, "Your choice of protein stir-fried with sweet onion and broccoli in brown sauce, topped with garlic", P),
    ],
  },
  {
    id: "chef-specials",
    name: "Chef Specials",
    thai: "เมนูพิเศษของเชฟ",
    items: [
      it("Pad Ped 'Spicy Stir Fry'", "ผัดเผ็ด", 28, "Shrimp and Pork with Japanese eggplant, carrot, mushroom, snap pea, bell pepper, bamboo, and peppercorn in red curry paste sauce with Jasmine rice"),
      it("Secret Wife Stir Fry", "ผัดเมียลับ", 26, "Your choice of protein with lemongrass, kaffir lime leaf, Thai basil, carrot, mushroom, onion, bell pepper, snap pea, and yellow curry powder in brown sauce with Jasmine rice", P),
      it("Seafood Basil Fried Rice", "ข้าวผัดกะเพราทะเล", 28, "Stir-fried Jasmine rice with shrimp, mussels, calamari, Thai basil, egg, broccoli, carrot, mushroom, and onion in basil sauce"),
      it("Wild Ginger Curry Noodles", "ก๋วยเตี๋ยวแกงขิง", 28, "Your choice of protein stir-fried with aromatics, broccoli, Asian greens, bell peppers, and green beans with wide noodles, finished with green curry and topped with bean sprouts and basil", P),
      it("Thai Pearl Cashew Nut Stir Fry", "ผัดเม็ดมะม่วงหิมพานต์", 27, "Your choice of protein stir-fried with garlic, onions, pineapple, carrots, mushrooms, bell peppers, broccoli, and cashew nuts", P),
    ],
  },
  {
    id: "curries",
    name: "Curries",
    thai: "แกงกะทิ",
    note: "Served with Jasmine Rice. All curries start at level 1, naturally spicy",
    items: [
      it("Red Curry", "แกงแดง", 23, "Coconut milk with dry chili paste, peppercorn, mushroom, bell pepper, bamboo shoots, carrot, onion, broccoli, snap pea, and Thai basil", P),
      it("Green Curry", "แกงเขียวหวาน", 22, "Our famous curry with chili paste, coconut milk, onion, Japanese eggplant, carrot, broccoli, bell pepper, mushroom, snap pea, and Thai basil", P),
      it("Pineapple Curry", "แกงสับปะรด", 23, "Sweet red curry with coconut milk, pineapple, mushroom, snap pea, tomato, carrot, bell pepper, onion, broccoli, and Thai basil", P),
      it("Vegan Curry", "แกงเจ", 20, "Curry of the day with onion, Thai herbs, chili paste, bell pepper, kaffir lime leaf, carrot, broccoli, Thai basil, mushroom, snap peas, and Asian greens"),
      it("Paneang Curry", "พะแนง", 21, "A sweeter curry made with coconut milk, Thai herbs, chili paste, onion, bell pepper, kaffir lime leaf, carrot, broccoli, Thai basil, mushroom, snap pea, topped with crushed peanuts", P),
      it("Massaman Curry", "มัสมั่น", 20, "Curry of tamarind, cumin, turmeric, and coconut milk with carrots, onion, and potato, topped with crushed peanuts and crispy onion", P),
    ],
  },
  {
    id: "kids",
    name: "Kids Menu",
    thai: "เมนูเด็ก",
    items: [
      it("Kids Noodles", "ก๋วยเตี๋ยวเด็ก", 10, "Chicken, onion, egg, broccoli, and carrot"),
      it("Kids Fried Rice", "ข้าวผัดเด็ก", 10, "Chicken, onion, egg, broccoli, and carrot"),
    ],
  },
  {
    id: "sides",
    name: "Sides",
    thai: "เครื่องเคียง",
    items: [
      it("White Rice", "ข้าวเปล่า", 3),
      it("Fried Rice", "ข้าวผัด", 6),
      it("Noodles", "เส้น", 3, "Rice, wide rice, egg, or clear noodles"),
      it("Soup Broth", "น้ำซุป", 4, "Chicken or Vegetable"),
      it("Thai Fried Egg", "ไข่ดาว", 3),
      it("Extra Curry Sauce", "ซอสแกงเพิ่ม", 7, "Green, Red, Paneang, Massaman, or Vegan"),
      it("Sauces", "ซอส", 1.5, "Sweet Chili, Hoisin, Sriracha mayo, or Peanut Satay"),
    ],
  },
];

// Hours as listed on thaipearlasheville.com: every day, 12 to 9 PM.
const daily = { closed: false, open: "12:00", close: "21:00" };

export const SEED: Settings = {
  updatedAt: "2026-10-21T00:00:00.000Z",
  phone: "(828) 412-5905",
  banner: { on: false, text: "" },
  ordering: { enabled: true, pausedUntil: null, prepMinutes: 20 },
  hours: [daily, daily, daily, daily, daily, daily, daily].map((d) => ({ ...d })),
  proteins: [
    { label: "Chicken", price: 5 },
    { label: "Pork", price: 5 },
    { label: "Tofu", price: 5 },
    { label: "Veggies", price: 5 },
    { label: "Beef", price: 6 },
    { label: "Shrimp", price: 6 },
  ],
  menu,
};

// Item ids must be unique for the dashboard and cart to work.
const seen = new Set<string>();
for (const c of menu)
  for (const i of c.items) {
    if (seen.has(i.id)) i.id = `${c.id}-${i.id}`;
    seen.add(i.id);
  }
