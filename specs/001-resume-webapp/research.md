# Research: Resume Web App (Phase 0)

**Date**: 2025-12-03  
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## 1. Build Tool Strategy

**Decision**: Provide **three parallel paths** with vanilla HTML/CSS/JS as the foundation.

**Rationale**:
- User requirement: "Application could use Vite, Jekyll or Angular offering ability to customize manually the source code if needed."
- Three tool options allow users to choose based on preference and existing tooling.
- All paths are **optional**; the core app runs as pure static HTML/CSS/JS.

**Alternatives Considered**:
- **Single build tool only** — rejected because user explicitly wants flexibility and multiple options.
- **Framework-first (e.g., React/Vue only)** — rejected because user specified vanilla HTML/CSS/JS must work standalone.

**Chosen Approach**:
1. **Path A (Zero Build)**: Pure HTML/CSS/JS — deploy directly.
2. **Path B (Vite)**: Optional bundler for module organization and modern dev experience.
3. **Path C (Jekyll)**: GitHub Pages-native static generator.
4. **Path D (Angular)**: Full SPA framework for advanced users wanting reactive components.

---

## 2. Resume Data Management

**Decision**: Embed resume content **directly in application code** (JavaScript object or inline HTML); **NO external JSON/YAML files**.

**Rationale**:
- User constraint: "Resume data must not be preloaded from specific json or yaml files."
- Embedded approach:
  - Maximizes code reuse and portability (single file deploys everywhere).
  - Simplifies version control (data and code tracked together).
  - Eliminates file loading overhead.
  - No external dependencies or asset management overhead.
- For bilingual support: Store both FR and EN content in a single `resume-data.js` object with language keys.

**Alternatives Considered**:
- **External JSON/YAML files** — rejected per user constraint.
- **API endpoint** — rejected because no server required.
- **Database** — rejected because static-first.

**Implementation**:
```javascript
// assets/scripts/resume-data.js
const resumeData = {
  fr: {
    about: "...",
    experience: [...],
    skills: [...],
    education: [...],
    contact: {...},
    social: [...],
    projects: [...]
  },
  en: {
    about: "...",
    experience: [...],
    // ... same structure in English
  }
};
```

---

## 3. Client-Side PDF Export

**Decision**: Use **jsPDF + html2canvas** or **print-to-PDF** browser API.

**Rationale**:
- No server required → satisfies static-first constraint.
- User requirement: "PDF export button" with language/theme support.
- Alternatives:
  - **Server-side PDF**: Violates static-first; rejected.
  - **Print dialog**: Works but less seamless; fallback if library integration fails.

**Libraries**:
- **Primary**: jsPDF + html2canvas (popular, well-supported, client-side).
- **Secondary**: Built-in browser print-to-PDF as fallback.

---

## 4. Language Switching Strategy

**Decision**: Client-side state management (JavaScript + DOM manipulation).

**Rationale**:
- User requirement: "French or English language to view resume information."
- Store selected language in `localStorage` for persistence.
- Swap all text nodes and attributes on language change (<1s target per SC-004).

**Data Structure**:
```javascript
// Language toggle stores active language
let activeLanguage = localStorage.getItem('resumeLanguage') || 'en';

function setLanguage(lang) {
  activeLanguage = lang;
  localStorage.setItem('resumeLanguage', lang);
  renderContent(); // Re-render UI with new language
}
```

---

## 5. Theme Toggle (Dark/Light Mode)

**Decision**: CSS custom properties (variables) + localStorage for persistence.

**Rationale**:
- User requirement: "Dark/Light mode for viewing information."
- CSS variables allow instant theme swap without page reload.
- localStorage persists user preference across sessions.
- WCAG AA compliance: ensure sufficient contrast in both modes.

**Implementation**:
```css
/* theme.css */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --accent: #0066cc;
}

body.dark-mode {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
  --accent: #4da6ff;
}
```

---

## 6. Accessibility & SEO

**Decision**: Semantic HTML5 + WCAG AA compliance + structured data.

**Rationale**:
- User requirement: Success Criterion SC-006 ("Accessibility: Keyboard navigation...").
- Constitution Principle 1 ("Minimalism & Accessibility").

**Standards**:
- **Semantic HTML**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`.
- **ARIA labels**: For interactive elements (buttons, toggles).
- **Keyboard nav**: Tab order logical; focus visible; no keyboard traps.
- **Images**: alt text for all non-decorative images.
- **Color contrast**: WCAG AA (4.5:1 for normal text).
- **SEO**: meta tags (title, description, og:*), JSON-LD schema for resume/person data.

---

## 7. Performance Optimization

**Decision**: Minimize CSS/JS, optimize images, lazy-load non-critical assets.

**Rationale**:
- Success Criterion SC-005: "<2s load time for above-the-fold".
- Constitution Principle 5 ("Performance & SEO").

**Tactics**:
- **CSS**: Minify; no CSS-in-JS overhead.
- **JavaScript**: Vanilla JS (no frameworks overhead); minified; async where possible.
- **Images**: Use modern formats (WebP + JPEG fallback); compress; responsive srcset.
- **Fonts**: System fonts or 1-2 hosted fonts only (no font loading delays).
- **PDF library**: Load jsPDF/html2canvas only on demand (not on page load).

---

## 8. Project Showcase Section

**Decision**: Card-based UI with project metadata (title, description, link, screenshot).

**Rationale**:
- User requirement: User Story 5 (P3) — "Projects section to present web app projects and games."
- Embedded in same data structure as resume for consistency.

**Data Structure**:
```javascript
projects: [
  {
    title: "Project 1",
    description: "...",
    link: "https://...",
    screenshot: "assets/images/project1.png",
    tags: ["game", "web"]
  },
  // ... more projects
]
```

---

## 9. Privacy & Data Handling

**Decision**: No trackers, no analytics, no data collection by default.

**Rationale**:
- User requirement: FR-007 ("avoid third-party trackers by default").
- Constitution Principle 3 ("Privacy & Data Minimization").

**Scope**:
- NO Google Analytics, Mixpanel, or similar.
- NO cookies for tracking (only localStorage for user preferences).
- NO external scripts (except optional PDF library, self-hosted or CDN-cached).

---

## 10. Browser & Platform Support

**Decision**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge); static hosting (GitHub Pages, Vercel, Netlify).

**Rationale**:
- Constitution Principle 2 ("Static-First & Single-Page").
- ES2020+ JavaScript okay (covers 95%+ of users).
- Responsive design for mobile-first experience.

**Tested Platforms**:
- Desktop: Win/Mac/Linux browsers.
- Mobile: iOS Safari, Android Chrome.
- Deployment: GitHub Pages native, Vercel/Netlify with zero config.

---

## Summary: Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Build Tool | 3-path (vanilla + Vite + Jekyll + Angular) | Flexibility per user requirement |
| Resume Data | Embedded in JS (no external files) | User constraint; portability |
| PDF Export | jsPDF + html2canvas (client-side) | Static-first; no server |
| Language | Client-side state + localStorage | Zero server; instant swap |
| Theme | CSS variables + localStorage | Instant switch; persistence |
| Accessibility | Semantic HTML5 + WCAG AA | Constitution + User requirement |
| Performance | Minified vanilla JS + optimized images | <2s load target |
| Privacy | No trackers, no analytics | Constitution Principle 3 |
| Hosting | Static sites (GitHub Pages/Vercel/Netlify) | Static-first architecture |

---

**All NEEDS CLARIFICATION items resolved. Ready for Phase 1 (Design & Contracts).**
