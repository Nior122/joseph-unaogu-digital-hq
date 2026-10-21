# Chenar portfolio: audit and implementation plan

- Date: 2026-10-21
- Baseline commit: `3823a33`
- Working branch: `arena/2d034660-joseph-unaogu-digital-hq`
- Status: **Audit complete. Waiting for Joseph's “go” before changing application code.**

## 1. Scope and working agreement

Both supplied documents were read in full: `claude-code-master-prompt.md` (206 lines) and `content-rewrite.md` (396 lines). The latter is preserved unchanged at `docs/content-rewrite.md` as the copy reference, not a second runtime data source.

The master prompt explicitly requires an audit, a plan, and approval before implementation. This checkpoint changes documentation only. The repository's application files, configuration, dependencies, images, and lockfile are unchanged.

The requested separate branch cannot be used in this Arena session. All work and checkpoint commits will stay on the existing session branch named above. No branch switch, push, pull request, or deployment is needed for the audit.

## 2. Repository and libraries

- Next.js **14.2.15**, App Router, React **18.3.1**, TypeScript **5.6.3** with strict checking.
- Tailwind CSS **3.4.14**, PostCSS, Autoprefixer; `clsx` and `tailwind-merge` compose classes.
- Framer Motion **11.11.9** powers reveal effects, rotating hero text, and project-grid transitions.
- `next-themes` **0.4.6** manages theme persistence and system preference support.
- `lucide-react` supplies icons.
- Self-hosted Fontsource packages supply Inter, Sora, and JetBrains Mono. The root layout imports 20 font-weight stylesheets; reduce unused weights and keep body text in one clear sans-serif family.
- No React Flow, Three.js, React Three Fiber, CMS, database, authentication package, mail provider, browser-test suite, or accessibility-test suite is installed. Three.js and similar tool names occur in project descriptions, not in the portfolio implementation.
- `next.config.mjs` currently enables only React strict mode. It has no redirects or image host configuration.
- No `.env.example` or README exists. Add configuration/setup guidance during implementation without placing secrets in Git.
- `npm ci` succeeded. It reported that the installed Next.js version has a known security vulnerability and that several lint-related dependencies are deprecated. Review a compatible patched framework/ESLint release after approval; do not assume a successful build means the dependencies are secure.

## 3. Current routes and disposition

The application has 12 fixed content pages, two dynamic detail-page families, a custom 404, and two metadata routes. There is no API route handler.

| Current route | Current purpose | Planned disposition |
| --- | --- | --- |
| `/` | Animated personal introduction, three tickers, exploration/building lists, Lab CTA, five-step process, six services, contact CTA | Replace with the exact landing-page section order from the brief. Show six named projects and a clear Hire me CTA. |
| `/projects` | All 16 projects; category query parameter and eight filters | Permanently redirect to `/work`; preserve/map useful category query values. |
| `/projects/[id]` | 16 generated case studies | Permanently redirect to `/work/[slug]`, preserving all existing identifiers. |
| `/services` | Six services plus four positioning groups | Three main services and three extras, with links to relevant proof and contact. Keep copywriting within Writing and eBooks. |
| `/about` | About text, at-a-glance facts, undated personal timeline | Short supplied biography, plain-language skills, resume/contact links, optional skills-map link. |
| `/writing` | Ten writing entries, filters, animated hero, publishing process, cover styles, copywriting | Keep all ten records and cover URLs unchanged; simplify layout and surrounding copy. |
| `/writing/[id]` | Ten generated writing detail pages with full summaries, themes, status, optional excerpt | Keep routes and all original writing content; improve readability, headings, metadata, and focus styling. |
| `/contact` | Email/WhatsApp/social options and client-only mailto form | Three large contact options and an accessible brief form; project query prefill; server validation/honeypot; mailto fallback until a provider is chosen. |
| `/resume` | Resume generated from shared data and a working browser print button | Keep and add proper print styling. Correct the misleading Download Resume link. |
| `/now` | Five current-focus items | Keep and include the existing Currently Exploring and Building Now content here. Footer link only. |
| `/skills` | 27-node skill constellation plus content/media skills | Keep as optional extra linked from About. Add a complete static list; remove motion loops in reduced-motion mode. |
| `/content` | YouTube/content capabilities, content/media skills, contact CTA | Keep working as a secondary service-proof page, linked from the content service. It is not an article archive. |
| `/lab` | Exploration list and the shared project grid | Keep as a secondary page rather than silently deleting content; update its links/grid for `/work`. No main-nav link. |
| `/admin` | Public, nonfunctional architecture scaffold describing editing/CMS options | Preserve, keep `noindex`, exclude from sitemap, and update any stale data/image documentation. It is not a protected admin system. |
| unmatched paths | Lab-themed custom 404 | Replace with supplied plain-language message and Home, My work, Contact links. |
| `/robots.txt` | Allow all; sitemap on the wrong domain | Use configured site URL; exclude admin from indexing rules as appropriate. |
| `/sitemap.xml` | Nine fixed routes; no detail pages | List canonical public routes, all 16 case studies, and all ten writing pages from shared data. No old redirect URLs or admin. |

