"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#produits", label: "Produits" },
  { href: "#equipe", label: "Équipe" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // isTop = true → on est sur le hero blanc → text sombre
  // isTop = false → on a scrollé → navbar frosted dark → text clair
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = isTop ? "rgba(13,13,13,0.7)" : "rgba(245,245,238,0.6)";
  const textHover = isTop ? "#0D0D0D" : "#F5F5EE";
  const ctaBorder = isTop ? "#0D0D0D" : "#C6FF00";
  const ctaColor = isTop ? "#0D0D0D" : "#C6FF00";
  const ctaBgHover = isTop ? "#0D0D0D" : "#C6FF00";
  const ctaColorHover = isTop ? "#F5F5EE" : "#0D0D0D";
  const logoColor = isTop ? "#0D0D0D" : "#F5F5EE";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-20 py-5 flex items-center justify-between transition-all duration-500"
      style={{
        background: isTop ? "transparent" : "rgba(13,13,13,0.92)",
        backdropFilter: isTop ? "none" : "blur(16px)",
        borderBottom: isTop ? "none" : "1px solid rgba(245,245,238,0.06)",
      }}
    >
      <a href="#accueil" className="flex items-center gap-2.5 group" data-cursor>
        <Image
          src="/logo.svg"
          alt="Mue agency"
          width={32}
          height={32}
          className="transition-transform group-hover:rotate-12"
          style={{ filter: isTop ? "invert(1)" : "none" }}
        />
        <span
          className="font-display font-bold text-base tracking-tight transition-colors duration-500"
          style={{ color: logoColor }}
        >
          Mue
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-4 py-2 text-sm transition-colors duration-300"
            style={{ color: textColor }}
            onMouseEnter={(e) => (e.currentTarget.style.color = textHover)}
            onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
            data-cursor
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold transition-all duration-300"
        style={{ border: `1px solid ${ctaBorder}`, color: ctaColor }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = ctaBgHover;
          el.style.color = ctaColorHover;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "transparent";
          el.style.color = ctaColor;
        }}
        data-cursor
      >
        Parlons-en
      </a>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 transition-colors duration-300"
        style={{ color: isTop ? "#0D0D0D" : "#F5F5EE" }}
        aria-label="Menu"
        data-cursor
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 p-4 md:hidden flex flex-col gap-1"
            style={{
              background: "#0D0D0D",
              border: "1px solid rgba(245,245,238,0.08)",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 transition-colors"
                style={{ color: "rgba(245,245,238,0.75)" }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
