import { ArrowRight, Gift, PartyPopper, Snowflake, TreePine, X } from "lucide-react";
import { Link } from "@/components/ui/SlashLink";
import { closeBar, setSnow, useSeason } from "@/utils/season";

const icons = { tree: TreePine, gift: Gift, party: PartyPopper };

// Slim festive strip at the top of the fixed header. The empty strip is always
// in the prerendered markup, and season.css only gives it height in season, so
// the space is reserved before first paint and nothing shifts when the text
// appears after hydration.
export default function SeasonBar() {
  const { active, copy, barClosed, snowOn, daysLeft } = useSeason();
  const show = active && Boolean(copy) && !barClosed;
  const Icon = copy ? (icons[copy.icon] ?? TreePine) : TreePine;

  return (
    <div className="season-bar" {...(!show ? { "aria-hidden": "true", inert: "" } : {})}>
      {show && (
        <div className="season-bar__inner mx-auto flex h-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <p className="flex min-w-0 flex-1 items-center justify-center gap-2 text-xs font-medium sm:text-[13px]">
            <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--season-gold)]" aria-hidden="true" />
            <span className="truncate sm:hidden">{copy.short}</span>
            <span className="hidden truncate sm:inline">{copy.text}</span>
            {daysLeft !== null && (
              <span className="season-bar__pill hidden md:inline-flex">
                {daysLeft <= 1 ? "Ends today" : `${daysLeft} days left`}
              </span>
            )}
            <Link
              to={copy.cta.to}
              className="season-bar__cta hidden shrink-0 items-center gap-1 font-semibold text-[var(--season-gold)] underline-offset-4 hover:underline sm:inline-flex"
            >
              {copy.cta.label}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </p>

          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={() => setSnow(!snowOn)}
              aria-pressed={snowOn}
              aria-label="Snowfall"
              title={snowOn ? "Turn snow off" : "Turn snow on"}
              className="season-bar__snow season-bar__btn"
              data-on={snowOn}
            >
              <Snowflake className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={closeBar}
              aria-label="Dismiss festive message"
              className="season-bar__btn"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
