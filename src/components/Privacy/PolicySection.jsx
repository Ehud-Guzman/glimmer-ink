import { motion } from "framer-motion";

export default function PolicySection({ id, title, children, icon }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 border-b border-[var(--current-border)] pb-3">
        {icon && <div className="text-2xl text-primary">{icon}</div>}
        <h2 className="text-2xl font-bold text-[var(--current-text)]">{title}</h2>
      </div>
      <div className="prose prose-invert max-w-none">{children}</div>
    </motion.section>
  );
}
