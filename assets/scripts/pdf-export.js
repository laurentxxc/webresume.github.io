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

        // prepare PDF document
        const pdf = new this.jsPDF({unit:'pt',format:format});
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // convert page dimensions to canvas pixels
        const pxPerPt = canvas.width / pageWidth;
        const marginPx = Math.round(margin * pxPerPt);
        const usablePageHeightPx = Math.floor(pageHeight * pxPerPt) - (marginPx * 2);

        let position = 0;
        let pageCount = 0;
        while(position < canvas.height){
          const sliceHeight = Math.min(usablePageHeightPx, canvas.height - position);
          // create temporary canvas for slice
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceHeight;
          const ctx = sliceCanvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0,0,sliceCanvas.width,sliceCanvas.height);
          ctx.drawImage(canvas, 0, position, canvas.width, sliceHeight, 0, 0, sliceCanvas.width, sliceCanvas.height);

          const imgData = sliceCanvas.toDataURL('image/png');
          const imgRatio = sliceCanvas.width / sliceCanvas.height;
          const imgWidth = pageWidth - (margin * 2);
          const imgHeight = imgWidth / imgRatio;

          if(pageCount > 0) pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

          position += sliceHeight;
          pageCount++;
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
