import { routeMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCollection } from "@/components/projects/project-collection";
import { ContactCta } from "@/components/sections/contact-cta";
import { projects, projectCategoryFromParam } from "@/lib/content";

export const metadata = routeMetadata("work");
export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; category?: string }>;
}) {
  const query = await searchParams;
  const initial = projectCategoryFromParam(query.type ?? query.category);
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="My work"
        description={`${projects.length} projects I've built. Most are available for customization, which means they can be adapted to your business. Open any project to see what it does and try the live demo.`}
      />
      <section
        className="container page-content"
        aria-labelledby="browse-projects-title"
      >
        <h2 id="browse-projects-title" className="sr-only">
          Browse projects
        </h2>
        <ProjectCollection initial={initial} />
        <p className="section-end text-muted">More projects are being added.</p>
      </section>
      <div className="container page-content">
        <ContactCta />
      </div>
    </>
  );
}
