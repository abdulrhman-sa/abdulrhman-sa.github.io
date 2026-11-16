# Abdulrhman Saeed AL-Asmri — Personal Portfolio

A custom, bilingual (Arabic/English) static portfolio hosted on GitHub Pages.

**Website:** https://abdulrhman-sa.github.io  
**Repository:** https://github.com/abdulrhman-sa/abdulrhman-sa.github.io

## Project status

This is a working design and code foundation. **No resume, project achievements, skills, employer claims, social links beyond GitHub, or personal photographs were invented.** The project area shows an explicit empty state until verified material is supplied. No photo is required.

## Files

- `index.html` — semantic page structure, SEO and accessible controls
- `css/style.css` — responsive theme, typography, animation and print styling
- `js/main.js` — language switch, theme, menu, share, copy, project rendering, motion
- `data/ar.json`, `data/en.json` — editable bilingual interface text
- `data/projects.json` — project records (initially an empty array)
- `assets/` — original favicon and social-preview artwork
- `site.webmanifest`, `robots.txt`, `sitemap.xml`, `404.html` — supporting files

## Update text

Edit the matching key in both `data/ar.json` and `data/en.json`. The browser loads these JSON files dynamically. Only trusted fixed inline heading markup is allowed in a few predefined heading keys.

## Add a real project

Replace the empty array in `data/projects.json` with records using *verified* facts. Example STRUCTURE ONLY (do not publish the example as a real project):

```json
[
  {
    "title": { "ar": "عنوان المشروع الحقيقي", "en": "Verified project title" },
    "description": { "ar": "شرح موثق", "en": "Verified short description" },
    "url": "https://github.com/OWNER/REAL_REPO"
  }
]
```

Do not publish example information as if it were an actual achievement. `url` is optional and links must use `https://` or `http://`. HTML is not accepted inside project data. A project image component can be added after the real media is supplied.

## Update colors

Edit the custom properties in `:root` (dark theme) and `:root[data-theme="light"]` in `css/style.css`. Keep foreground/background contrast readable.

## Add a photo or CV later

No photograph or CV link is present. After the owner supplies approved material, optimize its file size, place it under `assets/` (photo) or `resume/` (PDF), then update the relevant HTML. Do not add a fake headshot or blank download button.

## Local testing

Run a static web server from the repository root, because browser `fetch()` does not load the JSON files reliably via `file://`:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Check both languages, themes, touch size, keyboard menu focus, reduced-motion mode, link copying and the network console.

## Deployment

GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/(root)`. A successful deployment should serve the `index.html` file at https://abdulrhman-sa.github.io/.

## Privacy and accessibility

No trackers, cookies, analytics, server forms or embedded personal data. Preference values (`asa-lang`, `asa-theme`) are stored locally. Keyboard-accessible controls, an accessible menu with focus trapping, explicit focus indicators and reduced motion support are implemented. Fonts are requested from Google Fonts, which is a third-party request; host fonts locally if stricter privacy is desired.
