// // components/PDFDownloader.tsx
// 'use client'

// import React, { useRef } from 'react'
// import { useReactToPrint } from 'react-to-print'
// import A4PDFPreview from './ReacttoPrint'
// import Template1PDF from '../templates/Template1PDF'
// import { StaticImageData } from 'next/image'
// import bg from '../../../public/images/template-previews/bg.png'

// import { Biodata } from '@/lib/type'

// interface PDFDownloaderProps {
//   biodata: Biodata
// }

// const PDFDownloader: React.FC<PDFDownloaderProps> = ({ biodata }) => {
//   const printRef = useRef<HTMLDivElement>(null)

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: 'Biodata-PDF',
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 0;
//       }
//       @media print {
//         body {
//           -webkit-print-color-adjust: exact;
//         }
//       }
//     `,
//   } as Parameters<typeof useReactToPrint>[0])

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <button
//         onClick={handlePrint}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Download as PDF
//       </button>

//       {/* Hidden printable content */}
//       <div style={{ display: 'none' }}>
//         <div ref={printRef}>
//           <A4PDFPreview
//             component={<Template1PDF biodata={biodata} />}
//             background={
//               typeof biodata.settings.background === 'string'
//                 ? biodata.settings.background
//                 : (biodata.settings.background as unknown as StaticImageData)
//                     ?.src ||
//                   (typeof bg === 'string' ? bg : (bg as StaticImageData)?.src)
//             }
//           />
//         </div>
//       </div>

//       {/* Visible preview (optional) */}
//       <A4PDFPreview
//         component={<Template1PDF biodata={biodata} />}
//         background={
//           typeof biodata.settings.background === 'string'
//             ? biodata.settings.background
//             : (biodata.settings.background as unknown as StaticImageData)
//                 ?.src ||
//               (typeof bg === 'string' ? bg : (bg as StaticImageData)?.src)
//         }
//         showDebugInfo
//       />
//     </div>
//   )
// }

// export default PDFDownloader
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const generatePDF = async (elementToPrintId: string) => {
  const element = document.getElementById(elementToPrintId)
  if (!element) {
    throw new Error(`Element with id ${elementToPrintId} not found`)
  }
  const canvas = await html2canvas(element, { scale: 2 })
  const data = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [129, 70],
  })
  const imgProperties = pdf.getImageProperties(data)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  console.log("🚀 ~ generatePDF ~ pdfWidth:", pdfWidth)
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

  pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('print.pdf')
}