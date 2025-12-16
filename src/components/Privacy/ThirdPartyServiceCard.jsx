export default function ThirdPartyServiceCard({ name, providers, dataShared, privacyLinks }) {
  return (
    <div className="bg-[var(--current-bg-secondary)] p-5 rounded-lg border border-[var(--current-border)]">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">Providers:</h4>
          <ul>{providers.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">Data Shared:</h4>
          <ul className="list-disc pl-5">{dataShared.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">Privacy Policies:</h4>
          <ul>
            {privacyLinks.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {providers[i]} Policy
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
