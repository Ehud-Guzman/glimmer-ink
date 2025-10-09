import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const ContactOptions = ({ contactOptions }) => {
  return (
    <SectionWrapper
      title="Let's Create Together"
      subtitle="Multiple ways to start your project with us"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactOptions.map((option, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className={`bg-gradient-to-br ${option.color} p-0.5 rounded-2xl shadow-xl`}
          >
            <div className="bg-[var(--current-bg)] h-full rounded-[15px] p-6 flex flex-col">
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="text-xl font-bold">{option.title}</h3>
              <p className="opacity-80 mb-4 text-sm flex-grow">
                {option.description}
              </p>
              <button
                className={`px-5 py-2.5 bg-gradient-to-r ${option.color} text-white rounded-lg hover:opacity-90 transition-opacity text-sm`}
              >
                {option.action}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ContactOptions;