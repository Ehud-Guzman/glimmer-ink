import { Link } from "react-router-dom";

const FooterNav = ({ navigation, setActiveHover, activeHover }) => {
  const sections = Array.isArray(navigation) ? navigation : [];

  return (
    <div className="md:col-span-4 grid grid-cols-2 gap-8">
      {sections.map((section, i) => {
        const links = Array.isArray(section?.links) ? section.links : [];

        return (
          <div key={section?.title || i} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              {section?.title || "Links"}
            </h3>

            <ul className="space-y-3">
              {links
                .filter((link) => link?.url && link.url !== "#")
                .map((link, j) => (
                  <li
                    key={`${i}-${j}`}
                    className="relative"
                    onMouseEnter={() => setActiveHover?.(`${i}-${j}`)}
                    onMouseLeave={() => setActiveHover?.(null)}
                  >
                    <Link
                      to={link.url}
                      className="flex items-center text-text-light dark:text-text-dark
                                 opacity-80 hover:opacity-100 transition-all py-1"
                    >
                      <span>{link?.name || "Link"}</span>
                    </Link>

                    {/* Hover background — CSS transition instead of AnimatePresence */}
                    <div
                      className={`absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-md -z-10 transition-opacity duration-150 ${
                        activeHover === `${i}-${j}` ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </li>
                ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default FooterNav;
