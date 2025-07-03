import React from 'react'
import { PreviewModalProvider } from '@/context/PreviewModalContext'
import PreviewModal from './PreviewModal'

const Preview = () => {
  return (
    <PreviewModalProvider>
      <div className="flex items-center justify-center ">
        <OpenPreviewButton />
        <PreviewModal />
      </div>
    </PreviewModalProvider>
  )
}

// Button to open the modal using context
import { usePreviewModal } from '@/context/PreviewModalContext'
const OpenPreviewButton: React.FC = () => {
  const { openModal } = usePreviewModal()
  return (
    <button
      className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      onClick={openModal}
    >
      Show Preview
    </button>
  )
}

export default Preview
