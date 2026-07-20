import { Reveal } from "@/components/ui/reveal";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/content";

export function LabGrid({ limit, className }: { limit?: number; className?: string }) {
  const items = limit ? projects.slice(0, limit) : projects;
  return (
    <div className={cn("grid gap-5 md:grid-cols-2", className)}>
      {items.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.06}>
          <article className="group surface flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-paper-dim">{p.category}</span>
              <StatusDot status={p.status} />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-paper">{p.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-paper-muted">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (<span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-paper-muted">{t}</span>))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}