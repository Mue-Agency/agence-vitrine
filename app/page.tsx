import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-mue-black text-foreground overflow-x-hidden">
      <Hero />
      <Services />
      <Products />
      <Team />
      <Contact />
    </main>
  );
}
