// // // // components/PdfPreview.tsx
// // // "use client";

// // // import React, { useRef } from "react";
// // // import { useReactToPrint } from "react-to-print";

// // // type PdfPreviewProps = {
// // //   children: React.ReactNode;
// // //   background?: string; // Optional background image URL
// // // };

// // // const PdfPreview = ({ children, background }: PdfPreviewProps) => {
// // //   const printRef = useRef<HTMLDivElement>(null);

// // //   const handlePrint = useReactToPrint({
// // //     // content: () => printRef.current,
// // //     documentTitle: "PDF-Preview",
// // //     pageStyle: `
// // //       @page {
// // //         size: A4;
// // //         margin: 20mm;
// // //       }
// // //       @media print {
// // //         body {
// // //           -webkit-print-color-adjust: exact;
// // //         }
// // //       }
// // //     `,
// // //   });

// // //   return (
// // //     <div className="flex flex-col items-center p-4">
// // //       <button
// // //         onClick={handlePrint}
// // //         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// // //       >
// // //         Print or Save as PDF
// // //       </button>

// // //       <div
// // //         ref={printRef}
// // //         className="w-[210mm] h-[297mm] bg-white shadow-md p-10 overflow-hidden"
// // //         style={{
// // //           backgroundImage: background ? `url(${background})` : undefined,
// // //           backgroundSize: "cover",
// // //           backgroundRepeat: "no-repeat",
// // //         }}
// // //       >
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PdfPreview;
// // // components/A4Preview.tsx
// // import React, { ReactNode } from 'react';

// // interface A4PreviewProps {
// //   /** The React component to be previewed (e.g., <MyDocument />) */
// //   component: ReactNode;
// //   /** Optional: URL or imported image path for the page background. */
// //   background?: string;
// // }

// // /**
// //  * A React component to preview any passed React component in a scrollable A4-sized PDF-like layout.
// //  * It simulates the appearance of a printed A4 document, including margins, padding,
// //  * and a repeating background image for each virtual page.
// //  *
// //  * Note: This component provides a visual preview. True pagination and page break enforcement
// //  * as seen in PDF rendering (especially for arbitrary content dynamically splitting across
// //  * fixed-height visual pages) are complex and typically handled by browser print engines or
// //  * dedicated PDF libraries. This component uses a continuous flow approach with a repeating
// //  * A4 page background. CSS properties like `break-inside-avoid-page` applied within the
// //  * `component` prop will be respected by the browser's rendering flow and actual print output.
// //  */
// // const A4Preview: React.FC<A4PreviewProps> = ({ component, background }) => {
// //   // A4 dimensions at 96 DPI: 794px x 1123px
// //   const a4WidthClass = 'w-[794px]';
// //   const a4HeightPx = 1123; // Used for background-size calculation and min-height

// //   // Suggested padding: 32px
// //   const pagePaddingClass = 'p-[32px]'; // Corresponds to p-8 in Tailwind (8 * 4px = 32px)

// //   // Inline styles for the container that will have the repeating page background.
// //   // This is necessary because background image URL and its size are dynamic.
// //   const pagesContainerStyle: React.CSSProperties = {
// //     minHeight: `${a4HeightPx}px`, // Ensure at least one "page" background is visible
// //     backgroundColor: 'white',    // Default page color if no background image
// //   };

// //   if (background) {
// //     pagesContainerStyle.backgroundImage = `url(${background})`;
// //     pagesContainerStyle.backgroundRepeat = 'repeat-y'; // Repeat background vertically
// //     // Size the background image to fit one A4 page dimension.
// //     // It will cover 794px width and 1123px height, then repeat.
// //     pagesContainerStyle.backgroundSize = `794px ${a4HeightPx}px`;
// //   }

