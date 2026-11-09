import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredWork, projects } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedWork() {
  const items = featuredWork
    .map((f) => {
      const project = projects.find((p) => p.id === f.id);
      return project ? { ...f, project } : null;
    })
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-px">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">
                <span className="section-rule" />
                My Work
              </span>
              <h2 className="mt-4 font-display text-[34px] font-extrabold tracking-tighter2 text-white sm:text-[42px]">
                Recent Projects
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-paper-muted">
                A glimpse of the digital products and experiences I&apos;ve built to solve real
                problems.
              </p>
            </div>
            <Link href="/projects" className="btn-secondary self-start !px-5 !py-2.5 !text-[13px] sm:self-auto">
              View All Projects
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ project, label }, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <Link
                href={`/projects/${project.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-850 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/40 hover:shadow-glow"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  {project.previewImage ? (
                    <Image
                      src={project.previewImage}
                      alt={`${project.name} preview`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 300px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-brand-700 to-ink-900" />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
                </div>

                <div className="relative -mt-12 flex items-end justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-[15px] font-bold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-1 truncate text-[11.5px] text-paper-dim">{label}</p>
                  </div>
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/20 bg-white/[0.06] text-white transition-colors group-hover:border-brand-400 group-hover:bg-brand-500">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
