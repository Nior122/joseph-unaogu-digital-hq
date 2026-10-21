import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { browserOptions } from "./browser-utils.mjs";
import { loadContent } from "./load-content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifestPath = path.join(root, "src/lib/preview-manifest.json");
const viewport = { width: 1280, height: 800 };
const MAX_SCREENSHOT_BYTES = 150_000;
const MAX_COVER_BYTES = 5 * 1024 * 1024;
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function assertPublicUrl(value) {
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    host === "localhost" ||
    host.endsWith(".local") ||
    host.includes(":") ||
    /^(?:0|10|127)\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(?:1[6-9]|2\d|3[01])\./.test(host)
  )
    throw new Error(
      "Only public HTTPS URLs without credentials can be captured.",
    );
  return url;
}

/** Never replace a usable image with a hosting error, access checkpoint, or login-only screen. */
export function pageFailure({
  status,
  title,
  text,
  passwordFields = 0,
  hasCanvas = false,
}) {
  if (status < 200 || status >= 300) return `Homepage returned HTTP ${status}.`;
  const content = `${title}\n${text}`;
  if (
    /DEPLOYMENT_(?:NOT_FOUND|DISABLED|PAUSED)|Vercel (?:Authentication|Security Checkpoint)|This deployment is (?:unavailable|disabled|paused)|Application error: a client-side exception/i.test(
      content,
    )
  )
    return "Hosting error or access checkpoint, not a public homepage.";
  if (
    /^(?:Just a moment|Attention Required|Authentication Required|404[:\s]|500[:\s])/i.test(
      title.trim(),
    )
  )
    return "Error or authentication page, not a public homepage.";
  if (
    passwordFields > 0 &&
    text.length < 1500 &&
    /sign\s?in|log\s?in|authentication required/i.test(content)
  )
    return "Login-only page; no credentials or authentication bypass were used.";
  if (
    (!hasCanvas && text.trim().length < 40) ||
    /^loading[\s.…]*$/i.test(text.trim())
  )
    return "No useful homepage content finished rendering.";
  return null;
}

export async function optimizeScreenshot(buffer) {
  for (const quality of [82, 74, 66, 58, 50, 42]) {
    const result = await sharp(buffer, { limitInputPixels: 16_000_000 })
      .resize(viewport.width, viewport.height, {
        fit: "cover",
        position: "north",
      })
      .removeAlpha()
      .webp({ quality, effort: 5, smartSubsample: true })
      .toBuffer();
    if (result.byteLength <= MAX_SCREENSHOT_BYTES) return result;
  }
  throw new Error(
    "Capture could not be optimized below 150 KB; previous image kept.",
  );
}

