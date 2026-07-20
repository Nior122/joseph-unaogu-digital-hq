import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { aboutParagraphs, journey } from "@/lib/content";
import { ArrowDownRight } from "lucide-react";
export const metadata = { title: "About", description: "Joseph Unaogu studied Computer Science and builds across software, AI, automation, writing, and creative technology — learning by building real things." };
export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Joseph" title={<>A curious digital builder, <span className="text-gradient">learning by making.</span></>} description="I don't want to only consume technology — I want to understand it by building with it." />
      <Section className="pt-4">
        <div className="container-px grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">{aboutParagraphs.map((p, i) => (<Reveal key={i} delay={i * 0.05}><p className="text-lg leading-relaxed text-paper-muted text-balance">{p}</p></Reveal>))}<Reveal delay={0.15}><div className="mt-4 flex flex-wrap gap-3"><Button href="/skills">Explore my skills</Button><Button href="/projects" variant="secondary">See the Lab</Button></div></Reveal></div>
          <Reveal delay={0.1}><div className="surface h-full p-7"><h3 className="font-display text-lg font-semibold text-paper">At a glance</h3><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-paper-dim">Education</dt><dd className="mt-1 text-paper">Computer Science</dd></div><div><dt className="text-paper-dim">Positioning</dt><dd className="mt-1 text-paper">Emerging digital builder & creative technologist</dd></div><div><dt className="text-paper-dim">Strongest areas</dt><dd className="mt-1 text-paper">eBook writing · Copywriting · Content</dd></div><div><dt className="text-paper-dim">Always</dt><dd className="mt-1 text-paper">Learning · Building · Experimenting</dd></div></dl><p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-paper-dim">No fake stats, no invented clients — just real, ongoing work and honest skill levels.</p></div></Reveal>
        </div>
      </Section>
      <Section className="border-t border-white/10 bg-ink-900/40 pt-20">
        <div className="container-px">
          <SectionHeader eyebrow="The Journey" title="How the path has unfolded" description="A simple, honest timeline — general phases rather than fabricated dates. The direction is what matters." />
          <ol className="relative mt-6 border-l border-neon-cyan/30 pl-8 sm:pl-12">
            {journey.map((phase, i) => (<li key={phase.id} className="relative pb-12 last:pb-0"><span className="absolute -left-[9px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-neon-cyan/60 bg-ink-950"><span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-soft-pulse shadow-[0_0_10px] shadow-neon-cyan/70" /></span><Reveal delay={i * 0.04}><div className="surface p-6"><div className="flex items-center gap-3"><span className="font-mono text-xs text-paper-dim">{String(i + 1).padStart(2, "0")}</span><h3 className="font-display text-xl font-semibold text-paper">{phase.title}</h3></div><p className="mt-3 text-sm leading-relaxed text-paper-muted">{phase.body}</p></div></Reveal></li>))}
          </ol>
          <div className="mt-12 flex items-start gap-3 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-6"><ArrowDownRight className="mt-0.5 shrink-0 text-neon-cyan" size={20} /><p className="text-sm leading-relaxed text-paper-muted"><span className="text-paper">Now —</span> continuing to learn, build, experiment, and develop stronger professional skills every week. The timeline isn't finished; it's being written.</p></div>
        </div>
      </Section>
    </>
  );
}