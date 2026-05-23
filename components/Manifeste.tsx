"use client";

import { motion } from "framer-motion";

const lines = [
  "Nous ne construisons",
  "pas des outils.",
  "Nous aidons vos organisations",
  "à muer.",
  "Cinq temps. Une boucle.",
];

export default function Manifeste() {
  return (
    <section
      className="py-32 px-6 md:px-20 overflow-hidden"
      style={{ backgroundColor: "#0D0D0D", color: "#F5F5EE" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display font-bold leading-[1.05]"
                style={{
                  fontSize: i >= 4 ? "clamp(1.6rem,3.5vw,3.5rem)" : "clamp(2.5rem,7vw,7rem)",
                  color: i >= 4 ? "rgba(245,245,238,0.35)" : "#F5F5EE",
                }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
