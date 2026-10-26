import { Link } from "@/components/ui/SlashLink";
import { ArrowRight, MapPin } from "lucide-react";
import { LOCATION } from "@/data/location";

// Homepage hook into the local landing page. Plain, crawlable copy and links.
const LocalSection = () => (
  <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-14 bg-background-light dark:bg-background-dark">
    <div className="max-w-7xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 items-center">
      <div>
        <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Based in {LOCATION.town}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-text-light dark:text-text-dark">
          Your web developer in {LOCATION.town}, {LOCATION.country}
        </h2>
        <p className="text-text-light/75 dark:text-text-dark/75 leading-relaxed mb-6">
          Looking for a website developer in {LOCATION.town}? I build business websites, online shops and
          management systems for local businesses, with in-person meetings across {LOCATION.county}. Being
          based here doesn&apos;t limit me: I work with clients anywhere in {LOCATION.country}, fully remotely.
        </p>
        <Link
          to={LOCATION.landingPath}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          Web design in {LOCATION.town}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <ul className="flex flex-wrap gap-2 md:justify-end content-start">
        {[LOCATION.town, ...LOCATION.nearbyTowns].map((town) => (
          <li
            key={town}
            className="rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary dark:text-primary-light"
          >
            {town}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default LocalSection;
