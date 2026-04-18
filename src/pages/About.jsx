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
        title="About GlimmerInk — Ehud Mwai, Creative Director & Web Developer"
        description="GlimmerInk Creations is a Nairobi-based creative studio led by Ehud Mwai, building premium websites, business systems, and digital experiences for modern businesses."
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
    </div>
  );
};

export default About;
