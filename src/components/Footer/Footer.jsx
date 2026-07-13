import { useState } from "react";
import FooterBrand from "./FooterBrand";
import FooterNav from "./FooterNav";
import FooterContact from "./FooterContact";
import FooterLegal from "./FooterLegal";
import footerStructure from "@/data/footerData";

const Footer = () => {
  const [activeHover, setActiveHover] = useState(null);

  const brand = footerStructure?.brand ?? {
    logo: { primary: "Glimmer", secondary: "Ink", tagline: "" },
    description: "",
    cta: { text: "Start your project", url: "/contact", hoverText: "Let's create →" },
  };

  const navigation = Array.isArray(footerStructure?.navigation)
    ? footerStructure.navigation
    : [];

  const contact = footerStructure?.contact ?? { title: "Get in touch", methods: [], social: [] };

  const credits = footerStructure?.credits ?? { text: "", phone: "", url: "#" };

  const legalLinks = Array.isArray(footerStructure?.legal) ? footerStructure.legal : [];

  return (
    <footer className="bg-white dark:bg-background-dark border-t border-border-light dark:border-border-dark relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <FooterBrand brand={brand} />
        <FooterNav
          navigation={navigation}
          activeHover={activeHover}
          setActiveHover={setActiveHover}
        />
        <FooterContact contact={contact} />
      </div>

      <FooterLegal legalLinks={legalLinks} credits={credits} brand={brand} />
    </footer>
  );
};

export default Footer;
