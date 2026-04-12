import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const ServiceFAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Timelines vary based on project complexity. A small website takes 2-4 weeks, medium web applications 6-12 weeks, and larger systems 3-6 months. I provide detailed timelines after the discovery phase.",
    },
    {
      question: "How do you handle project management and communication?",
      answer: "I keep things simple and direct — you'll get regular progress updates and clear check-ins at each milestone. I'm available via email or scheduled calls throughout the project.",
    },
    {
      question: "What's included in post-launch support?",
      answer: "My support includes bug fixes, minor updates, and performance checks. I offer 30 days of free support after launch, with optional ongoing maintenance for continued updates and improvements.",
    },
    {
      question: "Do you provide hosting and maintenance services?",
      answer: "Yes, I can assist with deployment on platforms like Vercel, Netlify, DigitalOcean, or your preferred provider. Ongoing maintenance is available as a separate arrangement after launch.",
    },
    {
      question: "Can you work with existing codebases or systems?",
      answer: "Absolutely. I can audit, refactor, or extend existing applications, and integrate new features while keeping the codebase clean and maintainable.",
    },
    {
      question: "What's your payment structure?",
      answer: "I offer flexible options: fixed-price for defined scopes or milestone-based for larger projects. Typically I require 30% upfront, 40% at a mid-project milestone, and 30% upon completion.",
    },
    {
      question: "How do you ensure code quality?",
      answer: "I follow clean code practices, test thoroughly before delivery, and document key parts of the codebase. Performance, responsiveness, and cross-browser compatibility are standard parts of the QA process.",
    },
    {
      question: "What if I need to make changes during development?",
      answer: "Minor adjustments are part of the process. For significant scope changes, I'll discuss the impact on timeline and cost openly so there are no surprises.",
    },
  ];

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.text = JSON.stringify(schema);

    const existing = document.getElementById("faq-schema");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("faq-schema");
      if (s) s.remove();
    };
  }, []);

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
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
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
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
        >
          Ask a Question
        </a>
      </div>
    </section>
  );
};

export default ServiceFAQs;