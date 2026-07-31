import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/hero/hero-section";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { ExploreCta } from "@/components/sections/explore-cta";
import { site, marqueeItems, currentlyExploring, buildingNow, ideaToBuild, services } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="border-y border-white/10 bg-ink-900/40 py-5"><Marquee items={marqueeItems} /></div>

      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          <SectionHeader eyebrow="Currently Exploring" title="What I'm into right now" description="This page stays alive — the list shifts as I pick up new tools, ship experiments, and follow curiosity." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {currentlyExploring.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.05}><div className="group h-full bg-ink-850/70 p-6 transition-colors hover:bg-ink-800/70"><div className="flex h-full flex-col justify-between gap-6"><span className="font-mono text-xs text-paper-dim">{String(i + 1).padStart(2, "0")}</span><div><p className="font-display text-lg font-medium text-paper">{item.label}</p><div className="mt-3"><StatusDot status={item.status} /></div></div></div></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-y border-white/10"><Marquee items={[...marqueeItems].reverse()} reverse /></div>

      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          <SectionHeader eyebrow="Building Now" title="Currently building" description="A live-feeling snapshot of what's in motion this week." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {buildingNow.map((b, i) => (<Reveal key={i} delay={i * 0.04}><li className="surface flex items-center gap-3 p-4"><span className="h-2.5 w-2.5 rounded-full bg-neon-cyan animate-soft-pulse shadow-[0_0_10px] shadow-neon-cyan/60" /><span className="text-paper-muted">{b}</span></li></Reveal>))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          <div className="mb-10">
            <SectionHeader
              eyebrow="The Lab"
              title="Ideas I'm building, testing & learning from"
              description="A living collection of experiments — some ship, some break, all teach me something. Real builders learn by solving problems."
            />
          </div>
          <ExploreCta />
        </div>
      </section>

      <div className="border-y border-white/10"><Marquee items={marqueeItems} /></div>

      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          <SectionHeader eyebrow="From Idea to Build" title="How I turn ideas into things" description="A simple, repeatable loop I use for almost everything I make." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {ideaToBuild.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.06}><div className="surface h-full p-6"><span className="font-display text-3xl font-semibold text-neon-cyan/80">{s.step}</span><h3 className="mt-3 font-display text-lg font-semibold text-paper">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-paper-muted">{s.body}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-ink-900/40 py-20 sm:py-28">
        <div className="container-px">
          <SectionHeader eyebrow="Services" title="How we could work together" description="My strongest, most confident services come first. Technical areas like AI and automation are offered honestly as growing, practical capabilities." />
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (<Reveal key={s.id} delay={i * 0.05}><Link href={`/services#${s.id}`} className="group surface flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/40" style={{ borderColor: `${s.accent}33` }}><h3 className="font-display text-xl font-semibold text-paper">{s.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-paper-muted">{s.summary}</p><span className="mt-5 inline-flex items-center gap-1.5 text-sm" style={{ color: s.accent }}>{s.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></Link></Reveal>))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-ink-900/40 py-24">
        <div className="container-px text-center">
          <Reveal><span className="eyebrow mb-5 justify-center">Let's build</span><h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tighter2 text-paper sm:text-5xl text-balance">Have an idea? Let's build something useful.</h2><p className="mx-auto mt-6 max-w-xl text-lg text-paper-muted text-balance">eBook, copy, website, or an AI-powered experiment — I'd love to hear what you're working on.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Button href="/contact" size="lg" className="w-full sm:w-auto">Start a conversation</Button><Button href="/now" variant="secondary" size="lg" className="w-full sm:w-auto">See what I'm doing now</Button></div><p className="mt-8 font-mono text-sm text-paper-dim">{site.email}</p></Reveal>
        </div>
      </section>
    </>
  );
}