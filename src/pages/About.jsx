import AboutHero from "../components/About/AboutHero";
import FounderSection from "../components/About/FounderSection";
import MissionValues from "../components/About/MissionValues";
import HistoryTimeline from "../components/About/HistoryTimeline";

import AboutCTASection from "../components/About/AboutCTASection";
import SEOHead from "../components/SEO/SEOHead";

const About = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead
        title="About"
        description="Learn about GlimmerInk Creations, an early-stage portfolio brand focused on premium websites, business systems, and polished digital experiences."
        path="/about"
      />

      {/* Hero Section */}
      <AboutHero />
      
      {/* Founder Section */}
      <FounderSection />
      
      {/* Mission & Values */}
      <MissionValues />
      
      {/* History Timeline */}
      <HistoryTimeline />
      
     
      
      {/* CTA Section */}
      <AboutCTASection />
      
      {/* Closing Statement */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 
                      border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            A Clear Standard
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            GlimmerInk may be early in its journey, but the standard is already set:
            build work that feels clean, credible, and carefully considered. The goal is to
            keep improving with every project while presenting the work honestly and professionally.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 
                        rounded-full text-sm font-medium text-primary dark:text-primary-light">
            Progress with purpose
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
