import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function DesktopNav({ theme, toggleTheme }) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `text-sm font-medium transition duration-300 ease-in-out hover:text-accent ${
              isActive
                ? "text-accent underline underline-offset-8"
                : "text-secondary dark:text-gray-300"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </nav>
  );
}
