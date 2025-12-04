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
      const filename = options.filename || `resume-${(new Date()).toISOString().slice(0,10)}.pdf`;
      const scale = options.scale || 1.4;
      const format = options.format || 'A4';

      document.dispatchEvent(new CustomEvent('resume:pdf-export-start',{detail:{filename}}));
      this.status = 'generating';

      try{
        await this.ensureLibs();
        // temporarily force light theme for PDF export (better contrast)
        const savedTheme = document.documentElement.getAttribute('data-theme');
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
        const imgData = canvas.toDataURL('image/png');

        // A4 size in points (jsPDF uses pt by default)
        const pdf = new this.jsPDF({unit:'pt',format:format.toLowerCase()});
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // calculate image dims to fit page width while preserving ratio
        const imgProps = {width: canvas.width, height: canvas.height};
        const ratio = imgProps.width / imgProps.height;
        const imgWidth = pageWidth - 40; // margins
        const imgHeight = imgWidth / ratio;

        pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
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
        document.documentElement.setAttribute('data-theme', savedTheme || 'light');
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
