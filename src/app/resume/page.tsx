import Link from "next/link";
import { Download, ArrowUpRight, Printer } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/contact/print-button";
import { Reveal } from "@/components/ui/reveal";
import { site, skillNodes, services, projects, aboutParagraphs } from "@/lib/content";
export const metadata = { title: "Resume", description: "Resume of Joseph Unaogu — digital builder with strengths in eBook writing, copywriting, and practical software, AI, and automation skills." };
export default function ResumePage() {
  return (<><PageHeader eyebrow="Resume" title={<>Joseph Unaogu — <span className="text-gradient">Digital Builder.</span></>} description="A clear, honest summary of skills, services, and projects. Use your browser's print (Ctrl/Cmd + P) to save as PDF — no invented dates or credentials." />
      <section className="relative py-8"><div className="container-px max-w-3xl">
        <div className="mb-8 flex flex-wrap gap-3"><Button href="/contact"><Download size={16} /> Download Resume</Button><PrintButton /></div>
        <div className="surface space-y-8 p-8 sm:p-10">
          <header className="border-b border-white/10 pb-6"><h2 className="font-display text-2xl font-semibold text-paper">{site.name}</h2><p className="mt-1 text-sm text-paper-muted">{site.role} · {site.location}</p><p className="mt-1 text-sm text-neon-cyan">{site.email}</p></header>
          <section><h3 className="text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">Summary</h3><p className="mt-3 text-sm leading-relaxed text-paper-muted">{aboutParagraphs[0]} {aboutParagraphs[2]}</p></section>
          <section><h3 className="text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">Education</h3><p className="mt-3 text-sm text-paper">Computer Science</p></section>
          <section><h3 className="text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">Skills</h3><div className="mt-3 space-y-2.5">{["writing","software","ai","automation","creative"].map((cat) => { const items = skillNodes.filter((s) => s.category === cat); return (<div key={cat} className="text-sm"><span className="text-paper capitalize">{cat}</span><p className="text-paper-muted">{items.map((i) => i.label).join(", ")}</p></div>); })}</div></section>
          <section><h3 className="text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">Services</h3><ul className="mt-3 space-y-1.5 text-sm text-paper-muted">{services.map((s) => (<li key={s.id}><span className="text-paper">{s.title}</span> — {s.summary}</li>))}</ul></section>
          <section><h3 className="text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">Projects & Experiments</h3><ul className="mt-3 space-y-2.5 text-sm">{projects.map((p) => (<li key={p.id}><span className="text-paper">{p.name}</span><span className="text-paper-dim"> ({p.availability})</span><p className="text-paper-muted">{p.description}</p></li>))}</ul></section>
          <section className="border-t border-white/10 pt-6"><h3 className="text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">Connect</h3><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">{site.socials.map((s) => (<span key={s.label} className="text-paper-muted">{s.label}: <span className="text-paper-dim">{s.handle}</span></span>))}</div></section>
        </div>
        <p className="mt-6 text-xs text-paper-dim">This resume is generated from the same content source as the rest of the site, so it stays in sync as Joseph updates his work.</p>
      </div></section></>);
}