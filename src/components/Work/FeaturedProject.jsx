import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiCheckCircle } from "react-icons/fi";
import SafeImage from "@/components/ui/SafeImage";

const isValidExternalUrl = (url) => typeof url === "string" && /^https?:\/\//i.test(url);

const FeaturedProject = ({ project }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!project) return null;

  const hasLive = isValidExternalUrl(project.url);
  const images = project.images?.length ? project.images : [project.fullImage || project.thumbnail].filter(Boolean);

  return (
    <section className="py-20 px-4 md:px-6 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold tracking-wide mb-4">
            Featured Case Study
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            {project.title}
          </h2>
          <p className="mt-3 text-text-muted dark:text-gray-400 text-sm">
            {project.type} · {project.year}{project.client ? ` · ${project.client}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Image gallery */}
          <div className="space-y-4">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden border border-border-light dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800"
            >
              <SafeImage
                src={images[activeImage]}
                alt={`${project.title} screenshot ${activeImage + 1}`}
                className="w-full object-cover max-h-[380px]"
              />
            </motion.div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activeImage
                        ? "border-primary shadow-md"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Case study content */}
          <div className="space-y-8">

            {/* Description */}
            <p className="text-text-muted dark:text-gray-300 leading-relaxed text-base">
              {project.description}
            </p>

            {/* Challenge */}
            {project.challenge && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-2">
                  The Challenge
                </h4>
                <p className="text-text-muted dark:text-gray-300 leading-relaxed text-sm">
                  {project.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-2">
                  The Solution
                </h4>
                <p className="text-text-muted dark:text-gray-300 leading-relaxed text-sm">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Features */}
            {!!project.features?.length && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-3">
                  What Was Built
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-muted dark:text-gray-300">
                      <FiCheckCircle className="text-primary dark:text-primary-light mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stack */}
            {!!project.stack?.length && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-border-light dark:border-gray-600 rounded-lg text-sm font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex items-center gap-6 pt-2 flex-wrap">
              {hasLive ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                >
                  Visit Live Site <FiExternalLink className="text-base" />
                </a>
              ) : (
                <span className="text-xs text-text-muted dark:text-gray-500 italic">
                  Live site coming soon
                </span>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
