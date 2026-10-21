import type { Metadata } from "next";

const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://josephportifolio.vercel.app";
const parsedUrl = new URL(configuredUrl);
if (
  !["http:", "https:"].includes(parsedUrl.protocol) ||
  parsedUrl.username ||
  parsedUrl.password
)
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an http(s) site URL without credentials.",
  );
export const siteUrl = parsedUrl.origin;
export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
function shorten(text: string, length: number) {
  if (text.length <= length) return text;
  const shortened = text.slice(0, length - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > length * 0.7 ? lastSpace : undefined)}…`;
}
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const shortTitle = shorten(title, 60);
  const shortDescription = shorten(description, 155);
  return {
    title: { absolute: shortTitle },
    description: shortDescription,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: absoluteUrl(path),
      siteName: "Chenar",
      title: shortTitle,
      description: shortDescription,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Chenar by Joseph Unaogu — Websites, AI automation, and writing",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Bigcherem",
      title: shortTitle,
      description: shortDescription,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
export const seoPages = {
  home: {
    title: "Chenar | Websites, AI Automation & Writing",
    description:
      "Joseph Unaogu builds websites and automation tools and writes eBooks and copy for businesses. See projects and get in touch.",
    path: "/",
  },
  work: {
    title: "Projects | Chenar by Joseph Unaogu",
    description:
      "16 projects: online stores, business sites, AI tools, dashboards, and 3D learning experiences. Open any live demo.",
    path: "/work",
  },
  services: {
    title: "Services | Chenar by Joseph Unaogu",
    description:
      "Website development, AI automation, eBook writing, copywriting, cover design, and YouTube content support.",
    path: "/services",
  },
  about: {
    title: "About Joseph Unaogu | Chenar",
    description:
      "Joseph Unaogu studied Computer Science and builds websites and automation tools and writes eBooks and copy. Based in Nigeria, working worldwide.",
    path: "/about",
  },
  writing: {
    title: "Writing & eBooks | Chenar",
    description:
      "eBooks, copywriting samples, and the process behind each book, from outline to Amazon KDP launch.",
    path: "/writing",
  },
  contact: {
    title: "Contact Chenar | Hire Joseph Unaogu",
    description:
      "Send a short brief, or reach Joseph by email, WhatsApp, or LinkedIn.",
    path: "/contact",
  },
  resume: {
    title: "Joseph Unaogu — Resume | Chenar",
    description:
      "Joseph Unaogu's skills, education, services, and projects. View the resume or print and save it as a PDF.",
    path: "/resume",
  },
  now: {
    title: "What I'm doing now | Chenar",
    description:
      "Joseph Unaogu's current focus, projects in progress, and topics he is learning about.",
    path: "/now",
  },
  skills: {
    title: "Skills map | Joseph Unaogu | Chenar",
    description:
      "An optional visual skills map and a complete plain-text skills list, with honest descriptions and skill levels.",
    path: "/skills",
  },
  content: {
    title: "YouTube and content support | Chenar",
    description:
      "YouTube scripts, Shorts, video editing, ideas, thumbnails, and content support from Joseph Unaogu.",
    path: "/content",
  },
  lab: {
    title: "The Lab | Chenar",
    description:
      "Joseph Unaogu's projects and experiments. Explore the same project collection from the Work page.",
    path: "/lab",
  },
} as const;
export function routeMetadata(page: keyof typeof seoPages) {
  const { title, description, path } = seoPages[page];
  return pageMetadata(title, description, path);
}
