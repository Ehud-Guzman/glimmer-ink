import ServicesHero from "../components/Services/ServicesHero";
import ServiceCard from "../components/Services/ServiceCard";
import ServiceSelector from "../components/Services/ServiceSelector";
import ProcessTimeline from "../components/Services/ProcessTimeline";
import PricingModels from "../components/Services/PricingModels";
import ServiceFAQs from "../components/Services/ServiceFAQs";
import ServicesCTASection from "../components/Services/ServicesCTASection";
import SEOHead from "../components/SEO/SEOHead";
import pageSeo from "../data/pageSeo";
import { faqPage, serviceList } from "../data/schema";
import { serviceFaqs } from "../data/faqs";
import { Link } from "@/components/ui/SlashLink";
import { ArrowRight, CheckCircle2, Code2, Palette, ShoppingCart, Database, Zap, Layout } from "lucide-react";

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

const SERVICES_SCHEMA = [serviceList(), faqPage(serviceFaqs)];

const Services = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead {...pageSeo.services} jsonLd={SERVICES_SCHEMA} />

      <ServicesHero />

      {/* What I Build */}
      <section className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            What I Build
          </h2>
          <p className="text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
            Practical digital solutions for businesses, startups, and operators across Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Larger projects */}
      <section className="px-4 sm:px-6 pb-4">
        <div className="max-w-7xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
              Hotels, schools &amp; larger organisations
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Bigger project? Custom scope, custom quote.
            </h2>
            <p className="text-text-muted dark:text-gray-300 leading-relaxed mb-5">
              Booking platforms, multi-page corporate sites, multi-user systems and integrations are scoped
              after a short discovery call, so the quote reflects your actual operations rather than a
              template. The Hotel Itoya platform is an example of this kind of project.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              Request a custom quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {[
              "Online booking and reservation flows",
              "Admin dashboards with roles and permissions",
              "M-Pesa and card payment integration",
              "Multi-branch and multi-user systems",
              "Ongoing maintenance and support plans",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-950 px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-light" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
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
