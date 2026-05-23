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

    const addListeners = () => {
      const interactives = document.querySelectorAll("a, button, [data-cursor]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    // Attendre que le DOM soit prêt
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
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
        @media (hover: none) {
          [aria-hidden="true"].fixed.top-0.left-0 { display: none; }
          body { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}
