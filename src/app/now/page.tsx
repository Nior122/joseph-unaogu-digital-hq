import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { nowFocus } from "@/lib/content";
import { Sparkles, ArrowRight } from "lucide-react";
export const metadata = { title: "Now", description: "What Joseph Unaogu is currently focused on — building digital projects, improving software skills, exploring AI and automation, creating content, and growing writing services." };
export default function NowPage() {
  return (<><PageHeader eyebrow="Now" title={<>What I'm focused on <span className="text-gradient">right now.</span></>} description="A simple, honest snapshot of current focus. Easy to update as the work shifts — this page is meant to stay current." />
      <section className="relative py-8"><div className="container-px max-w-3xl">
        <div className="mb-8 flex items-center gap-2 text-sm text-paper-dim"><span className="h-2 w-2 rounded-full bg-signal-green animate-soft-pulse" /> Updated regularly · Always learning, always building</div>
        <ul className="space-y-4">{nowFocus.map((f, i) => (<Reveal key={i} delay={i * 0.05}><li className="surface flex items-start gap-4 p-6"><span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-neon-cyan/15 text-neon-cyan"><Sparkles size={16} /></span><p className="text-base leading-relaxed text-paper-muted">{f}</p></li></Reveal>))}</ul>
        <div className="mt-12"><SectionHeader eyebrow="What this means" title="A builder in motion" description="Nothing here is finished, and that's the point. The 'Now' page reflects a person actively moving forward — not a static resume." /><div className="flex flex-wrap gap-3"><Button href="/projects">See the Lab <ArrowRight size={16} /></Button><Button href="/contact" variant="secondary">Work with me</Button></div></div>
      </div></section></>);
}