import html2pdf from 'html2pdf.js'

export const generatePDF = async (elementId, filename = 'Briefing-Criacao-de-Site.pdf') => {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('Element not found for PDF generation')
  }

  const opt = {
    margin: 10,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }

  await html2pdf().set(opt).from(element).save()
}
