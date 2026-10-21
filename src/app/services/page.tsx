import { routeMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { ContactCta } from "@/components/sections/contact-cta";
import { mainServices, extraServices, services, getProject } from "@/lib/content";

export const metadata = routeMetadata("services");
export default function ServicesPage() {
  const copywriting = services.find((service) => service.id === "copywriting")!;
  return <>
    <PageHeader eyebrow="Services" title="What I can do for you" description="Three main services, and three extras. Every project starts with a short chat so we agree on what you need." />
    <div className="container page-content">
      <p className="text-muted mb-8">AI means artificial intelligence. Automation means a tool does repeat tasks for you.</p>
      {mainServices.map((service) => <section key={service.id} id={service.id} className="surface service-detail" aria-labelledby={`service-${service.id}`}>
        <div className="stack"><h2 id={`service-${service.id}`}>{service.title}</h2><p className="text-muted">{service.summary}</p><div><h3>Good for</h3><p className="text-muted mt-2">{service.audience}</p></div><div><h3>What you get</h3><ul className="bullet-list text-muted mt-3">{service.highlights.map((item) => <li key={item}>{item}</li>)}</ul></div>{service.id === "ebooks" && <div id="copywriting"><h3>{copywriting.title}</h3><p className="text-muted mt-2">{copywriting.summary}</p></div>}<Button href={`/contact?service=${encodeURIComponent(service.contactType)}#project-brief`}>{service.cta}<ArrowRight size={17} aria-hidden="true" /></Button></div>
        <div className="service-proof stack"><h3>Examples</h3>{service.examples.length ? <ul className="list-none p-0">{service.examples.map((slug) => { const project = getProject(slug)!; return <li key={slug}><Link className="text-link" href={`/work/${slug}`}>{project.name}<ArrowRight size={16} aria-hidden="true" /></Link></li>; })}</ul> : <p>Read the book outlines and full summaries on the Writing page.</p>}<Link href={service.ctaHref} className="text-link">{service.ctaLabel}<ArrowRight size={17} aria-hidden="true" /></Link></div>
      </section>)}
      <section className="section" aria-labelledby="extra-services"><h2 id="extra-services" className="mb-8">Three extra services</h2><div className="service-grid">{extraServices.map((service) => <article className="surface service-card" id={service.id} key={service.id}><h3>{service.title}</h3><p>{service.summary}</p><Link href={service.ctaHref} className="text-link">{service.ctaLabel}<ArrowRight size={17} aria-hidden="true" /></Link><Link href={`/contact?service=${encodeURIComponent(service.contactType)}#project-brief`} className="text-link">{service.cta}<ArrowRight size={17} aria-hidden="true" /></Link></article>)}</div></section>
      <ContactCta title="Not sure what you need?" description="Describe your problem in a few sentences. I'll suggest the simplest way to solve it." />
    </div>
  </>;
}
