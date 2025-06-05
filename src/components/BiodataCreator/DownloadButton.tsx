// 'use client'
// import { useBiodata } from '@/context/BiodataContext'
// // import jsPDF from 'jspdf'
// import React from 'react'
// // import { handleSimpleDownload } from './BiodataPDFcomponent'

// interface A4DownloadProps {
//   component: React.ReactNode
//   filename?: string
//   background?: string
//   className?: string
//   disabled?: boolean
//   showPageNumbers?: boolean
// }

// const A4Download: React.FC<A4DownloadProps> = ({
// //   component,
// //   filename = 'document.pdf',
// //   background,
// //   className = '',
// //   disabled = false,
// //   showPageNumbers = true,
// }) => {
//    const { biodata } = useBiodata()
 
// //     const handleDownload = () => {
// //         const doc = new jsPDF()
// //         doc.setFontSize(16)
        
// //         doc.text(<Template1PDF biodata={biodata} />, 10, 10)
// //          doc.addPage( )
// //         doc.save('a4.pdf')
//     // }
//     const handleDownload = () => {
//       handleSimpleDownload(biodata , )
//     }
//   return (
//     <>
//       {/* Hidden measurement container */}
   

//       {/* Hidden PDF generation container */}
     

//       {/* Download Button - FIXED */}
//       <button
//         onClick={handleDownload}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         type="button"
//       >
//         Download
//       </button>
//     </>
//   )
// }

// export default A4Download
