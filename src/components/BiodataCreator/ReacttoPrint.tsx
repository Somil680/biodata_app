// 'use client'
// import React, { useEffect, useRef, useState } from 'react'

// interface A4PDFPreviewProps {
//   component: React.ReactNode
//   background?: string
//   showDebugInfo?: boolean
//   enableDownload?: boolean
//   filename?: string
// }

// const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({
//   component,
//   background,
//   showDebugInfo = false,
//   enableDownload = true,
//   filename = 'document.pdf',
// }) => {
//   console.log("🚀 ~ filename:", filename)
//   console.log("🚀 ~ enableDownload:", enableDownload)
//   const [pages, setPages] = useState(1)
//   const [scale, setScale] = useState(1)
//   const [windowWidth, setWindowWidth] = useState(0)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const [isReady, setIsReady] = useState(false)

//   // A4 dimensions at 96 DPI
//   const PAGE_WIDTH = 794
//   const PAGE_HEIGHT = 1123
//   const PAGE_PADDING = 48
//   const CONTENT_WIDTH = PAGE_WIDTH - PAGE_PADDING * 2
//   const CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING * 2

//   // Calculate responsive scale based on window width
//   const calculateScale = (width: number): number => {
//     const paddingX = 32
//     const availableWidth = width - paddingX

//     if (width < 450) return Math.min(availableWidth / PAGE_WIDTH, 0.45)
//     else if (width < 768) return Math.min(availableWidth / PAGE_WIDTH, 0.6)
//     else if (width < 1024) return Math.min(availableWidth / PAGE_WIDTH, 0.8)
//     else if (width < 1280) return Math.min(availableWidth / PAGE_WIDTH, 0.9)
//     else return Math.min(availableWidth / PAGE_WIDTH, 1)
//   }

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const newWidth = window.innerWidth
//       setWindowWidth(newWidth)
//       setScale(calculateScale(newWidth))
//     }

//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // Calculate pages needed
//   useEffect(() => {
//     if (contentRef.current) {
//       const timer = setTimeout(() => {
//         if (contentRef.current) {
//           const totalHeight = contentRef.current.scrollHeight
//           const calculatedPages = Math.ceil(totalHeight / CONTENT_HEIGHT)
//           setPages(calculatedPages)
//           setIsReady(true)
//         }
//       }, 100)

//       return () => clearTimeout(timer)
//     }
//   }, [component, CONTENT_HEIGHT])

//   // Browser print download function
//   // const handlePrintDownload = () => {
//   //   // Save current title
//   //   const originalTitle = document.title

//   //   // Set document title to filename (without .pdf extension)
//   //   document.title = filename.replace('.pdf', '')

//   //   // Trigger print dialog
//   //   window.print()

//   //   // Restore original title
//   //   setTimeout(() => {
//   //     document.title = originalTitle
//   //   }, 100)
//   // }

//   // HTML2Canvas + jsPDF download function (alternative approach)
//   // const handleCanvasDownload = async () => {
//   //   try {
//   //     // Dynamically import libraries
//   //     const html2canvas = (await import('html2canvas')).default
//   //     const jsPDF = (await import('jspdf')).jsPDF

//   //     const printContainer = document.querySelector('.print-target')
//   //     if (!printContainer) return

//   //     // Create canvas from the print container
//   //     const canvas = await html2canvas(printContainer as HTMLElement, {
//   //       scale: 2, // Higher resolution
//   //       useCORS: true,
//   //       allowTaint: true,
//   //       backgroundColor: '#ffffff',
//   //       height: pages * PAGE_HEIGHT,
//   //       width: PAGE_WIDTH,
//   //     })

//   //     // Create PDF
//   //     const pdf = new jsPDF({
//   //       orientation: 'portrait',
//   //       unit: 'px',
//   //       format: [PAGE_WIDTH, PAGE_HEIGHT],
//   //     })

//   //     const imgData = canvas.toDataURL('image/png')
//   //     const imgWidth = PAGE_WIDTH
//   //     const imgHeight = (canvas.height * imgWidth) / canvas.width

//   //     let heightLeft = imgHeight
//   //     let position = 0

