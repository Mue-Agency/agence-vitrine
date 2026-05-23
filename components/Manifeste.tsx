"use client";

import { motion } from "framer-motion";

const lines = [
  "Nous ne construisons",
  "pas des outils.",
  "Nous aidons vos organisations",
  "à muer.",
];

export default function Manifeste() {
  return (
    <section className="section-black py-40 px-6 md:px-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-2">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display font-bold leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem,7vw,7rem)" }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-lg max-w-md"
          style={{ color: "rgba(245,245,238,0.4)" }}
        >
          Cinq temps. Une boucle. Le reste vous appartient.
        </motion.p>
      </div>
    </section>
  );
}
