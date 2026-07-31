import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
const groups = [
  { title: "Explore", items: [{ href: "/about", label: "About" }, { href: "/skills", label: "Skills" }, { href: "/projects", label: "Projects" }, { href: "/now", label: "Now" }] },
  { title: "Work with me", items: [{ href: "/services", label: "Services" }, { href: "/writing", label: "Writing" }, { href: "/contact", label: "Contact" }] },
];
export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="container-px py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-lg bg-neon-cyan/15 text-neon-cyan ring-1 ring-neon-cyan/30"><span className="font-display text-lg font-bold">J</span></span><span className="font-display text-base font-semibold text-paper">Joseph Unaogu</span></div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper-muted">{site.tagline}</p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-neon-cyan/90">Build. Explore. Create.</p>
          </div>
          {groups.map((g) => (<div key={g.title}><h3 className="text-xs font-medium uppercase tracking-[0.2em] text-paper-dim">{g.title}</h3><ul className="mt-4 space-y-2.5">{g.items.map((i) => (<li key={i.href}><Link href={i.href} className="text-sm text-paper-muted transition-colors hover:text-neon-cyan">{i.label}</Link></li>))}</ul></div>))}
        </div>
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${site.email}`} className="inline-flex min-w-0 items-center gap-2 break-all text-sm text-paper-muted transition-colors hover:text-neon-cyan"><Mail size={15} />{site.email}</a>
          <div className="flex flex-wrap gap-x-5 gap-y-2">{site.socials.map((s) => (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-paper-muted transition-colors hover:text-neon-cyan">{s.label}<ArrowUpRight size={13} /></a>))}</div>
        </div>
        <p className="mt-8 text-xs text-paper-dim">© {new Date().getFullYear()} Joseph Unaogu. A digital builder in motion — always learning, always building.</p>
      </div>
    </footer>
  );
}