"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/content";
const links = [
  { href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" }, { href: "/services", label: "Services" }, { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" }, { href: "/contact", label: "Contact" },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  // Close the mobile menu if the viewport grows past the lg breakpoint.
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", (scrolled || open) ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent")}>
      <nav className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-neon-cyan/15 text-neon-cyan ring-1 ring-neon-cyan/30 transition group-hover:bg-neon-cyan/25"><span className="font-display text-lg font-bold">J</span></span>
          <span className="font-display text-base font-semibold tracking-tight text-paper">Joseph Unaogu</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => { const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href); return (<Link key={l.href} href={l.href} className={cn("rounded-full px-3.5 py-2 text-sm transition-colors", active ? "text-neon-cyan" : "text-paper-dim hover:text-paper")}>{l.label}</Link>); })}
          <Link href="/contact" className="ml-2 rounded-full bg-neon-cyan px-4 py-2 text-sm font-medium text-ink-950 transition hover:brightness-110">Let&apos;s talk</Link>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-paper lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </nav>
      {open && (<div id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"><div className="container-px grid gap-1 py-4">{links.map((l) => { const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href); return (<Link key={l.href} href={l.href} className={cn("rounded-lg px-4 py-3 text-sm transition-colors", active ? "bg-white/5 text-neon-cyan" : "text-paper-muted hover:bg-white/5 hover:text-paper")}>{l.label}</Link>); })}<Link href="/contact" className="mt-2 rounded-lg bg-neon-cyan px-4 py-3 text-center text-sm font-medium text-ink-950">Let&apos;s talk</Link><p className="break-all px-4 pt-3 text-xs text-paper-dim">{site.email}</p></div></div>)}
    </header>
  );
}