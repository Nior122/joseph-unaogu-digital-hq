"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, PenLine, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button, ButtonAction } from "@/components/ui/button";
import { writing } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Writing } from "@/lib/content";

const categories = ["All", "Fiction", "Nonfiction", "AI & Tech", "Productivity", "Psychology", "Relationships", "Personal Development", "Copywriting"] as const;
type Category = (typeof categories)[number];

const heroWords = ["FICTION", "NONFICTION", "AI GUIDES", "PRODUCTIVITY", "PSYCHOLOGY", "RELATIONSHIPS", "PERSONAL DEVELOPMENT"];

const processSteps = [
  { step: "01", title: "Discovery & Brief", body: "Understanding the topic, audience, and goals before a single word is written." },
  { step: "02", title: "Research & Outline", body: "Deep research and a structured chapter outline that guides the entire project." },
  { step: "03", title: "Writing & Drafting", body: "The first complete draft — every chapter written with clarity and purpose." },
  { step: "04", title: "Review & Refine", body: "Structural editing and content polishing to strengthen the narrative." },
  { step: "05", title: "Design & Layout", body: "Cover design and interior formatting for a professional reading experience." },
  { step: "06", title: "Final Review", body: "Proofreading and quality check before publishing." },
  { step: "07", title: "Publishing & Launch", body: "KDP/Amazon formatting, metadata, and publication strategy." },
];

const coverDesigns = [
  { label: "Minimalist", accent: "#3df0ff" },
  { label: "Bold Typography", accent: "#ff4dcb" },
  { label: "Dark & Moody", accent: "#4d8bff" },
  { label: "Natural Earth", accent: "#b6ff3d" },
  { label: "Tech / Futuristic", accent: "#a974ff" },
  { label: "Editorial", accent: "#ffb13d" },
];

const categoryFilter = (w: Writing, cat: Category): boolean => {
  if (cat === "All") return true;
  if (cat === "Fiction") return w.genre === "fiction";
  if (cat === "Nonfiction") return w.genre === "nonfiction" && w.category !== "Copywriting";
  return w.category === cat;
};

function AnimatedHeroWord() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIndex((p) => (p + 1) % heroWords.length); setFade(true); }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={cn("inline-block transition-all duration-400", fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2")}>
      <span className="text-gradient">{heroWords[index]}</span>
    </span>
  );
}

