import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { ProjectPreview } from "@/components/projects/project-preview";
import { ProjectCard } from "@/components/projects/project-card";
import { getProject, getMoreProjects, projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return pageMetadata(
    `${project.name} | Chenar`,
    project.oneLiner,
    `/work/${project.slug}`,
  );
}
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <article>
      <div className="container">
        <header className="case-heading">
          <Link href="/work" className="text-link">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to all projects
          </Link>
          <h1>{project.name}</h1>
          <StatusDot status={project.status} />
          <p>{project.oneLiner}</p>
        </header>
        <figure className="m-0">
          <ProjectPreview project={project} large priority />
          {project.image.src && (
            <figcaption className="small-text text-muted mt-3">
              Homepage preview of {project.name}.
            </figcaption>
          )}
        </figure>
        <div className="case-body reading">
          <section aria-labelledby="what-it-is">
            <h2 id="what-it-is">What it is</h2>
            <p>{project.whatItIs}</p>
          </section>
          <section aria-labelledby="who-its-for">
            <h2 id="who-its-for">Who it's for</h2>
            <p>{project.whoItsFor}</p>
          </section>
          <section aria-labelledby="whats-inside">
            <h2 id="whats-inside">What's inside</h2>
            <ul className="bullet-list">
              {project.whatsInside.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          {project.stack && (
            <section aria-labelledby="tools-used">
              <h2 id="tools-used">Tools used</h2>
              <ul className="tool-list">
                {project.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <div className="button-row page-content">
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="secondary">
              <span>
                Visit the live demo
                <span className="external-note">(opens in a new tab)</span>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
          )}
          <Button
            href={`/contact?project=${encodeURIComponent(project.slug)}#project-brief`}
          >
            Ask about this project
            <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
      <section
        className="section section-rule section-soft"
        aria-labelledby="more-projects-title"
      >
        <div className="container">
          <h2 id="more-projects-title" className="mb-8">
            More projects
          </h2>
          <div className="project-grid project-grid-three">
            {getMoreProjects(project.slug).map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
