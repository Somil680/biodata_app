'use client'
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const templates = [
  {
    id: 'traditional',
    name: 'Traditional Elegance',
    description: 'A classic design with traditional cultural elements, perfect for conservative families.',
    image: '/template-traditional.jpg', // Placeholder - would need actual design images
    features: ['Cultural design', 'Traditional layout', 'Elegant typography'],
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with a minimalist approach for a professional look.',
    image: '/template-modern.jpg', // Placeholder
    features: ['Sleek design', 'Professional look', 'Modern typography'],
  },
  {
    id: 'fusion',
    name: 'Cultural Fusion',
    description: 'Combines traditional elements with modern aesthetics for the perfect blend.',
    image: '/template-fusion.jpg', // Placeholder
    features: ['Blend of styles', 'Creative layout', 'Unique design'],
  },
  {
    id: 'premium',
    name: 'Premium Gold',
    description: 'Luxury design with gold accents and premium styling for an impressive presentation.',
    image: '/template-premium.jpg', // Placeholder
    features: ['Premium look', 'Gold accents', 'Luxury finish'],
  }, 
];

const TemplatesSection = () => {
  const [currentTemplate, setCurrentTemplate] = useState(0);

  const handlePrevTemplate = () => {
    setCurrentTemplate((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const handleNextTemplate = () => {
    setCurrentTemplate((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="templates" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Beautiful Templates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from a variety of carefully crafted templates that blend tradition with modern design
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative pb-16"
        >
          {/* Background decorative elements */}
          <div className="absolute w-full h-full max-w-5xl mx-auto inset-0">
            <div className="absolute top-1/4 left-0 w-24 h-24 rounded-full bg-orange-100 blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/4 right-0 w-32 h-32 rounded-full bg-emerald-100 blur-3xl opacity-50"></div>
          </div>

          {/* Template display area */}
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Template preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-3 md:p-6 aspect-[3/4] overflow-hidden relative">
                {/* This would be the template preview image */}
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-orange-600 mb-2">Template Preview</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{templates[currentTemplate].name}</h3>
                    <p className="text-gray-600 text-sm px-4">{templates[currentTemplate].description}</p>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-2">
                <button
                  onClick={handlePrevTemplate}
                  className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextTemplate}
                  className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Template details */}
            <div className="p-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{templates[currentTemplate].name}</h3>
              <p className="text-gray-600 mb-8">{templates[currentTemplate].description}</p>

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Key Features</h4>
                <ul className="space-y-3">
                  {templates[currentTemplate].features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle size={18} className="text-orange-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                Use This Template
              </button>
            </div>
          </div>

          {/* Template indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTemplate(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTemplate ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesSection;