import ServicesHero from "../components/Services/ServicesHero";
import ServiceCard from "../components/Services/ServiceCard";
import ServiceSelector from "../components/Services/ServiceSelector";
import ProcessTimeline from "../components/Services/ProcessTimeline";
import PricingModels from "../components/Services/PricingModels";
import ServiceFAQs from "../components/Services/ServiceFAQs";
import ServicesCTASection from "../components/Services/ServicesCTASection";
import SEOHead from "../components/SEO/SEOHead";
import { Code2, Palette, ShoppingCart, Database, Zap, Layout } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Business Websites",
    description: "Clean, fast websites built to present your business clearly and drive enquiries — from simple landing pages to full multi-page sites.",
    features: [
      "React & Tailwind builds",
      "Mobile-first responsive design",
      "Contact & inquiry forms",
      "SEO-ready structure",
    ],
  },
  {
    icon: Layout,
    title: "Web Applications",
    description: "Full-stack web apps with dynamic data, user accounts, and admin panels — built for real business workflows.",
    features: [
      "Frontend + backend",
      "Admin dashboards",
      "User authentication",
      "API integrations",
    ],
  },
  {
    icon: Database,
    title: "Business Systems",
    description: "Custom management systems for schools, clinics, legal offices, and operational teams — structured around your actual workflow.",
    features: [
      "Role-based access control",
      "Records & data management",
      "Reporting & exports",
      "Secure data flows",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Online stores with product catalogs, payment integration, and order management built for the Kenyan market.",
    features: [
      "M-Pesa & card payments",
      "Product catalog & filters",
      "Inventory management",
      "Order tracking",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interface design focused on clarity and usability — from wireframes to polished, production-ready designs.",
    features: [
      "Wireframing & prototyping",
      "Design systems",
      "Brand integration",
      "Component libraries",
    ],
  },
  {
    icon: Zap,
    title: "Maintenance & Support",
    description: "Ongoing support, bug fixes, and performance improvements to keep your site or system running smoothly after launch.",
    features: [
      "Bug fixes & updates",
      "Performance monitoring",
      "Content updates",
      "Scalability planning",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead
        title="Services"
        description="Discover GlimmerInk services across websites, UI design, e-commerce, backend systems, and digital product development."
        path="/services"
      />

      <ServicesHero />

      {/* What I Build */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            What I Build
          </h2>
          <p className="text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
            Practical digital solutions for businesses, startups, and operators across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Cost Estimator */}
      <div id="estimator">
        <ServiceSelector />
      </div>

      <ProcessTimeline />
      <PricingModels />
      <ServiceFAQs />
      <ServicesCTASection />
    </div>
  );
};

export default Services;