// //   return (
// //     <div className="flex justify-center items-start p-4 sm:p-8 bg-gray-300 min-h-screen overflow-y-auto">
// //       {/* This outer div centers the A4 preview and provides scrolling for multiple pages */}
// //       <div
// //         className={`${a4WidthClass} shadow-xl`} // Applies A4 width and a shadow for depth
// //         style={pagesContainerStyle}
// //       >
// //         {/*
// //           This inner div applies the consistent padding for the content area on each "page".
// //           The content itself will flow continuously. The `pagesContainerStyle` above provides
// //           the repeating visual cue of separate pages.
// //         */}
// //         <div className={`${pagePaddingClass} printable-content-area`}>
// //           {/*
// //             The `component` prop is rendered here.
// //             - Typography and line spacing will be determined by the styles within `component`.
// //             - For elements within `component` that you wish to prevent from breaking across
// //               visual page boundaries (especially if printing this preview), use Tailwind's
// //               `break-inside-avoid-page` utility class on those elements.
// //             - Similarly, `break-after-page` or `break-before-page` can be used within
// //               `component` to suggest page breaks for actual printing. These will not
// //               force visual breaks in this screen preview beyond the natural flow.
// //           */}
// //           {component}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default A4Preview;
// // components/A4Preview.tsx
// import React, { ReactNode, CSSProperties } from 'react';

// interface A4PreviewProps {
//   /** The React component to be previewed (e.g., <MyDocument />) */
//   component: ReactNode;
//   /** Optional: URL or imported image path for the page background. */
//   background?: string;
// }

// const A4Preview: React.FC<A4PreviewProps> = ({ component, background }) => {
//   const a4WidthClass = 'w-[794px]'; // Tailwind class for A4 width
//   const a4WidthPx = 794;           // A4 width in pixels
//   const a4HeightPx = 1123;         // A4 height in pixels
//   const pagePaddingClass = 'p-8';    // Tailwind p-8 for 32px padding

//   const pagesContainerStyle: CSSProperties = {
//     backgroundColor: 'white',    // Default page color
//     minHeight: `${a4HeightPx}px`, // Ensure at least one "page" background is visible
//   };

//   if (background) {
//     pagesContainerStyle.backgroundImage = `url(${background})`;
//     pagesContainerStyle.backgroundRepeat = 'repeat-y';
//     // Directly use pixel values for backgroundSize for robustness
//     pagesContainerStyle.backgroundSize = `${a4WidthPx}px ${a4HeightPx}px`;
//     pagesContainerStyle.backgroundPosition = 'top left';
//   }

//   return (
//     <div className="flex justify-center items-start p-4 sm:p-8 bg-gray-300 min-h-screen overflow-y-auto">
//       <div
//         className={`${a4WidthClass} shadow-xl`}
//         style={pagesContainerStyle}
//       >
//         <div className={`${pagePaddingClass} printable-content-area`}>
//           {component}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default A4Preview;


// import React, { useEffect, useRef, useState } from 'react';

// interface A4PDFPreviewProps {
//   component: React.ReactNode;
//   background?: string;
// }

// const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({ component, background }) => {
//   const [pages, setPages] = useState(1);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [isReady, setIsReady] = useState(false);
  
//   // A4 dimensions at 96 DPI
//   const PAGE_WIDTH = 794;
//   const PAGE_HEIGHT = 1123;
//   const PAGE_PADDING = 48; // Increased padding for better margins
//   const CONTENT_WIDTH = PAGE_WIDTH - (PAGE_PADDING * 2);
//   const CONTENT_HEIGHT = PAGE_HEIGHT - (PAGE_PADDING * 2);
  
//   useEffect(() => {
//     if (contentRef.current) {
//       // Wait for content to fully render
//       setTimeout(() => {
//         if (contentRef.current) {
//           const totalHeight = contentRef.current.scrollHeight;
//           const calculatedPages = Math.ceil(totalHeight / CONTENT_HEIGHT);
//           setPages(calculatedPages);
//           setIsReady(true);
//         }
//       }, 100);
//     }
//   }, [component, CONTENT_HEIGHT]);
//     const {innerWidth} = window
//     console.log("🚀 ~ innerWidth:", innerWidth)
//   return (
//     <div className="min-h-screen overflow-auto  ">
//       {/* Hidden container to measure actual content height */}
//       <div
//         ref={contentRef}
//         className="fixed opacity-0 pointer-events-none "
//         style={{
//           width: `${CONTENT_WIDTH}px`,
//           left: '-9999px',
//           top: 0,
//         }}
//       >
//         {component}
//       </div>

