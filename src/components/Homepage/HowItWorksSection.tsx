'use client'
import { motion } from 'framer-motion';
import { FileText, Eye, Download } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FileText size={32} className="text-orange-500" />,
      title: 'Fill Your Details',
      description: 'Enter your personal, family, and educational details in our easy-to-use form.',
      delay: 0.2,
    },
    {
      icon: <Eye size={32} className="text-orange-500" />,
      title: 'Preview & Customize',
      description: 'See your biodata in real-time and customize layouts, colors, and styles.',
      delay: 0.4,
    },
    {
      icon: <Download size={32} className="text-orange-500" />,
      title: 'Download & Share',
      description: 'Download your biodata as PDF or image files, ready to print or share digitally.',
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-orange-50 relative">
      {/* Decorative connecting elements between steps */}
      <div className="absolute top-1/2 left-0 right-0 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="relative h-1">
            <div className="absolute w-[70%] h-[2px] bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-4 h-4 rounded-full bg-orange-500 top-1/2 left-[20%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-4 h-4 rounded-full bg-orange-500 top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-4 h-4 rounded-full bg-orange-500 top-1/2 left-[80%] transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creating the perfect biodata is quick and easy with our three-step process
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative z-20"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                {step.icon}
              </div>
              
              <div className="text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-orange-500 text-white font-bold mb-4 flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 