const items = [
  "Identifier",
  "Créer",
  "Tester",
  "Itérer",
  "Transmettre",
];

const SEP = (
  <span
    aria-hidden
    style={{
      display: "inline-block",
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "#C6FF00",
      margin: "0 2.5rem",
      verticalAlign: "middle",
      flexShrink: 0,
    }}
  />
);

// Répéter 4 fois pour un loop fluide
const repeated = Array.from({ length: 4 }, () => items).flat();

export default function Marquee() {
  return (
    <div
      aria-hidden
      className="overflow-hidden w-full"
      style={{ background: "#0D0D0D", padding: "1.4rem 0" }}
    >
      <div
        className="flex items-center whitespace-nowrap w-max"
        style={{ animation: "marquee-scroll 22s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="font-bold uppercase tracking-[0.15em]"
              style={{ fontFamily: "'Aukera', sans-serif", fontSize: "clamp(0.9rem,1.5vw,1.2rem)", color: "#F5F5EE" }}
            >
              {item}
            </span>
            {SEP}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
