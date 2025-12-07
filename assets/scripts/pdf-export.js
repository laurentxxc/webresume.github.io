/* PDF export helper using html2canvas + jsPDF with a print fallback.
   Dynamically loads libraries from CDN if not present. */
(function(){
  const CDN = {
    html2canvas: 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js',
    jspdf: 'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js'
  }

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      if(document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script'); s.src = src; s.async = true;
      s.onload = () => resolve(); s.onerror = (e)=> reject(e);
      document.head.appendChild(s);
    })
  }

  function hasHtml2Canvas(){ return !!window.html2canvas }
  function hasJsPDF(){ return !!(window.jspdf || window.jspdf?.jsPDF || window.jsPDF) }

  class PDFExporter{
    constructor(){ this.status = 'idle' }
    isSupported(){ return true } // we can always fallback to print
    getStatus(){ return this.status }

    async ensureLibs(){
      if(!hasHtml2Canvas()){ await loadScript(CDN.html2canvas) }
      if(!hasJsPDF()){ await loadScript(CDN.jspdf) }
      // normalize jsPDF constructor
      this.jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || (window.jspdf && window.jspdf.default && window.jspdf.default.jsPDF));
      if(!this.jsPDF && window.jspdf && typeof window.jspdf === 'function') this.jsPDF = window.jspdf;
    }

    async exportToPDF(options={}){
      // Build a safe filename: include owner name (if available) and language code (EN/FR)
      const dateStr = (new Date()).toISOString().slice(0,10);
      // determine language: options.lang > localStorage prefs > resumeData keys > default 'en'
      let lang = options.lang;
      if(!lang){
        try{
          const raw = localStorage.getItem('webresume:prefs');
          if(raw){ const p = JSON.parse(raw); if(p && p.lang) lang = p.lang; }
        }catch(e){}
      }
      if(!lang && window.resumeData){ lang = window.resumeData.en ? 'en' : Object.keys(window.resumeData)[0]; }
      lang = (lang || 'en').toLowerCase();
      const langCode = (lang || 'en').toUpperCase();

      // Owner detection: options.owner > resumeData[lang].owner > resumeData[lang].contact.name/fullname > fallback to 'resume'
      let ownerRaw = options.owner || '';
      try{
        if(!ownerRaw && window.resumeData){
          const rd = window.resumeData[lang] || window.resumeData.en || Object.values(window.resumeData)[0];
          if(rd){
            if(rd.owner && (rd.owner.firstname || rd.owner.lastname)){
              ownerRaw = `${rd.owner.firstname || ''} ${rd.owner.lastname || ''}`.trim();
            } else if(rd.contact && (rd.contact.name || rd.contact.fullname)){
              ownerRaw = rd.contact.name || rd.contact.fullname;
            }
          }
        }
        // fallback to top-level owner if language-specific owner not present
        if(!ownerRaw && window.resumeData && window.resumeData.owner && (window.resumeData.owner.firstname || window.resumeData.owner.lastname)){
          ownerRaw = `${window.resumeData.owner.firstname || ''} ${window.resumeData.owner.lastname || ''}`.trim();
        }
      }catch(e){ ownerRaw = ownerRaw || ''; }

      let ownerSlug = ownerRaw ? String(ownerRaw).toLowerCase().replace(/\s+/g,'-') : '';
      ownerSlug = ownerSlug.replace(/[^a-z0-9-_]/g,'-').replace(/-+/g,'-').replace(/(^-|-$)/g,'');
      if(!ownerSlug) ownerSlug = 'resume';

      const filename = options.filename || `resume-${ownerSlug}-${langCode}-${dateStr}.pdf`;
      const scale = options.scale || 1.2; // rendering scale for canvas
      const format = (options.format || 'a4').toLowerCase();
      const margin = (typeof options.margin === 'number') ? options.margin : 20; // points

      document.dispatchEvent(new CustomEvent('resume:pdf-export-start',{detail:{filename}}));
      this.status = 'generating';

      let savedTheme;
      try{
        await this.ensureLibs();
        // temporarily force light theme for PDF export (better contrast)
        savedTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', 'light');
        // add print-optimized styles for high contrast
        const styleEl = document.createElement('style');
        styleEl.id = 'pdf-export-styles';
        styleEl.textContent = `
          body { background: #ffffff !important; color: #111827 !important; }
          * { background: transparent !important; }
          .section { background: #f9fafb !important; border: 1px solid #d1d5db !important; }
          h2, h3, h4 { color: #111827 !important; }
          a { color: #0ea5a4 !important; }
          .muted { color: #6b7280 !important; }
          .skill-chip { background: #e5e7eb !important; color: #111827 !important; border: 1px solid #d1d5db !important; }
          .controls { display: none !important; }
        `;
        document.head.appendChild(styleEl);

        // get element to export
        const node = document.getElementById('resume-root') || document.body;
        // render to canvas with white background for readability
        const canvas = await window.html2canvas(node, {scale, useCORS:true, logging:false, backgroundColor:'#ffffff'});

        // prepare PDF document and header/footer options
        const headerText = (typeof options.headerText === 'string') ? options.headerText : options.header || '{app} — {owner} — {lang} — {date}';
        const footerText = (typeof options.footerText === 'string') ? options.footerText : options.footer || '{page}/{pages}';
        const headerHeight = (typeof options.headerHeight === 'number') ? options.headerHeight : 28; // pts
        const footerHeight = (typeof options.footerHeight === 'number') ? options.footerHeight : 20; // pts

        const pdfTmp = new this.jsPDF({unit:'pt',format:format});
        const pageWidth = pdfTmp.internal.pageSize.getWidth();
        const pageHeight = pdfTmp.internal.pageSize.getHeight();

        // convert page dimensions to canvas pixels
        const pxPerPt = canvas.width / pageWidth;
        const marginPx = Math.round(margin * pxPerPt);
        const headerPx = Math.round(headerHeight * pxPerPt);
        const footerPx = Math.round(footerHeight * pxPerPt);
        const usablePageHeightPx = Math.floor(pageHeight * pxPerPt) - (marginPx * 2) - headerPx - footerPx;

        // Build a list of breakpoints (section bottoms) in canvas pixels to avoid slicing inside a section.
        const nodeRect = node.getBoundingClientRect();
        const sectionNodes = node.querySelectorAll('.section, section');
        // Also include fine-grained items inside large sections (experience jobs)
        const experienceItems = node.querySelectorAll('#experience-content .job');
        // And include skill category blocks to avoid breaking a category in two
        const skillCategories = node.querySelectorAll('#skills-content .skill-category');
        const breakpoints = [];
        try{
          sectionNodes.forEach(s => {
            const r = s.getBoundingClientRect();
            // compute bottom relative to node top (in DOM px), then convert to canvas px
            const bottomDom = Math.max(0, r.bottom - nodeRect.top);
            const bottomPx = Math.floor(bottomDom * (canvas.width / nodeRect.width));
            if(bottomPx > 0 && bottomPx <= canvas.height) breakpoints.push(bottomPx);
          });
          experienceItems.forEach(s => {
            const r = s.getBoundingClientRect();
            const bottomDom = Math.max(0, r.bottom - nodeRect.top);
            const bottomPx = Math.floor(bottomDom * (canvas.width / nodeRect.width));
            // prefer to break after whole job entries; only include if inside node bounds
            if(bottomPx > 0 && bottomPx <= canvas.height) breakpoints.push(bottomPx);
          });
          // add skill category bottoms so we only break between categories
          skillCategories.forEach(s => {
            const r = s.getBoundingClientRect();
            const bottomDom = Math.max(0, r.bottom - nodeRect.top);
            const bottomPx = Math.floor(bottomDom * (canvas.width / nodeRect.width));
            if(bottomPx > 0 && bottomPx <= canvas.height) breakpoints.push(bottomPx);
          });
        }catch(e){ /* ignore if layout measurement fails */ }
        // sort and dedupe
        breakpoints.sort((a,b)=>a-b);
        for(let i=breakpoints.length-1;i>0;i--){ if(breakpoints[i] === breakpoints[i-1]) breakpoints.splice(i,1); }

        // collect slices first so we can compute total pages for footer
        const slices = [];
        let position = 0;
        // helper: detect if a canvas is visually blank (mostly white)
        function isCanvasBlank(c){
          try{
            const ctx = c.getContext('2d');
            const w = c.width, h = c.height;
            // sample a reasonable grid for larger canvases
            const maxSamples = 200; // aim for at most ~200 samples
            const step = Math.max(1, Math.floor(Math.min(w,h) / Math.sqrt(maxSamples)));
            const data = ctx.getImageData(0,0,w,h).data;
            let total = 0, nonWhite = 0;
            for(let y=0;y<h;y+=step){
              for(let x=0;x<w;x+=step){
                const idx = (y*w + x) * 4;
                const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
                total++;
                // treat pixel as non-white if RGB below threshold and reasonably opaque
                if(a > 10 && (r < 245 || g < 245 || b < 245)) nonWhite++;
              }
            }
            if(total === 0) return true;
            const ratio = nonWhite / total;
            // consider blank if fewer than 2% of samples are non-white
            return ratio < 0.02;
          }catch(e){
            // If we cannot access pixels (CORS), assume not blank to be safe
            return false;
          }
        }

        while(position < canvas.height){
          const maxEnd = Math.min(canvas.height, position + usablePageHeightPx);
          // find the nearest breakpoint <= maxEnd and > position
          let chosenEnd = -1;
          for(let i = breakpoints.length - 1; i >= 0; i--){
            const bp = breakpoints[i];
            if(bp > position && bp <= maxEnd){ chosenEnd = bp; break; }
          }
          if(chosenEnd === -1){ chosenEnd = Math.min(canvas.height, position + usablePageHeightPx); }

          const sliceHeight = Math.max(1, chosenEnd - position);
          // create temporary canvas for slice
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceHeight;
          const ctx = sliceCanvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0,0,sliceCanvas.width,sliceCanvas.height);
          ctx.drawImage(canvas, 0, position, canvas.width, sliceHeight, 0, 0, sliceCanvas.width, sliceCanvas.height);

          // skip visually blank slices (commonly the trailing white area)
          if(!isCanvasBlank(sliceCanvas)){
            const imgData = sliceCanvas.toDataURL('image/png');
            slices.push({imgData, w: sliceCanvas.width, h: sliceCanvas.height});
          }
          position = chosenEnd;
        }

        // create PDF and render slices with header/footer
        const pdf = new this.jsPDF({unit:'pt',format:format});
        const totalPages = Math.max(1, slices.length);
        for(let p=0;p<slices.length;p++){
          const s = slices[p];
          const imgRatio = s.w / s.h;
          const imgWidth = pageWidth - (margin * 2);
          const imgHeight = imgWidth / imgRatio;

          if(p > 0) pdf.addPage();

          // header (centered). Fill placeholders: {app},{owner},{lang},{date}
          if(headerText){
            const appName = options.appName || document.title || 'WebResume';
            const hText = String(headerText).replace(/\{app\}/g, appName).replace(/\{owner\}/g, ownerRaw || '').replace(/\{lang\}/g, langCode).replace(/\{date\}/g, dateStr);
            pdf.setFontSize(10);
            const textWidth = (pdf.getTextWidth) ? pdf.getTextWidth(hText) : (hText.length * 6);
            const hx = Math.max(margin, (pageWidth - textWidth) / 2);
            const hy = margin + 10;
            try{ pdf.text(hText, hx, hy); }catch(e){ /* ignore */ }
          }

          // image below header
          const imgY = margin + headerHeight;
          try{ pdf.addImage(s.imgData, 'PNG', margin, imgY, imgWidth, imgHeight); }catch(e){ console.warn('addImage failed', e); }

          // footer (right aligned) - replace {page} and {pages}
          if(footerText){
            const fText = String(footerText).replace(/\{page\}/g, String(p+1)).replace(/\{pages\}/g, String(totalPages));
            pdf.setFontSize(10);
            const fWidth = (pdf.getTextWidth) ? pdf.getTextWidth(fText) : (fText.length * 6);
            const fx = pageWidth - margin - fWidth;
            const fy = pageHeight - margin - 6;
            try{ pdf.text(fText, fx, fy); }catch(e){ /* ignore */ }
          }
        }

        this.status = 'downloading';
        pdf.save(filename);
        this.status = 'idle';
        document.dispatchEvent(new CustomEvent('resume:pdf-export-complete'));
        // restore original theme and cleanup
        document.documentElement.setAttribute('data-theme', savedTheme || 'light');
        document.getElementById('pdf-export-styles')?.remove();
      }catch(err){
        console.error('PDF export error', err);
        this.status = 'error';
        document.dispatchEvent(new CustomEvent('resume:pdf-export-error',{detail:{error:err}}));
        // restore original theme on error
        if(savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('pdf-export-styles')?.remove();
        // fallback: open print dialog
        try{ window.print() }catch(e){}
        throw err;
      }
    }
  }

  // expose to window
  window.PDFExporter = PDFExporter;
  window.exportPDF = async function(opts){
    const exporter = new PDFExporter();
    return exporter.exportToPDF(opts).catch(()=>{});
  }

})();
