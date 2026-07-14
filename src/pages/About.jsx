import AboutHero from "../components/About/AboutHero";
import FounderSection from "../components/About/FounderSection";
import MissionValues from "../components/About/MissionValues";
import HistoryTimeline from "../components/About/HistoryTimeline";

import AboutCTASection from "../components/About/AboutCTASection";
import SEOHead from "../components/SEO/SEOHead";
import pageSeo from "../data/pageSeo";

const About = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead {...pageSeo.about} />

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
