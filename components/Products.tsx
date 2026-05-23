"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Solution sociale — à venir",
    description:
      "Plateforme pour renforcer le lien et l'amitié chez les personnes non-actives. En cours de développement.",
    badge: "En cours",
  },
];

export default function Products() {
  return (
    <section id="produits" className="section-black relative py-32 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span
              className="text-xs uppercase tracking-[0.35em]"
              style={{ color: "rgba(198,255,0,0.65)" }}
            >
              Catalogue
            </span>
            <h2
              className="mt-4 font-display font-bold leading-[0.9]"
              style={{ fontSize: "clamp(3rem,8vw,8rem)", color: "#F5F5EE" }}
            >
              Nos solutions.
            </h2>
          </div>
          <p className="max-w-md text-lg" style={{ color: "rgba(245,245,238,0.35)" }}>
            Des produits incubés en interne, testés sur le terrain, transmis ensuite à ceux qui en ont besoin.
          </p>
        </motion.div>

        <div
          className="grid md:grid-cols-2 gap-0"
          style={{ border: "1px solid rgba(198,255,0,0.15)" }}
        >
          {products.map((p, i) => (
            <ProductCard key={p.name} index={i} {...p} />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-10 flex items-center justify-center text-center min-h-[320px]"
            style={{
              borderTop: "none",
              borderLeft: "1px solid rgba(198,255,0,0.15)",
              color: "rgba(245,245,238,0.18)",
            }}
          >
            <span className="font-display text-xl">
              Prochaine solution
              <br />
              en incubation.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
