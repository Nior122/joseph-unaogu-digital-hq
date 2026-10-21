import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { projects, writing } from "@/lib/content";

export const metadata = { title: "Content reference | Chenar", robots: { index: false, follow: false } };
export default function AdminPage() {
  return <>
    <PageHeader eyebrow="Read-only reference" title="How to update the site" description="This is a content reference, not a signed-in dashboard. It does not collect credentials or provide editing access." />
    <div className="container page-content stack reading">
      <section className="surface service-card"><h2>One content source</h2><p>Site facts, contact links, skills, services, current focus, projects, and writing live in <code>src/lib/content.ts</code>. Update that file to keep the public pages and resume in sync.</p></section>
      <section className="surface service-card"><h2>Projects and screenshots</h2><p>There are {projects.length} projects in the shared source. Each supports a name, type, status, summary, audience, features, tools, live URL, and local screenshot.</p><p>Only existing files in <code>public/projects/</code> are used. Projects without a local screenshot show an honest text fallback. There are no request-time screenshot services or screenshot warmup hooks.</p><ul className="bullet-list">{projects.map((project) => <li key={project.slug}>{project.name}: {project.image.src ? "local screenshot" : "no local screenshot"}</li>)}</ul></section>
      <section className="surface service-card"><h2>Writing and covers</h2><p>The {writing.length} writing entries retain their original titles, subtitles, author, genres, categories, full summaries, themes, writing statuses, optional excerpts, and original cover URLs. A remote cover that fails to load gets a text fallback.</p><p>No CMS, authentication, or email delivery service is connected. These are future setup choices, not existing features.</p></section>
      <Link href="/work" className="text-link">View the work collection</Link>
    </div>
  </>;
}
