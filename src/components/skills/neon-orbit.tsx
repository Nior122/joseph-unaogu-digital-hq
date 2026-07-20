"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { skillNodes, skillCategories, type SkillCategory } from "@/lib/content";

const CENTER = 50;

// Skills are split into 3 concentric rings of ~equal count (9/9/9) for even angular spacing.
const RING_OF: Record<string, 1 | 2 | 3> = {
  ebook: 1, copy: 1, content: 1, video: 1, anim: 1, yt: 1, visual: 1, aiapp: 1, llm: 1,
  chatbot: 2, prompt: 2, img: 2, aiauto: 2, make: 2, n8n: 2, sheets: 2, pub: 2, html: 2,
  js: 3, ts: 3, react: 3, next: 3, python: 3, api: 3, db: 3, auth: 3, git: 3,
};

// Radius per ring in % of the orbit container (640px). Equal counts -> even spacing per ring.
const RING_RADIUS: Record<1 | 2 | 3, number> = { 1: 14, 2: 24, 3: 33 };
// Per-ring starting angle offset so rings don't visually clump on one side.
const RING_OFFSET: Record<1 | 2 | 3, number> = { 1: -Math.PI / 2, 2: -Math.PI / 2 + Math.PI / 9, 3: -Math.PI / 2 + (2 * Math.PI) / 9 };

function buildPositions(): Record<string, { x: number; y: number; size: number }> {
  const byRing: Record<1 | 2 | 3, typeof skillNodes> = { 1: [], 2: [], 3: [] };
  for (const s of skillNodes) byRing[RING_OF[s.id]].push(s);
  const pos: Record<string, { x: number; y: number; size: number }> = {};
  ([1, 2, 3] as const).forEach((ring) => {
    const members = byRing[ring];
    const n = members.length;
    const step = (2 * Math.PI) / n;
    const r = RING_RADIUS[ring];
    const off = RING_OFFSET[ring];
    members.forEach((s, i) => {
      const angle = off + i * step;
      pos[s.id] = { x: CENTER + Math.cos(angle) * r, y: CENTER + Math.sin(angle) * r, size: 52 };
    });
  });
  return pos;
}

const positions = buildPositions();

const levelShort: Record<string, string> = {
  "Professional": "Professional",
  "Intermediate / Practical": "Intermediate / Practical",
  "AI / Practical": "AI / Practical",
  "Automation / Practical": "Automation / Practical",
  "Creative / Exploring": "Creative / Exploring",
};

export function NeonOrbit() {
  const [filter, setFilter] = useState<SkillCategory | "all">("all");
  const [active, setActive] = useState<string | null>(null);
  const visible = skillNodes.filter((s) => filter === "all" || s.category === filter);
  const activeNode = skillNodes.find((s) => s.id === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {skillCategories.map((c) => (
          <button key={c.id} onClick={() => setFilter(c.id)} className={cn("rounded-full border px-4 py-2 text-xs font-medium tracking-wider transition-all", filter === c.id ? "border-neon-cyan/70 bg-neon-cyan/10 text-neon-cyan" : "border-white/10 text-paper-dim hover:border-white/20 hover:text-paper")}>{c.label}</button>
        ))}
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-[640px]">
        {!activeNode && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 text-center">
            <p className="text-xs uppercase tracking-wider text-neon-cyan/60">Hover or tap a node · {visible.length} skills shown</p>
          </div>
        )}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <div className="absolute inset-[12%] rounded-full border border-white/5" />
          <div className="absolute inset-[26%] rounded-full border border-white/5" />
          {/* Sun-bright JOSEPH core: layered static glows */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,179,61,0.08) 20deg, transparent 60deg, rgba(61,240,255,0.07) 100deg, transparent 140deg, rgba(255,77,203,0.06) 200deg, transparent 260deg, rgba(255,179,61,0.08) 320deg, transparent 360deg)", filter: "blur(10px)" }} />
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at center, rgba(255,200,90,0.28) 0%, rgba(255,140,40,0.12) 45%, transparent 75%)", filter: "blur(8px)" }} />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at center, #fff3d4 0%, #ffc266 35%, #e8983a 65%, rgba(180,100,30,0.35) 100%)", boxShadow: "0 0 18px 4px rgba(255,200,90,0.4), 0 0 40px 12px rgba(255,160,60,0.22), 0 0 70px 24px rgba(255,120,40,0.12)" }} />
            <div className="relative h-24 w-24 rounded-full flex items-center justify-center text-center">
              <span className="font-display text-sm font-bold tracking-wider text-ink-950" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}>JOSEPH</span>
            </div>
          </div>
          {skillNodes.map((s) => {
            const p = positions[s.id] ?? { x: 50, y: 50, size: 52 };
            const isVisible = visible.some((v) => v.id === s.id);
            const dim = filter !== "all" && !isVisible;
            const isActive = active === s.id;
            // Deterministic but varied glow timing per node (hash of id).
            const seed = s.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
            const glowDur = 3.4 + (seed % 9) * 0.3; // 3.4s–6.1s
            const glowDelay = ((seed * 7) % 20) * 0.2; // 0–3.8s
            return (
            <button key={s.id}
              style={{ width: p.size, height: p.size, left: `calc(${p.x}% - ${p.size / 2}px)`, top: `calc(${p.y}% - ${p.size / 2}px)`, ["--ring" as any]: s.accent, ["--glow-dur" as any]: `${glowDur}s`, ["--glow-delay" as any]: `${glowDelay}s`, opacity: dim ? 0.12 : 1, transform: isActive ? "scale(1.15)" : "scale(1)" }}
              onMouseEnter={() => setActive(s.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(s.id)} onBlur={() => setActive(null)}
              className={cn("neon-ring absolute rounded-full border border-white/10 bg-ink-850/80 transition-[transform,opacity] duration-200", isActive && "shadow-glow z-30")}>
              <span className="neon-glow absolute inset-0 rounded-full" style={{ ["--ring" as any]: s.accent, ["--glow-dur" as any]: `${glowDur}s`, ["--glow-delay" as any]: `${glowDelay}s` }} />
              <span className="relative flex h-full w-full items-center justify-center text-center text-[10px] font-medium leading-tight px-1" style={{ color: dim ? undefined : s.accent }}>{s.short}</span>
            </button>
            );
          })}
        </div>
        {activeNode && (() => {
          const p = positions[activeNode.id];
          const popupW = 224; // w-56
          const popupH = 130; // approx natural height (p5 + content + p5)
          const pad = 12;
          const contW = 640;
          // node position in px: x% of container width
          let popL = ((p.x ?? 50) / 100) * contW - popupW / 2;
          let popT = ((p.y ?? 50) / 100) * contW - popupH / 2;
          // clamp to keep popup inside container
          popL = Math.max(pad, Math.min(pad + contW - popupW - pad, popL));
          popT = Math.max(pad, Math.min(pad + contW - popupH - pad, popT));
          return (
            <div
              style={{ left: `${popL}px`, top: `${popT}px` }}
              className="pointer-events-none absolute z-40 w-56 surface p-5 shadow-glow">
              <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: activeNode.accent, boxShadow: `0 0 12px ${activeNode.accent}` }} /><h3 className="font-display text-lg font-semibold text-paper">{activeNode.label}</h3></div>
              <p className="mt-2 text-[10px] uppercase tracking-wider" style={{ color: activeNode.accent }}>{levelShort[activeNode.level]}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{activeNode.blurb}</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}