//       {/* Main preview container */}
//       <div className=" flex flex-col items-center gap-4">
//         {/* Render each A4 page */}
//         {isReady &&
//           [...Array(pages)].map((_, pageIndex) => (
//             <div
//               key={pageIndex}
//               className="relative bg-white shadow-xl "
//               style={{
//                 width: `${PAGE_WIDTH}px`,
//                 height: `${PAGE_HEIGHT}px`,
//                 transform: `scale(${innerWidth < 450 ? 0.4 : 1})`, // Scale to fit A4 size
//                 transformOrigin: 'top center',
//               }}
//             >
//               {/* Background image layer */}
//               {background && (
//                 <div
//                   className="absolute inset-0 pointer-events-none"
//                   style={{
//                     backgroundImage: `url(${background})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     backgroundRepeat: 'no-repeat',
//                   }}
//                 />
//               )}

//               {/* Content container with proper clipping */}
//               <div
//                 className="absolute overflow-hidden"
//                 style={{
//                   top: `${PAGE_PADDING}px`,
//                   left: `${PAGE_PADDING}px`,
//                   right: `${PAGE_PADDING}px`,
//                   bottom: `${PAGE_PADDING}px`,
//                   width: `${CONTENT_WIDTH}px`,
//                   height: `${CONTENT_HEIGHT}px`,
//                 }}
//               >
//                 {/* Content positioned for this page */}
//                 <div
//                   className="absolute"
//                   style={{
//                     top: `-${pageIndex * CONTENT_HEIGHT}px`,
//                     left: 0,
//                     width: `${CONTENT_WIDTH}px`,
//                   }}
//                 >
//                   {component}
//                 </div>
//               </div>

//               {/* Page header */}
//               {/* <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-xs text-gray-400">
//               <span>Document Title</span>
//               <span>{new Date().toLocaleDateString()}</span>
//             </div> */}

//               {/* Page footer with number */}
//               {/* <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-xs text-gray-400">
//               <span>© 2024 Company Name Inc.</span>
//               <span>Page {pageIndex + 1} of {pages}</span>
//             </div> */}

//               {/* Page border */}
//               {/* <div className="absolute inset-0 border border-gray-300 pointer-events-none rounded-sm"></div> */}
//             </div>
//           ))}
//       </div>
//     </div>
//   )
// };

// import React, { useEffect, useRef, useState } from 'react'

// interface A4PDFPreviewProps {
//   component: React.ReactNode
//   background?: string
//   showDebugInfo?: boolean
// }

// const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({
//   component,
//   background,
//   showDebugInfo = false,
// }) => {
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
//     // Add some padding to prevent edge touching
//     const paddingX = 32 // 16px on each side
//     const availableWidth = width - paddingX

//     // Define breakpoints and their scales
//     if (width < 450) {
//       // Mobile portrait
//       return Math.min(availableWidth / PAGE_WIDTH, 0.45)
//     } else if (width < 768) {
//       // Mobile landscape / small tablet
//       return Math.min(availableWidth / PAGE_WIDTH, 0.6)
//     } else if (width < 1024) {
//       // Tablet
//       return Math.min(availableWidth / PAGE_WIDTH, 0.8)
//     } else if (width < 1280) {
//       // Small desktop
//       return Math.min(availableWidth / PAGE_WIDTH, 0.9)
//     } else {
//       // Large desktop - cap at 1 (100%)
//       return Math.min(availableWidth / PAGE_WIDTH, 1)
//     }
//   }

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const newWidth = window.innerWidth
//       setWindowWidth(newWidth)
//       setScale(calculateScale(newWidth))
//     }

