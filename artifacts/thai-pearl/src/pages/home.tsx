import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Story } from "@/components/story";
import { OrderNow } from "@/components/order-now";
import { MenuHighlights } from "@/components/menu-highlights";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StickyOrderBar } from "@/components/sticky-order-bar";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-[#C4281A] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <OrderNow />
        <MenuHighlights />
        <Contact />
      </main>
      <Footer />
      <StickyOrderBar />
    </div>
  );
}
