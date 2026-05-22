"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Blobs from "./Blobs";

const title = "Agence Mue".split("");

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <Blobs />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 inline-flex"
        >
          <div className="glass rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em] text-mue-lime">
            Agence de mutation digitale
          </div>
        </motion.div>

        <h1 className="font-display font-bold text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-tighter">
          <span className="sr-only">Agence Mue</span>
          <span aria-hidden className="inline-flex flex-wrap justify-center">
            {title.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.2 + i * 0.06,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 font-display text-2xl md:text-4xl text-mue-lime italic"
        >
          La suite vous appartient.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 max-w-xl mx-auto text-base md:text-lg text-foreground/70"
        >
          Nous identifions, créons et transmettons les outils digitaux qui font muer votre organisation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#services"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-mue-lime text-mue-black font-semibold hover:scale-105 hover:glow-lime transition-all"
          >
            Découvrir nos services
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-4 rounded-2xl glass hover:bg-white/10 transition-colors"
          >
            Nous contacter
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 text-xs uppercase tracking-widest"
      >
        Scroll
      </motion.div>
    </section>
  );
}
