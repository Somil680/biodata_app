"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreviewModalContextType {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const PreviewModalContext = createContext<PreviewModalContextType | undefined>(undefined);

export const usePreviewModal = () => {
  const context = useContext(PreviewModalContext);
  if (!context) throw new Error('usePreviewModal must be used within a PreviewModalProvider');
  return context;
};

export const PreviewModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ open:", open)
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <PreviewModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </PreviewModalContext.Provider>
  );
};
