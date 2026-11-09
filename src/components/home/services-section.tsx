import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Globe,
  Palette,
  PenLine,
  Plug,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { homeServices } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, LucideIcon> = {
  bot: Bot,
  sparkles: Sparkles,
  globe: Globe,
  smartphone: Smartphone,
  workflow: Workflow,
  plug: Plug,
  palette: Palette,
  pen: PenLine,
  book: BookOpen,
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14">
          {/* heading */}
          <Reveal>
            <div className="text-center lg:text-left">
              <span className="eyebrow justify-center lg:justify-start">
                <span className="section-rule" />
                My Services
              </span>
              <h2 className="mt-4 font-display text-[34px] font-extrabold tracking-tighter2 text-white sm:text-[42px]">
                What I Do
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-[15.5px] leading-relaxed text-paper-muted lg:mx-0">
                Professional, affordable digital services that help you look credible, work
                smarter, and grow — without the agency price tag.
              </p>
              <Link href="/services" className="btn-secondary mt-7 !px-5 !py-2.5 !text-[13px]">
                View All Services
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          {/* tiles */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3.5">
            {homeServices.map((s, i) => {
              const Icon = icons[s.icon] ?? Sparkles;
              return (
                <Reveal key={s.id} delay={i * 0.035}>
                  <Link
                    href="/services"
                    className="glass glass-hover group flex h-full min-h-[138px] flex-col items-center justify-start gap-3 px-3 py-5 text-center"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-200 ring-1 ring-inset ring-brand-400/20 transition-colors group-hover:bg-brand-500/20 group-hover:text-white">
                      <Icon size={21} strokeWidth={1.7} />
                    </span>
                    <span className="text-[12.5px] font-semibold leading-snug text-white">
                      {s.label}
                    </span>
                    <span className="mt-auto hidden text-[10.5px] leading-snug text-paper-dim lg:block">
                      {s.note}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
