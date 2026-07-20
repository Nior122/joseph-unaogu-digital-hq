"use client";
import { useEffect, useState } from "react";
import { Terminal, Cpu, Layers, Sparkles } from "lucide-react";
const lines = [
  { cmd: "build", text: "velvet-and-fade.vercel.app", tone: "text-signal-green" },
  { cmd: "explore", text: "next.js app router", tone: "text-neon-blue" },
  { cmd: "learn", text: "prompt-engineering.md", tone: "text-signal-yellow" },
  { cmd: "experiment", text: "make.com -> sheets", tone: "text-paper-muted" },
  { cmd: "write", text: "ebook-chapter-04.md", tone: "text-neon-magenta" },
];
export function HeroPanel() {
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive((v) => (v + 1) % lines.length), 1800); return () => clearInterval(t); }, []);
  return (
    <div className="surface relative overflow-hidden shadow-card">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-signal-red/70" /><span className="h-3 w-3 rounded-full bg-signal-yellow/70" /><span className="h-3 w-3 rounded-full bg-signal-green/70" />
        <span className="ml-2 inline-flex items-center gap-1.5 text-xs text-paper-dim"><Terminal size={13} /> joseph@digital-hq — live</span>
      </div>
      <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
        <div className="bg-ink-900/60 p-4"><Cpu size={16} className="text-neon-cyan" /><p className="mt-2 text-xs text-paper-dim">SYSTEM</p><p className="text-sm text-paper">digital builder</p></div>
        <div className="bg-ink-900/60 p-4"><Layers size={16} className="text-neon-violet" /><p className="mt-2 text-xs text-paper-dim">STACK</p><p className="text-sm text-paper">Next.js · AI · Auto</p></div>
      </div>
      <div className="space-y-2.5 p-5 font-mono text-sm">
        <p className="text-paper-dim"><span className="text-signal-green">$</span> whoami</p>
        <p className="text-paper">builder · writer · creator</p>
        <p className="pt-2 text-paper-dim"><span className="text-signal-green">$</span> status --now</p>
        <ul className="space-y-1.5">
          {lines.map((l, i) => (<li key={l.text} className={`flex items-center justify-between rounded-md px-2.5 py-1.5 transition-all duration-500 ${i === active ? "bg-white/5" : "opacity-60"}`}><span className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full bg-current ${l.tone}`} /><span className={l.tone}>{l.text}</span></span><span className="text-[11px] uppercase tracking-wider text-paper-dim">{l.cmd}</span></li>))}
        </ul>
        <p className="pt-2 text-paper-dim"><span className="text-signal-green">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-soft-pulse bg-neon-cyan" /></p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
    </div>
  );
}