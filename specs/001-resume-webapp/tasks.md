---
description: "Task list for Resume Web App (001-resume-webapp) implementation"
---

# Tasks: Resume Web App

**Input**: Design documents from `specs/001-resume-webapp/`  
**Prerequisites**: ✅ plan.md, ✅ spec.md, ✅ research.md, ✅ data-model.md, ✅ contracts/api-contracts.md, ✅ quickstart.md

**Format**: `[ID] [P?] [Story?] Description with file path`
- **[P]**: Parallelizable (independent files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2, US3, US4, US5)

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Project structure and baseline configuration

- [ ] T001 Create project directory structure: `index.html`, `assets/{styles,scripts,images}/`, build config stubs
- [ ] T002 [P] Initialize git repository with `.gitignore` (node_modules, dist/, build artifacts)
- [ ] T003 [P] Create `assets/styles/theme.css` with CSS custom properties for light/dark mode
- [ ] T004 [P] Create `assets/styles/print.css` for PDF-friendly printing

---

## Phase 2: Foundational Infrastructure

**Purpose**: Core app framework and data structures (blocking prerequisites for all user stories)

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 [P] Create `assets/scripts/resume-data.js` with bilingual data structure (French & English)
- [ ] T006 [P] Create `index.html` with semantic HTML structure (header, nav, main, sections, footer)
- [ ] T007 Create `assets/scripts/main.js` with app initialization and event setup
- [ ] T008 [P] Create `assets/styles/main.css` with base styles, layout, responsive grid
- [ ] T009 Implement localStorage manager in `assets/scripts/main.js` for language/theme persistence
- [ ] T010 Implement language switching logic (update DOM on language toggle)
- [ ] T011 Implement theme toggle logic (apply CSS variable values, persist to localStorage)

**Checkpoint**: Foundation ready — all interactive controls functional. Language and theme persist across page reloads.

---

## Phase 3: User Story 1 - View Resume (Priority: P1) 🎯 MVP

**Goal**: Render resume sections (About, Experience, Skills, Education, Contact, Social) with semantic HTML and responsive layout.

**Independent Test**: Open site in browser (desktop + mobile), verify all 6 sections visible and readable; content clearly organized by section heading.

### Tests for User Story 1 (OPTIONAL)

> **Note: Tests written first, ensure they FAIL before implementation**

- [ ] T012 [P] [US1] Add accessibility audit test: keyboard navigation reaches all sections (tests/a11y/keyboard-nav.test.js)
- [ ] T013 [P] [US1] Add mobile layout test: sections stack vertically on viewport < 768px (tests/responsive/mobile-layout.test.js)

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create About section template in `index.html` with profile text and optional photo in `assets/images/`
- [ ] T015 [P] [US1] Create Experience section template with job entries (company, role, dates, description, bullets)
- [ ] T016 [P] [US1] Create Skills section template with skill cards (name, category, level)
- [ ] T017 [P] [US1] Create Education section template with degree entries (institution, degree, field, graduation date)
- [ ] T018 [P] [US1] Create Contact section template with email, phone, location, website
- [ ] T019 [P] [US1] Create Social section template with social links (LinkedIn, GitHub, etc.)
- [ ] T020 [US1] Implement `renderResume(language)` function in `assets/scripts/main.js` to populate sections from resume-data.js
- [ ] T021 [US1] Add semantic HTML validation: all sections have h2 headings, proper landmark roles
- [ ] T022 [US1] Ensure responsive layout: sections readable on mobile (viewport 320px+), tablet (768px+), desktop (1024px+)
- [ ] T023 [US1] Test on desktop browsers (Chrome, Firefox, Safari, Edge) and mobile (iOS Safari, Android Chrome)

**Checkpoint**: US1 complete — all resume sections render correctly in both languages, responsive layout confirmed.

---

## Phase 4: User Story 2 - Language Selection (Priority: P1)

**Goal**: Bilingual resume switching between French and English with persistent user preference.

**Independent Test**: Toggle language button; verify all textual content updates to selected language within 2 seconds; page reload preserves language choice.

### Tests for User Story 2 (OPTIONAL)

