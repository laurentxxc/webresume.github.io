# Quickstart: Resume Web App

**Goal**: Get a working resume website running locally in < 15 minutes.

---

## Quick Start Options

### Option 1: Zero-Build (Vanilla HTML/CSS/JS) — 5 minutes

Fastest way to get started. No build tool required.

#### 1.1 Create Project Structure

```bash
mkdir webresume
cd webresume

# Create directories
mkdir -p assets/{styles,scripts,images}
```

#### 1.2 Create `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>John Doe - Full Stack Developer</title>
  <meta name="description" content="Full-stack developer specializing in web applications">
  
  <!-- Theme CSS with variables -->
  <link rel="stylesheet" href="assets/styles/theme.css">
  <link rel="stylesheet" href="assets/styles/main.css">
  <link rel="stylesheet" href="assets/styles/print.css" media="print">
</head>
<body>
  <header>
    <div class="container">
      <h1 id="name">John Doe</h1>
      <p id="title">Full Stack Developer</p>
      
      <nav class="controls">
        <button id="lang-toggle" aria-label="Change language">
          English / Français
        </button>
        <button id="theme-toggle" aria-label="Toggle dark mode">
          🌙
        </button>
        <button id="pdf-export" aria-label="Export as PDF">
          📥 Download PDF
        </button>
      </nav>
    </div>
  </header>

  <main id="resume-content">
    <!-- Content rendered here by JavaScript -->
  </main>

  <footer>
    <p>&copy; 2025 John Doe. All rights reserved.</p>
  </footer>

  <!-- Load resume data (embedded) -->
  <script src="assets/scripts/resume-data.js"></script>
  <!-- Load app logic -->
  <script src="assets/scripts/main.js"></script>
</body>
</html>
```

#### 1.3 Create `assets/scripts/resume-data.js`

```javascript
const resumeData = {
  fr: {
    about: {
      text: "Développeur full-stack passionné par les technologies web modernes.",
      photo: "assets/images/avatar.jpg",
      photoAlt: "Photo de profil"
    },
    experience: [
      {
        company: "TechCorp",
        role: "Développeur Senior",
        startDate: "2020-01-15",
        endDate: null,
        location: "Paris, France",
        description: "Développement d'applications web scalables.",
        bullets: [
          "Architected microservices",
          "Led team of 5 developers"
        ]
      }
    ],
    skills: [
      { name: "JavaScript", category: "technical", level: "expert" },
      { name: "React", category: "technical", level: "advanced" },
      { name: "Communication", category: "soft", level: "advanced" }
    ],
    education: [
      {
        institution: "Université Paris-Diderot",
        degree: "Master's",
        field: "Computer Science",
        graduationDate: "2019-06-30",
        gpa: "3.8/4.0"
      }
    ],
    contact: {
      email: "john@example.com",
      phone: "+33 1 23 45 67 89",
      location: "Paris, France",
      website: "https://johndoe.dev"
    },
    social: [
      { platform: "linkedin", url: "https://linkedin.com/in/johndoe", label: "LinkedIn" },
      { platform: "github", url: "https://github.com/johndoe", label: "GitHub" }
    ],
    projects: [
      {
        title: "Portfolio Website",
        description: "Responsive web portfolio built with vanilla HTML/CSS/JS",
        link: "https://johndoe.dev",
        tags: ["web", "frontend"]
      }
    ]
  },
  en: {
    about: {
      text: "Full-stack developer passionate about modern web technologies.",
      photo: "assets/images/avatar.jpg",
      photoAlt: "Profile photo"
    },
    experience: [
      {
        company: "TechCorp",
        role: "Senior Developer",
        startDate: "2020-01-15",
        endDate: null,
        location: "Paris, France",
        description: "Development of scalable web applications.",
        bullets: [
          "Architected microservices",
          "Led team of 5 developers"
        ]
      }
    ],
    skills: [
      { name: "JavaScript", category: "technical", level: "expert" },
      { name: "React", category: "technical", level: "advanced" },
      { name: "Communication", category: "soft", level: "advanced" }
    ],
    education: [
      {
        institution: "University of Paris",
        degree: "Master's",
        field: "Computer Science",
        graduationDate: "2019-06-30",
        gpa: "3.8/4.0"
      }
    ],
    contact: {
      email: "john@example.com",
      phone: "+33 1 23 45 67 89",
      location: "Paris, France",
      website: "https://johndoe.dev"
    },
    social: [
      { platform: "linkedin", url: "https://linkedin.com/in/johndoe", label: "LinkedIn" },
      { platform: "github", url: "https://github.com/johndoe", label: "GitHub" }
    ],
    projects: [
      {
        title: "Portfolio Website",
        description: "Responsive web portfolio built with vanilla HTML/CSS/JS",
        link: "https://johndoe.dev",
        tags: ["web", "frontend"]
      }
    ]
  }
};

function getResume(lang) {
  return resumeData[lang] || resumeData.en;
}

function getSupportedLanguages() {
  return Object.keys(resumeData);
}
```

#### 1.4 Create `assets/scripts/main.js`

```javascript
// App state
let currentLanguage = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize app
function initApp() {
  applyTheme(currentTheme);
  renderResume(currentLanguage);
  setupEventListeners();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  updateThemeButton();
}

function toggleTheme() {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  renderResume(lang);
  updateLangButton();
}

