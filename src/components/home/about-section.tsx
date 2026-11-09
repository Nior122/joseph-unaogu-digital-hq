import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Heart,
  MapPin,
  Star,
  type LucideIcon,
} from "lucide-react";
import { aboutHighlights } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, LucideIcon> = {
  cap: GraduationCap,
  pin: MapPin,
  star: Star,
  heart: Heart,
};

export function AboutSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-px">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr_0.7fr] lg:gap-10">
          {/* photo */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
              <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] bg-brand-600/25 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-ink-850 p-1.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)]">
                <Image
                  src="/about-portrait.webp"
                  alt="Joseph Unaogu working at his laptop"
                  width={796}
                  height={598}
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="h-auto w-full rounded-[1.4rem] object-cover"
                />
                <div className="pointer-events-none absolute inset-1.5 rounded-[1.4rem] bg-gradient-to-t from-brand-900/50 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={0.06}>
            <div className="text-center lg:text-left">
              <span className="eyebrow justify-center lg:justify-start">
                <span className="section-rule" />
                About Me
              </span>
              <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.12] tracking-tighter2 text-white sm:text-[40px]">
                Turning Ideas into
                <br className="hidden sm:block" /> Powerful Solutions
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-paper-muted">
                I&apos;m Joseph Chinecherem Unaogu, a Computer Science graduate and digital
                builder. I specialise in AI, automation, and modern web solutions — helping
                individuals and businesses achieve more with less effort.
              </p>
              <Link href="/about" className="btn-primary mt-7 !px-5 !py-2.5 !text-[13px]">
                Learn More About Me
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          {/* credentials */}
          <Reveal delay={0.12}>
            <ul className="mx-auto grid max-w-md gap-5 border-t border-white/10 pt-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-1 lg:gap-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {aboutHighlights.map((h) => {
                const Icon = icons[h.icon] ?? Star;
                return (
                  <li key={h.title} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-lg bg-brand-500/15 text-brand-200 ring-1 ring-inset ring-brand-400/20">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[13.5px] font-semibold text-white">{h.title}</p>
                      <p className="mt-1 text-[12px] text-paper-dim">{h.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
