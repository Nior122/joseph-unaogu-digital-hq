import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { browserOptions } from "./browser-utils.mjs";
import { assertPublicUrl } from "./capture-previews.mjs";
import { loadContent } from "./load-content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const SOURCE_PAGE = "https://josephportifolio.vercel.app/writing";
const MAX_BYTES = 5 * 1024 * 1024;

/** A title/slug and its original URL must agree; never substitute another book's image. */
export function coverMatch(book, image) {
  if (!image) return "No matching book image found on the source page.";
  if (image.alt !== book.title)
    return "The source image title does not match this book.";
  if (image.src !== book.coverImage)
    return "The source page points to a different image; manual review required.";
  if (!image.complete || !image.naturalWidth)
    return "The original image did not decode in the source-page browser.";
  return null;
}

async function atomicWrite(filename, bytes) {
  await mkdir(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.tmp`;
  await writeFile(temporary, bytes);
  await rename(temporary, filename);
}

export async function recoverWritingCovers() {
  const { writing } = loadContent();
  const manifestPath = path.join(root, "src/lib/preview-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const sourceByUrl = new Map(writing.map((book) => [book.coverImage, book]));
  const responses = new Map();
  const buffers = new Map();
  const pending = [];
  const report = {
    sourcePage: SOURCE_PAGE,
    checkedAt: new Date().toISOString(),
    books: [],
  };
  assertPublicUrl(SOURCE_PAGE);
  const browser = await chromium.launch(await browserOptions());
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      serviceWorkers: "block",
    });
    const page = await context.newPage();
    page.on("response", (response) => {
      let request = response.request();
      while (request && !sourceByUrl.has(request.url()))
        request = request.redirectedFrom();
      const book = request && sourceByUrl.get(request.url());
      if (!book) return;
      const task = (async () => {
        const info = {
          status: response.status(),
          contentType: response.headers()["content-type"] ?? "",
          url: response.url(),
        };
        responses.set(book.id, info);
        if (
          !response.ok() ||
          !info.contentType.toLowerCase().startsWith("image/")
        )
          return;
        assertPublicUrl(response.url());
        if (Number(response.headers()["content-length"]) > MAX_BYTES)
          throw new Error("Cover exceeds the safety limit.");
        const bytes = await response.body();
        if (bytes.length > MAX_BYTES)
          throw new Error("Cover exceeds the safety limit.");
        const metadata = await sharp(bytes, {
          limitInputPixels: 32_000_000,
        }).metadata();
        const format = {
          jpeg: "jpg",
          png: "png",
          webp: "webp",
          avif: "avif",
          gif: "gif",
        }[metadata.format];
        if (!format || metadata.width < 120 || metadata.height < 120)
          throw new Error("Not a usable original book-cover file.");
        buffers.set(book.id, { bytes, metadata, format });
      })().catch((error) => {
        const info = responses.get(book.id) ?? {};
        responses.set(book.id, { ...info, error: error.message });
      });
      pending.push(task);
    });
    const response = await page.goto(SOURCE_PAGE, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    report.pageStatus = response?.status() ?? 0;
    if (report.pageStatus !== 200)
      throw new Error(
        `The source Writing page returned HTTP ${report.pageStatus}.`,
      );
    await page
      .waitForLoadState("networkidle", { timeout: 15_000 })
      .catch(() => {});
    report.pageTitle = await page.title();
    for (const book of writing) {
      const selector = `a[href="/writing/${book.id}"] img`;
      const image = page.locator(selector).first();
      let state;
      if (await image.count()) {
        await image.scrollIntoViewIfNeeded();
        await page
          .waitForFunction(
            (selector) => {
              const image = document.querySelector(selector);
              return image instanceof HTMLImageElement && image.complete;
            },
            selector,
            { timeout: 15_000 },
          )
          .catch(() => {});
        state = await image.evaluate((image) => ({
          src: image.src,
          alt: image.alt,
          complete: image.complete,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        }));
      }
      report.books.push({
        id: book.id,
        title: book.title,
        sourceUrl: book.coverImage,
        image: state ?? null,
      });
    }
    await Promise.allSettled(pending);
    await page.screenshot({
      path: path.join(root, "test-results/writing-cover-source-page.jpg"),
      fullPage: true,
      type: "jpeg",
      quality: 75,
      timeout: 15_000,
    });
    for (const item of report.books) {
      const book = writing.find((book) => book.id === item.id);
      const captured = buffers.get(item.id);
      const failure = coverMatch(book, item.image);
      item.response = responses.get(item.id) ?? null;
      if (failure || !captured) {
        item.status = "unavailable";
        item.reason =
          item.response?.status && item.response.status !== 200
            ? `Original cover returned HTTP ${item.response.status} while loading the old Writing page.`
            : (failure ?? "No valid original image response was available.");
        console.warn(
          `::warning title=Original cover ${item.id}::${item.reason}`,
        );
        continue;
      }
      const { bytes, metadata, format } = captured;
      const sha256 = createHash("sha256").update(bytes).digest("hex");
      const src = `/writing/covers/${item.id}-${sha256.slice(0, 12)}.${format}`;
      await atomicWrite(path.join(root, "public", src), bytes);
      const previous = manifest.writing[item.id];
      manifest.writing[item.id] =
        previous?.sha256 === sha256 && previous?.sourceUrl === book.coverImage
          ? previous
          : {
              src,
              sourceUrl: book.coverImage,
              sha256,
              width: metadata.width,
              height: metadata.height,
              bytes: bytes.length,
              capturedAt: new Date().toISOString(),
              sourcePage: SOURCE_PAGE,
            };
      item.status = "saved";
      item.localSrc = src;
      item.sha256 = sha256;
      console.log(`Saved original cover: ${item.id} (${bytes.length} bytes)`);
    }
    manifest.writing = Object.fromEntries(
      Object.entries(manifest.writing).sort(([a], [b]) => a.localeCompare(b)),
    );
    await atomicWrite(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  } finally {
    await browser.close();
    report.finishedAt = new Date().toISOString();
    report.saved = report.books.filter(
      (book) => book.status === "saved",
    ).length;
    report.unavailable = report.books.filter(
      (book) => book.status === "unavailable",
    ).length;
    // Small provenance report is committed so source failures remain visible even
    // when a consumer cannot download GitHub's separately hosted log artifacts.
    await atomicWrite(
      path.join(root, "docs/writing-cover-recovery.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  }
  console.log(
    `Original Writing page: ${report.saved} original covers saved, ${report.unavailable} unavailable.`,
  );
  return report;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  recoverWritingCovers().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
