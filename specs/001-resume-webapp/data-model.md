# Data Model: Resume Web App

**Date**: 2025-12-03  
**Status**: Complete — entities, relationships, and validation rules defined

---

## Core Entities

### 1. Resume (Root Document)

Represents the complete resume/portfolio for the authenticated user.

**Fields**:
- `id` (string): Unique identifier (e.g., "resume-001")
- `lang` (string, enum): Primary language of this resume ("fr" | "en")
- `version` (string): Semantic version (e.g., "1.0.0")
- `createdAt` (date): Creation timestamp
- `lastUpdated` (date): Last modification timestamp
- `sections` (Section[]): Ordered list of resume sections
- `metadata` (ResumeMetadata): SEO and display metadata

**Validation**:
- `id`: required, non-empty string
- `lang`: required, must be "fr" or "en"
- `version`: follows MAJOR.MINOR.PATCH format
- `sections`: must not be empty; at least 1 section required

**Relationships**:
- Has many `Section` (1:N)
- Has one `ResumeMetadata` (1:1)

---

### 2. Section

A logical grouping of resume content (e.g., About, Experience, Skills, etc.).

**Fields**:
- `id` (string, enum): Section identifier ("about" | "experience" | "skills" | "education" | "contact" | "social" | "projects")
- `title` (string): Display title (e.g., "Work Experience")
- `order` (number): Display order (0-based)
- `visible` (boolean): Toggles section visibility
- `content` (Content): Polymorphic content based on section type
- `icon` (string, optional): Icon name for UI rendering

**Validation**:
- `id`: required, must be predefined enum value
- `title`: required, non-empty string
- `order`: required, non-negative integer
- `visible`: required, default true

**Relationships**:
- Belongs to `Resume` (N:1)
- Has polymorphic `Content` (1:1)

---

### 3. Content (Polymorphic)

Represents the actual data of a section, with type-specific fields.

#### 3a. AboutContent

**Fields**:
- `type` (string, literal): "about"
- `text` (string): Markdown or HTML text
- `photo` (string, optional): URL to profile photo
- `photoAlt` (string, optional): Alt text for accessibility

**Validation**:
- `text`: non-empty string, max 1000 chars
- `photo`: must be valid image URL if provided
- `photoAlt`: recommended if `photo` is present

---

#### 3b. ExperienceContent

**Fields**:
- `type` (string, literal): "experience"
- `entries` (Experience[]): Array of job/work entries
- `layout` (string, enum, optional): "timeline" | "list" (default: "timeline")

**Validation**:
- `entries`: must not be empty if section is visible
- Each entry must be valid Experience object

---

#### 3c. SkillsContent

**Fields**:
- `type` (string, literal): "skills"
- `skills` (Skill[]): Array of skill entries
- `layout` (string, enum, optional): "grid" | "list" (default: "grid")

**Validation**:
- `skills`: must not be empty if section is visible
- Each skill must have non-empty name and category

---

#### 3d. EducationContent

**Fields**:
- `type` (string, literal): "education"
- `degrees` (Degree[]): Array of degree entries

**Validation**:
- `degrees`: must not be empty if section is visible

---

#### 3e. ContactContent

**Fields**:
- `type` (string, literal): "contact"
- `email` (string, optional): Email address
- `phone` (string, optional): Phone number
- `location` (string, optional): Physical location
- `website` (string, optional): Personal website URL

**Validation**:
- `email`: valid email format if provided
- At least one contact method must be present if section is visible

---

#### 3f. SocialContent

**Fields**:
- `type` (string, literal): "social"
- `links` (SocialLink[]): Array of social profile links

**Validation**:
- `links`: must not be empty if section is visible
- Each link must have platform, url, and icon

---

#### 3g. ProjectsContent

**Fields**:
- `type` (string, literal): "projects"
- `projects` (Project[]): Array of project entries

**Validation**:
- `projects`: must not be empty if section is visible

---

## Detailed Entity Schemas

### Experience

Represents a single job, internship, or work engagement.

**Fields**:
- `id` (string): Unique identifier within the experiences array
- `company` (string): Employer name
- `role` (string): Job title
- `startDate` (date, YYYY-MM-DD): Start date
- `endDate` (date, YYYY-MM-DD, optional): End date (null = current/ongoing)
- `location` (string, optional): Work location
- `description` (string): Job summary or key responsibilities (Markdown)
- `bullets` (string[]): Key achievements or bullet points
- `technologies` (string[], optional): Tech stack used

**Validation**:
- `company`, `role`: required, non-empty
- `startDate`: required, valid date, not in future
- `endDate`: if provided, must be >= `startDate`
- `description`: optional, max 500 chars
- `bullets`: array of 0-10 items, each max 200 chars

---

### Skill

Represents a single professional or technical skill.

**Fields**:
- `id` (string): Unique identifier
- `name` (string): Skill name (e.g., "JavaScript", "Project Management")
- `category` (string, enum): "technical" | "soft" | "language"
- `level` (string, enum, optional): "beginner" | "intermediate" | "advanced" | "expert"
- `endorsements` (number, optional): Number of endorsements (for display)
- `tags` (string[], optional): Related keywords

**Validation**:
- `name`: required, non-empty, max 100 chars
- `category`: required, must be predefined enum
- `level`: optional, must be predefined enum if provided

---

### Degree

Represents a single educational achievement.

**Fields**:
- `id` (string): Unique identifier
- `institution` (string): School/university name
- `degree` (string): Degree type (e.g., "Bachelor of Science", "Master's")
- `field` (string): Field of study (e.g., "Computer Science")
- `graduationDate` (date, YYYY-MM-DD): Graduation date
- `location` (string, optional): School location
- `gpa` (string, optional): GPA or grade (e.g., "3.9/4.0")
- `notes` (string, optional): Additional notes (honors, scholarships, etc.)

