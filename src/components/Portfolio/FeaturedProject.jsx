import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const FeaturedProject = ({ project }) => {
  return (
    <SectionWrapper
      title="Featured Project"
      subtitle="An in-depth showcase of our premium work"
      className="bg-[var(--current-bg)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-[var(--current-nav)] rounded-3xl overflow-hidden shadow-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* Image Gallery */}
          <div className="relative bg-primary-dark flex items-center justify-center p-6 lg:min-h-[400px]">
            <img
              src={project.images[0]}
              alt={project.title}
              className="max-h-[400px] w-auto object-contain mx-auto rounded-2xl transition-transform duration-500 ease-in-out hover:scale-105"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`
                    w-3 h-3 rounded-full
                    bg-white/50 
                    hover:bg-white/80 
                    transition-all duration-300 ease-in-out
                    ${idx === 0 ? "bg-white scale-125 shadow-lg shadow-white/60" : ""}
                    focus:outline-none
                    focus:ring-2 focus:ring-white
                  `}
                  aria-label={`Show image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-between h-full">
            <div>
              <div className="mb-4">
                <span className="text-xs font-medium text-primary tracking-wide">
                  {project.category.toUpperCase()}
                </span>
                <h3 className="text-2xl font-bold mt-1 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs opacity-60 mt-1">
                  {project.client} • {project.year}
                </p>
              </div>

              <p className="text-base mb-5 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-5">
                <h4 className="font-semibold text-base mb-2">
                  Project Highlights
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      </div>
                      <span className="capitalize">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[var(--current-bg)]/30 p-4 rounded-xl border border-[var(--current-nav)]">
                <div className="flex items-start">
                  <div className="text-primary text-xl mr-3 mt-1 flex-shrink-0">
                    "
                  </div>
                  <div>
                    <p className="italic mb-3 text-base leading-relaxed">
                      {project.testimonial.text}
                    </p>
                    <p className="font-medium text-sm">
                      {project.testimonial.author}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default FeaturedProject;