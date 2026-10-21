import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: { absolute: "Page not found | Chenar" },
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <section className="container not-found" aria-labelledby="not-found-title">
      <span className="eyebrow">404</span>
      <h1 id="not-found-title">That page isn't here.</h1>
      <p className="text-muted">It may have moved. Try one of these:</p>
      <div className="button-row">
        <Button href="/work">
          My work
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
        <Button href="/contact" variant="secondary">
          Contact
        </Button>
        <Link href="/" className="text-link">
          Home
        </Link>
      </div>
    </section>
  );
}
