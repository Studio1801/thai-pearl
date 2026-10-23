import exterior from "@assets/thai-pearl/exterior.png";
import { GOOGLE_REVIEWS_URL, PRESS, REVIEWS } from "@/lib/content";
import { Page, Reveal } from "@/components/page";

export default function PressPage() {
  return (
    <Page
      kicker="Press and reviews"
      thai="รีวิว"
      image={exterior}
      title={<>What people are saying</>}
      intro={<>Chef May trained at the Royal Palace in Bangkok, opened BoonChoo Thai Express in Flat Rock in 2017, and brought Thai Pearl to Haywood Road in March 2020.</>}
    >
      <section>
        <h2 className="font-serif text-3xl" style={{ fontWeight: 500 }}>From our guests</h2>
        <p className="font-sans text-sm text-[#8A7060] mt-1.5">Five-star reviews on Google</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06} className="lift surface p-7">
              <p className="text-[#E8920E] tracking-[0.2em] text-sm" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              <p className="font-serif text-2xl leading-snug mt-3" style={{ fontWeight: 500 }}>&ldquo;{r.quote}&rdquo;</p>
              <p className="font-sans text-sm mt-4">
                <span className="font-semibold">{r.name}</span>
                {r.about && <span className="text-[#8A7060]">, {r.about.toLowerCase()}</span>}
              </p>
            </Reveal>
          ))}
        </div>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-sm font-semibold mt-6 underline underline-offset-4 decoration-[#180E06]/25 min-h-[44px] pt-2">
          Read every review on Google
        </a>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl" style={{ fontWeight: 500 }}>In the press</h2>
        <div className="mt-6 surface px-6 md:px-8 divide-y divide-[#180E06]/8">
          {PRESS.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-6 py-6">
              <div>
                <p className="font-sans text-sm text-[#C4281A] font-semibold">
                  {p.outlet} <span className="text-[#8A7060] font-normal">{p.year}</span>
                </p>
                <p className="font-serif text-xl md:text-2xl leading-snug mt-1 group-hover:text-[#C4281A] transition-colors" style={{ fontWeight: 500 }}>
                  {p.title}
                </p>
              </div>
              <span className="font-sans text-sm text-[#8A7060] mt-1 flex-shrink-0">Read</span>
            </a>
          ))}
        </div>
      </section>
    </Page>
  );
}
