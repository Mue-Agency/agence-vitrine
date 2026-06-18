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
      {/* <Marquee /> */}
      {/* <Manifeste /> */}
      <Services />
      {/* <Products /> */}
      <Team />
      <Contact />
    </main>
  );
}
