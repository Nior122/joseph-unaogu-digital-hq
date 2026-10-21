"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

type PreviewProps = {
  project: Pick<Project, "name" | "image">;
  className?: string;
  large?: boolean;
  priority?: boolean;
};

function Screenshot({ project, large, priority }: PreviewProps) {
  const [stage, setStage] = useState<
    "optimized" | "raw" | "original" | "missing"
  >("optimized");
  const source =
    stage === "original" ? project.image.fallbackSrc : project.image.src;
  if (!source || stage === "missing")
    return (
      <div className="preview-unavailable">
        <ImageOff size={28} strokeWidth={1.5} aria-hidden="true" />
        <span>Homepage preview unavailable for {project.name}.</span>
        <span>
          {large
            ? "You can try the live demo below."
            : "View the project to find its live demo."}
        </span>
      </div>
    );
  return (
    <Image
      key={`${source}-${stage}`}
      src={source}
      alt={project.image.alt}
      fill
      sizes={
        large
          ? "(max-width: 768px) 100vw, 1152px"
          : "(max-width: 639px) 100vw, (max-width: 899px) 50vw, 33vw"
      }
      quality={80}
      priority={priority}
      unoptimized={stage !== "optimized"}
      className="project-image"
      onError={() =>
        setStage((current) =>
          current === "optimized"
            ? "raw"
            : current === "raw" && project.image.fallbackSrc
              ? "original"
              : "missing",
        )
      }
    />
  );
}

/** Prefer a saved homepage capture; failed optimization falls back to the raw file, then the original. */
export function ProjectPreview({
  project,
  className,
  large = false,
  priority = false,
}: PreviewProps) {
  return (
    <div
      className={cn(
        "project-visual",
        large && "project-visual-large",
        className,
      )}
    >
      <Screenshot
        key={`${project.image.src}|${project.image.fallbackSrc ?? ""}`}
        project={project}
        large={large}
        priority={priority}
      />
    </div>
  );
}