//     // Initial setup
//     handleResize()

//     // Add event listener
//     window.addEventListener('resize', handleResize)

//     // Cleanup
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // Calculate pages needed
//   useEffect(() => {
//     if (contentRef.current) {
//       // Wait for content to fully render
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

//   // Calculate the actual height after scaling
//   const scaledHeight = PAGE_HEIGHT * scale
//   const heightDifference = PAGE_HEIGHT - scaledHeight

//   return (
//     <div className="min-h-screen  ">
//       {/* Hidden container to measure actual content height */}
//       <div
//         ref={contentRef}
//         className="fixed opacity-0 pointer-events-none"
//         style={{
//           width: `${CONTENT_WIDTH}px`,
//           left: '-9999px',
//           top: 0,
//         }}
//       >
//         {component}
//       </div>

//       {/* Main preview container */}
//       <div className="py-4 px-4">
//         <div className="flex flex-col items-center gap-4">
//           {/* Render each A4 page */}
//           {isReady &&
//             [...Array(pages)].map((_, pageIndex) => (
//               <div
//                 key={pageIndex}
//                 className="relative h-fit"
//                 style={{
//                   marginBottom:
//                     pageIndex < pages - 1 ? `-${heightDifference}px` : '0',
//                 }}
//               >
//                 <div
//                   className="relative bg-white shadow-2xl transition-transform duration-300"
//                   style={{
//                     width: `${PAGE_WIDTH}px`,
//                     height: `${PAGE_HEIGHT}px`,
//                     transform: `scale(${scale})`,
//                     transformOrigin: 'top center',
//                   }}
//                 >
//                   {/* Background image layer */}
//                   {background && (
//                     <div
//                       className="absolute inset-0 pointer-events-none"
//                       style={{
//                         backgroundImage: `url(${background})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         backgroundRepeat: 'no-repeat',
//                       }}
//                     />
//                   )}

//                   {/* Content container with proper clipping */}
//                   <div
//                     className="absolute overflow-hidden"
//                     style={{
//                       top: `${PAGE_PADDING}px`,
//                       left: `${PAGE_PADDING}px`,
//                       right: `${PAGE_PADDING}px`,
//                       bottom: `${PAGE_PADDING}px`,
//                       width: `${CONTENT_WIDTH}px`,
//                       height: `${CONTENT_HEIGHT}px`,
//                     }}
//                   >
//                     {/* Content positioned for this page */}
//                     <div
//                       className="absolute"
//                       style={{
//                         top: `-${pageIndex * CONTENT_HEIGHT}px`,
//                         left: 0,
//                         width: `${CONTENT_WIDTH}px`,
//                       }}
//                     >
//                       {component}
//                     </div>
//                   </div>

//                   {/* Page number (optional) */}
//                   <div className="absolute bottom-4 right-4 text-xs text-gray-400">
//                     Page {pageIndex + 1} of {pages}
//                   </div>

//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Scale indicator (optional - controlled by showDebugInfo prop) */}
//       {showDebugInfo && (
//         <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">
//           Width: {windowWidth}px | Scale: {(scale * 100).toFixed(0)}%
//         </div>
//       )}
//     </div>
//   )
// }

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
//   const [pages, setPages] = useState(1)
//   const [scale, setScale] = useState(1)
//   const [windowWidth, setWindowWidth] = useState(0)
//   const [isDownloading, setIsDownloading] = useState(false)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const pdfContainerRef = useRef<HTMLDivElement>(null)
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

//   // ACTUAL DOWNLOAD FUNCTION - Downloads as HTML file that looks like PDF
//   const handleDownload = async () => {
//     setIsDownloading(true)

//     try {
//       // Get all pages
//       const pageElements = document.querySelectorAll('[data-pdf-page]')

