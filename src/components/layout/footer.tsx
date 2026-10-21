import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site, navigation } from "@/lib/content";

const links = [
  ...navigation.map(({ href, label }) => [href, label]), ["/resume", "Resume"],
  ["/now", "What I'm doing now"],
];
export function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="container">
        <div className="footer-top">
          <div><Link className="brand" href="/">Chenar<span className="sr-only"> home</span></Link><p className="footer-description">Joseph Unaogu.<br />Websites, automation, and writing.<br />Based in Nigeria. Working worldwide.</p><a className="text-link small-text" href={`mailto:${site.email}`} style={{ overflowWrap: "anywhere" }}>{site.email}</a></div>
          <nav aria-label="Footer navigation"><ul className="footer-links">{links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
        </div>
        <div className="footer-bottom"><p>© Chenar</p><div className="footer-socials">{site.socials.filter((social) => social.label !== "WhatsApp").map((social) => <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">{social.label === "X / Twitter" ? "X" : social.label}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div></div>
      </div>
    </footer>
  );
}
