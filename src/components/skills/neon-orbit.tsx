"use client";

import { useState } from "react";
import {
  skillNodes,
  skillCategories,
  site,
  type SkillCategory,
} from "@/lib/content";

// Preserve the original three-ring constellation geometry without animation or transform conflicts.
const rings: Record<string, 1 | 2 | 3> = {
  ebook: 1,
  copy: 1,
  content: 1,
  video: 1,
  anim: 1,
  yt: 1,
  visual: 1,
  aiapp: 1,
  llm: 1,
  chatbot: 2,
  prompt: 2,
  img: 2,
  aiauto: 2,
  make: 2,
  n8n: 2,
  sheets: 2,
  pub: 2,
  html: 2,
  js: 3,
  ts: 3,
  react: 3,
  next: 3,
  python: 3,
  api: 3,
  db: 3,
  auth: 3,
  git: 3,
};
const radius = { 1: 14, 2: 26, 3: 40 };
const positions = new Map<string, { x: number; y: number }>();
([1, 2, 3] as const).forEach((ring) => {
  const members = skillNodes.filter((skill) => rings[skill.id] === ring);
  members.forEach((skill, index) => {
    const angle =
      -Math.PI / 2 +
      (2 * Math.PI * index) / members.length +
      ((ring - 1) * Math.PI) / 9;
    positions.set(skill.id, {
      x: 50 + Math.cos(angle) * radius[ring],
      y: 50 + Math.sin(angle) * radius[ring],
    });
  });
});
export function NeonOrbit() {
  const [filter, setFilter] = useState<SkillCategory | "all">("all");
  const [active, setActive] = useState<string | null>(null);
  const selected = skillNodes.find((skill) => skill.id === active);
  const visible = skillNodes.filter(
    (skill) => filter === "all" || skill.category === filter,
  );
  return (
    <div className="skill-map">
      <div
        className="filter-group"
        role="group"
        aria-label="Filter the visual skills map"
      >
        {skillCategories.map((category) => (
          <button
            type="button"
            className="filter-button"
            key={category.id}
            aria-pressed={filter === category.id}
            onClick={() => {
              setFilter(category.id);
              setActive(null);
            }}
          >
            {category.id === "all"
              ? "All skills"
              : category.id === "creative"
                ? "Content and media"
                : category.id === "ai"
                  ? "AI"
                  : category.label
                      .toLowerCase()
                      .replace(/^./, (letter) => letter.toUpperCase())}
          </button>
        ))}
      </div>
      <p className="skill-map-key">
        Select a skill to read about it, or{" "}
        <a className="text-link" href="#skill-list">
          skip to the full skills list
        </a>
        .
      </p>
      <div
        className="skill-orbit"
        role="group"
        aria-label="Joseph's optional skills constellation"
      >
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="orbit-ring"
            aria-hidden="true"
            style={{ inset: `${50 - radius[ring as 1 | 2 | 3]}%` }}
          />
        ))}
        <div className="orbit-core" aria-hidden="true">
          {site.name.split(" ")[0]}
        </div>
        {visible.map((skill) => {
          const position = positions.get(skill.id)!;
          return (
            <button
              type="button"
              key={skill.id}
              className="skill-node"
              style={{
                left: `calc(${position.x}% - 26px)`,
                top: `calc(${position.y}% - 26px)`,
              }}
              aria-label={`${skill.label}, ${skill.level}. Show details`}
              aria-pressed={active === skill.id}
              aria-controls="selected-skill"
              onClick={() => setActive(skill.id)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setActive(null);
              }}
            >
              {skill.short}
            </button>
          );
        })}
      </div>
      <div
        id="selected-skill"
        className="surface skill-detail"
        role="status"
        aria-live="polite"
      >
        {selected ? (
          <>
            <h3>{selected.label}</h3>
            <p className="small-text accent-text">{selected.level}</p>
            <p className="text-muted">{selected.blurb}</p>
          </>
        ) : (
          <p className="text-muted">
            {visible.length} skills shown. Choose a skill for its description
            and current level.
          </p>
        )}
      </div>
    </div>
  );
}
