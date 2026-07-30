import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { OrderNow } from "@/components/order-now";
import { Story } from "@/components/story";
import { MenuHighlights } from "@/components/menu-highlights";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StickyOrderBar } from "@/components/sticky-order-bar";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <OrderNow />
        <Story />
        <MenuHighlights />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <StickyOrderBar />
    </div>
  );
}
