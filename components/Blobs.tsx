export default function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full animate-blob"
        style={{
          background: "radial-gradient(circle, rgba(198,255,0,0.35), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full animate-blob-slow"
        style={{
          background: "radial-gradient(circle, rgba(27,94,32,0.7), transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full animate-blob"
        style={{
          background: "radial-gradient(circle, rgba(198,255,0,0.18), transparent 70%)",
          filter: "blur(70px)",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}
