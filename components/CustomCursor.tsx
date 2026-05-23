"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const isHover = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { isHover.current = true; };
    const onLeave = () => { isHover.current = false; };

    const loop = () => {
      // Dot: suit parfaitement
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring: lerp (retard organique)
      const lerp = 0.1;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        const size = isHover.current ? 120 : 80;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderRadius = isHover.current
          ? "30% 70% 70% 30% / 30% 30% 70% 70%"
          : "50%";
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(loop);

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot central */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
        }}
      />
      {/* Grand anneau avec retard */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
          opacity: 0.9,
          transition: "width 0.4s cubic-bezier(.22,1,.36,1), height 0.4s cubic-bezier(.22,1,.36,1), border-radius 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      />
      <style>{`
        @media (hover: none) {
          body { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}
