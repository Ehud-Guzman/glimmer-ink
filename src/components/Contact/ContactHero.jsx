import { Clock, MapPin, MessageCircle } from "lucide-react";
import { LOCATION_LABEL } from "@/data/location";

// Facts only: what happens after you reach out, and where/when.
const facts = [
  { icon: MessageCircle, label: "Reply within 24 hours" },
  { icon: Clock, label: "Mon–Fri, 8AM–5PM EAT" },
  { icon: MapPin, label: LOCATION_LABEL },
];

const ContactHero = () => (
  <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-6 md:pt-16 md:pb-8">
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

    <div className="relative max-w-7xl mx-auto animate-fade-up">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
        <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
        Contact
      </p>

      <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4 max-w-3xl">
        <span className="block text-text-light dark:text-text-dark">Tell me what you need.</span>
        <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
          Get a clear quote.
        </span>
      </h1>

      <p className="text-base sm:text-lg text-text-light/80 dark:text-text-dark/80 leading-relaxed max-w-2xl mb-6">
        A business website, an online shop or a management system: share a few details below and I&apos;ll
        reply with honest advice, a timeline and a price in KES.
      </p>

      <ul className="flex flex-wrap gap-2">
        {facts.map((fact) => (
          <li
            key={fact.label}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 px-3 py-1.5 text-xs sm:text-sm font-medium text-text-light/90 dark:text-text-dark/90"
          >
            <fact.icon className="h-3.5 w-3.5 text-primary dark:text-primary-light" aria-hidden="true" />
            {fact.label}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ContactHero;
