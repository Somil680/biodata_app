'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Twitter, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-gray-900 text-white">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-orange-500 to-transparent"></div>
        
        {/* Paisley pattern (stylized) */}
        <div className="absolute top-10 left-10 w-40 h-40 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FF9D00" d="M39.9,-65.1C49.2,-57.4,52.5,-42,58.5,-28.5C64.5,-15,73.3,-3.3,74.1,9.1C74.9,21.5,67.8,34.7,57.7,44.7C47.6,54.7,34.5,61.6,20.1,68.3C5.7,75,-10,81.4,-24.4,78.8C-38.8,76.2,-51.8,64.6,-59.1,50.6C-66.3,36.5,-67.8,20,-70.3,3.1C-72.8,-13.7,-76.4,-30.9,-70.3,-44C-64.2,-57,-48.3,-65.8,-33.2,-70.6C-18,-75.4,-3.7,-76.1,8.7,-72C21.1,-67.9,30.6,-72.9,39.9,-65.1Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#00A672" d="M43.4,-61.8C59.6,-56.3,78,-50,85.4,-37.1C92.9,-24.1,89.4,-4.5,79.8,8.7C70.3,21.9,54.8,28.7,42.2,38.5C29.7,48.3,20.2,61.1,5.1,67.1C-10,73.1,-30.7,72.2,-48.8,63.9C-67,55.7,-82.5,40.2,-87.6,22.1C-92.7,3.9,-87.2,-16.7,-77.3,-34.7C-67.5,-52.7,-53.1,-68.1,-37.4,-74.1C-21.7,-80,-10.8,-76.6,1.2,-73.2C13.2,-69.8,27.2,-67.3,43.4,-61.8Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-1"
          >
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 text-transparent bg-clip-text">
                BiodataMaker
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              Create beautiful, culturally rich matrimonial biodatas for your perfect match. Traditional designs meet modern technology.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#templates" className="text-gray-400 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="text-orange-400 mr-2" />
                <a href="mailto:contact@biodatamaker.com" className="text-gray-400 hover:text-white transition-colors">
                  contact@biodatamaker.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-orange-400 mr-2" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BiodataMaker. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-pink-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;