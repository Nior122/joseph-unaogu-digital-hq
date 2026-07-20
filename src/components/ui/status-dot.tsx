import { cn } from "@/lib/utils";
type DotStatus = "building" | "exploring" | "learning" | "experimenting" | "live" | "in-progress" | "experiment" | "concept" | "archived";
const map: Record<DotStatus, { color: string; label: string }> = {
  building: { color: "bg-signal-green", label: "Building" },
  exploring: { color: "bg-signal-blue", label: "Exploring" },
  learning: { color: "bg-signal-yellow", label: "Learning" },
  experimenting: { color: "bg-signal-gray", label: "Experimenting" },
  live: { color: "bg-signal-green", label: "Live" },
  "in-progress": { color: "bg-signal-yellow", label: "In Progress" },
  experiment: { color: "bg-signal-gray", label: "Experiment" },
  concept: { color: "bg-signal-gray", label: "Concept" },
  archived: { color: "bg-signal-red", label: "Archived" },
};
export function StatusDot({ status, withLabel = true, className }: { status: DotStatus; withLabel?: boolean; className?: string }) {
  const s = map[status];
  return (<span className={cn("inline-flex items-center gap-2 text-xs text-paper-muted", className)}><span className={cn("h-2 w-2 rounded-full", s.color, "shadow-[0_0_8px] shadow-current/40")} />{withLabel && s.label}</span>);
}