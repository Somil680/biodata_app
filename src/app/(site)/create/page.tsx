// src/app/(site)/create/page.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BiodataProvider } from '@/context/BiodataContext';
import BiodataCreator from '@/components/BiodataCreator';

export default function CreateBiodataPage() {
  return (
    <div className="relative py-16 md:py-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 transform translate-x-1/3 -translate-y-1/3 -z-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FF9D00" d="M39.9,-65.1C49.2,-57.4,52.5,-42,58.5,-28.5C64.5,-15,73.3,-3.3,74.1,9.1C74.9,21.5,67.8,34.7,57.7,44.7C47.6,54.7,34.5,61.6,20.1,68.3C5.7,75,-10,81.4,-24.4,78.8C-38.8,76.2,-51.8,64.6,-59.1,50.6C-66.3,36.5,-67.8,20,-70.3,3.1C-72.8,-13.7,-76.4,-30.9,-70.3,-44C-64.2,-57,-48.3,-65.8,-33.2,-70.6C-18,-75.4,-3.7,-76.1,8.7,-72C21.1,-67.9,30.6,-72.9,39.9,-65.1Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Create Your Biodata</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow the steps below to create your personalized biodata. You can save it as a PDF,
            share it online, or print it out for matrimonial purposes.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BiodataProvider>
            <BiodataCreator />
          </BiodataProvider>
        </motion.div>
      </div>
    </div>
  );
}