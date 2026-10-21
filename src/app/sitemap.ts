import type { MetadataRoute } from "next";
import { projects, writing } from "@/lib/content";
import { absoluteUrl, seoPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.values(seoPages).map((page) => ({ url: absoluteUrl(page.path) })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
    })),
    ...writing.map((piece) => ({ url: absoluteUrl(`/writing/${piece.id}`) })),
  ];
}
