import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SafeImage from "@/components/ui/SafeImage";
import ServiceFAQs from "@/components/Services/ServiceFAQs";
import pageSeo from "@/data/pageSeo";
import { LOCATION } from "@/data/location";
import { localFaqs } from "@/data/localFaqs";
import { developmentProjects } from "@/data/developmentProjects";
import { servicePricing } from "@/data/pricing";
import { breadcrumbs, faqPage, localServices } from "@/data/schema";

const PAGE_SCHEMA = [
  localServices(),
  faqPage(localFaqs),
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: `Web Developer in ${LOCATION.town}`, path: LOCATION.landingPath },
  ]),
];

// Which packages to show, and who each one suits locally.
const offerings = [
  { id: "static", title: "Business website", bestFor: "Shops, clinics, schools, lodges and service businesses that need a professional presence." },
  { id: "fullstack", title: "Website with admin & forms", bestFor: "Businesses that want bookings, enquiries or content they can update themselves." },
  { id: "system", title: "Custom management system", bestFor: "Schools, saccos and offices replacing paper and spreadsheets with one secure system." },
  { id: "mobile", title: "Mobile app", bestFor: "Ideas that need to live on customers' phones, built for Android and cross-platform." },
];

const audiences = [
  "Hotels & lodges",
  "Schools & colleges",
  "Shops & online sellers",
  "Clinics & pharmacies",
  "Saccos & NGOs",
  "Professionals & personal brands",
];

const steps = [
  { title: "Talk", text: "A short call, WhatsApp chat or meeting in Busia to understand your business and goals." },
  { title: "Quote", text: "A clear fixed quote in KES with scope and timeline, before any work starts." },
  { title: "Build", text: "Regular previews at each milestone so you see progress, not surprises." },
  { title: "Launch & support", text: "Go live, with 30 days of free support and optional ongoing maintenance." },
];

const kes = (amount) => `KES ${amount.toLocaleString("en-US")}`;

const WebDeveloperBusia = () => {
  const itoya = developmentProjects.find((project) => project.slug === "hotel-itoya");
  const priceFor = (id) => servicePricing.find((service) => service.id === id)?.basePrice;

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen">
      <SEOHead {...pageSeo.busia} jsonLd={PAGE_SCHEMA} />

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-12 md:pt-16 md:pb-16">
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

        <div className="relative max-w-4xl mx-auto">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
            <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
            <MapPin className="h-4 w-4 -ml-1" aria-hidden="true" />
            {LOCATION.county}, {LOCATION.country}
          </p>

          <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-5">
            <span className="block">{`Web developer in ${LOCATION.town}, ${LOCATION.country}`}</span>
            <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
              for businesses ready to grow online.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-light/80 dark:text-text-dark/80 leading-relaxed max-w-2xl mb-6">
            I&apos;m Ehud Mwai, a website developer based in {LOCATION.town}. I build fast, mobile-first
            business websites, online shops and custom management systems for businesses in {LOCATION.town},{" "}
            {LOCATION.nearbyTowns[0]} and across {LOCATION.region}, with clear pricing in Kenya shillings.
          </p>

          <ul className="mb-7 flex flex-wrap gap-2">
            {[`Based in ${LOCATION.town}`, "Meet in person", "Prices in KES", "M-Pesa ready"].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 px-3 py-1 text-xs sm:text-sm font-medium text-text-light/80 dark:text-text-dark/80"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/254746527253"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp me
            </a>
            <a
              href="tel:+254746527253"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT I BUILD ─────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-14 bg-white dark:bg-gray-900/40 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">What I build</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Websites and systems for {LOCATION.town} businesses
            </h2>
            <p className="text-text-light/70 dark:text-text-dark/70">
              Transparent starting prices, so you know what to expect before we talk. The final quote
              depends on your features and content.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offerings.map((offering) => (
              <article
                key={offering.id}
                className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 p-5"
              >
                <h3 className="font-display text-lg font-semibold mb-2">{offering.title}</h3>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70 leading-relaxed flex-1">{offering.bestFor}</p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-text-light/50 dark:text-text-dark/50">From</div>
                  <div className="font-display text-xl font-bold text-primary dark:text-primary-light">{kes(priceFor(offering.id))}</div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-text-light/70 dark:text-text-dark/70">
            Want a ballpark for your project?{" "}
            <Link to="/services#estimator" className="font-medium underline underline-offset-4">
              Try the cost estimator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── LOCAL PROOF ──────────────────────── */}
      {itoya && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl bg-white dark:bg-gray-900">
              <SafeImage
                src={itoya.thumbnail}
                alt={`${itoya.title} website, built by GlimmerInk in ${LOCATION.town}`}
                className="w-full object-cover object-top max-h-[380px]"
                sizes="(min-width: 1024px) 600px, 100vw"
              />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
                Built in {LOCATION.town}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">{itoya.title}</h2>
              <p className="text-text-light/75 dark:text-text-dark/75 leading-relaxed mb-5">{itoya.description}</p>
              <ul className="space-y-2 mb-6 text-sm text-text-light/80 dark:text-text-dark/80">
                {itoya.results.map((result) => (
                  <li key={result} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {result}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/work/${itoya.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors"
                >
                  Read the case study <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href={itoya.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 font-medium text-sm hover:border-primary transition-colors"
                >
                  Visit live site <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── WHO + WHERE ──────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-14 bg-white dark:bg-gray-900/40 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">Who it&apos;s for</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-5">Businesses I can help in {LOCATION.town}</h2>
            <ul className="grid grid-cols-2 gap-2.5">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 px-3 py-2.5 text-sm font-medium"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">Where I work</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-5">Busia and across {LOCATION.region}</h2>
            <p className="text-text-light/75 dark:text-text-dark/75 leading-relaxed mb-4">
              I&apos;m based in {LOCATION.town} town, so in-person meetings are easy across{" "}
              {LOCATION.county}. I work with clients in:
            </p>
            <ul className="flex flex-wrap gap-2 mb-4">
              {[LOCATION.town, ...LOCATION.nearbyTowns].map((town) => (
                <li
                  key={town}
                  className="rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary dark:text-primary-light"
                >
                  {town}
                </li>
              ))}
            </ul>
            <p className="text-text-light/75 dark:text-text-dark/75 leading-relaxed">
              Clients in {LOCATION.widerArea.join(", ")} and the rest of {LOCATION.country} are served
              remotely by call, video and WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">How it works</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8">From first chat to live website</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                <span className="font-mono text-sm text-primary dark:text-primary-light">0{index + 1}</span>
                <h3 className="font-display text-lg font-semibold mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <ServiceFAQs faqs={localFaqs} subtitle={`Common questions from businesses in ${LOCATION.town}`} />

      {/* ── CTA ──────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gray-900 dark:bg-gray-800 text-white px-6 py-10 sm:px-12 sm:py-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Ready to get your {LOCATION.town} business online?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-7">
            Tell me what you need and I&apos;ll reply with honest advice and a clear quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/254746527253"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDeveloperBusia;
