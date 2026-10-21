import { ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroParagraph, homeCopy } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="container">
        <span className="eyebrow">Chenar · Joseph Unaogu</span>
        <h1 id="home-title">{homeCopy.headline}</h1>
        <p className="hero-copy">{heroParagraph}</p>
        <div className="button-row">
          <Button href="/contact" size="lg">
            Hire me <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
          <Button href="/work" variant="secondary" size="lg">
            See my work <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
        <p className="hero-meta">
          <Globe2 size={18} aria-hidden="true" />
          <span>{homeCopy.location}</span>
        </p>
      </div>
    </section>
  );
}
