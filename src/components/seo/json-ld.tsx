import { mainServices, extraServices, site } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export function JsonLd() {
  const personId = absoluteUrl("/about#joseph");
  const agencyId = absoluteUrl("/#chenar");
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: absoluteUrl("/about"),
        email: site.email,
        description:
          "Founder of Chenar. Builds websites and automation tools and writes eBooks and copy.",
        jobTitle: site.role,
        worksFor: { "@id": agencyId },
        address: { "@type": "PostalAddress", addressCountry: "NG" },
        sameAs: [site.linkedin, site.x],
        knowsAbout: [
          "Computer Science",
          "Website development",
          "AI automation",
          "eBook writing",
          "Copywriting",
          "Content creation",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": agencyId,
        name: site.brand,
        url: absoluteUrl("/"),
        email: site.email,
        description: site.tagline,
        founder: { "@id": personId },
        image: absoluteUrl("/opengraph-image"),
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "NG" },
        serviceType: [...mainServices, ...extraServices].map(
          (service) => service.title,
        ),
        sameAs: [site.linkedin, site.x, site.whatsapp],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
