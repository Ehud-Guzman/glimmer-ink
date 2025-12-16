import { motion } from "framer-motion";

export default function DataCategoryCard({ title, examples, purpose }) {
  return (
    <motion.div
      className="bg-[var(--current-bg-secondary)] p-5 rounded-lg border border-[var(--current-border)]"
      whileHover={{ x: 5 }}
    >
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <div className="mb-3">
        <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">
          Examples:
        </h4>
        <ul className="list-disc pl-5 text-[var(--current-text)]">
          {examples.map((example, i) => (
            <li key={i}>{example}</li>
          ))}
        </ul>
      </div>
      <p className="text-sm">
        <span className="font-medium">Purpose: </span>
        {purpose}
      </p>
    </motion.div>
  );
}
