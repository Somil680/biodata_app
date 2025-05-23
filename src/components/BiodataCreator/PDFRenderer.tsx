'use client';

import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Template1 from '../templates/Template1';
import { Biodata } from '@/lib/type';

interface PDFRendererProps {
  biodata: Biodata;
}

const PDFRenderer: React.FC<PDFRendererProps> = ({ biodata }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-[800px] border border-gray-300 rounded-lg">
        <p>Loading PDF preview...</p>
      </div>
    );
  }

  return (
    <PDFViewer
      showToolbar={false}
      style={{
        width: '100%',
        height: '800px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <Template1 biodata={biodata} />
    </PDFViewer>
  );
};

export default PDFRenderer; 