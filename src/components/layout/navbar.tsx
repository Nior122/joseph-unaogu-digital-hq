"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Joseph Unaogu — home">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-300 via-brand-500 to-brand-700 shadow-[0_10px_30px_-10px_rgba(124,77,255,0.9)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
        <span className="font-display text-[19px] font-extrabold leading-none text-white">J</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-extrabold tracking-tight text-white">Joseph Unaogu</span>
        <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-brand-200/80">
          Automate · Build · Grow
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-px flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("nav-link", isActive(l.href) && "nav-link-active")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="btn-primary !px-5 !py-2.5 !text-[13px]">
            Let&apos;s Talk
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/contact" className="btn-primary hidden !px-4 !py-2 !text-xs sm:inline-flex">
            Let&apos;s Talk
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/[0.03] text-paper"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-white/[0.07] bg-ink-950/95 backdrop-blur-xl lg:hidden"
        >
          <div className="container-px grid gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors",
                  isActive(l.href)
                    ? "bg-brand-500/15 text-white"
                    : "text-paper-muted hover:bg-white/[0.04] hover:text-white"
                )}
              >
                {l.label}
                <ArrowUpRight size={16} className="opacity-40" />
              </Link>
            ))}
            <p className="mt-3 px-4 text-xs text-paper-dim">
              Available for new projects · Nigeria · Worldwide
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
