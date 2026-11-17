# Abdulrhman Saeed AL-Asmri — Portfolio v2

Website: https://abdulrhman-sa.github.io/

A lightweight Arabic-first / English personal portfolio built around exactly two documented projects. No photo is needed.

## What is included

- Full responsive editorial design (off-white, graphite and signal orange) with a dark mode
- Arabic / English, RTL/LTR, persistent language and theme preferences
- SAER and AI-Enhanced Intrusion Detection with sourced results and contribution/team separation
- Project image galleries and accessible detail dialogs
- Skills tabs that connect tools to actual work
- Education, 200-hour AI bootcamp, cooperative training, contact actions
- Downloadable PDF converted from the supplied original CV (content unchanged)
- Search metadata, favicon, Open Graph PNG, sitemap, 404, reduced-motion support

## Important evidence caveats

- SAER 94.58% top-1 = *team* DINOv2 + CLIP recognition, 59 vehicle classes, historical reused internal test split. Not independent validation. Team price MAE values are research estimates, not sale-price guarantees.
- IDS macro-F1 = 0.97 on a historical six-class 80/20 stratified CICIDS2017 notebook evaluation (566,149 test flows). The published five-class runtime artifacts do not have an independent evaluation in the source repository.
- The portfolio uses only two featured projects. Training repositories are not shown as portfolio projects.
- No inferred GPA, employer logos, awards, endorsements, or false project claims are included.

## Media and live links

Actual project screenshots are sourced from the owner's public GitHub repositories and loaded by the website via `raw.githubusercontent.com`. The design has graceful branded fallbacks when offline or when a screenshot is unavailable. For long-term reliability and fewer third-party requests, download the project screenshots into `assets/` and change their URLs to local paths after reviewing original asset permissions.

SAER:
- Repository: https://github.com/abdulrhman-sa/saer
- Live demo (external, may cold-start / be temporarily unavailable): https://saer-rmsavg637.pages.dev/
- Images: `docs/assets/home-screen.jpg`, `listings-screen.jpg`, `market-screen.jpg`
- Metrics: `models/identity_current.json` and README

Intrusion Detection:
- Repository: https://github.com/abdulrhman-sa/AI-Enhanced-Intrusion-Detection-System-with-Risk-Assessment
- Images: `docs/assets/dashboard.png`, `confusion-matrix.png`, `presentation-demo.png`
- Evaluation: `docs/model-card.md`, original training notebook, README
- Academic report: `docs/reports/graduation-report.pdf`

## How to publish on GitHub Pages

1. Use repository `abdulrhman-sa/abdulrhman-sa.github.io`.
2. Upload **all files and folders inside this ZIP**, not the ZIP itself.
3. Confirm `index.html`, `styles.css`, `app.js`, `assets/`, and `resume/` are all in repository root.
4. In Settings → Pages set Source to **Deploy from a branch**, branch `main`, folder `/(root)`.
5. Open https://abdulrhman-sa.github.io/ after the build finishes.

## How to edit

- Content and translations: `app.js` → `dict.en`, `dict.ar`, and `projectContent`.
- Styles: `styles.css` → `:root` and `:root[data-theme=dark]` color variables.
- Main structure: `index.html`.
- Projects gallery: `app.js` → `projectContent.saer.gallery` and `projectContent.ids.gallery`.
- Update CV: replace `resume/Abdulrhman_Saeed_AL-Asmri_CV.pdf` keeping the same filename, or update link references in `index.html`.
- Contact info: change `mailto:` and `app.js` copy-email handler; update SEO metadata if relevant.

No paid APIs, frameworks, tracking scripts, analytics, cookies or backend are required. Two settings are stored in localStorage.

## Verified / not verified

- Automated Chromium tests were run against an inline, offline rendering of the site's HTML/CSS/JS to test desktop/mobile, RTL/LTR, theme switching, galleries, keyboard dialog closing, skills navigation, menu, overflow, and runtime exceptions.
- Project screenshots will load from the live GitHub URLs when the browser has network access; their online loading was not independently verified from this test environment.
- Lighthouse 90+ and actual GitHub Pages publication have **not** been verified. The available GitHub connector can read the repository, but its write API returned 403; manual upload is needed unless permissions are changed.

## AI Spin interactive lab (v4)

The interactive orbit icon next to the main name, or the **TRY INTERACTIVE AI** link, opens an educational threshold explorer. It includes ten **synthetic** binary-labeled examples with invented scores, a threshold slider, clickable sample flows, dynamically calculated precision/recall/alert count/missed attacks, reset, Arabic/English support, keyboard navigation and responsive layout.

**Important:** This lab does not load a real ML model, and does not reproduce either the six-class Random Forest's evaluations or the five-level risk mapping. These ten scores are made-up instructional values only. Do not quote the interactive lab's precision/recall as research outcomes.

On the default threshold of 50%, the demonstration generates 6 alerts (five true positives and one false positive) and catches five of six attack samples. At 70%, the experiment generates three alerts and catches three of six attack samples. This illustrates the tradeoff rather than predicting actual network behavior.
