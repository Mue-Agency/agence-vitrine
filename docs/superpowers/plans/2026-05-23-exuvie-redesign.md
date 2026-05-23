# Exuvie Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le site Mue Agency en un site éditorial radical "Exuvie" — typographie monumentale, blanc cassé / noir profond alternés, déchirures SVG entre sections, curseur organique custom, grain texture, suppression du glassmorphism générique.

**Architecture:** Chaque section est un composant React existant qu'on réécrit. On ajoute 3 nouveaux composants (`CustomCursor`, `GrainOverlay`, `TornDivider`). Les sections alternent fond blanc (`#F5F5EE`) et fond noir (`#0D0D0D`) séparées par des SVG clipPath de déchirure.

**Tech Stack:** Next.js 14, Framer Motion, Tailwind CSS v4, Lucide React, SVG clipPath

---

## Fichiers concernés

| Action | Fichier | Rôle |
|---|---|---|
| Modifier | `app/globals.css` | Nouvelles couleurs, suppression glass/blobs, ajout grain + torn utilities |
| Modifier | `app/layout.tsx` | Ajouter `<CustomCursor />` et `<GrainOverlay />` |
| Modifier | `app/page.tsx` | Insérer les `<TornDivider />` entre sections |
| **Créer** | `components/CustomCursor.tsx` | Curseur organique lerp |
| **Créer** | `components/GrainOverlay.tsx` | SVG feTurbulence grain fixe |
| **Créer** | `components/TornDivider.tsx` | 5 SVG déchirures, props `variant` + `flip` |
| Réécrire | `components/Hero.tsx` | Fond blanc, "MUE" 22vw, ligne lime, grain |
| **Créer** | `components/Manifeste.tsx` | Nouvelle section fond noir, texte éditorial |
| Réécrire | `components/Services.tsx` | Fond blanc, layout vertical, numéro géant bg, fil lime |
| Réécrire | `components/Products.tsx` | Fond noir, bordures lime, hover inversion |
| Réécrire | `components/ProductCard.tsx` | Nouveau style sans glass |
| Réécrire | `components/Team.tsx` | Fond blanc, grille éditoriale |
| Réécrire | `components/TeamCard.tsx` | Photo N&B → couleur hover, layout horizontal |
| Réécrire | `components/Contact.tsx` | Fond noir, "Parlons." 15vw, formulaire épuré |
| Réécrire | `components/Navbar.tsx` | Sans glass, adaptatif blanc/noir selon section |
| Réécrire | `components/Footer.tsx` | Sans glass, minimaliste |
| Supprimer | `components/Blobs.tsx` | Remplacé par GrainOverlay |

---

## Task 1 : Système de design — globals.css

**Fichiers :**
- Modifier : `app/globals.css`

- [ ] **Réécrire globals.css** avec le nouveau système de tokens :

```css
@import "tailwindcss";

@theme inline {
  --font-display: var(--font-syne);
  --font-body: var(--font-dm-sans);

  /* Palette Exuvie */
  --color-exuvie-white: #F5F5EE;
  --color-exuvie-black: #0D0D0D;
  --color-mue-lime: #C6FF00;
  --color-mue-dark-green: #1b5e20;

  /* Aliases sémantiques */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
}

:root {
  --background: #0D0D0D;
  --foreground: #F5F5EE;
  --primary: #C6FF00;
  --primary-foreground: #0D0D0D;
  --muted-foreground: rgba(245, 245, 238, 0.55);
  --border: rgba(245, 245, 238, 0.12);
}

@layer base {
  * { border-color: var(--color-border); }
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--color-exuvie-black);
    color: var(--color-foreground);
    font-family: var(--font-body), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    cursor: none; /* curseur caché — remplacé par CustomCursor */
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display), system-ui, sans-serif;
    letter-spacing: -0.03em;
  }
  ::selection {
    background: #C6FF00;
    color: #0D0D0D;
  }
  /* Sections fond blanc */
  .section-white {
    background-color: #F5F5EE;
    color: #0D0D0D;
  }
  /* Sections fond noir */
  .section-black {
    background-color: #0D0D0D;
    color: #F5F5EE;
  }
}

@utility glow-lime {
  box-shadow:
    0 0 40px rgba(198, 255, 0, 0.3),
    0 0 80px rgba(198, 255, 0, 0.12);
}

@layer utilities {
  /* Animations blob supprimées — remplacées par grain statique */
}
```

