
'use client'
import React, { useEffect, useRef, useState } from 'react'

interface A4PDFPreviewProps {
  component: React.ReactNode
  background?: string
  showDebugInfo?: boolean
  enableDownload?: boolean
  filename?: string
  pagesShown?: number | "all"
  scale?: number
}

const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({
  component,
  background,
  showDebugInfo = true,
  pagesShown,
  scale :scales
}) => {
  const [pages, setPages] = useState(1)
  const [scale, setScale] = useState(1)
  const [windowWidth, setWindowWidth] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null) // New ref for main content
  const [isReady, setIsReady] = useState(false)

  // A4 dimensions at 96 DPI
  const PAGE_WIDTH = 400
  const PAGE_HEIGHT = 561
  const PAGE_WIDTH_PADDING = 70
  const PAGE_HEIGHT_PADDING = 67.5
  const CONTENT_WIDTH = PAGE_WIDTH - PAGE_WIDTH_PADDING * 2
  const CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_HEIGHT_PADDING * 2


  // Calculate responsive scale based on window width
  const calculateScale = (width: number): number => {
    const paddingX = 32
    const availableWidth = width - paddingX

    if (width < 450) return Math.min(availableWidth / PAGE_WIDTH, 1)
    else if (width < 768) return Math.min(availableWidth / PAGE_WIDTH, 1)
    else if (width < 1024) return Math.min(availableWidth / PAGE_WIDTH, 1)
    else if (width < 1280) return Math.min(availableWidth / PAGE_WIDTH, 1)
    else return Math.min(availableWidth / PAGE_WIDTH, 1)
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      setWindowWidth(newWidth)
      // setScale(newWidth)
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
            border: 1px solid # !important;
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
          // id="biodata"
          ref={mainContentRef}
          className="py-4  print-container print-target"
        >
          <div className="flex  items-center justify-center  gap-4 overflow-x-scroll">
            {isReady &&
              [...Array(pagesShown === 'all' ? pages : 1)].map(
                (_, pageIndex) => (
                  // [...Array(pages)].map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    id={`${pages}`}
                    className="relative "
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
                        transform: `scale(${scales})`,
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
                          top: `${PAGE_HEIGHT_PADDING}px`,
                          left: `${PAGE_WIDTH_PADDING}px`,
                          right: `${PAGE_WIDTH_PADDING}px`,
                          bottom: `${PAGE_HEIGHT_PADDING}px`,
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
                )
              )}
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