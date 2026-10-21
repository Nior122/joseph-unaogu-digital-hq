import { projects, type ProjectFilter } from "@/lib/content";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectGrid } from "@/components/projects/project-grid";

/** Cards render on the server; only the small filter control needs client JavaScript. */
export function ProjectCollection({
  initial = "all",
}: {
  initial?: ProjectFilter;
}) {
  return (
    <ProjectGrid
      key={initial}
      initial={initial}
      items={projects.map((project) => ({
        slug: project.slug,
        type: project.type,
        card: <ProjectCard project={project} />,
      }))}
    />
  );
}
