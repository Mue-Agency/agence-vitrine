interface Props {
  variant?: 1 | 2 | 3 | 4 | 5;
  fromBlack?: boolean;
}

// 5 paths de déchirure uniques, viewBox="0 0 1440 80"
const paths: Record<number, string> = {
  1: "M0,0 L0,40 Q180,72 360,38 Q540,5 720,45 Q900,82 1080,35 Q1260,0 1440,42 L1440,0 Z",
  2: "M0,0 L0,55 Q120,30 280,60 Q440,80 600,45 Q760,12 920,50 Q1080,75 1260,38 Q1350,20 1440,55 L1440,0 Z",
  3: "M0,0 L0,35 Q200,65 400,30 Q600,0 800,50 Q1000,78 1200,40 Q1320,18 1440,48 L1440,0 Z",
  4: "M0,0 L0,50 Q150,20 350,55 Q550,80 750,40 Q950,5 1150,45 Q1300,70 1440,35 L1440,0 Z",
  5: "M0,0 L0,42 Q250,10 500,52 Q750,80 1000,38 Q1150,12 1300,55 Q1380,72 1440,40 L1440,0 Z",
};

export default function TornDivider({ variant = 1, fromBlack = false }: Props) {
  const topColor = fromBlack ? "#0D0D0D" : "#F5F5EE";
  const bottomColor = fromBlack ? "#F5F5EE" : "#0D0D0D";
  const animName = `torn-breathe-${variant}`;
  const duration = 3.5 + variant * 0.3;
  const translateY = variant % 2 === 0 ? "-2px" : "2px";

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
        style={{ animation: `${animName} ${duration}s ease-in-out infinite` }}
      >
        <path d={paths[variant]} fill={topColor} />
      </svg>
      <style>{`
        @keyframes ${animName} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${translateY}); }
        }
      `}</style>
    </div>
  );
}
