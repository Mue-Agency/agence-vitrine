"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, FlaskConical, RefreshCw, HandHeart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services = [
  {
    step: "01 — Identifier",
    title: "Identifier",
    description: "On détecte les problèmes qui comptent vraiment, en immersion avec vos équipes.",
    Icon: Search,
  },
  {
    step: "02 — Créer",
    title: "Créer",
    description: "On conçoit la solution sur-mesure, sobre, utile, alignée avec votre culture.",
    Icon: Sparkles,
  },
  {
    step: "03 — Tester",
    title: "Tester",
    description: "On valide sur le terrain. Prototypes, retours utilisateurs, ajustements rapides.",
    Icon: FlaskConical,
  },
  {
    step: "04 — Itérer",
    title: "Itérer",
    description: "On affine jusqu'à ce que ça tienne. Chaque boucle rapproche de la solution juste.",
    Icon: RefreshCw,
  },
  {
    step: "05 — Transmettre",
    title: "Transmettre",
    description: "On vous la confie. La suite vous appartient.",
    Icon: HandHeart,
  },
];

// Dupliquer pour le loop infini
const duplicated = [...services, ...services];

function Card({ step, title, description, Icon }: { step: string; title: string; description: string; Icon: LucideIcon }) {
  return (
    <div className="glass rounded-3xl p-8 flex flex-col gap-6 group hover:bg-white/10 transition-colors w-[320px] shrink-0">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.25em] text-mue-lime">{step}</span>
        <div className="h-12 w-12 rounded-2xl bg-mue-lime/10 border border-mue-lime/30 flex items-center justify-center text-mue-lime group-hover:bg-mue-lime group-hover:text-mue-black transition-colors">
          <Icon size={22} />
        </div>
      </div>
      <h3 className="font-display text-3xl font-bold">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-mue-lime">Notre méthode</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[0.95]">
            Notre cycle.
          </h2>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl">
            Cinq temps, comme une mue. Une boucle qui se reproduit à chaque transformation.
          </p>
        </motion.div>
      </div>

      {/* Carrousel auto-défilant */}
      <div
        className="relative max-w-5xl mx-auto"
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "running";
        }}
      >
        {/* Fade gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-mue-black to-transparent" />
        {/* Fade droite */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-mue-black to-transparent" />

        <div className="overflow-hidden px-6">
          <div
            ref={trackRef}
            className="flex gap-6 w-max"
            style={{
              animation: "carousel-scroll 30s linear infinite",
            }}
          >
            {duplicated.map((s, i) => (
              <Card key={i} {...s} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
