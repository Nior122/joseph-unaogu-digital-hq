"use client";
import { useEffect, useRef } from "react";
export function DigitalBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--mx", x + "%");
      el.style.setProperty("--my", y + "%");
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div ref={ref} className="absolute inset-0" style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,30%), rgba(61,240,255,0.10), transparent 60%)" }} />
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-neon-violet/10 blur-[140px]" />
      <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-neon-cyan/10 blur-[150px]" />
    </div>
  );
}