- [ ] **Commit**

```bash
git add app/globals.css
git commit -m "design: nouveau système de tokens Exuvie, suppression glassmorphism"
```

---

## Task 2 : GrainOverlay

**Fichiers :**
- Créer : `components/GrainOverlay.tsx`

- [ ] **Créer le composant** :

```tsx
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
      style={{ opacity: 0.035 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add components/GrainOverlay.tsx
git commit -m "feat: GrainOverlay — texture SVG feTurbulence"
```

---

## Task 3 : CustomCursor

**Fichiers :**
- Créer : `components/CustomCursor.tsx`

- [ ] **Créer le composant** avec lerp et morphing au hover :

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      cursorRef.current?.classList.add("cursor-hover");
    };
    const onLeaveInteractive = () => {
      cursorRef.current?.classList.remove("cursor-hover");
    };

    const loop = () => {
      const lerp = 0.12;
      current.current.x += (pos.current.x - current.current.x) * lerp;
      current.current.y += (pos.current.y - current.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x - 20}px, ${current.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(loop);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-none"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid #C6FF00",
          mixBlendMode: "difference",
          transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background 0.3s ease",
        }}
      />
      <style>{`
        .cursor-hover {
          width: 60px !important;
          height: 60px !important;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% !important;
          background: rgba(198, 255, 0, 0.15) !important;
        }
      `}</style>
    </>
  );
}
```

- [ ] **Commit**

```bash
git add components/CustomCursor.tsx
git commit -m "feat: CustomCursor — cercle organique lerp avec morphing hover"
```

---

## Task 4 : TornDivider — 5 variantes SVG de déchirure

**Fichiers :**
- Créer : `components/TornDivider.tsx`

- [ ] **Créer le composant** avec 5 paths SVG uniques :

```tsx
interface Props {
  variant?: 1 | 2 | 3 | 4 | 5;
  fromBlack?: boolean; // true = noir vers blanc, false = blanc vers noir
}

// 5 paths de déchirure uniques, coordonnées sur viewBox="0 0 1440 80"
const paths: Record<number, string> = {
  1: "M0,0 L0,40 Q180,72 360,38 Q540,5 720,45 Q900,82 1080,35 Q1260,0 1440,42 L1440,0 Z",
  2: "M0,0 L0,55 Q120,30 280,60 Q440,80 600,45 Q760,12 920,50 Q1080,75 1260,38 Q1350,20 1440,55 L1440,0 Z",
  3: "M0,0 L0,35 Q200,65 400,30 Q600,0 800,50 Q1000,78 1200,40 Q1320,18 1440,48 L1440,0 Z",
  4: "M0,0 L0,50 Q150,20 350,55 Q550,80 750,40 Q950,5 1150,45 Q1300,70 1440,35 L1440,0 Z",
  5: "M0,0 L0,42 Q250,10 500,52 Q750,80 1000,38 Q1150,12 1300,55 Q1380,72 1440,40 L1440,0 Z",
};

