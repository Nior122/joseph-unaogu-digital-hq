import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Globe,
  Headset,
  Layers,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { homeStats, principles } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

const statIcons: Record<string, LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  globe: Globe,
  headset: Headset,
};

const principleIcons: Record<string, LucideIcon> = {
  compass: Compass,
  check: CheckCircle2,
  message: MessageSquare,
};

export function TrustSection() {
  return (
    <section className="relative pb-20 pt-4 sm:pb-24">
      <div className="container-px">
        {/* stat strip */}
        <Reveal>
          <div className="glass grid grid-cols-2 gap-y-8 px-6 py-8 sm:px-8 lg:grid-cols-4 lg:py-9">
            {homeStats.map((s, i) => {
              const Icon = statIcons[s.icon] ?? Sparkles;
              return (
                <div
                  key={s.label}
                  className={
                    "flex items-center justify-center gap-3.5 " +
                    (i < homeStats.length - 1 ? "lg:border-r lg:border-white/10" : "")
                  }
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-brand-500/15 text-brand-200 ring-1 ring-inset ring-brand-400/25">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-2xl font-extrabold text-white">{s.value}</p>
                    <p className="mt-1 text-[12px] text-paper-muted">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* principles — replaces fabricated testimonials with real working promises */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-12">
          <Reveal>
            <div>
              <span className="eyebrow">
                <span className="section-rule" />
                Why Work With Me
              </span>
              <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.12] tracking-tighter2 text-white sm:text-[38px]">
                Straightforward work,
                <br className="hidden sm:block" /> clearly explained.
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper-muted">
                You don&apos;t need to know the technical words. You just need to know what
                you&apos;re getting, when it arrives, and that it works.
              </p>
              <Link href="/contact" className="btn-secondary mt-7 !px-5 !py-2.5 !text-[13px]">
                Start a conversation
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {principles.map((p, i) => {
              const Icon = principleIcons[p.icon] ?? Sparkles;
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="glass glass-hover h-full p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-200 ring-1 ring-inset ring-brand-400/20">
                      <Icon size={19} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 font-display text-[16px] font-bold text-white">{p.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-paper-muted">{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
