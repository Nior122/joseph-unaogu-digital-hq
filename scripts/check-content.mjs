import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(path.join(root, "src/lib/content.ts"), "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const contentModule = { exports: {} };
new Function("module", "exports", code)(contentModule, contentModule.exports);
const { projects, writing, services, selectedProjects, projectMatchesFilter, projectCategoryFromParam } = contentModule.exports;

assert.equal(projects.length, 16, "All 16 original projects must remain.");
assert.equal(new Set(projects.map((project) => project.slug)).size, 16);
const labels = { available: "Available for customization", concept: "Concept", "private-preview": "Private preview" };
for (const project of projects) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(project.slug, project.id, "Keep all legacy identifiers for redirects.");
  assert.equal(project.statusLabel, labels[project.status]);
  assert.ok(project.oneLiner.length > 0 && project.oneLiner.length <= 140);
  assert.ok(project.whatsInside.length >= 3 && project.whatsInside.length <= 5);
  assert.ok(project.whatItIs && project.whoItsFor && project.stack.length);
  assert.equal(project.liveUrl, project.url);
  assert.match(project.liveUrl, /^https:\/\//);
  if (project.image.src) {
    assert.ok(project.image.alt.length > 10);
    assert.ok(existsSync(path.join(root, "public", project.image.src)), project.image.src);
  }
}
assert.equal(projects.filter((project) => project.image.src).length, 6, "Use only the six existing local screenshots.");
assert.equal(projects.filter((project) => projectMatchesFilter(project, "experiments")).length, 3);
assert.equal(projects.filter((project) => projectMatchesFilter(project, "3d-experiences")).length, 3);
assert.equal(projectCategoryFromParam("web-development"), "websites");
assert.equal(projectCategoryFromParam("ai-automation"), "ai-automation");
assert.equal(projectCategoryFromParam("unexpected"), "all");
assert.deepEqual(selectedProjects.map((project) => project.slug), ["kirvon", "velvet-fade", "northgate", "eduflow", "hireflows", "flowsource"]);
assert.equal(services.filter((service) => service.group === "main").length, 3);
assert.equal(services.filter((service) => service.group === "extra").length, 3);
for (const id of ["ebooks", "copywriting", "ai-automation", "web", "ebook-cover", "youtube"]) assert.ok(services.some((service) => service.id === id));
assert.equal(writing.length, 10);
// Digest of the original writing records at the audited baseline. Includes all covers and full summaries.
assert.equal(createHash("sha256").update(JSON.stringify(writing)).digest("hex"), "b07002c78905de869146aad6732b1a3c895441c3c4969aa081071a022c6247af", "Original writing content and covers must not change.");
console.log("Content checks passed: 16 projects, 10 unchanged writing pieces, 6 original screenshots, correct filters and services.");
