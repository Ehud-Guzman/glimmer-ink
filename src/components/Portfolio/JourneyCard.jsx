import { motion } from "framer-motion";

const JourneyCard = ({ project, alignRight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: alignRight ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Added margin to trigger animation sooner
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col md:flex-row ${
        alignRight ? "md:flex-row-reverse" : ""
      } items-center gap-6 md:gap-10 my-12 md:my-20`} // Reduced gap and margin for mobile
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <div className="rounded-xl overflow-hidden shadow-neon hover:shadow-lg transition-all duration-300">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 md:h-64 object-cover" // Added fixed height for consistency
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 text-[var(--current-text)] text-center md:text-left transition-colors duration-300 px-4"> {/* Added padding for mobile */}

        <h3 className="text-xl md:text-3xl font-display font-semibold mb-3"> {/* Smaller text on mobile */}
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 text-sm md:text-base leading-relaxed"> {/* Smaller text on mobile */}
          {project.description}
        </p>
        <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 italic"> {/* Smaller text on mobile */}
          {project.stack.join(" • ")}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 rounded-lg bg-primary text-white font-bold hover:shadow-lg hover:bg-primary/90 transition-all text-sm md:text-base w-full md:w-auto text-center" // Full width on mobile
          >
            View Live Site
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default JourneyCard;