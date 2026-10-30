import { useState } from "react";
import imageMeta from "@/data/imageMeta";

const PLACEHOLDER = "/images/placeholder-project.webp";

// Below-the-fold images load lazily and carry their real size (no layout
// shift). Big screenshots also have smaller twins (640px, and 960px for the
// biggest), so phones download one of those instead. Pass `priority` for an
// image that is visible without scrolling.
const SafeImage = ({ src, alt, className, sizes = "100vw", priority = false }) => {
  const [error, setError] = useState(false);

  const meta = error ? undefined : imageMeta[src];
  const [width, height, ...twinWidths] = meta ?? [];
  const srcSet = twinWidths.length
    ? [...twinWidths.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`), `${src} ${width}w`].join(", ")
    : undefined;

  return (
    <img
      src={error ? PLACEHOLDER : src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={width}
      height={height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
