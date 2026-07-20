"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "./project-preview";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";
import { projects, projectFilters, projectMatchesFilter, type Project } from "@/lib/content";

function Card({ p, featured }: { p: Project; featured?: boolean }) {
  return (
    <Link href={`/projects/${p.id}`} className="group surface flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow" style={{ borderColor: `${p.accent}33` }}>
      <div className="overflow-hidden p-3"><div className="transition-transform duration-500 group-hover:scale-[1.03]"><ProjectPreview project={p} large={featured} /></div></div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3"><span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: p.accent }}>{p.category}</span><StatusDot status={p.status} /></div>
        <h3 className="font-display text-xl font-semibold text-paper">{p.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-paper-muted">{p.description}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">{p.tech.slice(0, 4).map((t) => (<span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-paper-muted">{t}</span>))}</div>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm" style={{ color: p.accent }}>View project <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function ProjectGrid({ initial = "all" }: { initial?: string }) {
  const [filter, setFilter] = useState(initial);
  const filtered = projects.filter((p) => projectMatchesFilter(p, filter));
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map((f) => (<button key={f.id} onClick={() => setFilter(f.id)} className={cn("rounded-full border px-4 py-2 text-xs font-medium tracking-wider transition-all", filter === f.id ? "border-neon-cyan/70 bg-neon-cyan/10 text-neon-cyan" : "border-white/10 text-paper-dim hover:border-white/20 hover:text-paper")}>{f.label}</button>))}
      </div>
      <p className="mb-6 text-xs uppercase tracking-wider text-paper-dim">{filtered.length} projects</p>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence>
          {filtered.map((p) => (<motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}><Card p={p} featured={!!p.featured} /></motion.div>))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}