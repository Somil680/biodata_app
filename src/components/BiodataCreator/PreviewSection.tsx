'use client'
import React, { useState } from 'react'
import { useBiodata } from '@/context/BiodataContext'
import bg from '../../../public/images/template-previews/bg.png'
import temp1 from '../../../public/images/template-previews/template_1.jpg'
import temp2 from '../../../public/images/template-previews/template_2.png'
import temp3 from '../../../public/images/template-previews/temp3.webp'
import { useBiodataSettings } from '@/hooks/useBiodataForm'
import Image, { StaticImageData } from 'next/image'
import A4PDFPreview from './ReacttoPrint'
import Template1PDF from '../templates/Template1PDF'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
const templates = [
  {
    id: '1',
    name: 'Classic',
    thumbnail: temp1,
    description: 'A traditional layout with elegant styling',
  },
  {
    id: '2',
    name: 'Classic',
    thumbnail: temp2,
    description: 'A traditional layout with elegant styling',
  },
  {
    id: '3',
    name: 'Classic',
    thumbnail: bg,
    description: 'A traditional layout with elegant styling',
  },
  {
    id: '4',
    name: 'Classic',
    thumbnail: temp3,
    description: 'A traditional layout with elegant styling',
  },
]
const fontOptions = [
  { value: 'geist', label: 'Geist Sans (Default)' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'mono', label: 'mono' },
  { value: 'serif', label: 'serif' },
]

