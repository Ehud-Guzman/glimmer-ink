import { LazyMotion } from "framer-motion";

const loadMax = () => import("@/utils/motionFeaturesMax").then((mod) => mod.default);

// Wrap only the subtrees that use drag or `layout`. The extra engine downloads
// when one of them mounts, not on every page.
const MotionMax = ({ children }) => (
  <LazyMotion features={loadMax} strict>
    {children}
  </LazyMotion>
);

export default MotionMax;
