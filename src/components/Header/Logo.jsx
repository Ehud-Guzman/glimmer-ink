import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="GlimmerInk Creations home"
      className="flex items-center rounded-xl transition-colors dark:bg-white dark:px-3 dark:py-1.5 dark:shadow-md"
    >
      <img
        src="/images/logo-blue.webp"
        alt="GlimmerInk Creations logo"
        width="280"
        height="121"
        loading="eager"
        className="h-11 sm:h-12 md:h-14 w-auto object-contain"
      />
    </Link>
  );
}
