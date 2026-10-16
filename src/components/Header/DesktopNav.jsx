import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  loadHome,
  loadWork,
  loadServices,
  loadAbout,
  loadContact,
  loadBlog,
} from "@/utils/routePreloaders";

const navItems = [
  { name: "Home", path: "/", preload: loadHome },
  { name: "Work", path: "/work", preload: loadWork },
  { name: "Services", path: "/services", preload: loadServices },
  { name: "About", path: "/about", preload: loadAbout },
  { name: "Blog", path: "/blog", preload: loadBlog },
  { name: "Contact", path: "/contact", preload: loadContact },
];

export default function DesktopNav({ toggleTheme }) {
  return (
    <nav aria-label="Main" className="hidden md:flex items-center gap-5 lg:gap-7">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          end={item.path === "/"}
          onMouseEnter={item.preload}
          className={({ isActive }) =>
            `relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "text-primary dark:text-primary-light"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {item.name}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary dark:bg-primary-light transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
        </NavLink>
      ))}

      <Link
        to="/contact"
        onMouseEnter={loadContact}
        className="hidden lg:inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      >
        Get a Quote
      </Link>

      <ThemeToggle toggleTheme={toggleTheme} />
    </nav>
  );
}