// Sample color options
const colorOptions = [
  { value: '#D40000', label: 'Red (Default)' },
  { value: '#1E40AF', label: 'Blue' },
  { value: '#047857', label: 'Green' },
  { value: '#7E22CE', label: 'Purple' },
  { value: '#B45309', label: 'Orange' },
  { value: '#1F2937', label: 'Dark Gray' },
]
const PreviewSection: React.FC = () => {
  const { biodata } = useBiodata()
  const { settings, updateSettings } = useBiodataSettings()

  const [isDownloading, setIsDownloading] = useState(false)
  // const [isReady, setIsReady] = useState(false)

  // Check if biodata exists
  if (!biodata) {
    return (
      <div className="text-red-500 p-4 border border-red-500">
        No biodata available
      </div>
    )
  }
  interface Template {
    id: string
    name: string
    thumbnail: unknown
    description: string
  }
  
  const handleSelectTemplate = (template: Template): void => {
    updateSettings({ templateId: template.id })
    updateSettings({ background: template.thumbnail as string })
  }
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ fontFamily: e.target.value })
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ primaryColor: e.target.value })
  }
  const toBase64 = async (url: string): Promise<string> => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

      const blob = await res.blob()
      return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string)
          } else {
            reject('Reader result is null')
          }
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(blob)
      })
    } catch (err) {
      console.error('🚨 Failed to convert image to base64:', err)
      return ''
    }
  }

  // const downloadPDFWithBackground = async () => {
  //   setIsDownloading(true)

  //   const resume = document.getElementById('biodata')
  //   console.log("🚀 ~ downloadPDFWithBackground ~ resume:", resume)
  //   if (!resume) {
  //     console.error('Element with id "biodata" not found.')
  //     setIsDownloading(false)
  //     return
  //   }

  //   const canvas = await html2canvas(resume, {
  //     scale: 2,
  //     useCORS: true,
  //     backgroundColor: null, // this tells html2canvas: "don’t fill any background!"
  //   })
  //   console.log("🚀 ~ downloadPDFWithBackground ~ canvas:", canvas)

  //   const imageData = canvas.toDataURL('image/png')
  //   console.log("🚀 ~ downloadPDFWithBackground ~ imageData:", imageData)

  //   // SAFELY resolve background path
  //   const bgSrc =
  //     typeof biodata.settings.background === 'string'
  //       ? biodata.settings.background
  //       : ((biodata.settings.background as unknown) as StaticImageData)?.src ||
  //         (bg as StaticImageData)?.src 

  //   if (!bgSrc) {
  //     console.error('Background image not found or invalid.')
  //     setIsDownloading(false)
  //     return
  //   }

  //   const base64Bg = await toBase64(bgSrc)
  //   console.log("🚀 ~ downloadPDFWithBackground ~ base64Bg:", base64Bg)

  //   const pdf = new jsPDF('p', 'mm', 'a4')
  //   console.log("🚀 ~ downloadPDFWithBackground ~ pdf:", pdf)
  //   const pageHeight = 297
  //   const pageWidth = 210
    
  //   const canvasHeight = canvas.height
  //   const canvasWidth = canvas.width
  //   const ratio = pageWidth / canvasWidth
  //   const imgHeight = canvasHeight * ratio
    
  //   // let position = 0
  //   // let pageIndex = 0

  //   // while (position < imgHeight) {
  //   //   console.log("🚀 ~ downloadPDFWithBackground ~ pageIndex:", pageIndex)
  //   //   if (pageIndex > 0) pdf.addPage()
  //   //     console.log("🚀 ~ downloadPDFWithBackground ~ position:", position)
      
  //   //   // Draw full-page background first
  //   //   console.log(base64Bg.slice(0, 30))
  //   //   console.log("🚀 ~ downloadPDFWithBackground ~ pdf:", pdf)

  //   //   pdf.addImage(base64Bg, 'PNG', 0, 0, pageWidth, pageHeight)
  //   //   console.log("🚀 ~ downloadPDFWithBackground ~ pdf:", pdf)
      
  //   //   // Draw actual resume content
  //   //   pdf.addImage(imageData, 'PNG', 0, -position, pageWidth, imgHeight )
  //   //   console.log("🚀 ~ downloadPDFWithBackground ~ pdf:", pdf)
      
  //   //   position += pageHeight
  //   //   pageIndex++
  //   //   console.log("🚀 ~ downloadPDFWithBackground ~ pageIndex:", pageIndex)
  //   //   }
  //   const topMargin = 15
  //   const bottomMargin = 15
  //   const usableHeight = pageHeight - topMargin - bottomMargin

  //   let position = 0
  //   let pageIndex = 0

  //   while (position < imgHeight) {
  //     if (pageIndex > 0) pdf.addPage()

  //     // Background
  //     pdf.addImage(base64Bg, 'PNG', 0, 0, pageWidth, pageHeight)

  //     // Content (shift down by topMargin)
  //     pdf.addImage(
  //       imageData,
  //       'PNG',
  //       0,
  //       topMargin - position, // <— 👈 shift canvas down
  //       pageWidth,
  //       imgHeight
  //     )

  //     position += usableHeight
  //     pageIndex++
  //   }
  //   pdf.save('resume-with-bg.pdf')
  //   setIsDownloading(false)
  // }
  
  // const downloadPDFWithBackground = async () => {
  //   setIsDownloading(true)

  //   const resume = document.getElementById('biodata')
  //   if (!resume) {
  //     console.error('Element with id "biodata" not found.')
  //     setIsDownloading(false)
  //     return
  //   }

  //   const fullCanvas = await html2canvas(resume, {
  //     scale: 2,
  //     useCORS: true,
  //     backgroundColor: null,
  //   })

  //   const imageDataFull = fullCanvas.toDataURL('image/png')

  //   const bgSrc =
  //     typeof biodata.settings.background === 'string'
  //       ? biodata.settings.background
  //       : ((biodata.settings.background as unknown) as StaticImageData)?.src ||
  //         (bg as StaticImageData)?.src

  //   if (!bgSrc) {
  //     console.error('Background image not found or invalid.')
  //     setIsDownloading(false)
  //     return
  //   }

  //   const base64Bg = await toBase64(bgSrc)

  //   // PDF config
  //   const pdf = new jsPDF('p', 'mm', 'a4')
  //   const pageWidthMM = 210
  //   const pageHeightMM = 297

  //   // Configurable margins (mm)
  //   const topMarginMM = 20
  //   const bottomMarginMM = 20

  //   // Convert to px
  //   const dpi = 96
  //   const mmToPx = dpi / 25.4 // ≈3.78
  //   const pageWidthPx = Math.floor(pageWidthMM * mmToPx)
  //   const pageHeightPx = Math.floor(pageHeightMM * mmToPx)
  //   const marginTopPx = Math.floor(topMarginMM * mmToPx)
  //   const marginBottomPx = Math.floor(bottomMarginMM * mmToPx)
  //   const usableHeightPx = pageHeightPx - marginTopPx - marginBottomPx

  //   const totalPages = Math.ceil(fullCanvas.height / usableHeightPx)

  //   for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
  //     // Create new canvas for this page
  //     const pageCanvas = document.createElement('canvas')
  //     pageCanvas.width = fullCanvas.width
  //     pageCanvas.height = pageHeightPx
  //     const ctx = pageCanvas.getContext('2d')!

  //     // Optional: Fill with white (avoid transparent areas)
  //     // ctx.fillStyle = '#ffffff'
  //     // ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)

  //     // Draw a slice of the full content
  //     ctx.drawImage(
  //       fullCanvas,
  //       0,
  //       pageIndex * usableHeightPx,
  //       fullCanvas.width,
  //       usableHeightPx,
  //       0,
  //       marginTopPx,
  //       fullCanvas.width,
  //       usableHeightPx
  //     )

  //     // Convert to base64 image
  //     const pageImage = pageCanvas.toDataURL('image/png')

  //     if (pageIndex > 0) pdf.addPage()

  //     // Add background image (full A4)
  //     pdf.addImage(base64Bg, 'PNG', 0, 0, pageWidthMM, pageHeightMM)

  //     // Add content image (same size as background)
  //     pdf.addImage(pageImage, 'PNG', 0, 0, pageWidthMM, pageHeightMM)
  //   }

  //   pdf.save('resume-with-bg.pdf')
  //   setIsDownloading(false)
  // }
  // const downloadPDFWithBackground = async () => {
  //   try {
  //     setIsDownloading(true)

  //     const resume = document.getElementById('biodata')
  //     console.log("🚀 ~ downloadPDFWithBackground ~ resume:", resume)
  //     if (!resume) {
  //       console.error('Element with id "biodata" not found.')
  //       setIsDownloading(false)
  //       return
  //     }
  //     const scale = 2
  //     // Step 1: Render the entire resume as a high-res canvas
  //     const fullCanvas = await html2canvas(resume, {
  //      scale,
  //       useCORS: true,
  //       backgroundColor: null,
  //     })
  //     console.log("🚀 ~ downloadPDFWithBackground ~ fullCanvas:", fullCanvas)

  //     // Step 2: Resolve background image as base64
  //       const bgSrc =
  //         typeof biodata.settings.background === 'string'
  //           ? biodata.settings.background
  //           : ((biodata.settings.background as unknown) as StaticImageData)?.src ||
  //             (bg as StaticImageData)?.src

  //     if (!bgSrc) {
  //       console.error('Background image not found or invalid.')
  //       setIsDownloading(false)
  //       return
  //     }

  //     const base64Bg = await toBase64(bgSrc)

  //     // Step 3: Setup jsPDF
  //     const pdf = new jsPDF('p', 'mm', 'a4')
  //     const pdfWidthMM = pdf.internal.pageSize.getWidth() // 210 mm
  //     const pdfHeightMM = pdf.internal.pageSize.getHeight() // 297 mm
      
  //     const dpi = 96
  //     const mmToPx = (dpi / 25.4) * scale // 1 mm ≈ 3.78 px
  //     console.log("🚀 ~ downloadPDFWithBackground ~ mmToPx:", mmToPx)
  //     const pdfHeightPx = pdfHeightMM * mmToPx
  //     console.log("🚀 ~ downloadPDFWithBackground ~ pdfHeightPx:", pdfHeightPx)
  //     const topMarginMM = 20
  //     const bottomMarginMM = 20
  //     const marginTopPx = topMarginMM * mmToPx
  //     console.log("🚀 ~ downloadPDFWithBackground ~ marginTopPx:", marginTopPx)
  //     const marginBottomPx = bottomMarginMM * mmToPx
  //     console.log("🚀 ~ downloadPDFWithBackground ~ marginBottomPx:", marginBottomPx)
  //     const usableHeightPx = pdfHeightPx - marginTopPx - marginBottomPx
  //     console.log("🚀 ~ downloadPDFWithBackground ~ usableHeightPx:", usableHeightPx)
  //     const totalCanvasHeight = fullCanvas.height
  //     console.log("🚀 ~ downloadPDFWithBackground ~ totalCanvasHeight:", totalCanvasHeight)
  //     const totalPages = Math.ceil(totalCanvasHeight / pdfHeightPx)
  //     console.log("🚀 ~ downloadPDFWithBackground ~ totalPages:", totalPages)

  //     // Step 4: Slice and add each page
  //     for (let i = 0; i < totalPages; i++) {
  //       const sliceCanvas = document.createElement('canvas')
  //       sliceCanvas.width = fullCanvas.width
  //       sliceCanvas.height = pdfHeightPx

  //       const ctx = sliceCanvas.getContext('2d')!

  //       ctx.drawImage(
  //         fullCanvas,
  //         0,
  //         i * pdfHeightPx, // Source (crop from main canvas)
  //         fullCanvas.width,
  //         pdfHeightPx, // Source size
  //         0,
  //         marginTopPx, // Destination in slice
  //         fullCanvas.width,
  //         pdfHeightPx // Destination size
  //       )

  //       const sliceImage = sliceCanvas.toDataURL('image/png')

  //       if (i > 0) pdf.addPage()

  //       // Draw background first
  //       pdf.addImage(base64Bg, 'PNG', 0, 0, pdfWidthMM, pdfHeightMM)
  //       // Then draw the content
  //       pdf.addImage(sliceImage, 'PNG', 10, 10, pdfWidthMM, pdfHeightMM)
  //     }

  //     pdf.save('resume-with-bg.pdf')
  //   } catch (error) {
  //     console.error('PDF generation failed:', error)
  //   } finally {
  //     setIsDownloading(false)
  //   }
  // }
  const downloadPDFWithBackground = async () => {
    try {
      setIsDownloading(true)

      const resume = document.getElementById('biodata')
      console.log("🚀 ~ downloadPDFWithBackground ~ resume:", resume)
      if (!resume) {
        console.error('Element with id "biodata" not found.')
        setIsDownloading(false)
        return
      }

      const scale = 2

      // Render the resume to a high-res canvas
      const fullCanvas = await html2canvas(resume, {
        scale,
        useCORS: true,
        backgroundColor: null,
      })
      console.log("🚀 ~ downloadPDFWithBackground ~ fullCanvas:", fullCanvas)

      // Background image base64
      const bgSrc =
        typeof biodata.settings.background === 'string'
          ? biodata.settings.background
          : (biodata.settings.background as unknown as StaticImageData)?.src ||
            (bg as StaticImageData)?.src

      if (!bgSrc) {
        console.error('Background image not found or invalid.')
        setIsDownloading(false)
        return
      }

      const base64Bg = await toBase64(bgSrc)
      console.log("🚀 ~ downloadPDFWithBackground ~ base64Bg:", base64Bg)

      // Create jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidthMM = pdf.internal.pageSize.getWidth() // 210mm
      const pdfHeightMM = pdf.internal.pageSize.getHeight() // 297mm

      const dpi = 96
      const mmToPx = (dpi / 25.4) * scale // 1 mm ≈ 3.78 * scale px

      const pdfHeightPx = pdfHeightMM * mmToPx

      // === CUSTOMIZABLE PADDING (IN MM) ===
      const paddingTopMM = 5
      const paddingBottomMM = 10
      const paddingLeftMM = 10
      const paddingRightMM = 10

      const paddingTopPx = paddingTopMM * mmToPx
      const paddingBottomPx = paddingBottomMM * mmToPx
      const paddingLeftPx = paddingLeftMM * mmToPx
      const paddingRightPx = paddingRightMM * mmToPx
      const usableHeightPx = pdfHeightPx - paddingTopPx - paddingBottomPx
      const totalCanvasHeight = fullCanvas.height
      const totalPages = Math.ceil(totalCanvasHeight / usableHeightPx)
      console.log("🚀 ~ downloadPDFWithBackground ~ totalPages:", totalPages)

      for (let i = 0; i < totalPages; i++) {
        const sliceCanvas = document.createElement('canvas')
        sliceCanvas.width = fullCanvas.width
        sliceCanvas.height = pdfHeightPx

        const ctx = sliceCanvas.getContext('2d')!
        // ctx.fillStyle = '#ffffff'
        // ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height)

        // Draw the portion of fullCanvas into this slice with vertical offset
        ctx.drawImage(
          fullCanvas,
          0,
          i * usableHeightPx, // source crop
          fullCanvas.width,
          usableHeightPx,
          paddingLeftPx,
          paddingTopPx, // destination start
          fullCanvas.width - paddingLeftPx - paddingRightPx,
          usableHeightPx
        )

        const sliceImage = sliceCanvas.toDataURL('image/png')

        if (i > 0) pdf.addPage()

        // Add background
        pdf.addImage(base64Bg, 'PNG', 0, 0, pdfWidthMM, pdfHeightMM)

        // Add slice image content with scaled size & offset (MM version of padding)
        pdf.addImage(
          sliceImage,
          'PNG',
          paddingLeftMM,
          paddingTopMM,
          pdfWidthMM - paddingLeftMM - paddingRightMM,
          pdfHeightMM - paddingTopMM - paddingBottomMM
        )
      }

      pdf.save('resume-with-bg.pdf')
    } catch (error) {
      console.error('PDF generation failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }
  
  return (
    <div className="">
      <div className="flex flex-col  mb-4">
        <h2 className="text-xl font-bold">Preview Section</h2>
        <div className="flex flex-col space-x-3">
          {/* Template Selection */}
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Select Template</h3>
            <p className="text-sm text-gray-500">
              Choose a design template for your biodata.
            </p>

            <div className="flex  gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                    settings.templateId === template.id
                      ? 'border-[#D40000] ring-2 ring-[#D40000]/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <Image
                    src={template.thumbnail}
                    alt=""
                    width={96}
                    height={128}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Font and Color Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Font Family</h3>

              <div className="relative">
                <select
                  id="fontFamily"
                  name="fontFamily"
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]"
                  value={settings.fontFamily}
                  onChange={handleFontChange}
                >
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Primary Color</h3>
              <div className="relative">
                <select
                  id="primaryColor"
                  name="primaryColor"
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]"
                  value={settings.primaryColor}
                  onChange={handleColorChange}
                >
                  {colorOptions.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <div
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: settings.primaryColor }}
                ></div>
                <span className="text-sm">{settings.primaryColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <button
          onClick={downloadPDFWithBackground}
          // disabled={isDownloading}
          className={`${
            isDownloading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2`}
          title="Download as PDF"
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="container mx-auto p-4">
        <A4PDFPreview
          component={<Template1PDF />}
          filename="biodata.pdf"
          background={
            typeof biodata.settings.background === 'string'
              ? biodata.settings.background
              : ((biodata.settings.background as unknown as StaticImageData)
                          ?.src ||
                        (typeof bg === 'string' ? bg : (bg as StaticImageData)?.src))
          }
        ></A4PDFPreview>
        <Template1PDF />
      </div>
    </div>
  )
}

export default PreviewSection
