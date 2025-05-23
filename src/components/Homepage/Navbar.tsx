'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                BiodataMaker
              </span>
            </Link>
          </motion.div>
          <div className='flex items-center gap-4'>

          {/* Desktop Navigation Links */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="#features" className="text-gray-700 hover:text-orange-500 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-orange-500 transition-colors">
              How It Works
            </Link>
            <Link href="#templates" className="text-gray-700 hover:text-orange-500 transition-colors">
              Templates
            </Link>
            <Link href="#faq" className="text-gray-700 hover:text-orange-500 transition-colors">
              FAQ
            </Link>
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/create" 
              className="hidden md:inline-block px-5 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              Create Biodata
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                href="#features" 
                className="block text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="block text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#templates" 
                className="block text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                href="#faq" 
                className="block text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/create" 
                className="block w-full text-center py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Biodata
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 