//       // Create HTML document with A4 styling
//       let htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>${filename.replace('.pdf', '')}</title>
//   <style>
//     @page { size: A4; margin: 0; }
//     body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
//     .page {
//       width: 210mm;
//       height: 297mm;
//       padding: ${PAGE_PADDING}px;
//       page-break-after: always;
//       position: relative;
//       background: white;
//       box-sizing: border-box;
//     }
//     .page:last-child { page-break-after: auto; }
//     .content { width: 100%; height: 100%; overflow: hidden; position: relative; }
//     @media print {
//       body { margin: 0; }
//       .page { margin: 0; box-shadow: none; }
//     }
//   </style>
// </head>
// <body>
// `

//       // Add each page content
//       pageElements.forEach((pageEl) => {
//         const contentEl = pageEl.querySelector('.absolute > .absolute')
//         if (contentEl) {
//           htmlContent += `
//   <div class="page">
//     <div class="content">
//       ${contentEl.innerHTML}
//     </div>
//   </div>
// `
//         }
//       })

//       htmlContent += `
// </body>
// </html>`

//       // Create blob and download
//       const blob = new Blob([htmlContent], { type: 'text/html' })
//       const url = URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = filename.replace('.pdf', '.html')
//       document.body.appendChild(a)
//       a.click()
//       document.body.removeChild(a)
//       URL.revokeObjectURL(url)

//       // Show message
//       setTimeout(() => {
//         alert(
//           'Downloaded as HTML file. Open it and print/save as PDF for best results.'
//         )
//       }, 500)
//     } catch (error) {
//       console.error('Download error:', error)
//       alert('Download failed. Please try again.')
//     } finally {
//       setIsDownloading(false)
//     }
//   }

//   const scaledHeight = PAGE_HEIGHT * scale
//   const heightDifference = PAGE_HEIGHT - scaledHeight

//   return (
//     <div className="min-h-screen overflow-auto bg-gray-100">
//       {/* Download button */}
//       {enableDownload && (
//         <div className="fixed top-4 right-4 z-50">
//           <button
//             onClick={handleDownload}
//             disabled={isDownloading}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center"
//           >
//             {isDownloading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Downloading...
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-5 h-5 mr-2"
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
//                 Download
//               </>
//             )}
//           </button>
//         </div>
//       )}

//       {/* Hidden container to measure content */}
//       <div
//         ref={contentRef}
//         className="fixed opacity-0 pointer-events-none"
//         style={{
//           width: `${CONTENT_WIDTH}px`,
//           left: '-9999px',
//           top: 0,
//         }}
//       >
//         {component}
//       </div>

//       {/* Main preview container */}
//       <div className="py-4 px-4">
//         <div ref={pdfContainerRef} className="flex flex-col items-center gap-4">
//           {isReady &&
//             [...Array(pages)].map((_, pageIndex) => (
//               <div
//                 key={pageIndex}
//                 className="relative"
//                 style={{
//                   marginBottom:
//                     pageIndex < pages - 1 ? `-${heightDifference}px` : '0',
//                 }}
//               >
//                 <div
//                   data-pdf-page={pageIndex}
//                   className="relative bg-white shadow-2xl transition-transform duration-300"
//                   style={{
//                     width: `${PAGE_WIDTH}px`,
//                     height: `${PAGE_HEIGHT}px`,
//                     transform: `scale(${scale})`,
//                     transformOrigin: 'top center',
//                   }}
//                 >
//                   {/* Background */}
//                   {background && (
//                     <div
//                       className="absolute inset-0 pointer-events-none"
//                       style={{
//                         backgroundImage: `url(${background})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         backgroundRepeat: 'no-repeat',
//                         opacity: 0.1,
//                       }}
//                     />
//                   )}

//                   {/* Content */}
//                   <div
//                     className="absolute overflow-hidden"
//                     style={{
//                       top: `${PAGE_PADDING}px`,
//                       left: `${PAGE_PADDING}px`,
//                       right: `${PAGE_PADDING}px`,
//                       bottom: `${PAGE_PADDING}px`,
//                       width: `${CONTENT_WIDTH}px`,
//                       height: `${CONTENT_HEIGHT}px`,
//                     }}
//                   >
//                     <div
//                       className="absolute"
//                       style={{
//                         top: `-${pageIndex * CONTENT_HEIGHT}px`,
//                         left: 0,
//                         width: `${CONTENT_WIDTH}px`,
//                       }}
//                     >
//                       {component}
//                     </div>
//                   </div>

