import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Headphones, Play, Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const trust = [
  { icon: Zap, label: "Smart Automation" },
  { icon: ShieldCheck, label: "Reliable & Secure" },
  { icon: Headphones, label: "Ongoing Support" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-10%] h-[620px] w-[620px] rounded-full bg-brand-600/25 blur-[150px]" />
        <div className="absolute left-[-15%] top-[35%] h-[420px] w-[420px] rounded-full bg-brand-800/25 blur-[140px]" />
      </div>

      <div className="container-px">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
          {/* ---------------- copy ---------------- */}
          <div className="relative z-10 text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-paper-muted backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open for new projects
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-[42px] font-extrabold leading-[1.03] tracking-tighter3 text-white sm:text-6xl lg:text-[65px]">
                Your <span className="text-brand-gradient">AI &amp; Digital</span>
                <br className="hidden sm:block" /> Solutions Partner
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-[560px] text-[16.5px] leading-relaxed text-paper-muted sm:text-lg lg:mx-0">
                I help businesses, creators, and organisations use AI, automation, and modern
                technology to work smarter, save time, and grow faster.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/services" className="btn-primary group w-full sm:w-auto">
                  <Rocket size={17} />
                  Explore My Services
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/projects" className="btn-secondary w-full sm:w-auto">
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-white/25">
                    <Play size={10} className="translate-x-px fill-current" />
                  </span>
                  View My Work
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
                {trust.map(({ icon: Icon, label }, i) => (
                  <li key={label} className="flex items-center gap-2.5">
                    <Icon size={17} className="text-brand-300" />
                    <span className="text-[13px] font-medium text-paper-muted">{label}</span>
                    {i < trust.length - 1 && <span className="ml-3 hidden h-4 w-px bg-white/15 sm:block" />}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---------------- portrait ---------------- */}
          <Reveal delay={0.1} y={24} className="relative">
            <div className="relative mx-auto w-full max-w-[500px]">
              {/* violet halo */}
              <div aria-hidden className="absolute inset-x-2 top-6 bottom-4 -z-10 rounded-[3rem] bg-brand-600/30 blur-[70px]" />
              <div aria-hidden className="absolute -right-10 -top-8 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.06] to-transparent p-1.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <Image
                    src="/hero-portrait.webp"
                    alt="Joseph Unaogu, AI and digital solutions partner"
                    width={940}
                    height={744}
                    priority
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className="h-auto w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
                </div>
              </div>

              {/* floating chips */}
              <div className="absolute -left-4 top-[18%] hidden rounded-xl border border-white/15 bg-ink-900/85 px-3.5 py-2.5 shadow-card backdrop-blur-md sm:block">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-500/20 text-brand-200">
                    <Sparkles size={14} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[11.5px] font-semibold text-white">AI &amp; Automation</p>
                    <p className="text-[10px] text-paper-dim">Built into the work</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 right-2 hidden rounded-xl border border-white/15 bg-ink-900/85 px-3.5 py-2.5 shadow-card backdrop-blur-md sm:block">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
                    <Zap size={14} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[11.5px] font-semibold text-white">Ships on time</p>
                    <p className="text-[10px] text-paper-dim">Clear, weekly updates</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-px mt-16 hidden lg:block">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-paper-dim">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
          <span>Scroll to explore</span>
          <ArrowUpRight size={13} className="text-brand-300/70" />
        </div>
      </div>
    </section>
  );
}