New routes: `/work`, `/work/[slug]`, a contact validation route such as `/api/contact`, and an Open Graph image route or local asset. `next.config.mjs` will define permanent (308) redirects for both legacy project paths.

## 4. Shared content: the single source of truth

`src/lib/content.ts` is the runtime content source. `/resume` directly imports `site`, `skillNodes`, `services`, `projects`, and `aboutParagraphs` from it. Other pages and components use the same exports. No separate CMS or hidden content store was found.

Keep this module as the authoritative source and extend it rather than creating duplicate project, service, or writing arrays inside pages. The new copy, FAQ, process, filter labels, service groupings, navigation, contact choices, and selected-project identifiers should be defined once and reused where appropriate.

### Project shape today

```ts
type Project = {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  accent: string;
  status: 'live' | 'in-progress' | 'experiment' | 'concept' | 'archived';
  availability: ProjectAvailability;
  featured?: boolean;
  tech: string[];
  role: string;
  problem: string;
  approach: string;
  lessons: string;
  health: 'ONLINE' | 'OFFLINE' | 'AUTH_REQUIRED' | 'ERROR' | 'UNKNOWN';
  lastChecked: string;
  lastPreview?: string;
  previewImage?: string;
  repo?: string;
  screenshotVersion?: number;
};
```

There are exactly **16** projects. Fourteen have `featured: true`. All currently have `status: 'live'` except SupportIQ (`in-progress`), while the three 3D projects have `availability: 'Concept'`. Every record has `health: 'ONLINE'` and `lastChecked: 'Recent'`; these are stored strings, not a live health-check system.

Extend/migrate this same array to the required `slug`, typed `type`, normalized `status`, `statusLabel`, `oneLiner` (at most 140 characters), `whatItIs`, `whoItsFor`, `whatsInside`, optional `stack`/`liveUrl`, and `image: { src, alt }` fields. Preserve existing project identifiers, URLs, tools, and useful original case-study notes without publishing them as verified client work or measured outcomes. Legacy fields may remain during migration where shared components still need them.

| Identifier | Planned type | Planned status | Existing local image |
| --- | --- | --- | --- |
| `human-brain` | `3d-experience` | concept | `/projects/human-brain.png` |
| `solar-system` | `3d-experience` | concept | `/projects/solar-system.png` |
| `deep-ocean` | `3d-experience` | concept | None |
| `drape` | `website` | available | None |
| `eduflow` | `ai-automation` | available | None |
| `hireflows` | `ai-automation` | available | None |
| `velvet-fade` | `website` | available | `/projects/velvet-fade.webp` |
| `northgate` | `website` | available | None |
| `ember-spice` | `website` | available | None |
| `adura-glow` | `website` | available | `/projects/adura-glow.webp` |
| `kirvon` | `website` | available | `/projects/kirvon.webp` |
| `supportiq` | `ai-automation` | private-preview | None |
| `master-prompter` | `ai-automation` | available | None |
| `flowsource` | `ai-automation` | available | `/projects/flowsource.webp` |
| `scrolltek` | `website` | available | None |
| `aduke-admin` | `dashboard` | available | None |

Filters will be All, Websites, AI and automation, Apps and dashboards, and 3D experiences. Apps and dashboards can include both `web-app` and `dashboard` types; existing AI-assisted apps will appear under AI and automation as classified in the supplied case-study copy. The requested model retains `web-app` for appropriate future entries.

The selected home projects, in order, will be `kirvon`, `velvet-fade`, `northgate`, `eduflow`, `hireflows`, and `flowsource`.

### Service shape today

```ts
type Service = {
  id: string;
  title: string;
  accent: string;
  summary: string;
  highlights: string[];
  cta: string;
  ctaHref: string;
  ctaLabel: string;
};
```

