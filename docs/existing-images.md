# Existing image policy

Joseph's direction after the audit: **“Use the images there already.”**

- Keep all six files under `public/projects/` unchanged. Render them with `next/image` for responsive delivery and WebP optimization.
- Keep all ten original writing-cover URLs and the complete writing records unchanged.
- Do not capture, generate, download, or substitute new project imagery.
- Ten project records have no local screenshot: `deep-ocean`, `drape`, `eduflow`, `hireflows`, `northgate`, `ember-spice`, `supportiq`, `master-prompter`, `scrolltek`, and `aduke-admin`. Their `image.src` is an empty string, not a broken URL. Cards and case studies show an explicit text fallback, and the real demo link remains on each case-study page.
- The request-time thumbnail service and its deployment warmup hook are removed. Production builds no longer depend on a screenshot service.
- No portrait exists. About remains text-only.

The live demos and original writing-cover CDN cannot be checked from this sandbox's network allowlist. That does **not** mean they are down. Existing covers remain usable by visitors whose browsers can reach the original CDN; the writing UI also provides a clearly labeled fallback on load failure.
