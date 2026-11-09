import Link from "next/link";
import { Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";
import { site } from "@/lib/content";

const socialIcons: Record<string, typeof Mail> = {
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
  "X / Twitter": Twitter,
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950/80">
      <div className="container-px py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Joseph Unaogu — home">
            <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-300 via-brand-500 to-brand-700 shadow-[0_10px_30px_-10px_rgba(124,77,255,0.9)]">
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
              <span className="font-display text-xl font-extrabold leading-none text-white">J</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-tight text-white">Joseph Unaogu</span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-200/75">
                Automate · Build · Grow
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              aria-label="Email Joseph"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-paper-muted transition-colors hover:border-brand-400/50 hover:text-white"
            >
              <Mail size={17} />
            </a>
            {site.socials.map((s) => {
              const Icon = socialIcons[s.label] ?? MessageCircle;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-paper-muted transition-colors hover:border-brand-400/50 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-paper-dim">
            © {new Date().getFullYear()} Joseph Unaogu. All rights reserved.
          </p>
          <p className="text-xs text-paper-dim">
            Built with care in Nigeria · <span className="text-brand-200/80">Open for new projects</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
