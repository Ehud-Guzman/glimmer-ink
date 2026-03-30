// components/Home/ProcessSection.jsx (updated with your palette)
import { motion } from "framer-motion";

const steps = [
  {
    title: "Discover & Structure",
    description: "We define the goal, audience, and content flow so the project feels clear before design and development begin.",
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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-background-dark" />
      
     

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
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
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark -translate-y-1/2" />
          
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
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary dark:bg-primary-dark text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {i + 1}
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary dark:bg-primary/20 dark:text-primary-light">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center text-text-light dark:text-text-dark">
                    {step.title}
                  </h3>
                  
                  <p className="text-text-light/70 dark:text-text-dark/70 mb-6 text-center">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-primary dark:text-primary-light mr-2" fill="currentColor" viewBox="0 0 20 20">
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
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 dark:bg-primary/20 rounded-full">
            <span className="text-primary dark:text-primary-light font-medium">Transparent Process</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-muted">Clear Milestones</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-muted">Flexible Collaboration</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
