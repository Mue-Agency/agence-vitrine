"use client";

import { motion } from "framer-motion";
import TeamCard from "./TeamCard";

const team = [
  { name: "Membre 1", role: "Direction & Stratégie", initials: "M1", linkedin: "#" },
  { name: "Membre 2", role: "Design & Produit", initials: "M2", linkedin: "#" },
  { name: "Membre 3", role: "Tech & Développement", initials: "M3", linkedin: "#" },
  { name: "Membre 4", role: "Terrain & Relations", initials: "M4", linkedin: "#" },
  { name: "Membre 5", role: "Rôle 5", initials: "M5", linkedin: "#" },
  { name: "Membre 6", role: "Rôle 6", initials: "M6", linkedin: "#" },
  { name: "Membre 7", role: "Rôle 7", initials: "M7", linkedin: "#" },
  { name: "Membre 8", role: "Rôle 8", initials: "M8", linkedin: "#" },
];

export default function Team() {
  return (
    <section id="equipe" className="section-white relative py-32 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <span
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "rgba(13,13,13,0.4)" }}
          >
            Qui sommes-nous
          </span>
          <h2
            className="mt-4 font-display font-bold leading-[0.9]"
            style={{ fontSize: "clamp(3rem,8vw,8rem)", color: "#0D0D0D" }}
          >
            L&apos;équipe.
          </h2>
          <p className="mt-6 text-lg max-w-xl" style={{ color: "rgba(13,13,13,0.45)" }}>
            Huit profils complémentaires, une même obsession : transmettre.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12">
          {team.map((m, i) => (
            <TeamCard key={m.name} index={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
