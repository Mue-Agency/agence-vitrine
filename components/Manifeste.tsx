"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  { text: "Nous ne construisons", small: false },
  { text: "pas des outils.", small: false },
  { text: "Nous aidons vos organisations", small: false },
  { text: "à muer.", small: false },
  { text: "Cinq temps. Une boucle.", small: true },
];

export default function Manifeste() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={ref}
      className="py-32 px-6 md:px-20 overflow-hidden"
      style={{ backgroundColor: "#0D0D0D", color: "#F5F5EE" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-1">
          {lines.map(({ text, small }, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display font-bold leading-[1.05]"
                style={{
                  fontSize: small
                    ? "clamp(1.6rem, 3.5vw, 3.5rem)"
                    : "clamp(2.5rem, 7vw, 7rem)",
                  color: small ? "rgba(245,245,238,0.35)" : "#F5F5EE",
                }}
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
