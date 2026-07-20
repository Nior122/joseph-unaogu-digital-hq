import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import ContactForm from "@/components/contact/contact-form";
import { site } from "@/lib/content";
import { Mail, Linkedin, Twitter, Briefcase, MessageCircle, ArrowUpRight } from "lucide-react";
export const metadata = { title: "Contact", description: "Have an idea? Contact Joseph Unaogu for eBook writing, copywriting, website development, AI applications, and automation work." };
const socialIcons: Record<string, typeof Mail> = { LinkedIn: Linkedin, "X / Twitter": Twitter, WhatsApp: MessageCircle };
const whatsappUrl = "https://wa.me/2347046118938";
export default function ContactPage() {
  return (<><PageHeader eyebrow="Contact" title={<>Have an idea? <span className="text-gradient">Let's build something.</span></>} description="Whether you need help turning an idea into an eBook, creating compelling copy, building a website, or exploring an AI-powered digital solution — I'd love to hear what you're working on." />
      <section className="relative py-8"><div className="container-px grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal><ContactForm /></Reveal>
        <Reveal delay={0.1}><div className="space-y-5">
          <a href={`mailto:${site.email}`} className="surface flex items-center gap-4 p-6 transition hover:border-neon-cyan/40"><span className="grid h-11 w-11 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan"><Mail size={18} /></span><div><p className="text-xs uppercase tracking-wider text-paper-dim">Email</p><p className="mt-1 text-paper">{site.email}</p></div></a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="surface flex items-center gap-4 p-6 transition hover:border-neon-green/40"><span className="grid h-11 w-11 place-items-center rounded-xl bg-neon-green/15 text-neon-green"><MessageCircle size={18} /></span><div><p className="text-xs uppercase tracking-wider text-paper-dim">WhatsApp</p><p className="mt-1 text-paper">+234 704 611 8938</p></div></a>
          <div className="surface p-6"><p className="flex items-center gap-2 text-xs uppercase tracking-wider text-paper-dim"><Briefcase size={14} /> Find me online</p><div className="mt-4 grid gap-2.5">{site.socials.map((s) => { const Icon = socialIcons[s.label] ?? Mail; return (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper-muted transition hover:border-neon-cyan/40 hover:text-paper"><span className="flex items-center gap-2.5"><Icon size={15} /> {s.label}</span><span className="text-xs text-paper-dim">{s.handle}</span></a>); })}</div><p className="mt-4 text-xs text-paper-dim">Only real profiles are shown. Links can be updated anytime.</p></div>
          <div className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-6"><p className="text-sm leading-relaxed text-paper-muted"><span className="text-paper">Book a call or chat:</span> reach me directly by email or WhatsApp and we&apos;ll figure out the best next step.</p><div className="mt-4 flex flex-wrap gap-3"><a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-paper transition hover:border-neon-cyan/40 hover:text-neon-cyan">Email me <ArrowUpRight size={14} /></a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-paper transition hover:border-neon-green/40 hover:text-neon-green">WhatsApp me <ArrowUpRight size={14} /></a></div></div>
        </div></Reveal>
      </div></section></>);
}