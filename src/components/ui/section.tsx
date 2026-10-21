import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("section", className)}>
      {children}
    </section>
  );
}
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={cn("section-heading", align === "center" && "text-center")}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 id={id}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
