import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import type { ReactNode } from "react";
export function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return <section id={id} className={cn("relative py-20 sm:py-28", className)}>{children}</section>;
}
export function SectionHeader({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: ReactNode; description?: ReactNode; align?: "left" | "center" }) {
  return (<Reveal><div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>{eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}<h2 className="font-display text-3xl font-semibold tracking-tighter2 text-paper sm:text-4xl md:text-5xl text-balance">{title}</h2>{description && <p className="mt-5 text-base leading-relaxed text-paper-muted sm:text-lg text-balance">{description}</p>}</div></Reveal>);
}