Six records exist: `ebooks`, `copywriting`, `ai-automation`, `web`, `ebook-cover`, `youtube`. Extend/group the shared service data for Websites, AI and automation, and Writing and eBooks, plus cover design, YouTube/content support, and custom AI web apps. Preserve the existing six capabilities and the `/content` link. Add audience, deliverables, example project references, and plain-language CTAs in the shared source. Preserve useful existing anchor links such as `#copywriting`.

### Writing shape today

```ts
type Writing = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  genre: 'fiction' | 'nonfiction';
  category: string;
  subcategory?: string;
  description: string;
  summary?: string;
  themes: string[];
  status: 'Published' | 'In Development' | 'Researching' |
          'Concept' | 'Idea' | 'Draft' | 'Planning';
  excerpt?: string;
  coverColor?: string;
  coverImage?: string;
  featured?: boolean;
  published?: boolean;
  link?: string;
};
```

All **10** required entries are present: `productivity-busy-moms`, `ai-tools-vas`, `ai-freelancers`, `the-trust-factor`, `dark-psychology`, `boundary-mastery`, `male-female-dynamic`, `shadows-of-tomorrow`, `the-last-archive`, and `copywriting-portfolio`. Eight are nonfiction and two are fiction. None is marked Published. All have a remote cover URL on `cdn.phototourl.com`; there are no local covers. Keep the records, statuses, full summaries, themes, identifiers, and cover URLs exactly as supplied by the existing source. Do not imply that unfinished pieces are published books.

### Other reusable exports

The source also contains contact/social facts, about paragraphs, an undated timeline, 27 skill nodes and categories, 12 media/content skills, exploration/building/current-focus lists, process content, and FAQ data. Move the relevant lists to Now; preserve the constellation data and Flowsource screenshot/visual fallback while simplifying their presentation.

## 5. Components and accessibility findings

| Component group | Current implementation | Required change |
| --- | --- | --- |
| Root layout | Fixed navbar, global mouse-following backdrop, one main, footer, dark-default theme | Add first-focusable skip link and main target; simplify background; system-default light/dark theme. |
| Header/footer | Eight nav links plus Let's talk; Joseph wordmark; footer omits Resume | Chenar wordmark; five nav items plus Hire me; footer Resume/Now/social links and © Chenar. |
| Mobile menu | Icon-only 40px trigger, scroll locking, no Escape/focus trap/return focus | Visible Menu/Close menu text, 44px targets, focus containment, Escape close, return focus, background isolation. |
| Theme toggle | Cycles five themes; unlabeled pre-mount button; 40px targets | Accessible light/dark toggle with action labels; follow system preference initially. |
| Hero/terminal/tickers | Rotating words, interval-driven terminal rows, repeated infinite tickers | Remove from home; replace with supplied clear hero. Do not introduce replacement autoplay effects. |
| `Reveal`, sections, headers | Framer Motion wrapper and shared heading helpers | Prefer server-rendered visible content and minimal/no motion; keep a logical heading outline. |
| Project grid/preview | Client-side filters, Framer layout animation, raw images, designed fallback | Reusable semantic cards, meaningful image/link text, normalized text status labels, pressed-state filters, local `next/image` screenshots. |
| Constellation | CSS-positioned skill buttons with hover/focus popups; 30–52px nodes and 8–10px labels | Keep component/visual identity on `/skills`; add full static list and clear keyboard labels, larger usable targets, reduced-motion/static mode. No Framer/Tailwind transform conflict. |
| Contact form | Mailto only; labels lack `htmlFor`/input IDs; no deadline/honeypot/server validation | Visible linked labels, autocomplete and limits, inline described errors, announced status, deadline field, query prefill, server validation. Never claim mailto was delivered. |
| Resume/print | `window.print()` works; no `@media print` rules | Hide navigation/controls/background when printing, use legible light print colors, correct download/save-PDF action. |
| SEO | Person JSON-LD only, hard-coded unrelated domain, no OG image/canonicals | Environment-based URLs, per-page metadata, Person and Chenar ProfessionalService schemas, OG image, complete sitemap/robots. |

Additional verified issues:

