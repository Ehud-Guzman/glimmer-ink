import { Suspense, lazy } from "react";
import { useSeason } from "@/utils/season";

// Only fetched while a season is running and the visitor has snow on, so the
// rest of the year it costs nothing.
const Snowfall = lazy(() => import("./Snowfall"));

export default function SeasonLayer() {
  const { active, snowOn } = useSeason();
  if (!active || !snowOn) return null;

  return (
    <Suspense fallback={null}>
      <Snowfall />
    </Suspense>
  );
}
