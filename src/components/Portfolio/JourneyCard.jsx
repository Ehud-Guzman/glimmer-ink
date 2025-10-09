import { motion } from "framer-motion";

const JourneyCard = ({ project, alignRight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: alignRight ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col md:flex-row ${
        alignRight ? "md:flex-row-reverse" : ""
      } items-center gap-10 my-20`}
    >
      <div className="w-full md:w-1/2">
        <div className="rounded-xl overflow-hidden shadow-neon hover:shadow-lg transition-all duration-300">
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      </div>

      <div className="md:w-1/2 text-[var(--current-text)] text-left transition-colors duration-300">

        <h3 className="text-2xl md:text-3xl font-display font-semibold mb-3">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 text-base leading-relaxed">
          {project.description}
        </p>
        <div className="text-sm text-gray-500 mb-6 italic">
          {project.stack.join(" • ")}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-bold hover:shadow-lg hover:bg-primary/90 transition-all"
          >
            View Live Site
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default JourneyCard;
