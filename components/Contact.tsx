"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";

function Field({
  label,
  id,
  type,
  placeholder,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-widest"
        style={{ color: "rgba(245,245,238,0.35)" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-transparent pb-3 outline-none transition-colors"
        style={{
          borderBottom: "1px solid rgba(245,245,238,0.18)",
          color: "#F5F5EE",
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#C6FF00")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(245,245,238,0.18)")}
      />
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="section-black relative py-32 px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* "Parlons." géant */}
        <div className="overflow-hidden mb-24">
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[0.85]"
            style={{ fontSize: "clamp(5rem,15vw,15rem)", color: "#F5F5EE" }}
          >
            Parlons.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
          {/* Formulaire */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-10"
          >
            <div className="grid md:grid-cols-2 gap-10">
              <Field label="Nom" id="name" type="text" placeholder="Votre nom" />
              <Field label="Email" id="email" type="email" placeholder="vous@exemple.com" />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-widest"
                style={{ color: "rgba(245,245,238,0.35)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Parlez-nous de votre projet…"
                className="bg-transparent pb-3 outline-none resize-none transition-colors"
                style={{
                  borderBottom: "1px solid rgba(245,245,238,0.18)",
                  color: "#F5F5EE",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderBottomColor = "#C6FF00")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderBottomColor =
                    "rgba(245,245,238,0.18)")
                }
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-all hover:glow-lime"
                style={{ background: "#C6FF00", color: "#0D0D0D" }}
                data-cursor
              >
                Envoyer
              </button>
            </div>
          </motion.form>

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-8 pt-2"
          >
            <div>
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "rgba(245,245,238,0.28)" }}
              >
                Email direct
              </span>
              <a
                href="mailto:hello@agencemue.fr"
                className="mt-3 flex items-center gap-3 transition-colors hover:text-mue-lime"
                style={{ color: "#F5F5EE" }}
                data-cursor
              >
                <Mail size={16} /> hello@agencemue.fr
              </a>
            </div>
            <div style={{ height: 1, background: "rgba(245,245,238,0.08)" }} />
            <p className="text-sm" style={{ color: "rgba(245,245,238,0.28)" }}>
              On vous répond en moins de 48h. Toujours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
