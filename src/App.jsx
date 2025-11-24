import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";

// Core Components
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header/Header";
import UltimateFooter from "@/components/Footer/UltimateFooter";
import LoadingSpinner from "@/components/LoadingSpinner";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Lazy-loaded Pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const NotFound = lazy(() => import("@/components/NotFound"));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AnalyticsTracker /> {/* SPA GA tracking */}

        <div className="min-h-screen flex flex-col bg-white text-primary dark:bg-background-dark dark:text-text-light">
          {/* Background gradients */}
          <div className="fixed inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 z-[-1]" />
          <div className="fixed inset-0 bg-gradient-glass opacity-20 z-[-2]" />

          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="flex-grow pt-16 lg:pt-20">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/termsofservice" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer */}
          <UltimateFooter />
        </div>
      </Router>
    </HelmetProvider>
  );
}
