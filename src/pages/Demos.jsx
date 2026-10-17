import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ExternalLink, MousePointerClick, ShieldCheck, Clock } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SafeImage from "@/components/ui/SafeImage";
import { demoProjects } from "@/data/developmentProjects";
import pageSeo from "@/data/pageSeo";
import { breadcrumbs, demosCollection } from "@/data/schema";

const DEMOS_SCHEMA = [
  demosCollection(demoProjects),
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Demos", path: "/demos" },
  ]),
];

const KIND = {
  "live-demo": {
    badge: "Live demo · sample data",
    button: "Try the live demo",
    summary: "A working system. Click through every screen.",
  },
  demo: {
    badge: "Concept build",
    button: "View preview",
    summary: "An interface concept built to show what a system could look like.",
  },
};

const reassurances = [
  { icon: MousePointerClick, title: "Nothing to sign up for", text: "Sign-in is one tap, or a sample login shown on the demo itself." },
  { icon: ShieldCheck, title: "Safe to explore", text: "Demos use invented data and are read-only, so you cannot break or change anything." },
  { icon: Clock, title: "Opens in a new tab", text: "Some run on free hosting, so the first load after a quiet spell can be slow." },
];

const DemoRow = ({ project, index }) => {
  const kind = KIND[project.status] ?? KIND.demo;
  const guide = project.demoGuide;
  const host = project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <article
      aria-labelledby={`demo-${project.slug}`}
      className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start"
    >
      <div className={`min-w-0 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-2xl blur-xl opacity-15" aria-hidden="true" />
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${project.title} demo in a new tab`}
            className="relative block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl"
          >
            <span className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5" aria-hidden="true">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </span>
              <span className="flex-1 truncate rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 font-mono text-[11px] text-text-light/60 dark:text-text-dark/60">
                {host}
              </span>
            </span>
            <SafeImage
              src={project.thumbnail}
              alt={`${project.title} demo, built by GlimmerInk`}
              className="block w-full object-cover object-top"
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </a>
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
          {kind.badge}
        </p>
        <h2 id={`demo-${project.slug}`} className="font-display text-3xl md:text-4xl font-bold mb-3 text-text-light dark:text-text-dark">
          {project.title}
        </h2>
        <p className="text-text-light/75 dark:text-text-dark/75 leading-relaxed mb-5">{project.description}</p>

        {guide ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-5 mb-6">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-1">
              How to try it
            </h3>
            {guide.access && (
              <p className="text-sm text-text-light/60 dark:text-text-dark/60 mb-4">{guide.access}</p>
            )}
            <ol className="space-y-3">
              {guide.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-text-light/80 dark:text-text-dark/80 leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary-light/15 font-mono text-[11px] font-semibold text-primary dark:text-primary-light">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            {guide.note && (
              <p className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 text-xs text-text-light/60 dark:text-text-dark/60">
                {guide.note}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-text-light/60 dark:text-text-dark/60 mb-6">{kind.summary}</p>
        )}

        {!!project.features?.length && guide && (
          <ul className="space-y-2 mb-6">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-text-light/80 dark:text-text-dark/80">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-light" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
          >
            {kind.button} <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
          <Link
            to={`/work/${project.slug}`}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold text-text-light dark:text-text-dark hover:border-primary transition-colors"
          >
            Read the case study
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const Demos = () => (
  <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    <SEOHead {...pageSeo.demos} jsonLd={DEMOS_SCHEMA} />

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

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-10 md:pb-14">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
          <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
          Demos
        </p>
        <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] tracking-tight text-balance mb-4">
          Try the work, <span className="text-primary dark:text-primary-light">don&apos;t just look at it.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
          Screenshots only show so much. These are working builds you can open and click through, with sample data, so you can see how a custom system behaves before you commission one.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reassurances.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-4">
                <Icon className="w-5 h-5 mt-0.5 shrink-0 text-primary dark:text-primary-light" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-text-muted dark:text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </header>

    <section className="px-4 md:px-6 pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
        {demoProjects.map((project, index) => (
          <DemoRow key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>

    <section className="px-4 md:px-6 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto rounded-3xl bg-gray-900 dark:bg-gray-800 text-white px-6 py-10 sm:px-12 sm:py-12 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Want a system like this for your business?</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-7">
          Tell me how you run things today and I&apos;ll reply with honest advice and a clear quote in KES.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
          >
            Start a project <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
    </section>
  </div>
);

export default Demos;
