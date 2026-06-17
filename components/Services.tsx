"use client";

import { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Identifier",
    description:
      "On détecte les problèmes qui comptent vraiment, en immersion avec vos équipes.",
  },
  {
    num: "02",
    title: "Créer",
    description:
      "On conçoit la solution sur-mesure, sobre, utile, alignée avec votre culture.",
  },
  {
    num: "03",
    title: "Tester",
    description:
      "On valide sur le terrain. Prototypes, retours utilisateurs, ajustements rapides.",
  },
  {
    num: "04",
    title: "Itérer",
    description:
      "On affine jusqu'à ce que ça tienne. Chaque boucle rapproche de la solution juste.",
  },
  {
    num: "05",
    title: "Transmettre",
    description: "On vous la confie. La suite vous appartient.",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="fonctionnement"
      className="relative overflow-hidden py-[80px] xl:py-[130px]"
      style={{ background: "#044105" }}
    >
      {/* Large background number — desktop only */}
      <div
        className="hidden xl:block absolute right-0 pointer-events-none select-none"
        style={{
          bottom: "50%",
          transform: "translateY(50%)",
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 400,
          fontSize: 500,
          color: "white",
          opacity: 0.1,
          letterSpacing: "-5.15px",
          lineHeight: "normal",
          whiteSpace: "nowrap",
        }}
      >
        {steps[activeIndex].num}
      </div>

      {/* Content */}
      <div className="relative px-6 md:px-16 xl:px-[64px] flex flex-col xl:flex-row xl:items-center xl:gap-[277px]">
        {/* Step list */}
        <div className="flex flex-col" style={{ gap: 16 }}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              className="cursor-pointer transition-colors duration-200"
              style={{
                fontFamily: "'Aukera', 'Satoshi', sans-serif",
                fontSize: "clamp(2rem, 4vw, 48px)",
                fontWeight: 400,
                letterSpacing: "-1.28px",
                color: i === activeIndex ? "#b7f700" : "white",
                lineHeight: "1.5",
              }}
            >
              {step.title}
            </div>
          ))}
        </div>

        {/* Description */}
        <div
          className="mt-8 xl:mt-0"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(1.1rem, 2.5vw, 32px)",
            fontWeight: 500,
            color: "white",
            lineHeight: "normal",
            maxWidth: 525,
          }}
        >
          {steps[activeIndex].description}
        </div>
      </div>
    </section>
  );
}
