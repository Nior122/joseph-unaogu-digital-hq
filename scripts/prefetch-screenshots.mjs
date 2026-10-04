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

  // Hit thum.io's documented /prefetch/ endpoint to warm the cache. The
  // endpoint returns the text "Image is cached" once the screenshot is
  // ready. We pass maxAge/0/ so the warmup forces a fresh render even if
  // thum.io already has a cached version.
  //
  // We deliberately do NOT use noanimate/ — on slow / image-heavy sites
  // it can block until timeout and return an error page. The streaming
  // behavior is more reliable.
  //
  // CRITICAL: each fetch has a hard 8s timeout via AbortController so
  // the script can never hang longer than the Vercel build budget. If
  // thum.io is slow or unreachable, we skip the warmup — the build
  // continues regardless. The screenshot pipeline degrades gracefully
  // (the live <img> on the page will still request a fresh render on
  // the first visitor load).
  const PER_REQUEST_TIMEOUT_MS = 8000;
  const tasks = featured.map(async (p) => {
    const clean = p.url.replace(/^https?:\/\//, "");
    const url = `https://image.thum.io/get/prefetch/width/${width}/maxAge/0/https://${clean}`;
    const t0 = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PER_REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
      const body = await res.text().catch(() => "");
      const ms = Date.now() - t0;
      const ok = res.status >= 200 && res.status < 400;
      // thum.io's prefetch endpoint returns the literal text "Image is cached"
      // (or similar) when the warmup is queued/done. We treat any 2xx/3xx as
      // a successful warmup since the exact body varies.
      const looksCached = /cached|queued|rendering/i.test(body);
      console.log(
        `  ${ok ? "✓" : "✗"} ${p.id.padEnd(16)} ${p.url}  →  HTTP ${res.status} (${ms}ms)${
          ok ? (looksCached ? "  [warmed]" : "  [pending]") : ""
        }`
      );
      return { id: p.id, ok, status: res.status, ms };
    } catch (err) {
      const ms = Date.now() - t0;
      const reason = err.name === "AbortError" ? "timeout" : err.message;
      console.log(`  ✗ ${p.id.padEnd(16)} ${p.url}  →  ${reason} (${ms}ms)`);
      return { id: p.id, ok: false, error: reason, ms };
    } finally {
      clearTimeout(timer);
    }
  });

  // Race the prefetch tasks against an overall 20s budget. If anything is
  // still hanging after 20s we move on — never block the build.
  const OVERALL_BUDGET_MS = 20000;
  const overallTimer = new Promise((resolve) =>
    setTimeout(() => resolve("timeout"), OVERALL_BUDGET_MS)
  );
  const settled = await Promise.race([
    Promise.all(tasks),
    overallTimer.then(() => null),
  ]);
  const results = settled || [];
  const ok = results.filter((r) => r && r.ok).length;
  const failed = results.length - ok;
  if (results.length < featured.length) {
    console.log(
      `[prefetch] Overall budget exceeded after ${OVERALL_BUDGET_MS}ms — ${results.length}/${featured.length} settled, ${featured.length - results.length} still in-flight.`
    );
  }
  console.log(`[prefetch] Done. ${ok} warmed, ${failed} failed.`);

  // We never fail the build over a screenshot miss — log and exit 0.
}

main().catch((err) => {
  console.error("[prefetch] Fatal:", err);
  process.exit(0);
});