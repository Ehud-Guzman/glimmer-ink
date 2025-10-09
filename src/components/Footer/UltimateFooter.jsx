// components/Footer/UltimateFooter.jsx
import { motion } from "framer-motion";
import React, { useState } from "react";

import FooterBrand from "./FooterBrand";
import FooterNavigation from "./FooterNav";
import FooterContact from "./FooterContact";
import FooterLegal from "./FooterLegal";
import FooterBackToTop from "./BackToTopButton";
import footerStructure from "@/data/footerData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const UltimateFooter = () => {
  const [activeHover, setActiveHover] = useState(null);

  return (
    <motion.footer
      className="bg-[var(--current-nav)] text-[var(--current-text)] border-t border-[var(--current-bg)]/20 relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <FooterBrand brand={footerStructure.brand} />
        <FooterNavigation
          navigation={footerStructure.navigation}
          activeHover={activeHover}
          setActiveHover={setActiveHover}
        />
        <FooterContact contact={footerStructure.contact} />
      </div>

      {/* Footer Base */}
      <FooterLegal
        legal={footerStructure.legal}
        brand={footerStructure.brand}
        credits={footerStructure.credits}
      />
      <FooterBackToTop />
    </motion.footer>
  );
};

export default UltimateFooter;
