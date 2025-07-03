"use client"
import React from 'react'
import A4PDFPreview from '../BiodataCreator/PDFConverter'
import Template1PDF from '../templates/layout_1'
import { StaticImageData } from 'next/image'
import { useBiodata } from '@/context/BiodataContext'
import { usePreviewModal } from '@/context/PreviewModalContext'

const PreviewModal: React.FC = () => {
  const { open, closeModal } = usePreviewModal()
  const { biodata } = useBiodata()
  if (!open) return null
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl relative overflow-auto ">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={closeModal}
          aria-label="Close preview"
        >
          &times;
        </button>
        <A4PDFPreview
          component={<Template1PDF />}
          background={
            typeof biodata.settings.background === 'string'
              ? biodata.settings.background
              : (biodata.settings.background as unknown as StaticImageData)
                  ?.src || ''
          }
                  pagesShown={'all'}
                  scale={2}
        />
      </div>
    </div>
  )
}

export default PreviewModal
