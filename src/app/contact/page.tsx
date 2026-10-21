import { routeMetadata } from "@/lib/seo";
import { ArrowUpRight, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/contact/contact-form";
import { site, getProject, contactProjectTypes } from "@/lib/content";

export const metadata = routeMetadata("contact");
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ project?: string; service?: string }> }) {
  const query = await searchParams;
  const project = query.project ? getProject(query.project) : undefined;
  const initialService = query.service && contactProjectTypes.includes(query.service) ? query.service : project?.type === "ai-automation" ? "AI automation" : project?.type === "website" ? "Website" : "Not sure";
  return <>
    <PageHeader eyebrow="Contact" title="Let's talk about your project" description="Tell me what you need. I'll reply by email or WhatsApp." />
    <div className="container page-content">
      <nav className="contact-options" aria-label="Ways to contact Joseph">
        <a className="surface contact-option" href={`mailto:${site.email}`}><strong><Mail size={22} aria-hidden="true" />Email</strong><span>{site.email}</span></a>
        <a className="surface contact-option" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><strong><MessageCircle size={22} aria-hidden="true" />WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></strong><span>{site.whatsappLabel}</span><span className="external-note">(opens in a new tab)</span></a>
        <a className="surface contact-option" href={site.linkedin} target="_blank" rel="noopener noreferrer"><strong><Linkedin size={22} aria-hidden="true" />LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></strong><span>Joseph Unaogu</span><span className="external-note">(opens in a new tab)</span></a>
      </nav>
      <section id="project-brief" aria-labelledby="project-brief-title"><h2 id="project-brief-title">Or send a short project brief</h2><p className="brief-intro">No technical words needed. Share what you want to make or the problem you want to solve.</p><ContactForm key={`${project?.slug ?? "general"}-${initialService}`} project={project ? { slug: project.slug, name: project.name } : undefined} initialService={initialService} /></section>
    </div>
  </>;
}
