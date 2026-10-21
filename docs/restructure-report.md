# Chenar portfolio — implementation report

**Verification date:** 21 October 2026

**Working branch:** `arena/2d034660-joseph-unaogu-digital-hq`

Implemented the supplied restructure using the existing images, as directed. The application is available in the Arena live preview. This is a tested production build in the workspace, not a deployment to the public production domain.

## Changes by route

| Route                                                      | What changed                                                                                                                                                                                                                        |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                        | Plain supplied hero; three main services; six selected projects in the requested order; three-step process; short about section; keyboard-operable FAQ; contact CTA; footer. No animated background or invented statistics.         |
| `/work`                                                    | Replaces the project index. All 16 projects remain, with native-button category filters, counts, query state, clear status labels, and real project links.                                                                          |
| `/work/[slug]`                                             | All 16 original identifiers retained. Back link, name/status, existing screenshot or explicit fallback, what/who/contents/tools sections, visibly labeled new-tab demo, project-prefilled contact link, and three related projects. |
| `/projects`, `/projects/[slug]`                            | Permanent HTTP 308 redirects to the corresponding work routes. The six `/projects/*.png` and `*.webp` assets remain directly accessible.                                                                                            |
| `/services`                                                | Three main service groups; supporting copywriting; cover design, YouTube content, and custom AI services. No invented prices or schedules.                                                                                          |
| `/about`                                                   | Short factual biography, plain service description, and links to resume and optional skills. No invented degree, portrait, clients, or credentials.                                                                                 |
| `/contact`                                                 | Large direct email, WhatsApp, and LinkedIn links; labeled brief fields; project prefill; inline errors and focused error summary; pending/error states; hidden honeypot; honest unsent email-draft workflow.                        |
| `/api/contact`                                             | JSON POST handler with server validation, origin checks, byte limit, and no-store responses. Prepares a draft; does not send, log, store, or forward messages.                                                                      |
| `/writing`, `/writing/[id]`                                | Cleaner collection/detail presentation. All 10 original writing records, full text, statuses, and cover URLs are unchanged. Remote-image load failures show a labeled fallback.                                                     |
| `/resume`                                                  | Plain, print-friendly resume with real contact details, skills, services, and all 16 projects. Print/PDF output removes navigation and controls and stays light even from dark mode.                                                |
| `/skills`                                                  | Original 27 skills and three-ring constellation retained as a static, optional view; category controls and a complete text list. Small screens and reduced-motion users get the non-orbit presentation.                             |
| `/now`                                                     | Short current-focus page with no invented dated updates.                                                                                                                                                                            |
| `/content`                                                 | Retained as the YouTube content-support service page.                                                                                                                                                                               |
| `/lab`                                                     | Retained as a focused index of the three 3D projects.                                                                                                                                                                               |
| `/admin`                                                   | Preserved as a read-only, noindex scaffold. No claim of an authenticated admin backend.                                                                                                                                             |
| Unknown routes                                             | Plain 404 with Work and Contact links, including unknown project and writing identifiers.                                                                                                                                           |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon` | Sitemap for 37 public content URLs, crawl rules, local 1200×630 social image, and local icon. Admin is excluded from indexing.                                                                                                      |

### Shared implementation

- One runtime content source, `src/lib/content.ts`; project data is extended rather than duplicated in components.
- Centralized light/dark tokens, a system-default theme, persistent user choice, local Inter/Sora fonts, 18px body text, restrained borders and spacing, and limited button variants.
- Skip link, visible focus, 44px controls, mobile modal navigation with Tab/Shift+Tab containment, Escape and focus return, and reduced-motion support.
- `NEXT_PUBLIC_SITE_URL` supplies canonical and social URLs, sitemap links, and Person/ProfessionalService JSON-LD. The existing configured origin remains `https://josephportifolio.vercel.app` until explicitly changed.
- Unique page metadata is emitted **inside the initial HTML head**, including dynamic Work and Contact pages. A real Lighthouse failure exposed Next.js streaming descriptions into the body; metadata streaming is disabled for these fast local lookups, and head-specific regressions were added.
- Next.js updated to patched 15.5.28. Removed the request-time screenshot service, screenshot warmup hook, unused animated presentation, and external font dependency. Application/test sources were consistently formatted.

