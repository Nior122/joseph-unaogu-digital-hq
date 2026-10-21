# Project and writing image policy

Initial direction: “Use the images there already.” Follow-up direction: capture the live website homepages and refresh the images with a cron job. The follow-up permits real homepage captures and supersedes the earlier six-files-only policy.

- Keep all six original files directly under `public/projects/` unchanged: Human Brain, Solar System, Velvet & Fade, Adura Glow, Kirvon, and Flowsource.
- Prefer a successful real homepage capture from `public/projects/previews/`. Preserve the original screenshot as a fallback where one exists.
- Keep all ten original writing records and their cover URLs exactly unchanged. Cached covers under `public/writing/covers/` must be byte-identical copies of those original files, not redrawn covers or replacements.
- Never substitute another project's screenshot, a hosting error, a sign-in screen, or generated imagery and label it a homepage capture.
- Retain the last successful asset when a site or cover cannot be refreshed. If no usable source exists, use a clearly labeled text fallback, not a broken image.
- No portrait exists; About remains text-only.
- The application does not request screenshots during page views or builds. A separate scheduled/manual capture job saves local assets and their content hashes.

See [preview updates](preview-updates.md) for the cron schedule, activation requirement, capture commands, metadata, and failure handling. The GitHub runner can reach public demo/CDN hosts that this sandbox cannot; local network restrictions are not evidence that a demo is down.
