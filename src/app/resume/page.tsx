import { routeMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { PrintButton } from "@/components/contact/print-button";
import { site, aboutParagraphs, plainSkills, mainServices, extraServices, projects } from "@/lib/content";

export const metadata = routeMetadata("resume");
export default function ResumePage() {
  return <>
    <PageHeader eyebrow="Resume" title={site.name} description={`${site.role}. ${site.location}.`} />
    <div className="container page-content">
      <div className="button-row mb-8 no-print"><PrintButton /><Link href="/contact" className="text-link">Contact Joseph</Link></div>
      <article className="surface resume-sheet reading">
        <section aria-labelledby="resume-summary"><h2 id="resume-summary">Summary</h2><p className="text-muted mt-4">{aboutParagraphs[0]} My strongest areas are eBook writing, copywriting, and content.</p></section>
        <section aria-labelledby="resume-education"><h2 id="resume-education">Education</h2><p className="mt-4">Computer Science</p></section>
        <section aria-labelledby="resume-skills"><h2 id="resume-skills">Skills</h2><ul className="skill-list mt-4">{plainSkills.map((skill) => <li key={skill.title}><h3>{skill.title}</h3><p className="text-muted">{skill.body}</p></li>)}</ul></section>
        <section aria-labelledby="resume-services"><h2 id="resume-services">Services</h2><ul className="bullet-list text-muted mt-4">{[...mainServices, ...extraServices].map((service) => <li key={service.id}><strong>{service.title}</strong> — {service.summary}</li>)}</ul></section>
        <section className="resume-project-section" aria-labelledby="resume-projects"><h2 id="resume-projects">Projects</h2><ul className="resume-projects mt-4">{projects.map((project) => <li key={project.slug}><h3><Link className="text-link" href={`/work/${project.slug}`}>{project.name}</Link></h3><p className="small-text text-muted">{project.statusLabel}</p><p className="text-muted">{project.oneLiner}</p></li>)}</ul></section>
        <section aria-labelledby="resume-contact"><h2 id="resume-contact">Contact</h2><div className="stack mt-4"><p><a href={`mailto:${site.email}`} className="text-link" style={{ overflowWrap: "anywhere" }}>{site.email}</a></p><p>WhatsApp: {site.whatsappLabel}</p><p><a href={site.linkedin} className="text-link">LinkedIn: Joseph Unaogu</a></p></div></section>
      </article>
      <p className="small-text text-muted mt-6 no-print">This resume reads from the same content source as the rest of the site. Use Print / Save as PDF to download a copy.</p>
    </div>
  </>;
}
