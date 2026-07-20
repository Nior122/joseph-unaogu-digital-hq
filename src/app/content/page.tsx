import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play } from "lucide-react";
import { contentSkills } from "@/lib/content";
export const metadata = { title: "Content & Media", description: "Joseph Unaogu develops digital content from idea to finished visual experience — YouTube, Shorts, video editing, animation, and AI-assisted content systems." };
export default function ContentPage() {
  return (<>
    <PageHeader eyebrow="Content & Media" title={<>Ideas, turned into <span className="text-gradient">visual stories.</span></>} description="I develop digital content from idea to finished visual experience — combining storytelling, research, AI tools, visual design, video editing, and content systems." />
    <section className="relative py-8"><div className="container-px">
      <Reveal><div className="surface p-7 md:p-9">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neon-amber/40 bg-neon-amber/10 text-neon-amber"><Play size={18} /></span>
          <div>
            <h2 className="font-display text-xl font-semibold text-paper">YouTube & Content Creation</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-paper-muted">From faceless YouTube channels to Shorts, I plan, script, produce, and edit content using AI-assisted workflows — then package it into repeatable content systems that keep publishing consistent.</p>
          </div>
        </div>
      </div></Reveal>
      <div className="mt-12">
        <SectionHeader eyebrow="Capabilities" title={<>What I can <span className="text-gradient">build with you.</span></>} />
        <div className="mt-8 flex flex-wrap gap-3">
          {contentSkills.map((s, i) => (<Reveal key={s.label} delay={i * 0.03}><span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-paper-muted transition-all duration-300 hover:border-neon-amber/40 hover:text-paper">{s.label}</span></Reveal>))}
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-850/60 p-7">
        <div><h3 className="font-display text-lg font-semibold text-paper">Want content for your brand or idea?</h3><p className="mt-2 text-sm text-paper-muted">YouTube, Shorts, or a full content system — let's talk.</p></div>
        <Button href="/contact">Start a content project <ArrowUpRight size={16} /></Button>
      </div>
    </div></section>
  </>);
}
