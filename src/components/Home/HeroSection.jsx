import { Link } from "react-router-dom";

const HeroSection = () => {

  const chips = ["5+ live client websites", "Polished concept builds", "Mobile-first", "Fast turnaround"];

  return (
    <section className="relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center overflow-hidden py-10 md:py-6">
      {/* Soft brand wash behind the hero */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-[8%] w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 lg:gap-12">
        {/* Left: Hero Text */}
        <div className="flex-1 max-w-xl md:max-w-none text-center md:text-left animate-fade-up">

          {/* Availability badge */}
          <span className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 dark:bg-primary/10 text-xs sm:text-sm font-medium text-primary dark:text-primary-light">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects
          </span>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-[1.12] tracking-tight text-balance">
            <span className="block text-text-light dark:text-text-dark">
              Premium websites and
            </span>
            <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
              practical business systems.
            </span>
          </h1>

          <p className="text-lg mb-5 text-text-light/85 dark:text-text-dark/85 leading-relaxed max-w-xl mx-auto md:mx-0">
            I help businesses show up professionally online and run more smoothly behind the scenes
            with clean websites, practical systems, thoughtful structure, and modern front-end execution.
          </p>

          {/* Trust chips */}
          <div className="mb-6 flex flex-wrap gap-2 justify-center md:justify-start">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-light/80 dark:text-text-dark/80"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3.5">
            <Link
              to="/work"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-white rounded-xl font-semibold text-base shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              View Selected Work
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-base border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark hover:border-primary hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              Start a Conversation
            </Link>
          </div>

          {/* Subtle credibility line */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800 text-center md:text-left">
            <div className="px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-text-light/55 dark:text-text-dark/55">Best fit</div>
              <div className="text-sm font-medium text-text-light dark:text-text-dark mt-0.5">SMEs, personal brands, schools</div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-text-light/55 dark:text-text-dark/55">Focus</div>
              <div className="text-sm font-medium text-text-light dark:text-text-dark mt-0.5">Websites, systems, dashboards</div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-text-light/55 dark:text-text-dark/55">Approach</div>
              <div className="text-sm font-medium text-text-light dark:text-text-dark mt-0.5">Clean design, practical execution</div>
            </div>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-auto flex justify-center md:justify-end animate-fade-left">
          <div className="relative w-full md:max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-2xl blur-xl opacity-20" aria-hidden="true" />
            <img
              src="/images/illustration.webp"
              srcSet="/images/illustration-400.webp 400w, /images/illustration-800.webp 800w, /images/illustration.webp 1200w"
              sizes="(max-width: 768px) 100vw, 448px"
              alt="GlimmerInk design and development showcase"
              width="1200"
              height="675"
              className="relative w-full rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute -bottom-5 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/92 dark:bg-gray-900/92 backdrop-blur px-5 py-4 shadow-xl">
              <div className="flex items-center justify-between gap-4 text-sm">
                <div>
                  <div className="font-semibold text-text-light dark:text-text-dark">Live client work + concept builds</div>
                  <div className="text-text-light/65 dark:text-text-dark/65">5 live sites · systems · polished UI demos</div>
                </div>
                <Link
                  to="/work"
                  className="shrink-0 rounded-full bg-primary px-4 py-2 text-white font-medium hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
