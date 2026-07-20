import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { writing } from "@/lib/content";
import { cn } from "@/lib/utils";

export function generateStaticParams() { return writing.map((w) => ({ id: w.id })); }
export function generateMetadata({ params }: { params: { id: string } }) {
  const w = writing.find((x) => x.id === params.id);
  if (!w) return { title: "Book not found" };
  return { title: w.title, description: w.summary || w.description };
}

export default function BookPage({ params }: { params: { id: string } }) {
  const book = writing.find((w) => w.id === params.id);
  if (!book) notFound();
  const accent = book.coverColor || "#3df0ff";
  const summaryParagraphs = (book.summary || book.description).split("\n\n").filter(Boolean);

  return (
    <article className="relative pt-32 sm:pt-40">
      <div className="container-px">
        <Reveal>
          <Link href="/writing" className="inline-flex items-center gap-2 text-sm text-paper-muted transition-colors hover:text-neon-cyan">
            <ArrowLeft size={15} /> Back to the shelf
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT — large portrait cover */}
          <Reveal>
            <div className="relative mx-auto flex max-w-[360px] items-center justify-center lg:sticky lg:top-28">
              <div
                className="pointer-events-none absolute -inset-6 rounded-2xl opacity-30 blur-3xl"
                style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
              />
              <div className="relative w-full overflow-hidden rounded-md shadow-card ring-1 ring-white/10">
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="h-full w-full object-contain" />
                ) : (
                  <div className="flex aspect-[2/3] w-full flex-col justify-end bg-ink-850 p-6" style={{ boxShadow: `inset 0 0 80px ${accent}14` }}>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-paper-dim"><BookOpen size={13} /> {book.category}</span>
                    <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-paper">{book.title}</h2>
                    {book.subtitle && <p className="mt-2 text-sm text-paper-muted">{book.subtitle}</p>}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* RIGHT — editorial detail */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-8">
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-paper-dim">{book.category}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-paper-dim">{book.genre}</span>
                <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-medium", book.status === "Published" ? "text-signal-green" : "text-paper-dim")}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", book.status === "Published" ? "bg-signal-green" : "bg-paper-dim")} />
                  {book.status}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-8 font-display text-4xl font-semibold leading-tight tracking-tighter2 text-paper sm:text-5xl text-balance">{book.title}</h1>
              {book.subtitle && <p className="mt-3 text-lg text-paper-muted">{book.subtitle}</p>}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5">
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan/90">Summary</h2>
                {summaryParagraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-paper-muted">{p}</p>
                ))}
              </div>
            </Reveal>

            {book.excerpt && (
              <Reveal delay={0.15}>
                <div className="mt-8 border-l-2 pl-5" style={{ borderColor: accent }}>
                  <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-paper-dim">Sample Excerpt</h2>
                  <p className="mt-3 text-base italic leading-relaxed text-paper-muted">{book.excerpt}</p>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <div className="mt-10">
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan/90">Key Themes</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {book.themes.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-paper-muted">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
                <span className="text-sm text-paper-dim">Availability:</span>
                <span className="text-sm text-paper-muted">{book.status === "Published" ? "Available now" : "In progress — updates as it develops"}</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">Commission a similar book <ArrowUpRight size={15} /></Button>
                <Button href="/writing" variant="secondary">Back to all books</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}
