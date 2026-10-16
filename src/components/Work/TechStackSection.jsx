import { motion } from "@/utils/motion";

// The stack used across the projects in this portfolio. Add a technology here
// only once it has shipped in a real project.
const categories = [
  {
    label: "Frontend",
    color: "text-blue-600 dark:text-blue-400",
    bar: "bg-blue-500",
    techs: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend & APIs",
    color: "text-green-600 dark:text-green-400",
    bar: "bg-green-500",
    techs: ["Node.js", "REST APIs", "Admin dashboards"],
  },
  {
    label: "Deployment",
    color: "text-orange-600 dark:text-orange-400",
    bar: "bg-orange-500",
    techs: ["Netlify", "Git & GitHub"],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Technologies I Build With
          </h2>
          <p className="text-text-muted dark:text-gray-400 max-w-xl mx-auto">
            A focused stack, chosen for what works in production rather than for chasing trends.
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="grid grid-cols-1 sm:grid-cols-[160px_1fr] md:grid-cols-[180px_1fr] items-start gap-2 sm:gap-4 md:gap-8"
            >
              <div className="pt-1.5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cat.bar}`} />
                <span className={`text-sm font-semibold ${cat.color}`}>{cat.label}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-background-light dark:bg-gray-700 border border-border-light dark:border-gray-600 rounded-lg text-sm font-medium hover:border-primary/40 dark:hover:border-primary/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
