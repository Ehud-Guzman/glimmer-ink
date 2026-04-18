import { Link } from "react-router-dom";

const FooterBrand = ({ brand }) => {
  const logo = brand?.logo ?? {};
  const cta = brand?.cta ?? {};

  return (
    <div className="md:col-span-4 space-y-6">
      <div className="flex items-center gap-3 transition-transform hover:translate-x-1 duration-200">
        <Link to="/" className="text-3xl font-bold flex items-end">
          <span className="text-primary transition-transform hover:-translate-y-1 duration-150 inline-block">
            {logo.primary || "Glimmer"}
          </span>
          <span className="text-text-light dark:text-text-dark transition-transform hover:translate-y-1 duration-150 inline-block">
            {logo.secondary || "Ink"}
          </span>
        </Link>

        <span className="text-xs uppercase tracking-widest text-text-muted">
          {logo.tagline || ""}
        </span>
      </div>

      <p className="text-lg text-text-light/80 dark:text-text-dark/80 leading-relaxed">
        {brand?.description || ""}
      </p>

      <div className="transition-transform hover:scale-105 duration-200 inline-block">
        <Link
          to={cta.url || "/contact"}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-lg font-medium transition-colors duration-300 overflow-hidden hover:bg-primary-dark group"
        >
          <span className="block group-hover:hidden">{cta.text || "Start your project"}</span>
          <span className="hidden group-hover:block">{cta.hoverText || "Let's create →"}</span>
        </Link>
      </div>
    </div>
  );
};

export default FooterBrand;
