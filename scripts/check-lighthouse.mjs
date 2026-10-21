import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { browserOptions } from "./browser-utils.mjs";

const base = process.env.SITE_TEST_URL || "http://127.0.0.1:3000";
const options = await browserOptions();
const chrome = await launch({
  chromePath: options.executablePath,
  chromeFlags: [...options.args, "--disable-dev-shm-usage"],
  logLevel: "silent",
});
const results = [];
await mkdir("test-results/lighthouse", { recursive: true });
try {
  for (const route of ["/", "/work", "/work/kirvon", "/services", "/contact"]) {
    const result = await lighthouse(new URL(route, base).href, {
      port: chrome.port,
      logLevel: "error",
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor: "mobile",
      throttlingMethod: "simulate",
    });
    assert.ok(
      result && !result.lhr.runtimeError,
      JSON.stringify(result?.lhr.runtimeError),
    );
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([name, category]) => [
        name,
        Math.round(category.score * 100),
      ]),
    );
    const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    await writeFile(`test-results/lighthouse/${name}.json`, result.report[0]);
    await writeFile(`test-results/lighthouse/${name}.html`, result.report[1]);
    results.push({
      route,
      ...scores,
      lcp: result.lhr.audits["largest-contentful-paint"].displayValue,
      cls: result.lhr.audits["cumulative-layout-shift"].displayValue,
      warnings: result.lhr.runWarnings,
    });
    console.log(route, JSON.stringify(scores));
  }
  await writeFile(
    "test-results/lighthouse-summary.json",
    JSON.stringify(
      {
        lighthouseVersion: (
          await import("lighthouse/package.json", { with: { type: "json" } })
        ).default.version,
        mode: "Production server; simulated mobile throttling; local Linux Chromium",
        results,
      },
      null,
      2,
    ),
  );
  for (const result of results) {
    assert.ok(
      result.performance >= 85,
      `${result.route} performance: ${result.performance}`,
    );
    assert.ok(
      result.accessibility >= 95,
      `${result.route} accessibility: ${result.accessibility}`,
    );
    assert.ok(result.seo >= 95, `${result.route} SEO: ${result.seo}`);
    assert.ok(
      result["best-practices"] >= 95,
      `${result.route} best practices: ${result["best-practices"]}`,
    );
  }
  console.log(
    "All five mobile Lighthouse pages meet the requested thresholds.",
  );
} finally {
  await chrome.kill();
}
