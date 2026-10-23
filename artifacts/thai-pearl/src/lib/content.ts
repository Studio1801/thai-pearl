// Content carried over from thaipearlasheville.com so nothing they offer today is lost.

export const MEAL_PREP = {
  packs: [
    { meals: 3, price: 39 },
    { meals: 5, price: 59 },
    { meals: 10, price: 110 },
  ],
  proteins: ["Chicken", "Beef", "Shrimp", "Tofu"],
  veggies: ["Broccoli", "Green beans", "Mixed veggies"],
  bases: [
    { label: "Jasmine rice", add: 0 },
    { label: "Brown rice", add: 0 },
    { label: "Cauliflower rice", add: 0 },
    { label: "Quinoa", add: 2 },
  ],
  flavors: ["Thai basil", "Garlic pepper", "Chili lime", "Light teriyaki"],
  extraProtein: 3,
  /** 0 = Sunday */
  deliveryDays: [1, 3, 0],
  freeOver: 70,
};

export const PRESS = [
  {
    outlet: "Ashvegas",
    title: "Stu Helm's 2020 Food Fan Awards, Part 3: People, Places, People",
    year: "2020",
    url: "https://ashvegas.com/stu-helms-2020-food-fan-awards-pt-3-people-places-people/",
  },
  {
    outlet: "Mountain Xpress",
    title: "Newly opened and nearly opened restaurants took a COVID punch in March",
    year: "2020",
    url: "https://mountainx.com/food/newly-opened-and-nearly-opened-restaurants-took-a-covid-punch-in-march/",
  },
];

// Five-star Google reviews shown on their current site. Short quotes only.
export const REVIEWS = [
  { name: "Daniel H.", quote: "The best Thai food I've had in North Carolina.", about: "Fresh rolls, generous portions" },
  { name: "Victor F.", quote: "Hands down the best Thai I've ever had.", about: "" },
  { name: "Dan K.", quote: "The best Thai food we've ever had.", about: "Even the picky kids ate well" },
  { name: "Stephanie S.", quote: "Spectacular.", about: "On the crazy noodles with fried chicken" },
];

export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Thai+Pearl+747+Haywood+Rd+Asheville+NC";
