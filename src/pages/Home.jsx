// pages/HomePage.jsx
import { Suspense } from "react";
import HeroSection from "@/components/Home/HeroSection";
import ServicesGallery from "@/components/Home/ServicesGallery";
import ProcessSection from "@/components/Home/ProcessSection";
import CTASection from "@/components/Home/CTASection";
import SEOHead from "@/components/SEO/SEOHead";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1 },
  }),
};

const cards = [
  {
    label: "Current stage",
    body: "Early-career developer building a focused portfolio with honest, curated concept work.",
  },
  {
    label: "What you'll see",
    body: "One live client website, plus polished demo projects that show design thinking and execution.",
  },
  {
    label: "Best fit projects",
    body: "Business websites, internal systems, dashboard interfaces, landing pages, and portfolio-quality front-end builds.",
  },
];

const HomePage = () => {
  return (
    <main className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors min-h-screen overflow-hidden">
      <SEOHead
        title="Web Design & Development Nairobi"
        description="GlimmerInk Creations builds premium websites, business systems, and custom digital experiences for modern businesses in Nairobi and across Kenya."
        path="/"
      />

      {/* ── HERO ──────────────────────────────── */}
      <section id="hero">
        <Suspense fallback={<div className="h-screen" />}>
          <HeroSection />
        </Suspense>
      </section>

      {/* ── CONTEXT CARDS ─────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map(({ label, body }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-2xl border border-gray-200 dark:border-gray-800
                           bg-white dark:bg-gray-900
                           px-7 py-6
                           flex flex-col gap-2"
              >
                <span className="text-xs font-semibold tracking-wide uppercase text-primary dark:text-primary-light">
                  {label}
                </span>
                <p className="text-sm leading-relaxed text-text-light/70 dark:text-text-dark/70">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ─────────────────────── */}
      <section id="work" className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesGallery mode="home" />
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────── */}
      <section
        id="process"
        className="bg-white dark:bg-background-dark/50 py-16 md:py-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessSection />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section id="contact">
        <CTASection />
      </section>
    </main>
  );
};

export default HomePage;
