"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { screenshotUrl, type Project } from "@/lib/content";

export function ProjectPreview({
  project,
  className,
  large = false,
}: {
  project: Project;
  className?: string;
  large?: boolean;
}) {
  // Priority 1: real screenshot. Priority 2: manual upload. Else: designed fallback.
  const realShot = screenshotUrl(project.url, { width: 1280 });
  const sources: string[] = [];
  if (project.previewImage) sources.push(project.previewImage);
  sources.push(realShot);

  const [idx, setIdx] = useState(0);
  const current = sources[idx];
  const isFallback = idx >= sources.length;

  // Private/auth-gated projects explicitly skip auto screenshots.
  const skipAuto = project.health === "AUTH_REQUIRED" && !project.previewImage;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900",
        className
      )}
      style={{ aspectRatio: large ? "16 / 9" : "16 / 10" }}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-signal-red/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-yellow/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-green/70" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-paper-dim">
          {project.url.replace("https://", "")}
        </span>
      </div>

      <div className="relative h-[calc(100%-34px)] overflow-hidden bg-ink-900">
        {skipAuto ? (
          <DesignedFallback project={project} />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt={`${project.name} — live website preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              onError={() => {
                if (idx < sources.length - 1) setIdx(idx + 1);
                else if (idx === sources.length - 1) setIdx(sources.length); // go to fallback
              }}
            />
            {/* dark gradient for legibility over the screenshot */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            {isFallback && <DesignedFallback project={project} />}
          </>
        )}
        {project.health === "AUTH_REQUIRED" && (
          <span className="absolute left-3 top-3 rounded-full border border-neon-violet/40 bg-ink-950/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-neon-violet">
            Private Preview
          </span>
        )}
      </div>
    </div>
  );
}

function DesignedFallback({ project }: { project: Project }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(120% 120% at 30% 10%, ${project.accent}1f, transparent 55%), linear-gradient(160deg, #0a0d15, #05070c)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div
        className="absolute -left-10 top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: `${project.accent}33` }}
      />
      <div className="relative px-6 text-center">
        <div
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ color: project.accent }}
        >
          {project.category}
        </div>
        <div className="mt-2 font-display text-2xl font-semibold text-paper sm:text-3xl">
          {project.name}
        </div>
      </div>
    </div>
  );
}
