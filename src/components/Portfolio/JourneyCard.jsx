import { motion } from "framer-motion";

const JourneyCard = ({ project, alignRight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: alignRight ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col md:flex-row ${
        alignRight ? "md:flex-row-reverse" : ""
      } items-center gap-6 md:gap-10 my-16 md:my-32`} // Reduced gap on mobile
    >
      {/* Image - Smaller on mobile */}
      <div className="w-full md:w-1/2 relative">
        <div className="rounded-xl overflow-hidden shadow-neon hover:shadow-lg transition-all duration-300">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 md:h-64 object-cover" // Fixed height on mobile, taller on desktop
          />
        </div>
      </div>

      {/* Content - Optimized for mobile */}
      <div className="w-full md:w-1/2 relative z-10 text-[var(--current-text)] text-left transition-colors duration-300 px-4 md:px-0">
        <h3 className="text-xl md:text-3xl font-display font-semibold mb-3"> {/* Smaller on mobile */}
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 text-sm md:text-base leading-relaxed"> {/* Smaller on mobile */}
          {project.description}
        </p>
        <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 italic"> {/* Smaller on mobile */}
          {project.stack.join(" • ")}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-bold hover:shadow-lg hover:bg-primary/90 transition-all w-full md:w-auto text-center" // Full width on mobile
          >
            Visit Live Site
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default JourneyCard;