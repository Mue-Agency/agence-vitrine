"use client";

import { useState } from "react";
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

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[min(1200px,calc(100%-2rem))] -translate-x-1/2 glass rounded-2xl px-5 py-3 flex items-center justify-between"
    >
      <a href="#accueil" className="flex items-center gap-2.5 group">
        <Image
          src="/logo.svg"
          alt="Mue"
          width={36}
          height={36}
          className="transition-transform group-hover:rotate-12"
        />
        <span className="font-display font-bold text-lg tracking-tight">Mue</span>
      </a>

      <nav className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-4 py-2 text-sm text-foreground/80 hover:text-mue-lime rounded-lg transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-mue-lime text-mue-black text-sm font-semibold hover:scale-105 transition-transform"
      >
        Parlons-en
      </a>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-foreground"
        aria-label="Menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-3 glass-strong rounded-2xl p-4 md:hidden flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-white/5 text-foreground/90"
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
