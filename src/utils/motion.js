// Import animation components from here, never straight from "framer-motion".
// `m` is the lightweight twin of `motion`: it carries no animation engine of
// its own, so the engine loads separately (see MotionProvider) instead of
// sitting in the bundle that has to run before the page can hydrate.
export { m as motion, AnimatePresence } from "framer-motion";
