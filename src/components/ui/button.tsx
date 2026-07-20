import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";
const base = "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/60 disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  primary: "bg-neon-cyan text-ink-950 hover:shadow-glow hover:brightness-110",
  secondary: "border border-neon-cyan/30 text-paper hover:border-neon-cyan/70 hover:bg-neon-cyan/5",
  ghost: "text-paper-muted hover:text-paper",
};
const sizes: Record<Size, string> = { sm: "px-4 py-2 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
export function Button({ variant = "primary", size = "md", className, children, ...props }: { variant?: Variant; size?: Size; children: ReactNode } & ComponentProps<typeof Link>) {
  const isExternal = typeof props.href === "string" && /^https?:\/\//.test(props.href);
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
export function ButtonAction({ variant = "primary", size = "md", className, children, ...props }: { variant?: Variant; size?: Size; children: ReactNode } & ComponentProps<"button">) {
  return (<button className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</button>);
}