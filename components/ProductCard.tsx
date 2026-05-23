"use client";

import { motion } from "framer-motion";

interface Props {
  index: number;
  name: string;
  description: string;
  badge?: string;
}

export default function ProductCard({ index, name, description, badge }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative p-10 flex flex-col gap-6 min-h-[320px] overflow-hidden"
      style={{ border: "1px solid rgba(198,255,0,0.25)" }}
    >
      {/* Fond hover inversion */}
      <div
        className="absolute inset-0 -z-10 transition-transform duration-500 ease-out group-hover:translate-y-0"
        style={{
          background: "#C6FF00",
          transform: "translateY(101%)",
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className="h-10 w-10 transition-colors duration-500"
          style={{ border: "1px solid rgba(198,255,0,0.4)" }}
        />
        {badge && (
          <span
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-500 group-hover:bg-exuvie-black group-hover:text-mue-lime"
            style={{ border: "1px solid #C6FF00", color: "#C6FF00" }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3
          className="font-display text-2xl md:text-3xl font-bold transition-colors duration-500 group-hover:text-exuvie-black"
          style={{ color: "#F5F5EE" }}
        >
          {name}
        </h3>
        <p
          className="mt-4 leading-relaxed transition-colors duration-500 group-hover:text-exuvie-black"
          style={{ color: "rgba(245,245,238,0.55)" }}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}
