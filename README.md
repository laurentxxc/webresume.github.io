# WebResume — Bilingual Static Resume

This is a minimal, vanilla HTML/CSS/JS resume web app 🎉.

This app has been done using [spec-kit](https://github.com/github/spec-kit). Main idea behind creation of this app was to use AI as much as possible. Only few manual changes/tweaks have been done on the generated code.

Main features of this web app are:
- Static presentation of resume data that can be hosted freely on github pages or [Vercel](https://vercel.com).
- Resume data can be easily modified (see `assets/scripts/resume-data.js`).
- Multiple languages can be supported for resume data. A language toggle button is available on the app header.
- Both light and dark themes are supported. A light/dark mode toggle button is available on the app header.
- Visible content can be export in a multi pages pdf file (including dedicated pdf header and footer). A pdf export button is available on the app header. 

See more in [full generated specification](specs/001-resume-webapp/spec.md).

Quick start (no build tool):

```bash
# Open the static site entry under `www/`
open www/index.html
```

Files of interest:
 - `www/index.html` — main page
 - `www/assets/styles/` — `main.css`, `theme.css`, `print.css`
 - `www/assets/scripts/` — `resume-data.js`, `main.js`, `pdf-export.js`


Files hosted by [Vercel](https://vercel.com) at https://webresume-lxxc.vercel.app

License: MIT
