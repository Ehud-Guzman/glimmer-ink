import { useState } from "react";
import imageMeta from "@/data/imageMeta";

const PLACEHOLDER = "/images/placeholder-project.webp";

// Below-the-fold images load lazily and carry their real size (no layout
// shift). Big screenshots also have a smaller twin, so phones download that
// instead. Pass `priority` for an image that is visible without scrolling.
const SafeImage = ({ src, alt, className, sizes = "100vw", priority = false }) => {
  const [error, setError] = useState(false);

  const meta = error ? undefined : imageMeta[src];
  const [width, height, twinWidth] = meta ?? [];
  const srcSet = twinWidth
    ? `${src.replace(/\.webp$/, `-${twinWidth}.webp`)} ${twinWidth}w, ${src} ${width}w`
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
