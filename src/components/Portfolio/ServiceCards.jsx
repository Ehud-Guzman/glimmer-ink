// components/Portfolio/ServiceCards.jsx
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    icon: "💻",
    description:
      "High-performance, modern, and scalable websites and web apps with clean code and optimal UX.",
    projects: 8,
  },
  {
    title: "Brand Identity",
    icon: "🎨",
    description:
      "Complete visual systems including logos, color palettes, typography, and brand guidelines.",
    projects: 42,
  },
  {
    title: "Print Design",
    icon: "🖨️",
    description:
      "Print-ready designs for brochures, packaging, posters, business cards, and more.",
    projects: 36,
  },
  {
    title: "Digital Design",
    icon: "🧠",
    description:
      "UI/UX for mobile apps, landing pages, ads, and social content optimized for attention.",
    projects: 28,
  },
  {
    title: "Environmental Design",
    icon: "🏢",
    description:
      "Exhibition graphics, signage, retail branding — make physical spaces speak your brand.",
    projects: 15,
  },
];

const ServiceCards = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[var(--current-nav)]/20 to-[var(--current-nav)]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dev-Driven Services
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto mt-2">
            Full-stack creativity from code to content — your vision, our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.12, type: "spring", stiffness: 70 }}
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              className="group bg-[var(--current-bg)] p-8 rounded-2xl shadow-xl border border-[var(--current-nav)] hover:border-primary/40 hover:shadow-primary/20 transition-all"
            >
              <div className="text-5xl mb-6 transition-transform group-hover:rotate-3">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-[var(--current-text)]">
                {service.title}
              </h3>
              <p className="opacity-80 mb-6 leading-relaxed text-[var(--current-text)]">
                {service.description}
              </p>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-medium text-lg">
                {service.projects}+ deployed builds
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
