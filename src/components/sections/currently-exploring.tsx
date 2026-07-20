import { Reveal } from "@/components/ui/reveal";
import { StatusDot } from "@/components/ui/status-dot";
import { currentlyExploring } from "@/lib/content";

export function CurrentlyExploring() {
  return (
    <section className="relative border-y border-white/10 bg-ink-900/40 py-20 sm:py-24">
      <div className="container-px">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow mb-3">Currently Exploring</span>
              <h2 className="font-display text-3xl font-semibold tracking-tighter2 text-paper sm:text-4xl">What I&apos;m into right now</h2>
            </div>
            <p className="max-w-sm text-sm text-paper-muted">This page stays alive — the list shifts as I pick up new tools, ship experiments, and follow curiosity.</p>
          </div>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {currentlyExploring.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05}>
              <div className="group h-full bg-ink-850/70 p-6 transition-colors hover:bg-ink-800/70">
                <div className="flex h-full flex-col justify-between gap-6">
                  <span className="font-mono text-xs text-paper-dim">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-lg font-medium text-paper">{item.label}</p>
                    <div className="mt-3"><StatusDot status={item.status} /></div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}