- The Experiments filter returns **zero projects**: it checks `status` instead of the category or availability used for the three concept projects.
- SupportIQ is labeled Private Preview in availability but has `health: 'ONLINE'`, so the auth-only screenshot guard does not apply. Availability and screenshot access must not be inferred from an unverified health string.
- `ProjectPreview` starts local and remote image requests together. The first successful load wins; comments describing a strict source-priority pipeline do not reflect the actual loading behavior.
- Many body paragraphs are 14px or 16px, smaller than the required 18px. There is no site-wide 65ch reading-width rule.
- Token contrast calculations: dark dim text `#69728a` on `#050609` is **4.22:1**; light dim text `#94a3b8` on white is **2.56:1**; cyan text `#3df0ff` on white is **1.39:1**. These fail the 4.5:1 normal-text target. Semi-transparent variants can be worse.
- Most borders use translucent white and disappear in light mode; many accents and backgrounds are hard-coded in components/content rather than semantic theme tokens.
- CSS explicitly keeps constellation glow looping even under `prefers-reduced-motion`. Hero/writing interval changes also need reduced-motion handling or removal; CSS alone does not stop JavaScript timers.
- Writing cover links remove their focus outline without a reliable replacement. Several sections skip heading levels.
- `/resume` has a Download Resume link that goes to `/contact`, and `site.resumeUrl` is `#`. No downloadable PDF exists; use the real print/save-PDF path instead of fabricating a file.
- The new copy's SEO table has unescaped pipes in page titles. Treat the intended title as a single string, not as separate table cells.
- The supplied SEO wording calls Joseph a graduate, while the confirmed fact is only that he studied Computer Science. Use the confirmed wording rather than adding a graduation claim.
- No portrait exists in `public/`. Keep the About sections text-only; do not create a fake portrait or use stock photos.
- The forbidden former agency name was not found in tracked application/configuration files at baseline.

## 6. Images, network constraints, and live URLs

Six local project assets exist and will be kept unchanged:

| Asset | Dimensions | Bytes |
| --- | --- | ---: |
| `human-brain.png` | 1024 × 490 | 401,448 |
| `solar-system.png` | 1024 × 390 | 136,606 |
| `velvet-fade.webp` | 1100 × 688 | 93,900 |
| `adura-glow.webp` | 1100 × 688 | 80,020 |
| `kirvon.webp` | 1100 × 688 | 69,970 |
| `flowsource.webp` | 1100 × 688 | 62,294 |

The other ten projects depend on request-time `image.thum.io` screenshots. The existing `postbuild` script warms 14 featured screenshots on every build, does not save local files, and silently exits successfully on failures. Its handwritten source-to-JSON parser is brittle around apostrophes in project prose. Replace this build-time dependency with an explicit, documented one-time local-asset workflow.

This sandbox's outbound access is restricted to GitHub and the npm/PyPI registries. The live portfolio, Vercel/Cloudflare demo domains, screenshot service, cover CDN, and social sites are outside that allowlist. **No live demo has been declared broken: all 16 are unverified from this environment.** Do not turn an environment restriction into a claim that a live site is down.

After approval, use existing screenshots immediately and implement honest, labeled unavailable-preview fallbacks for missing assets if captures cannot be supplied. Provide an explicit capture/optimization script or upload instructions for the ten missing screenshots: 1280px wide, WebP, under 150 KB each. Do not substitute generated imagery or another project's screenshot and claim it is a capture. All live URLs remain in the same content source and available from their case studies. Keep the ten original writing-cover URLs untouched.

## 7. Baseline checks

| Check | Result |
| --- | --- |
| `npm ci --no-audit --no-fund` | Passed; no tracked dependency/lockfile change. Security/deprecation warnings noted above. |
| `npm run lint` | Passed; no warnings or errors. |
| `npm run typecheck` | Passed. |
| `NEXT_TELEMETRY_DISABLED=1 npm_config_ignore_scripts=true npm run build` | Passed; all 43 generated pages completed, including all 16 project and ten writing detail pages. |
| Content inventory | 16 projects, six services, ten writing pieces, 27 constellation skills. |
| Existing Experiments filter | Reproduced: empty result. |
| Existing color-token contrast | Failures documented above. |
| Lighthouse/axe/browser keyboard/zoom tests | Not run at this documentation-only checkpoint. No browser executable or browser-test dependency is preinstalled. No scores are claimed. |

The production build intentionally skipped npm lifecycle hooks: the explicit build command still ran `next build`, while suppressing `postbuild` avoided its prohibited external screenshot requests. It was not a test of the screenshot-warmup hook.

