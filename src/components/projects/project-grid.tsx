"use client";

import { useState, type ReactNode } from "react";
import {
  projectFilters,
  projectMatchesFilter,
  type ProjectFilter,
  type ProjectType,
} from "@/lib/content";

type ProjectItem = { slug: string; type: ProjectType; card: ReactNode };
export function ProjectGrid({
  initial = "all",
  items,
}: {
  initial?: ProjectFilter;
  items: ProjectItem[];
}) {
  const [filter, setFilter] = useState<ProjectFilter>(initial);
  const filtered = items.filter((item) => projectMatchesFilter(item, filter));
  function updateFilter(value: ProjectFilter) {
    setFilter(value);
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    if (value === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", value);
    window.history.replaceState(null, "", url);
  }
  return (
    <div>
      <div
        className="filter-group"
        role="group"
        aria-label="Filter projects by type"
      >
        {projectFilters.map((item) => (
          <button
            type="button"
            key={item.id}
            className="filter-button"
            aria-pressed={filter === item.id}
            onClick={() => updateFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="result-count" role="status" aria-atomic="true">
        {filtered.length} of {items.length} projects
      </p>
      <div className="project-grid project-grid-three">
        {filtered.map((item) => (
          <div key={item.slug}>{item.card}</div>
        ))}
      </div>
    </div>
  );
}