- [ ] T024 [P] [US2] Contract test: language toggle event fires and updates activeLanguage state (tests/contract/language-toggle.test.js)
- [ ] T025 [P] [US2] Integration test: all resume sections re-render with new language content (tests/integration/language-render.test.js)

### Implementation for User Story 2

- [ ] T026 [US2] Add language data structure to `resume-data.js`: all fields (about, experience, skills, education, contact, social, projects) have fr and en keys
- [ ] T027 [US2] Implement `setLanguage(lang)` function: update activeLanguage state, save to localStorage, call renderResume(lang)
- [ ] T028 [US2] Add language toggle button in header with current language display (e.g., "English" / "Français")
- [ ] T029 [US2] Update `renderResume()` to use activeLanguage and fetch all content from resumeData[activeLanguage]
- [ ] T030 [US2] Verify all UI text (button labels, section titles, meta tags) exists in both languages in resume-data.js
- [ ] T031 [US2] Test language switching: toggle at least 5 times, verify no console errors, all content updates
- [ ] T032 [US2] Manual QA: load page in FR, refresh (should stay FR); load in EN, switch to FR, refresh (should stay FR)

**Checkpoint**: US2 complete — language switcher works; bilingual content fully translated and persists across sessions.

---

## Phase 5: User Story 3 - Export PDF (Priority: P1)

**Goal**: Client-side PDF export of resume in currently selected language and theme.

**Independent Test**: Click "Export PDF" button; file downloads with resume content in active language; PDF is printable and readable.

### Tests for User Story 3 (OPTIONAL)

- [ ] T033 [P] [US3] Contract test: PDF export button is accessible (keyboard + screen reader) (tests/contract/pdf-export-a11y.test.js)
- [ ] T034 [P] [US3] Integration test: PDF generates without errors, contains resume text (tests/integration/pdf-generation.test.js)

### Implementation for User Story 3

- [ ] T035 [US3] Create `assets/scripts/pdf-export.js` with PDFExporter class using jsPDF + html2canvas or print-to-PDF API
- [ ] T036 [US3] Add "Export PDF" button in header; wire to exportPDF() function in main.js
- [ ] T037 [US3] Implement `exportPDF()`: capture resume-content DOM, generate PDF in active language, trigger download with filename `resume-{lang}-{date}.pdf`
- [ ] T038 [US3] Add print stylesheet optimization in `assets/styles/print.css` (page breaks, margins, hide controls, preserve colors for PDF)
- [ ] T039 [US3] Verify PDF includes: all resume sections, correct language content, theme colors (if applicable), file downloads to user's default location
- [ ] T040 [US3] Test PDF export: generate PDF in FR, verify French content; generate in EN, verify English content
- [ ] T041 [US3] Manual QA: PDF opens in Adobe Reader, Google Drive, web browser; content is readable and printable

**Checkpoint**: US3 complete — PDF export button functional; users can download resume in their preferred language.

---

## Phase 6: User Story 4 - Theme Toggle (Priority: P2)

**Goal**: Dark/Light mode toggle with CSS custom properties and persistent user preference.

**Independent Test**: Toggle theme button; page colors update immediately; refresh page and theme persists; verify WCAG AA contrast in both modes.

### Tests for User Story 4 (OPTIONAL)

- [ ] T042 [P] [US4] Accessibility test: color contrast WCAG AA (4.5:1) verified in both light and dark modes (tests/a11y/contrast-check.test.js)
- [ ] T043 [P] [US4] Theme persistence test: toggle theme, reload page, verify theme is preserved (tests/integration/theme-persistence.test.js)

### Implementation for User Story 4

- [ ] T044 [P] [US4] Define CSS custom properties in `assets/styles/theme.css` for both modes:
  - Light mode: --bg-primary, --text-primary, --accent, --border
  - Dark mode: same properties with inverted values
