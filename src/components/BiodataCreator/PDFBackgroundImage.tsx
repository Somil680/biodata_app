'use client';

import React, { useEffect, useState } from 'react';

interface PDFBackgroundImageLoaderProps {
  onImageLoaded: (base64: string) => void;
  imagePath: string;
}

const PDFBackgroundImageLoader: React.FC<PDFBackgroundImageLoaderProps> = ({ 
  onImageLoaded,
  imagePath
}) => {
  useEffect(() => {
    const loadImage = async () => {
      try {
        // Create a full URL from the path
        const imageUrl = `${window.location.origin}${imagePath}`;
        
        // Fetch the image
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onImageLoaded(base64data);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Failed to load background image:', error);
      }
    };
    
    loadImage();
  }, [imagePath, onImageLoaded]);
  
  // This component doesn't render anything
  return null;
};

export default PDFBackgroundImageLoader; 