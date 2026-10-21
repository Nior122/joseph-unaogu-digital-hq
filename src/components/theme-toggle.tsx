"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  const Icon = dark ? Sun : Moon;
  return (
    <button
      type="button"
      className={cn("theme-toggle", className)}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
      disabled={!mounted}
    >
      <Icon size={18} aria-hidden="true" />
      <span className="theme-label">
        {mounted ? (dark ? "Light" : "Dark") : "Theme"}
      </span>
    </button>
  );
}
