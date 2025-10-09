// components/Portfolio/ProcessSteps.jsx
import { motion } from "framer-motion";

const processSteps = [
  {
    step: 1,
    title: "Plan & Discover",
    description: "We deep-dive into your goals, users, and business logic.",
    activities: ["Tech Stack Decision", "Wireframes", "User Stories"],
  },
  {
    step: 2,
    title: "Code & Build",
    description: "We bring the system to life with modular, scalable code.",
    activities: ["Component Architecture", "API Integration", "Responsive UI"],
  },
  {
    step: 3,
    title: "Test & Polish",
    description: "We squash bugs, refine performance and stress-test UX.",
    activities: ["QA & Debugging", "Performance Tuning", "Accessibility Checks"],
  },
  {
    step: 4,
    title: "Deploy & Support",
    description: "We launch your build and provide post-launch care.",
    activities: ["CI/CD Deployments", "Docs & Handover", "Post-Launch Fixes"],
  },
];

const ProcessSteps = () => {
  return (
    <section id="process" className="relative py-24 bg-[var(--current-nav)] overflow-hidden">
      {/* Glow Grid BG (code-y) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Faint glowing code streak */}
      <div className="absolute bottom-0 left-1/2 w-[80%] h-96 -translate-x-1/2 blur-2xl bg-gradient-to-tr from-[#00ffe1]/30 via-[#0061ff]/20 to-transparent rounded-full z-0 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text bg-gradient-to-r from-primary to-secondary text-transparent">
            Development Workflow
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Our proven web dev pipeline from planning to deployment
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[var(--current-bg)]/10 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--current-bg)]/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-[var(--current-nav)] hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xl font-bold mr-4 shadow-md">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold">
                    {step.title}
                  </h3>
                </div>
                <p className="mb-6 text-lg leading-relaxed">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.activities.map((activity, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      </span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
