import Image from "next/image";

const team = [
  { name: "Mamou TRAORÉ", role: "UX / Product Designer", photo: "/image/mamou.jpg" },
  { name: "Pierre COLLAY", role: "DA / UI Designer", photo: "/image/pierre.jpg" },
  { name: "Chaïnez HAJJAOUI", role: "DA / UI Designer", photo: "/image/chainz.jpg" },
  { name: "Giovanni KLOUSSEY", role: "Développeur", photo: "/image/giovanni.jpg" },
  { name: "Eléa YA", role: "Développeuse", photo: "/image/elea.jpg" },
  { name: "Hugo BORGES", role: "MKTI ", photo: "/image/hugo.jpg" },
  { name: "Gabin Rouquet", role: "MKTI", photo: "/image/gabin.jpg" },
  { name: "Walid TRAORÉ", role: "Motion Designer", photo: "/image/walid.jpg" },
];

interface MemberProps {
  name: string;
  role: string;
  photo: string;
}

function Member({ name, role, photo }: MemberProps) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div
        className="relative overflow-hidden"
        style={{
          border: "1px solid #044105",
          aspectRatio: "225.75 / 220.5",
          width: "100%",
        }}
      >
        <Image
          src={photo}
          alt={name}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div className="flex flex-col">
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(14px, 1.3vw, 18px)",
            fontWeight: 700,
            color: "#044105",
            letterSpacing: "0.26px",
            lineHeight: "normal",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(13px, 1.1vw, 16px)",
            fontStyle: "italic",
            color: "#044105",
            letterSpacing: "0.26px",
            lineHeight: "normal",
          }}
        >
          {role}
        </span>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section
      id="equipe"
      className="relative overflow-hidden py-[80px] xl:py-[130px]"
      style={{ background: "#edf4ed" }}
    >
      {/* Decorative shape top-right — desktop only */}
      <div
        className="hidden xl:block absolute pointer-events-none"
        style={{
          top: -527,
          left: 967,
          width: 937,
          height: 903,
          transform: "rotate(-116.48deg) scaleY(-1)",
          opacity: 0.12,
        }}
      >
        <Image
          src="/Subtract.svg"
          alt=""
          fill
          style={{ objectFit: "contain", filter: "brightness(0) saturate(100%)" }}
        />
      </div>

      {/* Decorative shape bottom-left — desktop only */}
      <div
        className="hidden xl:block absolute pointer-events-none"
        style={{
          bottom: -270,
          left: -382,
          width: 924,
          height: 886,
          transform: "rotate(66.16deg) scaleY(-1)",
          opacity: 0.12,
        }}
      >
        <Image
          src="/Subtract.svg"
          alt=""
          fill
          style={{ objectFit: "contain", filter: "brightness(0) saturate(100%)" }}
        />
      </div>

      <div className="relative px-6 md:px-[64px]">
        {/* Section title */}
        <h2
          className="mb-8 xl:mb-[32px]"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 52px)",
            fontWeight: 500,
            color: "#044105",
            letterSpacing: "-1.28px",
            lineHeight: "normal",
          }}
        >
          Notre équipe
        </h2>

        {/* Responsive grid — 2 cols mobile, 3 tablet, 4 lg, 5 xl */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {team.map((m) => (
            <Member key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
