'use client';

import React, { useEffect, useState } from 'react';

interface PDFBackgroundImageLoaderProps {
  onImageLoaded: (base64: string) => void;
  imagePath: string;
}

// This is a light watermark pattern that will look good in the background
const FALLBACK_IMAGE = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHg9IjAiIHk9IjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZmZmYiLz4KICAgICAgPHRleHQgeD0iMzAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNlZWVlZWUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5CaW9kYXRhPC90ZXh0PgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=`;

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
        
        // If the image doesn't exist or there's an error, use a fallback data URL
        if (!response.ok) {
          console.warn(`Image not found at ${imageUrl}, using fallback`);
          onImageLoaded(FALLBACK_IMAGE);
          return;
        }
        
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
        // Use fallback on error
        onImageLoaded(FALLBACK_IMAGE);
      }
    };
    
    loadImage();
  }, [imagePath, onImageLoaded]);
  
  // This component doesn't render anything
  return null;
};

export default PDFBackgroundImageLoader; 