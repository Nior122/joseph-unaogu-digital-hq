import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCollection } from "@/components/projects/project-collection";

export const metadata = { title: "The Lab | Chenar", description: "Joseph Unaogu's projects and experiments. Explore the same project collection from the Work page." };
export default function LabPage() {
  return <>
    <PageHeader eyebrow="The Lab" title="Projects and experiments" description="The project collection now lives on the Work page. You can still browse it here, including the learning concepts and work available for customization." />
    <div className="container page-content"><p className="mb-8"><Link href="/now" className="text-link">Read what I'm building and learning now<ArrowRight size={17} aria-hidden="true" /></Link></p><section aria-labelledby="lab-projects"><h2 id="lab-projects" className="sr-only">Browse projects</h2><ProjectCollection /></section></div>
  </>;
}
