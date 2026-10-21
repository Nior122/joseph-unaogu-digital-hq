import { routeMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, BookOpen, Globe2, Workflow } from "lucide-react";
import { HeroSection } from "@/components/hero/hero-section";
import { SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { mainServices, selectedProjects, projects, workSteps, homeCopy, faq } from "@/lib/content";

export const metadata = routeMetadata("home");
const icons = { web: Globe2, "ai-automation": Workflow, ebooks: BookOpen };
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="section section-rule" aria-labelledby="services-title">
        <div className="container">
          <SectionHeader id="services-title" eyebrow="What I do" title="Useful work. Clearly explained." description="AI means artificial intelligence. Automation means a tool does repeat tasks for you. Here are three ways I can help." />
          <div className="service-grid">{mainServices.map((service) => {
            const Icon = icons[service.id as keyof typeof icons];
            return <article className="surface service-card" key={service.id}><span className="service-icon"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><h3>{service.title}</h3><p>{service.cardSummary}</p><Link className="text-link" href={service.ctaHref}>{service.ctaLabel}<ArrowRight size={17} aria-hidden="true" /></Link></article>;
          })}</div>
        </div>
      </section>
      <section className="section section-soft section-rule" aria-labelledby="selected-work-title">
        <div className="container">
          <SectionHeader id="selected-work-title" eyebrow="Selected work" title="Recent projects" description="A few things I've built. Each one has a live demo you can open." />
          <div className="project-grid project-grid-three">{selectedProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
          <div className="section-end"><Button href="/work" variant="secondary">See all {projects.length} projects<ArrowRight size={18} aria-hidden="true" /></Button></div>
        </div>
      </section>
      <section className="section section-rule" aria-labelledby="process-title">
        <div className="container"><SectionHeader id="process-title" eyebrow="How it works" title="How we'd work together" /><ol className="steps">{workSteps.map((step) => <li className="step" key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol></div>
      </section>
      <section className="section section-soft section-rule" aria-labelledby="about-title">
        <div className="container about-preview"><div><span className="eyebrow">About Joseph</span><h2 id="about-title">Who you'll work with</h2></div><div className="stack"><p>{homeCopy.about}</p><Link href="/about" className="text-link">More about me<ArrowRight size={17} aria-hidden="true" /></Link></div></div>
      </section>
      <section className="section section-rule" aria-labelledby="faq-title">
        <div className="container faq-layout"><div><span className="eyebrow">A few answers</span><h2 id="faq-title" className="mt-3">Questions people ask</h2><p className="text-muted mt-5">Not sure where to start? You don't need a technical brief.</p></div><Faq items={faq} /></div>
      </section>
      <div className="container page-content"><ContactCta /></div>
    </>
  );
}
