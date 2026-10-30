import { Link } from "@/components/ui/SlashLink";
import { ArrowRight, Globe, LayoutDashboard, Database, Smartphone } from "lucide-react";
import { servicePricing } from "@/data/pricing";
import { kes } from "@/utils/format";

// Prices come from pricing.js so Home, Services and the estimator always agree.
const offerings = [
  { id: "static", icon: Globe, title: "Business websites", text: "Fast, professional sites for shops, clinics, schools and service businesses." },
  { id: "fullstack", icon: LayoutDashboard, title: "Websites with admin", text: "Forms, bookings and an admin panel so you can manage content yourself." },
  { id: "system", icon: Database, title: "Custom systems", text: "Management systems for schools, offices and teams, built around your workflow." },
  { id: "mobile", icon: Smartphone, title: "Mobile apps", text: "Android and cross-platform apps for ideas that need to live on phones." },
];


const ServicesOverview = () => (
  <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-background-light dark:bg-background-dark">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">What I build</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-text-light dark:text-text-dark">
          Clear services, clear prices
        </h2>
        <p className="text-text-light/70 dark:text-text-dark/70">
          Starting prices in Kenya shillings. The final quote depends on your features and content.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {offerings.map((offering) => {
          const price = servicePricing.find((service) => service.id === offering.id)?.basePrice;
          return (
            <article
              key={offering.id}
              className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary-light mb-4">
                <offering.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold mb-2 text-text-light dark:text-text-dark">{offering.title}</h3>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70 leading-relaxed flex-1">{offering.text}</p>
              {price && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-text-light/65 dark:text-text-dark/50">From</div>
                  <div className="font-display text-xl font-bold text-primary dark:text-primary-light">{kes(price)}</div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <Link to="/services" className="group inline-flex items-center gap-2 font-semibold text-primary dark:text-primary-light">
          See all services and the cost estimator
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesOverview;
