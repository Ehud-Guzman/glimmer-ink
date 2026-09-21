import { Sun, Moon } from "lucide-react";

// The icons are swapped with CSS (dark: variants) instead of React state, so the
// markup is identical on the server and on the client: no hydration mismatch,
// and the right icon shows before hydration when a dark theme is saved.
export default function ThemeToggle({ toggleTheme }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 overflow-hidden group"
    >
      <div className="relative z-10 flex items-center justify-center">
        <Sun className="hidden dark:block w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        <Moon className="block dark:hidden w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      </div>

      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

      {/* Theme indicator dot */}
      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full transition-colors duration-300 bg-blue-400 dark:bg-yellow-400">
        <div className="absolute inset-0 rounded-full animate-ping opacity-20"></div>
      </div>

      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
    </button>
  );
}