async function atomicWrite(filename, bytes) {
  await mkdir(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.tmp`;
  await writeFile(temporary, bytes);
  await rename(temporary, filename);
}

async function concurrent(items, limit, callback) {
  let index = 0;
  const results = new Array(items.length);
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (index < items.length) {
        const current = index++;
        results[current] = await callback(items[current]);
      }
    }),
  );
  return results;
}

async function saveAsset(kind, id, sourceUrl, bytes, format, previous) {
  const sha256 = digest(bytes);
  const directory = kind === "project" ? "projects/previews" : "writing/covers";
  const src = `/${directory}/${id}-${sha256.slice(0, 12)}.${format}`;
  const filename = path.join(root, "public", src);
  const unchanged =
    previous?.sha256 === sha256 &&
    previous?.sourceUrl === sourceUrl &&
    existsSync(filename);
  if (!unchanged) await atomicWrite(filename, bytes);
  const metadata = await sharp(bytes).metadata();
  const entry = unchanged
    ? previous
    : {
        src,
        sourceUrl,
        sha256,
        width: metadata.width,
        height: metadata.height,
        bytes: bytes.byteLength,
        capturedAt: new Date().toISOString(),
      };
  return {
    entry,
    result: {
      kind,
      id,
      sourceUrl,
      status: unchanged ? "unchanged" : "captured",
      src,
      bytes: bytes.byteLength,
    },
  };
}

async function captureHomepage(browser, project, previous) {
  assertPublicUrl(project.liveUrl);
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    locale: "en-GB",
    timezoneId: "UTC",
    colorScheme: "light",
    reducedMotion: "reduce",
    serviceWorkers: "block",
    acceptDownloads: false,
  });
  try {
    const page = await context.newPage();
    const response = await page.goto(project.liveUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    await page
      .waitForLoadState("networkidle", { timeout: 10_000 })
      .catch(() => {});
    await page.evaluate(() =>
      Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]),
    );
    // Let image decoding and WebGL scenes finish; do not click through login/consent flows.
    await page.waitForTimeout(3000);
    assertPublicUrl(page.url());
    const state = {
      status: response?.status() ?? 0,
      title: await page.title(),
      text: (await page.locator("body").innerText({ timeout: 5000 })).slice(
        0,
        12_000,
      ),
      passwordFields: await page
        .locator('input[type="password"]:visible')
        .count(),
      hasCanvas: (await page.locator("canvas:visible").count()) > 0,
    };
    const failure = pageFailure(state);
    if (failure) throw new Error(failure);
    const png = await page.screenshot({
      type: "png",
      fullPage: false,
      animations: "disabled",
      timeout: 15_000,
    });
    const stats = await sharp(png).resize(64, 40).removeAlpha().stats();
    if (Math.max(...stats.channels.map((channel) => channel.stdev)) < 5)
      throw new Error(
        "Capture is blank or almost a solid color; previous image kept.",
      );
    return await saveAsset(
      "project",
      project.slug,
      project.liveUrl,
      await optimizeScreenshot(png),
      "webp",
      previous,
    );
  } finally {
    await context.close();
  }
}

async function cacheCover(book, previous) {
  assertPublicUrl(book.coverImage);
  const response = await fetch(book.coverImage, {
    signal: AbortSignal.timeout(30_000),
    headers: { Accept: "image/*" },
  });
  if (!response.ok)
    throw new Error(`Original cover returned HTTP ${response.status}.`);
  assertPublicUrl(response.url);
  if (!response.headers.get("content-type")?.toLowerCase().startsWith("image/"))
    throw new Error("Original cover did not return an image.");
  if (Number(response.headers.get("content-length")) > MAX_COVER_BYTES)
    throw new Error("Original cover exceeds the 5 MB safety limit.");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Original cover has no image body.");
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_COVER_BYTES) {
        await reader.cancel();
        throw new Error("Original cover exceeds the 5 MB safety limit.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = Buffer.concat(chunks);
  const metadata = await sharp(bytes, {
    limitInputPixels: 32_000_000,
  }).metadata();
  const extensions = {
    jpeg: "jpg",
    png: "png",
    webp: "webp",
    avif: "avif",
    gif: "gif",
  };
  const format = extensions[metadata.format];
  if (!format || !metadata.width || !metadata.height)
    throw new Error("Original cover is not a supported valid image.");
  // Preserve the original cover bytes exactly; never redraw, crop, or generate book covers.
  return saveAsset(
    "writing",
    book.id,
    book.coverImage,
    bytes,
    format,
    previous,
  );
}

async function pruneGeneratedFiles(manifest) {
  for (const [kind, directory] of [
    ["projects", "projects/previews"],
    ["writing", "writing/covers"],
  ]) {
    const keep = new Set(
      Object.values(manifest[kind]).map((entry) => path.basename(entry.src)),
    );
    const folder = path.join(root, "public", directory);
    await mkdir(folder, { recursive: true });
    for (const filename of await readdir(folder)) {
      if (
        /^[a-z0-9-]+-[a-f0-9]{12}\.(?:webp|jpg|png|avif|gif)$/.test(filename) &&
        !keep.has(filename)
      )
        await unlink(path.join(folder, filename));
    }
  }
}

export async function refreshPreviews(args = process.argv.slice(2)) {
  const unknown = args.filter(
    (arg) => arg !== "--only-missing" && !arg.startsWith("--project="),
  );
  if (unknown.length) throw new Error(`Unknown options: ${unknown.join(", ")}`);
  const onlyMissing = args.includes("--only-missing");
  const selected = args
    .filter((arg) => arg.startsWith("--project="))
    .map((arg) => arg.slice(10));
  const { projects, writing } = loadContent();
  if (
    selected.some((slug) => !projects.some((project) => project.slug === slug))
  )
    throw new Error("Unknown project slug.");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  if (manifest.version !== 1 || !manifest.projects || !manifest.writing)
    throw new Error("Unsupported preview manifest.");
  const report = { startedAt: new Date().toISOString(), viewport, results: [] };
  const wanted = projects.filter(
    (project) =>
      (!selected.length || selected.includes(project.slug)) &&
      (!onlyMissing ||
        !manifest.projects[project.slug] ||
        !existsSync(
          path.join(root, "public", manifest.projects[project.slug].src),
        )),
  );
  let browser;
  try {
    if (wanted.length)
      browser = await chromium.launch(await browserOptions({ graphics: true }));
    report.results.push(
      ...(await concurrent(wanted, 3, async (project) => {
        try {
          const capture = await captureHomepage(
            browser,
            project,
            manifest.projects[project.slug],
          );
          manifest.projects[project.slug] = capture.entry;
          console.log(
            `${capture.result.status}: ${project.slug} (${capture.result.bytes} bytes)`,
          );
          return capture.result;
        } catch (error) {
          const reason =
            error instanceof Error
              ? error.message.slice(0, 500)
              : "Capture failed.";
          console.warn(`kept previous: ${project.slug}: ${reason}`);
          return {
            kind: "project",
            id: project.slug,
            sourceUrl: project.liveUrl,
            status: "failed",
            reason,
          };
        }
      })),
    );
    if (!selected.length)
      report.results.push(
        ...(await concurrent(
          writing.filter(
            (book) =>
              book.coverImage &&
              (!onlyMissing ||
                !manifest.writing[book.id] ||
                !existsSync(
                  path.join(root, "public", manifest.writing[book.id].src),
                )),
          ),
          3,
          async (book) => {
            try {
              const cover = await cacheCover(book, manifest.writing[book.id]);
              manifest.writing[book.id] = cover.entry;
              console.log(
                `${cover.result.status}: cover ${book.id} (${cover.result.bytes} bytes)`,
              );
              return cover.result;
            } catch (error) {
              const reason =
                error instanceof Error
                  ? error.message.slice(0, 500)
                  : "Cover cache failed.";
              console.warn(`kept previous: cover ${book.id}: ${reason}`);
              return {
                kind: "writing",
                id: book.id,
                sourceUrl: book.coverImage,
                status: "failed",
                reason,
              };
            }
          },
        )),
      );
    for (const key of ["projects", "writing"])
      manifest[key] = Object.fromEntries(
        Object.entries(manifest[key]).sort(([a], [b]) => a.localeCompare(b)),
      );
    await atomicWrite(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
    await pruneGeneratedFiles(manifest);
  } finally {
    await browser?.close();
    report.finishedAt = new Date().toISOString();
    await atomicWrite(
      path.join(root, "test-results/previews/capture-report.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  }
  const successful = report.results.filter(
    (result) => result.status !== "failed",
  ).length;
  const failed = report.results.length - successful;
  console.log(
    `Preview refresh: ${successful} successful, ${failed} failed; existing assets retained on failures.`,
  );
  if (report.results.length && !successful)
    throw new Error(
      "No source could be refreshed. Check the capture report; existing assets were kept.",
    );
  return report;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  refreshPreviews().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
