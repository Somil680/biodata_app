'use client'
import React, { useEffect, useRef, useState } from 'react'

// Props for the A4PDFPreview component
interface A4PDFPreviewProps {
  component: React.ReactNode // The content to render inside the PDF preview
  background?: string // Optional background image URL
  showDebugInfo?: boolean // Show debug info overlay
}

/**
 * A4PDFPreview renders a paginated, responsive A4-sized PDF preview of a React component.
 * Handles scaling, page splitting, and print styles for accurate print output.
 */
const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({
  component,
  background,
  showDebugInfo = false,
}) => {
  // State for number of pages, scale, and window width
  const [pages, setPages] = useState(1)
  const [scale, setScale] = useState(1)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isReady, setIsReady] = useState(false)

  // Refs for measuring and rendering content
  const contentRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  // A4 page and content dimensions (in px at 96 DPI)
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
    else if (width < 1280) return Math.min(availableWidth / PAGE_WIDTH, 0.5)
    else return Math.min(availableWidth / PAGE_WIDTH)
  }

  // Update scale and window width on resize
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

  // Calculate number of pages needed based on content height
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

  // Calculate scaled height and height difference for page overlap
  const scaledHeight = PAGE_HEIGHT * scale
  const heightDifference = PAGE_HEIGHT - scaledHeight
  console.log('🚀 ~ pagdhnxfbxes:', heightDifference , )
  return (
    <>
      {/* Print styles for A4 output */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0 !important; padding: 0 !important; background: white !important; }
          body > * { display: none !important; }
          .print-target, .print-target * { display: block !important; visibility: visible !important; }
          .no-print { display: none !important; }
          .pdf-page {
            lineHeight: 1.5 !important;
            width: 210mm !important;
            margin: 0 !important;
            page-break-after: always;
            page-break-inside: avoid;
            transform: none !important;
            box-shadow: none !important;
            border: none !important;
            position: relative !important;
            background: white !important;
            }
            .pdf-page:last-child { page-break-after: auto; }
            .pdf-page > div { transform: none !important; }
            }
            `,
        }}
      />
      {/* height: 297mm !important; */}

      {/* Hidden container for measuring content height */}
      <div
        ref={contentRef}
        className="fixed opacity-0 pointer-events-none no-print"
        style={{ width: `${CONTENT_WIDTH}px`, left: '-9999px', top: 0 }}
      >
        {component}
      </div>

      {/* Main paginated content for preview and print */}
      <div
        ref={mainContentRef}
        className=" print-target  flex justify-center items-center  "
        style={{
          width: `${PAGE_WIDTH}px`,
          // height: `616px`,
          height: `${PAGE_HEIGHT}px`,
          transform: `scale(${0.5})`,
          transformOrigin: 'top center',
        }}
      >
        {isReady &&
          [...Array(1)].map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="pdf-page transition-transform duration-300 relative"
              style={{
                // width: `430px`,
                width: `${PAGE_WIDTH}px`,
                // height: `616px`,
                height: `${PAGE_HEIGHT}px`,
                // transform: `scale(${scale})`,
                transformOrigin: 'top center',
              }}
            >
              {/* Optional background image */}
              {background && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}

              {/* Page content, offset for pagination */}
              <div
                className="absolute overflow-hidden"
                style={{
                  top: `${PAGE_PADDING}px`,
                  left: `${PAGE_PADDING}px`,
                  right: `${PAGE_PADDING}px`,
                  bottom: `${PAGE_PADDING}px`,
                  // width: `${CONTENT_WIDTH}px`,
                  // height: `${CONTENT_HEIGHT}px`,
                }}
              >
                {/* <div
                  className="absolute"
                  style={{
                    top: `-${pageIndex * CONTENT_HEIGHT}px`,
                    left: 0,
                    width: `${CONTENT_WIDTH}px`,
                  }}
                > */}
                {component}
                {/* </div> */}
              </div>
              {/* Page number (not shown in print) */}
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 no-print">
                Page {pageIndex + 1} of {pages}
              </div>
            </div>
          ))}
      </div>

      {/* Debug info overlay (optional) */}
      {showDebugInfo && (
        <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs no-print">
          Width: {windowWidth}px | Scale: {(scale * 100).toFixed(0)}% | Pages:{' '}
          {pages}
        </div>
      )}
    </>
  )
}

export default A4PDFPreview
