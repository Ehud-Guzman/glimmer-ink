import { useSeason } from "@/utils/season";

// Small gold "-10%" pill on the Get a Quote buttons. Absolutely positioned (or
// inline for the mobile menu), so it never changes the button's layout.
export default function OfferBadge({ inline = false }) {
  const { active, offer } = useSeason();
  if (!active || offer?.kind !== "discount") return null;

  return (
    <span className={`season-badge${inline ? " season-badge--inline" : ""}`} aria-hidden="true">
      −{offer.percent}%
    </span>
  );
}
