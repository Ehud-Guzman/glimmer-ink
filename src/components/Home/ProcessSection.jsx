// components/Home/ProcessSection.jsx
import { motion } from "framer-motion";

const steps = [
  {
    title: "Plan & Scope",
    description: "We align your vision with real tech possibilities.",
    icon: "🧠",
  },
  {
    title: "Build & Integrate",
    description: "Frontend meets backend—clean, scalable, secure.",
    icon: "🛠️",
  },
  {
    title: "Deploy & Optimize",
    description: "We launch with polish, then push for performance.",
    icon: "🚀",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-28 bg-[var(--current-bg)] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-pulse-slow">
            Our Development Process
          </h2>
          <p className="text-lg text-[var(--current-text)] opacity-80 max-w-2xl mx-auto">
            From brainstorm to deployment—we engineer premium experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-3xl bg-[var(--current-nav)] text-[var(--current-text)] shadow-xl border border-[var(--current-border)] hover:shadow-primary/30 transition-all backdrop-blur-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="text-5xl mb-5 text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-float">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {step.title}
              </h3>
              <p className="opacity-85 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
