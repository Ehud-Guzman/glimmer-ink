// components/Home/ProcessSection.jsx (updated with your palette)
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Discover & Structure",
    description: "I define the goal, audience, and content flow so the project feels clear before design and development begin.",
    icon: "01",
    details: ["Project direction", "Page structure", "Scope and priorities"]
  },
  {
    title: "Design & Build",
    description: "I create the interface, refine the details, and build the front end with a strong focus on clarity, polish, and responsiveness.",
    icon: "02",
    details: ["Visual design", "Responsive implementation", "QA and refinement"]
  },
  {
    title: "Launch & Improve",
    description: "The final product is prepared for launch with performance checks, clean handoff, and room for future upgrades.",
    icon: "03",
    details: ["Deployment setup", "Performance pass", "Post-launch support"]
  },
];

const ProcessSection = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-background-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="inline-block mb-3 text-sm font-semibold uppercase tracking-wider text-primary dark:text-primary-light"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How I Work
          </motion.span>
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-text-light dark:text-text-dark">Development </span>
            <span className="text-primary dark:text-primary-light">Process</span>
          </motion.h2>
          <motion.p
            className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A simple, transparent workflow that keeps projects clear, polished, and practical.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line — sits behind the cards, only visible in the gaps */}
          <div
            className="hidden md:block absolute left-0 right-0 top-[46px] border-t-2 border-dashed border-gray-200 dark:border-gray-800"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-card hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary dark:bg-primary/20 dark:text-primary-light">
                    {step.icon}
                  </div>

                  <h3 className="font-display text-xl font-bold mb-2.5 text-text-light dark:text-text-dark">
                    {step.title}
                  </h3>

                  <p className="text-text-light/70 dark:text-text-dark/70 mb-5 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-2 pt-5 border-t border-gray-100 dark:border-gray-800">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-primary dark:text-primary-light mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-text-light/80 dark:text-text-dark/80">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Transparent Process", "Clear Milestones", "Flexible Collaboration"].map((label) => (
              <span
                key={label}
                className="text-sm font-medium px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 text-text-light/80 dark:text-text-dark/80"
              >
                {label}
              </span>
            ))}
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/80 transition-colors"
          >
            More about how I work
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
