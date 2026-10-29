import { Link } from "@/components/ui/SlashLink";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="GlimmerInk Creations home"
      className="flex items-center rounded-xl transition-colors dark:bg-white dark:px-3 dark:py-1.5 dark:shadow-md"
    >
      {/* Wrapper shrink-wraps the image so the seasonal hat can sit in % of the logo */}
      <span className="relative inline-flex">
        <img
          src="/images/logo-blue.webp"
          alt="GlimmerInk Creations logo"
          width="280"
          height="121"
          loading="eager"
          className="h-11 sm:h-12 md:h-14 w-auto object-contain"
        />
        <span className="season-hat" aria-hidden="true" />
      </span>
    </Link>
  );
}
