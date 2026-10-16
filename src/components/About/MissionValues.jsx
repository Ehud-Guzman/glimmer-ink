import { FileText, Smartphone, Zap, Eye, LayoutDashboard, LifeBuoy } from "lucide-react";

// Concrete working commitments, replacing the old generic mission/vision copy.
const commitments = [
  {
    icon: FileText,
    title: "Fixed quotes",
    description: "You get scope, timeline and price in KES before any work starts, so there are no surprises.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description: "Most of your visitors are on phones, so every site is designed and tested there first.",
  },
  {
    icon: Zap,
    title: "Fast by default",
    description: "Optimised images and lean code so pages load quickly, even on mobile data.",
  },
  {
    icon: Eye,
    title: "Milestone previews",
    description: "You see working progress at each stage, not just a reveal at the end.",
  },
  {
    icon: LayoutDashboard,
    title: "Easy to manage",
    description: "Admin panels and a clear handover so you can update content without calling a developer.",
  },
  {
    icon: LifeBuoy,
    title: "Support after launch",
    description: "30 days of free support for fixes and small updates, with maintenance available after that.",
  },
];

const MissionValues = () => (
  <section className="py-10 md:py-14 px-4 sm:px-6 max-w-7xl mx-auto">
    <div className="max-w-2xl mb-8">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
        How I work
      </p>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        What working with me looks like
      </h2>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {commitments.map((item) => (
        <div
          key={item.title}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-light/50 transition-colors duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20">
              <item.icon className="w-5 h-5 text-primary dark:text-primary-light" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default MissionValues;