export default function TornDivider({ variant = 1, fromBlack = false }: Props) {
  // fromBlack=false : passage blanc→noir (section blanche au-dessus, noire en-dessous)
  // fromBlack=true  : passage noir→blanc
  const topColor = fromBlack ? "#0D0D0D" : "#F5F5EE";
  const bottomColor = fromBlack ? "#F5F5EE" : "#0D0D0D";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 80, background: bottomColor }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{
          animation: `torn-breathe-${variant} ${3.5 + variant * 0.3}s ease-in-out infinite`,
        }}
      >
        <path d={paths[variant]} fill={topColor} />
      </svg>
      <style>{`
        @keyframes torn-breathe-${variant} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${variant % 2 === 0 ? "-" : ""}2px); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add components/TornDivider.tsx
git commit -m "feat: TornDivider — 5 variantes SVG de déchirure avec micro-animation"
```

---

## Task 5 : layout.tsx — intégrer CustomCursor et GrainOverlay

**Fichiers :**
- Modifier : `app/layout.tsx`

- [ ] **Modifier layout.tsx** pour ajouter les deux composants globaux :

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agence Mue — La suite vous appartient",
  description: "Agence Mue, agence de mutation digitale. On identifie, on crée, on transmet. La suite vous appartient.",
  keywords: ["agence", "digital", "mutation", "startup", "lean"],
  openGraph: {
    title: "Agence Mue — La suite vous appartient",
    description: "Agence de mutation digitale. Identifier, créer, transmettre.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen">
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Commit**

```bash
git add app/layout.tsx
git commit -m "feat: intégrer CustomCursor et GrainOverlay dans le layout"
```

---

## Task 6 : page.tsx — insérer les TornDivider et la section Manifeste

**Fichiers :**
- Modifier : `app/page.tsx`
- Créer : `components/Manifeste.tsx`

- [ ] **Créer Manifeste.tsx** (fond noir, texte éditorial scroll-reveal) :

```tsx
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
                className="font-display font-bold text-[clamp(2.5rem,7vw,7rem)] leading-[1.05] text-exuvie-white"
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
          className="mt-16 text-lg text-exuvie-white/50 max-w-md"
        >
          Cinq temps. Une boucle. Le reste vous appartient.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Réécrire page.tsx** avec la nouvelle structure et les TornDivider :

```tsx
import Hero from "@/components/Hero";
import Manifeste from "@/components/Manifeste";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import TornDivider from "@/components/TornDivider";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <TornDivider variant={1} fromBlack={false} />
      <Manifeste />
      <TornDivider variant={2} fromBlack={true} />
      <Services />
      <TornDivider variant={3} fromBlack={false} />
      <Products />
      <TornDivider variant={4} fromBlack={true} />
      <Team />
      <TornDivider variant={5} fromBlack={false} />
      <Contact />
    </main>
  );
}
```

- [ ] **Commit**

```bash
git add app/page.tsx components/Manifeste.tsx
git commit -m "feat: structure de page Exuvie avec TornDivider et section Manifeste"
```

---

## Task 7 : Hero redesign

**Fichiers :**
- Réécrire : `components/Hero.tsx`

- [ ] **Réécrire Hero.tsx** — fond blanc, typographie monumentale :

```tsx
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
        className="absolute left-0 right-0"
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
          className="inline-block text-xs uppercase tracking-[0.35em] text-exuvie-black/50 mb-10"
        >
          Agence de mutation digitale
        </motion.span>

        {/* Titre géant */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-bold text-exuvie-black leading-[0.85]"
            style={{ fontSize: "clamp(6rem, 22vw, 22rem)" }}
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
            className="font-display italic text-2xl md:text-4xl text-exuvie-black/70 text-right max-w-sm"
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
        className="absolute bottom-10 left-6 md:left-20 text-exuvie-black/30 text-xs uppercase tracking-widest"
      >
        Scroll
      </motion.div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add components/Hero.tsx
git commit -m "design: Hero Exuvie — MUE 22vw blanc cassé avec ligne lime"
```

---

## Task 8 : Services redesign — layout vertical éditorial

**Fichiers :**
- Réécrire : `components/Services.tsx`

- [ ] **Réécrire Services.tsx** — fond blanc, numéro géant bg, fil lime vertical, plus de carousel :

```tsx
"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, FlaskConical, RefreshCw, HandHeart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services = [
  { num: "01", title: "Identifier", description: "On détecte les problèmes qui comptent vraiment, en immersion avec vos équipes.", Icon: Search },
  { num: "02", title: "Créer", description: "On conçoit la solution sur-mesure, sobre, utile, alignée avec votre culture.", Icon: Sparkles },
  { num: "03", title: "Tester", description: "On valide sur le terrain. Prototypes, retours utilisateurs, ajustements rapides.", Icon: FlaskConical },
  { num: "04", title: "Itérer", description: "On affine jusqu'à ce que ça tienne. Chaque boucle rapproche de la solution juste.", Icon: RefreshCw },
  { num: "05", title: "Transmettre", description: "On vous la confie. La suite vous appartient.", Icon: HandHeart },
];

