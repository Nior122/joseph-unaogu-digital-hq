import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Writing & eBooks",
  description: "Joseph Unaogu writes across fiction, nonfiction, AI guides, productivity, psychology, relationships, and personal development — eBooks, copywriting, and editorial content.",
};
export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
