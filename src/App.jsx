// src/App.jsx
import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { pageview } from "./utils/analytics";
import Home from "./pages/Home";

// Lazy-loaded pages
const Work = lazy(() => import("./pages/Work"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

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
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* ✅ CRITICAL: catch-all route */}
            <Route
              path="*"
              element={
                <div className="p-10 max-w-3xl mx-auto">
                  <h1 className="text-2xl font-bold">404 — Page not found</h1>
                  <p className="mt-2 text-text-light/70 dark:text-text-dark/70">
                    The page you’re looking for doesn’t exist yet.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex mt-6 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
