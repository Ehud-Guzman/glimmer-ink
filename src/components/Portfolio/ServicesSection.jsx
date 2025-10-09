import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const ServicesSection = ({ services }) => {
  return (
    <SectionWrapper
      title="Our Services"
      subtitle="Comprehensive creative solutions tailored to your needs"
      className="bg-gradient-to-br from-[var(--current-nav)]/20 to-[var(--current-nav)]/5 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-[var(--current-bg)] p-6 rounded-2xl shadow-lg border border-[var(--current-nav)] hover:border-primary/30 transition-all"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="opacity-80 mb-4 leading-relaxed text-sm">
              {service.description}
            </p>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-medium">
              {service.projects}+ successful projects
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ServicesSection;