function renderResume(lang) {
  const resume = getResume(lang);
  const container = document.getElementById('resume-content');
  
  container.innerHTML = `
    <section id="about" class="section">
      <h2>${lang === 'en' ? 'About' : 'À propos'}</h2>
      <p>${resume.about.text}</p>
    </section>
    
    <section id="experience" class="section">
      <h2>${lang === 'en' ? 'Experience' : 'Expérience'}</h2>
      ${resume.experience.map(exp => `
        <article class="entry">
          <h3>${exp.role} at ${exp.company}</h3>
          <p class="meta">${exp.startDate} - ${exp.endDate || 'Present'}</p>
          <p>${exp.description}</p>
          <ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </article>
      `).join('')}
    </section>
    
    <section id="skills" class="section">
      <h2>${lang === 'en' ? 'Skills' : 'Compétences'}</h2>
      <div class="skills-grid">
        ${resume.skills.map(skill => `
          <div class="skill-card">
            <strong>${skill.name}</strong>
            <p class="level">${skill.level || ''}</p>
          </div>
        `).join('')}
      </div>
    </section>
    
    <section id="projects" class="section">
      <h2>${lang === 'en' ? 'Projects' : 'Projets'}</h2>
      ${resume.projects.map(proj => `
        <article class="project">
          <h3>${proj.title}</h3>
          <p>${proj.description}</p>
          ${proj.link ? `<a href="${proj.link}" target="_blank">View Project →</a>` : ''}
        </article>
      `).join('')}
    </section>
  `;
}

function setupEventListeners() {
  document.getElementById('lang-toggle').addEventListener('click', () => {
    setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  });
  
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  
  document.getElementById('pdf-export').addEventListener('click', exportPDF);
  
  updateLangButton();
  updateThemeButton();
}

function updateLangButton() {
  const btn = document.getElementById('lang-toggle');
  btn.textContent = currentLanguage === 'en' ? 'Français' : 'English';
}

function updateThemeButton() {
  const btn = document.getElementById('theme-toggle');
  btn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

function exportPDF() {
  alert('PDF export functionality requires a library like jsPDF.\nFor now, use your browser\'s Print (Ctrl+P) feature.');
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
```

#### 1.5 Create `assets/styles/theme.css`

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #000000;
  --text-secondary: #666666;
  --accent: #0066cc;
  --border: #e0e0e0;
}

[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --accent: #4da6ff;
  --border: #444;
}

* {
  transition: background-color 0.3s, color 0.3s;
}
```

#### 1.6 Create `assets/styles/main.css`

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  padding: 2rem 0;
}

header h1 {
  margin: 0;
  font-size: 2rem;
}

.controls {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.controls button {
  padding: 0.5rem 1rem;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.controls button:hover {
  opacity: 0.9;
}

main {
  padding: 2rem 0;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 1.5rem;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 0.5rem;
  margin-top: 0;
}

.entry {
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
}

.entry h3 {
  margin: 0;
  font-size: 1.1rem;
}

.meta {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0.25rem 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.skill-card {
  background-color: var(--bg-secondary);
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.project {
  background-color: var(--bg-secondary);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.project a {
  color: var(--accent);
  text-decoration: none;
}

.project a:hover {
  text-decoration: underline;
}

footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.9rem;
}
```

#### 1.7 Open in Browser

```bash
# Open index.html in your browser (e.g., Chrome, Firefox)
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

✅ **Done!** Refresh the page and test language/theme switching.

---

### Option 2: Vite (Modern Bundler) — 10 minutes

```bash
npm create vite@latest webresume -- --template vanilla
cd webresume
npm install

# Copy your resume-data.js and styles into src/
# Update main.js to import and initialize the app
npm run dev  # http://localhost:5173
```

---

### Option 3: Jekyll (Static Site Generator) — 12 minutes

```bash
gem install bundler jekyll
jekyll new webresume
cd webresume

# Update _config.yml with site info
# Add resume content to _pages/
bundle exec jekyll serve  # http://localhost:4000
```

---

### Option 4: Angular (Full SPA Framework) — 15 minutes

```bash
npm install -g @angular/cli
ng new webresume --routing --style=css
cd webresume
npm install

# Generate components for each section
ng generate component components/about
ng generate component components/experience
# ...

npm start  # http://localhost:4200
```

---

## Customization

### Add Your Content

1. Edit `assets/scripts/resume-data.js` with your actual resume data.
2. Update `index.html` with your name and title.
3. Add your photo to `assets/images/`.
4. Customize colors in `assets/styles/theme.css`.

### Add PDF Export (Optional)

```bash
npm install jspdf html2canvas
```

Then update `pdf-export.js`:

```javascript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

async function exportToPDF() {
  const canvas = await html2canvas(document.getElementById('resume-content'));
  const img = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(img, 'PNG', 10, 10, 190, 0);
  pdf.save('resume.pdf');
}
```

### Deploy

```bash
# GitHub Pages (free)
git push origin main  # Automatically deployed if branch is 'main'

# Vercel (easy)
vercel

# Netlify (easy)
netlify deploy
```

---

## Next Steps

1. ✅ Get resume rendering locally
2. Edit content in `resume-data.js` 
3. Customize styles in `main.css` and `theme.css`
4. Test language switching and dark mode
5. Deploy to hosting platform (GitHub Pages / Vercel / Netlify)
6. Share your resume link!

---

**Happy coding! 🚀**

