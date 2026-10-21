import { routeMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusDot } from "@/components/ui/status-dot";
import { nowFocus, currentlyExploring, buildingNow } from "@/lib/content";

export const metadata = routeMetadata("now");
export default function NowPage() {
  return <>
    <PageHeader eyebrow="Now" title="What I'm doing now" description="A snapshot of what I'm building and learning. This is where the work-in-progress notes live." />
    <div className="container page-content">
      <section className="reading" aria-labelledby="now-focus"><h2 id="now-focus" className="mb-6">My current focus</h2><ul className="bullet-list text-muted">{nowFocus.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="section" aria-labelledby="building-now"><h2 id="building-now" className="mb-6">Building now</h2><ul className="bullet-list text-muted reading">{buildingNow.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section aria-labelledby="exploring-now"><h2 id="exploring-now" className="mb-6">What I'm exploring</h2><ul className="service-grid list-none p-0">{currentlyExploring.map((item) => <li className="surface service-card" key={item.label}><h3>{item.label}</h3><StatusDot status={item.status} /></li>)}</ul></section>
      <p className="section-end"><Link href="/work" className="text-link">See the projects<ArrowRight size={17} aria-hidden="true" /></Link></p>
    </div>
  </>;
}
