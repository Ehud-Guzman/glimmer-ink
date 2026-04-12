import { motion } from "framer-motion";
import { Search, PenTool, Code, TestTube2, Rocket, Settings } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We align on goals, scope, and requirements before a single line is written.",
    duration: "1–2 wks",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Wireframes and UI decisions locked in — no surprises mid-build.",
    duration: "1–2 wks",
  },
  {
    icon: Code,
    title: "Development",
    description: "Milestone-based builds with progress updates throughout.",
    duration: "3–10 wks",
  },
  {
    icon: TestTube2,
    title: "QA & Testing",
    description: "Cross-device testing, bug fixes, and performance checks before launch.",
    duration: "1 wk",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deployment, handover, and a smooth go-live.",
    duration: "1 wk",
  },
  {
    icon: Settings,
    title: "Support",
    description: "30 days free post-launch. Ongoing maintenance available.",
    duration: "Ongoing",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            How a Project Works
          </h2>
          <p className="text-text-muted dark:text-gray-300 max-w-xl mx-auto">
            A clear, structured process from first conversation to launch — and beyond.
          </p>
        </div>

        {/* Desktop — horizontal connected timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-gray-200 dark:bg-gray-700" />

          <div className="grid grid-cols-6 gap-2">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex flex-col items-center text-center px-2"
              >
                {/* Circle */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mb-4 shadow-md">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <step.icon className="w-4 h-4 text-primary dark:text-primary-light mb-2" />
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <span className="text-xs font-medium text-primary dark:text-primary-light mb-2">
                  {step.duration}
                </span>
                <p className="text-xs text-text-muted dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical connected timeline */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="relative flex gap-5"
            >
              {/* Vertical connector */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
              )}

              {/* Circle */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="pb-10">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className="w-4 h-4 text-primary dark:text-primary-light" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                  <span className="text-xs text-primary dark:text-primary-light ml-1">
                    {step.duration}
                  </span>
                </div>
                <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