**Validation**:
- `institution`, `degree`, `field`: required, non-empty
- `graduationDate`: required, valid date

---

### SocialLink

Represents a single social media or professional profile link.

**Fields**:
- `id` (string): Unique identifier
- `platform` (string, enum): "linkedin" | "github" | "twitter" | "portfolio" | "email" | "custom"
- `url` (string): Full URL to profile
- `label` (string, optional): Display label (defaults to platform name)
- `icon` (string, optional): Icon class or name for UI rendering

**Validation**:
- `platform`: required, must be predefined enum
- `url`: required, valid URL format
- If `platform` is "email", `url` should be "mailto:..." format

---

### Project

Represents a single portfolio project or game.

**Fields**:
- `id` (string): Unique identifier
- `title` (string): Project name
- `description` (string): Short project description (Markdown, max 300 chars)
- `link` (string, optional): URL to project or demo
- `screenshot` (string, optional): URL to project image/screenshot
- `tags` (string[]): Technology/category tags (e.g., ["game", "web", "WebGL"])
- `startDate` (date, YYYY-MM-DD, optional): Project start
- `endDate` (date, YYYY-MM-DD, optional): Project completion (null = ongoing)
- `featured` (boolean, optional): Pin/feature this project (default: false)

**Validation**:
- `title`: required, non-empty, max 100 chars
- `description`: optional, max 300 chars
- `link`: valid URL format if provided
- `screenshot`: valid image URL if provided
- `tags`: array of 0-10 tags, each max 50 chars

---

### ResumeMetadata

SEO and display metadata for the resume.

**Fields**:
- `title` (string): Page title (e.g., "John Doe - Full Stack Developer")
- `description` (string): Meta description for SEO
- `keywords` (string[]): SEO keywords
- `ogImage` (string, optional): Open Graph image URL
- `ogUrl` (string, optional): Canonical URL
- `ogType` (string, default): "profile"
- `twitterHandle` (string, optional): @twitter handle

**Validation**:
- `title`: required, max 120 chars
- `description`: required, max 160 chars
- `keywords`: array of 5-20 keywords

---

### AppState (Runtime State)

Represents the current UI/user state (not persisted to data model, but managed in localStorage).

**Fields**:
- `activeLanguage` (string, enum): "fr" | "en" (persisted in localStorage)
- `activeTheme` (string, enum): "light" | "dark" (persisted in localStorage)
- `expandedSections` (Set<string>): Sections expanded/collapsed in accordion UI
- `pdfExportInProgress` (boolean): Transient; true while PDF is generating

**Validation**:
- `activeLanguage`: default "en"
- `activeTheme`: default "light" (or system preference if detected)
- `expandedSections`: all initial sections expanded by default

---

## Data Constraints & Business Rules

### Invariants

1. **At least one section must be visible** if resume is published.
2. **Language must be consistent** within a rendered view (all text from same language key).
3. **Dates must be chronological**: `startDate` <= `endDate` for all dated entities.
4. **No duplicate section IDs** in a resume.

### State Transitions

- **Resume State**: "draft" → "published" → "archived" (one-way unless user explicitly reverts).
- **Section Visibility**: Can toggle on/off independently.
- **Content Changes**: Trigger `lastUpdated` timestamp.

### Accessibility Rules

1. Every image (`photo`, `screenshot`) must have non-empty alt text.
2. Every section must have a semantic heading (h2-h3 level).
3. Every interactive element (button, link) must have accessible label.
4. Color contrast must meet WCAG AA (4.5:1 for normal text).

---

## ER Diagram (ASCII)

```
┌─────────────────────────────┐
│        Resume              │
├─────────────────────────────┤
│ id: string (PK)             │
│ lang: "fr" | "en"           │
│ version: string             │
│ createdAt: date             │
│ lastUpdated: date           │
│ metadata: ResumeMetadata    │
└─────────────────────────────┘
         │
         │ has many (1:N)
         │
         ▼
┌─────────────────────────────┐
│        Section              │
├─────────────────────────────┤
│ id: enum (PK)               │
│ title: string               │
│ order: number               │
│ visible: boolean            │
│ resume_id: FK               │
└─────────────────────────────┘
         │
         │ has (1:1, polymorphic)
         │
         ▼
┌─────────────────────────────┐
│  Content (polymorphic)      │
├─────────────────────────────┤
│ type: enum                  │
│ section_id: FK              │
│ [type-specific fields]      │
└─────────────────────────────┘


Polymorphic Content Types:
- AboutContent
  ├─ text: string
  └─ photo: string?
  
- ExperienceContent
  └─ entries: Experience[]
  
- SkillsContent
  └─ skills: Skill[]
  
- EducationContent
  └─ degrees: Degree[]
  
- ContactContent
  ├─ email: string?
  ├─ phone: string?
  ├─ location: string?
  └─ website: string?
  
- SocialContent
  └─ links: SocialLink[]
  
- ProjectsContent
  └─ projects: Project[]
```

---

## Implementation Notes

1. **No Database**: This data model is for **in-memory/embedded data** in JavaScript or JSON configuration.
2. **Multilingual**: All text fields are organized by language in the `resume-data.js` file.
3. **Immutability**: Consider using Object.freeze() for production data to prevent accidental mutations.
4. **Validation**: Implement client-side validation in JavaScript before rendering or exporting.
5. **Type Safety**: TypeScript interfaces recommended for development (compile to vanilla JS for deployment).

