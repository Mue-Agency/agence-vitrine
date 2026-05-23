"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="section-white relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-20"
    >
      {/* Ligne lime horizontale */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "52%",
          height: 1,
          background: "#C6FF00",
          transformOrigin: "left",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Tag */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-block text-xs uppercase tracking-[0.35em] mb-10"
          style={{ color: "rgba(13,13,13,0.45)" }}
        >
          Agence de mutation digitale
        </motion.span>

        {/* Titre géant */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-bold leading-[0.85] select-none"
            style={{
              fontSize: "clamp(6rem, 22vw, 22rem)",
              color: "#0D0D0D",
            }}
          >
            MUE
          </motion.h1>
        </div>

        {/* Tagline droite */}
        <div className="flex justify-end mt-8">
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-display italic text-2xl md:text-4xl text-right max-w-sm"
            style={{ color: "rgba(13,13,13,0.55)" }}
          >
            La suite vous appartient.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-20 text-xs uppercase tracking-widest"
        style={{ color: "rgba(13,13,13,0.3)" }}
      >
        Scroll
      </motion.div>
    </section>
  );
}
