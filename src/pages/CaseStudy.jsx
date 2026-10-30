import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "@/components/ui/SlashLink";
import { motion, AnimatePresence } from "@/utils/motion";
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
import { breadcrumbs, caseStudy } from "@/data/schema";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const statusLabel = (status) => {
  if (status === "live") return "Live Project";
  if (status === "demo") return "Concept Build";
  if (status === "live-demo") return "Live Demo";
  if (status === "in-progress") return "In Development";
  if (status === "archived") return "Archived Build";
  return null;
};

const isValidExternalUrl = (url) => typeof url === "string" && /^https?:\/\//i.test(url);

const SectionLabel = ({ children }) => (
  <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-4">
    {children}
  </h2>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [lightboxImage, setLightboxImage] = useState(null);

  const breadcrumbItems = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: project?.title ?? "Case study", path: `/work/${slug}` },
    ],
    [project, slug]
  );

  const pageSchema = useMemo(
    () => (project ? [caseStudy(project), breadcrumbs(breadcrumbItems)] : null),
    [project, breadcrumbItems]
  );

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
          path={`/work/${slug}`}
          noIndex
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
        jsonLd={pageSchema}
      />

      {/* ── HERO ─────────────────────────────── */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(100,116,139,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.13) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-8 md:pb-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-text-muted dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors mb-5 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Work
          </Link>

          <Breadcrumbs className="mb-6" items={breadcrumbItems} />

          <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
            <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
            Case study{project.type ? ` · ${project.type}` : ""}
          </p>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[2rem] sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] tracking-tight text-balance mb-4"
          >
            {project.title}
          </motion.h1>

          <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-gray-300 leading-relaxed max-w-3xl mb-7">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <dl className="grid grid-cols-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 divide-x divide-gray-200 dark:divide-gray-800 sm:min-w-[22rem]">
              {[
                { label: "Client", value: project.client },
                { label: "Year", value: project.year },
                { label: "Status", value: label },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.label} className="px-3 sm:px-4 py-3 min-w-0">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted dark:text-gray-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold leading-snug text-text-light dark:text-text-dark break-words">
                      {item.value}
                    </dd>
                  </div>
                ))}
            </dl>

            {hasLive && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-semibold shadow-lg shadow-primary/20 sm:ml-auto"
              >
                {project.status === "live"
                  ? "Visit live site"
                  : project.status === "live-demo"
                    ? "Try the live demo"
                    : "View preview"}{" "}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── COVER IMAGE ──────────────────────── */}
      {cover && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
          <motion.button
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => setLightboxImage(cover)}
            className="block w-full text-left rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl cursor-zoom-in bg-white dark:bg-gray-900"
            aria-label={`Enlarge ${project.title} cover image`}
          >
            <span className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5" aria-hidden="true">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </span>
              {hasLive && (
                <span className="flex-1 truncate rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 font-mono text-[11px] text-text-muted dark:text-gray-400">
                  {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </span>
              )}
            </span>
            <SafeImage
              src={cover}
              alt={`${project.title} — main view`}
              className="block w-full object-cover"
              sizes="(min-width: 1152px) 1100px, 100vw"
              priority
            />
          </motion.button>
        </div>
      )}

      {/* ── NARRATIVE + SIDEBAR ──────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        <div className="lg:col-span-2 min-w-0 space-y-10 md:space-y-12">
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

        <aside className="min-w-0 space-y-10 lg:pt-1">
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
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
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
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ── NEXT PROJECT + CTA ───────────────── */}
      <div className="px-4 md:px-6 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gray-900 dark:bg-gray-800 text-white px-6 py-10 sm:px-12 sm:py-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Have a similar project in mind?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-7">
            Tell me what you need and I&apos;ll reply with honest advice and a clear quote in KES.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/254746527253"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp me
            </a>
          </div>
        </div>

        {nextProject && nextProject.slug !== project.slug && (
          <Link
            to={`/work/${nextProject.slug}`}
            className="group mt-10 max-w-6xl mx-auto flex items-center justify-between gap-6 border-t border-gray-200 dark:border-gray-800 pt-8"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted dark:text-gray-400">
              Next case study
            </span>
            <span className="text-xl font-semibold font-display inline-flex items-center gap-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
              {nextProject.title}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        )}
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
              className="absolute top-5 right-5 p-2 text-white/95 hover:text-white bg-white/10 rounded-full transition-colors"
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
