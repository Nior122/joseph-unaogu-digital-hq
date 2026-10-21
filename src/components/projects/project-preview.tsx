import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Only existing local screenshots are used. A missing capture is never faked. */
export function ProjectPreview({
  project,
  className,
  large = false,
  priority = false,
}: {
  project: Pick<Project, "name" | "image">;
  className?: string;
  large?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "project-visual",
        large && "project-visual-large",
        className,
      )}
    >
      {project.image.src ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={
            large
              ? "(max-width: 768px) 100vw, 1152px"
              : "(max-width: 639px) 100vw, (max-width: 899px) 50vw, 33vw"
          }
          quality={80}
          priority={priority}
          className="project-image"
        />
      ) : (
        <div className="preview-unavailable">
          <ImageOff size={28} strokeWidth={1.5} aria-hidden="true" />
          <span>No local screenshot for {project.name}.</span>
          <span>
            {large
              ? "You can try the live demo below."
              : "View the project to find its live demo."}
          </span>
        </div>
      )}
    </div>
  );
}
