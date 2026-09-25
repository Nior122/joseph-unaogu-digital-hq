"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = ["dark", "light", "midnight", "forest", "sunset"];

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={cn("grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-paper-dim", className)}>
        <Palette size={18} />
      </button>
    );
  }

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme || "dark");
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn("grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-paper-dim hover:text-paper hover:bg-white/5 transition-colors", className)}
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={`Current theme: ${theme}. Click to change.`}
    >
      <Palette size={18} />
    </button>
  );
}