function BookCover({ book, index }: { book: Writing; index: number }) {
  const accent = book.coverColor || "#3df0ff";
  const href = `/writing/${book.id}`;
  return (
    <Reveal delay={index * 0.05}>
      <Link href={href} className="group block focus-visible:outline-none" aria-label={`${book.title} — read summary`}>
        <div className="relative mx-auto flex aspect-[2/3] w-full max-w-[260px] items-center justify-center">
          {/* glow on hover */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
            style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
          />
          <div className="relative h-full w-full overflow-hidden rounded-md shadow-card ring-1 ring-white/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:ring-white/25">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="h-full w-full object-contain" loading="lazy" />
            ) : (
              <div className="flex h-full w-full flex-col justify-end bg-ink-850 p-5" style={{ boxShadow: `inset 0 0 60px ${accent}14` }}>
                <h4 className="font-display text-lg font-semibold leading-tight text-paper">{book.title}</h4>
                {book.subtitle && <p className="mt-1 text-xs leading-relaxed text-paper-muted">{book.subtitle}</p>}
              </div>
            )}
            {/* light sweep */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            {/* read indicator */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-ink-950/90 to-transparent py-3 text-[11px] font-medium uppercase tracking-wider text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Read summary <ArrowUpRight size={13} />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-display text-base font-semibold leading-snug text-paper transition-colors group-hover:text-white">{book.title}</h3>
          <div className="mt-1.5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-paper-dim">
            <span>{book.category}</span>
            <span className="h-1 w-1 rounded-full bg-paper-dim/50" />
            <span className={cn(book.status === "Published" ? "text-signal-green" : "text-paper-dim")}>{book.status}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function ProcessStep({ step, title, body, index }: { step: string; title: string; body: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <Reveal delay={index * 0.06}>
      <div ref={ref} className="flex gap-5">
        <div className="flex flex-col items-center">
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-500", visible ? "border-neon-cyan text-neon-cyan" : "border-white/10 text-paper-dim")}>
            {step}
          </div>
          {index < processSteps.length - 1 && <div className={cn("mt-1 w-px flex-1 transition-colors duration-700 delay-200", visible ? "bg-neon-cyan/30" : "bg-white/5")} />}
        </div>
        <div className="pb-10">
          <h4 className="font-display text-base font-semibold text-paper">{title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const filtered = writing.filter((w) => categoryFilter(w, activeCategory));
  const scrollToBooks = useCallback(() => {
    document.getElementById("writing-grid")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 30% 40%, #3df0ff 0%, transparent 50%), radial-gradient(circle at 70% 60%, #a974ff 0%, transparent 50%)` }} />
        <div className="container-px relative z-10">
          <Reveal>
            <span className="eyebrow mb-6 block">Writing & Editorial</span>
            <h1 className="font-display text-4xl font-semibold tracking-tighter2 text-paper text-balance sm:text-6xl md:text-8xl">
              STORIES.<br />IDEAS.<br />BOOKS.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-muted sm:text-xl">
              Writing <AnimatedHeroWord /> for curious minds. Joseph creates books, guides, and content that inform, challenge, and inspire.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonAction onClick={scrollToBooks} variant="primary">
                Browse the shelf <ArrowUpRight size={16} />
              </ButtonAction>
              <Button href="/services" variant="secondary">
                Start a Writing Project <ArrowUpRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Large portrait cover gallery */}
      <section id="writing-grid" className="relative py-8">
        <div className="container-px">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow mb-3 block">The Shelf</span>
              <h2 className="font-display text-3xl font-semibold tracking-tighter2 text-paper sm:text-4xl">Books & eBooks</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-300",
                    activeCategory === cat
                      ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30"
                      : "bg-white/5 text-paper-dim border border-transparent hover:border-white/20 hover:text-paper"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.length > 0 ? (
              filtered.map((w, i) => <BookCover key={w.id} book={w} index={i} />)
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-paper-dim">No books in this category yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* eBook Creation Process */}
      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          <SectionHeader
            eyebrow="How It Works"
            title={<><span className="text-gradient">eBook creation</span> process</>}
            description="From concept to publication — every project follows a structured process that ensures clarity, quality, and a finished product you're proud of."
          />
          <div className="mx-auto max-w-2xl">
            {processSteps.map((s, i) => (
              <ProcessStep key={s.step} step={s.step} title={s.title} body={s.body} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Cover Design */}
      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          <SectionHeader
            eyebrow="Design"
            title={<>Cover design <span className="text-gradient">explorations</span></>}
            description="Every project includes cover design. These are directions Joseph explores to match each book's tone and audience."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coverDesigns.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.05}>
                <div className="surface flex h-40 flex-col items-center justify-center overflow-hidden text-center">
                  <Sparkles size={24} className="text-paper-dim" style={{ color: d.accent }} />
                  <h4 className="mt-3 font-display text-lg font-semibold text-paper">{d.label}</h4>
                  <p className="mt-1 text-xs text-paper-dim">Cover direction</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Copywriting Section */}
      <section className="relative py-20 sm:py-28">
        <div className="container-px">
          <div className="surface overflow-hidden border-neon-magenta/10 p-8 md:p-12">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #ff4dcb, transparent)", filter: "blur(40px)" }} />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow mb-4"><PenLine size={13} /> Copywriting</span>
              <h2 className="font-display text-3xl font-semibold tracking-tighter2 text-paper sm:text-4xl">
                Words that <span className="text-gradient">connect</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-paper-muted sm:text-lg">
                Beyond books, I write copy that communicates — website content, product descriptions, email campaigns, and brand voice work. Clear, human, and built for the reader.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href="/services#copywriting" variant="secondary">
                  Explore copywriting <ArrowUpRight size={15} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container-px">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-ink-850/60 p-8">
              <div>
                <h3 className="font-display text-xl font-semibold text-paper">Have a writing project in mind?</h3>
                <p className="mt-2 max-w-lg text-sm text-paper-muted">eBooks, copy, or content — let's talk about what you need.</p>
              </div>
              <Button href="/contact" variant="primary">
                Start a conversation <ArrowUpRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
