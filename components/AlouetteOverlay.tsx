"use client";

import Image from "next/image";

interface AlouetteOverlayProps {
  onClose: () => void;
}

export default function AlouetteOverlay({ onClose }: AlouetteOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1330px] overflow-y-auto"
        style={{
          background: "#044105",
          boxShadow: "0 0 7.9px rgba(255,255,255,0.38)",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute flex items-center justify-center text-white z-10"
          style={{
            top: 35,
            right: 44,
            width: 44,
            height: 44,
            fontSize: 22,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Content — stacked on mobile, side by side on lg */}
        <div className="flex flex-col lg:flex-row p-8 xl:p-0" style={{ gap: 40 }}>
          {/* Left — title + description */}
          <div
            className="flex flex-col xl:absolute"
            style={{
              gap: 49,
              maxWidth: 759,
            }}
          >
            <div className="xl:pt-[123px] xl:pl-[59px]">
              <p
                style={{
                  fontFamily: "'Aukera', 'Satoshi', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 54px)",
                  color: "white",
                  lineHeight: "normal",
                  fontWeight: 400,
                }}
              >
                ALOUETTE
              </p>
            </div>
            <div
              className="flex flex-col xl:pl-[59px]"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(0.95rem, 1.8vw, 24px)",
                color: "#e5e2e1",
                letterSpacing: "-1.28px",
                gap: 24,
                lineHeight: "1.6",
              }}
            >
              <p>
                <span>{`Alouette part d'un constat simple : les seniors fréquentent les mêmes lieux chaque semaine, le marché, le parc, le café, mais ces croisements répétés ne deviennent presque jamais des liens. `}</span>
                <span style={{ color: "#b7f700" }}>On se voit, on ne se lie pas.</span>
              </p>
              <p>
                <span>{`Alouette transforme ces habitudes en amitiés. Un QR code affiché dans les lieux du quotidien ouvre une `}</span>
                <span style={{ color: "#b7f700" }}>web app</span>
                <span>{` sans téléchargement. En quelques secondes, `}</span>
                <span style={{ color: "#b7f700" }}>{`on retrouve les personnes que l'on croise déjà`}</span>
                <span>{`, on échange, et `}</span>
                <span style={{ color: "#b7f700" }}>on organise des sorties à plusieurs</span>
                <span>, en petits groupes de proximité.</span>
              </p>
              <p>
                {`Pas de démarche stigmatisante, pas de friction technique. Juste un pont entre une présence déjà là et les relations qui n'attendaient qu'un prétexte pour exister.`}
              </p>
            </div>
          </div>

          {/* Right — logo card + info */}
          <div
            className="flex flex-col shrink-0 w-full lg:w-[388px] xl:absolute xl:right-[59px] xl:top-[123px]"
            style={{ gap: 32 }}
          >
            {/* Logo card */}
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{ height: 218, background: "#c7d7f3" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0" style={{ width: 60, height: 60 }}>
                  <Image
                    src="/Vector%2065.svg"
                    alt="Alouette"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Brule', serif",
                    fontSize: "clamp(28px, 4vw, 50px)",
                    color: "#152646",
                    letterSpacing: "2px",
                    fontWeight: 600,
                  }}
                >
                  Alouette
                </span>
              </div>
            </div>

            {/* Info table */}
            <div className="flex flex-col" style={{ gap: 7 }}>
              {/* Site web */}
              <div className="flex items-start justify-between text-white" style={{ fontSize: 16 }}>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700 }}>Site web</span>
                <a href="https://alouette.mue.agency" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: "white", textDecoration: "underline" }}>Alouette.com</a>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.3)" }} />

              {/* Statut */}
              <div className="flex items-start justify-between text-white" style={{ fontSize: 16 }}>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700 }}>Statut</span>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}>Actif</span>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.3)" }} />

              {/* Fondateurs */}
              <div className="flex items-start justify-between text-white" style={{ fontSize: 16 }}>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, flexShrink: 0 }}>
                  Fondateur
                </span>
                <div
                  className="flex flex-col items-end"
                  style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, gap: 8 }}
                >
                  <span>Mamou Traoré</span>
                  <span>Giovanni Kloussey</span>
                  <span>Éléa YA</span>
                  <span>Pierre Collay</span>
                  <span>Chaïnez Hajjaoui</span>
                  <span>Gabin Rouquet</span>
                  <span>Hugo Borges</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for xl absolute layout */}
        <div className="hidden xl:block" style={{ height: 809 }} />
      </div>
    </div>
  );
}
