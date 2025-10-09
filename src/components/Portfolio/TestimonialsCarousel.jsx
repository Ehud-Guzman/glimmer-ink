// components/Portfolio/TestimonialsCarousel.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialsCarousel = ({ portfolioItems, activeTestimonial, goToTestimonial }) => {
  // Autoplay every 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      goToTestimonial((activeTestimonial + 1) % portfolioItems.length);
    }, 8000);
    return () => clearTimeout(timer);
  }, [activeTestimonial]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goToTestimonial((activeTestimonial + 1) % portfolioItems.length);
      if (e.key === "ArrowLeft") goToTestimonial((activeTestimonial - 1 + portfolioItems.length) % portfolioItems.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeTestimonial]);

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--current-nav)] to-[var(--current-bg)]">
      {/* Cosmic Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full animate-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-tertiary/10 blur-[80px] rounded-full animate-float" />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              Voices of Trust
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--current-text)]">
            Client <span className="text-primary">Echoes</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80 leading-relaxed">
            Real impact through <span className="font-semibold text-primary">authentic partnerships</span> — not just transactions.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence>
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-[var(--current-nav)] rounded-3xl shadow-2xl p-10"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Client Info */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                    <div className="w-full h-full rounded-full bg-[var(--current-nav)] overflow-hidden">
                      <img
                        src={portfolioItems[activeTestimonial].clientLogo}
                        alt={portfolioItems[activeTestimonial].client}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="font-semibold text-base">
                      {portfolioItems[activeTestimonial].client}
                    </h4>
                    <p className="text-sm opacity-70">
                      {portfolioItems[activeTestimonial].testimonial.author}
                    </p>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-lg ${
                          star <= portfolioItems[activeTestimonial].testimonial.rating
                            ? "text-yellow-400"
                            : "text-[var(--current-text)]/20"
                        }`}
                      />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-primary text-2xl mb-4 opacity-20" />
                  <p className="text-base md:text-lg italic mb-6 leading-relaxed opacity-90">
                    {portfolioItems[activeTestimonial].testimonial.text}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-60">
                      Project: {portfolioItems[activeTestimonial].title}
                    </span>
                    <a
                      href={portfolioItems[activeTestimonial].caseStudyLink}
                      className="inline-flex items-center gap-2 text-primary hover:text-[var(--current-text)] transition-colors"
                    >
                      View Case Study <FiArrowRight />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {portfolioItems.map((_, index) => (
              <motion.button
                key={index}
                layout
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeTestimonial
                    ? "bg-primary scale-125"
                    : "bg-[var(--current-text)]/30 hover:bg-[var(--current-text)]/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() =>
              goToTestimonial(
                (activeTestimonial - 1 + portfolioItems.length) % portfolioItems.length
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-4 rounded-full bg-[var(--current-nav)] hover:bg-primary transition-all shadow-xl hover:shadow-primary/30"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={() =>
              goToTestimonial((activeTestimonial + 1) % portfolioItems.length)
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-4 rounded-full bg-[var(--current-nav)] hover:bg-primary transition-all shadow-xl hover:shadow-primary/30"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
