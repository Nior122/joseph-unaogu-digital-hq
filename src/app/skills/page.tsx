import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader, Section } from "@/components/ui/section";
import { NeonOrbit } from "@/components/skills/neon-orbit";
export const metadata = { title: "Skills", description: "An honest neon skill map of Joseph Unaogu — professional in writing and content, with practical, hands-on levels across software, AI, automation, and web development." };
export default function SkillsPage() {
  return (
    <>
      <PageHeader eyebrow="Skills System" title={<>Honest about where I am — <span className="text-gradient">and where I'm going.</span></>} description="I don't claim to be an expert in everything. Most technical areas are practical and developing. My writing and content work is where I operate with the most confidence." />
      <Section className="pt-4"><div className="container-px"><NeonOrbit /></div></Section>
      <Section className="border-t border-white/10 bg-ink-900/40"><div className="container-px"><SectionHeader eyebrow="Principle" title="Capable, not pretending to know it all" description="Real builders don't know everything before they start — they learn by solving problems. That's the approach behind every node above." /></div></Section>
    </>
  );
}