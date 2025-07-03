'use client'
import React, { useState } from 'react'
import { useBiodata } from '@/context/BiodataContext'
import { useBiodataSettings } from '@/hooks/useBiodataForm'
import Image, { StaticImageData } from 'next/image'
import Template1PDF from '@/components/templates/layout_1'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import { templates } from '@/components/templates/templates'
import { Fullscreen, Printer } from 'lucide-react'
import SelectField from '@/components/ui/SelectField'
import A4PDFPreview from '@/components/BiodataCreator/PDFConverter'

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
const PreviewPage: React.FC = () => {
  const { biodata } = useBiodata()
  console.log("🚀 ~ biodata:", biodata)
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
    id: string | number
    thumbnail: string | StaticImageData
    [key: string]: unknown
  }

  const handleSelectTemplate = (template: Template): void => {
    updateSettings({ templateId: String(template.id) })
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

  const downloadPDFWithBackground = async () => {
    try {
      setIsDownloading(true)

      const resume = document.getElementById('biodata')
      console.log('🚀 ~ downloadPDFWithBackground ~ resume:', resume)
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
      console.log('🚀 ~ downloadPDFWithBackground ~ fullCanvas:', fullCanvas)

      // Background image base64
      const bgSrc =
        typeof biodata.settings.background === 'string'
          ? biodata.settings.background
          : (biodata.settings.background as unknown as StaticImageData)?.src ||
            ""

      if (!bgSrc) {
        console.error('Background image not found or invalid.')
        setIsDownloading(false)
        return
      }

      const base64Bg = await toBase64(bgSrc)
      console.log('🚀 ~ downloadPDFWithBackground ~ base64Bg:', base64Bg)

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
      console.log('🚀 ~ downloadPDFWithBackground ~ totalPages:', totalPages)

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
      <div className="flex justify-between  mb-4">
        <h2 className="text-xl font-bold">Preview Section</h2>
        <div className="flex gap-4">
          <button
            onClick={downloadPDFWithBackground}
            // disabled={isDownloading}
            className={`
             bg-gradient-to-r from-blue-500 to-indigo-500
           shadow-lg  items-center gap-2  
          px-5 py-2 flex text-white rounded-full font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-0.5  `}
            title="Download as PDF"
          >
            <>
              <Fullscreen size={20} />
              Preview
            </>
          </button>
          <button
            onClick={downloadPDFWithBackground}
            // disabled={isDownloading}
            className={`${
              isDownloading
                ? 'bg-gray-400 cursor-not-allowed'
                : ' bg-gradient-to-r from-orange-500 to-pink-500'
            } shadow-lg  items-center gap-2  
          px-5 py-2 flex text-white rounded-full font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-0.5  `}
            title="Download as PDF"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Printer size={20} />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      <A4PDFPreview
        component={<Template1PDF />}
        background={
          typeof biodata.settings.background === 'string'
            ? biodata.settings.background
            : (biodata.settings.background as unknown as StaticImageData)
                ?.src ||
                ''
        }
      ></A4PDFPreview>

      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <SelectField
              options={fontOptions}
              onChange={() => handleFontChange}
              value={biodata.settings.fontFamily || 'geist'}
              label="Font Family"
              id="font"
              name="fontFamily"
            />
          </div>

          <div className="space-y-1">
            <SelectField
              options={colorOptions}
              onChange={() => handleColorChange}
              value={biodata.settings.primaryColor || '#000'}
              label="Font Color"
              id="color"
              name="primaryColor"
            />

            {/* <div className="flex items-center space-x-2 mt-2">
              <div
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: settings.primaryColor }}
              ></div>
              <span className="text-sm">{settings.primaryColor}</span>
            </div> */}
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Select Template</h3>
          <p className="text-sm text-gray-500">
            Choose a design template for your biodata.
          </p>

          <div className="flex flex-wrap justify-evenly  gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                  settings.templateId === String(template.id)
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
      </div>
    </div>
  )
}

export default PreviewPage
