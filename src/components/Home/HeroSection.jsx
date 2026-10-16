import { Link } from "react-router-dom";
import { Globe, ShoppingCart, LayoutDashboard, Smartphone } from "lucide-react";
import { LOCATION_LABEL } from "@/data/location";

// What I sell, stated plainly. Order matches the Services page.
const offers = [
  { icon: Globe, label: "Business websites" },
  { icon: ShoppingCart, label: "E-commerce & M-Pesa" },
  { icon: LayoutDashboard, label: "Dashboards & systems" },
  { icon: Smartphone, label: "Mobile-first web apps" },
];

// Facts already published on the Services FAQ, surfaced at a glance.
const stats = [
  { value: "5+", label: "Live client sites" },
  { value: "2–4 wk", label: "Typical site delivery" },
  { value: "30 days", label: "Post-launch support" },
];

const stack = ["React", "Vite", "Tailwind", "Node.js"];

const HeroSection = () => {
  return (
    <section className="relative md:min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center overflow-hidden pt-8 pb-14 md:py-6">
      {/* Technical backdrop: faded blueprint grid + soft brand wash */}
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
        <div className="absolute -top-24 right-[8%] w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 lg:gap-14">
        {/* Left: Hero Text */}
        <div className="flex-1 w-full text-left animate-fade-up">
          {/* Role + location (mono eyebrow, doubles as the local-SEO signal) */}
          <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
            <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
            Web developer · {LOCATION_LABEL}
          </p>

          {/* Headline */}
          <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl lg:text-[3.4rem] font-bold mb-4 tracking-tight text-balance">
            <span className="block text-text-light dark:text-text-dark">
              Custom websites, web apps
            </span>
            <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
              &amp; business systems.
            </span>
          </h1>

          <p className="text-base sm:text-lg mb-6 text-text-light/80 dark:text-text-dark/80 leading-relaxed max-w-xl">
            I design and build fast, mobile-first websites, online shops and management systems
            for businesses, schools and brands, from first sketch to live launch.
          </p>

          {/* What I offer */}
          <ul className="mb-5 grid grid-cols-2 gap-2.5 max-w-xl">
            {offers.map((offer) => (
              <li
                key={offer.label}
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 px-3 py-2.5 text-[13px] sm:text-sm font-medium text-text-light dark:text-text-dark"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
                  <offer.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {offer.label}
              </li>
            ))}
          </ul>

          {/* Stack line */}
          <p className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-text-light/60 dark:text-text-dark/60">
            <span className="text-primary dark:text-primary-light">&gt;</span>
            {stack.map((tech, i) => (
              <span key={tech} className="flex items-center gap-2">
                {tech}
                {i < stack.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <Link
              to="/work"
              className="group inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-7 py-3 bg-primary text-white rounded-xl font-semibold text-base shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
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
              className="inline-flex flex-1 sm:flex-none items-center justify-center px-7 py-3 rounded-xl font-semibold text-base border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark hover:border-primary hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              Get a Quote
            </Link>
          </div>

          {/* Proof strip */}
          <dl className="mt-7 grid grid-cols-3 max-w-xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 divide-x divide-gray-200 dark:divide-gray-800">
            {stats.map((stat) => (
              <div key={stat.label} className="px-3 sm:px-4 py-3">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-lg sm:text-xl font-bold text-text-light dark:text-text-dark leading-none">
                  {stat.value}
                </dd>
                <dd className="mt-1.5 text-[11px] sm:text-xs leading-tight text-text-light/60 dark:text-text-dark/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: Illustration inside a browser window */}
        <div className="w-full md:w-auto flex justify-center md:justify-end animate-fade-left pb-6 md:pb-0">
          <div className="relative w-full md:max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-2xl blur-xl opacity-20" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5" aria-hidden="true">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 truncate rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 font-mono text-[11px] text-text-light/60 dark:text-text-dark/60">
                  glimmerink.co.ke
                </div>
              </div>
              <img
                src="/images/illustration.webp"
                srcSet="/images/illustration-400.webp 400w, /images/illustration-800.webp 800w, /images/illustration.webp 1200w"
                sizes="(max-width: 768px) 100vw, 448px"
                alt="GlimmerInk design and development showcase"
                width="1200"
                height="675"
                className="block w-full"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>

            <div className="absolute -bottom-6 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-4 sm:px-5 py-3.5 shadow-xl">
              <div className="flex items-center justify-between gap-4 text-sm">
                <div className="min-w-0">
                  <div className="font-semibold text-text-light dark:text-text-dark truncate">Live client work + concept builds</div>
                  <div className="text-xs sm:text-sm text-text-light/65 dark:text-text-dark/65 truncate">5 live sites · systems · UI demos</div>
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
