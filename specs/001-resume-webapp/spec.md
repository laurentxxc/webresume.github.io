```markdown
# Feature Specification: Resume Web App

**Feature Branch**: `1-resume-webapp`  
**Created**: 2025-12-03  
**Status**: Draft  
**Input**: User description: "Build an web application that present my resume. The application must have usual information that are normally on a resume like, about section, work experiences, skills, schools, contact and social network link. For application user, it should be possible to select French or English language to view the resume information. Application must have a banner allowing end user to export resume in pdf form. Also it would be nice to offer a Dark/Light mode for viewing information. Later on I would like also to use this web application to present other web application projects (like some games) I am working on."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View resume (Priority: P1)

An end user visits the site and reads the resume content.

**Why this priority**: Core value — making the resume readable and accessible is the primary purpose.

**Independent Test**: Open the site, verify that About, Work Experience, Skills, Education, Contact and Social links are visible and readable.

**Acceptance Scenarios**:

1. **Given** the site is loaded, **When** the user visits the page, **Then** the page displays About (with optional profile photo), Work Experience, Skills, Education, Contact and Social links.
2. **Given** mobile viewport, **When** the user loads the page, **Then** layout adapts and remains readable (profile photo stacks above text on small screens).

---

### User Story 2 - Language selection (Priority: P1)

User can switch between French and English to read the resume copy.

**Why this priority**: Bilingual presentation increases reach and is central to the user's need.

**Independent Test**: Toggle language control and verify textual content changes to the chosen language.

**Acceptance Scenarios**:

1. **Given** the page is visible, **When** the user selects `Français`, **Then** all resume content (including section titles: About→À Propos, Experience→Expérience, etc.) updates to French.
2. **Given** the page is visible, **When** the user selects `English`, **Then** all resume content (including section titles) updates to English.

---

### User Story 3 - Export PDF (Priority: P1)

User can export or download a PDF version of the resume via a banner button.

**Why this priority**: Users often need a printable/attachable resume PDF.

**Independent Test**: Click the export button and confirm a PDF file is generated/downloaded with the currently selected language and theme.

**Acceptance Scenarios**:

1. **Given** the user is viewing the resume, **When** the user clicks `Export PDF`, **Then** a PDF downloads containing the resume in the active language and with a print-friendly layout.

---

### User Story 4 - Theme toggle (Priority: P2)

User can toggle Dark/Light mode to change visual theme.

**Why this priority**: Improves readability and user comfort.

**Independent Test**: Use the theme control and verify colors update consistently.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user selects Dark mode, **Then** the page switches to a dark color palette preserving readability.
2. **Given** the page is loaded, **When** the user selects Light mode, **Then** the page switches to a light palette.

---

### User Story 5 - Projects showcase (Priority: P3)

The site includes a Projects section to present web app projects and games.

**Why this priority**: Useful for future expansion; non-blocking for MVP.

**Independent Test**: A Projects section lists projects with title, short description and link if available.

**Acceptance Scenarios**:

1. **Given** the Projects section exists, **When** the user opens it, **Then** they see project cards with title, description and optional links.

---

### Edge Cases

- Browser without JavaScript: content should remain readable (static HTML) and language selection may degrade gracefully.
- PDF export failure: show a clear error message and provide a fallback to open a print dialog.
- Extremely long content: ensure layout remains readable and printable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display the standard resume sections: About (with optional profile photo displayed on the left, max 25% width), Work Experience, Skills (organized by category), Education, Contact, Social Links.
- **FR-002**: The site MUST provide a language switcher for French and English; switching changes all textual content.
- **FR-003**: The site MUST provide an `Export PDF` control which produces a downloadable/printable PDF of the resume in the active language.
- **FR-004**: The site MUST provide a theme toggle (Dark/Light) that updates the visual presentation persistently during the session.
- **FR-005**: The site MUST include a Projects section able to list multiple project entries with title, description and optional link.
- **FR-006**: The site SHOULD be deployable as a static site (no server required) and hostable on GitHub Pages / Vercel / Netlify.
- **FR-007**: The site MUST avoid third-party trackers by default and collect no visitor personal data without explicit consent.

### Key Entities *(include if feature involves data)*

- **Resume**: Logical document composed of Sections, optionally including a profile photo.
- **Section**: e.g., About, Experience, Skills, Education, Contact, Projects.
- **About**: Introduction section with optional profile photo (left-aligned, max 25% width) and biography text.
- **Experience**: Employer, role, start/end dates, summary, bullets.
- **Education**: Institution, degree, dates, notes.
- **Skill**: Organized by category (e.g., Languages, Tools, Methodologies). Each skill has a name and optional level/tag.
- **Contact**: Email, optional contact form metadata (if present).
- **Project**: Title, short description, optional link, screenshots.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the required sections (About, Experience, Skills, Education, Contact, Social) are present and readable on desktop and mobile.
- **SC-002**: Language switcher updates the visible textual content within 2 seconds on a typical broadband connection.
- **SC-003**: Export PDF produces a printable PDF that contains the resume content in the currently selected language and preserves section order; PDF download succeeds in 95% of manual tests across supported browsers.
- **SC-004**: Theme toggle applies immediately and persists for the session (user can visually confirm change in <1s).
- **SC-005**: The site loads its critical content (above-the-fold) in under 2 seconds on a modern mobile network (measurable via Lighthouse or similar).
- **SC-006**: Accessibility: Keyboard navigation reaches all main sections and interactive controls (language toggle, export, theme) and images include alt text where applicable.

---

**Assumptions**:

- The resume content (French and English) will be provided in Markdown or a simple JSON file that the static site can render.
- PDF export will be implemented client-side (print-to-PDF or library) to avoid server dependencies.
- No user accounts or server-side storage are required for the MVP.

**Notes**:

- Keep implementation-agnostic in this spec: focus on what the site must do and why, not on which frameworks to use.

```
