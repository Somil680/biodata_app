import React, { useEffect, useRef, useState, useCallback } from 'react'
import {  FileText } from 'lucide-react'
import { useBiodata } from '@/context/BiodataContext'

interface A4PDFPreviewProps {
  component: React.ReactNode
  background?: string
  filename?: string
  pagesShown?: number | 'all'
  scale?: number
}

const A4PDFPreview: React.FC<A4PDFPreviewProps> = ({
  component,
  background,
  pagesShown = 'all',
  scale: customScale,
}) => {
  const {biodata} = useBiodata()
  const [pages, setPages] = useState(1)
  const [scale, setScale] = useState(1)
  const [isReady, setIsReady] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)

  // A4 dimensions at 96 DPI
  const PAGE_WIDTH = 800
  const PAGE_HEIGHT = 1123
  // const PAGE_WIDTH = 400
  // const PAGE_HEIGHT = 561
  const WIDTH_PAGE_PADDING = biodata.settings.template?.width?? 0
  const HEIGHT_PAGE_PADDING = biodata.settings.template?.height?? 0
  const CONTENT_WIDTH = PAGE_WIDTH - WIDTH_PAGE_PADDING * 2
  const CONTENT_HEIGHT = PAGE_HEIGHT - HEIGHT_PAGE_PADDING * 2

  // Calculate responsive scale
  const calculateScale = useCallback(
    (width: number): number => {
      const paddingX = 32
      const availableWidth = width - paddingX
      return Math.min(availableWidth / PAGE_WIDTH, 1)
    },
    [PAGE_WIDTH]
  )
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      if (!customScale) {
        setScale(calculateScale(newWidth))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateScale, customScale])

  // Set custom scale if provided
  useEffect(() => {
    if (customScale) {
      setScale(customScale)
    }
  }, [customScale])

  // Calculate pages needed
  useEffect(() => {
    if (!contentRef.current) return

    const timer = setTimeout(() => {
      if (contentRef.current) {
        const totalHeight = contentRef.current.scrollHeight
        const calculatedPages = Math.ceil(totalHeight / CONTENT_HEIGHT)
        setPages(calculatedPages)
        setIsReady(true)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [component, CONTENT_HEIGHT])

 
  const displayedPages =
    pagesShown === 'all' ? pages : Math.min(pagesShown, pages)
  return (
    <div className="relative">
      {/* Download Button */}
  
      {/* Hidden measurement container */}
      <div
        ref={contentRef}
        className="fixed opacity-0 pointer-events-none"
        style={{
          width: `${CONTENT_WIDTH}px`,
          left: '-9999px',
          top: 0,
        }}
      >
        {component}
      </div>

      {/* Preview Pages */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-4">
          {isReady &&
            [...Array(displayedPages)].map((_, pageIndex) => (
              <div
                id={`page${pageIndex + 1}`}
                key={pageIndex}
                className="relative"
              >
                <div
                  className="relative bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden"
                  style={{
                    width: `${PAGE_WIDTH}px`,
                    height: `${PAGE_HEIGHT}px`,
                    // transform: `scale(${0.5})`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Background */}
                  {background && (
                    <div
                      className="absolute inset-0"
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
                      top: `${WIDTH_PAGE_PADDING}px`,
                      left: `${HEIGHT_PAGE_PADDING}px`,
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
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white bg-opacity-80 px-2 py-1 rounded">
                    {pageIndex + 1} / {pages}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Status info */}
      {!isReady && (
        <div className="text-center text-gray-500 mt-4">
          <FileText className="w-6 h-6 mx-auto mb-2 animate-pulse" />
          Calculating pages...
        </div>
      )}
    </div>
  )
}
export default A4PDFPreview