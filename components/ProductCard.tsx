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
      whileHover={{ y: -6 }}
      className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 hover:bg-white/10 hover:glow-lime transition-all min-h-[320px]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-mue-lime/30 to-mue-dark-green/30 border border-mue-lime/20" />
        {badge && (
          <span className="px-3 py-1 rounded-full bg-mue-lime text-mue-black text-xs font-semibold uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-2xl md:text-3xl font-bold">{name}</h3>
        <p className="mt-4 text-foreground/70 leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
}
