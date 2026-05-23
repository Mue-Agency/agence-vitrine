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
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="group flex flex-col gap-4 py-8"
      style={{ borderBottom: "1px solid rgba(13,13,13,0.1)" }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Initiales */}
        <div
          className="h-14 w-14 rounded-full flex items-center justify-center font-display font-bold text-lg transition-all duration-300 group-hover:bg-mue-lime"
          style={{
            border: "1px solid rgba(13,13,13,0.2)",
            color: "#0D0D0D",
          }}
        >
          {initials}
        </div>

        {/* LinkedIn — apparaît au hover */}
        <a
          href={linkedin}
          aria-label={`LinkedIn ${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "rgba(13,13,13,0.4)" }}
          data-cursor
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>

      <div>
        <h3 className="font-display font-bold text-xl" style={{ color: "#0D0D0D" }}>
          {name}
        </h3>
        <p className="text-sm mt-0.5" style={{ color: "#C6FF00" }}>
          {role}
        </p>
      </div>
    </motion.div>
  );
}
