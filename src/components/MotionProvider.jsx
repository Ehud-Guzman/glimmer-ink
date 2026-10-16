import { LazyMotion, domAnimation } from "framer-motion";

// Pages use the lightweight `m` components (see utils/motion.js). This supplies
// their engine: animate/exit, variants, hover, tap and whileInView, which is
// roughly half the size of the full `motion` bundle.
//
// It is imported up front on purpose. Loading it later would change the
// animation context while parts of a prerendered page are still waiting to
// hydrate, and React answers that by throwing those parts away and re-rendering
// them (error #421).
//
// `strict` makes any stray `motion.*` import fail loudly instead of quietly
// pulling the full engine back into the main bundle.
const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
);

export default MotionProvider;
