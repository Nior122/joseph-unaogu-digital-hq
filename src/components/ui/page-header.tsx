import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
export function PageHeader({ eyebrow, title, description, className }: { eyebrow?: string; title: ReactNode; description?: ReactNode; className?: string }) {
  return (<header className={cn("relative overflow-hidden pb-12 pt-32 sm:pt-40", className)}><div className="container-px"><Reveal>{eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}<h1 className="max-w-4xl font-display text-3xl font-semibold leading-[1.05] tracking-tighter2 text-paper sm:text-6xl text-balance">{title}</h1>{description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-muted text-balance">{description}</p>}</Reveal></div></header>);
}