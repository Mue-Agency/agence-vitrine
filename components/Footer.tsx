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
    <footer
      className="section-black px-6 md:px-20 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      style={{ borderTop: "1px solid rgba(245,245,238,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="Mue" width={28} height={28} />
        <span
          className="font-display font-bold text-sm"
          style={{ color: "rgba(245,245,238,0.7)" }}
        >
          Agence Mue
        </span>
      </div>
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "rgba(245,245,238,0.28)" }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="transition-colors hover:text-mue-lime"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <p className="text-xs" style={{ color: "rgba(245,245,238,0.18)" }}>
        © 2026 Agence Mue
      </p>
    </footer>
  );
}
