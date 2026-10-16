import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const ContactTestimonials = ({
  eyebrow = "Client feedback",
  title = "What clients say",
  className = "py-12 md:py-16 px-4 sm:px-6",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className={`${className} max-w-7xl mx-auto`}>
      <div className="text-center mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <motion.figure
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <Quote className="w-9 h-9 text-primary/25 dark:text-primary-light/25 mb-4" aria-hidden="true" />

          <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            &ldquo;{active.content}&rdquo;
          </blockquote>

          <figcaption>
            <div className="font-bold text-gray-900 dark:text-white">{active.name}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">{active.role}</div>
            <div className="text-primary dark:text-primary-light text-sm font-medium mt-1">{active.project}</div>
          </figcaption>
        </motion.figure>

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((t, index) => (
                <button
                  key={t.name}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial from ${t.name}`}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index ? "bg-primary dark:bg-primary-light w-6" : "bg-gray-300 dark:bg-gray-600 w-2"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactTestimonials;
