import Image from "next/image";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#produits", label: "Produits" },
  { href: "#equipe", label: "Équipe" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-16">
      <div className="max-w-6xl mx-auto glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Mue" width={40} height={40} />
          <div>
            <div className="font-display font-bold text-lg">Agence Mue</div>
            <div className="text-sm text-mue-lime/80 italic">La suite vous appartient.</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-mue-lime transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-xs text-foreground/40">© 2026 Agence Mue</div>
      </div>
    </footer>
  );
}
