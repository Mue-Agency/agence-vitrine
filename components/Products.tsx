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
    <section id="produits" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-mue-lime">Catalogue</span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[0.95]">
              Nos solutions.
            </h2>
          </div>
          <p className="text-foreground/70 max-w-md">
            Des produits incubés en interne, testés sur le terrain, transmis ensuite à ceux qui en ont besoin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.name} index={i} {...p} />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl border border-dashed border-white/15 p-10 flex items-center justify-center text-center text-foreground/40 min-h-[320px]"
          >
            <span className="font-display text-lg">
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
