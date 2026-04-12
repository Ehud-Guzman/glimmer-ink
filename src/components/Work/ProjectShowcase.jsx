import { motion } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";

const statusLabel = (status) => {
  if (status === "live") return "Live";
  if (status === "demo") return "Concept";
  if (status === "in-progress") return "In Progress";
  return null;
};

const ProjectShowcase = ({ projects = [], onProjectSelect }) => {
  if (!projects.length) return null;

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            More Work
          </h2>
          <p className="text-lg text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
            A mix of live client sites, concept builds, and system-focused projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              className="bg-background-light dark:bg-gray-700 rounded-xl overflow-hidden shadow-card border border-border-light dark:border-gray-600 hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-primary/5 dark:bg-primary/10">
                <SafeImage
                  src={project.thumbnail}
                  alt={project.title || "Project thumbnail"}
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {!!project.type && (
                    <span className="bg-white dark:bg-gray-700 px-2.5 py-1 rounded-full text-xs font-medium shadow">
                      {project.type}
                    </span>
                  )}
                  {statusLabel(project.status) && (
                    <span className="bg-primary/90 text-white px-2.5 py-1 rounded-full text-xs font-medium shadow">
                      {statusLabel(project.status)}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h3 className="text-lg font-semibold">{project.title || "Untitled Project"}</h3>
                  {!!project.year && (
                    <span className="text-sm text-text-muted dark:text-gray-400 whitespace-nowrap">
                      {project.year}
                    </span>
                  )}
                </div>

                {!!project.description && (
                  <p className="text-text-muted dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
                    {project.description}
                  </p>
                )}

                {!!project.stack?.length && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={`${tech}-${idx}`}
                        className="px-2.5 py-1 bg-white dark:bg-gray-600 border border-border-light dark:border-gray-500 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-2.5 py-1 text-xs text-text-muted dark:text-gray-400">
                        +{project.stack.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <button
                  onClick={() => onProjectSelect?.(project)}
                  className="mt-auto w-full py-2.5 border border-primary text-primary dark:text-primary-light rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
