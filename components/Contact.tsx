"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

function Field({ label, id, type, placeholder }: { label: string; id: string; type: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-foreground/60">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-mue-lime focus:bg-white/10 transition-colors"
      />
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-10 w-10 rounded-xl glass flex items-center justify-center text-foreground/70 hover:text-mue-lime hover:bg-white/10 transition-colors"
    >
      {children}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(27,94,32,0.5), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-mue-lime">Premier échange</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[0.95]">
            Parlons-en.
          </h2>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto">
            Un projet, une intuition, un besoin de transformation ? Écrivez-nous.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
            className="glass-strong rounded-3xl p-8 md:p-10 flex flex-col gap-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Nom" id="name" type="text" placeholder="Votre nom" />
              <Field label="Email" id="email" type="email" placeholder="vous@exemple.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-foreground/60">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Parlez-nous de votre projet…"
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-mue-lime focus:bg-white/10 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 self-start px-7 py-4 rounded-2xl bg-mue-lime text-mue-black font-semibold hover:scale-105 hover:glow-lime transition-all"
            >
              Envoyer le message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-3xl p-8 flex flex-col gap-6"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-foreground/60">Email direct</span>
              <a
                href="mailto:hello@agencemue.fr"
                className="mt-2 flex items-center gap-3 text-lg hover:text-mue-lime transition-colors"
              >
                <Mail size={18} /> hello@agencemue.fr
              </a>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <span className="text-xs uppercase tracking-widest text-foreground/60">Réseaux</span>
              <div className="mt-3 flex gap-3">
                <SocialLink href="#" label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialLink>
                <SocialLink href="#" label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </SocialLink>
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <p className="text-sm text-foreground/60">
              On vous répond en moins de 48h. Toujours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
