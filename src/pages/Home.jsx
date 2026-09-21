// pages/HomePage.jsx
import { Suspense } from "react";
import HeroSection from "@/components/Home/HeroSection";
import ServicesGallery from "@/components/Home/ServicesGallery";
import ProcessSection from "@/components/Home/ProcessSection";
import CTASection from "@/components/Home/CTASection";
import SEOHead from "@/components/SEO/SEOHead";
import pageSeo from "@/data/pageSeo";
import { professionalService, webSite } from "@/data/schema";

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

      {/* ── FEATURED WORK ─────────────────────── */}
      <section id="work">
        <ServicesGallery mode="home" />
      </section>

      {/* ── PROCESS ───────────────────────────── */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section id="contact">
        <CTASection />
      </section>
    </div>
  );
};

export default HomePage;