## Existing-image and content preservation

All six original project images are unchanged: Human Brain, Solar System, Velvet & Fade, Adura Glow, Kirvon, and Flowsource. They use responsive `next/image` delivery. The Flowsource screenshot is retained on the landing page and its detail page.

The other ten projects have **no local screenshot**: `deep-ocean`, `drape`, `eduflow`, `hireflows`, `northgate`, `ember-spice`, `supportiq`, `master-prompter`, `scrolltek`, and `aduke-admin`. Their cards and details say so rather than showing a broken remote thumbnail. No new project screenshots, stock photos, or portrait were generated or substituted. The text-only social image and icon are metadata assets, not substitute project imagery.

All 10 writing records and their cover URLs pass the original serialization check:

```text
SHA-256: b07002c78905de869146aad6732b1a3c895441c3c4969aa081071a022c6247af
```

See [the existing-image policy](existing-images.md) and [the unchanged supplied rewrite](content-rewrite.md).

## Verification results

### Actual mobile Lighthouse scores

Measured with **Lighthouse 13.5.0**, Linux Chromium, simulated mobile throttling, and `next start` after a successful production build. These are measured lab scores, not estimates or field Core Web Vitals.

| Route          | Performance | Accessibility | Best Practices | SEO |
| -------------- | ----------: | ------------: | -------------: | --: |
| `/`            |         100 |           100 |            100 | 100 |
| `/work`        |          95 |           100 |            100 | 100 |
| `/work/kirvon` |         100 |           100 |            100 | 100 |
| `/services`    |          99 |           100 |            100 | 100 |
| `/contact`     |         100 |           100 |            100 | 100 |

All five pass the requested thresholds: Performance ≥85; Accessibility, Best Practices, and SEO ≥95. No Lighthouse run warnings were returned. Scores can vary with hardware, cache, network, and deployed hosting behavior.

### Tests and inspection

