import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonStyle = { variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg"; children: ReactNode };
function classes(variant: ButtonStyle["variant"] = "primary", size: ButtonStyle["size"] = "md", className?: string) {
  // Legacy ghost usages are plain links, not a third button treatment.
  return cn(variant === "ghost" ? "text-link" : ["button", `button-${variant}`, size !== "md" && `button-${size}`], className);
}
export function Button({ variant, size, className, children, ...props }: ButtonStyle & ComponentProps<typeof Link>) {
  const external = typeof props.href === "string" && /^https?:\/\//.test(props.href);
  return <Link className={classes(variant, size, className)} {...props} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</Link>;
}
export function ButtonAction({ variant, size, className, children, type = "button", ...props }: ButtonStyle & ComponentProps<"button">) {
  return <button type={type} className={classes(variant, size, className)} {...props}>{children}</button>;
}
