import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/projects/project-preview";
import { StatusDot } from "@/components/ui/status-dot";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <ProjectPreview project={project} />
      <div className="project-card-content">
        <StatusDot status={project.status} />
        <h3>{project.name}</h3>
        <p>{project.oneLiner}</p>
        <Link className="text-link" href={`/work/${project.slug}`}>View {project.name}<ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
