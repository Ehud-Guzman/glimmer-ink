import { Link } from "@/components/ui/SlashLink";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { developmentProjects } from "@/data/developmentProjects";
import { LOCATION } from "@/data/location";

// The featured project in developmentProjects.js (featured: true) is the
// flagship. Change which project that is there, not here.
const flagship = developmentProjects.find((project) => project.featured) ?? developmentProjects[0];

// Real clients only: concept builds and sample-data demos are not clients.
const clients = developmentProjects
  .filter((project) => project.status !== "demo" && project.status !== "live-demo")
  .map((project) => project.client || project.title);

const FlagshipClient = () => {
  if (!flagship) return null;

  const isLive = flagship.status === "live" && /^https?:\/\//i.test(flagship.url ?? "");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-background-light dark:bg-background-dark border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
          <div className="min-w-0 relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-2xl blur-xl opacity-15" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5" aria-hidden="true">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 truncate rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 font-mono text-[11px] text-text-light/60 dark:text-text-dark/60">
                  {(flagship.url ?? "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </div>
              </div>
              <SafeImage
                src={flagship.thumbnail}
                alt={`${flagship.title} website, built by GlimmerInk`}
                className="block w-full object-cover object-top"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
              Flagship client · {LOCATION.town}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-text-light dark:text-text-dark">
              {flagship.title}
            </h2>
            <p className="text-text-light/75 dark:text-text-dark/75 leading-relaxed mb-5">{flagship.description}</p>

            <ul className="space-y-2 mb-6">
              {(flagship.features ?? []).slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-text-light/80 dark:text-text-dark/80">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-light" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/work/${flagship.slug}`}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              >
                Read the case study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              {isLive && (
                <a
                  href={flagship.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold text-text-light dark:text-text-dark hover:border-primary transition-colors"
                >
                  Visit live site <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        {clients.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-light/50 dark:text-text-dark/50 mb-3">
              Selected clients
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 font-display text-base sm:text-lg font-semibold text-text-light/70 dark:text-text-dark/70">
              {clients.map((client) => (
                <li key={client}>{client}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlagshipClient;
