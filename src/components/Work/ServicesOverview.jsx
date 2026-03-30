import { motion } from "framer-motion";

const ServicesOverview = () => {
  const services = [
    {
      title: "Business Websites",
      description: "Professional websites designed to present services clearly, build trust, and support enquiries.",
      icon: "🌐",
      tech: ["React", "Tailwind", "Responsive UI", "SEO Basics"],
    },
    {
      title: "Dashboard Interfaces",
      description: "Clean dashboard concepts and internal interfaces focused on usability, structure, and clarity.",
      icon: "📊",
      tech: ["React", "Vite", "Chart UI", "Role-based Layouts"],
    },
    {
      title: "Business Systems",
      description: "Practical system concepts for schools, legal teams, clinics, and other operational workflows.",
      icon: "💼",
      tech: ["Node.js", "PostgreSQL", "GraphQL", "Prisma"],
    },
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Core Project Focus
          </h2>
          <p className="text-lg text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
            The portfolio is centered around websites, systems, and polished front-end product builds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-background-light dark:bg-gray-700 rounded-xl p-6 border border-border-light dark:border-gray-600 hover:border-primary/20 dark:hover:border-primary/40 transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-text-muted dark:text-gray-300 mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white dark:bg-gray-600 text-xs rounded-full"
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

export default ServicesOverview;
