/* Core app logic: language, theme, render, persistence */
(function(){
  const LS_KEY = 'webresume:prefs'
  const defaultPrefs = {lang:'en',theme:'light'}
  let prefs = Object.assign({}, defaultPrefs)

  function loadPrefs(){
    try{const raw = localStorage.getItem(LS_KEY); if(raw) prefs = Object.assign(prefs, JSON.parse(raw))}catch(e){}
  }
  function savePrefs(){ try{localStorage.setItem(LS_KEY, JSON.stringify(prefs))}catch(e){} }

  function setLanguage(lang){ prefs.lang = lang; savePrefs(); renderResume(); updateLangButton(); }
  function toggleLanguage(){ setLanguage(prefs.lang === 'en' ? 'fr' : 'en') }

  function setTheme(t){ prefs.theme = t; savePrefs(); applyTheme(); }
  function toggleTheme(){ setTheme(prefs.theme === 'light' ? 'dark' : 'light') }

  function applyTheme(){ document.documentElement.setAttribute('data-theme', prefs.theme); const btn = document.getElementById('theme-toggle'); if(btn) btn.textContent = prefs.theme === 'dark' ? '☀️' : '🌙' }
  function updateLangButton(){ const b = document.getElementById('lang-toggle'); if(!b) return; b.textContent = prefs.lang === 'en' ? 'Français' : 'English' }

  function renderResume(){ const lang = prefs.lang || 'en'; const data = window.resumeData && window.resumeData[lang]; if(!data) return;
    // Update section titles dynamically
    const titles = data.sectionTitles || {};
    const updateSectionTitle = (id, key) => { const el = document.querySelector(`#${id} h2`); if(el && titles[key]) el.textContent = titles[key]; };
    updateSectionTitle('about', 'about');
    updateSectionTitle('experience', 'experience');
    updateSectionTitle('skills', 'skills');
    updateSectionTitle('education', 'education');
    updateSectionTitle('contact', 'contact');
    updateSectionTitle('projects', 'projects');
    
    // About
    const about = document.getElementById('about-content');
    const profileImg = data.profileImage ? `<img src="${escapeAttr(data.profileImage)}" alt="Profile photo" class="profile-photo" />` : '';
    const aboutHTML = profileImg ? `<div class="about-wrapper"><div class="about-photo">${profileImg}</div><div class="about-text"><p>${renderMarkdown(data.about)}</p></div></div>` : `<p>${renderMarkdown(data.about)}</p>`;
    about.innerHTML = aboutHTML;
    // Experience
      const exp = document.getElementById('experience-content'); exp.innerHTML = data.experience.map(e=>`<article class="job"><h3>${escapeHtml(e.role)} ${renderMarkdown(e.company)}</h3><p class="muted">${escapeHtml(e.dates)}</p>${renderMarkdown(e.description)}</article>`).join('');
    // Skills
    const skills = document.getElementById('skills-content'); 
    if (data.skills && typeof data.skills === 'object' && !Array.isArray(data.skills)) {
      // Categorized skills
      skills.innerHTML = Object.entries(data.skills).map(([category, skillList]) => 
        `<div class="skill-category"><h3 class="category-title">${escapeHtml(category)}</h3><div class="skill-items">${skillList.map(s => `<span class="skill-chip">${escapeHtml(s)}</span>`).join(' ')}</div></div>`
      ).join('');
    } else {
      // Fallback for flat array
      skills.innerHTML = data.skills.map(s=>`<span class="skill-chip">${escapeHtml(s)}</span>`).join(' ');
    }
    // Education
    const edu = document.getElementById('education-content'); edu.innerHTML = data.education.map(d=>`<div><strong>${escapeHtml(d.degree)}</strong> — ${renderMarkdownInline(d.school)} <span class="muted">(${escapeHtml(d.year)})</span></div>`).join('');
    // Projects
      const proj = document.getElementById('projects-content'); proj.innerHTML = data.projects.map(p=>`<div class="project-card"><h4>${escapeHtml(p.title)}</h4>${renderMarkdown(p.desc)}<a href="${escapeAttr(p.link)}" target="_blank" rel="noopener noreferrer">Visit</a></div>`).join('');
      // Markdown renderer: supports **bold**, *italic*, `code`, [link](url), and - lists
      function processInline(text){
        // Escape HTML first
        let s = escapeHtml(text);

        // Tokenize links FIRST, including their label text, to protect against
        // underscore/italic conflicts in both URL and label
        const linkTokens = [];
        s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_, label, url){
          const idx = linkTokens.length;
          const href = escapeAttr(url);
          // Do NOT escape label yet; process markdown inside it separately if needed
          linkTokens.push({label, href});
          return `@@LINK${idx}@@`;
        });

        // Bold: **text** or __text__
        s = s.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/__(.+?)__/g,'<strong>$1</strong>');
        // Italic: *text* or _text_
        s = s.replace(/\*([^\*]+)\*/g,'<em>$1</em>').replace(/_([^_]+)_/g,'<em>$1</em>');
        // Inline code: `code`
        s = s.replace(/`([^`]+)`/g,'<code>$1</code>');

        // Restore tokenized links with fully escaped content
        s = s.replace(/@@LINK(\d+)@@/g, function(_, n){
          const link = linkTokens[Number(n)];
          if(!link) return '';
          const inner = escapeHtml(link.label);
          return `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
        });
        return s;
      }

      function renderMarkdownInline(md){
        if(!md) return '';
        const text = String(md);
        return processInline(text);
      }
      function renderMarkdown(md){
        if(!md) return '';
        const raw = String(md).replace(/\r\n?/g,'\n');
        const lines = raw.split('\n');
        let out = '';
        let inList = false;

        for(let i=0;i<lines.length;i++){
          const line = lines[i].trim();
          if(line.startsWith('- ')){
            if(!inList){ out += '<ul>'; inList = true; }
            const item = line.slice(2).trim();
            out += '<li>'+processInline(item)+'</li>';
          } else if(line === ''){
            if(inList){ out += '</ul>'; inList = false; }
          } else {
            if(inList){ out += '</ul>'; inList = false; }
            out += '<p>'+processInline(line)+'</p>';
          }
        }
        if(inList) out += '</ul>';
        return out;
      }
    // Contact & Social
    const contact = document.getElementById('contact-content'); contact.innerHTML = `<div><strong>Email:</strong> <a href="mailto:${escapeAttr(data.contact.email)}">${escapeHtml(data.contact.email)}</a></div><div><strong>Phone:</strong> ${escapeHtml(data.contact.phone)}</div><div class="muted">${escapeHtml(data.contact.location)}</div>`;
    const social = document.getElementById('social-content'); social.innerHTML = data.social.map(s=>`<a href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)}</a>`).join(' | ');
  }

  function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}); }
  function escapeAttr(s){ if(!s) return ''; return String(s).replace(/"/g,'&quot;'); }

  function wireEvents(){
    const langBtn = document.getElementById('lang-toggle'); if(langBtn) langBtn.addEventListener('click', ()=>{ toggleLanguage(); });
    const themeBtn = document.getElementById('theme-toggle'); if(themeBtn) themeBtn.addEventListener('click', ()=>{ toggleTheme(); });
    const exportBtn = document.getElementById('export-pdf'); if(exportBtn) exportBtn.addEventListener('click', ()=>{ if(window.exportPDF) window.exportPDF(); else window.print(); });

    // Listen to PDF export lifecycle events to disable/enable the export button
    document.addEventListener('resume:pdf-export-start', ()=> setExportDisabled(true));
    document.addEventListener('resume:pdf-export-complete', ()=> setExportDisabled(false));
    document.addEventListener('resume:pdf-export-error', ()=> setExportDisabled(false));
  }

  function setExportDisabled(disabled){
    const btn = document.getElementById('export-pdf');
    if(!btn) return;
    btn.disabled = !!disabled;
    if(disabled){ btn.setAttribute('aria-busy','true'); } else { btn.removeAttribute('aria-busy'); }
  }

  function init(){ loadPrefs(); applyTheme(); updateLangButton(); wireEvents(); renderResume(); }

  document.addEventListener('DOMContentLoaded', init);

  // Expose some functions for debugging
  window.webresume = {setLanguage,setTheme,renderResume};
})();
