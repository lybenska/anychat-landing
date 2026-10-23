# anychat-landing

Landing page for **AnyChat**, MacPaw's native Mac chat for every AI backend (Setapp AI · your own API keys · local MLX models · Apple Intelligence).

## Stack

Same as [KeyComposerWeb](https://github.com/lybenska/KeyComposerWeb) and [BeeRollWeb](https://github.com/lybenska/BeeRollWeb):

- **Astro** (static output). `src/pages/index.astro` is the whole page; `public/styles.css` and `public/main.js` hold the styling and behaviour.
- Copy, links and claims live in `src/consts.ts` (and `src/data.ts` once the page grows).
- Real captures from the app go in `public/assets/`. App icon in `public/app-icon/` is copied from the any-chat repo.
- The page speaks the app's design language: the flat prototype design (see the any-chat repo and `~/Desktop/anychat-prototype`).

## Develop

```sh
npm install
npm run dev       # http://localhost:4323
npm run build     # static site in ./dist
npm run preview   # serves ./dist
```

## Review builds

Every push to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`. The workflow runs
`scripts/review-build.mjs` on the build output: it rewrites root-relative URLs to relative ones (the Pages site sits
under a sub-path) and marks the site `noindex` with a `robots.txt` that disallows crawling, so the review build never
appears in search engines. The source keeps root-relative paths and stays indexable for the production domain.

## Before launch

- Set the public origin in `src/consts.ts` (`SITE_URL`) and `site` in `astro.config.mjs`.
- Confirm the Setapp slug in `TRY_URL` and `APP_PAGE_URL` once the listing exists.
- Add `public/assets/og/landing.png` (Open Graph image).

## Keeping claims true

Every product claim on the page is checked against the app before it ships. No testimonials until there are real, attributable ones.