//   //     // Add first page
//   //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
//   //     heightLeft -= PAGE_HEIGHT

//   //     // Add additional pages if needed
//   //     while (heightLeft >= 0) {
//   //       position = heightLeft - imgHeight
//   //       pdf.addPage()
//   //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
//   //       heightLeft -= PAGE_HEIGHT
//   //     }

//   //     pdf.save(filename)
//   //   } catch (error) {
//   //     console.error('Error generating PDF:', error)
//   //     // Fallback to print
//   //     handlePrintDownload()
//   //   }
//   // }

//   const scaledHeight = PAGE_HEIGHT * scale
//   const heightDifference = PAGE_HEIGHT - scaledHeight

//   return (
//     <>
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         @media print {
//           @page {
//             size: A4;
//             margin: 0;
//           }
          
//           body {
//             margin: 0 !important;
//             padding: 0 !important;
//             background: white !important;
//           }
          
//           /* Hide everything except the pages */
//           body > * {
//             display: none !important;
//           }
          
//           /* Show only the pages container */
//           .print-target,
//           .print-target * {
//             display: block !important;
//             visibility: visible !important;
//           }
          
//           .no-print {
//             display: none !important;
//           }
          
//           .pdf-page {
//             width: 210mm !important;
//             height: 297mm !important;
//             margin: 0 !important;
//             padding: 48px !important;
//             page-break-after: always;
//             page-break-inside: avoid;
//             transform: none !important;
//             box-shadow: none !important;
//             border: none !important;
//             position: relative !important;
//             background: white !important;
//           }
          
//           .pdf-page:last-child {
//             page-break-after: auto;
//           }
          
//           /* Fix content positioning for print */
//           .pdf-page > div {
//             transform: none !important;
//           }
//         }
//       `,
//         }}
//       />
//       <button className=' bg-blue-600 w-20 h-4                 '  >Download Button</button>
//       <div className="">
//         {/* Download Button */}
//         {/* {enableDownload && (
//           <div className="fixed top-4 right-4 z-50 no-print">
//             <div className="flex gap-2">
//               <button
//                 onClick={handlePrintDownload}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
//                 title="Print/Download as PDF"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 Download PDF
//               </button>

//               <button
//                 onClick={handleCanvasDownload}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
//                 title="Generate PDF using Canvas"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                   />
//                 </svg>
//                 Canvas PDF
//               </button>
//             </div>
//           </div>
//         )} */}

//         {/* Hidden measurement container */}
//         <div
//           ref={contentRef}
//           className="fixed opacity-1 pointer-events-none no-print"
//           style={{
//             width: `${CONTENT_WIDTH}px`,
//             left: '-9999px',
//             top: 0,
//           }}
//         >
//           {component}
//         </div>

//         {/* Main content */}
//         <div className="py-4 px-4 print-container print-target ">
//           <div className="flex flex-col items-center gap-4 ">
//             {isReady &&
//               [...Array(pages)].map((_, pageIndex) => (
//                 <div
//                   key={pageIndex}
//                   className="relative"
//                   style={{
//                     marginBottom:
//                       pageIndex < pages - 1 ? `-${heightDifference}px` : '0',
//                   }}
//                 >
//                   <div
//                     className="pdf-page relative bg-yellow-500 shadow-xl transition-transform duration-300"
//                     style={{
//                       width: `${PAGE_WIDTH}px`,
//                       height: `${PAGE_HEIGHT}px`,
//                       transform: `scale(${scale})`,
//                       transformOrigin: 'top center',
//                     }}
//                   >
//                     {/* Background */}
//                     {background && (
//                       <div
//                         className="absolute inset-0 pointer-events-none"
//                         style={{
//                           backgroundImage: `url(${background})`,
//                           backgroundSize: 'cover',
//                           backgroundPosition: 'center',
//                           backgroundRepeat: 'no-repeat',
//                         }}
//                       />
//                     )}

//                     {/* Content */}
//                     <div
//                       className="absolute overflow-hidden"
//                       style={{
//                         top: `${PAGE_PADDING}px`,
//                         left: `${PAGE_PADDING}px`,
//                         right: `${PAGE_PADDING}px`,
//                         bottom: `${PAGE_PADDING}px`,
//                         width: `${CONTENT_WIDTH}px`,
//                         height: `${CONTENT_HEIGHT}px`,
//                       }}
//                     >
//                       <div
//                         className="absolute"
//                         style={{
//                           top: `-${pageIndex * CONTENT_HEIGHT}px`,
//                           left: 0,
//                           width: `${CONTENT_WIDTH}px`,
//                         }}
//                       >
//                         {component}
//                       </div>
//                     </div>

//                     {/* Page number */}
//                     <div className="absolute bottom-4 right-4 text-xs text-gray-400 no-print">
//                       Page {pageIndex + 1} of {pages}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Debug info */}
//         {showDebugInfo && (
//           <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs no-print">
//             Width: {windowWidth}px | Scale: {(scale * 100).toFixed(0)}% | Pages:{' '}
//             {pages}
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default A4PDFPreview

'use client'
import React, { useEffect, useRef, useState } from 'react'

interface A4PDFPreviewProps {
  component: React.ReactNode
  background?: string
  showDebugInfo?: boolean
  enableDownload?: boolean
  filename?: string
}

const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({
  component,
  background,
  showDebugInfo = false,
  enableDownload = true,
  filename = 'document.pdf',
}) => {

  const [pages, setPages] = useState(1)
  const [scale, setScale] = useState(1)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null) // New ref for main content

  const [isReady, setIsReady] = useState(false)
  // A4 dimensions at 96 DPI
  const PAGE_WIDTH = 794
  const PAGE_HEIGHT = 1123
  const PAGE_PADDING = 48
  const CONTENT_WIDTH = PAGE_WIDTH - PAGE_PADDING * 2
  const CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING * 2

  // Calculate responsive scale based on window width
  const calculateScale = (width: number): number => {
    const paddingX = 32
    const availableWidth = width - paddingX

    if (width < 450) return Math.min(availableWidth / PAGE_WIDTH, 0.45)
    else if (width < 768) return Math.min(availableWidth / PAGE_WIDTH, 0.6)
    else if (width < 1024) return Math.min(availableWidth / PAGE_WIDTH, 0.8)
    else if (width < 1280) return Math.min(availableWidth / PAGE_WIDTH, 0.9)
    else return Math.min(availableWidth / PAGE_WIDTH, 1)
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      setWindowWidth(newWidth)
      setScale(calculateScale(newWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate pages needed
  useEffect(() => {
    if (contentRef.current) {
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const totalHeight = contentRef.current.scrollHeight
          const calculatedPages = Math.ceil(totalHeight / CONTENT_HEIGHT)
          setPages(calculatedPages)
          setIsReady(true)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [component, CONTENT_HEIGHT])

  // HTML2Canvas + jsPDF download function
  const handleCanvasDownload = async () => {
    if (!mainContentRef.current || !isReady) return

    try {
      setIsDownloading(true)

      // Dynamically import libraries
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).jsPDF

      // Temporarily reset transform to capture at full scale
      const originalTransform = mainContentRef.current.style.transform
      console.log("🚀 ~ handleCanvasDownload ~ originalTransform:", originalTransform)
      const pageElements = mainContentRef.current.querySelectorAll('.pdf-page')
      console.log("🚀 ~ handleCanvasDownload ~ pageElements0000000000000:", pageElements)

      // Store original transforms and reset them
      const originalTransforms: string[] = []
      pageElements.forEach((element, index) => {
        const htmlElement = element as HTMLElement
        originalTransforms[index] = htmlElement.style.transform
        htmlElement.style.transform = 'scale(1)'
      })

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [PAGE_WIDTH, PAGE_HEIGHT],
      })

      // Capture each page separately for better quality
      for (let pageIndex = 0; pageIndex < pages; pageIndex++) {
        const pageElement = pageElements[pageIndex] as HTMLElement
        console.log("🚀 ~ 0 handleCanvasDownload ~ pageElement:", pageElement)

        if (pageElement) {
          console.log("🚀 ~ 1 handleCanvasDownload ~ pageElement:", pageElement)
          // Create canvas from the specific page
   
          const canvas = await html2canvas(pageElement, {
            scale: 2, // Higher resolution for better quality
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            logging: false,
            onclone: (clonedDoc) => {
              // Ensure the cloned document has proper styling
              const clonedElement = clonedDoc.querySelector('.pdf-page')
              if (clonedElement) {
                ;(clonedElement as HTMLElement).style.transform = 'scale(1)'
              }
            },
          })
          console.log("🚀 ~ 2  handleCanvasDownload ~ canvas:", canvas)

          const imgData = canvas.toDataURL('image/png', 1.0)

          // Add page to PDF (add new page for all except first)
          if (pageIndex > 0) {
            pdf.addPage()
          }

          // Add image to PDF, fitting to page size
          pdf.addImage(imgData, 'PNG', 0, 0, PAGE_WIDTH, PAGE_HEIGHT)
        }
      }

      // Restore original transforms
      pageElements.forEach((element, index) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.transform = originalTransforms[index]
      })

      // Save the PDF
      pdf.save(filename)
      console.log(
        '🚀 ~ handleCanvasDownload ~ pageElements0000000000000:',
        pageElements
      )

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const scaledHeight = PAGE_HEIGHT * scale
  const heightDifference = PAGE_HEIGHT - scaledHeight

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          /* Hide everything except the pages */
          body > * {
            display: none !important;
          }
          
          /* Show only the pages container */
          .print-target,
          .print-target * {
            display: block !important;
            visibility: visible !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .pdf-page {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 48px !important;
            page-break-after: always;
            page-break-inside: avoid;
            transform: none !important;
            box-shadow: none !important;
            border: none !important;
            position: relative !important;
            background: white !important;
          }
          
          .pdf-page:last-child {
            page-break-after: auto;
          }
          
          /* Fix content positioning for print */
          .pdf-page > div {
            transform: none !important;
          }
        }
      `,
        }}
      />

      <div className="">
        {/* Download Button */}
    

        {/* Hidden measurement container */}
        <div
          ref={contentRef}
          className="fixed opacity-0 pointer-events-none no-print"
          style={{
            width: `${CONTENT_WIDTH}px`,
            left: '-9999px',
            top: 0,
          }}
        >
          {component}
        </div>

        {/* Main content */}
        <div
          ref={mainContentRef}
          className="py-4 px-4 print-container print-target"
        >
          <div className="flex flex-col items-center gap-4">
            {isReady &&
              [...Array(pages)].map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="relative"
                  style={{
                    marginBottom:
                      pageIndex < pages - 1 ? `-${heightDifference}px` : '0',
                  }}
                >
                  <div
                    className="pdf-page relative bg-white shadow-xl transition-transform duration-300"
                    style={{
                      width: `${PAGE_WIDTH}px`,
                      height: `${PAGE_HEIGHT}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }}
                  >
                    {/* Background */}
                    {background && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `url(${background})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    )}

                    {/* Content */}
                    <div
                      className="absolute overflow-hidden"
                      style={{
                        top: `${PAGE_PADDING}px`,
                        left: `${PAGE_PADDING}px`,
                        right: `${PAGE_PADDING}px`,
                        bottom: `${PAGE_PADDING}px`,
                        width: `${CONTENT_WIDTH}px`,
                        height: `${CONTENT_HEIGHT}px`,
                      }}
                    >
                      <div
                        className="absolute"
                        style={{
                          top: `-${pageIndex * CONTENT_HEIGHT}px`,
                          left: 0,
                          width: `${CONTENT_WIDTH}px`,
                        }}
                      >
                        {component}
                      </div>
                    </div>

                    {/* Page number */}
                    <div className="absolute bottom-4 right-4 text-xs text-gray-400 no-print">
                      Page {pageIndex + 1} of {pages}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Debug info */}
        {showDebugInfo && (
          <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs no-print">
            Width: {windowWidth}px | Scale: {(scale * 100).toFixed(0)}% | Pages:{' '}
            {pages}
          </div>
        )}
      </div>
    </>
  )
}

export default A4PDFPreview