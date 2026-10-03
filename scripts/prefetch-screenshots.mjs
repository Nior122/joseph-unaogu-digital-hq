#!/usr/bin/env node
// scripts/prefetch-screenshots.mjs
//
// Deploy-time screenshot warmup.
//
// Vercel runs `npm run build` on every deploy. We hook a `postbuild` script to
// this file so every featured project's live screenshot is fetched and cached
// at thum.io BEFORE the first visitor hits the page. After that, the
// `maxAge/6/` setting keeps it auto-refreshing every 6 hours.
//
// Why a separate script and not a build-time import?
// - We don't want the build to fail if thum.io is briefly unreachable.
// - We want a clear, logged summary of what was warmed (and what wasn't).
// - Keeps `lib/content.ts` free of Node-only deps.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// Extract the `projects` array from src/lib/content.ts without compiling TS.
// We do a lightweight, regex-based parse — robust enough for this single file
// because we control its shape.
function parseProjects(content) {
  const startMarker = "export const projects: Project[] = [";
  const startIdx = content.indexOf(startMarker);
  if (startIdx < 0) throw new Error("Could not find `projects` array in content.ts");
  const arrayFrom = startIdx + startMarker.length - 1; // points at the opening '['

  // Walk the array tracking brace/bracket depth and string literals.
  let i = arrayFrom;
  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escape = false;
  while (i < content.length) {
    const ch = content[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === stringChar) inString = false;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") {
        inString = true;
        stringChar = ch;
      } else if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) {
          i++; // include closing bracket
          break;
        }
      }
    }
    i++;
  }

  const arrayLiteral = content.slice(arrayFrom, i);
  // Convert the TS literal to something we can JSON.parse-ish.
  // Strip TS-only bits: trailing commas, single quotes, `undefined` values,
  // then quote unquoted object keys.
  let jsonish = arrayLiteral
    .replace(/'/g, '"')
    .replace(/,(\s*[}\]])/g, "$1") // remove trailing commas
    .replace(/:\s*undefined\b/g, ": null"); // TS-only `undefined` → null
  // Quote unquoted object keys: `id: "..."` -> `"id": "..."`.
  // Only touches identifier keys (no quotes), not values or already-quoted keys.
  jsonish = jsonish.replace(
    /([,{]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g,
    '$1"$2":'
  );
  return JSON.parse(jsonish);
}

async function main() {
  const contentPath = path.join(ROOT, "src", "lib", "content.ts");
  const content = await readFile(contentPath, "utf8");
  const projects = parseProjects(content);

  const featured = projects.filter((p) => p.featured && p.health !== "AUTH_REQUIRED");
  if (featured.length === 0) {
    console.log("[prefetch] No featured projects to warm. Skipping.");
    return;
  }

  console.log(`[prefetch] Warming ${featured.length} featured project screenshots via thum.io…`);

  const width = 1280;
  const maxAge = 6;

  const tasks = featured.map(async (p) => {
    const clean = p.url.replace(/^https?:\/\//, "");
    const url = `https://image.thum.io/get/width/${width}/maxAge/${maxAge}/https://${clean}`;
    const t0 = Date.now();
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow" });
      // We don't need the body — thum.io starts rendering as soon as we hit it.
      // Just confirm we got *some* response (200/3xx counts as "enqueued").
      const ms = Date.now() - t0;
      const ok = res.status >= 200 && res.status < 400;
      console.log(`  ${ok ? "✓" : "✗"} ${p.id.padEnd(14)} ${p.url}  →  HTTP ${res.status} (${ms}ms)`);
      return { id: p.id, ok, status: res.status, ms };
    } catch (err) {
      const ms = Date.now() - t0;
      console.log(`  ✗ ${p.id.padEnd(14)} ${p.url}  →  ${err.message} (${ms}ms)`);
      return { id: p.id, ok: false, error: err.message, ms };
    }
  });

  const results = await Promise.all(tasks);
  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;
  console.log(`[prefetch] Done. ${ok} warmed, ${failed} failed.`);

  // We never fail the build over a screenshot miss — log and exit 0.
}

main().catch((err) => {
  console.error("[prefetch] Fatal:", err);
  process.exit(0);
});