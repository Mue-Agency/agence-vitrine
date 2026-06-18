"use client";

import { useState } from "react";
import Image from "next/image";

const fieldStyle = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.35)",
  outline: "none",
  color: "white",
  fontFamily: "'Satoshi', sans-serif",
  fontSize: 18,
  fontWeight: 400,
  width: "100%",
  paddingBottom: 8,
};

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "clamp(18px, 2vw, 24px)",
          fontWeight: 500,
          color: "white",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="contact-field"
        style={{ ...fieldStyle, fontSize: "clamp(14px, 1.5vw, 18px)", caretColor: "#b7f700" }}
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact de ${form.nom}`);
    const body = encodeURIComponent(`Nom: ${form.nom}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:hello@agencemue.fr?subject=${subject}&body=${body}`, "_self");
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#044105" }}
    >
      {/* Decorative shape top-left — continuation of Team bottom-left */}
      <div
        className="hidden xl:block absolute pointer-events-none"
        style={{
          top: -600,
          left: -381,
          width: 923,
          height: 874,
          transform: "rotate(66.16deg) scaleY(-1)",
          opacity: 0.12,
        }}
      >
        <Image
          src="/Subtract.svg"
          alt=""
          fill
          style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
        />
      </div>

      <div className="relative px-6 md:px-[64px] py-[80px] xl:py-[160px]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-end gap-12 xl:gap-[74px] xl:pr-[75px]">
          {/* Title */}
          <div className="xl:flex-1">
            <h2
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 52px)",
                fontWeight: 500,
                color: "white",
                letterSpacing: "-1.28px",
                lineHeight: "normal",
              }}
            >
              Contactez-nous
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 items-end w-full xl:w-[523px] xl:flex-none"
          >
            <Field
              label="Nom"
              placeholder="Entrez votre nom"
              value={form.nom}
              onChange={(v) => setForm({ ...form, nom: v })}
            />
            <Field
              label="Email"
              type="email"
              placeholder="Entrez votre adresse mail"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <Field
              label="Message"
              placeholder="Entrez votre message"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
            />
            <button
              type="submit"
              style={{
                background: sent ? "#044105" : "#b7f700",
                color: sent ? "#b7f700" : "#131313",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(14px, 1.5vw, 18px)",
                fontWeight: 500,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                padding: "12px 16px",
                height: 48,
                border: sent ? "1px solid #b7f700" : "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {sent ? "Message préparé ✓" : "envoyer"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
