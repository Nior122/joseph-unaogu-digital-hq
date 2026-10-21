import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import {
  assertPublicUrl,
  optimizeScreenshot,
  pageFailure,
  refreshPreviews,
} from "../scripts/capture-previews.mjs";
import { writing, writingCoverSource } from "../src/lib/content";

test("capture URLs must be public HTTPS without embedded credentials", () => {
  assert.equal(
    assertPublicUrl("https://eduflow-five-psi.vercel.app/").protocol,
    "https:",
  );
  for (const url of [
    "http://example.com",
    "file:///etc/passwd",
    "https://localhost",
    "https://127.0.0.1/",
    "https://10.1.2.3",
    "https://192.168.1.1",
    "https://172.16.0.1",
    "https://169.254.169.254",
    "https://[::1]",
    "https://user:password@example.com",
  ])
    assert.throws(() => assertPublicUrl(url));
});

test("hosting failures and login-only screens are not accepted as homepage captures", () => {
  for (const sample of [
    { status: 404, title: "Not found", text: "The deployment does not exist" },
    {
      status: 200,
      title: "Vercel Security Checkpoint",
      text: "Verify your browser",
    },
    {
      status: 200,
      title: "Log in",
      text: "Sign in to continue",
      passwordFields: 1,
    },
    { status: 200, title: "Demo", text: "Loading…" },
  ])
    assert.ok(pageFailure(sample));
  assert.equal(
    pageFailure({
      status: 200,
      title: "A public homepage",
      text: "A useful website for visitors, with public content and a link to log in.",
    }),
    null,
  );
});

test("homepage previews are real image buffers optimized to 1280 by 800 and under 150 KB", async () => {
  const svg = Buffer.from(
    '<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg"><rect width="1280" height="800" fill="#ffffff"/><rect x="40" y="40" width="600" height="400" fill="#245b3d"/></svg>',
  );
  const result = await optimizeScreenshot(await sharp(svg).png().toBuffer());
  const metadata = await sharp(result).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 1280);
  assert.equal(metadata.height, 800);
  assert.ok(result.byteLength <= 150000);
});

test("bad capture options cannot modify the manifest or launch a network capture", async () => {
  const filename = new URL("../src/lib/preview-manifest.json", import.meta.url);
  const before = await readFile(filename, "utf8");
  await assert.rejects(
    refreshPreviews(["--project=does-not-exist"]),
    /Unknown project/,
  );
  await assert.rejects(refreshPreviews(["--unknown"]), /Unknown options/);
  assert.equal(await readFile(filename, "utf8"), before);
});

test("a cached cover is never used for a different original URL", () => {
  for (const book of writing)
    assert.equal(
      writingCoverSource({
        id: book.id,
        coverImage: "https://example.com/a-different-cover.jpg",
      }),
      undefined,
    );
});
