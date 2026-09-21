import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Visible breadcrumb trail. It mirrors the BreadcrumbList structured data that
// data/schema.js emits for the same items, which is what Google recommends.
const Breadcrumbs = ({ items = [], className = "" }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-text-muted dark:text-gray-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.path}-${index}`} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-text-light dark:text-text-dark line-clamp-1">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="hover:text-primary dark:hover:text-primary-light transition-colors">
                    {item.name}
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
