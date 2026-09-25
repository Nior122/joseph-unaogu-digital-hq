"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rotatingWords } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { HeroPanel } from "./hero-panel";

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => { const t = setInterval(() => setIndex((v) => (v + 1) % rotatingWords.length), 2600); return () => clearInterval(t); }, []);
  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait">
        <motion.span key={index} initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -18, filter: "blur(6px)" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent neon-text col-start-1 row-start-1">{rotatingWords[index]}</motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-32 md:pt-40">
      <div className="container-px grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="eyebrow mb-6 animate-fade-up">Personal Digital HQ</span>
           <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tighter2 text-paper text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="animate-fade-up block" style={{ animationDelay: "0.05s" }}>I BUILD.</span>
            <span className="animate-fade-up block" style={{ animationDelay: "0.12s" }}>I EXPLORE.</span>
            <span className="animate-fade-up block text-gradient" style={{ animationDelay: "0.19s" }}>I CREATE.</span>
          </h1>
          <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-paper-muted text-balance" style={{ animationDelay: "0.26s" }}>
            I&apos;m Joseph Unaogu — a digital builder exploring software, AI, automation, writing, and creative technology. I learn by building real things and turn ideas into useful digital experiences.
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3" style={{ animationDelay: "0.34s" }}>
            <Button href="/projects" size="lg" className="w-full sm:w-auto">Explore My Work</Button>
            <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">Let&apos;s Work Together</Button>
            <Button href="/resume" variant="ghost" size="lg" className="w-full sm:w-auto">Download Resume</Button>
          </div>
          <p className="mt-8 font-mono text-sm text-paper-dim"><span className="text-neon-cyan">build.</span> explore. create.</p>
        </div>
        <div className="animate-fade-up [animation-delay:0.4s]">
          <div className="mb-4 text-2xl font-display font-semibold tracking-tight text-paper sm:text-3xl">I build <RotatingWord /></div>
          <HeroPanel />
        </div>
      </div>
    </section>
  );
}