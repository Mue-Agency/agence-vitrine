import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifeste from "@/components/Manifeste";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import TornDivider from "@/components/TornDivider";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <Marquee />
      <TornDivider variant={1} fromBlack={false} />
      <Manifeste />
      <TornDivider variant={2} fromBlack={true} />
      <Services />
      <TornDivider variant={3} fromBlack={false} />
      <Products />
      <TornDivider variant={4} fromBlack={true} />
      <Team />
      <TornDivider variant={5} fromBlack={false} />
      <Contact />
    </main>
  );
}
