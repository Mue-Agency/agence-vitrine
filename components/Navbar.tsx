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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-20 py-5 flex items-center justify-between transition-all duration-300"
      style={{
        background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,245,238,0.07)" : "none",
      }}
    >
      <a href="#accueil" className="flex items-center gap-2.5 group" data-cursor>
        <Image
          src="/logo.svg"
          alt="Mue agency"
          width={32}
          height={32}
          className="transition-transform group-hover:rotate-12"
        />
        <span className="font-display font-bold text-base tracking-tight" style={{ color: "#F5F5EE" }}>
          Mue
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-4 py-2 text-sm transition-colors"
            style={{ color: "rgba(245,245,238,0.55)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5EE")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,238,0.55)")}
            data-cursor
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold transition-colors"
        style={{
          border: "1px solid #C6FF00",
          color: "#C6FF00",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#C6FF00";
          (e.currentTarget as HTMLElement).style.color = "#0D0D0D";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#C6FF00";
        }}
        data-cursor
      >
        Parlons-en
      </a>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2"
        style={{ color: "#F5F5EE" }}
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C6FF00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,238,0.75)")}
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
