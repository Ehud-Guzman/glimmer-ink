// pages/HomePage.jsx
import { Suspense, lazy } from "react";
import HeroSection from "@/components/Home/HeroSection";
import SEOHead from "@/components/SEO/SEOHead";
import pageSeo from "@/data/pageSeo";
import { professionalService, webSite } from "@/data/schema";

// Below-the-fold sections load as a separate chunk. The prerendered HTML already
// contains them, so visitors and crawlers see the full page immediately; React
// just wakes the lower sections up once their code has arrived.
const HomeSections = lazy(() => import("@/components/Home/HomeSections"));

const HOME_SCHEMA = [webSite(), professionalService()];

const HomePage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors min-h-screen overflow-hidden">
      <SEOHead {...pageSeo.home} jsonLd={HOME_SCHEMA} />

      {/* ── HERO ──────────────────────────────── */}
      <section id="hero">
        <Suspense fallback={<div className="h-screen" />}>
          <HeroSection />
        </Suspense>
      </section>

      <Suspense fallback={<div className="min-h-[200vh]" aria-hidden="true" />}>
        <HomeSections />
      </Suspense>
    </div>
  );
};

export default HomePage;
