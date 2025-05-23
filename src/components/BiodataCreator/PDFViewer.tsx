'use client';

import React, { useEffect, useState } from 'react';
import { PDFViewer as ReactPDFViewer } from '@react-pdf/renderer';
import Template1PDF from '../templates/Template1PDF';
import { Biodata } from '@/lib/type';
import { pdf } from '@react-pdf/renderer';
import setupPolyfills from './polyfill';
import PDFBackgroundImageLoader from './PDFBackgroundImageLoader';

interface PDFViewerComponentProps {
  biodata: Biodata;
}

const PDFViewerComponent: React.FC<PDFViewerComponentProps> = ({ biodata }) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  // Handle background image loading
  const handleImageLoaded = (base64: string) => {
    setBackgroundImage(base64);
  };

  useEffect(() => {
    try {
      // Setup polyfills for TextEncoder/TextDecoder
      setupPolyfills();
      
      setIsClient(true);
      console.log('PDFViewer mounted');
      
      // We'll wait for the background image to load before generating the PDF
    } catch (err) {
      console.error('Error in PDFViewer:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  // Generate PDF once background image is loaded
  useEffect(() => {
    if (!backgroundImage) return;
    
    const preparePdf = async () => {
      try {
        await pdf(<Template1PDF biodata={biodata} backgroundImage={backgroundImage} />).toBlob();
        setPdfLoaded(true);
      } catch (err) {
        console.error('Error pre-rendering PDF:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate PDF preview');
      }
    };
    
    preparePdf();
  }, [biodata, backgroundImage]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[800px] border border-gray-300 rounded-lg bg-red-50">
        <div className="text-center p-6">
          <h3 className="text-red-600 font-bold text-lg mb-2">Error Loading PDF Viewer</h3>
          <p className="text-red-800">{error}</p>
          <p className="mt-4 text-sm text-gray-600">
            Try using the Download PDF button above or the Print function from the HTML view.
          </p>
        </div>
      </div>
    );
  }

  if (!isClient || !pdfLoaded) {
    return (
      <div className="flex items-center justify-center h-[800px] border border-gray-300 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading PDF preview...</p>
          {isClient && !backgroundImage && <PDFBackgroundImageLoader 
            onImageLoaded={handleImageLoaded}
            imagePath="/images/template-previews/bg.png"
          />}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">
        Note: If the PDF doesn't appear below, your browser might be blocking it. Try the HTML view and print instead.
      </p>
      <div className="border rounded-lg overflow-hidden">
        <ReactPDFViewer
          showToolbar={true}
          style={{
            width: '100%',
            height: '800px',
          }}
        >
          <Template1PDF biodata={biodata} backgroundImage={backgroundImage} />
        </ReactPDFViewer>
      </div>
    </div>
  );
};

export default PDFViewerComponent; 