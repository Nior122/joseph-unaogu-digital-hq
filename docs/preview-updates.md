# Scheduled homepage previews and original covers

Joseph's follow-up request is to capture the live website homepages and refresh their images automatically. This supersedes the earlier restriction to the six existing screenshots. No project images or book covers are AI-generated.

## What the updater does

- Reads the actual project URLs and original writing-cover URLs from `src/lib/content.ts`; there is no second handwritten list.
- Uses Chromium to visit each public project homepage at 1280×800, waits for rendering/fonts, and saves a real above-the-fold capture.
- Optimizes homepage captures to WebP, 1280px wide and at most 150 KB.
- Downloads the original writing-cover files without changing their bytes. The ten writing records and their source URLs remain unchanged.
- Rejects hosting errors, blank captures, access checkpoints, and login-only pages rather than presenting them as project previews. It does not sign in or bypass access controls.
- Retains the last valid asset when a new capture/download fails. All six original screenshots remain untouched and available as fallbacks.
- Gives each asset a content-hashed filename so a changed homepage is not stuck behind an old browser or Next.js image cache.
- Records source URL, SHA-256, dimensions, byte size, capture time, and refresh failures in `src/lib/preview-manifest.json`. Only an entry matching the current source URL is used.
- Deletes superseded generated files from the two generated folders, never the original screenshots.

The website serves saved local files. Visitors do not wait for a screenshot service. If Next.js image optimization fails, project images retry the raw local file, then the original screenshot where one exists, and finally a labeled text fallback. Book covers try the local copy, then the unchanged original URL, then a text fallback.

## Automation and activation

Workflow: `.github/workflows/refresh-previews.yml` (**Refresh homepage previews**).

- Automatic refresh: **Mondays at 04:23 UTC**, subject to GitHub's scheduling delays.
- Manual refresh: `workflow_dispatch`, once the workflow is available on the repository's default branch.
- Initial bootstrap: a push of the capture workflow/tools or project content on `arena/2d034660-joseph-unaogu-digital-hq` triggers the job immediately.
- The job checks out and updates only its triggering branch. It never force-pushes. The current bootstrap updates the Arena working branch, not `main`.
- GitHub only enables recurring scheduled workflows after the workflow file is merged into the **default branch**. Adding it solely to a working branch does not activate the weekly cron. No default-branch merge is performed by this change.
- The job uses GitHub's built-in token with `contents: write` to commit asset updates. No screenshot-provider key, email-provider key, or deployment secret is required.
- A JSON capture report is uploaded even if a capture fails. The job checks all content/asset integrity and unit tests before committing files. If every source fails, it fails visibly instead of reporting success.

Saved image changes are normal repository commits. A connected Git deployment can rebuild from those commits; no claim is made that the public production site has already deployed this working branch.

## Verified capture result — 21 October 2026

[The completed GitHub capture run](https://github.com/Nior122/joseph-unaogu-digital-hq/actions/runs/39632719182) saved **15 of the 16 public project homepages** and **one original cover**. The refreshed project images are served on Home, Work, Lab, and the corresponding case-study pages. Each capture is 1280×800 and below 150 KB. All six original screenshots remain unchanged.

The loading-screen capture found during inspection was removed. The updated capture waits for large loading overlays to disappear; the saved Solar System preview now shows the rendered planets, not its progress screen.

Sources still needing attention:

- **ScrollTek:** `https://newsz-delta.vercel.app/` returned **HTTP 404**. No screenshot of that error page is used. A working demo URL or an existing real screenshot is needed.
- **Nine original cover files returned HTTP 403** from the hosted runner: `productivity-busy-moms`, `ai-tools-vas`, `ai-freelancers`, `the-trust-factor`, `dark-psychology`, `boundary-mastery`, `male-female-dynamic`, `shadows-of-tomorrow`, and `the-last-archive`. Their records and original URLs are retained; the UI can still try the original source, but the updater cannot cache denied files. Upload the original covers or supply accessible URLs to repair these sources. No credentials, access-control bypass, or invented replacement covers are used.
- **Copywriting Portfolio:** its original cover was successfully saved byte-for-byte and is now served locally.

`preview-manifest.json` includes the latest attempt time and per-source failure reasons. GitHub also surfaces capture failures as job warnings, so partial failures are visible without deleting successful captures.

### Verification after the image update

- Lint, type/build checks, content preservation, and all **16 unit tests** passed.
- Browser checks passed for **37 routes**, **99 internal link/anchor targets**, and **17 redirects**.
- All **15 available project previews actually decoded in Chromium**, not merely returned HTTP 200. The cached cover also decoded successfully.
- Explicit tests passed for optimizer failure → raw local file → original screenshot → labeled fallback, plus cached/remote cover failure. The cover component also detects images that failed before React hydration attached `onError`.
- **35 axe scans: zero violations**. Themes, mobile navigation, form behavior, reflow, reduced motion, and resume printing still passed.

Actual mobile Lighthouse 13.5.0 results on the updated production build:

| Route          | Performance | Accessibility | Best Practices | SEO |
| -------------- | ----------: | ------------: | -------------: | --: |
| `/`            |          94 |           100 |            100 | 100 |
| `/work`        |          85 |           100 |            100 | 100 |
| `/work/kirvon` |          97 |           100 |            100 | 100 |
| `/services`    |          98 |           100 |            100 | 100 |
| `/contact`     |          97 |           100 |            100 | 100 |

All requested score thresholds still pass. These lab measurements include the real project images and are not the earlier six-image-only scores. Raw browser/Lighthouse outputs remain in ignored `test-results/`.

The initial captures have already run on the Arena branch. **The weekly cron is configured but does not become active until this workflow is merged into the default branch.** That merge and a public production deployment have not been performed. The target branch must allow the workflow's asset commit; branch protection is never bypassed.

## Run it yourself

Use an environment that can reach the public project sites and original cover CDN. This sandbox's outbound allowlist does not permit those hosts; GitHub's hosted runner is used for the actual refresh.

```sh
npm ci
npm run previews:refresh
npm run previews:refresh -- --only-missing
npm run previews:refresh -- --project=eduflow
npm test
npm run build
```

`--project=<slug>` captures just that project and skips cover downloads. `--only-missing` fills absent generated captures/copies without refreshing the files already present. By default, all homepages and original covers are checked.

The Linux Chromium bundled with the existing npm dependency can be used without downloading another browser. Set `CHROME_PATH` to use an installed Chrome; the workflow uses Chrome on the GitHub runner. WebGL software rendering is enabled for captures so the 3D demos are not deliberately rendered with WebGL disabled.

Generated files:

- `public/projects/previews/<slug>-<hash>.webp`
- `public/writing/covers/<id>-<hash>.<original-format>`
- `src/lib/preview-manifest.json`

Local diagnostic output, not committed:

- `test-results/previews/capture-report.json`

Do not manually alter generated paths or hashes. Run the updater when a homepage changes. Source URLs, project copy, and the original writing data are still edited only in `src/lib/content.ts`.
