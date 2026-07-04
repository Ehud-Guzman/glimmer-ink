import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Quote,
  X,
} from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SEOHead from "@/components/SEO/SEOHead";
import { developmentProjects, getProjectBySlug } from "@/data/developmentProjects";

const statusLabel = (status) => {
  if (status === "live") return "Live Project";
  if (status === "demo") return "Concept Build";
  if (status === "in-progress") return "In Progress";
  if (status === "archived") return "Archived Build";
  return null;
};

const isValidExternalUrl = (url) => typeof url === "string" && /^https?:\/\//i.test(url);

const SectionLabel = ({ children }) => (
  <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-4">
    {children}
  </h2>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Lock scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <SEOHead
          title="Case Study Not Found"
          description="This case study doesn't exist. Explore the full GlimmerInk portfolio instead."
          path="/work"
        />
        <h1 className="text-3xl font-bold font-display mb-4">Case study not found</h1>
        <p className="text-text-muted dark:text-gray-400 mb-8">
          This project doesn&apos;t exist — it may have been renamed or removed.
        </p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const hasLive = isValidExternalUrl(project.url);
  const label = statusLabel(project.status);
  const images =
    project.images?.length > 0
      ? project.images
      : [project.fullImage || project.thumbnail].filter(Boolean);
  const cover = images[0];
  const gallery = images.slice(1);

  const currentIndex = developmentProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    developmentProjects[(currentIndex + 1) % developmentProjects.length];

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <SEOHead
        title={`${project.title} — Case Study`}
        description={project.description}
        path={`/work/${project.slug}`}
        image={
          cover ? new URL(cover, "https://glimmerink.co.ke/").toString() : undefined
        }
      />

      {/* ── HERO ─────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-10">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-text-muted dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All Work
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {!!project.type && (
            <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-medium">
              {project.type}
            </span>
          )}
          {label && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-border-light dark:border-gray-700 rounded-full text-sm font-medium">
              {label}
            </span>
          )}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-5"
        >
          {project.title}
        </motion.h1>

        <p className="text-lg md:text-xl text-text-muted dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-text-muted dark:text-gray-400">
          {!!project.client && (
            <div>
              <span className="block text-xs uppercase tracking-wide opacity-70 mb-0.5">Client</span>
              <span className="font-medium text-text-light dark:text-text-dark">{project.client}</span>
            </div>
          )}
          {!!project.year && (
            <div>
              <span className="block text-xs uppercase tracking-wide opacity-70 mb-0.5">Year</span>
              <span className="font-medium text-text-light dark:text-text-dark">{project.year}</span>
            </div>
          )}
          {hasLive && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium ml-auto"
            >
              Visit Live Site <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </header>

      {/* ── COVER IMAGE ──────────────────────── */}
      {cover && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-16">
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => setLightboxImage(cover)}
            className="block w-full rounded-2xl overflow-hidden border border-border-light dark:border-gray-700 shadow-xl cursor-zoom-in bg-gray-100 dark:bg-gray-900"
            aria-label={`Enlarge ${project.title} cover image`}
          >
            <SafeImage
              src={cover}
              alt={`${project.title} — main view`}
              className="w-full object-cover"
            />
          </motion.button>
        </div>
      )}

      {/* ── NARRATIVE + SIDEBAR ──────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="lg:col-span-2 space-y-12">
          {project.challenge && (
            <section>
              <SectionLabel>The Challenge</SectionLabel>
              <p className="text-base md:text-lg text-text-muted dark:text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </section>
          )}

          {project.solution && (
            <section>
              <SectionLabel>The Solution</SectionLabel>
              <p className="text-base md:text-lg text-text-muted dark:text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </section>
          )}

          {!!project.results?.length && (
            <section>
              <SectionLabel>The Outcome</SectionLabel>
              <ul className="space-y-3">
                {project.results.map((result, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-base text-text-muted dark:text-gray-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary dark:text-primary-light mt-0.5 flex-shrink-0" />
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.testimonial && (
            <section className="bg-white dark:bg-gray-800 border border-border-light dark:border-gray-700 rounded-2xl p-8 shadow-card">
              <Quote className="w-8 h-8 text-primary/25 dark:text-primary-light/25 mb-4" />
              <blockquote className="text-lg italic text-text-light dark:text-text-dark leading-relaxed mb-5">
                &ldquo;{project.testimonial.content}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold">{project.testimonial.name}</p>
                <p className="text-sm text-text-muted dark:text-gray-400">
                  {project.testimonial.role}
                </p>
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-10 lg:pt-1">
          {!!project.features?.length && (
            <section>
              <SectionLabel>What Was Built</SectionLabel>
              <ul className="space-y-2.5">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-text-muted dark:text-gray-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary dark:text-primary-light mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!!project.stack?.length && (
            <section>
              <SectionLabel>Tech Stack</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-border-light dark:border-gray-700 rounded-lg text-sm font-medium shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>

      {/* ── GALLERY ──────────────────────────── */}
      {gallery.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <SectionLabel>Screens</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gallery.map((img, idx) => (
              <motion.button
                key={img}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (idx % 2) * 0.08 }}
                onClick={() => setLightboxImage(img)}
                className="rounded-xl overflow-hidden border border-border-light dark:border-gray-700 shadow-card cursor-zoom-in bg-gray-100 dark:bg-gray-900 group"
                aria-label={`Enlarge screenshot ${idx + 2} of ${project.title}`}
              >
                <SafeImage
                  src={img}
                  alt={`${project.title} — screenshot ${idx + 2}`}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ── NEXT PROJECT + CTA ───────────────── */}
      <div className="border-t border-border-light dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-text-muted dark:text-gray-400 mb-2">
              Have a similar project in mind?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {nextProject && nextProject.slug !== project.slug && (
            <Link
              to={`/work/${nextProject.slug}`}
              className="group text-center md:text-right"
            >
              <p className="text-xs uppercase tracking-widest text-text-muted dark:text-gray-400 mb-1">
                Next Case Study
              </p>
              <p className="text-xl font-semibold font-display inline-flex items-center gap-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {nextProject.title}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ─────────────────────────── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} enlarged screenshot`}
          >
            <button
              className="absolute top-5 right-5 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
              onClick={() => setLightboxImage(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              src={lightboxImage}
              alt={`${project.title} enlarged view`}
              className="max-h-full max-w-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudy;
