import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { NeonOrbit } from "@/components/skills/neon-orbit";
import { skillNodes, skillCategories, contentSkills } from "@/lib/content";

export const metadata = { title: "Skills map | Joseph Unaogu | Chenar", description: "An optional visual skills map and a complete plain-text skills list, with honest descriptions and skill levels." };
export default function SkillsPage() {
  return <>
    <PageHeader eyebrow="Optional extra" title="A closer look at my skills" description="Writing and content are my strongest areas. My technical skills are practical and still growing. Use the optional map or read the full list below." />
    <div className="container page-content"><Link className="text-link mb-6" href="/about"><ArrowLeft size={17} aria-hidden="true" />Back to About Joseph</Link>
      <section aria-labelledby="visual-map-title" className="visual-map-section"><h2 id="visual-map-title">The skills map</h2><NeonOrbit /></section>
      <section id="skill-list" className="section" aria-labelledby="all-skills-title"><h2 id="all-skills-title" className="mb-8">All skills, in plain text</h2><div className="static-skills">{skillCategories.filter((category) => category.id !== "all").map((category) => <section className="surface" key={category.id} aria-labelledby={`category-${category.id}`}><h3 id={`category-${category.id}`}>{category.id === "ai" ? "AI (artificial intelligence)" : category.id === "creative" ? "Content and media" : category.label.toLowerCase().replace(/^./, (letter) => letter.toUpperCase())}</h3><ul className="bullet-list">{skillNodes.filter((skill) => skill.category === category.id).map((skill) => <li key={skill.id} id={`skill-${skill.id}`}><strong>{skill.label}</strong><p className="small-text text-muted">{skill.level}</p><p className="text-muted">{skill.blurb}</p></li>)}</ul></section>)}</div></section>
      <section aria-labelledby="content-skills-title"><h2 id="content-skills-title" className="mb-6">Content and media tools</h2><ul className="tool-list">{contentSkills.map((skill) => <li key={skill.label}>{skill.label}</li>)}</ul></section>
    </div>
  </>;
}
