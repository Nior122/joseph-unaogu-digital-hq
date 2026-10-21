"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

import { navigation } from "@/lib/content";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 1100) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  function closeMenu() {
    setOpen(false);
  }
  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const elements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "a[href], button:not(:disabled)",
      ),
    ).filter((element) => element.getClientRects().length > 0);
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  const navigationLinks = navigation.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="nav-link"
      aria-current={
        pathname === link.href || pathname.startsWith(`${link.href}/`)
          ? "page"
          : undefined
      }
      onClick={closeMenu}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="site-header no-print">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Chenar home">
          <span className="brand-symbol" aria-hidden="true">
            c
          </span>
          Chenar
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigationLinks}
        </nav>
        <div className="header-actions">
          <Link
            href="/contact"
            className="button button-primary button-sm header-hire"
          >
            Hire me <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <button
            ref={trigger}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} aria-hidden="true" />
            Menu
          </button>
        </div>
      </div>
      {/* The dialog makes the background inert; explicit Tab wrapping also keeps focus out of browser chrome. */}
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onKeyDown={trapFocus}
        onCancel={closeMenu}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu-heading">
          <h2 id="mobile-menu-title">Menu</h2>
          <button type="button" className="menu-toggle" onClick={closeMenu}>
            <X size={18} aria-hidden="true" />
            Close menu
          </button>
        </div>
        <nav className="mobile-navigation" aria-label="Mobile navigation">
          {navigationLinks}
          <Link
            href="/contact"
            className="button button-primary"
            onClick={closeMenu}
          >
            Hire me
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
