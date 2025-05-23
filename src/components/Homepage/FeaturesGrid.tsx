'use client'
import { motion } from 'framer-motion';
import { PenSquare, Printer, Sparkles, Globe, Shield, Clock } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors duration-300">
        <motion.div 
          animate={{ rotate: [0, 5, 0, -5, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        >
          {icon}
        </motion.div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeaturesGrid = () => {
const features = [
  {
      icon: <PenSquare size={24} />,
      title: 'Fully Customizable',
      description: 'Personalize every aspect of your biodata from layout to colors, fonts, and sections.',
      delay: 0.1,
    },
    {
      icon: <Printer size={24} />,
      title: 'Print-Ready Formats',
      description: 'Download your biodata in high-resolution PDF or image formats, optimized for printing.',
      delay: 0.2,
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Traditional & Modern Designs',
      description: 'Choose from a variety of templates ranging from traditional cultural designs to modern formats.',
      delay: 0.3,
    },
    {
      icon: <Globe size={24} />,
      title: 'Multiple Languages',
      description: 'Create biodatas in multiple languages with full support for regional fonts and formatting.',
      delay: 0.4,
    },
    {
      icon: <Shield size={24} />,
      title: 'Privacy Focused',
      description: 'Your data never leaves your device - we process everything locally for maximum privacy.',
      delay: 0.5,
    },
    {
      icon: <Clock size={24} />,
      title: 'Quick & Easy',
      description: 'Create a beautiful, professional biodata in minutes with our intuitive interface.',
      delay: 0.6,
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-300/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-300/5 rounded-full blur-3xl"></div>
      
      {/* Animated decorative shapes */}
      <motion.div 
        className="absolute top-20 right-10 w-20 h-20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M20,50 L50,20 L80,50 L50,80 L20,50 Z" 
            stroke="#FF8C00" 
            strokeWidth="2" 
            strokeOpacity="0.3" 
            strokeDasharray="245"
            initial={{ strokeDashoffset: 245 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            fill="none"
          />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 w-16 h-16 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.circle 
            cx="50" 
            cy="50" 
            r="30" 
            stroke="#00A67C" 
            strokeWidth="2" 
            strokeOpacity="0.3" 
            strokeDasharray="190"
            initial={{ strokeDashoffset: 190 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
            fill="none"
          />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Why Choose Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our biodata maker combines tradition with modern technology to create the perfect matrimonial profile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
        
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 px-8 py-4 rounded-lg relative"
          >
            <div className="absolute -top-3 -right-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Sparkles size={14} className="text-orange-500" />
                </div>
              </motion.div>
            </div>
            <p className="text-center text-gray-700 font-medium">
              Join thousands of users creating beautiful matrimonial biodatas
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
