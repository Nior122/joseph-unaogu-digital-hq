import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectGrid } from "@/components/projects/project-grid";
import { StatusDot } from "@/components/ui/status-dot";
import { currentlyExploring } from "@/lib/content";
export const metadata = { title: "The Lab", description: "Ideas Joseph Unaogu is building, testing, breaking, learning from, and improving — AI apps, automation, and digital experiments." };
export default function LabPage() {
  return (<><PageHeader eyebrow="The Lab" title={<>Ideas I'm building, testing <span className="text-gradient">& breaking.</span></>} description="A living collection of experiments. Some ship, some get archived, all teach me something. Statuses are real — updated as the work moves." />
    <section className="relative py-8"><div className="container-px">
      <SectionHeader eyebrow="Currently Exploring" title="Active threads of curiosity" />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
        {currentlyExploring.map((item, i) => (<div key={item.label} className="bg-ink-850/70 p-6"><span className="font-mono text-xs text-paper-dim">{String(i + 1).padStart(2, "0")}</span><p className="mt-3 font-display text-lg font-medium text-paper">{item.label}</p><div className="mt-3"><span className="text-xs text-paper-muted capitalize">{item.status}</span></div></div>))}
      </div>
    </div></section>
    <section className="relative py-16"><div className="container-px"><SectionHeader eyebrow="Experiments" title="The project shelf" description="Each entry shows what it is, the tech behind it, and what I learned. No fabricated results — just honest notes from the work." /><Reveal><div className="mt-8"><ProjectGrid /></div></Reveal></div></section></>);
}