import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import PolicySidebar from "@/components/Privacy/PolicySidebar";
import PolicySection from "@/components/Privacy/PolicySection";
import DataCategoryCard from "@/components/Privacy/DataCategoryCard";
import SecurityMeasureCard from "@/components/Privacy/SecurityMeasureCard";
import ThirdPartyServiceCard from "@/components/Privacy/ThirdPartyServiceCard";
import CookieTypeItem from "@/components/Privacy/CookieTypeItem";
import PolicyChangeItem from "@/components/Privacy/PolicyChangeItem";
import { FiGlobe, FiDatabase, FiSettings, FiLock, FiMail } from "react-icons/fi";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <motion.main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Privacy Policy | GlimmerInk</title>
        <meta
          name="description"
          content="Learn how GlimmerInk collects, uses, and protects your personal information."
        />
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <PolicySidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          scrollToSection={scrollToSection}
        />

        {/* Main Content */}
        <div className="flex-1 space-y-12">
          <PolicySection id="introduction" title="Introduction" icon={<FiGlobe />}>
            <p>
              At GlimmerInk, we respect your privacy and are committed to protecting your personal
              data with enterprise-grade security measures...
            </p>
          </PolicySection>

          <PolicySection id="information-collected" title="Information We Collect" icon={<FiDatabase />}>
            <DataCategoryCard
              title="Identity Data"
              examples={["First name", "Last name", "Username", "Unique user ID"]}
              purpose="To personalize your experience and secure your account"
            />
            <DataCategoryCard
              title="Contact Data"
              examples={["Email address", "Phone number", "Mailing address"]}
              purpose="To communicate with you and deliver services"
            />
          </PolicySection>

          <PolicySection id="data-use" title="How We Use Your Data" icon={<FiSettings />}>
            <p>We process your data lawfully, fairly, and transparently...</p>
            {/* Repeat more DataCategoryCards or other cards as needed */}
          </PolicySection>

          <PolicySection id="data-security" title="Data Security" icon={<FiLock />}>
            <SecurityMeasureCard title="Encryption" description="All data in transit uses TLS..." />
            <SecurityMeasureCard title="Access Controls" description="Strict role-based access..." />
          </PolicySection>

          <PolicySection id="cookies" title="Cookies & Tracking">
            <CookieTypeItem name="session_id" purpose="Maintains your login session" duration="Until browser closed" />
            <CookieTypeItem name="ga_*" purpose="Analytics" duration="2 years" />
          </PolicySection>

          <PolicySection id="policy-changes" title="Policy Updates">
            <PolicyChangeItem date="March 15, 2024" change="Added detailed data retention periods" />
            <PolicyChangeItem date="October 1, 2024" change="Clarified third-party processor relationships" />
          </PolicySection>

          <PolicySection id="contact" title="Contact Our Privacy Team" icon={<FiMail />}>
            <p>Email: privacy@glimmerink.com</p>
          </PolicySection>
        </div>
      </div>
    </motion.main>
  );
}
