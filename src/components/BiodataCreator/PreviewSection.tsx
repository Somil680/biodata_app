'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useBiodata } from '@/context/BiodataContext';
import Template1 from '../templates/Template1';
import dynamic from 'next/dynamic';

// Import the download button component (this is a safer component that uses BlobProvider)
const PDFDownloadButton = dynamic(
  () => import('./PDFDownloadButton'),
  { ssr: false }
);

// Dynamically import the PDFViewer component with fallback handling
const PDFViewerComponent = dynamic(
  () => import('./PDFViewer').catch(err => {
    console.error('Error loading PDFViewer:', err);
    // Return a minimal component that won't break the app
    return () => (
      <div className="flex items-center justify-center h-[800px] border border-gray-300 rounded-lg bg-red-50">
        <div className="text-center p-6">
          <h3 className="text-red-600 font-bold text-lg mb-2">Failed to load PDF viewer</h3>
          <p className="text-gray-800">
            There was an issue loading the PDF viewer. Please try the HTML view instead.
          </p>
        </div>
      </div>
    );
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[800px] border border-gray-300 rounded-lg">
        <p>Loading PDF viewer...</p>
      </div>
    )
  }
);

const PreviewSection: React.FC = () => {
  const { biodata, dispatch } = useBiodata();
  const componentRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'html' | 'pdf'>('pdf');
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    console.log('PreviewSection rendered', biodata);
  }, [biodata]);
  
  // Check if biodata exists
  if (!biodata) {
    return <div className="text-red-500 p-4 border border-red-500">No biodata available</div>;
  }
  
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Preview Section</h2>
        <div className="flex space-x-3">
          {/* <div className="flex border rounded overflow-hidden">
            <button 
              className={`px-3 py-1 ${viewMode === 'html' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => {
                setViewMode('html');
                setPdfError(null);
              }}
            >
              HTML
            </button>
            <button 
              className={`px-3 py-1 ${viewMode === 'pdf' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => {
                setViewMode('pdf');
                setPdfError(null);
              }}
            >
              PDF
            </button>
          </div> */}
          {/* {viewMode === 'html' && (
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handlePrint}
            >
              Print
            </button>
          )} */}
          {viewMode === 'pdf' && (
            <PDFDownloadButton biodata={biodata} />
          )}
        </div>
      </div>

      {pdfError && viewMode === 'pdf' && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
          <p>{pdfError}</p>
          <p className="text-sm mt-1">Please use the HTML view instead.</p>
        </div>
      )}

      {viewMode === 'html' ? (
        /* HTML Printable component */
        <div ref={componentRef} className="print-content">
          <Template1 biodata={biodata} />
        </div>
      ) : (
        /* PDF Preview component with warning */
        <>
          <div className="mb-4 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded">
            <p>
              <strong>Note:</strong> If the PDF viewer below doesn't load, please use the "Download PDF" 
              button to save and view the document offline.
            </p>
          </div>
          <PDFViewerComponent biodata={biodata} />
        </>
      )}
    </div>
  );
};

export default PreviewSection;