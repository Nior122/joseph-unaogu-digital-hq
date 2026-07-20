import type { MetadataRoute } from "next";
const base = "https://josephunaogu.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/skills", "/projects", "/services", "/writing", "/now", "/contact", "/resume"];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: "weekly", priority: r === "" ? 1 : 0.7 }));
}