"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExploreCta() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  }

  return (
    <Link
      ref={ref}
      href="/projects"
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-neon-cyan/30 bg-ink-900/60 px-5 py-12 text-center sm:px-12 sm:py-28",
        "transition-colors duration-300 hover:border-neon-cyan/60"
      )}
      style={{
        background: hover
          ? `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(61,240,255,0.16), transparent 55%)`
          : undefined,
      }}
    >
      {/* moving neon edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          padding: 1,
          background:
            "conic-gradient(from var(--a, 0deg), transparent 0deg, #3df0ff 90deg, #a974ff 160deg, #ff4dcb 220deg, transparent 320deg)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: reduce ? undefined : "spin-slow 8s linear infinite",
          opacity: hover ? 0.9 : 0.45,
        }}
      />
      {/* light sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent blur-xl transition-transform duration-700 group-hover:translate-x-[260%]"
      />

      <div className="relative">
        <p className="eyebrow justify-center">Want to see what I&apos;ve built?</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tighter2 text-paper sm:text-6xl text-balance">
          <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent neon-text">
            EXPLORE THE WORK
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper-muted text-balance sm:text-lg">
          Explore websites, digital products, AI experiments, dashboards, and
          creative projects built through continuous learning and experimentation.
        </p>
        <motion.span
          className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-7 py-3.5 text-sm font-medium text-neon-cyan sm:w-auto"
          animate={hover && !reduce ? { x: 4 } : { x: 0 }}
        >
          EXPLORE ALL PROJECTS
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </motion.span>
      </div>
    </Link>
  );
}
