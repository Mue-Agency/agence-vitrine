"use client";

import { useState } from "react";
import Image from "next/image";

const links = [
  { href: "#projets", label: "nos entreprises" },
  { href: "#fonctionnement", label: "méthode" },
  { href: "#equipe", label: "équipe" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{ height: 98, paddingLeft: 54, paddingRight: 32 }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-[10px]">
        <div className="relative shrink-0" style={{ width: 25.5, height: 29.8 }}>
          <Image
            src="/Subtract.svg"
            alt="MUE"
            fill
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: "'Aukera', 'Satoshi', sans-serif",
              fontSize: 18,
              color: "white",
              letterSpacing: "1.5px",
              lineHeight: 1.15,
            }}
          >
            mue
          </span>
          <span
            style={{
              fontFamily: "'Aukera', 'Satoshi', sans-serif",
              fontSize: 6,
              color: "white",
              letterSpacing: "6px",
              lineHeight: 1,
            }}
          >
            agency
          </span>
        </div>
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center" style={{ gap: 48 }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-white hover:text-[#b7f700] transition-colors"
            style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 14 }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="text-[#044105] font-semibold flex items-center px-4 hover:bg-[#c8ff1a] transition-colors"
          style={{
            background: "#b7f700",
            height: 32,
            fontSize: 14,
            fontFamily: "'Satoshi', sans-serif",
          }}
        >
          Contact
        </a>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span
          className="block w-6 h-0.5 bg-white transition-all"
          style={{ transform: open ? "translateY(8px) rotate(45deg)" : "none" }}
        />
        <span
          className="block w-6 h-0.5 bg-white transition-all"
          style={{ opacity: open ? 0 : 1 }}
        />
        <span
          className="block w-6 h-0.5 bg-white transition-all"
          style={{ transform: open ? "translateY(-8px) rotate(-45deg)" : "none" }}
        />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden absolute top-full left-0 right-0 flex flex-col py-6 px-8 gap-6"
          style={{ background: "#044105", borderTop: "1px solid rgba(183,247,0,0.2)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white text-base hover:text-[#b7f700] transition-colors"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center h-10 px-6 text-[#044105] font-semibold text-sm"
            style={{ background: "#b7f700", fontFamily: "'Satoshi', sans-serif" }}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
