import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadContent } from "./load-content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const content = loadContent();
const {
  projects,
  writing,
  services,
  selectedProjects,
  projectMatchesFilter,
  projectCategoryFromParam,
} = content;

assert.equal(projects.length, 16, "All 16 original projects must remain.");
assert.equal(new Set(projects.map((project) => project.slug)).size, 16);
const labels = {
  available: "Available for customization",
  concept: "Concept",
  "private-preview": "Private preview",
};
for (const project of projects) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(
    project.slug,
    project.id,
    "Keep all legacy identifiers for redirects.",
  );
  assert.equal(project.statusLabel, labels[project.status]);
  assert.ok(project.oneLiner.length > 0 && project.oneLiner.length <= 140);
  assert.ok(project.whatsInside.length >= 3 && project.whatsInside.length <= 5);
  assert.ok(project.whatItIs && project.whoItsFor && project.stack.length);
  assert.equal(project.liveUrl, project.url);
  assert.equal(new URL(project.liveUrl).protocol, "https:");
  if (project.image.src) {
    assert.ok(project.image.alt.length > 10);
    assert.ok(
      existsSync(path.join(root, "public", project.image.src)),
      project.image.src,
    );
  }
}
assert.equal(
  createHash("sha256")
    .update(JSON.stringify(projects.map(({ id, url }) => ({ id, url }))))
    .digest("hex"),
  "85eb45bb2155f08748a9175718126fb0bb9445310c079989b6a207275ef988cb",
  "All original project identifiers and demo URLs must remain.",
);
for (const social of content.site.socials)
  assert.equal(new URL(social.href).protocol, "https:");
assert.equal(
  projects.filter(
    (project) =>
      project.image.fallbackSrc ||
      (project.image.src &&
        !project.image.src.startsWith("/projects/previews/")),
  ).length,
  6,
  "Keep the six original screenshots even after live captures are available.",
);
assert.equal(
  projects.filter((project) => projectMatchesFilter(project, "experiments"))
    .length,
  3,
);
assert.equal(
  projects.filter((project) => projectMatchesFilter(project, "3d-experiences"))
    .length,
  3,
);
assert.equal(projectCategoryFromParam("web-development"), "websites");
assert.equal(projectCategoryFromParam("ai-automation"), "ai-automation");
assert.equal(projectCategoryFromParam("unexpected"), "all");
assert.deepEqual(
  selectedProjects.map((project) => project.slug),
  ["kirvon", "velvet-fade", "northgate", "eduflow", "hireflows", "flowsource"],
);
assert.equal(services.filter((service) => service.group === "main").length, 3);
assert.equal(services.filter((service) => service.group === "extra").length, 3);
for (const id of [
  "ebooks",
  "copywriting",
  "ai-automation",
  "web",
  "ebook-cover",
  "youtube",
])
  assert.ok(services.some((service) => service.id === id));
assert.equal(writing.length, 10);
for (const book of writing)
  assert.equal(new URL(book.coverImage).protocol, "https:");
// Digest of the original writing records at the audited baseline. Includes all covers and full summaries.
assert.equal(
  createHash("sha256").update(JSON.stringify(writing)).digest("hex"),
  "b07002c78905de869146aad6732b1a3c895441c3c4969aa081071a022c6247af",
  "Original writing content and covers must not change.",
);
const previewManifest = JSON.parse(
  readFileSync(path.join(root, "src/lib/preview-manifest.json"), "utf8"),
);
for (const [kind, records] of Object.entries({
  projects: previewManifest.projects,
  writing: previewManifest.writing,
})) {
  for (const [id, asset] of Object.entries(records)) {
    const source =
      kind === "projects"
        ? projects.find((project) => project.slug === id)?.liveUrl
        : writing.find((book) => book.id === id)?.coverImage;
    assert.equal(
      asset.sourceUrl,
      source,
      `${id}: capture must match the original source`,
    );
    const prefix = kind === "projects" ? "projects/previews" : "writing/covers";
    assert.match(
      asset.src,
      new RegExp(`^/${prefix}/${id}-[a-f0-9]{12}\\.(?:webp|jpg|png|avif|gif)$`),
    );
    const bytes = readFileSync(path.join(root, "public", asset.src));
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      asset.sha256,
      `${id}: asset integrity`,
    );
    assert.ok(
      asset.src.includes(asset.sha256.slice(0, 12)),
      `${id}: cache-busting filename`,
    );
    assert.equal(bytes.byteLength, asset.bytes);
    if (kind === "projects") {
      assert.equal(asset.width, 1280);
      assert.equal(asset.height, 800);
      assert.ok(
        bytes.byteLength <= 150000,
        `${id}: optimized homepage preview`,
      );
      assert.equal(
        projects.find((project) => project.slug === id).image.src,
        asset.src,
      );
    } else
      assert.equal(
        content.writingCoverSource(writing.find((book) => book.id === id)),
        asset.src,
      );
  }
}
console.log(
  `Content checks passed: 16 projects, 10 unchanged writing pieces, ${projects.filter((project) => project.image.src).length} project previews, 6 original screenshots retained, correct filters and services.`,
);
