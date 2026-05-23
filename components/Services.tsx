"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, FlaskConical, RefreshCw, HandHeart } from "lucide-react";

const services = [
  { num: "01", title: "Identifier", description: "On détecte les problèmes qui comptent vraiment, en immersion avec vos équipes.", Icon: Search },
  { num: "02", title: "Créer", description: "On conçoit la solution sur-mesure, sobre, utile, alignée avec votre culture.", Icon: Sparkles },
  { num: "03", title: "Tester", description: "On valide sur le terrain. Prototypes, retours utilisateurs, ajustements rapides.", Icon: FlaskConical },
  { num: "04", title: "Itérer", description: "On affine jusqu'à ce que ça tienne. Chaque boucle rapproche de la solution juste.", Icon: RefreshCw },
  { num: "05", title: "Transmettre", description: "On vous la confie. La suite vous appartient.", Icon: HandHeart },
];

export default function Services() {
  return (
    <section id="services" className="section-white relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-20">
        {/* Header */}
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
            Notre méthode
          </span>
          <h2
            className="mt-4 font-display font-bold leading-[0.9]"
            style={{ fontSize: "clamp(3rem,8vw,8rem)", color: "#0D0D0D" }}
          >
            Notre cycle.
          </h2>
        </motion.div>

        {/* Liste éditoriale */}
        <div className="relative">
          {/* Fil vertical lime */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "#C6FF00" }}
          />

          <div className="flex flex-col">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative pl-12 py-12 group"
                style={{ borderBottom: i < services.length - 1 ? "1px solid rgba(13,13,13,0.08)" : "none" }}
              >
                {/* Numéro géant bg */}
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(5rem,12vw,12rem)",
                    opacity: 0.04,
                    lineHeight: 1,
                    color: "#0D0D0D",
                  }}
                >
                  {s.num}
                </span>

                {/* Dot lime sur le fil */}
                <div
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-colors duration-300"
                  style={{
                    borderColor: "#C6FF00",
                    background: "#F5F5EE",
                  }}
                />

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
                  <span
                    className="text-xs uppercase tracking-[0.3em] w-24 shrink-0 font-semibold"
                    style={{ color: "#C6FF00" }}
                  >
                    {s.num}
                  </span>
                  <h3
                    className="font-display font-bold"
                    style={{ fontSize: "clamp(2rem,4vw,4rem)", color: "#0D0D0D" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="max-w-md leading-relaxed md:ml-auto"
                    style={{ color: "rgba(13,13,13,0.55)" }}
                  >
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
