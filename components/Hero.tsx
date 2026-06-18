"use client";

import { useState } from "react";
import Image from "next/image";
import AlouetteOverlay from "./AlouetteOverlay";

const projects = [
  {
    year: "2026",
    name: "Alouette",
    description: "La plateforme pour maintenir le lien après 60 ans",
    hasOverlay: true,
  },
  { year: "2026", description: "Prochainement..." },
  { year: "2026", description: "Prochainement..." },
  { year: "2026", description: "Prochainement..." },
  { year: "2027", description: "Prochainement..." },
  { year: "2027", description: "Prochainement..." },
  { year: "2027", description: "Prochainement..." },
  { year: "2028", description: "Prochainement..." },
];

export default function Hero() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <section
        id="projets"
        className="relative overflow-hidden"
        style={{ background: "#044105", paddingTop: "calc(98px + 110px)", paddingBottom: 130 }}
      >
        {/* Decorative S-shape — desktop only */}
        <div
          className="hidden xl:block absolute pointer-events-none"
          style={{ top: 154, right: 400, width: 340, height: 398 }}
        >
          <Image
            src="/Subtract.svg"
            alt=""
            fill
            style={{
              objectFit: "contain",
              filter:
                "brightness(0) saturate(100%) invert(80%) sepia(90%) saturate(400%) hue-rotate(30deg)",
            }}
          />
        </div>

        {/* Hero text block */}
        <div className="px-6 md:px-[59px] mb-[120px] xl:mb-[185px]">
          <h1
            className="mb-[40px] xl:mb-[54px]"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1.28px",
              lineHeight: "normal",
              fontSize: "clamp(2rem, 5vw, 64px)",
              maxWidth: 901,
            }}
          >
            <span>Transformer les problèmes de la société en </span>
            <span style={{ color: "#b7f700" }}>solutions durables</span>
          </h1>

          <p
            className="mb-[40px] xl:mb-[54px]"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 500,
              color: "#e5e2e1",
              lineHeight: "1.5",
              fontSize: "clamp(1rem, 2.5vw, 24px)",
              maxWidth: 901,
            }}
          >
            <span>Notre vision : faire émerger des </span>
            <span style={{ color: "#b7f700" }}>projets accessibles</span>
            <span>, </span>
            <span style={{ color: "#b7f700" }}>durables</span>
            <span> et </span>
            <span style={{ color: "#b7f700" }}>viables</span>
            <span>{`, qui répondent à de vrais besoins d'aujourd'hui.`}</span>
            <br className="hidden md:block" />
            <span>{`Chaque idée passe par une méthode `}</span>
            <span style={{ color: "#b7f700" }}>Lean Startup</span>
            <span>{`, confrontée au réel avant d'être développée.`}</span>
            <br className="hidden md:block" />
            <span style={{ color: "#b7f700" }}>La suite vous appartient.</span>
          </p>

          <a
            href="#fonctionnement"
            className="inline-flex items-center"
            style={{
              height: 48,
              padding: "0 12px",
              background: "#b7f700",
              color: "#044105",
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(14px, 1.5vw, 18px)",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Découvrez notre méthode
          </a>
        </div>

        {/* Nos projets */}
        <div className="px-6 md:px-[59px]">
          <p
            className="mb-8"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 52px)",
              fontWeight: 500,
              color: "white",
              letterSpacing: "-1.28px",
            }}
          >
            Nos projets
          </p>

          {/* Grid 4×2 */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={project.hasOverlay ? () => setOverlayOpen(true) : undefined}
                className="flex flex-col items-center justify-center p-6 xl:p-8"
                style={{
                  border: "1px solid #b7f700",
                  minHeight: "clamp(140px, 15vw, 210px)",
                  cursor: project.hasOverlay ? "pointer" : "default",
                  background: "transparent",
                }}
              >
                {project.hasOverlay && project.name ? (
                  <div className="flex flex-col items-center gap-4 xl:gap-8">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontSize: "clamp(12px, 1.2vw, 16px)",
                          fontWeight: 700,
                          color: "white",
                          letterSpacing: "-1.28px",
                        }}
                      >
                        {project.year}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="relative shrink-0"
                          style={{ width: "clamp(24px, 3vw, 37px)", height: "clamp(24px, 3vw, 37px)" }}
                        >
                          <Image
                            src="/Vector%2065.svg"
                            alt=""
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <span
                          style={{
                            fontFamily: "'Brule', serif",
                            fontSize: "clamp(18px, 2.5vw, 31px)",
                            color: "white",
                            letterSpacing: "1.24px",
                            fontWeight: 600,
                          }}
                        >
                          {project.name}
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-center"
                      style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: "clamp(12px, 1.2vw, 16px)",
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span
                      style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: "clamp(12px, 1.2vw, 16px)",
                        fontWeight: 700,
                        color: "white",
                        letterSpacing: "-1.28px",
                      }}
                    >
                      {project.year}
                    </span>
                    <p
                      className="text-center"
                      style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: "clamp(12px, 1.2vw, 16px)",
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {overlayOpen && <AlouetteOverlay onClose={() => setOverlayOpen(false)} />}
    </>
  );
}
