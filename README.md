# Chenar — Joseph Unaogu

A portfolio and services site built with Next.js 15 App Router, React, TypeScript, and Tailwind CSS. Project, writing, service, and contact facts live in one shared content module.

## Local setup

Tested with Node.js **22.22.3** and npm **10.9.8**. Use Node 22.22 or newer in the Node 22 release line for the included verification tools.

```sh
npm ci
cp .env.example .env.local
npm run dev -- --hostname 0.0.0.0
```

Open the development server on port 3000. Binding to `0.0.0.0` also supports the Arena live preview; the development configuration permits its preview hosts.

For a production build:

```sh
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

### Canonical production origin

Set `NEXT_PUBLIC_SITE_URL` **before building**. The current default is `https://josephportifolio.vercel.app` (the spelling is intentional: it is the existing configured origin). Change it to the actual public deployment origin if that changes. Do not use a temporary preview URL as the production canonical.

This value supplies canonical URLs, Open Graph URLs, the sitemap, and structured data. It is public configuration, not a secret. No email-service credentials are required by the current implementation.

## Routes

| Route                       | Purpose                                                                         |
| --------------------------- | ------------------------------------------------------------------------------- |
| `/`                         | Main services, selected work, process, about, FAQ, and contact landing page     |
| `/work`                     | All 16 projects with accessible category filters                                |
| `/work/[slug]`              | Project detail, existing screenshot or labeled fallback, demo, and inquiry link |
| `/services`                 | Main services, copywriting, and additional services                             |
| `/about`                    | About Joseph, resume, and optional skills links                                 |
| `/writing`, `/writing/[id]` | The original 10 writing records and cover URLs                                  |
| `/contact`                  | Email, WhatsApp, LinkedIn, and a project-brief draft form                       |
| `/resume`                   | Print-friendly resume, including all projects                                   |
| `/skills`                   | Optional static three-ring skill constellation and complete text list           |
| `/now`                      | Short current-focus page                                                        |
| `/content`                  | YouTube content-support service                                                 |
| `/lab`                      | The three 3D projects                                                           |
| `/admin`                    | Read-only, noindex scaffold; not an authenticated content-management system     |
| `/api/contact`              | Validates a brief and prepares an unsent email draft                            |

Old `/projects` and `/projects/[slug]` page URLs redirect permanently to `/work` and `/work/[slug]`. The redirect intentionally does not match screenshot files under `/projects/`.

## Editing content and appearance

- `src/lib/content.ts`: the single runtime content source; all 16 projects, 10 writing pieces, services, navigation, skills, and unresolved editorial confirmations.
- `src/lib/theme.ts`: centralized light/dark RGB tokens. `src/app/globals.css` and `tailwind.config.ts` consume these tokens.
- `src/lib/seo.ts`: canonical origin, metadata helpers, and Person/ProfessionalService structured data.
- `src/lib/contact.ts`: shared validation, field limits, and safely encoded email drafts.
- `src/app/api/contact/route.ts`: JSON validation and draft preparation, with no message delivery or storage.
- `public/projects/`: six original, unchanged screenshots. Local screenshots use `next/image`; ten projects without a local screenshot use explicit text fallbacks.

The writing records, including cover URLs, are preserved exactly. The content test checks their serialized SHA-256 digest. No stock images, new project captures, or invented portrait have been added. See [the image policy](docs/existing-images.md).

### Contact delivery is not connected

The form prepares an **unsent email draft**. Visitors must open their email app and press Send, or copy the brief and email it themselves. The UI never reports successful delivery. The application does not log, store, or forward submitted briefs.

Before adding delivery, choose **Resend, Formspree, or Web3Forms**. Keep any provider secret server-side and out of Git; never use a `NEXT_PUBLIC_` secret. See [the delivery handoff](docs/contact-delivery.md).

## Verification

Fast checks do not need a running server:

```sh
npm run lint
npm test
npm run build
npm run typecheck
npm audit --omit=dev
```

Start the production server in a separate terminal, then run:

```sh
npm run test:browser
npm run test:lighthouse
```

Both server-based scripts default to `http://127.0.0.1:3000`. Set `SITE_TEST_URL` to test another origin. If you changed the canonical origin, export the same `NEXT_PUBLIC_SITE_URL` when running the browser checks; these standalone Node scripts do not automatically load `.env.local`.

The browser script checks all 37 public content routes, 99 internal link/anchor targets, redirects, original assets, head metadata, sitemap, robots, API responses, themes, keyboard controls, form errors and draft handling, responsive layouts, reduced motion, and resume printing. It runs axe in both themes and in additional interactive states. External requests are deliberately blocked, so the cover-image fallback is exercised rather than certifying external CDN availability.

The Lighthouse script measures five pages against a **production server** with simulated mobile throttling. It requires Performance ≥85 and Accessibility, Best Practices, and SEO ≥95 on every measured page.

On supported Linux hosts, the scripts use Chromium bundled in the npm dependency; no separate browser download is needed. On other systems, or to use an installed Chrome, set `CHROME_PATH` to that executable. The browser-only sandbox flags are confined to test tooling, not application code.

Reports, screenshots, and the print PDF are written to the ignored `test-results/` directory. Formatting is available with `npm run format`.

## Handoff

- [Route-by-route implementation and measured verification report](docs/restructure-report.md)
- [Contact delivery and provider setup decision](docs/contact-delivery.md)
- [Existing-image policy and missing screenshots](docs/existing-images.md)
- [Original audit and implementation plan](docs/restructure-audit.md)
- [Supplied content rewrite](docs/content-rewrite.md)

The production-only dependency audit is clean at handoff. The full audit still reports nine development-toolchain findings; details and verification limits are recorded in the report. Automated results are not a substitute for a manual assistive-technology review or a check of the deployed site on an unrestricted network.
