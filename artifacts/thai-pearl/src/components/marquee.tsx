// Items alternate between English dish names and Thai script for cultural texture
const items = [
  { text: "Pad Thai", thai: false, gold: true },
  { text: "ผัดไทย", thai: true, gold: false },
  { text: "·", thai: false, gold: false },
  { text: "Drunken Noodles", thai: false, gold: false },
  { text: "ผัดขี้เมา", thai: true, gold: true },
  { text: "·", thai: false, gold: false },
  { text: "Tom Kha", thai: false, gold: true },
  { text: "ต้มข่า", thai: true, gold: false },
  { text: "·", thai: false, gold: false },
  { text: "Larb Salad", thai: false, gold: false },
  { text: "·", thai: false, gold: false },
  { text: "Green Curry", thai: false, gold: true },
  { text: "แกงเขียวหวาน", thai: true, gold: false },
  { text: "·", thai: false, gold: false },
  { text: "Wok Fire Every Night", thai: false, gold: false },
  { text: "·", thai: false, gold: false },
  { text: "Royal Palace Trained", thai: false, gold: true },
  { text: "·", thai: false, gold: false },
  { text: "West Asheville", thai: false, gold: false },
  { text: "เวสต์แอชวิลล์", thai: true, gold: true },
  { text: "·", thai: false, gold: false },
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-[#100907] border-y border-[#E8920E]/20 overflow-hidden py-3 select-none">
      <div className="marquee-track flex items-center gap-6 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item.text === "·"
                ? "text-[#E8920E]/30 text-xs"
                : item.thai
                ? `font-serif text-base ${item.gold ? "text-[#E8920E]/70" : "text-white/30"}`
                : `font-sans text-[13px] font-semibold ${
                    item.gold ? "text-[#E8920E]" : "text-white/40"
                  }`
            }
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
