'use client'
import React from 'react'
import { useBiodata } from '@/context/BiodataContext'
import bg from '../../../public/images/template-previews/bg.png'
import temp1 from '../../../public/images/template-previews/template_1.jpg'
import temp2 from '../../../public/images/template-previews/template_2.png'
import { useBiodataSettings } from '@/hooks/useBiodataForm'
import Image, { StaticImageData } from 'next/image'
import A4PDFPreview from './ReacttoPrint'
import Template1PDF from '../templates/Template1PDF'
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

      <div className="container mx-auto p-4">

        <A4PDFPreview
          component={<Template1PDF />}
          filename="biodata.pdf"
          background={
            typeof biodata.settings.background === 'string'
              ? biodata.settings.background
              : (biodata.settings.background as unknown as StaticImageData)
                  ?.src ||
                (typeof bg === 'string' ? bg : (bg as StaticImageData)?.src)
          }
        >
        </A4PDFPreview>
      </div>
    </div>
  )
}

export default PreviewSection
