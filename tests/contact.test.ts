import assert from "node:assert/strict";
import { test } from "node:test";
import { validateBrief, prepareEmailDraft } from "../src/lib/contact";
import { colorTokens } from "../src/lib/theme";
import { projects, projectMatchesFilter } from "../src/lib/content";
import { absoluteUrl, pageMetadata, seoPages } from "../src/lib/seo";

const valid = {
  name: "A visitor",
  email: "visitor@example.com",
  service: "Website",
  message: "I would like a website that explains my services.",
  budget: "",
  deadline: "",
  website: "",
  project: "",
};
test("a complete brief is trimmed and accepted without optional fields", () => {
  const result = validateBrief({ ...valid, name: "  A visitor  " });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.name, "A visitor");
});
test("required fields get visible, field-specific errors", () => {
  const result = validateBrief({
    ...valid,
    name: "",
    email: "not-an-email",
    service: "Unknown",
    message: "short",
  });
  assert.equal(result.ok, false);
  if (!result.ok)
    for (const field of ["name", "email", "service", "message"] as const)
      assert.ok(result.errors[field]);
});
test("missing/non-object bodies and non-string required fields are rejected", () => {
  for (const input of [
    null,
    [],
    "hello",
    { ...valid, name: {} },
    { ...valid, email: 12 },
  ])
    assert.equal(validateBrief(input).ok, false);
});
test("the honeypot never produces a successful draft", () =>
  assert.equal(
    validateBrief({ ...valid, website: "https://spam.example" }).ok,
    false,
  ));
test("single-line fields reject line breaks", () => {
  for (const field of ["name", "budget", "deadline"])
    assert.equal(validateBrief({ ...valid, [field]: "one\ntwo" }).ok, false);
});
test("field length limits are enforced server-side", () => {
  for (const [field, length] of [
    ["name", 101],
    ["message", 5001],
    ["budget", 101],
    ["deadline", 121],
  ] as const)
    assert.equal(
      validateBrief({ ...valid, [field]: "a".repeat(length) }).ok,
      false,
    );
});
test("only known project identifiers are accepted", () => {
  assert.equal(validateBrief({ ...valid, project: "flowsource" }).ok, true);
  assert.equal(
    validateBrief({ ...valid, project: "unknown-project" }).ok,
    false,
  );
});
test("email fallback encodes user text and retains every useful field", () => {
  const draft = prepareEmailDraft({
    ...valid,
    name: "A & B",
    project: "kirvon",
    budget: "To discuss",
    deadline: "Not sure",
  });
  assert.ok(draft.href.startsWith("mailto:chinecheremjoseph39@gmail.com?"));
  const url = new URL(draft.href);
  assert.match(url.searchParams.get("subject")!, /A & B/);
  assert.match(url.searchParams.get("body")!, /Kirvon Store/);
  assert.match(url.searchParams.get("body")!, /visitor@example.com/);
  assert.match(draft.text, /Budget: To discuss/);
  assert.match(draft.text, /Deadline: Not sure/);
});
function luminance(rgb: string) {
  const [r, g, b] = rgb
    .split(" ")
    .map(Number)
    .map((value) => {
      const color = value / 255;
      return color <= 0.04045
        ? color / 12.92
        : ((color + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
test("both themes meet normal-text, focus and UI-border contrast targets", () => {
  for (const [name, theme] of Object.entries(colorTokens)) {
    for (const background of [
      "canvas",
      "surface",
      "soft",
      "accent-soft",
    ] as const) {
      for (const foreground of ["text", "muted", "accent", "danger"] as const)
        assert.ok(
          contrast(theme[foreground], theme[background]) >= 4.5,
          `${name} ${foreground}/${background}`,
        );
      assert.ok(
        contrast(theme.border, theme[background]) >= 3,
        `${name} border/${background}`,
      );
    }
    assert.ok(
      contrast(theme.accent, theme["on-accent"]) >= 4.5,
      `${name} button`,
    );
  }
});
test("all work filters account for the original project collection", () => {
  assert.equal(
    projects.filter((project) => projectMatchesFilter(project, "websites"))
      .length,
    7,
  );
  assert.equal(
    projects.filter((project) => projectMatchesFilter(project, "ai-automation"))
      .length,
    5,
  );
  assert.equal(
    projects.filter((project) => projectMatchesFilter(project, "apps")).length,
    1,
  );
  assert.equal(
    projects.filter((project) =>
      projectMatchesFilter(project, "3d-experiences"),
    ).length,
    3,
  );
});
test("page metadata is unique, bounded and canonical", () => {
  const titles = new Set<string>();
  for (const page of Object.values(seoPages)) {
    assert.ok(page.title.length <= 60);
    assert.ok(page.description.length <= 155);
    assert.ok(!titles.has(page.title));
    titles.add(page.title);
    const metadata = pageMetadata(page.title, page.description, page.path);
    assert.equal(metadata.alternates?.canonical, absoluteUrl(page.path));
  }
  assert.ok(
    (pageMetadata("A ".repeat(50), "Description ".repeat(50), "/test")
      .description?.length ?? 0) <= 155,
  );
});
