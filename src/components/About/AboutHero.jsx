import { UserCheck, LayoutDashboard, Globe2 } from "lucide-react";
import { LOCATION, LOCATION_LABEL } from "@/data/location";
import { liveProjectCount } from "@/data/developmentProjects";

const facts = [
  { value: "2025", label: "Founded" },
  { value: String(liveProjectCount), label: "Live client sites" },
  { value: LOCATION.town, label: "Based in" },
];

const highlights = [
  {
    icon: UserCheck,
    title: "Direct with the founder",
    description: "No account managers or hand-offs. You work with me from first brief to launch and support.",
  },
  {
    icon: LayoutDashboard,
    title: "Websites and systems",
    description: "Marketing sites, online shops and admin-backed dashboards, built to the same standard.",
  },
  {
    icon: Globe2,
    title: "Local and remote",
    description: `Based in ${LOCATION.town}, working with clients across ${LOCATION.country} by call, video and WhatsApp.`,
  },
];

const AboutHero = () => (
  <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-10 md:pt-16 md:pb-14">
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
      <div className="absolute -top-24 left-[6%] w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      <div className="min-w-0 animate-fade-up">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
          <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
          About · {LOCATION_LABEL}
        </p>

        <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-balance mb-4">
          <span className="block text-text-light dark:text-text-dark">Web developer in {LOCATION.town},</span>
          <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
            building for businesses across Kenya.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-text-light/80 dark:text-text-dark/80 leading-relaxed max-w-xl mb-8">
          GlimmerInk is a web studio run by Ehud Mwai. I design and build business websites, online shops
          and management systems for clients who want a professional result and someone they can reach.
        </p>

        <dl className="grid grid-cols-3 max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 divide-x divide-gray-200 dark:divide-gray-800">
          {facts.map((fact) => (
            <div key={fact.label} className="px-3 sm:px-4 py-3">
              <dd className="font-display text-lg sm:text-xl font-bold text-text-light dark:text-text-dark leading-none">
                {fact.value}
              </dd>
              <dt className="mt-1.5 text-[11px] sm:text-xs leading-tight text-text-light/65 dark:text-text-dark/60">
                {fact.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* At a glance panel */}
      <div className="relative min-w-0 animate-fade-left">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5" aria-hidden="true">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <span className="font-mono text-[11px] text-text-light/65 dark:text-text-dark/60">at-a-glance.md</span>
          </div>

          <div className="p-5 sm:p-7 space-y-6">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="shrink-0 p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <item.icon className="w-5 h-5 text-primary dark:text-primary-light" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutHero;
