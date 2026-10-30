import { Link } from "@/components/ui/SlashLink";
import { ArrowRight, Code2, Palette, ShoppingCart, Database, Zap } from "lucide-react";
import { LOCATION, LOCATION_LABEL } from "@/data/location";
import { servicePricing } from "@/data/pricing";
import { formatNumber } from "@/utils/format";

const capabilities = [
  { icon: Code2, label: "Web development" },
  { icon: Palette, label: "UI/UX design" },
  { icon: ShoppingCart, label: "E-commerce & M-Pesa" },
  { icon: Database, label: "Backend & systems" },
  { icon: Zap, label: "Support & maintenance" },
];


const ServicesHero = () => (
  <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-10 md:pt-16 md:pb-14">
    {/* Same blueprint backdrop as the home hero */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(100,116,139,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.13) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 75%)",
        }}
      />
      <div className="absolute -top-24 right-[8%] w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
      <div className="min-w-0 animate-fade-up">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
          <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
          Services · {LOCATION_LABEL}
        </p>

        <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl font-bold tracking-tight text-balance mb-4">
          <span className="block text-text-light dark:text-text-dark">Development services</span>
          <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
            built around your business.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-text-light/80 dark:text-text-dark/80 leading-relaxed max-w-xl mb-6">
          From first concept to live deployment, I build end-to-end websites, web apps and business
          systems with modern technology, clean architecture and clear pricing in KES.
        </p>

        <ul className="mb-7 flex flex-wrap gap-2 max-w-xl">
          {capabilities.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 px-3 py-1.5 text-xs sm:text-sm font-medium text-text-light/90 dark:text-text-dark/90"
            >
              <item.icon className="h-3.5 w-3.5 text-primary dark:text-primary-light" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <Link
            to="/contact"
            className="group inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-7 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            to="/work"
            className="inline-flex flex-1 sm:flex-none items-center justify-center px-7 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark hover:border-primary hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 transition-colors"
          >
            View My Work
          </Link>
        </div>

        <p className="mt-5 text-sm text-text-light/65 dark:text-text-dark/65">
          Based in {LOCATION.town}?{" "}
          <Link to={LOCATION.landingPath} className="font-medium underline underline-offset-4">
            See web design in {LOCATION.town}
          </Link>
        </p>
      </div>

      {/* Starting prices, straight from the pricing data the estimator uses */}
      <div className="relative min-w-0 animate-fade-left">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-2xl blur-xl opacity-15" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5" aria-hidden="true">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <span className="font-mono text-[11px] text-text-light/65 dark:text-text-dark/60">starting-prices.kes</span>
          </div>

          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {servicePricing.map((service) => (
              <li key={service.id} className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-text-light dark:text-text-dark truncate">{service.label}</div>
                  <div className="text-xs text-text-light/65 dark:text-text-dark/60 truncate">{service.description}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-text-light/65 dark:text-text-dark/45">from</div>
                  <div className="font-mono text-sm font-semibold text-primary dark:text-primary-light">KES {formatNumber(service.basePrice)}</div>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#estimator"
            className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 px-4 sm:px-5 py-3 text-sm font-medium text-primary-dark dark:text-primary-light hover:bg-primary/10 transition-colors"
          >
            Estimate your project
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesHero;
