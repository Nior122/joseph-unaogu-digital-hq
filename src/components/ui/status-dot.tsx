import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/content";

type DotStatus =
  | ProjectStatus
  | "building"
  | "exploring"
  | "learning"
  | "experimenting"
  | "live"
  | "in-progress"
  | "experiment"
  | "archived";
const labels: Record<DotStatus, string> = {
  available: "Available for customization",
  concept: "Concept",
  "private-preview": "Private preview",
  building: "Building",
  exploring: "Exploring",
  learning: "Learning",
  experimenting: "Experimenting",
  live: "Live",
  "in-progress": "In progress",
  experiment: "Experiment",
  archived: "Archived",
};
export function StatusDot({
  status,
  withLabel = true,
  className,
}: {
  status: DotStatus;
  withLabel?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("status-label", className)}>
      <span className={withLabel ? undefined : "sr-only"}>
        {labels[status]}
      </span>
    </span>
  );
}