Baseline production first-load JavaScript reported by Next.js: home **154 kB**, projects **152 kB**, writing **153 kB**. These are bundle figures, not Lighthouse scores.

## 8. Proposed implementation checkpoints (after “go”)

Run lint and a production build at each checkpoint, fix failures before proceeding, and commit each numbered implementation step on the existing Arena branch.

1. **Accessible design system and shell.** Semantic light/dark color tokens, one accent, spacing/type/radius tokens, 18px body text, 1.6 line-height, readable widths, 44px controls, strong focus styles, skip link, Chenar header/footer, five-item nav, accessible mobile menu, theme preference support. Review the compatible framework security patch and document any dependency changes.
2. **Shared data and assets.** Extend `src/lib/content.ts` with the required project model and supplied copy, service grouping, FAQ/process/contact data, and selected-work references. Keep all 16 projects and ten writing records. Use local `next/image` previews, retain Flowsource visuals, and remove the network-dependent screenshot lifecycle hook. Record missing-capture limitations honestly.
3. **Landing page.** Header → supplied hero → three service cards → six selected project cards → three work steps → short about → button-based FAQ accordion → Email/WhatsApp/form CTA → footer. Move exploration/building content off home; no terminal/tickers/Lab section on home.
4. **Work pages and redirects.** Accessible typed filters with visible counts, semantic project cards, required case-study section order, related projects, explicit new-tab notes, project-specific contact links, and permanent legacy redirects. Keep image asset URLs under `/projects/` working; page redirects must not catch assets.
5. **Secondary routes and contact.** Supplied Services/About/Writing/Contact copy; preserve full writing details/covers, Now lists, Skills constellation plus static list, `/content` and `/lab`; make resume print-friendly. Brief form reads `?project=<slug>` and pre-fills the known project name. Build server-side field validation/honeypot and a clearly described mailto fallback. Do not wire a mail provider without Joseph's choice or claim delivery when only an email draft opened.
6. **SEO and recovery.** `NEXT_PUBLIC_SITE_URL` with the provided live-domain fallback and `.env.example`, unique metadata/canonicals, OG image, Person and ProfessionalService JSON-LD, full data-driven sitemap, robots, and supplied custom 404.
7. **Verification and final report.** Check every content route and legacy redirect, all project/writing counts, internal links/images, honest status labels, both themes, keyboard-only use including menu/FAQ/forms, 320px layout, 200% zoom, print, and reduced-motion mode. Add reproducible automated checks as practical. Run axe on `/`, `/work`, a case study, `/services`, and `/contact`; run mobile Lighthouse on a production server and report actual scores or a precise testing limitation. Do not claim WCAG conformance from lint/build alone.

Targets from the brief: zero serious/critical axe findings on the five named routes; mobile Lighthouse Accessibility ≥95, Performance ≥85, SEO ≥95, Best Practices ≥95. These remain targets until measured.

## 9. Decisions and confirmation register

Only approval blocks the application changes. Missing business facts do not justify invented copy. Record each unresolved confirmation in the final implementation report; use explicit `{{CONFIRM: ...}}` markers where the approved copy needs an unresolved fact.

| Supplied confirmation | Treatment before Joseph confirms |
| --- | --- |
| Typical reply time under home buttons | No promise of a response deadline. Retain a clearly marked confirmation if shown. |
| Whether a price and timeline are quoted before starting | Do not assert a pricing/timeline policy as fact. Use the neutral plan/build explanation and flag the missing policy. |
| Whether to add a personal photo | Text-only is the safe default because no portrait exists. No generated portrait. |
| Optional starting prices | Omit prices; no invented ranges. Keep the open question in the report. |
| Typical project timelines | Do not publish the proposed days/weeks estimate as verified. Flag for confirmation. |
| Contact-page reply time | Same unresolved reply-time fact as the home line; do not invent a second answer. |

**Mail provider:** Before wiring email delivery, ask Joseph to choose Resend, Formspree, or Web3Forms. Until then the form opens a mailto draft and clearly says the visitor must send it; server validation alone is not delivery. API keys must be server-only environment variables, never in client bundles or chat. This choice does not block the rest of the restructure.

**Screenshot capture:** Ten missing local captures need network access outside this sandbox or real screenshot uploads. Preserve existing assets and provide an honest fallback/capture workflow rather than inventing screenshots.

## 10. Next action

Show Joseph this plan and wait for **“go”**. No application implementation has started at this checkpoint.
