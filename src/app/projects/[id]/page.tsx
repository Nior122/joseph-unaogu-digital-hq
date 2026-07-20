import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { StatusDot } from "@/components/ui/status-dot";
import { Button } from "@/components/ui/button";
import { ProjectPreview } from "@/components/projects/project-preview";
import { projects } from "@/lib/content";
export function generateStaticParams() { return projects.map((p) => ({ id: p.id })); }
export function generateMetadata({ params }: { params: { id: string } }) { const p = projects.find((x) => x.id === params.id); if (!p) return { title: "Project not found" }; return { title: p.name, description: p.description }; }
const blocks: { key: "problem" | "approach" | "lessons"; label: string; sub: string }[] = [
  { key: "problem", label: "The Problem", sub: "What was I actually trying to solve?" },
  { key: "approach", label: "The Approach", sub: "How I went about it." },
  { key: "lessons", label: "The Learning", sub: "What the build taught me." },
];
export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();
  return (
    <article className="relative pt-32 sm:pt-40">
      <div className="container-px">
        <Reveal><Link href="/projects" className="inline-flex items-center gap-2 text-sm text-paper-muted transition-colors hover:text-neon-cyan"><ArrowLeft size={15} /> All projects</Link></Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col gap-5 border-b border-white/10 pb-10">
            <div className="flex items-center gap-3"><span className="font-mono text-xs uppercase tracking-wider" style={{ color: project.accent }}>{project.category}</span><StatusDot status={project.status} /></div>
            <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tighter2 text-paper sm:text-6xl text-balance">{project.name}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-paper-muted text-balance">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">{project.tech.map((t) => (<span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-paper-muted">{t}</span>))}</div>
            <p className="text-sm text-paper-dim">Role: <span className="text-paper-muted">{project.role}</span> · Availability: <span className="text-paper-muted">{project.availability}</span> · {project.health === "AUTH_REQUIRED" ? "Private Preview" : project.health}</p>
          </div>
        </Reveal>
        <div className="py-10">
          <ProjectPreview project={project} large className="shadow-card" />
          <p className="mt-3 text-center text-xs text-paper-dim">
            Live preview captured from {project.url.replace("https://", "")}
            {project.lastPreview ? ` · preview updated ${project.lastPreview}` : " · preview auto-generated"}
          </p>
        </div>
        <div className="grid gap-12 pb-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            {blocks.map((b, i) => (<Reveal key={b.key} delay={i * 0.05}><div><h2 className="font-display text-xl font-semibold text-paper">{b.label}</h2><p className="mt-1 text-xs uppercase tracking-wider text-paper-dim">{b.sub}</p><p className="mt-3 text-sm leading-relaxed text-paper-muted">{project[b.key]}</p></div></Reveal>))}
          </div>
          <Reveal delay={0.1}>
            <div className="surface h-full p-7">
              <h3 className="font-display text-lg font-semibold text-paper">The Idea</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{project.description} It started as a question: can I make something genuinely useful here, even at a practical skill level? The answer is usually — build the smallest real version and learn from it.</p>
              <div className="mt-7 border-t border-white/10 pt-6"><p className="text-xs uppercase tracking-wider text-paper-dim">Status & Availability</p><div className="mt-2 flex flex-wrap items-center gap-3"><StatusDot status={project.status} /><span className="text-sm text-paper-muted">{project.availability}</span></div></div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={project.url}>Visit live site <ExternalLink size={15} /></Button>
                {project.repo ? (<Button href={project.repo} variant="secondary">GitHub <ArrowUpRight size={15} /></Button>) : (<span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-paper-muted">Repo private</span>)}
              </div>
              <p className="mt-5 text-xs text-paper-dim">No fabricated metrics — this is a real, evolving project. Last checked: {project.lastChecked}.</p>
            </div>
          </Reveal>
        </div>
        <Reveal><div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-12"><p className="font-display text-lg text-paper">Want something similar built?</p><Button href="/contact">Let's talk</Button></div></Reveal>
      </div>
    </article>
  );
}