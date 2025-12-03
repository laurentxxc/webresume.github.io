# API Contracts: Resume Web App

**Purpose**: Define the public interface for resume web app components and user interactions.

**Note**: This application is **client-side only**; there is no server API. The "contracts" below define:
- Component interfaces (how UI components are called).
- Data structures exchanged between modules.
- Browser APIs and events.

---

## 1. Resume Data Interface

### Interface: `ResumeDataModule`

Provides access to resume content in both languages.

**Module**: `assets/scripts/resume-data.js`

```typescript
interface ResumeDataModule {
  /**
   * Get resume data for a specific language.
   * @param lang - Language code: 'fr' or 'en'
   * @returns Resume object with sections and content
   */
  getResume(lang: 'fr' | 'en'): Resume;

  /**
   * Get available languages.
   * @returns Array of supported language codes
   */
  getSupportedLanguages(): string[];

  /**
   * List all available sections (for dynamic UI rendering).
   * @returns Array of section IDs and metadata
   */
  getSectionMetadata(): SectionMetadata[];
}

// Example Usage:
const resumeData = await import('./assets/scripts/resume-data.js');
const frResume = resumeData.getResume('fr');
const enResume = resumeData.getResume('en');
```

**Data Structure**:

```typescript
interface Resume {
  id: string;
  lang: 'fr' | 'en';
  version: string;
  metadata: ResumeMetadata;
  sections: Section[];
}

interface Section {
  id: 'about' | 'experience' | 'skills' | 'education' | 'contact' | 'social' | 'projects';
  title: string;
  visible: boolean;
  order: number;
  content: SectionContent;
}

interface SectionContent {
  type: string;
  [key: string]: any;
}

interface ResumeMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

interface SectionMetadata {
  id: string;
  title: string;
  icon: string;
  order: number;
}
```

---

## 2. Language Management Module

### Interface: `LanguageManager`

Handles language switching and persistence.

**Module**: `assets/scripts/main.js` (export `languageManager`)

```typescript
interface LanguageManager {
  /**
   * Get the currently active language.
   * @returns Current language code ('fr' or 'en')
   */
  getActiveLanguage(): 'fr' | 'en';

  /**
   * Set active language and update DOM.
   * @param lang - Language code to activate
   * @returns Promise resolved when DOM update is complete
   */
  setActiveLanguage(lang: 'fr' | 'en'): Promise<void>;

  /**
   * Get supported languages.
   * @returns Array of language codes
   */
  getSupportedLanguages(): string[];

  /**
   * Fired when language changes.
   */
  on(event: 'language-changed', callback: (lang: string) => void): void;
}

// Example Usage:
import { languageManager } from './assets/scripts/main.js';
languageManager.getActiveLanguage(); // 'en'
await languageManager.setActiveLanguage('fr');
languageManager.on('language-changed', (lang) => console.log(`Switched to ${lang}`));
```

---

## 3. Theme Management Module

### Interface: `ThemeManager`

Handles Dark/Light mode switching and persistence.

**Module**: `assets/scripts/main.js` (export `themeManager`)

```typescript
interface ThemeManager {
  /**
   * Get the currently active theme.
   * @returns Current theme ('light' or 'dark')
   */
  getActiveTheme(): 'light' | 'dark';

  /**
   * Set active theme and apply to DOM.
   * @param theme - Theme to activate
   */
  setActiveTheme(theme: 'light' | 'dark'): void;

  /**
   * Toggle between light and dark themes.
   */
  toggleTheme(): void;

  /**
   * Get system preference (if available).
   * @returns System theme preference or null
   */
  getSystemPreference(): 'light' | 'dark' | null;

  /**
   * Fired when theme changes.
   */
  on(event: 'theme-changed', callback: (theme: string) => void): void;
}

// Example Usage:
import { themeManager } from './assets/scripts/main.js';
themeManager.getActiveTheme(); // 'light'
themeManager.setActiveTheme('dark');
themeManager.on('theme-changed', (theme) => console.log(`Theme: ${theme}`));
```

---

## 4. PDF Export Service

### Interface: `PDFExporter`

Exports resume as PDF with current language and theme.

**Module**: `assets/scripts/pdf-export.js` (export `PDFExporter`)

```typescript
interface PDFExporter {
  /**
   * Export current resume view to PDF.
   * @param options - Export options
   * @returns Promise resolved when download completes
   */
  exportToPDF(options?: PDFExportOptions): Promise<void>;

  /**
   * Check if PDF export is supported in current browser.
   * @returns true if supported
   */
  isSupported(): boolean;

  /**
   * Get export status (e.g., for progress indication).
   * @returns Current export status
   */
  getStatus(): 'idle' | 'generating' | 'downloading' | 'error';
}

interface PDFExportOptions {
  filename?: string;           // Default: "resume.pdf"
  format?: 'A4' | 'letter';    // Default: 'A4'
  scale?: number;              // PDF quality (1-2, default: 1.5)
}

// Example Usage:
import { PDFExporter } from './assets/scripts/pdf-export.js';
const exporter = new PDFExporter();
if (exporter.isSupported()) {
  await exporter.exportToPDF({ filename: 'john-doe-resume.pdf' });
}
```

