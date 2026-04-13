import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const ContactTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Victor Mwangi",
      role: "Manager, Vittorios Trades",
      content: "GlimmerInk handled our website with care and professionalism. Communication was smooth, and the final result felt clean and easy to use.",
      rating: 5,
      project: "Business Website",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Feedback Highlights
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A few short notes that reflect the kind of experience I aim to deliver.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="overflow-hidden">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <Quote className="w-10 h-10 text-primary/20 dark:text-primary-light/20 mb-6" />
            
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">
              "{testimonials[activeIndex].content}"
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {testimonials[activeIndex].role}
                </p>
                <p className="text-primary dark:text-primary-light text-sm font-medium mt-1">
                  {testimonials[activeIndex].project}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation — only shown when there are multiple testimonials */}
        {testimonials.length > 1 && <div className="flex items-center justify-center gap-4 mt-8">
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
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial from ${t.name}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-primary dark:bg-primary-light w-6"
                    : "bg-gray-300 dark:bg-gray-600"
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
        </div>}
      </div>
    </section>
  );
};

export default ContactTestimonials;
