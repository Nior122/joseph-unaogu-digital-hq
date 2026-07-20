"use client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
export function Marquee({ items, reverse = false, className }: { items: ReactNode[]; reverse?: boolean; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("group relative overflow-hidden line-mask", className)}>
      <div className={cn("flex w-max gap-8 whitespace-nowrap will-change-transform", reverse ? "animate-marquee-rev" : "animate-marquee") + " group-hover:[animation-play-state:paused]"}>
        {doubled.map((it, i) => (<span key={i} className="flex items-center gap-8 text-sm font-medium tracking-[0.2em] text-paper-dim">{it}<span className="text-neon-cyan/60">•</span></span>))}
      </div>
    </div>
  );
}