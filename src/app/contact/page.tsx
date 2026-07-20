import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import ContactForm from "@/components/contact/contact-form";
import { site } from "@/lib/content";
import { Mail, Github, Linkedin, Youtube, Twitter, Briefcase } from "lucide-react";
export const metadata = { title: "Contact", description: "Have an idea? Contact Joseph Unaogu for eBook writing, copywriting, website development, AI applications, and automation work." };
const socialIcons: Record<string, typeof Mail> = { GitHub: Github, LinkedIn: Linkedin, YouTube: Youtube, "X / Twitter": Twitter };
export default function ContactPage() {
  return (<><PageHeader eyebrow="Contact" title={<>Have an idea? <span className="text-gradient">Let's build something.</span></>} description="Whether you need help turning an idea into an eBook, creating compelling copy, building a website, or exploring an AI-powered digital solution — I'd love to hear what you're working on." />
      <section className="relative py-8"><div className="container-px grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal><ContactForm /></Reveal>
        <Reveal delay={0.1}><div className="space-y-5">
          <a href={`mailto:${site.email}`} className="surface flex items-center gap-4 p-6 transition hover:border-neon-cyan/40"><span className="grid h-11 w-11 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan"><Mail size={18} /></span><div><p className="text-xs uppercase tracking-wider text-paper-dim">Email</p><p className="mt-1 text-paper">{site.email}</p></div></a>
          <div className="surface p-6"><p className="flex items-center gap-2 text-xs uppercase tracking-wider text-paper-dim"><Briefcase size={14} /> Find me online</p><div className="mt-4 grid gap-2.5">{site.socials.map((s) => { const Icon = socialIcons[s.label] ?? Mail; return (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper-muted transition hover:border-neon-cyan/40 hover:text-paper"><span className="flex items-center gap-2.5"><Icon size={15} /> {s.label}</span><span className="text-xs text-paper-dim">{s.handle}</span></a>); })}</div><p className="mt-4 text-xs text-paper-dim">Only real profiles are shown. Links can be updated anytime.</p></div>
          <div className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-6"><p className="text-sm leading-relaxed text-paper-muted"><span className="text-paper">Typical turnaround:</span> I usually reply within a couple of days. For writing projects, I'm happy to start with a short sample.</p></div>
        </div></Reveal>
      </div></section></>);
}