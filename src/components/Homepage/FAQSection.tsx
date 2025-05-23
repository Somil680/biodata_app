'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, index }: FAQItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="border-b border-orange-100 overflow-hidden"
    >
      <button
        onClick={onClick}
        className="w-full py-5 px-4 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="flex-shrink-0 text-orange-500" size={20} />
        ) : (
          <ChevronDown className="flex-shrink-0 text-gray-400" size={20} />
        )}
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          marginBottom: isOpen ? 16 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="px-4 overflow-hidden"
      >
        <p className="text-gray-600 pb-5">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "What is a biodata and why do I need one?",
      answer: "A biodata is a matrimonial resume that includes personal details, family information, education, profession, and preferences for a life partner. It's commonly used in arranged marriage processes to share information with potential matches and their families."
    },
    {
      question: "Can I create a biodata in multiple languages?",
      answer: "Yes, our platform supports multiple languages including English, Hindi, Gujarati, Tamil, Telugu, and more. You can create and download your biodata in any of these languages with proper font support."
    },
    {
      question: "How do I download my biodata after creating it?",
      answer: "Once you've filled in your information and customized your template, you can download your biodata in PDF or high-resolution image formats by clicking the 'Download' button. Both formats are print-ready and can be shared digitally."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. Your privacy is our priority. All processing happens locally on your device, and we don't store any of your personal information on our servers. Your data never leaves your device."
    },
    {
      question: "Can I edit my biodata after creating it?",
      answer: "Yes, you can edit your biodata anytime. Your information is saved locally in your browser. For added convenience, you can create an account to save and access your biodatas across devices."
    },
    {
      question: "What templates are available for different communities?",
      answer: "We offer a variety of templates designed for different communities and preferences. From traditional designs with cultural elements to modern, minimalist layouts, we have templates that cater to various aesthetic preferences and cultural backgrounds."
    },
    {
      question: "Do I need to pay to create and download my biodata?",
      answer: "We offer both free and premium options. The basic functionality is completely free, allowing you to create and download a standard biodata. Premium features include additional templates, advanced customization options, and the ability to save multiple biodatas."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about creating and using your biodata
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleItem(index)}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-gray-600">
            Have more questions? <a href="#contact" className="text-orange-500 font-medium hover:underline">Contact us</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;