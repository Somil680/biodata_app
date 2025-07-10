'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FloatingShapeProps {
  className: string;
  delay: number;
  duration: number;
  x: number;
  y: number;
}

const FloatingShape = ({ className, delay, duration, x, y }: FloatingShapeProps) => (
  <motion.div
    className={`absolute opacity-70 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: 0.7,
      y: [0, y, 0],
      x: [0, x, 0]
    }}
    transition={{ 
      duration: duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50 -z-10"></div>
      
      {/* Animated decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full filter blur-3xl opacity-50 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-orange-400/10 rounded-full filter blur-3xl opacity-50 animate-pulse -z-10"></div>
      
      {/* Floating animated shapes */}
      <FloatingShape 
        className="w-16 h-16 bg-orange-300/20 rounded-full blur-xl" 
        delay={0} 
        duration={5} 
        x={20} 
        y={-30} 
      />
      <FloatingShape 
        className="w-24 h-24 bg-green-300/20 rounded-full blur-xl right-[20%] top-[30%]" 
        delay={1.5} 
        duration={7} 
        x={-30} 
        y={40} 
      />
      <FloatingShape 
        className="w-20 h-20 bg-pink-300/20 rounded-full blur-xl left-[15%] bottom-[20%]" 
        delay={0.8} 
        duration={6} 
        x={40} 
        y={20} 
      />
      
      {/* Animated decorative polygons */}
      <motion.div 
        className="hidden md:block absolute top-[15%] right-[10%] w-16 h-16 border-2 border-orange-300/30 -z-10"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.7, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="hidden md:block absolute bottom-[25%] left-[8%] w-12 h-12 border-2 border-green-300/30 -z-10"
        style={{ borderRadius: "60% 40% 50% 30% / 40% 50% 60% 50%" }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.7, rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Ganesh Icon */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C30 10 20 25 20 40C20 55 30 70 50 70C70 70 80 55 80 40C80 25 70 10 50 10Z" fill="#FF8C00" />
              <path d="M50 20C42 20 35 25 35 35C35 45 42 50 50 50C58 50 65 45 65 35C65 25 58 20 50 20Z" fill="#FFA500" />
              <path d="M50 35C47 35 45 37 45 40C45 43 47 45 50 45C53 45 55 43 55 40C55 37 53 35 50 35Z" fill="#FFFFFF" />
              <path d="M30 40C25 50 30 65 40 75C45 80 55 80 60 75C70 65 75 50 70 40" stroke="#FF8C00" strokeWidth="3" />
              <path d="M45 50C40 55 40 65 45 70" stroke="#FF8C00" strokeWidth="3" />
              <path d="M55 50C60 55 60 65 55 70" stroke="#FF8C00" strokeWidth="3" />
              <path d="M50 50C50 60 50 65 50 70" stroke="#FF8C00" strokeWidth="3" />
              <path d="M40 30C35 25 25 30 20 25" stroke="#FF8C00" strokeWidth="3" />
              <path d="M60 30C65 25 75 30 80 25" stroke="#FF8C00" strokeWidth="3" />
</svg>
          </motion.div> */}
          
          {/* Blessing text */}
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-orange-600 font-medium mb-6"
          >
            ॐ गणेशाय नमः
          </motion.p> */}
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
          >
            Create Your Perfect Biodata
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl"
          >
            Design beautiful, culturally rich matrimonial biodatas that perfectly blend tradition with modernity. Easily customizable, instantly downloadable.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/create"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Create Biodata Now
            </Link>
            <Link 
              href="#templates"
              className="px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-full font-medium hover:bg-orange-50 transition-all duration-300"
            >
              View Templates
            </Link>
          </motion.div>
          
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-100"
            >
              <p className="text-sm text-gray-700 font-medium flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Trusted by 10,000+ families for creating matrimonial biodatas
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
  
export default HeroSection;