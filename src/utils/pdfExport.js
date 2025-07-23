import html2pdf from "html2pdf.js";


export function exportToPDF() {
  const element = document.getElementById("export-area") || document.body;
  const opt = {
    margin: 0,
    filename: "tracker.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0, // avoid slicing off content
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().from(element).set(opt).save();
}
