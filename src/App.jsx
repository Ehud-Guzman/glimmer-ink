// src/App.jsx
import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { pageview } from "./utils/analytics";
import SEOHead from "./components/SEO/SEOHead";
import Home from "./pages/Home";
import { LOCATION } from "./data/location";

// Lazy-loaded pages
const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const WebDeveloperBusia = lazy(() => import("./pages/WebDeveloperBusia"));

// Fallback route - declared with noIndex so soft 404s never get indexed.
const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="px-4 sm:px-6 py-16 md:py-24 max-w-3xl mx-auto">
      <SEOHead
        title="Page not found"
        description="This page does not exist. Explore the GlimmerInk Creations portfolio, services and case studies instead."
        path={pathname}
        noIndex
      />
      <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
        <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
        Error 404
      </p>
      <h1 className="font-display text-[2rem] sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
        This page doesn&apos;t exist.
      </h1>
      <p className="text-text-light/75 dark:text-text-dark/75 max-w-xl">
        The link may be old or mistyped. Here is where you probably want to go.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          Back to Home
        </Link>
        <Link
          to="/work"
          className="inline-flex px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:border-primary hover:text-primary dark:hover:text-primary-light transition-colors"
        >
          View selected work
        </Link>
        <Link
          to="/contact"
          className="inline-flex px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:border-primary hover:text-primary dark:hover:text-primary-light transition-colors"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Analytics
  useEffect(() => {
    pageview(location.pathname);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ESC closes menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Skip to main content — keyboard / screen reader navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main
        id="main-content"
        className={`flex-grow pt-16 lg:pt-20 transition-all duration-300 ${
          isMenuOpen ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <Suspense fallback={<div className="min-h-[90vh]" aria-hidden="true" />}>
          <Routes>
            {/* Core routes */}
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path={LOCATION.landingPath} element={<WebDeveloperBusia />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