- [ ] T045 [P] [US4] Update `assets/styles/main.css` and all section styles to use CSS variables instead of hardcoded colors
- [ ] T046 [US4] Implement `toggleTheme()` function: switch `[data-theme]` attribute on document.documentElement, save to localStorage
- [ ] T047 [US4] Add theme toggle button in header (sun/moon icon or text label)
- [ ] T048 [US4] Update localStorage to include theme preference; load on app initialization
- [ ] T049 [US4] Ensure smooth transitions: add CSS transition to color properties (~300ms) for fade effect
- [ ] T050 [US4] Verify WCAG AA contrast: use online tool or axe-core to validate both themes meet 4.5:1 minimum
- [ ] T051 [US4] Manual QA: toggle theme multiple times; verify no layout shifts; content remains readable in both modes

**Checkpoint**: US4 complete — theme toggle works; Dark and Light modes accessible and preferred mode persists.

---

## Phase 7: User Story 5 - Projects Showcase (Priority: P3)

**Goal**: Add Projects section to resume for showcasing web apps and games.

**Independent Test**: Projects section visible in resume; click project link and verify it opens in new tab; project cards display title, description, optional screenshot.

### Tests for User Story 5 (OPTIONAL)

- [ ] T052 [P] [US5] Contract test: Projects data structure matches schema (title, description, link, tags) (tests/contract/projects-schema.test.js)
- [ ] T053 [P] [US5] Responsive test: project cards display in grid on desktop (2+ columns), stack on mobile (tests/responsive/projects-grid.test.js)

### Implementation for User Story 5

- [ ] T054 [P] [US5] Add Projects section template in `index.html` with cards layout (grid or flex)
- [ ] T055 [P] [US5] Add projects data to `resume-data.js` (FR and EN): title, description, link, tags, optional screenshot
- [ ] T056 [US5] Create project card component rendering: title, description, tags, link button, optional image
- [ ] T057 [US5] Update `renderResume()` to include Projects section rendering from resumeData[activeLanguage].projects
- [ ] T058 [US5] Add project screenshot images to `assets/images/projects/` and optimize (WebP + JPEG fallback, max 500KB each)
- [ ] T059 [US5] Verify project links open in new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- [ ] T060 [US5] Test bilingual projects: add sample projects in FR and EN; toggle language and verify project content updates
- [ ] T061 [US5] Manual QA: Projects section visible and properly styled; cards responsive on desktop/tablet/mobile

**Checkpoint**: US5 complete — Projects section integrated; ready for future project portfolio expansion.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, SEO, performance, documentation, and deployment readiness

- [ ] T062 [P] Accessibility: Full a11y audit (axe-core or Lighthouse); fix all violations; test keyboard navigation (Tab, Enter, Arrow keys)
- [ ] T063 [P] SEO: Add meta tags (title, description, og:image, og:url, schema.org markup for Person + Resume)
- [ ] T064 [P] Performance: Minify CSS and JS; optimize images (WebP format, responsive srcset); target Lighthouse 90+ score
- [ ] T065 [P] Create `README.md` with setup instructions, customization guide, deployment steps for GitHub Pages / Vercel / Netlify
- [ ] T066 [P] Add `.gitignore`: node_modules/, dist/, build artifacts, local config (if needed)
- [ ] T067 Create GitHub Actions workflow (optional) for lighthouse CI, link checker, accessibility audit
- [ ] T068 Test on real devices: iPhone 12/14, Android phone, tablet (iPad); test on slow network (3G simulation)
- [ ] T069 Create sample resume data in both languages (`resume-data.js` template with placeholder content)
- [ ] T070 Update `package.json` (if using build tool) with dev dependencies: jsPDF, html2canvas, jest, axe-core
- [ ] T071 Document code: JSDoc comments on main functions, README sections for data model, customization
- [ ] T072 Final QA: smoke test all 5 user stories; language toggle, theme toggle, PDF export all functional
- [ ] T073 Create deployment guide: GitHub Pages setup, Vercel/Netlify one-click deploy, custom domain instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories
- **Phases 3-7 (User Stories)**: All depend on Phase 2 — can proceed in parallel or sequentially
- **Phase 8 (Polish)**: Depends on all desired user stories — final validation before release

### User Story Dependencies

