export default function CookieTypeItem({ name, purpose, duration }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
      <code className="bg-[var(--current-bg)] px-2 py-1 rounded text-sm font-mono w-32 flex-shrink-0">{name}</code>
      <span className="flex-1">{purpose}</span>
      <span className="text-sm text-[var(--current-text-secondary)] w-24 flex-shrink-0">{duration}</span>
    </li>
  );
}
