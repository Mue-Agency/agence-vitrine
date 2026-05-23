"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 30, stiffness: 60 });
  const y = useSpring(rawY, { damping: 30, stiffness: 60 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 40);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
  };

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="section-white relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      {/* Ligne lime horizontale */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "53%", height: 1, background: "#C6FF00", transformOrigin: "left" }}
      />

      {/* Cercle décoratif rotatif */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-16 right-10 md:right-20 pointer-events-none"
        style={{ width: 180, height: 180 }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: "1px solid #C6FF00", animation: "spin-slow 18s linear infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#C6FF00", opacity: 0.5 }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#C6FF00", opacity: 0.5 }} />
        <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#C6FF00" }} />
      </motion.div>

      {/* Info bas gauche */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-20 flex flex-col gap-1"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(13,13,13,0.3)" }}>Scroll</span>
        <span className="text-xs" style={{ color: "rgba(13,13,13,0.18)" }}>2026 · Paris</span>
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Tag */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-block text-xs uppercase tracking-[0.35em] mb-6"
          style={{ color: "rgba(13,13,13,0.4)" }}
        >
          Agence de mutation digitale
        </motion.span>

        {/* Titre — MUE plein + AGENCY outline */}
        <motion.div style={{ x, y }}>
          {/* MUE — filled */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display font-bold select-none leading-[0.85]"
              style={{ fontSize: "clamp(6rem, 22vw, 22rem)", color: "#0D0D0D" }}
            >
              MUE
            </motion.h1>
          </div>

          {/* AGENCY — outline */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              className="font-display font-bold select-none leading-[0.85]"
              style={{
                fontSize: "clamp(3rem, 11vw, 11rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px #0D0D0D",
                letterSpacing: "0.12em",
              }}
            >
              AGENCY
            </motion.p>
          </div>
        </motion.div>

        {/* Tagline droite */}
        <div className="flex justify-end mt-10">
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-display italic text-xl md:text-3xl text-right max-w-xs"
            style={{ color: "rgba(13,13,13,0.45)" }}
          >
            La suite vous appartient.
          </motion.p>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
