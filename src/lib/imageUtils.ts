import { useState } from "react";

// utils/imageUtils.ts
export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  export const convertUrlToBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error(`Failed to convert image: ${error}`);
    }
  };
  
  // Usage in your component:
  export const useImageConversion = () => {
    const [images, setImages] = useState<{[key: string]: string}>({});
    
    const loadImage = async (key: string, source: string | File) => {
      try {
        let base64: string;
        
        if (typeof source === 'string') {
          // If it's already base64, use as is
          if (source.startsWith('data:')) {
            base64 = source;
          } else {
            // Convert URL to base64
            base64 = await convertUrlToBase64(source);
          }
        } else {
          // Convert File to base64
          base64 = await convertImageToBase64(source);
        }
        
        setImages(prev => ({ ...prev, [key]: base64 }));
        return base64;
      } catch (error) {
        console.error(`Failed to load image ${key}:`, error);
        return null;
      }
    };
    
    return { images, loadImage };
  };