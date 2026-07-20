import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
export const metadata = { title: "Projects", description: "Selected personal digital products and experiments by Joseph Unaogu — websites, AI apps, dashboards, e-commerce, and media platforms." };
export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title={<>Real digital <span className="text-gradient">products & experiments.</span></>} description="A collection of personal digital products, experiments, and independently developed web experiences created to explore ideas, solve problems, and continuously improve my craft across software, AI, automation, design, and digital content." />
      <section className="relative py-8">
        <div className="container-px">
          <Reveal><p className="max-w-3xl text-sm leading-relaxed text-paper-muted">Some of these products are available for acquisition, licensing, customization, or further development depending on the project. They can also serve as foundations for businesses, startups, or organizations looking for a ready-made digital product that can be adapted to their needs. More projects are currently in development and will be added soon.</p></Reveal>
          <div className="mt-10"><ProjectGrid /></div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-850/60 p-7"><div><h3 className="font-display text-lg font-semibold text-paper">Looking for a specific kind of build?</h3><p className="mt-2 text-sm text-paper-muted">For client-style work, writing and copywriting are my most developed services.</p></div><Button href="/services" variant="secondary">View services <ArrowUpRight size={15} /></Button></div>
        </div>
      </section>
    </>
  );
}