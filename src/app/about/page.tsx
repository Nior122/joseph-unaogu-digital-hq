import { routeMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { ContactCta } from "@/components/sections/contact-cta";
import { aboutParagraphs, plainSkills, site } from "@/lib/content";

export const metadata = routeMetadata("about");
export default function AboutPage() {
  return <>
    <PageHeader eyebrow="About" title="About Joseph" description={aboutParagraphs[0]} />
    <div className="container page-content">
      <div className="about-grid">
        <section className="stack" aria-labelledby="about-approach"><h2 id="about-approach">I learn by building</h2>{aboutParagraphs.slice(1).map((paragraph) => <p key={paragraph} className="text-muted">{paragraph}</p>)}<div className="button-row"><Button href="/resume">View or save my resume</Button><Button href="/contact" variant="secondary">Contact me</Button></div></section>
        <section className="surface p-6" aria-labelledby="about-facts"><h2 id="about-facts">At a glance</h2><dl className="facts px-0 pb-0"><div><dt>Education</dt><dd>Computer Science</dd></div><div><dt>Strongest areas</dt><dd>eBook writing, copywriting, and content</dd></div><div><dt>Also build</dt><dd>Websites, AI tools, and automation workflows</dd></div><div><dt>Location</dt><dd>{site.location}</dd></div><div><dt>Contact</dt><dd><Link className="text-link" href="/contact">Email or WhatsApp</Link></dd></div></dl></section>
      </div>
      <section className="section" aria-labelledby="plain-skills"><h2 id="plain-skills" className="mb-8">Skills in plain words</h2><ul className="skill-list reading">{plainSkills.map((skill) => <li key={skill.title}><h3>{skill.title}</h3><p className="text-muted">{skill.body}</p></li>)}</ul><p className="section-end"><Link className="text-link" href="/skills">See the skills map (optional extra)<ArrowRight size={17} aria-hidden="true" /></Link></p></section>
      <ContactCta title="Hiring for a role or a project?" description="See my work and resume, or tell me what you're looking for. I'll explain where I can help." />
    </div>
  </>;
}
