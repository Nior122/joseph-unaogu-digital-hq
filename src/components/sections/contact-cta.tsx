import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

export function ContactCta({
  title = "Have a project in mind?",
  description = "Tell me what you need. I'll reply with how I'd approach it.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <h2 id="contact-cta-title">{title}</h2>
      <p>{description}</p>
      <div className="button-row">
        <Button href={`mailto:${site.email}`}>
          <Mail size={18} aria-hidden="true" />
          Email me
        </Button>
        <Button href={site.whatsapp} variant="secondary">
          <MessageCircle size={18} aria-hidden="true" />
          <span>
            Message on WhatsApp
            <span className="external-note">(opens in a new tab)</span>
          </span>
        </Button>
      </div>
      <Link href="/contact#project-brief" className="text-link">
        Fill in the project form <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </section>
  );
}
