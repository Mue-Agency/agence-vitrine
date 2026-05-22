"use client";

import { motion } from "framer-motion";

interface Props {
  index: number;
  name: string;
  role: string;
  linkedin: string;
  initials: string;
}

export default function TeamCard({ index, name, role, linkedin, initials }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass rounded-3xl p-6 flex flex-col items-center text-center group hover:bg-white/10 hover:glow-lime transition-all"
    >
      <div className="relative">
        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-mue-dark-green to-mue-lime/40 flex items-center justify-center font-display font-bold text-3xl text-mue-light border border-white/20">
          {initials}
        </div>
        <div className="absolute -inset-1 rounded-full bg-mue-lime/0 group-hover:bg-mue-lime/20 blur-xl transition-all -z-10" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold">{name}</h3>
      <p className="text-sm text-mue-lime/80 mt-1">{role}</p>
      <a
        href={linkedin}
        aria-label={`LinkedIn ${name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 h-9 w-9 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-mue-lime hover:bg-white/15 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </motion.div>
  );
}