- **US1 (View Resume, P1)**: Can start after Phase 2 — No dependencies on other stories
- **US2 (Language, P1)**: Can start after Phase 2 — Enhances US1, independent of implementation
- **US3 (PDF Export, P1)**: Can start after Phase 2 — Enhances US1/US2, independent of implementation
- **US4 (Theme, P2)**: Can start after Phase 2 — Independent cosmetic enhancement
- **US5 (Projects, P3)**: Can start after Phase 2 — Independent addition, non-blocking for MVP

### Within Each User Story

1. Write tests (if included) first — ensure they FAIL before implementation
2. Implement features — models/data → logic → UI → integration
3. Manual QA — verify acceptance scenarios
4. Move to next priority

### Parallel Opportunities

**Phase 1**: All tasks marked [P] can run in parallel (different file creation)

**Phase 2**: 
- T005-T006, T008 (data + HTML + CSS) can start in parallel
- T007, T009-T011 (JS logic) must follow after data/HTML ready

**US Phases**: All user stories (US1-US5) can be developed in parallel by different developers once Phase 2 completes

**Phase 8**: All [P] tasks (a11y, SEO, performance) can run in parallel

---

## Parallel Example: Phase 3 (User Story 1) + Phase 4 (User Story 2) + Phase 6 (User Story 4)

With 3 developers:

```
Developer A: Phase 3 (US1 Resume Sections)
  T014, T015, T016, T017, T018, T019 [P] — create all section templates in parallel
  T020 — integrate with renderResume()
  
Developer B: Phase 4 (US2 Language Switching)
  T026, T027, T028 [P] — language data, function, UI
  T029 — update renderResume()
  
Developer C: Phase 6 (US4 Theme Toggle)
  T044, T045 [P] — CSS variables in both modes
  T046, T047, T048 — theme toggle logic

All finish roughly same time → merge → test US1 + US2 + US4 together
```

---

## Implementation Strategy

### MVP First (User Stories 1-3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: US1 (View Resume)
4. Complete Phase 4: US2 (Language)
5. Complete Phase 5: US3 (PDF Export)
6. **STOP and VALIDATE**: Test all 3 stories together
7. Deploy MVP (GitHub Pages / Vercel / Netlify)
8. **Share with users** ← MVP goal achieved

### Incremental Delivery

1. Deploy MVP (US1 + US2 + US3) → **Version 1.0.0**
2. Add US4 (Theme) → **Version 1.1.0** (MINOR: new feature)
3. Add US5 (Projects) → **Version 1.2.0** (MINOR: new feature)
4. Polish & performance → **Version 1.0.1** to **1.2.1** (PATCH: fixes/optimizations)

### Team Strategy (if multiple developers)

1. Developer A + B + C: Work on Phase 1 & 2 together (sequential, foundational critical)
2. Once Phase 2 done:
   - Developer A: Phase 3 (US1)
   - Developer B: Phase 4 (US2)  
   - Developer C: Phase 6 (US4)
3. Merge and test US1 + US2 + US4 together
4. Developer A: Phase 5 (US3 - PDF)
5. Developer B: Phase 7 (US5 - Projects)
6. Developer C: Phase 8 (Polish)

---

## Notes

- [P] tasks = different files, no blocking dependencies within phase
- [Story] label maps task to specific user story for traceability and independent testing
- Each user story is independently completable and testable
- **Red-Green-Refactor**: Write tests first, see them fail, implement, see them pass
- Commit after each major task or logical grouping (e.g., T014-T019 as one commit: "feat: add resume section templates")
- Stop at any checkpoint to validate story independently and get feedback before proceeding
- Avoid: vague tasks, same file conflicts across developers, cross-story dependencies that break independence

---

## Test & Build Commands (Optional, if using build tool)

```bash
# If using Jest for unit/integration tests:
npm test                 # Run all tests
npm test -- --watch     # Watch mode
npm test -- --coverage  # Coverage report

# Build commands (tool-dependent):
npm run build           # Production build (Vite/Angular)
jekyll build            # Jekyll static build

# Accessibility audit:
npm run a11y            # If lighthouse-ci configured

# Deploy to GitHub Pages:
git push origin main    # Auto-deploy if workflow configured

# Local dev server:
npm run dev             # Vite dev server
jekyll serve            # Jekyll dev server
```

---

**Ready for implementation! 🚀**

