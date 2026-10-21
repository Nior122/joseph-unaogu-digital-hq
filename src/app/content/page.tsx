import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { services, contentSkills } from "@/lib/content";

export const metadata = { title: "YouTube and content support | Chenar", description: "YouTube scripts, Shorts, video editing, ideas, thumbnails, and content support from Joseph Unaogu." };
export default function ContentPage() {
  const service = services.find((item) => item.id === "youtube")!;
  return <>
    <PageHeader eyebrow="Content and media" title={service.title} description={service.summary} />
    <div className="container page-content">
      <section aria-labelledby="content-help-title" className="stack reading"><h2 id="content-help-title">What I can help with</h2><p className="text-muted">I plan, write, produce, and edit content. That includes faceless videos, where the presenter does not appear on camera, and short videos for YouTube.</p><ul className="bullet-list text-muted">{service.highlights.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="section" aria-labelledby="media-skills-title"><h2 id="media-skills-title" className="mb-6">Content and media skills</h2><ul className="tool-list">{contentSkills.map((item) => <li key={item.label}>{item.label}</li>)}</ul></section>
      <section className="surface service-card" aria-labelledby="content-project-title"><h2 id="content-project-title">Have a content project?</h2><p>Tell me about your audience and what you want to make.</p><Button href="/contact?service=YouTube%20content#project-brief">Start a content project<ArrowRight size={17} aria-hidden="true" /></Button><Link href="/services" className="text-link">See all services<ArrowRight size={17} aria-hidden="true" /></Link></section>
    </div>
  </>;
}
