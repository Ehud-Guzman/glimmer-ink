export default function SecurityMeasureCard({ title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-primary"></div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-[var(--current-text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
