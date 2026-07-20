import { site } from "@/lib/content";
export function JsonLd() {
  const data = { "@context": "https://schema.org", "@type": "Person", name: site.name, email: site.email, url: "https://josephunaogu.com", jobTitle: "Digital Builder", description: site.tagline, sameAs: site.socials.map((s) => s.href), knowsAbout: ["Software Development", "Artificial Intelligence", "Automation", "eBook Writing", "Copywriting", "Web Development"] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}