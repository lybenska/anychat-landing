# anychat-landing

Landing page for **AnyChat**, MacPaw's native Mac chat for every AI backend (Setapp AI · your own API keys · local MLX models · Apple Intelligence).

## Stack

Same as [KeyComposerWeb](https://github.com/lybenska/KeyComposerWeb) and [BeeRollWeb](https://github.com/lybenska/BeeRollWeb): **Astro** (static output), no framework, no build step beyond Astro. Copy, claims and the section data live in `src/data.ts`; links in `src/consts.ts`; inline icons in `src/icons.ts`; `public/main.js` holds the behaviour for both pages (each block looks for its elements and does nothing on the other page).

## Three designs of the same page

Same sections in a similar order on all three (hero · how it works · stats · where models run · features · privacy · Setapp · FAQ · closing), same copy from `src/data.ts`, three very different looks. The pick is still open.

- **`/` — Transcript** (`src/pages/index.astro`, `public/transcript.css`). The whole page is a conversation: every section heading is the visitor's question (black bubble, right), the content is the reply (white card, left), signed by who answers: AnyChat, or one of the three places models run, each with its own avatar and pastel tag (pink Setapp AI+, amber your own key, blue on your Mac). Light grey ground, system font. The first question types itself; questions and replies arrive in order as you scroll; the closing bubble cycles through example questions.
- **`/switchboard` — Switchboard** (`src/pages/switchboard.astro`, `public/switchboard.css`). Bento tiles on graph paper, one electric blue, green only for "on your Mac" status, JetBrains Mono captions, Space Grotesk text, no gradients. The hero is a literal switch: five model stops on a rail, the active one slides along and the same question is re-answered in that model's voice. `/switchboard` is `noindex` with a canonical to `/`.
- **`/blueprint` — Blueprint** (`src/pages/blueprint.astro`, `public/blueprint.css`), after the precision-instrument look of [metic.studio](https://metic.studio/en): warm paper with a dotted ground, near-black ink, the app's Delight magenta as the one signal colour, Bricolage Grotesque display, Geist text, Geist Mono captions with coordinates, a ruler down the left edge, a section indicator down the right and a cursor readout (desktop only). The first screen says what it is in plain words (eyebrow *AI chat app for Mac*, headline *Every AI model, in one Mac chat.*, the three ways to reach a model as a short list), next to one device: a real-looking AnyChat window with a **model module** docked on its right edge (below it on phones). Same dark material, one frame and shadow, a title strip that lines up with the window's. The module holds a drum: model names on a dark cylinder, the chosen one and its two neighbours visible between two markers, a knurled thumbwheel beside it (form B from `public/_directions/dial.html`), and a readout of where the model runs in the same colour as the chip in the composer. Until someone touches it, the drum **switches by itself**: a few seconds after each answer finishes it rolls to the next model, with an *AUTO* badge in the module's title strip and the note *Or roll it yourself*. The first click, scroll, drag or key press hands control over for good (the badge goes, the note changes); with reduced motion there is no autoplay. Click a name, scroll, drag up or down, press the thumbwheel or use the arrow keys: the model chip in the window's composer switches (tinted by where the model runs) and the reply is answered again in that model's words. Once you have picked all five yourself, the window lays the five answers out side by side under *Same question, 5 answers*, and the handwritten note changes. *How it works* is **the build**: a pinned stage that assembles one AnyChat exchange on scroll (a question, a model, a route, an answer, a second opinion, stays here) with a progress readout and a skip link. Then four principles, a statement line, big numerals, where models run, the real captures shown large ("Inside the app"), a spec-sheet feature list (rows open on hover with a mouse, on tap or Enter otherwise; all open without JS), a privacy ledger with a giant "0 B", Setapp, FAQ, and the Try Free button under construction guides. The Setapp steps on this page are drawn schematics (sign-up card, the Setapp window installing, AnyChat in the library with *Open*), not screenshots: AnyChat has no Setapp listing yet (`setapp.com/apps/anychat` and the `get-free` sign-up URL both return 404 on 2026-10-23), and the KeyComposer stand-ins showed another app. Section heads sit on the same three-column grid as the content under them; the cursor readout only shows over the build. `noindex` with a canonical to `/`. The five model replies (`dial` in `src/data.ts`, shared with the Switchboard hero) are written for the demo, not captured from the models.
- `public/_directions/` holds working boards: `index.html` (the direction board Transcript and Switchboard were picked from) and `dial.html` (three forms of the model switch; the drum was picked). Delete before launch.

All three pages use the app's own labels where they show the product: *Ask another model the same thing*, *Same question, two models*, *On your Mac · free · private · works offline*, *Cloud · included with Setapp*. Neither carries the Setapp brand in a theme or feature name.

**Real captures** in `public/assets/shots/`: `chat-agent.png` and `compare.png` are the Debug build on 2026-10-23 (window capture via `screencapture -l`, downscaled to 2000 px). They show test data (a Fake provider, a smoke-test agent run) and must be retaken with a real project before launch. `setapp-home.webp` is Setapp's official app screenshot; the two files marked `TEMP-keycomposer` are KeyComposer's sign-up and in-app pictures standing in until AnyChat's listing exists.

## Develop

```sh
npm install
npm run dev       # http://localhost:4323 (Transcript) · /switchboard · /blueprint
npm run build     # static site in ./dist
npm run preview   # serves ./dist
```

## Review builds

Every push to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`. The workflow runs
`scripts/review-build.mjs` on the build output: it rewrites root-relative URLs to relative ones (the Pages site sits
under a sub-path) and marks the site `noindex` with a `robots.txt` that disallows crawling, so the review build never
appears in search engines. The source keeps root-relative paths and stays indexable for the production domain.

## Ad landing helpers

- `?v=keys`, `?v=local`, `?v=compare` swap the hero copy for message-matched ad groups (see `heroVariants` in `src/data.ts`).
- `utm_*` parameters on the landing URL are appended to every Setapp link.

## Before launch

- Set the public origin in `src/consts.ts` (`SITE_URL`) and `site` in `astro.config.mjs`.
- Confirm the Setapp slug in `TRY_URL` and `APP_PAGE_URL` once the listing exists.
- Pick one design; drop the other pages and their stylesheets (or keep it as `/light` was kept on BeeRollWeb). Delete `public/_directions/`.
- Retake the two app captures with a real project (no Fake provider, no smoke-test run); replace the two `TEMP-keycomposer` Setapp pictures.
- Add `public/assets/og/landing.png` (1200×630 Open Graph image).
- Review builds: GitHub Pages is not enabled (the repo is private); the `deploy` job fails until it is.

## Keeping claims true

Every product claim on the page is checked against the any-chat repo. Recheck these before changing them:

- **Where models run:** `ModelSource.swift` (setapp · apiKey · local · appleFoundation). Provider presets and their names: `SettingsView.swift` (OpenAI, Anthropic (Claude), Google Gemini, Ollama (local), OpenRouter, Custom OpenAI-compatible). Onboarding wording: `Modules/AnyChatUI/Resources/AppContent.json`.
- **100+ models:** the Setapp AI catalog listed 109 models on the author's Mac (`docs/plans/2026-08-17-model-pins-design.md`). Model families and makers shown in the on-device card: `ModelBrowserSimpleMode.swift`; the curated MLX catalog ships Llama 3.2 1B/3B and Qwen 2.5 0.5B.
- **7 personas, 3 skills:** `Personas.swift` built-ins (Default, Helpful Assistant, Code Reviewer, Brainstorm Partner, Concise Editor, Socratic Tutor, Feedback & Conversation Coach); `Skills.swift` built-ins (MacPaw Tone of Voice, SCARF Feedback Framework, Meeting Recap).
- **Compare, with the cost shown first:** `ComparisonPanel.swift` (`CompareChip` asks once when comparing would bill the user's own key).
- **Privacy table:** `docs/legal/AnyChat-Data-Processing-Audit.md` §1–§5: no first-party server, no analytics, conversations in Application Support, keys in the Keychain, embeddings on-device by default (OpenAI embeddings only if configured).
- **Usage dashboard and budget:** `Views/Dashboard/` and the Usage section of `SettingsView.swift` ("Tokens and cost count only your own API keys — Setapp and on-device models are free").
- **Requirements:** macOS 15.0 deployment target (`Configs`); Apple Foundation Models gated on macOS 26 (`AppleFMAvailability.swift`); MLX needs Apple silicon.
- **Setapp AI coins** are "shared with other Setapp apps and renew with your subscription" (Settings › Usage). No pricing or credit numbers are stated on the page.
- No testimonials until there are real, attributable ones.
