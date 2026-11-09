"use client";
import { useEffect, useRef } from "react";

/**
 * Fixed ambient backdrop shared by every page.
 * Deep navy base + violet light + a faint tech grid, matching the brand direction.
 */
export function DigitalBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", (e.clientX / window.innerWidth) * 100 + "%");
        el.style.setProperty("--my", (e.clientY / window.innerHeight) * 100 + "%");
        frame = 0;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-ink-950">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at var(--mx, 55%) var(--my, 18%), rgba(124,77,255,0.12), transparent 62%)",
        }}
      />
      <div className="absolute -left-48 -top-56 h-[560px] w-[560px] rounded-full bg-brand-700/25 blur-[160px]" />
      <div className="absolute right-[-12%] top-[6%] h-[520px] w-[520px] rounded-full bg-brand-600/20 blur-[170px]" />
      <div className="absolute bottom-[-18%] left-[28%] h-[420px] w-[420px] rounded-full bg-brand-800/25 blur-[170px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
    </div>
  );
}
