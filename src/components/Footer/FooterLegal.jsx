const FooterLegal = ({ legalLinks = [], credits, brand }) => {
  const year = new Date().getFullYear();
  const brandName = `${brand?.logo?.primary || "Glimmer"}${brand?.logo?.secondary || "Ink"}`;

  return (
    <div className="border-t border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-light/60 dark:text-text-dark/60">
        <p>© {year} {brandName} Creations. All rights reserved.</p>

        {legalLinks.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        {credits?.text && <p>{credits.text}</p>}
      </div>
    </div>
  );
};

export default FooterLegal;
