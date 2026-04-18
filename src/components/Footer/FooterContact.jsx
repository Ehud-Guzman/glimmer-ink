import { useState } from "react";

const FooterContact = ({ contact }) => {
  const [copied, setCopied] = useState(false);

  const title = contact?.title || "Get in touch";
  const methods = Array.isArray(contact?.methods) ? contact.methods : [];
  const social = Array.isArray(contact?.social) ? contact.social : [];

  const handleCopy = (text, label) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no crash if clipboard fails
    }
  };

  return (
    <div className="md:col-span-4 space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
          {title}
        </h3>

        <ul className="space-y-3">
          {methods.map((method, i) => {
            const Icon = method?.icon;

            return (
              <li
                key={`${method?.text || "method"}-${i}`}
                className="flex items-center text-text-light dark:text-text-dark opacity-80 hover:opacity-100
                           transition-all hover:translate-x-1 duration-150 group cursor-pointer"
                onClick={() =>
                  method?.copyable
                    ? handleCopy(method?.text || "", (method?.text || "").split("@")[0] || "Copied")
                    : method?.action?.()
                }
              >
                <span className={`mr-3 text-text-muted ${method?.hoverColor || ""} transition-colors`}>
                  {Icon ? <Icon className="text-lg" /> : null}
                </span>

                <span className="hover:text-primary transition-colors flex items-center gap-2">
                  {method?.text || ""}
                  <span className="text-xs opacity-0 group-hover:opacity-70 transition-opacity">
                    {method?.copyable ? "⎘" : "→"}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        {/* Copy feedback — simple CSS fade, no framer-motion needed */}
        {copied && (
          <div className="text-sm text-green-600 dark:text-green-400 animate-fade-in">
            {copied} copied to clipboard!
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
          Follow Us
        </h3>

        <div className="flex flex-wrap gap-3">
          {social
            .filter((s) => s?.url && s.url !== "#")
            .map((s, i) => {
              const SocialIcon = s?.icon;

              return (
                <a
                  key={`${s?.label || "social"}-${i}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s?.label || "Social"}
                  className={`p-2.5 rounded-lg text-white transition-all hover:-translate-y-1 active:scale-95 duration-150 relative overflow-hidden ${s?.bgHover || "bg-primary"}`}
                >
                  <span className="relative z-10">
                    {SocialIcon ? <SocialIcon className="text-base" /> : null}
                  </span>
                  <span className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
