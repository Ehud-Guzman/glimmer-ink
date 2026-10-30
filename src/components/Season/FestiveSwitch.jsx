import { setFestive, useSeason } from "@/utils/season";

// Footer opt-out. Renders only while a season is running, and stays visible
// after switching off so the festive theme can be turned back on.
export default function FestiveSwitch() {
  const { available, active, features } = useSeason();
  if (!available) return null;

  return (
    <button
      type="button"
      onClick={() => setFestive(!active)}
      aria-pressed={active}
      className="text-xs text-text-light/60 dark:text-text-dark/60 underline-offset-4 hover:text-primary dark:hover:text-primary-light hover:underline transition-colors"
    >
      {active ? "Turn off" : "Turn on"} {features.themeName ?? "seasonal theme"}
    </button>
  );
}