| Check                        | Result                                                                                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`               | Passed with zero warnings                                                                                                                                |
| `npm run build`              | Passed; 46 generated pages; Next.js type/build checks passed                                                                                             |
| `npm test`                   | Content preservation checks and all 11 unit tests passed                                                                                                 |
| Public-route HTTP checks     | 37 content routes returned 200, with one h1 and title, description, and canonical in the head                                                            |
| Internal links and fragments | 99 distinct internal link/anchor targets checked; target pages and fragment IDs exist                                                                    |
| Admin indexing               | Read-only scaffold returned 200 with `noindex, nofollow`                                                                                                 |
| Legacy redirects             | `/projects` and all 16 original project slugs returned 308 to the corresponding Work route                                                               |
| Local image/metadata assets  | All six original screenshots returned 200; social image and icon dimensions verified                                                                     |
| axe                          | **33 scans, zero violations** across both themes and additional menu/form states, including all five required routes                                     |
| Keyboard                     | Skip link, FAQ Enter/Space, visible focus, mobile Tab/Shift+Tab containment, Escape/focus return, and native controls checked                            |
| Work/form/theme behavior     | Filters/counts/query state, theme persistence, project prefill, field errors/error-summary focus, honest draft status, and network-error fallback passed |
| Responsive reflow            | 26 page/viewport checks passed at 320px and 640 CSS px, without horizontal overflow                                                                      |
| Reduced motion               | Complete static skills list; no active animation loops in checked pages                                                                                  |
| Resume printing              | Actual PDF generated; navigation and controls hidden; dark-theme printing produces a light page with readable dark text                                  |
| Runtime errors               | No uncaught JavaScript errors in the browser run; required-page Lighthouse browser-error audits passed                                                   |
| Original writing             | All 10 records, statuses, cover URLs, and full summaries match the original digest                                                                       |
| Application copy             | Disallowed former brand absent; short supplied copy used, while original writing text remains intentionally unchanged                                    |
| Production dependency audit  | `npm audit --omit=dev`: **0 vulnerabilities**                                                                                                            |

The 640px reflow test covers the layout space of a 1280px window at 200% zoom. It is an automated equivalent-width check, **not** a physical browser-UI zoom or assistive-technology test. Desktop/light and mobile/light/dark screenshots were inspected. A manual real-device, browser-zoom, and screen-reader review remains useful; automated scores do not certify complete WCAG conformance.

The full dependency audit reports **9 development-toolchain findings: 7 high and 2 moderate**, in Tailwind/ESLint transitive chains (`braces`, glob/watch utilities, and PostCSS selectors/nesting). Safe compatible fixes were applied. The remaining suggested remedies include breaking framework/toolchain changes, so no forced major upgrade was made. These findings are not present in the production-only audit.

Reproducible commands and test prerequisites are in [README](../README.md). Local raw results are generated under ignored `test-results/`: `browser-report.json`, `lighthouse-summary.json`, five Lighthouse HTML/JSON pairs, screenshots, and `resume-print.pdf`. Large generated reports are not committed.

## Every unresolved confirmation

These four editorial placeholders remain registered in `src/lib/content.ts`. No unresolved placeholder or unconfirmed business promise is published to visitors.

| Placeholder                                                           | Current treatment                                               |
| --------------------------------------------------------------------- | --------------------------------------------------------------- |
| `{{CONFIRM: typical reply time}}`                                     | No response-time promise on Home or Contact.                    |
| `{{CONFIRM: whether you quote a price and timeline before starting}}` | The process says a plan is made; no quoting policy is invented. |
| `{{CONFIRM: optional starting prices}}`                               | No prices or suggested budget ranges published.                 |
| `{{CONFIRM: typical project timelines}}`                              | No days/weeks estimate published.                               |

**Separate integration decision:** choose Resend, Formspree, or Web3Forms before direct email delivery is added. No provider or secrets are configured. The present form only prepares an unsent draft. See [the contact handoff](contact-delivery.md).

## External demo and cover checks

**No demo has been verified as failed or working from this environment.** Outbound access does not permit these demo hosts, social/contact destinations, or the original writing-cover CDN. Unverified does not mean broken. Original URLs are retained; their syntax is checked, but a real network-health check is still required.

| Project                  | Preserved demo URL                              | Network status |
| ------------------------ | ----------------------------------------------- | -------------- |
| 3D Human Brain Explorer  | https://3d-human-brain-explorer.vercel.app/     | Unverified     |
| Solar System Explorer    | https://solar-system-explorer-silk.vercel.app/  | Unverified     |
| Deep Ocean Observatory   | https://deep-ocean-observatory.vercel.app/      | Unverified     |
| Drape                    | https://drape-fzs.pages.dev/                    | Unverified     |
| EduFlow                  | https://eduflow-five-psi.vercel.app/            | Unverified     |
| HireFlow                 | https://hireflows.vercel.app/                   | Unverified     |
| Velvet & Fade            | https://velvet-and-fade-salon.vercel.app/       | Unverified     |
| Northgate Properties     | https://northgate-properties.vercel.app/        | Unverified     |
| Ember & Spice            | https://ember-and-spice-kohl.vercel.app/        | Unverified     |
| Adura Glow Oil           | https://adura-glow-oil-store.vercel.app/        | Unverified     |
| Kirvon Store             | https://kirvonstore.vercel.app/                 | Unverified     |
| SupportIQ                | https://supportiq-two.vercel.app/               | Unverified     |
| Master Prompter          | https://masterprompter.vercel.app/              | Unverified     |
| Flowsource               | https://flowsource.vercel.app/                  | Unverified     |
| ScrollTek                | https://newsz-delta.vercel.app/                 | Unverified     |
| Aduke Studio Admin Panel | https://admin-dashboard-ashy-tau-44.vercel.app/ | Unverified     |

The browser checker deliberately aborts external requests and checks the writing-cover fallback. It does not claim the CDN is healthy or that the original remote cover files were locally inspected. Email/WhatsApp/LinkedIn/X links also need a normal-browser check outside the sandbox.

## Three suggested next improvements

1. **Choose and verify an email provider.** Add server-only delivery, anti-abuse controls appropriate to the deployment, and tests of real provider success/failure, while retaining the email fallback.
2. **Verify the public deployment on an unrestricted network and real devices.** Check all demo, cover, and social links; review native 200% zoom and a screen reader; confirm the production canonical origin. Keep existing imagery unless a new image decision is explicitly approved.
3. **Plan a separate development-toolchain update.** Resolve the remaining Tailwind/ESLint audit findings with an intentional, tested upgrade rather than a forced major migration during this content restructure.
