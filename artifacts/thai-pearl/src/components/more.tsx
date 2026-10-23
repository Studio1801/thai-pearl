import { Link } from "wouter";
import wok from "@assets/thai-pearl/wok-fire.jpg";
import baskets from "@assets/thai-pearl/interior-baskets.png";
import interiorCat from "@assets/thai-pearl/interior-cat.png";
import { REVIEWS } from "@/lib/content";
import { useSite } from "@/lib/live";
import { Reveal } from "@/components/page";

/** Home page: the rest of what Thai Pearl does, plus what guests say. */
export function More() {
  const site = useSite();
  const special = site.specials?.[0];
  const tiles = [
    { href: "/meal-prep", img: wok, title: "Meal prep", body: "High protein meals, built your way, delivered three days a week. From $11 a meal." },
    { href: "/catering", img: baskets, title: "Catering and parties", body: "Up to 100 guests, picked up, delivered, or hosted here in the dining room." },
    {
      href: "/events",
      img: interiorCat,
      title: "Events and specials",
      body: special ? `${special.title}: ${special.detail}` : "Deals running now and the nights worth planning around.",
    },
  ];
  return (
    <section className="bg-[#FDF7EC] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-16">
        <Reveal>
          <h2 className="font-serif text-[#180E06] leading-[0.95]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", fontWeight: 500 }}>
            More than dinner.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {tiles.map((t, i) => (
            <Reveal key={t.href} delay={i * 0.08}>
              <Link href={t.href} className="lift group block bg-[#FFFDF8] rounded-[22px] overflow-hidden border border-[#180E06]/8 shadow-[0_18px_40px_-30px_rgba(24,14,6,0.5)] h-full">
                <div className="h-48 overflow-hidden">
                  <img src={t.img} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <p className="font-serif text-2xl text-[#180E06]" style={{ fontWeight: 500 }}>{t.title}</p>
                  <p className="font-sans text-sm text-[#5C4B3E] leading-relaxed mt-2">{t.body}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {REVIEWS.slice(0, 2).map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <p className="text-[#E8920E] tracking-[0.2em] text-sm" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <p className="font-serif text-[#180E06] text-3xl md:text-4xl leading-tight mt-3" style={{ fontWeight: 500 }}>&ldquo;{r.quote}&rdquo;</p>
              <p className="font-sans text-sm text-[#8A7060] mt-3">{r.name} on Google</p>
            </Reveal>
          ))}
        </div>
        <Link href="/press" className="inline-block font-sans text-sm font-semibold text-[#180E06] mt-8 underline underline-offset-4 decoration-[#180E06]/25 py-2">
          More reviews and press
        </Link>
      </div>
    </section>
  );
}
