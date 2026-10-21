import type { ReactNode } from "react";

// Content stays visible without JavaScript. Kept as a compatibility wrapper for secondary pages.
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <div className={className}>{children}</div>;
}