//                   {/* Page number */}
//                   <div className="absolute bottom-4 right-4 text-xs text-gray-400">
//                     Page {pageIndex + 1} of {pages}
//                   </div>

//                   {/* Border */}
//                   <div className="absolute inset-0 border border-gray-300 pointer-events-none"></div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Debug info */}
//       {showDebugInfo && (
//         <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">
//           Width: {windowWidth}px | Scale: {(scale * 100).toFixed(0)}%
//         </div>
//       )}
//     </div>
//   )
// }
// export default A4PDFPreview;

// import React, { useEffect, useRef, useState } from 'react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

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
//   const [pages, setPages] = useState(1)
//   const [scale, setScale] = useState(1)
//   const [windowWidth, setWindowWidth] = useState(0)
//   const [isDownloading, setIsDownloading] = useState(false)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const pdfContainerRef = useRef<HTMLDivElement>(null)
//   const [isReady, setIsReady] = useState(false)

//   // A4 dimensions at 96 DPI
//   const PAGE_WIDTH = 794
//   const PAGE_HEIGHT = 1123
//   const PAGE_PADDING = 48
//   const CONTENT_WIDTH = PAGE_WIDTH - PAGE_PADDING * 2
//   const CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING * 2

//   const calculateScale = (width: number): number => {
//     const paddingX = 32
//     const availableWidth = width - paddingX
//     if (width < 450) return Math.min(availableWidth / PAGE_WIDTH, 0.45)
//     else if (width < 768) return Math.min(availableWidth / PAGE_WIDTH, 0.6)
//     else if (width < 1024) return Math.min(availableWidth / PAGE_WIDTH, 0.8)
//     else if (width < 1280) return Math.min(availableWidth / PAGE_WIDTH, 0.9)
//     else return Math.min(availableWidth / PAGE_WIDTH, 1)
//   }

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

//   const handleDownload = async () => {
//     if (!pdfContainerRef.current) return
//     setIsDownloading(true)
//     try {
//       const canvas = await html2canvas(pdfContainerRef.current, {
//         scale: 2,
//         useCORS: true,
//       })

//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'pt', 'a4')

//       const pdfWidth = pdf.internal.pageSize.getWidth()
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//       pdf.save(filename)
//     } catch (err) {
//       console.error('PDF generation error:', err)
//       alert('Failed to generate PDF.')
//     } finally {
//       setIsDownloading(false)
//     }
//   }

//   const scaledHeight = PAGE_HEIGHT * scale
//   const heightDifference = PAGE_HEIGHT - scaledHeight

//   return (
//     <div className="min-h-screen overflow-auto bg-gray-100">
//       {/* Download button */}
//       {enableDownload && (
//         <div className="fixed top-4 right-4 z-50">
//           <button
//             onClick={handleDownload}
//             disabled={isDownloading}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center"
//           >
//             {isDownloading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Downloading...
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-5 h-5 mr-2"
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
//                 Download
//               </>
//             )}
//           </button>
//         </div>
//       )}

//       {/* Hidden container to measure content */}
//       <div
//         ref={contentRef}
//         className="fixed opacity-0 pointer-events-none"
//         style={{
//           width: `${CONTENT_WIDTH}px`,
//           left: '-9999px',
//           top: 0,
//         }}
//       >
//         {component}
//       </div>

