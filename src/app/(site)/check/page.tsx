"use client"
import React, { useState, useRef, useCallback } from 'react'

const HTML2CanvasDebugSolution = () => {
  const [capturedCanvases, setCapturedCanvases] = useState([])
  const [pageHeight, setPageHeight] = useState(800)
  const [scale, setScale] = useState(1)
  const [format, setFormat] = useState('png')
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
    visible: false,
  })
  const [status, setStatus] = useState('Ready to capture pages.')
  const [debugInfo, setDebugInfo] = useState('')

  const contentRef = useRef(null)

  const updateStatus = useCallback((message) => {
    setStatus(message)
    console.log('Status:', message)
  }, [])

  const updateDebugInfo = useCallback((info) => {
    setDebugInfo((prev) => prev + '\n' + info)
    console.log('Debug:', info)
  }, [])

  const updateProgress = useCallback((current, total) => {
    setProgress((prev) => {
      if (current === 0) {
        return { current, total, visible: true }
      }

      const newProgress = { current, total, visible: true }

      if (current === total) {
        setTimeout(() => {
          setProgress((p) => ({ ...p, visible: false }))
        }, 1000)
      }

      return newProgress
    })
  }, [])

  // Debug function to check element properties
  const debugElement = useCallback(
    (element) => {
      if (!element) {
        updateDebugInfo('❌ Element is null or undefined')
        return false
      }

      const rect = element.getBoundingClientRect()
      const computedStyle = window.getComputedStyle(element)

      updateDebugInfo(
        `📐 Element dimensions: ${element.offsetWidth}x${element.offsetHeight}`
      )
      updateDebugInfo(
        `📐 Scroll dimensions: ${element.scrollWidth}x${element.scrollHeight}`
      )
      updateDebugInfo(
        `📐 Client dimensions: ${element.clientWidth}x${element.clientHeight}`
      )
      updateDebugInfo(`📐 BoundingRect: ${rect.width}x${rect.height}`)
      updateDebugInfo(`👁️ Visibility: ${computedStyle.visibility}`)
      updateDebugInfo(`👁️ Display: ${computedStyle.display}`)
      updateDebugInfo(`👁️ Opacity: ${computedStyle.opacity}`)
      updateDebugInfo(`🎨 Background: ${computedStyle.backgroundColor}`)
      updateDebugInfo(`📍 Position: ${computedStyle.position}`)
      updateDebugInfo(`🔢 Z-index: ${computedStyle.zIndex}`)

      if (rect.width === 0 || rect.height === 0) {
        updateDebugInfo('⚠️ Element has zero dimensions!')
        return false
      }

      if (computedStyle.display === 'none') {
        updateDebugInfo('⚠️ Element is hidden (display: none)!')
        return false
      }

      if (computedStyle.visibility === 'hidden') {
        updateDebugInfo('⚠️ Element is hidden (visibility: hidden)!')
        return false
      }

      if (computedStyle.opacity === '0') {
        updateDebugInfo('⚠️ Element is transparent (opacity: 0)!')
        return false
      }

      updateDebugInfo('✅ Element appears to be valid for capture')
      return true
    },
    [updateDebugInfo]
  )

  const capturePages = useCallback(async () => {
    if (!contentRef.current) {
      updateStatus('❌ No element reference found!')
      return
    }

    setDebugInfo('🔍 Starting debug analysis...\n')

    const element = contentRef.current

    // Debug the element first
    if (!debugElement(element)) {
      updateStatus('❌ Element validation failed! Check debug info.')
      return
    }

    const totalHeight = element.scrollHeight
    const pages = Math.ceil(totalHeight / pageHeight)

    updateStatus(`Starting capture of ${pages} pages...`)
    updateDebugInfo(`📄 Total pages to capture: ${pages}`)
    updateDebugInfo(`📏 Page height: ${pageHeight}px`)
    updateDebugInfo(`📏 Total content height: ${totalHeight}px`)

    const newCanvases = []

    try {
      // Import html2canvas dynamically
      const html2canvas = (await import('html2canvas')).default
      updateDebugInfo('✅ html2canvas library loaded successfully')

      for (let i = 0; i < pages; i++) {
        updateProgress(i, pages)
        const currentY = i * pageHeight
        const currentHeight = Math.min(pageHeight, totalHeight - currentY)

        updateStatus(`Capturing page ${i + 1} of ${pages}...`)
        updateDebugInfo(`\n🎯 Capturing page ${i + 1}:`)
        updateDebugInfo(`   Y offset: ${currentY}px`)
        updateDebugInfo(`   Height: ${currentHeight}px`)

        try {
          // Ensure element is visible and scrolled to top
          element.scrollTop = 0

          // Wait a bit for any animations or transitions
          await new Promise((resolve) => setTimeout(resolve, 100))

          const options = {
            x: 0,
            y: currentY,
            width: element.scrollWidth,
            height: currentHeight,
            scale: scale,
            useCORS: true,
            allowTaint: true,
            logging: true, // Enable logging for debugging
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: currentHeight,
            scrollX: 0,
            scrollY: 0,
            // Remove any transforms that might interfere
            ignoreElements: (element) => {
              return (
                element.classList && element.classList.contains('no-capture')
              )
            },
          }

          updateDebugInfo(`   Options: ${JSON.stringify(options, null, 2)}`)

          const canvas = await html2canvas(element, options)

          if (!canvas) {
            updateDebugInfo(`❌ Page ${i + 1}: Canvas is null!`)
            continue
          }

          if (canvas.width === 0 || canvas.height === 0) {
            updateDebugInfo(
              `❌ Page ${i + 1}: Canvas has zero dimensions (${canvas.width}x${
                canvas.height
              })`
            )
            continue
          }

          updateDebugInfo(
            `✅ Page ${i + 1}: Successfully captured (${canvas.width}x${
              canvas.height
            })`
          )
          newCanvases.push(canvas)
        } catch (error) {
          updateStatus(`❌ Error capturing page ${i + 1}: ${error.message}`)
          updateDebugInfo(`❌ Page ${i + 1} error: ${error.message}`)
          updateDebugInfo(`   Stack: ${error.stack}`)
          console.error('Capture error:', error)
        }
      }

      updateProgress(pages, pages)
      setCapturedCanvases(newCanvases)

      if (newCanvases.length > 0) {
        updateStatus(
          `✅ Successfully captured ${newCanvases.length} out of ${pages} pages!`
        )
        updateDebugInfo(
          `\n🎉 Capture completed: ${newCanvases.length}/${pages} pages successful`
        )
      } else {
        updateStatus(`❌ No pages were captured successfully!`)
        updateDebugInfo(`\n💥 Capture failed: 0/${pages} pages successful`)
      }
    } catch (error) {
      updateStatus(`❌ Failed to load html2canvas: ${error.message}`)
      updateDebugInfo(`❌ Library loading error: ${error.message}`)
      console.error('Library loading error:', error)
    }
  }, [
    pageHeight,
    scale,
    updateStatus,
    updateProgress,
    updateDebugInfo,
    debugElement,
  ])

  // Simple test capture function
  const testCapture = useCallback(async () => {
    if (!contentRef.current) {
      updateStatus('❌ No element reference found!')
      return
    }

    setDebugInfo('🧪 Running simple test capture...\n')

    try {
      const html2canvas = (await import('html2canvas')).default
      const element = contentRef.current

      updateDebugInfo('✅ Library loaded, attempting basic capture...')

      // Very basic capture with minimal options
      const canvas = await html2canvas(element, {
        logging: true,
        useCORS: true,
        scale: 1,
      })

      if (canvas && canvas.width > 0 && canvas.height > 0) {
        updateDebugInfo(
          `✅ Test capture successful! Canvas: ${canvas.width}x${canvas.height}`
        )
        setCapturedCanvases([canvas])
        updateStatus('✅ Test capture completed successfully!')
      } else {
        updateDebugInfo('❌ Test capture failed - canvas is invalid')
        updateStatus('❌ Test capture failed')
      }
    } catch (error) {
      updateDebugInfo(`❌ Test capture error: ${error.message}`)
      updateStatus(`❌ Test capture failed: ${error.message}`)
      console.error('Test capture error:', error)
    }
  }, [updateStatus, updateDebugInfo])

  const clearResults = useCallback(() => {
    setCapturedCanvases([])
    setDebugInfo('')
    updateStatus('Results and debug info cleared.')
  }, [updateStatus])

  const downloadAll = useCallback(() => {
    if (capturedCanvases.length === 0) {
      updateStatus('No pages captured yet!')
      return
    }

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png'

    capturedCanvases.forEach((canvas, index) => {
      const link = document.createElement('a')
      link.download = `page_${index + 1}.${format}`
      link.href = canvas.toDataURL(mimeType, 0.9)
      link.click()
    })

    updateStatus(`Downloaded ${capturedCanvases.length} pages!`)
  }, [capturedCanvases, format, updateStatus])

  const percentage =
    progress.total > 0
      ? Math.round((progress.current / progress.total) * 100)
      : 0

  return (
    <div className="max-w-6xl mx-auto p-5 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          HTML2Canvas Debug & Solution
        </h1>

        {/* Controls */}
        <div className="mb-5 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Capture Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">
                Page Height (px):
              </span>
              <input
                type="number"
                value={pageHeight}
                onChange={(e) => setPageHeight(parseInt(e.target.value))}
                min="100"
                max="2000"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">
                Scale:
              </span>
              <select
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1x</option>
                <option value="2">2x</option>
                <option value="3">3x</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">
                Format:
              </span>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={testCapture}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              🧪 Test Capture
            </button>
            <button
              onClick={capturePages}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              📄 Capture Pages
            </button>
            <button
              onClick={downloadAll}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              💾 Download All
            </button>
            <button
              onClick={clearResults}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              🗑️ Clear All
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {progress.visible && (
          <div className="mb-4 bg-gray-200 rounded-md overflow-hidden">
            <div
              className="h-5 bg-blue-600 flex items-center justify-center text-white text-xs transition-all duration-300"
              style={{ width: `${percentage}%` }}
            >
              {progress.current}/{progress.total} ({percentage}%)
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content to Capture */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Content to Capture
            </h3>
            <div
              ref={contentRef}
              className="bg-white p-5 border-2 border-blue-300 rounded-lg min-h-96 max-h-96 overflow-auto"
              style={{ minHeight: '400px' }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Sample Content
              </h2>
              <p className="mb-4 text-gray-600">
                This is test content for html2canvas capture. Make sure this
                element is visible and has proper dimensions.
              </p>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg mb-4">
                <h3 className="font-bold mb-2">Colorful Section</h3>
                <p>
                  This section has a gradient background to test color capture.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded">
                  <h4 className="font-semibold text-red-800">Red Box</h4>
                  <p className="text-red-600">Some red content</p>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <h4 className="font-semibold text-green-800">Green Box</h4>
                  <p className="text-green-600">Some green content</p>
                </div>
              </div>

              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-50 rounded border-l-4 border-blue-500"
                  >
                    <h4 className="font-semibold">Section {i + 1}</h4>
                    <p className="text-gray-600">
                      This is section {i + 1} content. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Debug Info and Status */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Debug Information
            </h3>

            {/* Status */}
            <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-1">Status:</h4>
              <p className="text-sm text-blue-700">{status}</p>
            </div>

            {/* Debug Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-md border max-h-64 overflow-auto">
              <h4 className="font-medium text-gray-800 mb-2">Debug Log:</h4>
              <pre className="text-xs font-mono text-gray-600 whitespace-pre-wrap">
                {debugInfo ||
                  'No debug information yet. Click "Test Capture" to start debugging.'}
              </pre>
            </div>

            {/* Results */}
            {capturedCanvases.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Captured Results:
                </h4>
                <div className="space-y-2 max-h-64 overflow-auto">
                  {capturedCanvases.map((canvas, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-md overflow-hidden"
                    >
                      <div className="bg-gray-50 px-3 py-1 text-xs text-gray-600">
                        Page {index + 1}: {canvas.width}x{canvas.height}
                      </div>
                      <div className="p-2">
                        <canvas
                          ref={(el) => {
                            if (el && el !== canvas) {
                              const ctx = el.getContext('2d')
                              el.width = canvas.width
                              el.height = canvas.height
                              ctx.drawImage(canvas, 0, 0)
                            }
                          }}
                          className="max-w-full h-auto border"
                          style={{ maxHeight: '100px' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HTML2CanvasDebugSolution
