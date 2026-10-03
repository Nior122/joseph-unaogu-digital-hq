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
  const realShot = screenshotUrl(project.url, {
    width: 1280,
    version: project.screenshotVersion,
  });
  const sources: string[] = [];
  if (project.previewImage) sources.push(project.previewImage);
  sources.push(realShot);

  // Private/auth-gated projects explicitly skip auto screenshots.
  const skipAuto = project.health === "AUTH_REQUIRED" && !project.previewImage;

  // Always render the designed fallback as the BASE LAYER. The <img> overlays
  // it. If the screenshot fails to load (thum.io error, slow render, blocked
  // request), the fallback is still visible underneath — the user never sees
  // a blank box or broken-image icon.
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
          <PreviewImageOverlay project={project} sources={sources} />
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

// New component: renders the designed fallback as a base layer, then overlays
// each screenshot source in order. The first one that loads successfully
// becomes visible; failed sources stay hidden. This means:
//   - If ALL sources fail, the user still sees the designed fallback
//     (never a broken-image icon or blank box).
//   - If the manual PNG loads first, we show it.
//   - If only the live screenshot loads, we show that.
function PreviewImageOverlay({
  project,
  sources,
}: {
  project: Project;
  sources: string[];
}) {
  const [loadedIdx, setLoadedIdx] = useState<number | null>(null);
  const [erroredIdx, setErroredIdx] = useState<Set<number>>(new Set());

  const visibleIdx =
    loadedIdx !== null && !erroredIdx.has(loadedIdx) ? loadedIdx : null;

  return (
    <>
      {/* Designed fallback is ALWAYS the base layer. */}
      <DesignedFallback project={project} />

      {/* Try each source. The first one that successfully loads becomes
          visible (above the fallback). */}
      {sources.map((src, i) => {
        if (erroredIdx.has(i)) return null;
        if (visibleIdx !== null && visibleIdx !== i) return null;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${project.name} — live website preview`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            onLoad={() => setLoadedIdx(i)}
            onError={() => {
              setErroredIdx((prev) => {
                if (prev.has(i)) return prev;
                const next = new Set(prev);
                next.add(i);
                return next;
              });
              // If the source that just errored was the one we thought was
              // visible, try the next source.
              if (loadedIdx === i) {
                // Find next non-errored source after this one
                for (let j = i + 1; j < sources.length; j++) {
                  if (!erroredIdx.has(j)) {
                    setLoadedIdx(j);
                    return;
                  }
                }
                setLoadedIdx(null);
              }
            }}
          />
        );
      })}

      {/* dark gradient for legibility over the screenshot */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
        style={{ opacity: visibleIdx === null ? 0 : 1 }}
      />
    </>
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
