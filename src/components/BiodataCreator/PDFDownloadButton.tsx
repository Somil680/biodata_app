'use client';

import React, { useState, useEffect } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import Template1PDF from '../templates/Template1PDF';
import { Biodata } from '@/lib/type';
import setupPolyfills from './polyfill';
import PDFBackgroundImageLoader from './PDFBackgroundImageLoader';

interface PDFDownloadButtonProps {
  biodata: Biodata;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ biodata }) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  
  // Handle background image loading
  const handleImageLoaded = (base64: string) => {
    setBackgroundImage(base64);
  };
  
  useEffect(() => {
    // Setup polyfills for TextEncoder/TextDecoder
    setupPolyfills();
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <button 
        className="bg-gray-100 text-gray-600 px-4 py-2 rounded cursor-wait"
        disabled
      >
        Loading...
      </button>
    );
  }
  
  // If we don't have the background image yet, show loading and load it
  if (!backgroundImage) {
    return (
      <>
        <button 
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded cursor-wait"
          disabled
        >
          Loading assets...
        </button>
        <PDFBackgroundImageLoader 
          onImageLoaded={handleImageLoaded}
          imagePath="/images/template-previews/bg.png"
        />
      </>
    );
  }
  
  return (
    <BlobProvider document={<Template1PDF biodata={biodata} backgroundImage={backgroundImage} />}>
      {({ blob, url, loading, error: pdfError }) => {
        if (pdfError) {
          return (
            <button 
              className="bg-red-100 text-red-600 px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              PDF Generation Failed
            </button>
          );
        }
        
        if (loading) {
          return (
            <button 
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded cursor-wait"
              disabled
            >
              Generating PDF...
            </button>
          );
        }
        
        return (
          <a
            href={url || '#'}
            download={`biodata-${biodata.personalInformation?.fullName || 'profile'}.pdf`}
            className="bg-green-500 text-white px-4 py-2 rounded inline-block"
          >
            Download PDF
          </a>
        );
      }}
    </BlobProvider>
  );
};

export default PDFDownloadButton; 