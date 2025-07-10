'use client'
import React, { useState } from 'react'
import { useBiodata } from '@/context/BiodataContext'

import { useBiodataSettings } from '@/hooks/useBiodataForm'
import Image, { StaticImageData } from 'next/image'
import A4PDFPreview from '../BiodataCreator/PDFConverter'
import Template1PDF from '../templates/layout_1'
import { templates } from '../templates/templates'
import {  Fullscreen, Printer } from 'lucide-react'
import StyleDrawer from '../ui/StyleDrawer'

const PreviewSection: React.FC = () => {
  const { biodata, exportAsPDF, isDownloading } = useBiodata()
  const { settings, updateSettings } = useBiodataSettings()
  const [showPages, setShowPages] = React.useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  // Check if biodata exists
  if (!biodata) {
    return (
      <div className="text-red-500 p-4 border border-red-500">
        No biodata available
      </div>
    )
  }

  interface Template {
    id: number
    background: StaticImageData | string
    width: number
    height: number
  }

  const handleSelectTemplate = (template: Template): void => {
    updateSettings({
      template: {
        id: template.id,
        background:
          typeof template.background === 'string'
            ? template.background
            : (template.background as StaticImageData).src,
        width: template.width,
        height: template.height,
      },
    })
    updateSettings({
      background:
        typeof template.background === 'string'
          ? template.background
          : (template.background as StaticImageData).src,
    })
  }
  const handleFontChange = (value: string) => {
    updateSettings({ fontFamily: value })
  }

  const handleColorChange = (value: string) => {
    updateSettings({ primaryColor: value })
  }

  return (
    <div className="relative">
      {/* {showPreview && (<Preview/>)} */}
      <div className="flex justify-between  mb-4">
        {/* <h2 className="text-xl font-bold">Preview Section</h2> */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowPages(!showPages)}
            // disabled={isDownloading}
            className={`
             bg-gradient-to-r from-blue-500 to-indigo-500
           shadow-lg  items-center gap-2  
          px-5 py-2 flex text-white rounded-full font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-0.5  `}
            title="Fullscreen Preview"
          >
            <>
              <Fullscreen size={20} />
              {/* Preview */}
            </>
          </button>
          <button
            onClick={exportAsPDF}
            disabled={isDownloading}
            className={`$
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
          <button
            onClick={() => setShowDrawer(true)}
            className="bg-gradient-to-r from-green-500 to-blue-500 shadow-lg items-center gap-2 px-5 py-2 flex text-white rounded-full font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            title="Customize Style"
          >
            Customize Style
          </button>
        </div>
      </div>

      {/* Drawer for font/color selection */}
      <StyleDrawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        selectedFont={biodata.settings.fontFamily || ''}
        selectedColor={biodata.settings.primaryColor || ''}
        onFontChange={handleFontChange}
        onColorChange={handleColorChange}
      />

      <A4PDFPreview
        component={<Template1PDF />}
        background={
          typeof biodata.settings.template?.background === 'string'
            ? biodata.settings.template?.background
            : (
                biodata.settings.template
                  ?.background as unknown as StaticImageData
              )?.src || ''
        }
        pagesShown={showPages ? 'all' : 1}
        scale={1}
      ></A4PDFPreview>

      <div className="space-y-1 ">
        <h3 className="text-lg font-medium">Select Template</h3>
        <p className="text-sm text-gray-500">
          Choose a design template for your biodata.
        </p>

        <div className="flex flex-wrap justify-evenly  gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                Number(settings.template?.id) === template.id
                  ? 'border-[#D40000] ring-2 ring-[#D40000]/30'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelectTemplate(template)}
            >
              <Image
                src={template.background as StaticImageData}
                alt=""
                width={96}
                height={128}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreviewSection
