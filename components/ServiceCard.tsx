"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  index: number;
  step: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export default function ServiceCard({ index, step, title, description, Icon }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      className="glass rounded-3xl p-8 flex flex-col gap-6 group hover:bg-white/10 transition-colors"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.25em] text-mue-lime">{step}</span>
        <div className="h-12 w-12 rounded-2xl bg-mue-lime/10 border border-mue-lime/30 flex items-center justify-center text-mue-lime group-hover:bg-mue-lime group-hover:text-mue-black transition-colors">
          <Icon size={22} />
        </div>
      </div>
      <h3 className="font-display text-3xl font-bold">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </motion.div>
  );
}