export default function Services() {
  return (
    <section id="services" className="section-white relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-exuvie-black/40">Notre méthode</span>
          <h2 className="mt-4 font-display font-bold leading-[0.9]" style={{ fontSize: "clamp(3rem,8vw,8rem)" }}>
            Notre cycle.
          </h2>
        </motion.div>

        {/* Liste éditoriale */}
        <div className="relative">
          {/* Fil vertical lime */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "#C6FF00" }}
          />

          <div className="flex flex-col">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative pl-12 py-12 border-b border-exuvie-black/10 last:border-0 group"
              >
                {/* Numéro géant bg */}
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold text-exuvie-black select-none pointer-events-none"
                  style={{ fontSize: "clamp(5rem,12vw,12rem)", opacity: 0.04, lineHeight: 1 }}
                >
                  {s.num}
                </span>

                {/* Dot lime sur le fil */}
                <div
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-exuvie-black group-hover:bg-mue-lime transition-colors"
                  style={{ borderColor: "#C6FF00", background: "#F5F5EE" }}
                />

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
                  <span className="text-xs uppercase tracking-[0.3em] text-mue-lime w-24 shrink-0">{s.num}</span>
                  <h3 className="font-display font-bold text-exuvie-black" style={{ fontSize: "clamp(2rem,4vw,4rem)" }}>
                    {s.title}
                  </h3>
                  <p className="text-exuvie-black/60 max-w-md leading-relaxed md:ml-auto">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add components/Services.tsx
git commit -m "design: Services Exuvie — layout vertical éditorial avec fil lime"
```

---

## Task 9 : Products redesign

**Fichiers :**
- Réécrire : `components/Products.tsx`
- Réécrire : `components/ProductCard.tsx`

- [ ] **Réécrire ProductCard.tsx** — sans glass, bordure lime, hover inversion totale :

```tsx
"use client";

import { motion } from "framer-motion";

interface Props {
  index: number;
  name: string;
  description: string;
  badge?: string;
}

export default function ProductCard({ index, name, description, badge }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative border border-mue-lime/30 hover:border-mue-lime p-10 flex flex-col gap-6 min-h-[320px] transition-colors overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Fond hover inversion */}
      <div
        className="absolute inset-0 -z-10 transition-transform duration-500 ease-out"
        style={{
          background: "#C6FF00",
          transform: "translateY(101%)",
        }}
        data-hover-bg
      />
      <style>{`
        .group:hover [data-hover-bg] { transform: translateY(0%) !important; }
        .group:hover .card-text { color: #0D0D0D !important; }
        .group:hover .card-badge { background: #0D0D0D; color: #C6FF00; }
      `}</style>

      <div className="flex items-start justify-between gap-4">
        <div className="h-10 w-10 border border-mue-lime/40 group-hover:border-exuvie-black/30 transition-colors" />
        {badge && (
          <span className="card-badge px-3 py-1 border border-mue-lime text-mue-lime text-xs font-semibold uppercase tracking-wider transition-colors">
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="card-text font-display text-2xl md:text-3xl font-bold text-exuvie-white transition-colors">{name}</h3>
        <p className="card-text mt-4 text-exuvie-white/60 leading-relaxed transition-colors">{description}</p>
      </div>
    </motion.article>
  );
}
```

- [ ] **Réécrire Products.tsx** — fond noir, titres blancs :

```tsx
"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Solution sociale — à venir",
    description: "Plateforme pour renforcer le lien et l'amitié chez les personnes non-actives. En cours de développement.",
    badge: "En cours",
  },
];

