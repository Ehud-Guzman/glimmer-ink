import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { serviceFaqs as FAQS } from "@/data/faqs";

const ServiceFAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
          <HelpCircle className="w-4 h-4 text-primary dark:text-primary-light" />
          <span className="text-sm font-medium text-primary dark:text-primary-light">
            Common Questions
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Get answers to common questions about the development process and services
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="font-semibold text-gray-900 dark:text-white">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 ml-4"
              >
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Didn't find what you're looking for?
        </p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
        >
          Ask a Question
        </Link>
      </div>
    </section>
  );
};

export default ServiceFAQs;
