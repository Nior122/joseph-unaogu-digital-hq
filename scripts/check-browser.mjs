import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { browserOptions } from "./browser-utils.mjs";
import { content } from "./check-content.mjs";

const base = process.env.SITE_TEST_URL || "http://127.0.0.1:3000";
const origin = new URL(base).origin;
const canonicalBase = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://josephportifolio.vercel.app"
).replace(/\/$/, "");
const fixed = [
  "/",
  "/work",
  "/services",
  "/about",
  "/writing",
  "/contact",
  "/resume",
  "/now",
  "/skills",
  "/content",
  "/lab",
];
const allRoutes = [
  ...fixed,
  ...content.projects.map((project) => `/work/${project.slug}`),
  ...content.writing.map((book) => `/writing/${book.id}`),
];
const report = {
  routes: [],
  axe: [],
  keyboard: [],
  responsive: [],
  api: [],
  images: [],
  internalLinks: [],
  javascriptErrors: [],
};
await mkdir("test-results", { recursive: true });
const htmlByUrl = new Map();
const internalLinks = new Set();

for (const route of allRoutes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${route} needs one h1`,
  );
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const title = head.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${route} title must be in the head`);
  assert.ok(
    head.includes('name="description"'),
    `${route} description must be in the head`,
  );
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${route} canonical`);
  assert.equal(
    new URL(canonical).href,
    new URL(route, canonicalBase).href,
    `${route} canonical`,
  );
  htmlByUrl.set(new URL(route, base).href, html);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const target = new URL(
      match[1].replaceAll("&amp;", "&"),
      new URL(route, base),
    );
    if (target.origin === origin) internalLinks.add(target.href);
  }
  report.routes.push({ route, status: response.status });
}
for (const href of internalLinks) {
  const target = new URL(href);
  const fragment = decodeURIComponent(target.hash.slice(1));
  target.hash = "";
  if (!htmlByUrl.has(target.href)) {
    const response = await fetch(target);
    assert.equal(response.status, 200, `Internal link: ${href}`);
    htmlByUrl.set(target.href, await response.text());
  }
  if (fragment)
    assert.ok(
      htmlByUrl.get(target.href).includes(`id="${fragment}"`),
      `Missing fragment: ${href}`,
    );
  report.internalLinks.push(href);
}
const adminResponse = await fetch(new URL("/admin", base));
assert.equal(adminResponse.status, 200);
assert.match(
  await adminResponse.text(),
  /<meta name="robots" content="noindex,\s?nofollow"/,
);
for (const project of content.projects) {
  const response = await fetch(new URL(`/projects/${project.slug}`, base), {
    redirect: "manual",
  });
  assert.equal(response.status, 308);
  assert.equal(
    new URL(response.headers.get("location"), base).pathname,
    `/work/${project.slug}`,
  );
}
const legacyIndex = await fetch(
  new URL("/projects?category=ai-automation", base),
  { redirect: "manual" },
);
assert.equal(legacyIndex.status, 308);
assert.equal(
  new URL(legacyIndex.headers.get("location"), base).pathname,
  "/work",
);
assert.equal(
  new URL(legacyIndex.headers.get("location"), base).searchParams.get(
    "category",
  ),
  "ai-automation",
);
for (const project of content.projects.filter((item) => item.image.src)) {
  const response = await fetch(new URL(project.image.src, base), {
    redirect: "manual",
  });
  assert.equal(response.status, 200, `${project.image.src} must not redirect`);
  report.images.push(project.image.src);
}
for (const route of [
  "/not-a-real-page",
  "/work/not-a-real-project",
  "/writing/not-a-real-piece",
]) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 404, route);
  const html = await response.text();
  assert.ok(html.includes("That page isn"), route);
}
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
assert.equal((sitemap.match(/<loc>/g) || []).length, 37);
assert.ok(!sitemap.includes("/projects/") && !sitemap.includes("/admin"));
for (const route of allRoutes)
  assert.ok(sitemap.includes(`${canonicalBase}${route}`), `sitemap ${route}`);
const robots = await (await fetch(new URL("/robots.txt", base))).text();
assert.ok(
  robots.includes(`${canonicalBase}/sitemap.xml`) &&
    robots.includes("Disallow: /admin"),
);
for (const [route, width, height] of [
  ["/opengraph-image", 1200, 630],
  ["/icon", 64, 64],
]) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const metadata = await sharp(
    Buffer.from(await response.arrayBuffer()),
  ).metadata();
  assert.equal(metadata.width, width);
  assert.equal(metadata.height, height);
}

const validBrief = {
  name: "Browser test",
  email: "browser@example.com",
  service: "Website",
  message: "This is a test of the project brief validation.",
  budget: "",
  deadline: "",
  project: "kirvon",
  website: "",
};
async function post(body, expected, headers = {}) {
  const response = await fetch(new URL("/api/contact", base), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  assert.equal(response.status, expected);
  assert.equal(response.headers.get("cache-control"), "no-store");
  report.api.push(expected);
  return response.json();
}
const draftResponse = await post(validBrief, 200);
assert.equal(draftResponse.delivery, "mailto");
assert.ok(draftResponse.mailto.startsWith(`mailto:${content.site.email}?`));
assert.ok(draftResponse.text.includes("Kirvon Store"));
await post({}, 422);
await post({ ...validBrief, website: "filled-honeypot" }, 422);
await post({ ...validBrief, email: "bad-email" }, 422);
await post({ ...validBrief, message: "a".repeat(5001) }, 422);
await post("not json", 400);
await post("a".repeat(33000), 413);
await post(validBrief, 403, { Origin: "https://different.example" });
await post(validBrief, 415, { "Content-Type": "text/plain" });

const browser = await chromium.launch(await browserOptions());
try {
  const axeRoutes = [
    ...fixed,
    "/work/kirvon",
    "/work/flowsource",
    "/work/human-brain",
    "/writing/productivity-busy-moms",
  ];
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: theme,
    });
    // Original writing-cover hosts are outside this sandbox's allowlist. Test their visible failure fallback.
    await context.route("**/*", (route) =>
      new URL(route.request().url()).origin === origin
        ? route.continue()
        : route.abort(),
    );
    const page = await context.newPage();
    page.on("pageerror", (error) =>
      report.javascriptErrors.push(error.message),
    );
    for (const route of axeRoutes) {
      await page.goto(new URL(route, base).href, { waitUntil: "networkidle" });
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        theme,
      );
      assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      report.axe.push({
        route,
        theme,
        violations: results.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          targets: violation.nodes.map((node) => node.target),
        })),
      });
      const smallTargets = await page
        .locator(
          "a[href], button, input:not([type=hidden]), select, textarea, summary",
        )
        .evaluateAll((elements) =>
          elements.flatMap((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            if (!rect.width || !rect.height || style.visibility === "hidden")
              return [];
            return rect.width < 43.9 || rect.height < 43.9
              ? [
                  {
                    tag: element.tagName,
                    name: element.textContent?.trim().slice(0, 60),
                    width: rect.width,
                    height: rect.height,
                  },
                ]
              : [];
          }),
        );
      assert.deepEqual(
        smallTargets,
        [],
        `${route} ${theme} has undersized controls`,
      );
      console.log(
        `axe ${theme} ${route}: ${results.violations.length} violations`,
      );
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "light",
  });
  await context.route("**/*", (route) =>
    new URL(route.request().url()).origin === origin
      ? route.continue()
      : route.abort(),
  );
  const page = await context.newPage();
  page.on("pageerror", (error) => report.javascriptErrors.push(error.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  assert.equal(
    await page.locator(":focus").textContent(),
    "Skip to main content",
  );
  const focusRing = await page.locator(":focus").evaluate((element) => ({
    width: getComputedStyle(element).outlineWidth,
    style: getComputedStyle(element).outlineStyle,
  }));
  assert.equal(focusRing.width, "2px");
  assert.equal(focusRing.style, "solid");
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(":focus").getAttribute("id"), "main-content");
  const question = page.getByRole("button", {
    name: "I'm not technical. Is that a problem?",
  });
  await question.focus();
  await page.keyboard.press("Enter");
  assert.equal(await question.getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Space");
  assert.equal(await question.getAttribute("aria-expanded"), "false");
  report.keyboard.push(
    "skip link and visible focus",
    "FAQ Enter/Space controls",
  );
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  report.keyboard.push("theme toggle and preference persistence");
  await page.setViewportSize({ width: 320, height: 800 });
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.focus();
  await page.keyboard.press("Enter");
  await page.waitForSelector("dialog[open]");
  const focusables = page.locator("dialog button, dialog a[href]");
  await focusables.last().focus();
  await page.keyboard.press("Tab");
  assert.equal(
    await page
      .locator(":focus")
      .evaluate((element) => !!element.closest("dialog")),
    true,
  );
  await focusables.first().focus();
  await page.keyboard.press("Shift+Tab");
  assert.equal(
    await page
      .locator(":focus")
      .evaluate((element) => !!element.closest("dialog")),
    true,
  );
  const menuAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  report.axe.push({
    route: "mobile menu",
    theme: "light",
    violations: menuAxe.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
    })),
  });
  await page.keyboard.press("Escape");
  await page.waitForSelector("dialog[open]", { state: "hidden" });
  assert.equal(
    await page.locator(":focus").getAttribute("aria-controls"),
    "mobile-menu",
  );
  report.keyboard.push(
    "native modal focus containment, Shift+Tab, Escape and return focus",
  );

  await page.goto(`${base}/work?type=3d-experiences`, {
    waitUntil: "networkidle",
  });
  assert.equal(await page.locator(".project-card").count(), 3);
  await page
    .getByRole("button", { name: "AI and automation", exact: true })
    .click();
  assert.equal(await page.locator(".project-card").count(), 5);
  assert.ok(page.url().includes("type=ai-automation"));
  await page
    .getByRole("button", { name: "Apps and dashboards", exact: true })
    .click();
  assert.equal(await page.locator(".project-card").count(), 1);
  await page.getByRole("button", { name: "All", exact: true }).click();
  assert.equal(await page.locator(".project-card").count(), 16);
  report.keyboard.push("all typed filters, counts and query state");

  await page.goto(`${base}/contact?project=kirvon#project-brief`, {
    waitUntil: "networkidle",
  });
  assert.ok(
    (await page.locator("#brief-message").inputValue()).startsWith(
      "I'm interested in: Kirvon Store",
    ),
  );
  assert.equal(await page.locator("#brief-service").inputValue(), "Website");
  await page.getByRole("button", { name: "Send my brief" }).click();
  assert.equal(
    await page.locator("#brief-name").getAttribute("aria-invalid"),
    "true",
  );
  assert.equal(
    await page.locator("#brief-name").getAttribute("aria-describedby"),
    "brief-name-error",
  );
  await page.waitForFunction(
    () => document.activeElement?.getAttribute("role") === "alert",
  );
  assert.equal(await page.locator(":focus").getAttribute("role"), "alert");
  const errorAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  report.axe.push({
    route: "contact validation errors",
    theme: "light",
    violations: errorAxe.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
    })),
  });
  await page.getByRole("textbox", { name: /Your name/ }).fill("A visitor");
  await page
    .getByRole("textbox", { name: /Your email/ })
    .fill("visitor@example.com");
  await page.getByRole("button", { name: "Send my brief" }).click();
  await page
    .getByRole("heading", { name: "Your email draft is ready" })
    .waitFor();
  const draftAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  report.axe.push({
    route: "contact prepared draft",
    theme: "light",
    violations: draftAxe.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
    })),
  });
  assert.ok(
    (
      await page
        .getByRole("link", { name: "Open my email draft" })
        .getAttribute("href")
    ).startsWith(`mailto:${content.site.email}?`),
  );
  assert.ok(
    (await page.locator('[role="status"]').textContent()).includes(
      "has not been sent",
    ),
  );
  await page
    .getByRole("textbox", { name: /Tell me about your project/ })
    .fill("I changed the details of the project brief.");
  assert.equal(
    await page
      .getByRole("heading", { name: "Your email draft is ready" })
      .count(),
    0,
    "Editing invalidates the old draft",
  );
  await page.route("**/api/contact", (route) => route.abort());
  await page.getByRole("button", { name: "Send my brief" }).click();
  await page
    .getByText(
      "Something went wrong and your message was not sent. Please email me directly or use WhatsApp.",
      { exact: true },
    )
    .waitFor();
  await page.unroute("**/api/contact");
  report.keyboard.push(
    "project prefill, visible labels, described errors, honest draft status and network-error fallback",
  );

  for (const width of [320, 640]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      ...fixed,
      "/work/kirvon",
      "/writing/boundary-mastery",
    ]) {
      await page.goto(new URL(route, base).href, { waitUntil: "networkidle" });
      const measurements = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        font: parseFloat(getComputedStyle(document.body).fontSize),
      }));
      assert.ok(
        measurements.scrollWidth <= measurements.viewport + 1,
        `${route} overflow at ${width}: ${JSON.stringify(measurements)}`,
      );
      assert.ok(measurements.font >= 18);
      report.responsive.push({ route, width, horizontalOverflow: false });
    }
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${base}/skills`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("#skill-list .bullet-list > li").count(), 27);
  assert.equal(await page.locator(".skill-orbit").isVisible(), false);
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
  report.keyboard.push(
    "complete static skills and no reduced-motion animation loops",
  );
  await page.emulateMedia({
    reducedMotion: "no-preference",
    colorScheme: "dark",
  });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.goto(`${base}/resume`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  assert.equal(await page.locator(".site-header").isVisible(), false);
  assert.equal(await page.locator(".site-footer").isVisible(), false);
  const printColors = await page.evaluate(() => ({
    bg: getComputedStyle(document.body).backgroundColor,
    text: getComputedStyle(document.body).color,
  }));
  assert.equal(printColors.bg, "rgb(255, 255, 255)");
  assert.equal(printColors.text, "rgb(0, 0, 0)");
  await page.pdf({
    path: "test-results/resume-print.pdf",
    format: "A4",
    printBackground: true,
  });
  report.keyboard.push("light, control-free PDF printing from dark theme");
  await page.emulateMedia({ media: "screen", colorScheme: "light" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.screenshot({
    path: "test-results/home-dark-mobile.png",
    fullPage: true,
  });
  await context.close();
  assert.deepEqual(report.javascriptErrors, []);
  await writeFile(
    "test-results/browser-report.json",
    JSON.stringify(report, null, 2),
  );
  const violations = report.axe.flatMap((scan) =>
    scan.violations.map((violation) => ({
      ...violation,
      route: scan.route,
      theme: scan.theme,
    })),
  );
  assert.deepEqual(
    violations,
    [],
    "Accessibility violations must be fixed; see test-results/browser-report.json",
  );
  console.log(
    `Browser checks passed: ${report.routes.length} content routes, ${report.internalLinks.length} internal links/anchors, 17 redirects, 6 local images, ${report.axe.length} axe scans, keyboard/form/theme/print checks and ${report.responsive.length} reflow checks.`,
  );
} finally {
  await browser.close();
}