//       {/* Main preview container */}
//       <div className="py-4 px-4">
//         <div ref={pdfContainerRef} className="flex flex-col items-center gap-4">
//           {isReady &&
//             [...Array(pages)].map((_, pageIndex) => (
//               <div
//                 key={pageIndex}
//                 className="relative"
//                 style={{
//                   marginBottom:
//                     pageIndex < pages - 1 ? `-${heightDifference}px` : '0',
//                 }}
//               >
//                 <div
//                   data-pdf-page={pageIndex}
//                   className="relative bg-white shadow-2xl transition-transform duration-300"
//                   style={{
//                     width: `${PAGE_WIDTH}px`,
//                     height: `${PAGE_HEIGHT}px`,
//                     transform: `scale(${scale})`,
//                     transformOrigin: 'top center',
//                   }}
//                 >
//                   {background && (
//                     <div
//                       className="absolute inset-0 pointer-events-none"
//                       style={{
//                         backgroundImage: `url(${background})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         backgroundRepeat: 'no-repeat',
//                         opacity: 0.1,
//                       }}
//                     />
//                   )}

//                   <div
//                     className="absolute overflow-hidden"
//                     style={{
//                       top: `${PAGE_PADDING}px`,
//                       left: `${PAGE_PADDING}px`,
//                       right: `${PAGE_PADDING}px`,
//                       bottom: `${PAGE_PADDING}px`,
//                       width: `${CONTENT_WIDTH}px`,
//                       height: `${CONTENT_HEIGHT}px`,
//                     }}
//                   >
//                     <div
//                       className="absolute"
//                       style={{
//                         top: `-${pageIndex * CONTENT_HEIGHT}px`,
//                         left: 0,
//                         width: `${CONTENT_WIDTH}px`,
//                       }}
//                     >
//                       {component}
//                     </div>
//                   </div>

//                   <div className="absolute bottom-4 right-4 text-xs text-gray-400">
//                     Page {pageIndex + 1} of {pages}
//                   </div>

//                   <div className="absolute inset-0 border border-gray-300 pointer-events-none"></div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {showDebugInfo && (
//         <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">
//           Width: {windowWidth}px | Scale: {(scale * 100).toFixed(0)}%
//         </div>
//       )}
//     </div>
//   )
// }
import React, { useEffect, useRef, useState } from 'react'

interface A4PDFPreviewProps {
  component: React.ReactNode
  background?: string
  showDebugInfo?: boolean
  enableDownload?: boolean
  filename?: string
  refferance?: React.RefObject<HTMLDivElement | null>
}

const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({
  component,
  background,
  showDebugInfo = false,
  enableDownload = true,
  refferance,
}) => {
  const [pages, setPages] = useState(1)
  const [scale, setScale] = useState(1)
  const [windowWidth, setWindowWidth] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
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

  const scaledHeight = PAGE_HEIGHT * scale
  const heightDifference = PAGE_HEIGHT - scaledHeight

  // Simple download function - direct and clean
  const downloadPDF = () => {
    // Show quick instruction
    const confirmed = window.confirm(
      'To download as PDF:\n\n' +
        '1. Click OK to open print dialog\n' +
        '2. Select "Save as PDF" as destination\n' +
        '3. Click "Save"\n\n' +
        'Ready to proceed?'
    )

    if (confirmed) {
      window.print()
    }
  }

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

      <div ref={refferance} className="min-h-screen overflow-auto bg-gray-100">
        {/* Download Button - Simple and Direct */}
        {enableDownload && (
          <button
            onClick={downloadPDF}
            className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 no-print"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V19a2 2 0 002 2h14a2 2 0 002-2v-2M7 10V5a2 2 0 012-2h4l2 2h2a2 2 0 012 2v3"
              />
            </svg>
            Download PDF
          </button>
        )}

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
        <div className="py-4 px-4 print-container print-target">
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
                    className="pdf-page relative bg-white shadow-2xl transition-transform duration-300"
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
                          opacity: 0.1,
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

                    {/* Border */}
                    <div className="absolute inset-0 border border-gray-300 pointer-events-none no-print"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Debug info */}
        {showDebugInfo && (
          <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs no-print">
            Width: {windowWidth}px | Scale: {(scale * 100).toFixed(0)}%
          </div>
        )}
      </div>
    </>
  )
}
export default A4PDFPreview
