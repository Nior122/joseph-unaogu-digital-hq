import { routeMetadata } from "@/lib/seo";
export const metadata = routeMetadata("writing");
export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
