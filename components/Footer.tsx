import Image from "next/image";

const navLinks = [
  { label: "NOS ENTREPRISES", href: "#projets" },
  { label: "MÉTHODE", href: "#fonctionnement" },
  { label: "ÉQUIPE", href: "#equipe" },
  { label: "CONTACT", href: "#contact" },
];

const socialLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "LINKEDIN", href: "#" },
  { label: "EMAIL", href: "mailto:hello@agencemue.fr" },
];

const linkStyle = {
  fontFamily: "'Satoshi', sans-serif",
  fontSize: "clamp(14px, 1.5vw, 18px)",
  color: "#044105",
  textDecoration: "none",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  lineHeight: "normal",
};

const headingStyle = {
  ...linkStyle,
  color: "rgba(4,65,5,0.7)",
};

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 px-6 md:px-[89px] py-[80px] xl:py-[100px]"
      style={{ background: "#edf4ed", borderTop: "0.5px solid #044105" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="relative shrink-0" style={{ width: 44, height: 52 }}>
          <Image src="/Subtract.svg" alt="MUE" fill style={{ objectFit: "contain" }} />
        </div>
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: "'Aukera', 'Satoshi', sans-serif",
              fontSize: "clamp(24px, 3vw, 37px)",
              color: "#044105",
              letterSpacing: "3.69px",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            mue
          </span>
          <span
            style={{
              fontFamily: "'Aukera', 'Satoshi', sans-serif",
              fontSize: "clamp(8px, 1vw, 12.3px)",
              color: "#044105",
              letterSpacing: "clamp(6px, 1.5vw, 14.5px)",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            agency
          </span>
        </div>
      </div>

      {/* Nav columns */}
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-[120px] xl:gap-[280px]">
        {/* Page links */}
        <div className="flex flex-col gap-6">
          <span style={headingStyle}>Pages</span>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} style={linkStyle}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Social links */}
        <div className="flex flex-col gap-6">
          <span style={headingStyle}>Social media</span>
          {socialLinks.map((l) => (
            <a key={l.label} href={l.href} style={linkStyle}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
