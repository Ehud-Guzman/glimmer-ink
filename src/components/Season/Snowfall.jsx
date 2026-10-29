import { useEffect, useMemo, useState } from "react";

// Gentle CSS snowfall. Every flake animates transform only, so it stays on the
// compositor and costs the main thread nothing. It is loaded lazily, only in
// season, waits for the browser to be idle so it can never touch LCP or input
// delay, and skips itself for people and devices that would not enjoy it.

const prefersCalm = () => {
  const connection = navigator.connection;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    connection?.saveData === true ||
    (navigator.deviceMemory !== undefined && navigator.deviceMemory < 2)
  );
};

const random = (min, max) => min + Math.random() * (max - min);

const makeFlakes = (count) =>
  Array.from({ length: count }, () => {
    const size = random(2.5, 6.5);
    return {
      x: `${random(0, 100).toFixed(1)}%`,
      size: `${size.toFixed(1)}px`,
      // Bigger flakes are "closer": faster, brighter.
      duration: `${(random(13, 24) - size).toFixed(1)}s`,
      delay: `${(-random(0, 24)).toFixed(1)}s`,
      drift: `${random(-60, 60).toFixed(0)}px`,
      opacity: (0.35 + size / 12).toFixed(2),
    };
  });

export default function Snowfall() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersCalm()) return undefined;

    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, []);

  // Fewer flakes on phones. Generated once on the client (this never renders on the server).
  const flakes = useMemo(
    () => (ready ? makeFlakes(window.matchMedia("(max-width: 639px)").matches ? 16 : 30) : []),
    [ready]
  );

  if (!ready) return null;

  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((flake, index) => (
        <i
          key={index}
          style={{
            "--x": flake.x,
            "--s": flake.size,
            "--d": flake.duration,
            "--delay": flake.delay,
            "--dx": flake.drift,
            "--o": flake.opacity,
          }}
        />
      ))}
    </div>
  );
}