export default function Products() {
  return (
    <section id="produits" className="section-black relative py-32 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-mue-lime/70">Catalogue</span>
            <h2 className="mt-4 font-display font-bold leading-[0.9] text-exuvie-white" style={{ fontSize: "clamp(3rem,8vw,8rem)" }}>
              Nos solutions.
            </h2>
          </div>
          <p className="text-exuvie-white/40 max-w-md text-lg">
            Des produits incubés en interne, testés sur le terrain, transmis ensuite à ceux qui en ont besoin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 border border-mue-lime/20">
          {products.map((p, i) => (
            <ProductCard key={p.name} index={i} {...p} />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border-t md:border-t-0 md:border-l border-mue-lime/20 p-10 flex items-center justify-center text-center text-exuvie-white/20 min-h-[320px]"
          >
            <span className="font-display text-xl">
              Prochaine solution<br />en incubation.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add components/Products.tsx components/ProductCard.tsx
git commit -m "design: Products Exuvie — fond noir, bordures lime, hover inversion"
```

---

## Task 10 : Team redesign

**Fichiers :**
- Réécrire : `components/Team.tsx`
- Réécrire : `components/TeamCard.tsx`

- [ ] **Réécrire TeamCard.tsx** — fond blanc, initiales noires, hover lime :

```tsx
"use client";

import { motion } from "framer-motion";

interface Props {
  index: number;
  name: string;
  role: string;
  linkedin: string;
  initials: string;
}

export default function TeamCard({ index, name, role, linkedin, initials }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="group flex flex-col gap-4 py-8 border-b border-exuvie-black/10 last:border-0"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Initiales */}
        <div
          className="h-14 w-14 rounded-full border border-exuvie-black/20 group-hover:border-mue-lime group-hover:bg-mue-lime flex items-center justify-center font-display font-bold text-lg text-exuvie-black transition-all"
        >
          {initials}
        </div>

        {/* LinkedIn */}
        <a
          href={linkedin}
          aria-label={`LinkedIn ${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-exuvie-black/40 hover:text-exuvie-black"
          data-cursor
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>

      <div>
        <h3 className="font-display font-bold text-xl text-exuvie-black">{name}</h3>
        <p className="text-sm text-mue-lime mt-0.5">{role}</p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Réécrire Team.tsx** — fond blanc, grille éditoriale :

```tsx
"use client";

import { motion } from "framer-motion";
import TeamCard from "./TeamCard";

const team = [
  { name: "Membre 1", role: "Direction & Stratégie", initials: "M1", linkedin: "#" },
  { name: "Membre 2", role: "Design & Produit", initials: "M2", linkedin: "#" },
  { name: "Membre 3", role: "Tech & Développement", initials: "M3", linkedin: "#" },
  { name: "Membre 4", role: "Terrain & Relations", initials: "M4", linkedin: "#" },
  { name: "Membre 5", role: "Rôle 5", initials: "M5", linkedin: "#" },
  { name: "Membre 6", role: "Rôle 6", initials: "M6", linkedin: "#" },
  { name: "Membre 7", role: "Rôle 7", initials: "M7", linkedin: "#" },
  { name: "Membre 8", role: "Rôle 8", initials: "M8", linkedin: "#" },
];

export default function Team() {
  return (
    <section id="equipe" className="section-white relative py-32 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-exuvie-black/40">Qui sommes-nous</span>
          <h2 className="mt-4 font-display font-bold text-exuvie-black leading-[0.9]" style={{ fontSize: "clamp(3rem,8vw,8rem)" }}>
            L&apos;équipe.
          </h2>
          <p className="mt-6 text-lg text-exuvie-black/50 max-w-xl">
            Huit profils complémentaires, une même obsession : transmettre.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12">
          {team.map((m, i) => (
            <TeamCard key={m.name} index={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add components/Team.tsx components/TeamCard.tsx
git commit -m "design: Team Exuvie — fond blanc, liste éditoriale hover lime"
```

---

## Task 11 : Contact redesign

**Fichiers :**
- Réécrire : `components/Contact.tsx`

- [ ] **Réécrire Contact.tsx** — fond noir, "Parlons." 15vw, formulaire sans glass :

```tsx
"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

function Field({ label, id, type, placeholder }: { label: string; id: string; type: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-exuvie-white/40">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b border-exuvie-white/20 focus:border-mue-lime pb-3 outline-none text-exuvie-white placeholder:text-exuvie-white/20 transition-colors"
      />
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-black relative py-32 px-6 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* "Parlons." géant */}
        <div className="overflow-hidden mb-24">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-exuvie-white leading-[0.85]"
            style={{ fontSize: "clamp(5rem,15vw,15rem)" }}
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
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-exuvie-white/40">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Parlez-nous de votre projet…"
                className="bg-transparent border-b border-exuvie-white/20 focus:border-mue-lime pb-3 outline-none text-exuvie-white placeholder:text-exuvie-white/20 transition-colors resize-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-8 py-4 bg-mue-lime text-exuvie-black font-semibold uppercase tracking-widest text-sm hover:glow-lime transition-all"
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
              <span className="text-xs uppercase tracking-widest text-exuvie-white/30">Email direct</span>
              <a href="mailto:hello@agencemue.fr" className="mt-3 flex items-center gap-3 text-exuvie-white hover:text-mue-lime transition-colors" data-cursor>
                <Mail size={16} /> hello@agencemue.fr
              </a>
            </div>
            <div className="h-px bg-exuvie-white/10" />
            <p className="text-sm text-exuvie-white/30">
              On vous répond en moins de 48h. Toujours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add components/Contact.tsx
git commit -m "design: Contact Exuvie — Parlons. 15vw, formulaire underline épuré"
```

---

## Task 12 : Navbar redesign

**Fichiers :**
- Réécrire : `components/Navbar.tsx`

- [ ] **Réécrire Navbar.tsx** — sans glass, fond transparent qui s'adapte :

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#produits", label: "Produits" },
  { href: "#equipe", label: "Équipe" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-20 py-5 flex items-center justify-between transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(13, 13, 13, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,245,238,0.08)" : "none",
      }}
    >
      <a href="#accueil" className="flex items-center gap-2.5 group" data-cursor>
        <Image src="/logo.svg" alt="Mue agency" width={32} height={32} className="transition-transform group-hover:rotate-12" />
        <span className="font-display font-bold text-base tracking-tight text-exuvie-white">Mue</span>
      </a>

      <nav className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-4 py-2 text-sm text-exuvie-white/60 hover:text-exuvie-white transition-colors"
            data-cursor
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center px-5 py-2 border border-mue-lime text-mue-lime text-sm font-semibold hover:bg-mue-lime hover:text-exuvie-black transition-colors"
        data-cursor
      >
        Parlons-en
      </a>

      <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-exuvie-white" aria-label="Menu" data-cursor>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-exuvie-black border border-exuvie-white/10 p-4 md:hidden flex flex-col gap-1"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 text-exuvie-white/80 hover:text-mue-lime transition-colors">
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
```

- [ ] **Commit**

```bash
git add components/Navbar.tsx
git commit -m "design: Navbar Exuvie — transparent, bordure lime sur CTA, scroll effect"
```

---

## Task 13 : Footer redesign

**Fichiers :**
- Réécrire : `components/Footer.tsx`

- [ ] **Réécrire Footer.tsx** — minimaliste, sans glass :

```tsx
import Image from "next/image";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#produits", label: "Produits" },
  { href: "#equipe", label: "Équipe" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="section-black border-t border-exuvie-white/10 px-6 md:px-20 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="Mue" width={28} height={28} />
        <span className="font-display font-bold text-sm text-exuvie-white/80">Agence Mue</span>
      </div>
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-exuvie-white/30">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-mue-lime transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <p className="text-xs text-exuvie-white/20">© 2026 Agence Mue</p>
    </footer>
  );
}
```

- [ ] **Supprimer Blobs.tsx** (remplacé par GrainOverlay) :

```bash
git rm components/Blobs.tsx
```

- [ ] **Commit**

```bash
git add components/Footer.tsx
git commit -m "design: Footer Exuvie minimaliste, suppression Blobs.tsx"
```

---

## Task 14 : Vérification finale

- [ ] Lancer le serveur de développement :

```bash
npm run dev
```

- [ ] Vérifier visuellement section par section :
  - Hero : "MUE" géant, fond blanc, ligne lime, pas de blobs
  - Déchirures : transitions visibles et animées entre chaque section
  - Manifeste : texte qui slide du bas au scroll
  - Services : liste verticale avec fil lime et numéros géants en bg
  - Products : hover inversion lime/noir
  - Team : hover lime sur initiales, LinkedIn apparaît
  - Contact : "Parlons." monumentale, formulaire underline
  - Curseur : cercle lime qui morphe sur les éléments interactifs
  - Grain : texture discrète sur toute la page

- [ ] Vérifier que `cursor: none` fonctionne (le curseur natif doit être invisible)

- [ ] Commit final :

```bash
git add -A
git commit -m "design: Exuvie redesign complet — site Mue Agency"
```
