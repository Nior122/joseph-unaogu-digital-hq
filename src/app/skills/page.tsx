import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader, Section } from "@/components/ui/section";
import { NeonOrbit } from "@/components/skills/neon-orbit";
import { Reveal } from "@/components/ui/reveal";
import { contentSkills } from "@/lib/content";
export const metadata = { title: "Skills", description: "An honest neon skill map of Joseph Unaogu — professional in writing and content, with practical, hands-on levels across software, AI, automation, web development, and content creation." };
export default function SkillsPage() {
  return (
    <>
      <PageHeader eyebrow="Skills System" title={<>Honest about where I am — <span className="text-gradient">and where I'm going.</span></>} description="I don't claim to be an expert in everything. Most technical areas are practical and developing. My writing and content work is where I operate with the most confidence." />
      <Section className="pt-4"><div className="container-px"><NeonOrbit /></div></Section>
      <Section className="border-t border-white/10 bg-ink-900/40"><div className="container-px">
        <SectionHeader eyebrow="Content & Media" title={<>Skills beyond the <span className="text-gradient">orbit.</span></>} description="A growing area of the portfolio — YouTube, video, animation, and AI-assisted content creation, developed from idea to finished visual experience." />
        <div className="mt-8 flex flex-wrap gap-3">
          {contentSkills.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.03}>
              <span className="group inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-paper-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-amber/50 hover:text-paper" style={{ boxShadow: "0 0 0 0 rgba(255,177,61,0)" }}>
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div></Section>
      <Section className="border-t border-white/10 bg-ink-900/40"><div className="container-px"><SectionHeader eyebrow="Principle" title="Capable, not pretending to know it all" description="Real builders don't know everything before they start — they learn by solving problems. That's the approach behind every node above." /></div></Section>
    </>
  );
}