---

## 5. DOM Renderer Interface

### Interface: `ResumeRenderer`

Renders resume sections to DOM with current language.

**Module**: `assets/scripts/main.js` (export `renderer`)

```typescript
interface ResumeRenderer {
  /**
   * Render resume sections to container.
   * @param container - DOM element to render into
   * @param resume - Resume data to render
   */
  render(container: HTMLElement, resume: Resume): void;

  /**
   * Re-render resume with new language (in-place update).
   * @param lang - New language code
   */
  updateLanguage(lang: 'fr' | 'en'): void;

  /**
   * Get rendered section element by ID.
   * @param sectionId - Section ID
   * @returns DOM element or null
   */
  getSectionElement(sectionId: string): HTMLElement | null;

  /**
   * Clear all rendered content.
   */
  clear(): void;
}

// Example Usage:
import { renderer } from './assets/scripts/main.js';
const resume = resumeData.getResume('en');
renderer.render(document.main, resume);
renderer.updateLanguage('fr');
```

---

## 6. Storage Interface

### Interface: `LocalStorage`

Persists user preferences (language, theme).

**Built-in Browser API**; wrapper provided in `assets/scripts/main.js`

```typescript
interface StorageManager {
  /**
   * Get stored preference.
   * @param key - Preference key ('language' or 'theme')
   * @returns Stored value or null
   */
  get(key: 'language' | 'theme'): string | null;

  /**
   * Store preference.
   * @param key - Preference key
   * @param value - Preference value
   */
  set(key: 'language' | 'theme', value: string): void;

  /**
   * Clear all stored preferences.
   */
  clear(): void;
}

// Example Usage:
storage.set('language', 'fr');
const lang = storage.get('language'); // 'fr'
```

---

## 7. Event Contracts

### Document Events

Global events emitted by the application:

```typescript
// Language changed
document.dispatchEvent(new CustomEvent('resume:language-changed', { detail: { lang: 'fr' } }));

// Theme changed
document.dispatchEvent(new CustomEvent('resume:theme-changed', { detail: { theme: 'dark' } }));

// PDF export started
document.dispatchEvent(new CustomEvent('resume:pdf-export-start', { detail: { filename: 'resume.pdf' } }));

// PDF export completed
document.dispatchEvent(new CustomEvent('resume:pdf-export-complete'));

// PDF export failed
document.dispatchEvent(new CustomEvent('resume:pdf-export-error', { detail: { error: Error } }));
```

---

## 8. Component Accessibility Contracts

### ARIA Attributes

All interactive elements must include:

```html
<!-- Language Selector -->
<button id="lang-toggle" aria-label="Change language" aria-pressed="false">
  English / Français
</button>

<!-- Theme Toggle -->
<button id="theme-toggle" aria-label="Toggle dark mode" aria-pressed="false">
  🌙
</button>

<!-- PDF Export -->
<button id="pdf-export" aria-label="Export resume as PDF">
  Download PDF
</button>

<!-- Section Landmarks -->
<section id="about-section" aria-label="About me">
  <h2>About</h2>
  ...
</section>
```

---

## 9. Integration Points

### Page Load Sequence

1. **Load HTML** → semantic markup with empty content areas
2. **Load CSS** → apply base styles + theme variables
3. **Load JavaScript**:
   - Initialize `StorageManager` → load user preferences
   - Initialize `ThemeManager` → apply saved theme
   - Initialize `LanguageManager` → apply saved language
   - Load `ResumeDataModule` → fetch/embed resume data
   - Initialize `ResumeRenderer` → render resume to DOM
   - Initialize `PDFExporter` → attach click handlers
4. **Page interactive** → user can switch language/theme/export PDF

### API Usage Example

```javascript
// app.js
import { resumeData } from './resume-data.js';
import { languageManager, themeManager, renderer, PDFExporter } from './main.js';

async function initializeApp() {
  // 1. Restore user preferences
  const savedLang = localStorage.getItem('language') || 'en';
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // 2. Apply theme
  await themeManager.setActiveTheme(savedTheme);
  
  // 3. Render resume in saved language
  const resume = resumeData.getResume(savedLang);
  renderer.render(document.querySelector('main'), resume);
  
  // 4. Setup event listeners
  document.getElementById('lang-toggle').addEventListener('click', async () => {
    const newLang = languageManager.getActiveLanguage() === 'en' ? 'fr' : 'en';
    await languageManager.setActiveLanguage(newLang);
    renderer.updateLanguage(newLang);
  });
  
  document.getElementById('theme-toggle').addEventListener('click', () => {
    themeManager.toggleTheme();
  });
  
  document.getElementById('pdf-export').addEventListener('click', async () => {
    const exporter = new PDFExporter();
    await exporter.exportToPDF({ filename: `resume-${savedLang}.pdf` });
  });
}

initializeApp();
```

---

## Summary

All contracts are **client-side only**; no server communication required. Components are modular and can be tested independently in the browser.

