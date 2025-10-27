// pages/HomePage.jsx
import HeroSection from "../components/Home/HeroSection";
import ServicesGallery from "../components/Home/ServicesGallery";
import ProcessSection from "../components/Home/ProcessSection";
import CTASection from "../components/Home/CTASection";
import ChatBotBubble from "../components/Home/ChatBotBubble";
import DevJourneyShowcase from "../components/Portfolio/DevJourneyShowcase";
import { useState } from "react";

// You'll import your actual services data here or pass via props
import services from "../data/servicesData"; // ⬅️ plug in your real data

const HomePage = () => {
  return (
    <div className="bg-[var(--current-bg)] text-[var(--current-text)] overflow-x-hidden w-full">
      <ChatBotBubble />
      <HeroSection />
      <DevJourneyShowcase />
      <ServicesGallery services={services} />
      <ProcessSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
