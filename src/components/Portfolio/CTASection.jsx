import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/images/dots-pattern.webp')] bg-[length:40px_40px]"></div>
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to start your project?
        </h2>
        <p className="text-lg text-primary mb-8 max-w-2xl mx-auto leading-relaxed">
          Let's create something extraordinary together
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="/contact"
            className="px-8 py-4 bg-white text-primary rounded-xl font-medium hover:bg-white/90 transition-colors shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get a Free Quote
          </motion.a>
          <motion.a
            href="/portfolio"
            className="px-8 py-4 border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 transition-colors shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Portfolio
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;